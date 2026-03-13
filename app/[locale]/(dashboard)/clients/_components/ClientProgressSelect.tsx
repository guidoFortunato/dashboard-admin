"use client";

import { useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type { ProjectStatus } from "@/types/client";
import { updateClientProgress } from "../_actions";

export default function ClientProgressSelect({
  clientId,
  value,
}: {
  clientId: string;
  value: ProjectStatus | null;
}) {
  const t = useTranslations("clients");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const options = useMemo(
    () =>
      [
        { value: "", label: "—" },
        { value: "todo", label: t("status.todo") },
        { value: "in_progress", label: t("status.in_progress") },
        { value: "completed", label: t("status.completed") },
        { value: "abandoned", label: t("status.abandoned") },
      ] as const,
    [t]
  );

  return (
    <select
      className="h-9 w-full min-w-[120px] max-w-[180px] rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-700 shadow-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
      value={value ?? ""}
      disabled={isPending}
      aria-label={t("columns.progress")}
      onChange={(e) => {
        const next = (e.target.value || null) as ProjectStatus | null;
        startTransition(async () => {
          await updateClientProgress(clientId, next);
          router.refresh();
        });
      }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

