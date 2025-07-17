# Portfolio Application

## Overview

This is a modern full-stack portfolio application built with React, Express, and TypeScript. The application features a sleek dark theme design inspired by SpaceX's aesthetic, with a complete admin interface for content management. It uses a CSV-based storage system for data persistence and includes comprehensive UI components for both frontend display and backend administration.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### Railway Deploy Fix (Janeiro 2025)
- Problema de deploy no Railway resolvido com script de build personalizado
- Script build.js criado usando npx para resolver dependências em produção
- Configuração railway.json otimizada para usar o novo script
- Dockerfile atualizado para deploy em container
- Sistema de inicialização de dados melhorado (init-data.js)
- Dependências vite e esbuild movidas para produção
- Teste local confirmou funcionamento completo

### Data Integration (Janeiro 2025)
- Integração completa dos dados do currículo do André Luiz Montanha
- Adição de informações pessoais e profissionais ao portfolio.csv
- Cadastro de 4 experiências profissionais no experiences.csv
- Inclusão de 35 habilidades técnicas organizadas por categoria no skills.csv
- Criação de 5 projetos exemplo baseados no perfil profissional no projects.csv
- Portfolio agora reflete o perfil real do desenvolvedor com foco em React, Angular, Firebase e infraestrutura

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with a custom dark theme
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Data Storage**: CSV-based file storage with a custom CSVStorage class
- **API Design**: RESTful API endpoints for CRUD operations
- **Development Setup**: Custom Vite integration for seamless full-stack development

### Design System
- **Theme**: Dark SpaceX-inspired design with blue accent colors
- **Component Library**: Complete set of reusable UI components using Radix UI
- **Typography**: Inter font family for modern, clean text rendering
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

## Key Components

### Data Models
The application manages four main entity types:
- **Portfolio Data**: Personal information, contact details, and professional statistics
- **Projects**: Featured work with GitHub integration, technologies used, and live demos
- **Experience**: Professional work history with company details and technology stacks
- **Skills**: Technical competencies organized by category with proficiency levels
- **Contacts**: User-submitted contact form messages

### Authentication System
- Simple hardcoded authentication for admin access
- Environment variable configuration for credentials
- Session-based authentication state management
- Protected admin features with role-based UI rendering

### Content Management
- Comprehensive admin interface for all content types
- Modal-based editing system for seamless content updates
- Real-time form validation using React Hook Form and Zod schemas
- Optimistic updates with automatic cache invalidation

### UI Components
- **Hero Section**: Animated landing area with gradient backgrounds and call-to-action buttons
- **Portfolio Sections**: About, Experience, Projects, Skills, and Contact sections
- **Admin Interface**: Login modal, edit modal, and inline editing capabilities
- **Responsive Design**: Mobile-optimized navigation and content layout

## Data Flow

### Client-Server Communication
1. Frontend components use TanStack Query for data fetching and caching
2. API requests are made through a centralized `apiRequest` utility function
3. Server responds with JSON data from CSV file storage
4. Real-time updates are achieved through query invalidation and refetching

### Content Management Flow
1. Admin logs in through the login modal with hardcoded credentials
2. Edit buttons appear throughout the interface when authenticated
3. Modal forms allow CRUD operations on all content types
4. Changes are immediately persisted to CSV files and reflected in the UI

### Data Persistence
- CSV files serve as the primary data store in the `/data` directory
- Custom CSVStorage class handles file I/O operations
- Automatic directory creation and file management
- Type-safe data serialization and deserialization

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **State Management**: TanStack Query for server state, React Hook Form for form state
- **UI Framework**: Radix UI primitives, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js, TypeScript, Node.js runtime

### Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Database ORM**: Drizzle ORM (configured but not actively used)
- **Database**: Neon PostgreSQL (configured for future migration)
- **Validation**: Zod for runtime type checking and schema validation

### Utility Libraries
- **Date Handling**: date-fns for date formatting and manipulation
- **Styling Utilities**: clsx and class-variance-authority for conditional styling
- **Icons**: Lucide React for consistent iconography
- **Carousel**: Embla Carousel for image and content carousels

## Deployment Strategy

### Development Environment
- Vite development server with hot module replacement
- Express server with TypeScript compilation via tsx
- Custom middleware for API request logging and error handling
- Replit-specific plugins for cloud development environment

### Production Build
- Vite builds the React client to `dist/public` directory
- esbuild bundles the Express server to `dist/index.js`
- Static file serving for production deployment
- Environment variable configuration for different deployment stages

### Database Migration Path
- Current CSV storage provides simple, portable data persistence
- Drizzle ORM configuration ready for PostgreSQL migration
- Schema definitions already established for smooth transition
- Neon database integration configured for cloud deployment