import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { OfficeShell } from "@/components/alfred/OfficeShell";
import { AButton, Card, Pill } from "@/components/alfred/ui";
import { workItems } from "@/data/office";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/office/work")({
  head: () => ({
    meta: [
      { title: "Work, Alfred Office" },
      { name: "description", content: "Business work you want your staff to handle, kept separate from personal tasks." },
      { property: "og:title", content: "Work, Alfred Office" },
      { property: "og:description", content: "Business work assigned across your team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WorkScreen,
});

const groups = ["Today", "Upcoming", "Done"] as const;

function WorkScreen() {
  const [done, setDone] = useState<string[]>(["w6"]);
  const toggle = (id: string) =>
    setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));

  return (
    <OfficeShell title="Work">
      <h2 className="text-[1.75rem] leading-tight font-extrabold">Work</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        What the business needs done, and who is carrying it. Separate from your personal tasks.
      </p>

      <AButton size="lg" className="mt-5 w-full">
        <Plus className="h-4 w-4" strokeWidth={3} />
        Assign work
      </AButton>

      <div className="mt-8 space-y-7">
        {groups.map((g) => {
          const items = workItems.filter((w) => w.tag === g);
          if (!items.length) return null;
          return (
            <section key={g}>
              <p className="eyebrow mb-3 px-1 text-muted-foreground">{g}</p>
              <Card className="divide-y divide-border/70 p-0">
                {items.map((w) => {
                  const isDone = done.includes(w.id);
                  return (
                    <button
                      key={w.id}
                      onClick={() => toggle(w.id)}
                      className="flex w-full items-center gap-3.5 px-4 py-4 text-left active:bg-surface"
                    >
                      <span
                        className={cn(
                          "grid h-6 w-6 shrink-0 place-items-center rounded-full border-2",
                          isDone ? "border-primary bg-primary text-primary-foreground" : "border-border",
                        )}
                      >
                        {isDone && <Check className="h-3.5 w-3.5" strokeWidth={3.4} />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block truncate text-[0.9375rem] font-semibold",
                            isDone && "text-muted-foreground line-through",
                          )}
                        >
                          {w.title}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {w.who} · {w.meta}
                        </span>
                      </span>
                      <Pill tone={w.tone}>{w.tag}</Pill>
                    </button>
                  );
                })}
              </Card>
            </section>
          );
        })}
      </div>
    </OfficeShell>
  );
}
