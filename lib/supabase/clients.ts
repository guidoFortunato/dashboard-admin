import { createClient } from "@/lib/supabase/server";
import type { ClientLead, PaginatedClients } from "@/types/client";

const PAGE_SIZE = 5;

export async function getClients(page = 1): Promise<PaginatedClients> {
  const supabase = await createClient();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from("clients")
    .select(
      `
      id,
      full_name,
      email,
      project_type,
      project_description,
      project_status,
      is_client_active,
      project_amount,
      created_at
    `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  const clients: ClientLead[] = (data ?? []).map((row) => ({
    id: row.id,
    full_name: row.full_name,
    email: row.email,
    project_type: row.project_type,
    project_description: row.project_description,
    project_status: row.project_status,
    is_client_active: row.is_client_active ?? true,
    project_amount: row.project_amount,
    created_at: row.created_at,
  }));

  return { clients, total: count ?? 0, page, limit: PAGE_SIZE };
}

export async function getClientsStats(): Promise<{
  total: number;
  inProgress: number;
  completed: number;
  todo: number;
  abandoned: number;
  totalAmount: number;
}> {
  const supabase = await createClient();

  const [totalRes, inProgressRes, completedRes, todoRes, abandonedRes, amountRes] =
    await Promise.all([
      supabase.from("clients").select("id", { count: "exact", head: true }),
      supabase
        .from("clients")
        .select("id", { count: "exact", head: true })
        .eq("project_status", "in_progress"),
      supabase
        .from("clients")
        .select("id", { count: "exact", head: true })
        .eq("project_status", "completed"),
      supabase
        .from("clients")
        .select("id", { count: "exact", head: true })
        .eq("project_status", "todo"),
      supabase
        .from("clients")
        .select("id", { count: "exact", head: true })
        .eq("project_status", "abandoned"),
      supabase.from("clients").select("project_amount"),
    ]);

  type AmountRow = { project_amount: number | null };

  const totalAmount = (amountRes.data as AmountRow[] | null | undefined)?.reduce(
    (sum: number, row: AmountRow) =>
      sum + (row.project_amount != null ? Number(row.project_amount) : 0),
    0,
  ) ?? 0;

  return {
    total: totalRes.count ?? 0,
    inProgress: inProgressRes.count ?? 0,
    completed: completedRes.count ?? 0,
    todo: todoRes.count ?? 0,
    abandoned: abandonedRes.count ?? 0,
    totalAmount,
  };
}

export async function getClientById(id: string): Promise<ClientLead | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clients")
    .select(
      `
      id,
      full_name,
      email,
      project_type,
      project_description,
      project_status,
      is_client_active,
      project_amount,
      created_at
    `
    )
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    full_name: data.full_name,
    email: data.email,
    project_type: data.project_type,
    project_description: data.project_description,
    project_status: data.project_status,
    is_client_active: data.is_client_active ?? true,
    project_amount: data.project_amount,
    created_at: data.created_at,
  };
}
