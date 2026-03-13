"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ProjectStatus, ProjectType } from "@/types/client";

export type UpdateClientPayload = {
  full_name?: string | null;
  email?: string;
  project_type?: ProjectType | null;
  project_description?: string | null;
  project_status?: ProjectStatus | null;
  is_client_active?: boolean;
  project_amount?: number | null;
};

function assertEmail(email: string) {
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!ok) throw new Error("INVALID_EMAIL");
}

export async function updateClient(id: string, payload: UpdateClientPayload) {
  const supabase = await createClient();

  if (payload.email) assertEmail(payload.email);

  const { error } = await supabase.from("clients").update(payload).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/clients");
  revalidatePath(`/clients/${id}`);
}

export async function updateClientProgress(id: string, status: ProjectStatus | null) {
  await updateClient(id, { project_status: status });
}

export async function updateClientActive(id: string, isActive: boolean) {
  await updateClient(id, { is_client_active: isActive });
}

export async function deleteClient(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/clients");
  revalidatePath(`/clients/${id}`);
}

