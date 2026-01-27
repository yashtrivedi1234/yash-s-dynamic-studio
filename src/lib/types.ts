// Portfolio Data Types - Backend Ready Schema

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  images: string[];
  category: 'fullstack' | 'backend' | 'ai' | 'personal';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  imageUrl: string;
  credentialUrl?: string;
  createdAt: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  techStack: string[];
  logo?: string;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'ai' | 'tools';
  proficiency: number; // 1-100
  visible: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  proofUrl?: string;
  date: string;
  icon?: string;
  createdAt: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear?: string;
  current: boolean;
  description?: string;
  grade?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface AboutData {
  bio: string;
  highlights: {
    yearsOfExperience: number;
    projectsCompleted: number;
    techFocus: string[];
  };
  resumeUrl?: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email: string;
  website?: string;
}
