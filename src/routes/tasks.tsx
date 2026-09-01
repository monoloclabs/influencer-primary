import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, Card, Pill } from "@/components/alfred/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — Alfred" },
      { name: "description", content: "Everything you intend to get done, grouped by when it matters." },
      { property: "og:title", content: "Tasks — Alfred" },
      { property: "og:description", content: "Your tasks, grouped by when they matter." },
    ],
  }),
  component: TasksScreen,
});

const groups = [
  {
    label: "Overdue",
    items: [
      { id: "1", title: "Renew driver's licence", meta: "2 days late · FRSC portal", tag: "Late", tone: "red" as const },
      { id: "2", title: "Return the borrowed charger to Kola", meta: "Yesterday", tag: "Late", tone: "red" as const },
    ],
  },
  {
    label: "Today",
    items: [
      { id: "3", title: "Send Ada the apartment photos", meta: "19:00", tag: "Personal", tone: "blue" as const },
      { id: "4", title: "Book dentist for Thursday", meta: "Anytime", tag: "Health", tone: "green" as const },
      { id: "5", title: "Approve the DSTV payment", meta: "From Alfred", tag: "Money", tone: "orange" as const },
    ],
  },
  {
    label: "This week",
    items: [
      { id: "6", title: "Draft the Abuja trip itinerary", meta: "Before Wednesday", tag: "Travel", tone: "violet" as const },
      { id: "7", title: "Call the landlord about the leak", meta: "Thursday", tag: "Home", tone: "amber" as const },
    ],
  },
];

function TasksScreen() {
  const [done, setDone] = useState<string[]>([]);
  const toggle = (id: string) =>
    setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));

  return (
    <AppShell title="Tasks">
      <h2 className="text-[1.75rem] leading-tight font-extrabold">Tasks</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        Seven open · {done.length} cleared today. Alfred can take three of these.
      </p>

      <AButton size="lg" className="mt-5 w-full">
        <Plus className="h-4 w-4" strokeWidth={3} />
        Add a task
      </AButton>

      <div className="mt-8 space-y-7">
        {groups.map((g) => (
          <section key={g.label}>
            <p className="eyebrow mb-3 px-1 text-muted-foreground">{g.label}</p>
            <Card className="divide-y divide-border/70 p-0">
              {g.items.map((t) => {
                const isDone = done.includes(t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => toggle(t.id)}
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
                        {t.title}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">{t.meta}</span>
                    </span>
                    <Pill tone={t.tone}>{t.tag}</Pill>
                  </button>
                );
              })}
            </Card>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
