import Link from "next/link";
import { ChevronLeft, ChevronRight, Users, UserCheck, TrendingUp } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getClients } from "@/lib/supabase/clients";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

interface ClientsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ClientsPage({ searchParams }: ClientsPageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));

  const { clients, total, limit } = await getClients(currentPage);

  const t = await getTranslations("clients");

  const totalPages = Math.ceil(total / limit);
  const activeCount = clients.filter((c) => c.active).length;
  const totalRevenue = clients.reduce((sum, c) => sum + c.total_spent, 0);

  const summaryCards = [
    {
      label: t("totalClients"),
      value: String(total),
      icon: Users,
      iconBg: "bg-blue-50 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: t("activeClients"),
      value: String(activeCount),
      icon: UserCheck,
      iconBg: "bg-green-50 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      label: t("totalRevenue"),
      value: formatCurrency(totalRevenue),
      icon: TrendingUp,
      iconBg: "bg-primary/10 dark:bg-primary/20",
      iconColor: "text-primary",
    },
  ];

  const pageNumbers = buildPageNumbers(currentPage, totalPages);

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 sm:text-2xl">
          {t("title")}
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {t("subtitle")}
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-3 mb-8">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 sm:p-6"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 rounded-lg ${card.iconBg} ${card.iconColor}`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {card.label}
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100 sm:text-2xl">
                {card.value}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Clients table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-slate-800 dark:text-slate-100">
            {t("allClients")}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700">
                <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {t("columns.user")}
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {t("columns.email")}
                </th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {t("columns.totalSpent")}
                </th>
                <th className="px-6 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {t("columns.action")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-sm text-slate-400">
                    {t("noClients")}
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {client.full_name ?? "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {client.email}
                      </span>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4">
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {formatCurrency(client.total_spent)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/clients/${client.id}`}
                        className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        {t("viewDetails")}
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer: count + pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("showing", { count: clients.length, total })}
          </p>

          {totalPages > 1 && (
            <nav className="flex items-center gap-1" aria-label="Pagination">
              <PaginationLink
                href={`?page=${currentPage - 1}`}
                disabled={currentPage <= 1}
                aria-label={t("previousPage")}
              >
                <ChevronLeft className="w-4 h-4" />
              </PaginationLink>

              {pageNumbers.map((item, idx) =>
                item === "…" ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="w-9 h-9 flex items-center justify-center text-sm text-slate-400"
                  >
                    …
                  </span>
                ) : (
                  <PaginationLink
                    key={item}
                    href={`?page=${item}`}
                    active={item === currentPage}
                  >
                    {item}
                  </PaginationLink>
                )
              )}

              <PaginationLink
                href={`?page=${currentPage + 1}`}
                disabled={currentPage >= totalPages}
                aria-label={t("nextPage")}
              >
                <ChevronRight className="w-4 h-4" />
              </PaginationLink>
            </nav>
          )}
        </div>
      </div>
    </>
  );
}

function PaginationLink({
  href,
  active,
  disabled,
  children,
  "aria-label": ariaLabel,
}: {
  href: string;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  const base =
    "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors";
  if (disabled) {
    return (
      <span className={`${base} text-slate-300 dark:text-slate-600 cursor-not-allowed`}>
        {children}
      </span>
    );
  }
  if (active) {
    return (
      <span className={`${base} bg-primary text-white`} aria-current="page">
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`${base} text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700`}
    >
      {children}
    </Link>
  );
}

function buildPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [];
  pages.push(1);
  if (current > 3) pages.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}
