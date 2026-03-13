export type ProjectStatus = "todo" | "in_progress" | "completed" | "abandoned";

export interface SupabaseClient {
  id: string;
  full_name: string | null;
  email: string;
  created_at: string;
  active: boolean;
  project_type: string | null;
  project_description: string | null;
  project_status: ProjectStatus | null;
  total_spent: number;
}

export interface PaginatedClients {
  clients: SupabaseClient[];
  total: number;
  page: number;
  limit: number;
}
