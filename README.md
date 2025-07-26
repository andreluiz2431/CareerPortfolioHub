# Career Portfolio Hub

A modern full-stack portfolio application with an admin interface, built using React, Express, and TypeScript. Features a sleek dark theme inspired by SpaceX's aesthetic.

## 🚀 Features

- **Dynamic Content Management**: Full CRUD operations for portfolio data
- **Admin Interface**: Protected admin dashboard for content updates
- **Real-time Updates**: Instant UI updates with TanStack Query
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: End-to-end TypeScript implementation
- **Data Persistence**: CSV-based storage with future PostgreSQL migration path

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- TanStack Query
- Tailwind CSS
- Radix UI + shadcn/ui
- Wouter (routing)

### Backend
- Express.js
- TypeScript
- CSV Storage System
- Drizzle ORM (configured)

## 📦 Project Structure

```
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   └── pages/        # Route pages
├── server/               # Backend Express application
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage logic
│   └── vite.ts          # Vite integration
├── shared/              # Shared types and schemas
└── data/               # CSV data storage
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd career-portfolio-hub
```

2. Install dependencies:
```bash
npm install
```

3. Create required environment variables:
```bash
cp .env.example .env
```

4. Start development servers:
```bash
npm run dev
```

## 🌐 Deployment

### Development
- Run both frontend and backend in development mode:
```bash
npm run dev
```

### Production
1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

### Docker Deployment
1. Build the Docker image:
```bash
docker build -t career-portfolio-hub .
```

2. Run the container:
```bash
docker run -p 5000:5000 career-portfolio-hub
```

## 📝 Database Migration

Current implementation uses CSV storage with a planned migration path to PostgreSQL:
- Drizzle ORM configuration ready
- Schema definitions established
- Neon database integration configured

## 🔒 Authentication

- Simple admin authentication system
- Environment variable-based credentials
- Protected admin features
- Role-based UI rendering

## 🛠️ Development

### Available Scripts
- `npm run dev`: Start development environment
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript checks

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.