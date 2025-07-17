import { CSVStorage } from "./csv-storage";
import type { 
  PortfolioData, 
  InsertPortfolioData, 
  Project, 
  InsertProject, 
  Experience, 
  InsertExperience, 
  Skill, 
  InsertSkill, 
  Contact, 
  InsertContact 
} from "@shared/schema";

export interface IStorage {
  // Portfolio data
  getPortfolioData(): Promise<PortfolioData | null>;
  updatePortfolioData(data: InsertPortfolioData): Promise<PortfolioData>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | null>;
  deleteProject(id: number): Promise<boolean>;
  
  // Experiences
  getExperiences(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, updates: Partial<InsertExperience>): Promise<Experience | null>;
  deleteExperience(id: number): Promise<boolean>;
  
  // Skills
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, updates: Partial<InsertSkill>): Promise<Skill | null>;
  deleteSkill(id: number): Promise<boolean>;
  
  // Contacts
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private csvStorage = new CSVStorage();

  async getPortfolioData(): Promise<PortfolioData | null> {
    return this.csvStorage.getPortfolioData();
  }

  async updatePortfolioData(data: InsertPortfolioData): Promise<PortfolioData> {
    return this.csvStorage.updatePortfolioData(data);
  }

  async getProjects(): Promise<Project[]> {
    return this.csvStorage.getProjects();
  }

  async createProject(project: InsertProject): Promise<Project> {
    return this.csvStorage.createProject(project);
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | null> {
    return this.csvStorage.updateProject(id, updates);
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.csvStorage.deleteProject(id);
  }

  async getExperiences(): Promise<Experience[]> {
    return this.csvStorage.getExperiences();
  }

  async createExperience(experience: InsertExperience): Promise<Experience> {
    return this.csvStorage.createExperience(experience);
  }

  async updateExperience(id: number, updates: Partial<InsertExperience>): Promise<Experience | null> {
    return this.csvStorage.updateExperience(id, updates);
  }

  async deleteExperience(id: number): Promise<boolean> {
    return this.csvStorage.deleteExperience(id);
  }

  async getSkills(): Promise<Skill[]> {
    return this.csvStorage.getSkills();
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    return this.csvStorage.createSkill(skill);
  }

  async updateSkill(id: number, updates: Partial<InsertSkill>): Promise<Skill | null> {
    return this.csvStorage.updateSkill(id, updates);
  }

  async deleteSkill(id: number): Promise<boolean> {
    return this.csvStorage.deleteSkill(id);
  }

  async getContacts(): Promise<Contact[]> {
    return this.csvStorage.getContacts();
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    return this.csvStorage.createContact(contact);
  }
}

export const storage = new MemStorage();
