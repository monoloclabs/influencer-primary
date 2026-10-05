import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BrandShell, brandMeta } from "@/components/brand/BrandShell";
import { brandActivity, brandTransactions, money } from "@/data/brand";
import { cn } from "@/lib/utils";
import { FileCheck2, MessagesSquare, FilePlus2, UserCheck, Flag } from "lucide-react";

const activityIcons = { a1: FileCheck2, a2: MessagesSquare, a3: FilePlus2, a4: UserCheck, a5: Flag } as const;

export const Route = createFileRoute("/brand/timeline")({
  head: () => brandMeta("Brand timeline | INFLUENCER", "Escrow deposits, payouts and campaign activity in one history."),
  component: BrandTimeline,
});

function BrandTimeline() {
  const [tab, setTab] = useState<"tx" | "activity">("tx");
  return (
    <BrandShell title="Timeline">
      <h2 className="pt-2 text-2xl font-extrabold tracking-tight">Timeline</h2>
      <div className="mt-4 grid grid-cols-2 rounded-full bg-surface p-1">
        {(["tx", "activity"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("h-10 rounded-full text-sm font-semibold", tab === t && "bg-card shadow-card")}>
            {t === "tx" ? "Transactions" : "Activity"}
          </button>
        ))}
      </div>
      <div className="mt-4 divide-y divide-border rounded-3xl bg-card shadow-card">
        {tab === "tx"
          ? brandTransactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0"><p className="truncate text-sm font-semibold">{t.title}</p><p className="text-xs text-muted-foreground">{t.date}{"pending" in t && t.pending ? " · Pending" : ""}</p></div>
                <span className={cn("shrink-0 text-sm font-bold", "pending" in t && t.pending ? "text-muted-foreground" : t.amount < 0 ? "text-destructive" : t.amount > 0 ? "text-tint-green-foreground" : "text-muted-foreground")}>{t.amount > 0 ? "+" : ""}{money(t.amount)}</span>
              </div>
            ))
          : brandActivity.map((a) => {
              const Icon = activityIcons[a.id as keyof typeof activityIcons] ?? FileCheck2;
              return (
                <div key={a.id} className="flex items-center gap-3 p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary"><Icon className="h-4 w-4" strokeWidth={1.9} /></span>
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{a.title}</p><p className="truncate text-xs text-muted-foreground">{a.meta}</p></div>
                  <span className="shrink-0 text-xs text-muted-foreground">{a.date}</span>
                </div>
              );
            })}
      </div>
    </BrandShell>
  );
}
