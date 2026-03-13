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
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type { ClientLead, ProjectStatus, ProjectType } from "@/types/client";
import { updateClient } from "../../_actions";

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
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [fullName, setFullName] = useState(client.full_name ?? "");
  const [email, setEmail] = useState(client.email);
  const [projectType, setProjectType] = useState<ProjectType | null>(
    client.project_type
  );
  const [projectDescription, setProjectDescription] = useState(
    client.project_description ?? ""
  );
  const [projectStatus, setProjectStatus] = useState<ProjectStatus | null>(
    client.project_status
  );
  const [isClientActive, setIsClientActive] = useState(client.is_client_active);
  const [projectAmount, setProjectAmount] = useState<string>(
    client.project_amount != null ? String(client.project_amount) : ""
  );

  const handleSave = () => {
    startTransition(async () => {
      await updateClient(client.id, {
        full_name: fullName || null,
        email,
        project_type: projectType,
        project_description: projectDescription || null,
        project_status: projectStatus,
        is_client_active: isClientActive,
        project_amount:
          projectAmount.trim() === "" ? null : Number(projectAmount.replace(",", ".")),
      });
      setIsEditing(false);
      router.refresh();
    });
  };

  const resetForm = () => {
    setFullName(client.full_name ?? "");
    setEmail(client.email);
    setProjectType(client.project_type);
    setProjectDescription(client.project_description ?? "");
    setProjectStatus(client.project_status);
    setIsClientActive(client.is_client_active);
    setProjectAmount(
      client.project_amount != null ? String(client.project_amount) : ""
    );
  };

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
          {/* Name + active badge */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {isEditing ? (
                <input
                  className="w-full max-w-xs rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t("clientNamePlaceholder") ?? undefined}
                />
              ) : (
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 truncate">
                  {client.full_name ?? "—"}
                </h3>
              )}
              <span
                className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                  isClientActive
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                }`}
              >
                {isClientActive ? t("clientActive") : t("clientInactive")}
              </span>
            </div>
            <span className="text-sm text-slate-400">
              {t("joined")} {formatDate(client.created_at)}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => {
                if (isEditing) {
                  resetForm();
                  setIsEditing(false);
                } else {
                  setIsEditing(true);
                }
              }}
              className="px-4 py-2 text-sm font-semibold border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 text-slate-700 dark:text-slate-300"
            >
              <Edit className="w-4 h-4" />
              {isEditing ? t("cancelEdit") : t("editProfile")}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleSave}
                disabled={isPending}
                className="px-5 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                {t("saveChanges")}
              </button>
            )}
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
            {isEditing ? (
              <input
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 shadow-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100 break-all">
                {client.email}
              </p>
            )}
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

      {/* Project progress */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2">
          <RocketIcon className="w-5 h-5 text-primary" />
          <h4 className="font-bold text-slate-800 dark:text-slate-100">
            {t("projectProgress")}
          </h4>
        </div>
        <div className="p-6">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                    {tc("columns.projectType")}
                  </p>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 shadow-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    value={projectType ?? ""}
                    onChange={(e) =>
                      setProjectType(
                        (e.target.value || null) as ProjectType | null
                      )
                    }
                  >
                    <option value="">{t("noProjectTypeOption") ?? "—"}</option>
                    <option value="ecommerce">
                      {tc("projectTypes.ecommerce" as Parameters<typeof tc>[0])}
                    </option>
                    <option value="website">
                      {tc("projectTypes.website" as Parameters<typeof tc>[0])}
                    </option>
                    <option value="landing_page">
                      {tc("projectTypes.landing_page" as Parameters<typeof tc>[0])}
                    </option>
                    <option value="mobile_app">
                      {tc("projectTypes.mobile_app" as Parameters<typeof tc>[0])}
                    </option>
                    <option value="other">
                      {tc("projectTypes.other" as Parameters<typeof tc>[0])}
                    </option>
                  </select>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                    {t("projectStatusLabel") ?? "Status"}
                  </p>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 shadow-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    value={projectStatus ?? ""}
                    onChange={(e) =>
                      setProjectStatus(
                        (e.target.value || null) as ProjectStatus | null
                      )
                    }
                  >
                    <option value="">{t("noStatusOption") ?? "—"}</option>
                    <option value="todo">{t("status.todo")}</option>
                    <option value="in_progress">{t("status.in_progress")}</option>
                    <option value="completed">{t("status.completed")}</option>
                    <option value="abandoned">{t("status.abandoned")}</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                    {t("projectDescriptionLabel") ?? "Description"}
                  </p>
                  <textarea
                    className="w-full min-h-[80px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                    {t("projectAmountLabel") ?? "Amount paid"}
                  </p>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 shadow-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    value={projectAmount}
                    onChange={(e) => setProjectAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="is-client-active-checkbox"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-600"
                  checked={isClientActive}
                  onChange={(e) => setIsClientActive(e.target.checked)}
                />
                <label
                  htmlFor="is-client-active-checkbox"
                  className="text-sm text-slate-700 dark:text-slate-200"
                >
                  {t("clientActive")}
                </label>
              </div>
            </div>
          ) : client.project_type ? (
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
                  {client.project_amount != null && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      {t("projectAmountLabel")}:{" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(Number(client.project_amount))}
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
