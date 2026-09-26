import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronRight,
  FileText,
  PenLine,
  Bell,
  ScrollText,
  CalendarPlus,
  Receipt,
  Layers,
  SquarePen,
  Route as RouteIcon,
  Workflow,
} from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, ActionPair, Card, IconBadge } from "@/components/alfred/ui";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { campaigns } from "@/data/influencer";
import { useCampaignState } from "@/components/influencer/CampaignState";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create — INFLUENCER" },
      { name: "description", content: "Log a brand deal, submit content, record a payout or add a content deadline." },
      { property: "og:title", content: "Create — INFLUENCER" },
      { property: "og:description", content: "Start anything: campaigns, deliverables, payouts and deadlines." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CreateScreen,
});

const quick = [
  { id: "c1", title: "Quick note", sub: "Capture a brand conversation", icon: FileText },
  { id: "c2", title: "To-do", sub: "Something you owe a brand", icon: PenLine },
  { id: "c3", title: "Deadline reminder", sub: "Nudge me before content is due", icon: Bell },
];

const work = [
  { id: "w0", eyebrow: "CAMPAIGN", title: "New campaign", sub: "A brand deal with its brief, deliverables and fee", icon: RouteIcon, tone: "orange" as const },
  { id: "w5", eyebrow: "ACTIVATION", title: "Activate campaign", sub: "Your execution plan for an accepted brand campaign", icon: Workflow, tone: "blue" as const },
  { id: "w1", eyebrow: "DELIVERABLE", title: "Submit content", sub: "Send a draft for brand review", icon: ScrollText, tone: "orange" as const },
  { id: "w2", eyebrow: "EVENT", title: "Shoot or posting date", sub: "Put it on your timeline", icon: CalendarPlus, tone: "blue" as const },
  { id: "w3", eyebrow: "MONEY", title: "Record a payout", sub: "Invoices, payments and fees", icon: Receipt, tone: "green" as const },
  { id: "w4", eyebrow: "WORKSPACE", title: "Project", sub: "Work that runs across campaigns", icon: Layers, tone: "violet" as const },
];

function CreateScreen() {
  const [sheet, setSheet] = useState<null | { title: string; sub: string }>(null);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const { statusFor } = useCampaignState();
  const isActivation = sheet?.title === "New activation";
  const eligibleCampaigns = campaigns.filter((campaign) => {
    const status = statusFor(campaign.id) ?? campaign.status;
    return status !== "offer" && status !== "declined" && status !== "cancelled";
  });

  return (
    <AppShell title="Create">
      <div className="rounded-4xl bg-surface p-6 text-center">
        <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-background">
          <SquarePen className="h-7 w-7" strokeWidth={1.9} />
          <span className="absolute -right-1 -bottom-1 grid h-6 w-6 place-items-center rounded-full bg-foreground text-sm font-bold text-background">
            +
          </span>
        </div>
        <h2 className="mt-4 text-[1.5rem] leading-tight font-extrabold">What are you adding?</h2>
        <p className="mx-auto mt-2 max-w-[19rem] text-sm text-muted-foreground">
          Log a brand deal, submit content for review, or record money you're owed.
        </p>
        <AButton
          size="lg"
          className="mt-5 w-full"
          onClick={() => setSheet({ title: "New campaign", sub: "Start from a brand, a fee and a deadline." })}
        >
          Log a brand deal
        </AButton>
      </div>

      <Card className="mt-4 divide-y divide-border/70 p-0">
        {quick.map((q) => (
          <button
            key={q.id}
            onClick={() => setSheet({ title: q.title, sub: q.sub })}
            className="flex w-full items-center gap-3.5 px-4 py-4 text-left active:bg-surface"
          >
            <IconBadge tone="neutral" shape="round" size="md">
              <q.icon className="h-5 w-5" strokeWidth={2} />
            </IconBadge>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.9375rem] font-bold">{q.title}</span>
              <span className="block truncate text-xs text-muted-foreground">{q.sub}</span>
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/60" strokeWidth={2.3} />
          </button>
        ))}
      </Card>

      <p className="eyebrow mt-8 mb-3 px-1 text-primary">Business items</p>
      <div className="space-y-3">
        {work.map((w) => (
          <button
            key={w.id}
          onClick={() => setSheet({ title: w.title, sub: w.sub })}
            className="flex w-full items-center gap-3.5 rounded-3xl bg-tint-blue px-4 py-4 text-left active:scale-[0.99]"
          >
            <span className="min-w-0 flex-1">
              <span className="eyebrow block text-tint-blue-foreground">{w.eyebrow}</span>
              <span className="mt-1 block text-[1.0625rem] font-bold">{w.title}</span>
              <span className="block truncate text-xs text-muted-foreground">{w.sub}</span>
            </span>
            <IconBadge tone={w.tone} shape="round" size="md" className="bg-background">
              <w.icon className="h-5 w-5" strokeWidth={2.1} />
            </IconBadge>
          </button>
        ))}
      </div>

      <Sheet open={!!sheet} onOpenChange={(v) => !v && setSheet(null)}>
        <SheetContent
          side="bottom"
          className="mx-auto max-w-[520px] rounded-t-4xl border-0 px-6 pt-3 pb-8 [&>button]:hidden"
        >
          <div className="mx-auto h-1.5 w-12 rounded-full bg-border" />
          <div className="mx-auto mt-6 grid h-16 w-16 place-items-center rounded-full bg-primary-soft">
            <PenLine className="h-7 w-7 text-primary" strokeWidth={2.1} />
          </div>
          <h3 className="mt-4 text-center text-xl font-extrabold">{sheet?.title}</h3>
          <p className="mx-auto mt-2 max-w-[20rem] text-center text-sm text-muted-foreground">
            {sheet?.sub} This is where the flow will open — nothing is created yet in this preview.
          </p>
          {isActivation && (
            <div className="mt-6 space-y-3 text-left">
              <label className="block text-xs font-bold text-muted-foreground" htmlFor="activation-campaign">Accepted campaign</label>
              <select id="activation-campaign" value={selectedCampaign} onChange={(event) => setSelectedCampaign(event.target.value)} className="h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm font-semibold">
                <option value="">Select campaign</option>
                {eligibleCampaigns.map((campaign) => <option key={campaign.id} value={campaign.id}>{campaign.brand} — {campaign.title}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-surface px-4 py-3"><p className="text-xs font-bold">Platforms</p><p className="mt-1 text-xs text-muted-foreground">Choose channels</p></div>
                <div className="rounded-2xl bg-surface px-4 py-3"><p className="text-xs font-bold">Schedule</p><p className="mt-1 text-xs text-muted-foreground">Add post dates</p></div>
              </div>
              <div className="rounded-2xl bg-surface px-4 py-3"><p className="text-xs font-bold">Content and notes</p><p className="mt-1 text-xs text-muted-foreground">Outline posts, production and publishing steps</p></div>
            </div>
          )}
          <ActionPair
            className="mt-7"
            secondary={
              <AButton variant="neutral" size="lg" onClick={() => setSheet(null)}>
                Cancel
              </AButton>
            }
            primary={
              <AButton size="lg" disabled={isActivation && !selectedCampaign} onClick={() => setSheet(null)}>
                Continue
              </AButton>
            }
          />
        </SheetContent>
      </Sheet>
    </AppShell>
  );
}
