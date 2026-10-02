import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { Card, Link } from "@/components/alfred/ui";
import { PlatformMark } from "@/components/influencer/Marks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/a/research")({
  head: () => ({
    meta: [
      { title: "Rate research — INFLUENCER" },
      { name: "description", content: "See what creators at your size charge, and price a deal before you reply." },
      { property: "og:title", content: "Rate research — INFLUENCER" },
      { property: "og:description", content: "Market rates by platform and tier, plus a quick deal estimator." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RateResearchScreen,
});

const tiers = ["Micro", "Mid-tier", "Pro"] as const;
type Tier = (typeof tiers)[number];
const tierRange: Record<Tier, string> = { Micro: "10K–50K", "Mid-tier": "50K–250K", Pro: "250K–1M" };

const market: { platform: string; item: string; rates: Record<Tier, [number, number]> }[] = [
  { platform: "Instagram", item: "Reel", rates: { Micro: [400, 1200], "Mid-tier": [1500, 3500], Pro: [3500, 9000] } },
  { platform: "Instagram", item: "Story set", rates: { Micro: [150, 400], "Mid-tier": [500, 1200], Pro: [1200, 3000] } },
  { platform: "TikTok", item: "Video", rates: { Micro: [300, 900], "Mid-tier": [1000, 2500], Pro: [2500, 7000] } },
  { platform: "YouTube", item: "Integration", rates: { Micro: [800, 2000], "Mid-tier": [2500, 6000], Pro: [6000, 15000] } },
];

const multipliers = [
  { label: "Paid usage · 30 days", factor: 0.3 },
  { label: "Category exclusivity", factor: 0.4 },
  { label: "Whitelisting", factor: 0.25 },
];

const fmt = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function RateResearchScreen() {
  const [tier, setTier] = useState<Tier>("Mid-tier");
  const [counts, setCounts] = useState<number[]>([1, 1, 0, 0]);
  const [extras, setExtras] = useState<boolean[]>([true, false, false]);

  const base = market.reduce(
    (acc, m, i) => {
      const [lo, hi] = m.rates[tier];
      return [acc[0] + lo * counts[i]!, acc[1] + hi * counts[i]!];
    },
    [0, 0],
  );
  const factor = 1 + multipliers.reduce((s, m, i) => s + (extras[i] ? m.factor : 0), 0);
  const low = base[0]! * factor;
  const high = base[1]! * factor;

  const bump = (i: number, d: number) =>
    setCounts((c) => c.map((v, j) => (j === i ? Math.max(0, Math.min(9, v + d)) : v)));

  return (
    <AppShell title="Rate research">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
        <ArrowLeft className="h-4 w-4" strokeWidth={2.6} />
        Back
      </Link>

      <h2 className="mt-4 text-[1.75rem] leading-tight font-extrabold">Rate research</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        What creators your size charge, and a quick quote for any deal.
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2 rounded-full bg-surface p-1">
        {tiers.map((t) => (
          <button
            key={t}
            onClick={() => setTier(t)}
            className={cn(
              "h-10 rounded-full text-[0.8125rem] font-semibold",
              tier === t ? "bg-background text-foreground shadow-card" : "text-muted-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="mt-2 px-1 text-xs text-muted-foreground">{tierRange[tier]} followers per channel</p>

      <p className="eyebrow mt-7 mb-3 px-1 text-muted-foreground">Build a quote</p>
      <Card className="divide-y divide-border/70 p-0">
        {market.map((m, i) => (
          <div key={m.item + m.platform} className="flex items-center gap-3 px-4 py-3.5">
            <PlatformMark platform={m.platform} className="h-4 w-4 text-foreground" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">{m.platform} {m.item}</p>
              <p className="text-xs text-muted-foreground">
                {fmt(m.rates[tier][0])} – {fmt(m.rates[tier][1])}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => bump(i, -1)} aria-label="Fewer" className="grid h-8 w-8 place-items-center rounded-full bg-surface">
                <Minus className="h-3.5 w-3.5" strokeWidth={2.6} />
              </button>
              <span className="w-4 text-center text-sm font-extrabold">{counts[i]}</span>
              <button onClick={() => bump(i, 1)} aria-label="More" className="grid h-8 w-8 place-items-center rounded-full bg-surface">
                <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
              </button>
            </div>
          </div>
        ))}
      </Card>

      <div className="mt-3 flex flex-wrap gap-2">
        {multipliers.map((m, i) => (
          <button
            key={m.label}
            onClick={() => setExtras((e) => e.map((v, j) => (j === i ? !v : v)))}
            className={cn(
              "h-9 rounded-full px-4 text-[0.8125rem] font-semibold",
              extras[i] ? "bg-foreground text-background" : "bg-surface text-muted-foreground",
            )}
          >
            {m.label} +{Math.round(m.factor * 100)}%
          </button>
        ))}
      </div>

      <Card className="mt-5 bg-primary p-5 text-primary-foreground">
        <p className="text-xs font-semibold opacity-80">Suggested quote</p>
        <p className="mt-1 text-[1.75rem] font-extrabold leading-tight">
          {base[1] ? `${fmt(low)} – ${fmt(high)}` : "Add a deliverable"}
        </p>
        <p className="mt-1 text-xs opacity-80">Based on {tier.toLowerCase()} market rates, before platform fees.</p>
      </Card>

      <p className="mt-6 px-1 text-xs text-muted-foreground">
        Rates are sample benchmarks in this preview. Your rule to decline offers below $3,000 per deliverable still applies.
      </p>
    </AppShell>
  );
}
