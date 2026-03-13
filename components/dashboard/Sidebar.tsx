"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, UserPlus, BarChart3, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  collapsed: boolean;
  isClosing?: boolean;
}

export default function Sidebar({
  mobileOpen,
  onCloseMobile,
  collapsed,
  isClosing = false,
}: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations("nav");

  const navItems = [
    { label: t("dashboard"), href: "/dashboard", icon: LayoutDashboard },
    { label: t("clients"), href: "/clients", icon: Users },
  ];

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  const linkProps = () => ({
    onClick: () => mobileOpen && onCloseMobile(),
  });

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 flex h-full flex-col shrink-0
        border-r border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-800
        transition-[width] duration-300 ease-in-out
        max-md:overflow-hidden
        ${mobileOpen && !isClosing ? "w-64 max-md:flex" : "w-0 max-md:invisible"}
        ${isClosing ? "max-md:w-0" : ""}
        md:w-64
        md:relative md:visible
      `}
    >
      <div className="flex h-full w-full min-w-0 flex-col overflow-hidden">
        {/* Logo */}
        <div
          className={`
            flex shrink-0 items-center gap-3
            pl-4 pr-4 pt-4 pb-4 md:justify-start md:p-6
            ${collapsed ? "max-md:justify-center max-md:px-3 max-md:py-3" : ""}
          `}
        >
          <div className="size-9 shrink-0 rounded-lg bg-primary flex items-center justify-center text-white">
            <BarChart3 className="w-5 h-5" aria-hidden="true" />
          </div>
          <div
            className={`min-w-0 flex-1 ${!collapsed || mobileOpen ? "block" : "hidden md:block"}`}
          >
            <h1 className="truncate text-base font-bold leading-tight text-slate-900 dark:text-slate-100">
              AdminPanel
            </h1>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              Digital Services
            </p>
          </div>
          {mobileOpen && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
              aria-label={t("closeMenu")}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4 md:px-4">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                {...linkProps()}
                className={`
                  flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                  ${collapsed ? "max-md:justify-center md:justify-start" : ""}
                  ${active
                    ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }
                `}
                title={collapsed && !mobileOpen ? item.label : undefined}
              >
                <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span
                  className={`truncate ${!collapsed || mobileOpen ? "" : "hidden md:inline"}`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
