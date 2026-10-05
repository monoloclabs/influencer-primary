import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Sparkles, Mic, ArrowUp, CalendarClock, FileSignature, LineChart, Tags } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { Card, IconBadge } from "@/components/alfred/ui";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Assistant | INFLUENCER" },
      {
        name: "description",
        content:
          "Your creator business co-pilot: price a campaign, draft a brand pitch, summarise earnings or check deadlines.",
      },
      { property: "og:title", content: "Assistant | INFLUENCER" },
      { property: "og:description", content: "Ask about rates, pitches, earnings and campaign deadlines." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AssistantScreen,
});

const abilities = [
  { id: "s1", title: "Price a campaign", sub: "What to charge for 2 Reels and 3 Stories", icon: Tags },
  { id: "s2", title: "Draft a brand pitch", sub: "Outreach written in your voice", icon: FileSignature },
  { id: "s3", title: "Summarise my earnings", sub: "Paid, pending and forecast", icon: LineChart },
  { id: "s4", title: "Check my deadlines", sub: "What's due across every campaign", icon: CalendarClock },
];

function AssistantScreen() {
  return (
    <AppShell title="Assistant">
      <IconBadge tone="orange" shape="round" size="lg">
        <Sparkles className="h-6 w-6" strokeWidth={2.2} />
      </IconBadge>
      <h2 className="mt-5 text-[2rem] leading-[1.1] font-extrabold">
        What should I handle for your business?
      </h2>
      <p className="mt-2.5 text-[0.9375rem] text-muted-foreground">
        It knows your campaigns, your rates and your payment schedule, so it can price, draft and
        flag what's coming.
      </p>

      <div className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card p-2 pl-5 shadow-card">
        <span className="flex-1 truncate text-sm text-muted-foreground">Ask about a brand or a rate…</span>
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
          { t: "3 active campaigns", s: "Gymshark · Notion · Apple Music" },
          { t: "Earnings · $32,900", s: "$13,500 pending release" },
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
