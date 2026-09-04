import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { Pill } from "@/components/alfred/ui";
import { timeline } from "@/data/alfred";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Timeline — Alfred" },
      {
        name: "description",
        content: "Everything happening across your life, in order: tasks, bookings, deadlines and Alfred activity.",
      },
      { property: "og:title", content: "Timeline — Alfred" },
      {
        property: "og:description",
        content: "A chronological view of your tasks, events, deadlines and what Alfred has handled.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TimelineScreen,
});

const filters = ["All", "Events", "Tasks", "Money", "Alfred"];

function TimelineScreen() {
  return (
    <AppShell title="Timeline">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[1.75rem] leading-tight font-extrabold">Your life, in order</h2>
          <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
            Everything happening, already handled, or coming your way.
          </p>
        </div>
        <button
          aria-label="Jump to a date"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface"
        >
          <CalendarDays className="h-5 w-5" strokeWidth={2.2} />
        </button>
      </div>

      <div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 no-scrollbar">
        {filters.map((f, i) => (
          <button
            key={f}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-[0.8125rem] font-bold",
              i === 0 ? "bg-foreground text-background" : "bg-surface text-muted-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-7 space-y-8">
        {timeline.map((day) => (
          <section key={day.day}>
            <p className="eyebrow mb-3 px-1 text-primary">{day.day}</p>
            <div className="divide-y divide-border/70 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card">
              {day.items.map((item) => (
                <div key={item.title} className="flex items-start gap-4 px-4 py-4">
                  <span className="w-12 shrink-0 pt-0.5 text-sm font-extrabold tabular-nums">
                    {item.time}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.9375rem] leading-snug font-bold">
                      {item.title}
                    </span>
                    <span className="mt-1.5 block">
                      <Pill tone={item.tone}>{item.tag}</Pill>
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
