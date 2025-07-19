// Mock data for portfolio when running without backend
export const mockPortfolioData = {
  name: "André Luiz Montanha",
  title: "Desenvolvedor Full Stack",
  bio: "Desenvolvedor Full Stack especializado em React, Angular e Firebase com mais de 5 anos de experiência em desenvolvimento web e mobile.",
  email: "andre.montanha@email.com",
  phone: "+55 (11) 99999-9999",
  location: "São Paulo, SP - Brasil",
  github: "https://github.com/andremontanha",
  linkedin: "https://linkedin.com/in/andremontanha",
  website: "https://andremontanha.dev",
  experience_years: "5+",
  projects_completed: "50+",
  satisfied_clients: "30+"
};

export const mockExperiences = [
  {
    id: "1",
    title: "Analista de Suporte N1",
    company: "Empresa Tech Solutions",
    location: "São Paulo, SP",
    period: "2019 - 2021",
    description: "Responsável pelo suporte técnico de primeiro nível, resolução de problemas de hardware e software, e atendimento ao cliente.",
    technologies: ["Windows", "Linux", "Redes", "Hardware"]
  },
  {
    id: "2", 
    title: "Desenvolvedor Frontend Júnior",
    company: "StartupX",
    location: "São Paulo, SP",
    period: "2021 - 2022",
    description: "Desenvolvimento de interfaces responsivas utilizando React e TypeScript, integração com APIs REST e implementação de testes unitários.",
    technologies: ["React", "TypeScript", "CSS", "JavaScript", "Git"]
  },
  {
    id: "3",
    title: "Desenvolvedor Full Stack Pleno",
    company: "TechCorp Innovation",
    location: "São Paulo, SP", 
    period: "2022 - 2024",
    description: "Desenvolvimento de aplicações web completas utilizando React, Angular e Firebase. Criação de APIs REST e implementação de arquiteturas escaláveis.",
    technologies: ["React", "Angular", "Node.js", "Firebase", "MongoDB", "Docker"]
  },
  {
    id: "4",
    title: "Desenvolvedor Full Stack Sênior",
    company: "Digital Solutions Ltd",
    location: "São Paulo, SP",
    period: "2024 - Presente",
    description: "Liderança técnica de projetos, mentoria de desenvolvedores júnior e arquitetura de soluções complexas utilizando tecnologias modernas.",
    technologies: ["React", "Angular", "Node.js", "Firebase", "AWS", "Kubernetes", "TypeScript"]
  }
];

export const mockProjects = [
  {
    id: "1",
    name: "Sistema de Automação CAAL",
    description: "Sistema completo de automação para controle de acesso e iluminação utilizando tecnologias modernas.",
    technologies: ["React", "Firebase", "TypeScript", "Material-UI"],
    github: "https://github.com/andremontanha/sistema-caal",
    demo: "https://sistema-caal.vercel.app",
    image: "/api/placeholder/400/300"
  },
  {
    id: "2",
    name: "Dashboard Analytics",
    description: "Dashboard responsivo para análise de dados com gráficos interativos e relatórios em tempo real.",
    technologies: ["Angular", "Chart.js", "Node.js", "MongoDB"],
    github: "https://github.com/andremontanha/dashboard-analytics", 
    demo: "https://dashboard-analytics-demo.vercel.app",
    image: "/api/placeholder/400/300"
  },
  {
    id: "3",
    name: "E-commerce Platform",
    description: "Plataforma de e-commerce completa com carrinho, pagamentos e painel administrativo.",
    technologies: ["React", "Stripe", "Firebase", "Tailwind CSS"],
    github: "https://github.com/andremontanha/ecommerce-platform",
    demo: "https://ecommerce-demo.vercel.app",
    image: "/api/placeholder/400/300"
  },
  {
    id: "4",
    name: "Task Management App",
    description: "Aplicativo de gerenciamento de tarefas com colaboração em equipe e notificações em tempo real.",
    technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
    github: "https://github.com/andremontanha/task-manager",
    demo: "https://task-manager-demo.vercel.app",
    image: "/api/placeholder/400/300"
  },
  {
    id: "5",
    name: "API Gateway Service",
    description: "Serviço de gateway API escalável com autenticação, rate limiting e monitoramento.",
    technologies: ["Node.js", "Express", "Redis", "Docker", "AWS"],
    github: "https://github.com/andremontanha/api-gateway",
    demo: "https://api-gateway-docs.vercel.app",
    image: "/api/placeholder/400/300"
  }
];

export const mockSkills = [
  // Frontend
  { id: "1", category: "frontend", name: "ReactJS", proficiency: "Avançado" },
  { id: "2", category: "frontend", name: "Angular", proficiency: "Avançado" },
  { id: "3", category: "frontend", name: "TypeScript", proficiency: "Avançado" },
  { id: "4", category: "frontend", name: "JavaScript", proficiency: "Avançado" },
  { id: "5", category: "frontend", name: "HTML5", proficiency: "Avançado" },
  { id: "6", category: "frontend", name: "CSS3", proficiency: "Avançado" },
  { id: "7", category: "frontend", name: "Tailwind CSS", proficiency: "Intermediário" },
  { id: "8", category: "frontend", name: "Material-UI", proficiency: "Intermediário" },
  { id: "9", category: "frontend", name: "React Native", proficiency: "Intermediário" },
  { id: "10", category: "frontend", name: "Vue.js", proficiency: "Básico" },

  // Backend
  { id: "11", category: "backend", name: "Node.js", proficiency: "Avançado" },
  { id: "12", category: "backend", name: "Express.js", proficiency: "Avançado" },
  { id: "13", category: "backend", name: "Firebase", proficiency: "Avançado" },
  { id: "14", category: "backend", name: "MongoDB", proficiency: "Intermediário" },
  { id: "15", category: "backend", name: "PostgreSQL", proficiency: "Intermediário" },
  { id: "16", category: "backend", name: "Redis", proficiency: "Intermediário" },
  { id: "17", category: "backend", name: "GraphQL", proficiency: "Intermediário" },
  { id: "18", category: "backend", name: "REST APIs", proficiency: "Avançado" },

  // DevOps & Tools
  { id: "19", category: "devops", name: "Docker", proficiency: "Intermediário" },
  { id: "20", category: "devops", name: "AWS", proficiency: "Intermediário" },
  { id: "21", category: "devops", name: "Kubernetes", proficiency: "Básico" },
  { id: "22", category: "devops", name: "CI/CD", proficiency: "Intermediário" },
  { id: "23", category: "devops", name: "Git", proficiency: "Avançado" },
  { id: "24", category: "devops", name: "Linux", proficiency: "Intermediário" },

  // Mobile
  { id: "25", category: "mobile", name: "React Native", proficiency: "Intermediário" },
  { id: "26", category: "mobile", name: "Android", proficiency: "Básico" },
  { id: "27", category: "mobile", name: "iOS", proficiency: "Básico" },

  // Others
  { id: "28", category: "others", name: "Agile/Scrum", proficiency: "Avançado" },
  { id: "29", category: "others", name: "Figma", proficiency: "Intermediário" },
  { id: "30", category: "others", name: "Photoshop", proficiency: "Básico" },
  { id: "31", category: "others", name: "Testing", proficiency: "Intermediário" },
  { id: "32", category: "others", name: "UX/UI", proficiency: "Intermediário" }
];

export const mockContacts = [];