import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Sparkles, Mic, ArrowUp, CalendarClock, MessageSquareText, LineChart, Tags } from "lucide-react";
import { BrandShell, brandMeta } from "@/components/brand/BrandShell";
import { Card, IconBadge } from "@/components/alfred/ui";

export const Route = createFileRoute("/brand/assistant")({
  head: () => brandMeta("Brand assistant | INFLUENCER", "Price a brief, summarise spend, check creator deadlines and draft campaign messages."),
  component: BrandAssistant,
});

const abilities = [
  { id: "p1", title: "Price a brief", sub: "Fair budget for 3 Reels across micro creators", icon: Tags },
  { id: "p2", title: "Summarise spend this month", sub: "Escrow, released and committed", icon: LineChart },
  { id: "p3", title: "Check creator deadlines", sub: "Submissions due across every campaign", icon: CalendarClock },
  { id: "p4", title: "Draft a campaign message", sub: "Feedback or kickoff note to a creator", icon: MessageSquareText },
];

function BrandAssistant() {
  return (
    <BrandShell title="Assistant">
      <div className="pt-2"><IconBadge tone="orange" shape="round" size="lg"><Sparkles className="h-6 w-6" strokeWidth={2.2} /></IconBadge></div>
      <h2 className="mt-5 text-[2rem] leading-[1.1] font-extrabold">What should I handle for your campaigns?</h2>
      <p className="mt-2.5 text-[0.9375rem] text-muted-foreground">It knows your briefs, matched creators and escrow, so it can price, summarise and flag what is due.</p>
      <div className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card p-2 pl-5 shadow-card">
        <span className="flex-1 truncate text-sm text-muted-foreground">Ask about a brief or a creator…</span>
        <button aria-label="Voice" className="grid h-10 w-10 place-items-center rounded-full bg-surface"><Mic className="h-[1.1rem] w-[1.1rem]" strokeWidth={2.2} /></button>
        <button aria-label="Send" className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"><ArrowUp className="h-[1.1rem] w-[1.1rem]" strokeWidth={2.8} /></button>
      </div>
      <p className="eyebrow mt-8 mb-3 px-1 text-muted-foreground">Working with</p>
      <Card className="divide-y divide-border/70 p-0">
        {[{ t: "2 active campaigns", s: "Summer Lift Series · Recovery Range Teaser" }, { t: "Escrow · $18,500", s: "$3,000 milestone due Oct 12" }].map((c) => (
          <div key={c.t} className="flex items-center gap-3 px-4 py-4">
            <span className="min-w-0 flex-1"><span className="block truncate text-[0.9375rem] font-bold">{c.t}</span><span className="block truncate text-xs text-muted-foreground">{c.s}</span></span>
            <span className="shrink-0 text-sm font-bold text-tint-blue-foreground">Change</span>
          </div>
        ))}
      </Card>
      <p className="eyebrow mt-8 mb-3 px-1 text-muted-foreground">Things it can do</p>
      <div className="space-y-2.5">
        {abilities.map((a) => (
          <button key={a.id} className="flex w-full items-center gap-3.5 rounded-3xl bg-surface px-4 py-4 text-left active:scale-[0.99]">
            <IconBadge tone="neutral" shape="squircle" size="md" className="bg-background"><a.icon className="h-5 w-5" strokeWidth={2} /></IconBadge>
            <span className="min-w-0 flex-1"><span className="block text-[0.9375rem] font-bold">{a.title}</span><span className="block truncate text-xs text-muted-foreground">{a.sub}</span></span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/60" strokeWidth={2.3} />
          </button>
        ))}
      </div>
    </BrandShell>
  );
}
