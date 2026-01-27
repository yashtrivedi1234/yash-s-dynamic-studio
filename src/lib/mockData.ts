import { Project, Certificate, Experience, Skill, Achievement, Education, AboutData, SocialLinks } from './types';
import projectAiBot from '@/assets/project-ai-bot.jpg';
import projectEcommerce from '@/assets/project-ecommerce.jpg';
import projectChat from '@/assets/project-chat.jpg';
import certAws from '@/assets/cert-aws.jpg';

export const aboutData: AboutData = {
  bio: "Hey there! I'm Yash Trivedi, a passionate Full-Stack MERN Developer and AI Integrator from Sitapur, Uttar Pradesh. I love building products that solve real problems and make people's lives easier. When I'm not coding, you'll find me exploring new technologies, contributing to open source, or enjoying a good cup of chai.",
  highlights: {
    yearsOfExperience: 3,
    projectsCompleted: 25,
    techFocus: ['MERN Stack', 'AI/ML Integration', 'Cloud Architecture', 'API Design'],
  },
  resumeUrl: '/resume.pdf',
};

export const socialLinks: SocialLinks = {
  github: 'https://github.com/yashtrivedi',
  linkedin: 'https://linkedin.com/in/yashtrivedi',
  twitter: 'https://twitter.com/yashtrivedi',
  email: 'yash@example.com',
  website: 'https://yashtrivedi.dev',
};

export const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Code Review Bot',
    description: 'An intelligent GitHub bot that automatically reviews pull requests using GPT-4, providing suggestions and catching bugs before they reach production.',
    longDescription: 'Built with Node.js, integrated with GitHub API, and powered by OpenAI GPT-4. Handles code analysis, security checks, and provides actionable feedback.',
    techStack: ['Node.js', 'TypeScript', 'OpenAI API', 'GitHub API', 'MongoDB'],
    githubUrl: 'https://github.com/yashtrivedi/code-review-bot',
    liveUrl: 'https://codereviewbot.dev',
    images: [projectAiBot],
    category: 'ai',
    featured: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  },
  {
    id: '2',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    githubUrl: 'https://github.com/yashtrivedi/ecommerce',
    liveUrl: 'https://shopease.demo',
    images: [projectEcommerce],
    category: 'fullstack',
    featured: true,
    createdAt: '2023-11-10',
    updatedAt: '2024-01-05',
  },
  {
    id: '3',
    title: 'Real-time Chat Application',
    description: 'Scalable chat application with video calling, file sharing, and end-to-end encryption.',
    techStack: ['React', 'Socket.io', 'WebRTC', 'Express', 'PostgreSQL'],
    githubUrl: 'https://github.com/yashtrivedi/chatapp',
    images: [projectChat],
    category: 'fullstack',
    featured: false,
    createdAt: '2023-09-20',
    updatedAt: '2023-10-15',
  },
  {
    id: '4',
    title: 'REST API Generator',
    description: 'CLI tool that generates production-ready REST APIs from database schemas with authentication and validation.',
    techStack: ['Node.js', 'TypeScript', 'Commander.js', 'Handlebars'],
    githubUrl: 'https://github.com/yashtrivedi/api-generator',
    images: [projectAiBot],
    category: 'backend',
    featured: false,
    createdAt: '2023-07-01',
    updatedAt: '2023-08-10',
  },
];

export const certificates: Certificate[] = [
  {
    id: '1',
    title: 'AWS Solutions Architect Associate',
    issuer: 'Amazon Web Services',
    issueDate: '2024-01-10',
    imageUrl: certAws,
    credentialUrl: 'https://aws.amazon.com/verify',
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    title: 'MongoDB Certified Developer',
    issuer: 'MongoDB University',
    issueDate: '2023-11-15',
    imageUrl: certAws,
    credentialUrl: 'https://university.mongodb.com',
    createdAt: '2023-11-15',
  },
  {
    id: '3',
    title: 'Meta Front-End Developer',
    issuer: 'Meta (Coursera)',
    issueDate: '2023-08-20',
    imageUrl: certAws,
    createdAt: '2023-08-20',
  },
];

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'TechCorp Solutions',
    role: 'Senior Full-Stack Developer',
    startDate: '2023-06-01',
    current: true,
    description: 'Leading development of microservices architecture, mentoring junior developers, and implementing CI/CD pipelines. Reduced deployment time by 60% and improved system reliability.',
    techStack: ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes'],
    createdAt: '2023-06-01',
  },
  {
    id: '2',
    company: 'StartupXYZ',
    role: 'Full-Stack Developer',
    startDate: '2022-01-15',
    endDate: '2023-05-30',
    current: false,
    description: 'Built and maintained multiple web applications. Implemented real-time features using WebSockets and integrated third-party APIs.',
    techStack: ['React', 'Express', 'MongoDB', 'Socket.io'],
    createdAt: '2022-01-15',
  },
  {
    id: '3',
    company: 'Freelance',
    role: 'Web Developer',
    startDate: '2021-03-01',
    endDate: '2021-12-31',
    current: false,
    description: 'Developed custom websites and web applications for various clients. Focused on responsive design and performance optimization.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'PHP'],
    createdAt: '2021-03-01',
  },
];

