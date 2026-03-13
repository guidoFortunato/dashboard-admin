"use client";

import { useRouter } from "next/navigation";
import { Search, LogOut, Menu, Globe, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter as useIntlRouter, usePathname } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface HeaderProps {
  userEmail?: string;
  userName?: string;
  userRole?: string;
  onOpenMobileMenu?: () => void;
}

const LOCALES = [
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
] as const;

export default function Header({
  userEmail,
  userName,
  userRole,
  onOpenMobileMenu,
}: HeaderProps) {
  const router = useRouter();
  const intlRouter = useIntlRouter();
  const pathname = usePathname();
  const t = useTranslations("header");
  const currentLocale = useLocale();

  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

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

  function handleLocaleChange(locale: string) {
    intlRouter.replace(pathname, { locale });
    setLangOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-800/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {/* Mobile menu + Search */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
          aria-label={t("openMenu")}
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
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-lg border-none bg-slate-100 py-2 pl-10 pr-4 text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Right side: language + theme + user + logout */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {/* Language Dropdown */}
        <div ref={langRef} className="relative">
          <button
            type="button"
            onClick={() => setLangOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={t("language")}
            aria-expanded={langOpen}
            aria-haspopup="listbox"
          >
            <Globe className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline font-semibold uppercase text-xs tracking-wide">
              {currentLocale}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>

          {langOpen && (
            <div
              role="listbox"
              aria-label={t("language")}
              className="absolute right-0 mt-1.5 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1 z-50"
            >
              {LOCALES.map(({ code, label }) => (
                <button
                  key={code}
                  role="option"
                  aria-selected={currentLocale === code}
                  onClick={() => handleLocaleChange(code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${
                    currentLocale === code
                      ? "text-primary font-semibold bg-primary/5"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  }`}
                >
                  {label}
                  {currentLocale === code && (
                    <Check className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <ThemeToggle />

        {/* User info */}
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

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg cursor-pointer text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-red-500 transition-colors"
          aria-label={t("signOut")}
          title={t("signOut")}
        >
          <LogOut className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
