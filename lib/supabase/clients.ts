import { createClient } from "@/lib/supabase/server";
import type { PaginatedClients, SupabaseClient } from "@/types/client";

const PAGE_SIZE = 5;

export async function getClients(page = 1): Promise<PaginatedClients> {
  const supabase = await createClient();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from("profiles")
    .select(
      `
      id,
      full_name,
      email,
      created_at,
      active,
      project_type,
      project_description,
      project_status,
      payments (amount)
    `,
      { count: "exact" }
    )
    .eq("role", "client")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  const clients: SupabaseClient[] = (data ?? []).map((row) => {
    const payments = (row.payments as { amount: number }[] | null) ?? [];
    const total_spent = payments.reduce((sum, p) => sum + (p.amount ?? 0), 0);
    return {
      id: row.id,
      full_name: row.full_name,
      email: row.email,
      created_at: row.created_at,
      active: row.active,
      project_type: row.project_type,
      project_description: row.project_description,
      project_status: row.project_status,
      total_spent,
    };
  });

  return { clients, total: count ?? 0, page, limit: PAGE_SIZE };
}

export async function getClientById(id: string): Promise<SupabaseClient | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
      id,
      full_name,
      email,
      created_at,
      active,
      project_type,
      project_description,
      project_status,
      payments (amount)
    `
    )
    .eq("id", id)
    .eq("role", "client")
    .single();

  if (error || !data) return null;

  const payments = (data.payments as { amount: number }[] | null) ?? [];
  const total_spent = payments.reduce((sum, p) => sum + (p.amount ?? 0), 0);

  return {
    id: data.id,
    full_name: data.full_name,
    email: data.email,
    created_at: data.created_at,
    active: data.active,
    project_type: data.project_type,
    project_description: data.project_description,
    project_status: data.project_status,
    total_spent,
  };
}
