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
import { db } from './config/firebase-admin';
import * as admin from 'firebase-admin';

const authSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function registerRoutes(app: Express): Promise<Server> {
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
  app.get("/api/portfolio", async (_req, res) => {
    try {
      const snapshot = await db.collection('portfolio').limit(1).get();
      if (snapshot.empty) {
        return res.status(404).json({ message: 'Portfolio not found' });
      }
      const portfolio = snapshot.docs[0].data();
      res.json(portfolio);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio data" });
    }
  });

  app.put("/api/portfolio/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      await db.collection('portfolio').doc(id).update({
        ...data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      res.json({ message: "Portfolio updated successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid portfolio data" });
    }
  });

  app.post("/api/portfolio", async (req, res) => {
    try {
      const data = req.body;
      const docRef = await db.collection('portfolio').add({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      res.json({ id: docRef.id, message: "Portfolio created successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid portfolio data" });
    }
  });

  app.delete("/api/portfolio/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db.collection('portfolio').doc(id).delete();
      res.json({ message: "Portfolio deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete portfolio" });
    }
  });

  // Projects routes
  app.get("/api/projects", async (req, res) => {
    try {
      const { portfolioId } = req.query;
      const query = portfolioId
        ? db.collection('projects').where('portfolioId', '==', portfolioId)
        : db.collection('projects');
      const snapshot = await query.get();
      const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const project = insertProjectSchema.parse(req.body);
      const docRef = await db.collection('projects').add({
        ...project,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      res.json({ id: docRef.id, message: "Project created successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = insertProjectSchema.partial().parse(req.body);
      await db.collection('projects').doc(id).update({
        ...updates,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      res.json({ message: "Project updated successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db.collection('projects').doc(id).delete();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Experiences routes
  app.get("/api/experiences", async (req, res) => {
    try {
      const { portfolioId } = req.query;
      const query = portfolioId
        ? db.collection('experiences').where('portfolioId', '==', portfolioId)
        : db.collection('experiences');
      const snapshot = await query.get();
      const experiences = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });

  app.post("/api/experiences", async (req, res) => {
    try {
      const experience = insertExperienceSchema.parse(req.body);
      const docRef = await db.collection('experiences').add({
        ...experience,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      res.json({ id: docRef.id, message: "Experience created successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid experience data" });
    }
  });

  app.put("/api/experiences/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = insertExperienceSchema.partial().parse(req.body);
      await db.collection('experiences').doc(id).update({
        ...updates,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      res.json({ message: "Experience updated successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid experience data" });
    }
  });

  app.delete("/api/experiences/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db.collection('experiences').doc(id).delete();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete experience" });
    }
  });

  // Skills routes
  app.get("/api/skills", async (req, res) => {
    try {
      const { portfolioId } = req.query;
      const query = portfolioId
        ? db.collection('skills').where('portfolioId', '==', portfolioId)
        : db.collection('skills');
      const snapshot = await query.get();
      const skills = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  app.post("/api/skills", async (req, res) => {
    try {
      const skill = insertSkillSchema.parse(req.body);
      const docRef = await db.collection('skills').add({
        ...skill,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      res.json({ id: docRef.id, message: "Skill created successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid skill data" });
    }
  });

  app.put("/api/skills/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = insertSkillSchema.partial().parse(req.body);
      await db.collection('skills').doc(id).update({
        ...updates,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      res.json({ message: "Skill updated successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid skill data" });
    }
  });

  app.delete("/api/skills/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db.collection('skills').doc(id).delete();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete skill" });
    }
  });

  // Contacts routes
  app.get("/api/contacts", async (req, res) => {
    try {
      const { portfolioId } = req.query;
      const query = portfolioId
        ? db.collection('contacts').where('portfolioId', '==', portfolioId)
        : db.collection('contacts');
      const snapshot = await query.get();
      const contacts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const contact = insertContactSchema.parse(req.body);
      const docRef = await db.collection('contacts').add({
        ...contact,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      res.json({ id: docRef.id, message: "Contact created successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data" });
    }
  });

  app.put("/api/contacts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = insertContactSchema.partial().parse(req.body);
      await db.collection('contacts').doc(id).update({
        ...updates,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      res.json({ message: "Contact updated successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data" });
    }
  });

  app.delete("/api/contacts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db.collection('contacts').doc(id).delete();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete contact" });
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
