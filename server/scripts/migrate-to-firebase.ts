import admin from 'firebase-admin';
import { db } from '../config/firebase-admin';
import { parse } from 'csv-parse/sync';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const collections = [
  { name: 'portfolio', file: 'portfolio.csv', single: true },
  { name: 'projects', file: 'projects.csv' },
  { name: 'skills', file: 'skills.csv' },
  { name: 'contacts', file: 'contacts.csv' },
  { name: 'experiences', file: 'experiences.csv' }
];

let portfolioDocId: string | null = null;

async function migrateCollection({ name, file, single = false }) {
  const filePath = resolve(__dirname, `../../data/${file}`);
  if (!existsSync(filePath)) {
    console.warn(`Arquivo não encontrado: ${file}`);
    return;
  }
  const content = readFileSync(filePath, 'utf-8');
  const records = parse(content, { columns: true, skip_empty_lines: true, trim: true });

  if (single) {
    // Migra o portfolio e salva o ID gerado
    const rawData = records[0];
    const cleanedData = {
      ...rawData,
      projectsCount: parseInt(rawData.projectsCount) || 0,
      experienceYears: parseInt(rawData.experienceYears) || 0,
      clientsCount: parseInt(rawData.clientsCount) || 0,
      technologiesCount: parseInt(rawData.technologiesCount) || 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    console.log(`Migrando ${name}:`, cleanedData);
    const docRef = await db.collection(name).add(cleanedData);
    portfolioDocId = docRef.id;
    console.log(`Portfolio ID: ${portfolioDocId}`);
  } else {
    // Migra as demais coleções vinculando ao portfolioId
    for (const rawData of records) {
      const cleanedData = {
        ...rawData,
        portfolioId: portfolioDocId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      console.log(`Migrando ${name}:`, cleanedData);
      await db.collection(name).add(cleanedData);
    }
  }
}

async function migrateAll() {
  try {
    console.log('Iniciando migração de todas as coleções...');
    for (const col of collections) {
      await migrateCollection(col);
    }
    console.log('Migração concluída!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Execute migration
migrateAll();