export const skills: Skill[] = [
  // Frontend
  { id: '1', name: 'React', category: 'frontend', proficiency: 95, visible: true },
  { id: '2', name: 'TypeScript', category: 'frontend', proficiency: 90, visible: true },
  { id: '3', name: 'Next.js', category: 'frontend', proficiency: 85, visible: true },
  { id: '4', name: 'Tailwind CSS', category: 'frontend', proficiency: 95, visible: true },
  { id: '5', name: 'Vue.js', category: 'frontend', proficiency: 70, visible: true },
  // Backend
  { id: '6', name: 'Node.js', category: 'backend', proficiency: 95, visible: true },
  { id: '7', name: 'Express.js', category: 'backend', proficiency: 90, visible: true },
  { id: '8', name: 'Python', category: 'backend', proficiency: 80, visible: true },
  { id: '9', name: 'GraphQL', category: 'backend', proficiency: 85, visible: true },
  // Database
  { id: '10', name: 'MongoDB', category: 'database', proficiency: 95, visible: true },
  { id: '11', name: 'PostgreSQL', category: 'database', proficiency: 85, visible: true },
  { id: '12', name: 'Redis', category: 'database', proficiency: 80, visible: true },
  // DevOps
  { id: '13', name: 'Docker', category: 'devops', proficiency: 85, visible: true },
  { id: '14', name: 'AWS', category: 'devops', proficiency: 80, visible: true },
  { id: '15', name: 'CI/CD', category: 'devops', proficiency: 85, visible: true },
  // AI
  { id: '16', name: 'OpenAI API', category: 'ai', proficiency: 90, visible: true },
  { id: '17', name: 'LangChain', category: 'ai', proficiency: 75, visible: true },
  { id: '18', name: 'TensorFlow', category: 'ai', proficiency: 65, visible: true },
  // Tools
  { id: '19', name: 'Git', category: 'tools', proficiency: 95, visible: true },
  { id: '20', name: 'VS Code', category: 'tools', proficiency: 95, visible: true },
  { id: '21', name: 'Figma', category: 'tools', proficiency: 70, visible: true },
];

export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Hackathon Winner - TechFest 2024',
    description: 'Won first place for building an AI-powered accessibility tool for visually impaired users.',
    date: '2024-01-20',
    proofUrl: 'https://techfest.com/winners',
    createdAt: '2024-01-20',
  },
  {
    id: '2',
    title: 'Open Source Contributor',
    description: 'Contributed to major open-source projects including React and Node.js ecosystem tools.',
    date: '2023-12-01',
    createdAt: '2023-12-01',
  },
  {
    id: '3',
    title: '1000+ GitHub Stars',
    description: 'Personal projects have collectively received over 1000 stars on GitHub.',
    date: '2023-10-15',
    proofUrl: 'https://github.com/yashtrivedi',
    createdAt: '2023-10-15',
  },
];

export const education: Education[] = [
  {
    id: '1',
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'ABC Institute of Technology',
    location: 'Lucknow, Uttar Pradesh',
    startYear: '2018',
    endYear: '2022',
    current: false,
    description: 'Specialized in Software Engineering with focus on Web Technologies and AI.',
    grade: '8.5 CGPA',
  },
  {
    id: '2',
    degree: 'Higher Secondary (12th)',
    institution: 'XYZ Public School',
    location: 'Sitapur, Uttar Pradesh',
    startYear: '2016',
    endYear: '2018',
    current: false,
    grade: '92%',
  },
];
