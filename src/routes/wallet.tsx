import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownLeft, ArrowUpRight, Plus, Repeat, ShoppingBag, Zap } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, ActionPair, Card, IconBadge, Pill } from "@/components/alfred/ui";

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title: "Wallet — Alfred" },
      { name: "description", content: "Your balance, spending and the subscriptions Alfred keeps an eye on." },
      { property: "og:title", content: "Wallet — Alfred" },
      { property: "og:description", content: "Balance, spending and subscriptions in one calm view." },
    ],
  }),
  component: WalletScreen,
});

const txns = [
  { id: "1", title: "Yellow Chilli", meta: "Today · 13:20", amount: "-₦18,400", icon: ShoppingBag, tone: "neutral" as const },
  { id: "2", title: "Salary — Northline", meta: "Yesterday", amount: "+₦620,000", icon: ArrowDownLeft, tone: "green" as const },
  { id: "3", title: "Electricity · Alfred paid", meta: "Yesterday · instruction", amount: "-₦15,000", icon: Zap, tone: "orange" as const },
  { id: "4", title: "Netflix", meta: "28 Aug · subscription", amount: "-₦7,500", icon: Repeat, tone: "violet" as const },
];

function WalletScreen() {
  return (
    <AppShell title="Wallet">
      <div className="rounded-4xl bg-foreground p-6 text-background">
        <p className="eyebrow opacity-60">Available balance</p>
        <p className="mt-2 text-[2.5rem] leading-none font-extrabold">₦248,400</p>
        <p className="mt-3 text-sm opacity-70">Alfred will ask you to fund this on 30 September.</p>
        <ActionPair
          className="mt-6"
          secondary={
            <AButton variant="neutral" size="lg" className="bg-background/15 text-background">
              Send
            </AButton>
          }
          primary={
            <AButton size="lg">
              <Plus className="h-4 w-4" strokeWidth={3} />
              Add money
            </AButton>
          }
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Card className="p-4">
          <IconBadge tone="amber" size="sm">
            <ArrowUpRight className="h-[1.05rem] w-[1.05rem]" strokeWidth={2.4} />
          </IconBadge>
          <p className="mt-3 text-xl font-extrabold">₦96,200</p>
          <p className="text-xs text-muted-foreground">Spent this month</p>
        </Card>
        <Card className="p-4">
          <IconBadge tone="violet" size="sm">
            <Repeat className="h-[1.05rem] w-[1.05rem]" strokeWidth={2.4} />
          </IconBadge>
          <p className="mt-3 text-xl font-extrabold">7 active</p>
          <p className="text-xs text-muted-foreground">Subscriptions · ₦58k/mo</p>
        </Card>
      </div>

      <div className="mt-4 rounded-3xl bg-tint-green p-5">
        <Pill tone="green">Alfred found something</Pill>
        <p className="mt-3 text-[0.9375rem] leading-snug font-bold">
          Two subscriptions haven't been used in 60 days. Cancelling saves ₦14,500 a month.
        </p>
        <AButton size="sm" variant="secondary" className="mt-4">
          Review them
        </AButton>
      </div>

      <p className="eyebrow mt-8 mb-3 px-1 text-muted-foreground">Recent activity</p>
      <Card className="divide-y divide-border/70 p-0">
        {txns.map((t) => (
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
    </AppShell>
  );
}
