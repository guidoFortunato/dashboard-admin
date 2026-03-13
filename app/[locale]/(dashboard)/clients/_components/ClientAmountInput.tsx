"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateClient } from "../_actions";

export default function ClientAmountInput({
  clientId,
  value,
}: {
  clientId: string;
  value: number | null | undefined;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <input
      type="number"
      min="0"
      step="0.01"
      className="h-9 w-full min-w-[120px] max-w-[160px] rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-700 shadow-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
      defaultValue={value != null ? String(value) : ""}
      disabled={isPending}
      onBlur={(e) => {
        const raw = e.target.value.trim();
        const amount = raw === "" ? null : Number(raw.replace(",", "."));
        startTransition(async () => {
          await updateClient(clientId, { project_amount: Number.isNaN(amount) ? null : amount });
          router.refresh();
        });
      }}
    />
  );
}

