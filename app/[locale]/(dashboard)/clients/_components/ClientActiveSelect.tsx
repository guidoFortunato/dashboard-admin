"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { updateClientActive } from "../_actions";

export default function ClientActiveSelect({
  clientId,
  value,
}: {
  clientId: string;
  value: boolean;
}) {
  const t = useTranslations("clients");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <select
      className="h-9 w-full min-w-[100px] max-w-[140px] rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-700 shadow-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
      value={value ? "true" : "false"}
      disabled={isPending}
      aria-label={t("columns.active")}
      onChange={(e) => {
        const next = e.target.value === "true";
        startTransition(async () => {
          await updateClientActive(clientId, next);
          router.refresh();
        });
      }}
    >
      <option value="true">{t("active")}</option>
      <option value="false">{t("inactive")}</option>
    </select>
  );
}

