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
  LayoutTemplate,
  Workflow,
} from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, ActionPair, Card, IconBadge } from "@/components/alfred/ui";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { activationTemplates } from "@/data/influencer";
import { ActivationSetup } from "@/components/influencer/ActivationSetup";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create | INFLUENCER" },
      { name: "description", content: "Activate an accepted campaign, use execution templates, or organise creator work." },
      { property: "og:title", content: "Create | INFLUENCER" },
      { property: "og:description", content: "Start campaign execution with reusable content and scheduling structures." },
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
  { id: "w5", eyebrow: "ACTIVATION", title: "Activation Templates", sub: "Reusable structures for content and schedules", icon: LayoutTemplate, tone: "blue" as const },
  { id: "w1", eyebrow: "DELIVERABLE", title: "Submit content", sub: "Send a draft for brand review", icon: ScrollText, tone: "orange" as const },
  { id: "w2", eyebrow: "EVENT", title: "Shoot or posting date", sub: "Put it on your timeline", icon: CalendarPlus, tone: "blue" as const },
  { id: "w3", eyebrow: "MONEY", title: "Record a payout", sub: "Invoices, payments and fees", icon: Receipt, tone: "green" as const },
  { id: "w4", eyebrow: "WORKSPACE", title: "Project", sub: "Work that runs across campaigns", icon: Layers, tone: "violet" as const },
];

function CreateScreen() {
  const [sheet, setSheet] = useState<null | { title: string; sub: string }>(null);
  const [creating, setCreating] = useState(false);
  const [templateId, setTemplateId] = useState("");
  const isTemplate = sheet?.title === "Activation Templates";

  return (
    <AppShell title="Create">
      <div className="rounded-4xl bg-surface p-6 text-center">
        <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-background">
          <Workflow className="h-7 w-7" strokeWidth={1.9} />
          <span className="absolute -right-1 -bottom-1 grid h-6 w-6 place-items-center rounded-full bg-foreground text-sm font-bold text-background">
            +
          </span>
        </div>
        <h2 className="mt-4 text-[1.5rem] leading-tight font-extrabold">Activate new campaign</h2>
        <p className="mx-auto mt-2 max-w-[19rem] text-sm text-muted-foreground">
          Select an accepted brand deal to set up its content and posting schedule.
        </p>
        <AButton
          size="lg"
          className="mt-5 w-full"
          onClick={() => setCreating(true)}
        >
          Start activation
        </AButton>
      </div>

      <Card className="mt-4 divide-y divide-border/70 p-0">
        {quick.map((q) => (
          <AButton variant="ghost"
            key={q.id}
            onClick={() => setSheet({ title: q.title, sub: q.sub })}
            className="h-auto w-full justify-start rounded-none px-4 py-4 text-left whitespace-normal active:bg-surface"
          >
            <IconBadge tone="neutral" shape="round" size="md">
              <q.icon className="h-5 w-5" strokeWidth={2} />
            </IconBadge>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.9375rem] font-bold">{q.title}</span>
              <span className="block truncate text-xs text-muted-foreground">{q.sub}</span>
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/60" strokeWidth={2.3} />
          </AButton>
        ))}
      </Card>

      <p className="eyebrow mt-8 mb-3 px-1 text-primary">Business items</p>
      <div className="space-y-3">
        {work.map((w) => (
          <AButton variant="ghost"
            key={w.id}
          onClick={() => setSheet({ title: w.title, sub: w.sub })}
            className="h-auto w-full justify-start gap-3.5 rounded-3xl bg-tint-blue px-4 py-4 text-left whitespace-normal active:scale-[0.99]"
          >
            <span className="min-w-0 flex-1">
              <span className="eyebrow block text-tint-blue-foreground">{w.eyebrow}</span>
              <span className="mt-1 block text-[1.0625rem] font-bold">{w.title}</span>
              <span className="block truncate text-xs text-muted-foreground">{w.sub}</span>
            </span>
            <IconBadge tone={w.tone} shape="round" size="md" className="bg-background">
              <w.icon className="h-5 w-5" strokeWidth={2.1} />
            </IconBadge>
          </AButton>
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
          <p className="mx-auto mt-2 max-w-[20rem] text-center text-sm text-muted-foreground">{sheet?.sub}{!isTemplate && " This is not available in this preview yet."}</p>
          {isTemplate && <div className="mt-5 space-y-2">{activationTemplates.map((template) => <AButton key={template.id} variant={templateId === template.id ? "secondary" : "neutral"} className="h-auto min-h-16 w-full flex-col items-start rounded-2xl px-4 py-3 text-left whitespace-normal" onClick={() => setTemplateId(template.id)}><span className="font-bold">{template.name}</span><span className="text-xs font-normal">{template.description}</span></AButton>)}</div>}
          <ActionPair
            className="mt-7"
            secondary={
              <AButton variant="neutral" size="lg" onClick={() => { setSheet(null); setTemplateId(""); }}>
                Cancel
              </AButton>
            }
            primary={
              <AButton size="lg" disabled={isTemplate && !templateId} onClick={() => { setSheet(null); if (isTemplate) setCreating(true); }}>
                {isTemplate ? "Use template" : "Close"}
              </AButton>
            }
          />
        </SheetContent>
      </Sheet>
      <ActivationSetup open={creating} onOpenChange={(open) => { setCreating(open); if (!open) setTemplateId(""); }} initialTemplateId={templateId} />
    </AppShell>
  );
}
