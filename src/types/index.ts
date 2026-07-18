export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  careerGoal?: string;
  skills?: string[];
}

export interface CareerItem {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  rating: number;
  imageUrl?: string;
  createdBy: string;
  createdAt: string;
}

export interface ResumeAnalysis {
  _id: string;
  resumeText: string;
  extractedSkills: string[];
  strengths: string[];
  gaps: string[];
  summary: string;
  createdAt: string;
}

export interface Recommendation {
  _id: string;
  careerGoal: string;
  roadmap: { step: string; description: string }[];
  recommendedSkills: string[];
  recommendedRoles: string[];
  createdAt: string;
}
