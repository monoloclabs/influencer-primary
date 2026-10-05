import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownToLine, Plus, SlidersHorizontal, Repeat, ShoppingBag, Zap, ArrowDownLeft } from "lucide-react";
import { WalletShell } from "@/components/alfred/WalletShell";
import { Card, IconBadge, Pill } from "@/components/alfred/ui";
import { InfluencerMark } from "@/components/alfred/InfluencerMark";

export const Route = createFileRoute("/wallet/")({
  head: () => ({
    meta: [
      { title: "Wallet | INFLUENCER" },
      { name: "description", content: "Your creator wallet balance, card and money actions in one calm place." },
      { property: "og:title", content: "Wallet | INFLUENCER" },
      { property: "og:description", content: "Balance, card, top ups and controls inside your creator wallet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WalletHome,
});

const actions = [
  { label: "Withdraw", icon: ArrowDownToLine },
  { label: "Top up", icon: Plus },
  { label: "Controls", icon: SlidersHorizontal },
];

const recent = [
  { id: "1", title: "Yellow Chilli", meta: "Today · 13:20", amount: "-₦18,400", icon: ShoppingBag, tone: "neutral" as const },
  { id: "2", title: "Salary, Northline", meta: "Yesterday", amount: "+₦620,000", icon: ArrowDownLeft, tone: "green" as const },
  { id: "3", title: "Electricity · Alfred paid", meta: "Yesterday · instruction", amount: "-₦15,000", icon: Zap, tone: "orange" as const },
  { id: "4", title: "Netflix", meta: "28 Aug · subscription", amount: "-₦7,500", icon: Repeat, tone: "violet" as const },
];

function WalletHome() {
  return (
    <WalletShell title="Wallet">
      <div className="aurora-card relative aspect-[1.62/1] w-full overflow-hidden rounded-[1.75rem] p-6 text-foreground">
        <div className="flex items-center gap-1.5 font-extrabold">
          <InfluencerMark className="h-[1.05rem] w-[1.05rem]" />
          <span className="text-[0.9375rem] tracking-tight">INFLUENCER</span>
        </div>

        <p className="mt-6 text-xs font-semibold opacity-70">Balance</p>
        <p className="mt-1 text-[2.25rem] leading-none font-extrabold tracking-tight">₦248,400</p>

        <div className="absolute right-6 bottom-6 flex items-center">
          <span className="h-7 w-7 rounded-full bg-foreground/85" />
          <span className="-ml-3 h-7 w-7 rounded-full bg-foreground/85" />
        </div>
        <p className="absolute bottom-6 left-6 text-sm font-bold tracking-[0.2em]">•••• 3333</p>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {actions.map((a) => (
          <button key={a.label} className="flex flex-col items-center gap-2 active:scale-[0.97]">
            <span className="grid h-14 w-full place-items-center rounded-2xl bg-surface">
              <a.icon className="h-[1.35rem] w-[1.35rem]" strokeWidth={2.3} />
            </span>
            <span className="text-xs font-bold">{a.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-3xl bg-tint-green p-5">
        <Pill tone="green">Worth knowing</Pill>
        <p className="mt-3 text-[0.9375rem] leading-snug font-bold">
          Two subscriptions haven't been used in 60 days. Cancelling saves ₦14,500 a month.
        </p>
      </div>

      <p className="eyebrow mt-8 mb-3 px-1 text-muted-foreground">Recent activity</p>
      <Card className="divide-y divide-border/70 p-0">
        {recent.map((t) => (
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
    </WalletShell>
  );
}
