"use client";

import Link from "next/link";
import {
  Edit,
  Send,
  RocketIcon,
  CheckCircle2,
  Clock,
  Loader2,
  Ban,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { ClientLead, ProjectStatus, ProjectType } from "@/types/client";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const STATUS_ICON: Record<ProjectStatus, React.ReactNode> = {
  in_progress: <Loader2 className="w-3.5 h-3.5" />,
  completed: <CheckCircle2 className="w-3.5 h-3.5" />,
  todo: <Clock className="w-3.5 h-3.5" />,
  abandoned: <Ban className="w-3.5 h-3.5" />,
};

const STATUS_CLASS: Record<ProjectStatus, string> = {
  in_progress: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  todo: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  abandoned: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

interface ClientDetailContentProps {
  client: ClientLead;
}

export default function ClientDetailContent({ client }: ClientDetailContentProps) {
  const t = useTranslations("clientDetail");
  const tc = useTranslations("clients");

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link
          href="/clients"
          className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          {t("breadcrumb")}
        </Link>
        <span className="text-slate-300 dark:text-slate-700">/</span>
        <span className="text-slate-900 dark:text-slate-100 font-medium">
          {client.full_name ?? client.email}
        </span>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Name */}
          <div className="min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 truncate">
              {client.full_name ?? "—"}
            </h3>
            <span className="text-sm text-slate-400">
              {t("joined")} {formatDate(client.created_at)}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <button className="px-4 py-2 text-sm font-semibold border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Edit className="w-4 h-4" />
              {t("editProfile")}
            </button>
            <button className="px-5 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
              <Send className="w-4 h-4" />
              {t("sendMessage")}
            </button>
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8 pt-8 border-t border-slate-100 dark:border-slate-700">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
              {t("email")}
            </p>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 break-all">
              {client.email}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
              {t("joined")}
            </p>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {formatDate(client.created_at)}
            </p>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2">
          <RocketIcon className="w-5 h-5 text-primary" />
          <h4 className="font-bold text-slate-800 dark:text-slate-100">
            {t("activeProjects")}
          </h4>
        </div>
        <div className="p-6">
          {client.project_type ? (
            <div className="relative pl-6 border-l-2 border-primary/20">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-primary rounded-full" />
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                    {tc(`projectTypes.${client.project_type}` as Parameters<typeof tc>[0])}
                  </h5>
                  {client.project_description && (
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {client.project_description}
                    </p>
                  )}
                </div>
                {client.project_status && (
                  <span
                    className={`inline-flex items-center gap-1 shrink-0 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${STATUS_CLASS[client.project_status]}`}
                  >
                    {STATUS_ICON[client.project_status]}
                    {t(`status.${client.project_status}`)}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400 text-center py-4">
              {t("noProjects")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Suppress unused import — used via generics in tc() call
void (null as unknown as ProjectType);
