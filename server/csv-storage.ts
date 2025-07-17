import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in a way that works in both dev and production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create data directory path - handle different environments
let dataDir: string;
if (process.env.NODE_ENV === 'production') {
  // In production, try multiple possible paths
  const possiblePaths = [
    path.join(process.cwd(), 'data'),
    path.join(__dirname, 'data'),
    path.join(__dirname, '..', 'data'),
    path.join(process.cwd(), 'dist', 'data')
  ];
  
  dataDir = possiblePaths.find(p => {
    try {
      return fs.accessSync ? require('fs').existsSync(p) : false;
    } catch {
      return false;
    }
  }) || possiblePaths[0];
} else {
  dataDir = path.join(__dirname, '..', 'data');
}

export class CSVStorage {
  private async ensureDataDir() {
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }
  }

  private async readCSV(filename: string): Promise<any[]> {
    await this.ensureDataDir();
    const filePath = path.join(dataDir, filename);
    
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.trim().split('\n');
      
      if (lines.length < 2) return [];
      
      const headers = lines[0].split(',').map(h => h.trim());
      const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj: any = {};
        headers.forEach((header, index) => {
          let value = values[index] || '';
          
          // Handle array fields (technologies)
          if (header === 'technologies' && value) {
            obj[header] = value.split(';').map(t => t.trim());
          }
          // Handle numeric fields
          else if (['level', 'stars', 'order', 'projectsCount', 'experienceYears', 'clientsCount', 'technologiesCount'].includes(header)) {
            obj[header] = value ? parseInt(value) : 0;
          }
          // Handle boolean fields
          else if (header === 'featured') {
            obj[header] = value.toLowerCase() === 'true';
          }
          else {
            obj[header] = value;
          }
        });
        return obj;
      });
      
      return data;
    } catch (error) {
      return [];
    }
  }

  private async writeCSV(filename: string, data: any[], headers: string[]) {
    await this.ensureDataDir();
    const filePath = path.join(dataDir, filename);
    
    const lines = [headers.join(',')];
    
    data.forEach(item => {
      const values = headers.map(header => {
        const value = item[header];
        if (Array.isArray(value)) {
          return value.join(';');
        }
        return value || '';
      });
      lines.push(values.join(','));
    });
    
    await fs.writeFile(filePath, lines.join('\n'), 'utf-8');
  }

  async getPortfolioData() {
    const data = await this.readCSV('portfolio.csv');
    return data[0] || null;
  }

  async updatePortfolioData(portfolioData: any) {
    const headers = ['name', 'title', 'description', 'bio', 'email', 'phone', 'location', 'tagline', 'githubUrl', 'linkedinUrl', 'twitterUrl', 'instagramUrl', 'projectsCount', 'experienceYears', 'clientsCount', 'technologiesCount'];
    await this.writeCSV('portfolio.csv', [portfolioData], headers);
    return portfolioData;
  }

  async getProjects() {
    return await this.readCSV('projects.csv');
  }

  async createProject(project: any) {
    const projects = await this.getProjects();
    const newProject = { ...project, id: Date.now() };
    projects.push(newProject);
    
    const headers = ['id', 'name', 'description', 'githubUrl', 'liveUrl', 'stars', 'technologies', 'featured'];
    await this.writeCSV('projects.csv', projects, headers);
    return newProject;
  }

  async updateProject(id: number, updates: any) {
    const projects = await this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    projects[index] = { ...projects[index], ...updates };
    
    const headers = ['id', 'name', 'description', 'githubUrl', 'liveUrl', 'stars', 'technologies', 'featured'];
    await this.writeCSV('projects.csv', projects, headers);
    return projects[index];
  }

  async deleteProject(id: number) {
    const projects = await this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    
    const headers = ['id', 'name', 'description', 'githubUrl', 'liveUrl', 'stars', 'technologies', 'featured'];
    await this.writeCSV('projects.csv', filtered, headers);
    return true;
  }

  async getExperiences() {
    return await this.readCSV('experiences.csv');
  }

  async createExperience(experience: any) {
    const experiences = await this.getExperiences();
    const newExperience = { ...experience, id: Date.now() };
    experiences.push(newExperience);
    
    const headers = ['id', 'title', 'company', 'period', 'description', 'technologies', 'order'];
    await this.writeCSV('experiences.csv', experiences, headers);
    return newExperience;
  }

  async updateExperience(id: number, updates: any) {
    const experiences = await this.getExperiences();
    const index = experiences.findIndex(e => e.id === id);
    
    if (index === -1) return null;
    
    experiences[index] = { ...experiences[index], ...updates };
    
    const headers = ['id', 'title', 'company', 'period', 'description', 'technologies', 'order'];
    await this.writeCSV('experiences.csv', experiences, headers);
    return experiences[index];
  }

  async deleteExperience(id: number) {
    const experiences = await this.getExperiences();
    const filtered = experiences.filter(e => e.id !== id);
    
    const headers = ['id', 'title', 'company', 'period', 'description', 'technologies', 'order'];
    await this.writeCSV('experiences.csv', filtered, headers);
    return true;
  }

  async getSkills() {
    return await this.readCSV('skills.csv');
  }

  async createSkill(skill: any) {
    const skills = await this.getSkills();
    const newSkill = { ...skill, id: Date.now() };
    skills.push(newSkill);
    
    const headers = ['id', 'category', 'name', 'level', 'icon'];
    await this.writeCSV('skills.csv', skills, headers);
    return newSkill;
  }

  async updateSkill(id: number, updates: any) {
    const skills = await this.getSkills();
    const index = skills.findIndex(s => s.id === id);
    
    if (index === -1) return null;
    
    skills[index] = { ...skills[index], ...updates };
    
    const headers = ['id', 'category', 'name', 'level', 'icon'];
    await this.writeCSV('skills.csv', skills, headers);
    return skills[index];
  }

  async deleteSkill(id: number) {
    const skills = await this.getSkills();
    const filtered = skills.filter(s => s.id !== id);
    
    const headers = ['id', 'category', 'name', 'level', 'icon'];
    await this.writeCSV('skills.csv', filtered, headers);
    return true;
  }

  async getContacts() {
    return await this.readCSV('contacts.csv');
  }

  async createContact(contact: any) {
    const contacts = await this.getContacts();
    const newContact = { ...contact, id: Date.now(), createdAt: new Date().toISOString() };
    contacts.push(newContact);
    
    const headers = ['id', 'name', 'email', 'subject', 'message', 'createdAt'];
    await this.writeCSV('contacts.csv', contacts, headers);
    return newContact;
  }
}
