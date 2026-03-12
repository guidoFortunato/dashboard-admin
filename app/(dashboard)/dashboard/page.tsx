import { createClient } from "@/lib/supabase/server";
import { UserPlus, Users, Wallet } from "lucide-react";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

async function getDashboardMetrics() {
  const supabase = await createClient();

  const [usersRes, activeClientsRes, revenueRes] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("role", "client")
      .eq("active", true),
    (async () => {
      const start = new Date();
      start.setUTCDate(1);
      start.setUTCHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setUTCMonth(end.getUTCMonth() + 1);
      const { data } = await supabase
        .from("payments")
        .select("amount")
        .gte("paid_at", start.toISOString())
        .lt("paid_at", end.toISOString());
      const total = (data ?? []).reduce((sum, row) => sum + Number(row.amount), 0);
      return total;
    })(),
  ]);

  const totalUsers = usersRes.count ?? 0;
  const activeClients = activeClientsRes.count ?? 0;
  const monthlyRevenue = revenueRes;

  return {
    totalUsers,
    activeClients,
    monthlyRevenue,
  };
}

export default async function DashboardPage() {
  const { totalUsers, activeClients, monthlyRevenue } =
    await getDashboardMetrics();

  const metrics = [
    {
      label: "Total Registered Users",
      value: formatNumber(totalUsers),
      icon: UserPlus,
      iconBg: "bg-blue-50 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Active Clients",
      value: formatNumber(activeClients),
      icon: Users,
      iconBg: "bg-indigo-50 dark:bg-indigo-900/30",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      label: "Monthly Revenue",
      value: formatCurrency(monthlyRevenue),
      icon: Wallet,
      iconBg: "bg-emerald-50 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <>
      {/* Page heading */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 sm:text-2xl">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Welcome back. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Metric cards - responsive: 1 col mobile, 2 tablet, 3 desktop */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div
                  className={`p-2 rounded-lg ${metric.iconBg} ${metric.iconColor}`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {metric.label}
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100 sm:text-2xl">
                {metric.value}
              </h3>
            </div>
          );
        })}
      </div>
    </>
  );
}
