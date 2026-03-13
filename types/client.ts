export type ProjectStatus = "todo" | "in_progress" | "completed" | "abandoned";

export type ProjectType =
  | "ecommerce"
  | "website"
  | "landing_page"
  | "mobile_app"
  | "other";

export interface ClientLead {
  id: string;
  full_name: string;
  email: string;
  project_type: ProjectType | null;
  project_description: string | null;
  project_status: ProjectStatus | null;
  created_at: string;
}

export interface PaginatedClients {
  clients: ClientLead[];
  total: number;
  page: number;
  limit: number;
}
