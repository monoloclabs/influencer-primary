import { createFileRoute } from "@tanstack/react-router";
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
    ],
  }),
  component: TimelineScreen,
});

const filters = ["All", "Events", "Tasks", "Money", "Alfred"];

function TimelineScreen() {
  return (
    <AppShell title="Timeline">
      <h2 className="text-[1.75rem] leading-tight font-extrabold">Your life, in order</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        Everything happening, already handled, or coming your way.
      </p>

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
            <p className="eyebrow mb-3 px-1 text-muted-foreground">{day.day}</p>
            <div className="relative pl-6">
              <span className="absolute top-2 bottom-2 left-[7px] w-px bg-border" />
              <div className="space-y-3">
                {day.items.map((item) => (
                  <div key={item.title} className="relative">
                    <span className="absolute top-5 -left-[1.4rem] h-[9px] w-[9px] rounded-full border-2 border-background bg-primary" />
                    <div className="rounded-3xl border border-border/70 bg-card p-4 shadow-card">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-extrabold text-muted-foreground">
                          {item.time}
                        </span>
                        <Pill tone={item.tone}>{item.tag}</Pill>
                      </div>
                      <p className="mt-1.5 text-[0.9375rem] leading-snug font-bold">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
