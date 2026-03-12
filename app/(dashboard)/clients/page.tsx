import Link from "next/link";
import { Users, UserCheck, TrendingUp, ChevronRight } from "lucide-react";
import { MOCK_CLIENTS } from "@/lib/mock/clients";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ClientsPage() {
  const totalClients = MOCK_CLIENTS.length;
  const activeClients = MOCK_CLIENTS.filter((c) => c.status === "active").length;
  const totalRevenue = MOCK_CLIENTS.reduce((sum, c) => sum + c.totalSpent, 0);

  const summaryCards = [
    {
      label: "Total Clients",
      value: String(totalClients),
      icon: Users,
      iconBg: "bg-blue-50 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Active Clients",
      value: String(activeClients),
      icon: UserCheck,
      iconBg: "bg-green-50 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      label: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: TrendingUp,
      iconBg: "bg-primary/10 dark:bg-primary/20",
      iconColor: "text-primary",
    },
  ];

  return (
    <>
      {/* Page heading */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 sm:text-2xl">
          Clients
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage and review your client accounts.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-3 mb-8">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6"
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

      {/* Clients list */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-800 dark:text-slate-100">
            All Clients
          </h3>
        </div>
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {MOCK_CLIENTS.map((client) => {
            const isActive = client.status === "active";
            return (
              <li key={client.id}>
                <Link
                  href={`/clients/${client.id}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-slate-100 dark:border-slate-800 overflow-hidden">
                      {client.avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={client.avatarUrl}
                          alt={client.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-bold text-primary">
                          {client.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                        isActive ? "bg-green-500" : "bg-slate-400"
                      }`}
                    />
                  </div>

                  {/* Name + company */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {client.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {client.company}
                    </p>
                  </div>

                  {/* Status badge — hidden on small screens */}
                  <span
                    className={`hidden sm:inline-flex shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                      isActive
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </span>

                  {/* Total spent — hidden on small screens */}
                  <span className="hidden md:block shrink-0 text-sm font-semibold text-primary">
                    {formatCurrency(client.totalSpent)}
                  </span>

                  {/* Arrow */}
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors shrink-0" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
