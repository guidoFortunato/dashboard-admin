"use client";

import { useRouter } from "next/navigation";
import { Search, LogOut, Menu } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface HeaderProps {
  userEmail?: string;
  userName?: string;
  userRole?: string;
  onOpenMobileMenu?: () => void;
}

export default function Header({
  userEmail,
  userName,
  userRole,
  onOpenMobileMenu,
}: HeaderProps) {
  const router = useRouter();

  const displayName = userName || userEmail?.split("@")[0] || "Admin";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const roleLabel =
    userRole === "client" ? "Client" : userRole === "admin" ? "Admin" : "Admin";

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {/* Menú móvil + Search */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" aria-hidden="true" />
        </button>
        <div className="relative hidden w-full max-w-xs md:block md:max-w-sm">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search data, clients, or files..."
            className="w-full rounded-lg border-none bg-slate-100 py-2 pl-10 pr-4 text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* User + Logout */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-semibold capitalize text-slate-900 dark:text-slate-100">
            {displayName}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            {roleLabel}
          </p>
        </div>
        <div className="size-9 rounded-full bg-primary/10 text-primary ring-2 ring-primary/10 flex items-center justify-center text-xs font-bold">
          {initials}
        </div>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg cursor-pointer text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-red-500 transition-colors"
          aria-label="Sign out"
          title="Sign out"
        >
          <LogOut className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
