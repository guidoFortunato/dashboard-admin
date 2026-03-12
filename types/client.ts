export type ProjectStatus = "IN_PROGRESS" | "COMPLETED" | "PENDING";

export interface Project {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  progressPercent: number;
  status: ProjectStatus;
  teamMembers: string[];
}

export type FileType = "pdf" | "image" | "zip" | "doc" | "other";

export interface FileItem {
  id: string;
  name: string;
  sizeLabel: string;
  uploadedAt: string;
  type: FileType;
}

export type ClientStatus = "active" | "inactive";

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  totalSpent: number;
  joinedAt: string;
  lastInteraction: string;
  status: ClientStatus;
  accountHealth: {
    score: number;
    maxScore: number;
    tier: string;
    description: string;
  };
  projects: Project[];
  files: FileItem[];
  avatarUrl?: string;
}
