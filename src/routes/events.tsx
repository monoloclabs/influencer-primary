import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/alfred/ui";
import { useState } from "react";
import { Clapperboard, Camera, Video, Mic, Users, Plane } from "@/components/alfred/CreatorIcon";
import { ItemDetailSheet } from "@/components/alfred/ItemDetailSheet";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, Card } from "@/components/alfred/ui";
import { BrandMark } from "@/components/influencer/Marks";


export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Shoots and events | INFLUENCER" },
      { name: "description", content: "Shoots, brand meetings, launches and collaborations on your schedule." },
      { property: "og:title", content: "Shoots and events | INFLUENCER" },
      { property: "og:description", content: "Upcoming shoots and brand dates, some belonging to a campaign." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EventsScreen,
});

const groups = [
  {
    label: "This week",
    items: [
      { id: "e1", title: "Gymshark Reel shoot", when: "Sunday · 8:00 AM", where: "Ikoyi Fitness studio", icon: Camera, tone: "orange" as const, plan: "Gymshark" },
      { id: "e2", title: "Notion walkthrough recording", when: "Tuesday · 10:30 AM", where: "Home desk setup", icon: Video, tone: "green" as const, plan: "Notion" },
      { id: "e3", title: "Spotify brand call", when: "Friday · 6:45 PM", where: "Video call · 30 min", icon: Mic, tone: "blue" as const, plan: "Spotify" },
    ],
  },
  {
    label: "Next week",
    items: [
      { id: "e4", title: "Apple Music launch event", when: "Monday · 7:00 PM", where: "Victoria Island", icon: Users, tone: "violet" as const, plan: "Apple Music" },
      { id: "e5", title: "Travel for the Sephora campaign", when: "Wednesday · 12:30 PM", where: "Flight to Abuja", icon: Plane, tone: "amber" as const },
    ],
  },
];

type EventItem = (typeof groups)[number]["items"][number];

const prep: Record<string, string[]> = {
  e1: ["Pack Gymshark kit, two colourways", "Charge lights and mic", "Confirm studio access at 7:30 AM"],
  e2: ["Clean desk setup", "Load the Notion template", "Record screen at 60fps"],
  e3: ["Review the Spotify brief", "Prepare rate questions"],
  e4: ["RSVP confirmed", "Plan two Stories from the venue"],
  e5: ["Boarding pass saved", "Pack Sephora product set"],
};

function EventsScreen() {
  const [sel, setSel] = useState<EventItem | null>(null);
  const [done, setDone] = useState<Record<string, boolean>>({});
  return (
    <AppShell title="Shoots and events">
      <h2 className="text-[1.75rem] leading-tight font-extrabold">Shoots and events</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        What is coming up, with times and places.
      </p>


      <div className="mt-7 space-y-8">
        {groups.map((g) => (
          <section key={g.label}>
            <p className="eyebrow mb-3 px-1 text-muted-foreground">{g.label}</p>
            <div className="space-y-2.5">
              {g.items.map((e) => (
                <button key={e.id} type="button" onClick={() => setSel(e)} className="block w-full text-left active:scale-[0.99]"><Card className="flex items-center gap-3.5 p-4">
                  <e.icon className="h-6 w-6 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.9375rem] font-bold">{e.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {e.when} · {e.where}
                    </p>
                  </div>
                  {"plan" in e && e.plan && (
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface">
                      <BrandMark brand={e.plan} className="h-[1.05rem] w-[1.05rem] text-foreground" />
                    </span>
                  )}
                </Card></button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-8 rounded-4xl bg-surface p-5">
        <p className="flex items-center gap-2 text-[0.9375rem] font-semibold">
          <Clapperboard className="h-4 w-4" />
          Most dates belong to a campaign.
        </p>
        <Link to="/plans" className="mt-4 block">
          <AButton variant="secondary" size="md" className="w-full">
            Open Campaigns
          </AButton>
        </Link>
      </div>

      <ItemDetailSheet
        open={!!sel}
        onOpenChange={(v) => !v && setSel(null)}
        eyebrow="Shoot or event"
        title={sel?.title ?? ""}
        mark={sel && "plan" in sel && sel.plan ? <BrandMark brand={sel.plan} className="h-5 w-5 text-foreground" /> : sel ? <sel.icon className="h-5 w-5" /> : null}
        rows={sel ? [
          { label: "When", value: sel.when },
          { label: "Where", value: sel.where },
          { label: "Campaign", value: "plan" in sel && sel.plan ? sel.plan : "Personal" },
        ] : []}
        actions={<>
          <Link to="/plans" className="block" onClick={() => setSel(null)}><AButton size="lg" className="w-full">Open campaign</AButton></Link>
          <AButton variant="secondary" size="lg" className="w-full" onClick={() => setSel(null)}>Close</AButton>
        </>}
      >
        {sel && (
          <div className="mt-5">
            <p className="eyebrow mb-2 px-1 text-muted-foreground">Prep checklist</p>
            <div className="space-y-2">
              {(prep[sel.id] ?? []).map((t) => {
                const k = sel.id + t;
                return (
                  <label key={t} className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 text-sm font-semibold">
                    <input type="checkbox" checked={!!done[k]} onChange={() => setDone((d) => ({ ...d, [k]: !d[k] }))} className="h-4 w-4 accent-[var(--primary)]" />
                    <span className={done[k] ? "text-muted-foreground line-through" : ""}>{t}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </ItemDetailSheet>
    </AppShell>
  );
}
