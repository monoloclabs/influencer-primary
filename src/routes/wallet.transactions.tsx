import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Music, Repeat, ShoppingBag, Tv, Zap } from "lucide-react";
import { WalletShell } from "@/components/alfred/WalletShell";
import { AButton, Card, IconBadge, Pill } from "@/components/alfred/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/wallet/transactions")({
  head: () => ({
    meta: [
      { title: "Transactions — Alfred Wallet" },
      { name: "description", content: "Every payment, deposit, withdrawal and recurring subscription in your Alfred wallet." },
      { property: "og:title", content: "Transactions — Alfred Wallet" },
      { property: "og:description", content: "Wallet history and active subscriptions, side by side." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WalletTransactions,
});

const history = [
  { id: "h1", title: "Salary — Northline", meta: "Deposit · Yesterday", amount: "+₦620,000", icon: ArrowDownLeft, tone: "green" as const },
  { id: "h2", title: "Yellow Chilli", meta: "Purchase · Today 13:20", amount: "-₦18,400", icon: ShoppingBag, tone: "neutral" as const },
  { id: "h3", title: "Electricity", meta: "Payment · Alfred instruction", amount: "-₦15,000", icon: Zap, tone: "orange" as const },
  { id: "h4", title: "Withdrawal to Sterling", meta: "Withdrawal · 29 Aug", amount: "-₦80,000", icon: ArrowUpRight, tone: "amber" as const },
];

const subs = [
  { id: "s1", title: "Netflix", meta: "Renews 12 Sep", amount: "₦7,500/mo", icon: Tv, tone: "violet" as const, state: "Active" },
  { id: "s2", title: "Spotify", meta: "Renews 18 Sep", amount: "₦2,900/mo", icon: Music, tone: "green" as const, state: "Active" },
  { id: "s3", title: "DSTV Compact+", meta: "Renews tomorrow", amount: "₦24,500/mo", icon: Repeat, tone: "orange" as const, state: "Approval needed" },
];

function WalletTransactions() {
  const [tab, setTab] = useState<"history" | "subs">("history");

  return (
    <WalletShell title="Transactions">
      <div className="grid grid-cols-2 gap-1 rounded-full bg-surface p-1">
        {(
          [
            ["history", "History"],
            ["subs", "Subscriptions"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={cn(
              "rounded-full py-2.5 text-[0.8125rem] font-bold transition-colors",
              tab === k ? "bg-background shadow-card" : "text-muted-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "history" ? (
        <Card className="mt-5 divide-y divide-border/70 p-0">
          {history.map((t) => (
            <div key={t.id} className="flex items-center gap-3.5 px-4 py-4">
              <IconBadge tone={t.tone} shape="round" size="md">
                <t.icon className="h-5 w-5" strokeWidth={2.1} />
              </IconBadge>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.9375rem] font-bold">{t.title}</span>
                <span className="block truncate text-xs text-muted-foreground">{t.meta}</span>
              </span>
              <span className="shrink-0 text-sm font-extrabold">{t.amount}</span>
            </div>
          ))}
        </Card>
      ) : (
        <div className="mt-5 space-y-3">
          {subs.map((s) => (
            <Card key={s.id} className="flex items-center gap-3.5 p-4">
              <IconBadge tone={s.tone} shape="round" size="md">
                <s.icon className="h-5 w-5" strokeWidth={2.1} />
              </IconBadge>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.9375rem] font-bold">{s.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {s.meta} · {s.amount}
                </p>
              </div>
              <Pill tone={s.state === "Active" ? "green" : "orange"}>{s.state}</Pill>
            </Card>
          ))}
          <AButton variant="secondary" size="lg" className="w-full">
            Manage subscriptions
          </AButton>
        </div>
      )}
    </WalletShell>
  );
}
