import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

// Create data directory if it doesn't exist
const dataDir = 'data';
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

// Default data files
const defaultFiles = {
  'portfolio.csv': `name,title,description,bio,email,phone,location,tagline,githubUrl,linkedinUrl,twitterUrl,instagramUrl,projectsCount,experienceYears,clientsCount,technologiesCount
André Luiz Montanha,Desenvolvedor Full Stack,Desenvolvedor sempre buscando criar soluções que unam performance organização e boas práticas. Atualmente focado em projetos com Angular React Astro Firebase Node.js TypeScript e TailwindCSS.,Desenvolvedor com 24 anos de experiência em análise de suporte infraestrutura e desenvolvimento. Especializado em sistemas operacionais hardware redes manutenção de equipamentos e programação. Atualmente cursando Ciência da Computação na UNIPAMPA com formação técnica em informática pelo IFFar. Experiência com tecnologias modernas como Angular React Firebase TypeScript e Python além de amplo conhecimento em administração de sistemas Windows/Linux TOTVS Protheus e banco de dados SQL.,alm28062001@gmail.com,55-996596043,Alegrete - RS,Construindo o futuro uma linha de código por vez,https://github.com/andreluiz2431,,,15,5,10,25`,
  
  'experiences.csv': `id,title,company,period,description,technologies,order
1,Analista de Suporte N1,Aegea Corsan,07/2025 - Atual,Profissional responsável por prestar suporte técnico e manutenção aos sistemas operacionais e equipamentos da empresa. Atua na atualização de softwares análise de prioridades de atendimento remanejamento e upgrade de hardware além de realizar rotinas de backup e controle de licenças de software. Administra sistemas operacionais impressoras e contas de usuários incluindo e-mails e grupos. Executa manutenções preventivas e corretivas em equipamentos de informática redes de dados e telefonia.,Windows;Linux;Redes;Hardware;Backup;Telefonia,1
2,Analista de Suporte e Infraestrutura,CAAL (Cooperativa Agroindustrial Alegrete LTDA),05/2023 - 07/2025,Suporte e instalação de sistemas operacionais e entrada em Domínio (AD). Manutenção de hardware em estações de trabalho e servidores. Conhecimento em redes conectividade wi-fi cabeamento IPs. Administração de telefonia PABX VoIP. Instalação e manutenção de sistemas CFTV. Conhecimento em TOTVS Protheus e ADVPL. Criação e manutenção de testes automatizados com Python. Banco de dados SQL Oracle.,Windows;Linux;Active Directory;TOTVS Protheus;ADVPL;Python;SQL;Oracle;CFTV;VoIP;PABX,2
3,Assistente Administrativo,RGE – Estação Avançada de Alegrete,08/2022 - 06/2023,Trabalhei no setor de gestão de operações e apoio administrativo onde desenvolvi habilidades organizacionais e operacionais. Responsável por processos administrativos e suporte operacional.,Microsoft Office;Gestão;Operações,3
4,Freelancer Administrativo,A&Z Cosméticos LTDA,06/2021 - 05/2025,Emissão de notas fiscais e boletos. Gestão de estoque e pedidos. Cadastro de clientes e suporte comercial. Criação de materiais de marketing digital. Automação de processos administrativos (Micro Automações locais).,ERP;Marketing Digital;Automação;Gestão de Estoque,4`,
  
  'projects.csv': `id,name,description,githubUrl,liveUrl,stars,technologies,featured
1,Sistema de Automação CAAL,Sistema desenvolvido para automação de processos administrativos na cooperativa agroindustrial. Incluí controle de estoque gestão de pedidos e relatórios automatizados.,https://github.com/andreluiz2431/sistema-caal,,0,Python;SQL;Oracle;TOTVS Protheus,true
2,Aplicativo React Dashboard,Dashboard administrativo desenvolvido em React para gestão de dados e relatórios. Interface moderna e responsiva com integração de APIs.,https://github.com/andreluiz2431/react-dashboard,,0,React;TypeScript;TailwindCSS;Node.js,true
3,Sistema de Monitoramento CFTV,Sistema de monitoramento e gestão de câmeras de segurança desenvolvido para controle de acesso e gravação de imagens.,https://github.com/andreluiz2431/cftv-monitor,,0,Python;SQL;Hardware Integration,false
4,Portfolio Angular,Portfólio pessoal desenvolvido em Angular com design moderno e responsivo. Inclui seções de projetos experiências e habilidades.,https://github.com/andreluiz2431/portfolio-angular,,0,Angular;TypeScript;SCSS;Firebase,true
5,Automação de Processos A&Z,Sistema de automação para emissão de notas fiscais gestão de estoque e controle de clientes desenvolvido para A&Z Cosméticos.,https://github.com/andreluiz2431/automacao-az,,0,Python;SQL;ERP Integration,false`,
  
  'skills.csv': `id,category,name,level,icon
1,frontend,ReactJS,85,
2,frontend,AngularJS,80,
3,frontend,AstroJS,75,
4,frontend,TypeScript,85,
5,frontend,JavaScript,90,
6,frontend,HTML,95,
7,frontend,CSS,90,
8,frontend,TailwindCSS,80,
9,backend,Node.js,80,
10,backend,Firebase,85,
11,backend,Python,85,
12,backend,PHP,70,
13,backend,C,75,
14,backend,C++,70,
15,database,SQL Server,80,
16,database,Oracle,75,
17,database,SQL,85,
18,cloud,Firebase,85,
19,devops,Linux,90,
20,devops,Windows,95,
21,devops,Mac OS,70,
22,tools,Microsoft Office,90,
23,tools,Adobe Photoshop,75,
24,tools,Adobe Illustrator,70,
25,tools,Blender,65,
26,tools,LibreOffice,85,
27,tools,Microsoft Excel,90,
28,tools,Microsoft PowerPoint,85,
29,tools,Microsoft Word,90,
30,tools,Microsoft Outlook,85,
31,infraestrutura,Redes,90,
32,infraestrutura,Hardware,95,
33,infraestrutura,CFTV,85,
34,infraestrutura,VoIP,80,
35,infraestrutura,PABX,80`,
  
  'contacts.csv': `id,name,email,subject,message,createdAt`
};

// Create files with default data
Object.entries(defaultFiles).forEach(([filename, content]) => {
  const filePath = join(dataDir, filename);
  if (!existsSync(filePath)) {
    writeFileSync(filePath, content);
    console.log(`Created ${filename}`);
  }
});

console.log('Data initialization complete!');