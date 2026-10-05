import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Repeat, HandCoins, BadgeCheck, Target, Clock, ShieldCheck } from "lucide-react";
import { BrandShell, brandMeta } from "@/components/brand/BrandShell";
import { AButton, Card, IconBadge, Pill } from "@/components/alfred/ui";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/brand/instructions")({
  head: () => brandMeta("Brand instructions | INFLUENCER", "Standing rules for how briefs, creators and deliverables are handled for your brand."),
  component: BrandInstructions,
});

const rules = [
  { id: "b1", icon: HandCoins, tone: "orange" as const, title: "Auto decline creator quotes above brief budget by 20%", meta: "Applies to new counter-offers", tag: "Budget", on: true },
  { id: "b2", icon: BadgeCheck, tone: "green" as const, title: "Auto approve deliverables that meet every brief condition", meta: "Caption, code and length verified", tag: "Approvals", on: true },
  { id: "b3", icon: Target, tone: "blue" as const, title: "Flag any creator outside the fitness and wellness niche", meta: "Checked on every match", tag: "Matching", on: true },
  { id: "b4", icon: Clock, tone: "amber" as const, title: "Alert the team when a submission is 48 hours overdue", meta: "Checked daily · 09:00", tag: "Deadlines", on: false },
  { id: "b5", icon: ShieldCheck, tone: "violet" as const, title: "Hold milestone release until usage rights are signed", meta: "Contract terms", tag: "Escrow", on: true },
];

function BrandInstructions() {
  const [state, setState] = useState(() => Object.fromEntries(rules.map((r) => [r.id, r.on])) as Record<string, boolean>);
  return (
    <BrandShell title="Instructions">
      <h2 className="pt-2 text-[1.75rem] leading-tight font-extrabold">Standing instructions</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">Rules that run on every brief, match and deliverable, so your team decides once.</p>
      <AButton size="lg" className="mt-5 w-full"><Plus className="h-4 w-4" strokeWidth={3} />New instruction</AButton>
      <div className="mt-4 flex items-center gap-3 rounded-3xl bg-primary-soft px-4 py-3.5">
        <IconBadge tone="orange" shape="round" size="sm" className="bg-background"><Repeat className="h-4 w-4" strokeWidth={2.3} /></IconBadge>
        <p className="text-sm font-semibold">{Object.values(state).filter(Boolean).length} of {rules.length} running right now</p>
      </div>
      <div className="mt-6 space-y-3">
        {rules.map((r) => (
          <Card key={r.id} className="flex items-start gap-3.5 p-4">
            <IconBadge tone={r.tone} shape="squircle" size="md"><r.icon className="h-5 w-5" strokeWidth={2.1} /></IconBadge>
            <div className="min-w-0 flex-1">
              <p className="text-[0.9375rem] leading-snug font-bold">{r.title}</p>
              <div className="mt-2 flex items-center gap-2"><Pill tone={r.tone}>{r.tag}</Pill><span className="truncate text-xs text-muted-foreground">{r.meta}</span></div>
            </div>
            <Switch checked={!!state[r.id]} onCheckedChange={(v) => setState((s) => ({ ...s, [r.id]: v }))} className="mt-1 shrink-0 data-[state=checked]:bg-primary" />
          </Card>
        ))}
      </div>
    </BrandShell>
  );
}
