import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeftRight, CalendarDays, Flag, Landmark } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { Pill } from "@/components/alfred/ui";
import { BrandMark, brandFromText } from "@/components/influencer/Marks";
import { campaignEvents, transactions } from "@/data/influencer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Timeline | INFLUENCER" },
      {
        name: "description",
        content:
          "Every payout, fee and campaign milestone in order: transactions on one side, campaign events on the other.",
      },
      { property: "og:title", content: "Timeline | INFLUENCER" },
      {
        property: "og:description",
        content: "A chronological record of creator earnings and campaign milestones.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TimelineScreen,
});

const tabs = [
  { id: "transactions" as const, label: "Transactions", icon: ArrowLeftRight },
  { id: "events" as const, label: "Events", icon: Flag },
];

function TimelineScreen() {
  const [tab, setTab] = useState<"transactions" | "events">("transactions");
  const groups = tab === "transactions" ? transactions : campaignEvents;

  return (
    <AppShell title="Timeline">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[1.75rem] leading-tight font-extrabold">Your record</h2>
          <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
            Money that moved, and everything your campaigns did.
          </p>
        </div>
        <button
          aria-label="Jump to a date"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface"
        >
          <CalendarDays className="h-5 w-5" strokeWidth={2.2} />
        </button>
      </div>

      <div className="mt-6 flex gap-6 border-b border-border/70 px-1">
        {tabs.map((t) => {
          const active = tab === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex items-center gap-2 border-b-2 pb-3 text-[0.9375rem] font-bold transition-colors",
                active ? "border-primary text-primary" : "border-transparent text-muted-foreground",
              )}
            >
              <Icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={2.3} />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-7 space-y-8">
        {groups.map((group) => (
          <section key={group.day}>
            <p className="eyebrow mb-3 px-1 text-primary">{group.day}</p>
            <div className="divide-y divide-border/70 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card">
              {group.items.map((item) => {
                const brand = brandFromText(item.title);
                return (
                <div key={item.id} className="flex items-start gap-4 px-4 py-4">
                  <span className="w-14 shrink-0 pt-0.5 text-sm font-extrabold tabular-nums">
                    {item.time}
                  </span>
                  {brand ? (
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface">
                      <BrandMark brand={brand} className="h-[1.05rem] w-[1.05rem] text-foreground" />
                    </span>
                  ) : (
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface">
                      <Landmark className="h-[1.05rem] w-[1.05rem] text-muted-foreground" strokeWidth={2.2} />
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.9375rem] leading-snug font-bold">
                      {item.title}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">{item.meta}</span>
                    <span className="mt-1.5 block">
                      <Pill tone={item.tone}>{item.tag}</Pill>
                    </span>
                  </span>
                  {item.amount && (
                    <span
                      className={cn(
                        "shrink-0 pt-0.5 text-sm font-extrabold tabular-nums",
                        item.tag === "Pending"
                          ? "text-muted-foreground"
                          : item.amount.startsWith("+")
                            ? "text-tint-green-foreground"
                            : item.amount.startsWith("-")
                              ? "text-destructive"
                              : "text-muted-foreground",
                      )}
                    >
                      {item.amount}
                    </span>
                  )}
                </div>
              )})}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
