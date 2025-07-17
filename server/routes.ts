import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertPortfolioDataSchema, 
  insertProjectSchema, 
  insertExperienceSchema, 
  insertSkillSchema, 
  insertContactSchema 
} from "@shared/schema";
import { z } from "zod";

const authSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoints - must be first to avoid conflicts with static serving
  app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Root API endpoint for health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Authentication
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = authSchema.parse(req.body);
      
      // Simple hardcoded auth - replace with proper authentication
      const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
      const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
      
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        res.json({ success: true, token: "authenticated" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Portfolio data routes
  app.get("/api/portfolio", async (req, res) => {
    try {
      const data = await storage.getPortfolioData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio data" });
    }
  });

  app.put("/api/portfolio", async (req, res) => {
    try {
      const data = insertPortfolioDataSchema.parse(req.body);
      const updated = await storage.updatePortfolioData(data);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: "Invalid portfolio data" });
    }
  });

  // Projects routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const project = insertProjectSchema.parse(req.body);
      const created = await storage.createProject(project);
      res.json(created);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertProjectSchema.partial().parse(req.body);
      const updated = await storage.updateProject(id, updates);
      
      if (!updated) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteProject(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Experiences routes
  app.get("/api/experiences", async (req, res) => {
    try {
      const experiences = await storage.getExperiences();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });

  app.post("/api/experiences", async (req, res) => {
    try {
      const experience = insertExperienceSchema.parse(req.body);
      const created = await storage.createExperience(experience);
      res.json(created);
    } catch (error) {
      res.status(400).json({ message: "Invalid experience data" });
    }
  });

  app.put("/api/experiences/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertExperienceSchema.partial().parse(req.body);
      const updated = await storage.updateExperience(id, updates);
      
      if (!updated) {
        return res.status(404).json({ message: "Experience not found" });
      }
      
      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: "Invalid experience data" });
    }
  });

  app.delete("/api/experiences/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteExperience(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete experience" });
    }
  });

  // Skills routes
  app.get("/api/skills", async (req, res) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  app.post("/api/skills", async (req, res) => {
    try {
      const skill = insertSkillSchema.parse(req.body);
      const created = await storage.createSkill(skill);
      res.json(created);
    } catch (error) {
      res.status(400).json({ message: "Invalid skill data" });
    }
  });

  app.put("/api/skills/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertSkillSchema.partial().parse(req.body);
      const updated = await storage.updateSkill(id, updates);
      
      if (!updated) {
        return res.status(404).json({ message: "Skill not found" });
      }
      
      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: "Invalid skill data" });
    }
  });

  app.delete("/api/skills/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSkill(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete skill" });
    }
  });

  // Contacts routes
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const contact = insertContactSchema.parse(req.body);
      const created = await storage.createContact(contact);
      res.json(created);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data" });
    }
  });

  // GitHub integration
  app.get("/api/github/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
      
      if (!response.ok) {
        return res.status(response.status).json({ message: "GitHub API error" });
      }
      
      const repos = await response.json();
      res.json(repos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch GitHub data" });
    }
  });

  app.get("/api/github/:username/:repo", async (req, res) => {
    try {
      const { username, repo } = req.params;
      const response = await fetch(`https://api.github.com/repos/${username}/${repo}`);
      
      if (!response.ok) {
        return res.status(response.status).json({ message: "GitHub API error" });
      }
      
      const repoData = await response.json();
      res.json(repoData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch GitHub repo data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
