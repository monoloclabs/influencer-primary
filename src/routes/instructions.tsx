import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Repeat, HandCoins, Wallet, Mails, Sun, Dumbbell } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, Card, IconBadge, Pill } from "@/components/alfred/ui";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/instructions")({
  head: () => ({
    meta: [
      { title: "Instructions — Alfred" },
      { name: "description", content: "Standing rules you give Alfred to follow: recurring payments, reminders and routines." },
      { property: "og:title", content: "Instructions — Alfred" },
      { property: "og:description", content: "The standing rules Alfred follows on your behalf." },
    ],
  }),
  component: InstructionsScreen,
});

const rules = [
  { id: "i1", icon: HandCoins, tone: "orange" as const, title: "Pay my tithes every Sunday", meta: "Weekly · 08:00 · from Wallet", tag: "Money", on: true },
  { id: "i2", icon: Wallet, tone: "green" as const, title: "Remind me to fund my wallet on the last day of every month", meta: "Monthly · 20:00", tag: "Reminder", on: true },
  { id: "i3", icon: Mails, tone: "blue" as const, title: "Email my customers every public holiday", meta: "Nigeria holiday calendar", tag: "Work", on: false },
  { id: "i4", icon: Sun, tone: "amber" as const, title: "Give me the day's brief at 06:30", meta: "Daily · before I get up", tag: "Routine", on: true },
  { id: "i5", icon: Dumbbell, tone: "violet" as const, title: "Never book anything before 8am on gym days", meta: "Mon · Wed · Fri", tag: "Boundary", on: true },
];

function InstructionsScreen() {
  const [state, setState] = useState(() =>
    Object.fromEntries(rules.map((r) => [r.id, r.on])) as Record<string, boolean>,
  );

  return (
    <AppShell title="Instructions">
      <h2 className="text-[1.75rem] leading-tight font-extrabold">Standing instructions</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        Rules Alfred follows without being asked again. Tasks are things you do — these are things
        Alfred keeps doing.
      </p>

      <AButton size="lg" className="mt-5 w-full">
        <Plus className="h-4 w-4" strokeWidth={3} />
        New instruction
      </AButton>

      <div className="mt-4 flex items-center gap-3 rounded-3xl bg-primary-soft px-4 py-3.5">
        <IconBadge tone="orange" shape="round" size="sm" className="bg-background">
          <Repeat className="h-4 w-4" strokeWidth={2.3} />
        </IconBadge>
        <p className="text-sm font-semibold">
          {Object.values(state).filter(Boolean).length} of {rules.length} running right now
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {rules.map((r) => (
          <Card key={r.id} className="flex items-start gap-3.5 p-4">
            <IconBadge tone={r.tone} shape="squircle" size="md">
              <r.icon className="h-5 w-5" strokeWidth={2.1} />
            </IconBadge>
            <div className="min-w-0 flex-1">
              <p className="text-[0.9375rem] leading-snug font-bold">{r.title}</p>
              <div className="mt-2 flex items-center gap-2">
                <Pill tone={r.tone}>{r.tag}</Pill>
                <span className="truncate text-xs text-muted-foreground">{r.meta}</span>
              </div>
            </div>
            <Switch
              checked={state[r.id]}
              onCheckedChange={(v) => setState((s) => ({ ...s, [r.id]: v }))}
              className="mt-1 shrink-0 data-[state=checked]:bg-primary"
            />
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
