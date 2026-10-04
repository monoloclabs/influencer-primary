import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Link, Pill } from "@/components/alfred/ui";
import { BrandShell, brandMeta } from "@/components/brand/BrandShell";
import { PlatformMark } from "@/components/influencer/Marks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/brand/calendar")({
  head: () => brandMeta("Campaign calendar — Brand workspace | INFLUENCER", "Review deadlines, deliverable submissions and campaign milestones across every brand campaign."),
  component: BrandCalendar,
});

type Kind = "Review deadline" | "Submission" | "Go live" | "Milestone";
type Entry = { id: string; campaign: string; creator: string; title: string; platform: string; day: string; date: string; time: string; kind: Kind; week: "this" | "next" | "later" };

const entries: Entry[] = [
  { id: "b1", campaign: "Summer Lift Series", creator: "CR-408", title: "Review Hero Reel first cut", platform: "Instagram", day: "Tue", date: "14 Oct", time: "Decide by 5:00 PM", kind: "Review deadline", week: "this" },
  { id: "b2", campaign: "Recovery Range Teaser", creator: "CR-221", title: "Story set submission", platform: "Instagram", day: "Thu", date: "16 Oct", time: "Expected by 12:00 PM", kind: "Submission", week: "this" },
  { id: "b3", campaign: "Summer Lift Series", creator: "CR-408", title: "Kickoff milestone — $6,250 released", platform: "Instagram", day: "Fri", date: "17 Oct", time: "Escrow release", kind: "Milestone", week: "this" },
  { id: "b4", campaign: "Summer Lift Series", creator: "CR-408", title: "TikTok — 5 lifts, 5 cues", platform: "TikTok", day: "Mon", date: "20 Oct", time: "Goes live 6:00 PM", kind: "Go live", week: "next" },
  { id: "b5", campaign: "Recovery Range Teaser", creator: "CR-221", title: "Approve usage-rights counter-offer", platform: "TikTok", day: "Wed", date: "22 Oct", time: "Decide by 10:00 AM", kind: "Review deadline", week: "next" },
  { id: "b6", campaign: "Summer Lift Series", creator: "CR-408", title: "YouTube cutdown submission", platform: "YouTube", day: "Fri", date: "24 Oct", time: "Expected by 5:00 PM", kind: "Submission", week: "next" },
  { id: "b7", campaign: "Hydration bottle launch", creator: "Matching", title: "Creator match window closes", platform: "Instagram", day: "Mon", date: "3 Nov", time: "Brief milestone", kind: "Milestone", week: "later" },
];

const tone: Record<Kind, "amber" | "blue" | "green" | "violet"> = { "Review deadline": "amber", Submission: "blue", "Go live": "green", Milestone: "violet" };
const groups = [{ key: "this", label: "This week" }, { key: "next", label: "Next week" }, { key: "later", label: "Later" }] as const;
const filters = ["All", "Review deadline", "Submission", "Go live", "Milestone"] as const;

function BrandCalendar() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = useMemo(() => (filter === "All" ? entries : entries.filter((e) => e.kind === filter)), [filter]);
  const reviews = entries.filter((e) => e.kind === "Review deadline").length;
  const subs = entries.filter((e) => e.kind === "Submission").length;

  return (
    <BrandShell title="Calendar">
      <h2 className="pt-2 text-[1.75rem] leading-tight font-extrabold">Campaign calendar</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">Every review deadline, submission and milestone across your campaigns.</p>

      <div className="mt-5 flex items-center gap-4 rounded-3xl bg-card p-4 shadow-card">
        {[{ v: entries.length, l: "Scheduled" }, { v: reviews, l: "Your reviews" }, { v: subs, l: "Submissions due" }].map((s, i) => (
          <div key={s.l} className={cn("min-w-0 flex-1", i > 0 && "border-l border-border pl-4")}>
            <p className="text-[1.375rem] leading-none font-extrabold">{s.v}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={cn("h-9 shrink-0 rounded-full px-4 text-[0.8125rem] font-semibold", filter === f ? "bg-foreground text-background" : "bg-surface text-muted-foreground")}>{f}</button>
        ))}
      </div>

      <div className="mt-6 space-y-8">
        {groups.map((g) => {
          const items = visible.filter((e) => e.week === g.key);
          if (!items.length) return null;
          return (
            <section key={g.key}>
              <p className="mb-3 px-1 text-xs font-bold tracking-wide text-muted-foreground uppercase">{g.label}</p>
              <div className="space-y-2.5">
                {items.map((e) => (
                  <div key={e.id} className="flex items-center gap-3.5 rounded-3xl bg-card p-4 shadow-card">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-surface">
                      <span className="text-[0.625rem] font-bold text-muted-foreground uppercase">{e.day}</span>
                      <span className="text-[0.8125rem] leading-none font-extrabold">{e.date.split(" ")[0]}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        <PlatformMark platform={e.platform} className="h-3.5 w-3.5 text-foreground" />
                        <span className="truncate">{e.campaign}</span>
                        <span className="text-muted-foreground">· {e.creator}</span>
                      </div>
                      <p className="mt-1 truncate text-[0.9375rem] font-bold">{e.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{e.time}</p>
                    </div>
                    <Pill tone={tone[e.kind]}>{e.kind}</Pill>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-8 rounded-3xl bg-surface p-5">
        <p className="flex items-center gap-2 text-[0.9375rem] font-semibold"><CalendarDays className="h-4 w-4 text-primary" />Dates come from your campaigns.</p>
        <Link to="/brand/campaigns" className="mt-4 flex h-12 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">Open campaigns</Link>
      </div>
    </BrandShell>
  );
}
