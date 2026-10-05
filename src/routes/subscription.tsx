import { createFileRoute } from "@tanstack/react-router";
import { Check, Briefcase, Wallet, Sparkles } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, Card, IconBadge, Pill } from "@/components/alfred/ui";

export const Route = createFileRoute("/subscription")({
  head: () => ({
    meta: [
      { title: "Subscription, Alfred" },
      { name: "description", content: "Your Alfred membership: Free, Standard and Premium, and what each tier unlocks." },
      { property: "og:title", content: "Subscription, Alfred" },
      { property: "og:description", content: "Free, Standard and Premium tiers of the Alfred membership." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SubscriptionScreen,
});

const tiers = [
  {
    id: "free",
    name: "Free",
    price: "₦0",
    blurb: "The core Alfred experience.",
    perks: ["Tasks, reminders and events", "Timeline and plans", "Assistant basics"],
    tone: "neutral" as const,
  },
  {
    id: "standard",
    name: "Standard",
    price: "₦4,500/mo",
    blurb: "Unlocks Money.",
    perks: ["Wallet and card", "Transactions and subscriptions", "Payment approvals"],
    tone: "green" as const,
    current: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "₦12,000/mo",
    blurb: "Unlocks My Office.",
    perks: ["Everything in Standard", "My Office workspace", "Priority Alfred actions"],
    tone: "amber" as const,
  },
];

function SubscriptionScreen() {
  return (
    <AppShell title="Subscription">
      <h2 className="text-[1.75rem] leading-tight font-extrabold">Your Alfred membership</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        Standard unlocks Money. Premium unlocks My Office. Nothing else changes.
      </p>

      <div className="mt-6 space-y-3.5">
        {tiers.map((t) => (
          <Card key={t.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[1.125rem] font-extrabold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.blurb}</p>
              </div>
              {t.current ? <Pill tone="green">Current</Pill> : <Pill tone="neutral">{t.price}</Pill>}
            </div>
            <ul className="mt-4 space-y-2">
              {t.perks.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm font-semibold">
                  <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={3} />
                  {p}
                </li>
              ))}
            </ul>
            {!t.current && (
              <AButton
                size="md"
                variant={t.id === "premium" ? "primary" : "secondary"}
                className="mt-4 w-full"
              >
                {t.id === "free" ? "Downgrade" : "Upgrade to Premium"}
              </AButton>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="rounded-3xl bg-tint-green p-4">
          <IconBadge tone="green" shape="round" size="sm" className="bg-background">
            <Wallet className="h-4 w-4" strokeWidth={2.3} />
          </IconBadge>
          <p className="mt-3 text-sm font-bold">Money</p>
          <p className="text-xs text-muted-foreground">Included with Standard</p>
        </div>
        <div className="rounded-3xl bg-tint-amber p-4">
          <IconBadge tone="amber" shape="round" size="sm" className="bg-background">
            <Briefcase className="h-4 w-4" strokeWidth={2.3} />
          </IconBadge>
          <p className="mt-3 text-sm font-bold">My Office</p>
          <p className="text-xs text-muted-foreground">Premium only</p>
        </div>
      </div>

      <p className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-primary" strokeWidth={2.4} />
        Your life plans live under Plans, not here.
      </p>
    </AppShell>
  );
}
