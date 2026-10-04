import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, Card, Link, Pill } from "@/components/alfred/ui";
import { BrandMark, PlatformMark } from "@/components/influencer/Marks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/a/calendar")({
  head: () => ({
    meta: [
      { title: "Content calendar — INFLUENCER" },
      {
        name: "description",
        content: "Every deliverable, draft review and posting date across your live campaigns.",
      },
      { property: "og:title", content: "Content calendar — INFLUENCER" },
      { property: "og:description", content: "Your month of deliverables, without the clutter." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContentCalendarScreen,
});

type Entry = {
  id: string;
  brand: string;
  title: string;
  platform: string;
  day: string;
  date: string;
  time: string;
  state: "Planned" | "Drafted" | "In brand review" | "Live";
  campaignId?: string;
  week: "this" | "next" | "later";
};

const entries: Entry[] = [
  { id: "cal1", brand: "Gymshark", title: "Hero Reel — morning session", platform: "Instagram", day: "Tue", date: "14 Oct", time: "Post 7:30 PM", state: "Drafted", campaignId: "c1", week: "this" },
  { id: "cal2", brand: "Gymshark", title: "Story set — kit unboxing", platform: "Instagram", day: "Thu", date: "16 Oct", time: "Post 12:00 PM", state: "Planned", campaignId: "c1", week: "this" },
  { id: "cal3", brand: "Notion", title: "Template link Stories", platform: "Instagram", day: "Fri", date: "17 Oct", time: "Post 9:00 AM", state: "Live", campaignId: "c3", week: "this" },
  { id: "cal4", brand: "Gymshark", title: "TikTok — 5 lifts, 5 cues", platform: "TikTok", day: "Mon", date: "20 Oct", time: "Post 6:00 PM", state: "Planned", campaignId: "c1", week: "next" },
  { id: "cal5", brand: "Gymshark", title: "Hero Reel draft due with brand", platform: "Instagram", day: "Wed", date: "22 Oct", time: "Submit by 10:00 AM", state: "In brand review", campaignId: "c1", week: "next" },
  { id: "cal6", brand: "Apple Music", title: "Summer Sessions cutdown", platform: "YouTube", day: "Fri", date: "24 Oct", time: "Post 5:00 PM", state: "Planned", campaignId: "c5", week: "next" },
  { id: "cal7", brand: "Spotify", title: "Reel — my year in sound", platform: "Instagram", day: "Thu", date: "4 Dec", time: "Post 8:00 PM", state: "Planned", campaignId: "c2", week: "later" },
  { id: "cal8", brand: "Spotify", title: "YouTube integration — 60s", platform: "YouTube", day: "Tue", date: "9 Dec", time: "Post 6:30 PM", state: "Planned", campaignId: "c2", week: "later" },
];

const stateTone: Record<Entry["state"], "neutral" | "blue" | "amber" | "green"> = {
  Planned: "neutral",
  Drafted: "blue",
  "In brand review": "amber",
  Live: "green",
};

const groups: { key: Entry["week"]; label: string }[] = [
  { key: "this", label: "This week" },
  { key: "next", label: "Next week" },
  { key: "later", label: "Later" },
];

const platformFilters = ["All", "Instagram", "TikTok", "YouTube"];

function ContentCalendarScreen() {
  const [platform, setPlatform] = useState("All");

  const visible = useMemo(
    () => (platform === "All" ? entries : entries.filter((e) => e.platform === platform)),
    [platform],
  );

  const live = entries.filter((e) => e.state === "Live").length;
  const review = entries.filter((e) => e.state === "In brand review").length;

  return (
    <AppShell title="Content calendar">
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
        <ArrowLeft className="h-4 w-4" strokeWidth={2.6} />
        Back
      </Link>

      <h2 className="mt-4 text-[1.75rem] leading-tight font-extrabold">Content calendar</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        Every posting date and review deadline across your live campaigns.
      </p>

      <Card className="mt-5 flex items-center gap-4 p-4">
        <div className="min-w-0 flex-1">
          <p className="text-[1.375rem] font-extrabold leading-none">{entries.length}</p>
          <p className="mt-1 text-xs text-muted-foreground">Scheduled</p>
        </div>
        <span className="h-9 w-px bg-border" />
        <div className="min-w-0 flex-1">
          <p className="text-[1.375rem] font-extrabold leading-none">{review}</p>
          <p className="mt-1 text-xs text-muted-foreground">With the brand</p>
        </div>
        <span className="h-9 w-px bg-border" />
        <div className="min-w-0 flex-1">
          <p className="text-[1.375rem] font-extrabold leading-none">{live}</p>
          <p className="mt-1 text-xs text-muted-foreground">Already live</p>
        </div>
      </Card>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {platformFilters.map((p) => (
          <button
            key={p}
            onClick={() => setPlatform(p)}
            className={cn(
              "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-[0.8125rem] font-semibold",
              platform === p ? "bg-foreground text-background" : "bg-surface text-muted-foreground",
            )}
          >
            {p !== "All" && <PlatformMark platform={p} className="h-3.5 w-3.5" />}
            {p}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-8">
        {groups.map((g) => {
          const items = visible.filter((e) => e.week === g.key);
          if (!items.length) return null;
          return (
            <section key={g.key}>
              <p className="eyebrow mb-3 px-1 text-muted-foreground">{g.label}</p>
              <div className="space-y-2.5">
                {items.map((e) => (
                  <Card key={e.id} className="flex items-center gap-3.5 p-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-surface">
                      <span className="text-[0.625rem] font-bold uppercase text-muted-foreground">{e.day}</span>
                      <span className="text-[0.8125rem] font-extrabold leading-none">{e.date.split(" ")[0]}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <BrandMark brand={e.brand} className="h-3.5 w-3.5 text-foreground" />
                        <span className="truncate text-xs font-bold">{e.brand}</span>
                        <span className="text-muted-foreground">|</span>
                        <PlatformMark platform={e.platform} className="h-3.5 w-3.5 text-foreground" />
                      </div>
                      <p className="mt-1 truncate text-[0.9375rem] font-bold">{e.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{e.time}</p>
                    </div>
                    <Pill tone={stateTone[e.state]}>{e.state}</Pill>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-8 rounded-4xl bg-surface p-5">
        <p className="flex items-center gap-2 text-[0.9375rem] font-semibold">
          <CalendarDays className="h-4 w-4 text-primary" strokeWidth={2.4} />
          Dates come from your activations.
        </p>
        <Link to="/activations" className="mt-4 block">
          <AButton variant="secondary" size="md" className="w-full">
            Open Activations
          </AButton>
        </Link>
      </div>
    </AppShell>
  );
}
