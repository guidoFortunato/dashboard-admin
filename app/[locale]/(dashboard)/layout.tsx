import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/login?unauthorized=true");
  }

  return (
    <DashboardShell
      userEmail={profile?.email ?? user.email}
      userName={profile?.full_name ?? undefined}
      userRole={profile?.role ?? undefined}
    >
      {children}
    </DashboardShell>
  );
}
