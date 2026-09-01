import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Sparkles, Mic, ArrowUp, CalendarSync, Receipt, MapPinned, PhoneCall } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { Card, IconBadge } from "@/components/alfred/ui";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Assistant — Alfred" },
      { name: "description", content: "Hand something over: Alfred can sort your day, handle a bill, plan a trip or chase someone." },
      { property: "og:title", content: "Assistant — Alfred" },
      { property: "og:description", content: "Ask Alfred to take something off your plate." },
    ],
  }),
  component: AssistantScreen,
});

const abilities = [
  { id: "s1", title: "Sort out my day", sub: "Reshuffle tasks around what's fixed", icon: CalendarSync },
  { id: "s2", title: "Handle a bill", sub: "Pay, schedule or dispute it", icon: Receipt },
  { id: "s3", title: "Plan something", sub: "Trips, dinners, birthdays, gifts", icon: MapPinned },
  { id: "s4", title: "Chase someone", sub: "Politely, on your behalf", icon: PhoneCall },
];

function AssistantScreen() {
  return (
    <AppShell title="Assistant">
      <IconBadge tone="orange" shape="round" size="lg">
        <Sparkles className="h-6 w-6" strokeWidth={2.2} />
      </IconBadge>
      <h2 className="mt-5 text-[2rem] leading-[1.1] font-extrabold">
        What should I take off your plate?
      </h2>
      <p className="mt-2.5 text-[0.9375rem] text-muted-foreground">
        Alfred knows your calendar, your money and your people — it can plan, prepare and act.
      </p>

      <div className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card p-2 pl-5 shadow-card">
        <span className="flex-1 truncate text-sm text-muted-foreground">Ask Alfred anything…</span>
        <button aria-label="Voice" className="grid h-10 w-10 place-items-center rounded-full bg-surface">
          <Mic className="h-[1.1rem] w-[1.1rem]" strokeWidth={2.2} />
        </button>
        <button
          aria-label="Send"
          className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"
        >
          <ArrowUp className="h-[1.1rem] w-[1.1rem]" strokeWidth={2.8} />
        </button>
      </div>

      <p className="eyebrow mt-8 mb-3 px-1 text-muted-foreground">Working with</p>
      <Card className="divide-y divide-border/70 p-0">
        {[
          { t: "This week", s: "Working context · 1–7 September" },
          { t: "Wallet · ₦248,400", s: "Spending limit ₦50,000 per action" },
        ].map((c) => (
          <div key={c.t} className="flex items-center gap-3 px-4 py-4">
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.9375rem] font-bold">{c.t}</span>
              <span className="block truncate text-xs text-muted-foreground">{c.s}</span>
            </span>
            <span className="shrink-0 text-sm font-bold text-tint-blue-foreground">Change</span>
          </div>
        ))}
      </Card>

      <p className="eyebrow mt-8 mb-3 px-1 text-muted-foreground">Things it can do</p>
      <div className="space-y-2.5">
        {abilities.map((a) => (
          <button
            key={a.id}
            className="flex w-full items-center gap-3.5 rounded-3xl bg-surface px-4 py-4 text-left active:scale-[0.99]"
          >
            <IconBadge tone="neutral" shape="squircle" size="md" className="bg-background">
              <a.icon className="h-5 w-5" strokeWidth={2} />
            </IconBadge>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.9375rem] font-bold">{a.title}</span>
              <span className="block truncate text-xs text-muted-foreground">{a.sub}</span>
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/60" strokeWidth={2.3} />
          </button>
        ))}
      </div>
    </AppShell>
  );
}
