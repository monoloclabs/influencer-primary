import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, Card, Pill } from "@/components/alfred/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Production tasks | INFLUENCER" },
      { name: "description", content: "Scripts, shoots, edits and revisions across your live campaigns, grouped by when they matter." },
      { property: "og:title", content: "Production tasks | INFLUENCER" },
      { property: "og:description", content: "Your campaign production work, grouped by when it matters." },
    ],
  }),
  component: TasksScreen,
});

const groups = [
  {
    label: "Overdue",
    items: [
      { id: "1", title: "Send Gymshark the revised caption", meta: "2 days late · brand feedback", tag: "Late", tone: "red" as const },
      { id: "2", title: "Upload raw footage for the Notion edit", meta: "Yesterday", tag: "Late", tone: "red" as const },
    ],
  },
  {
    label: "Today",
    items: [
      { id: "3", title: "Film the Gymshark Reel B-roll", meta: "19:00 · home studio", tag: "Shoot", tone: "blue" as const },
      { id: "4", title: "Approve the Notion thumbnail", meta: "Anytime", tag: "Review", tone: "green" as const },
      { id: "5", title: "Confirm the Apple Music payout details", meta: "From Wallet", tag: "Money", tone: "orange" as const },
    ],
  },
  {
    label: "This week",
    items: [
      { id: "6", title: "Draft the Spotify pitch deliverables", meta: "Before Wednesday", tag: "Pitch", tone: "violet" as const },
      { id: "7", title: "Schedule the Threads carousel posts", meta: "Thursday", tag: "Schedule", tone: "amber" as const },
    ],
  },
];

function TasksScreen() {
  const [done, setDone] = useState<string[]>([]);
  const [saved, setSaved] = useState(true);
  const toggle = (id: string) => {
    setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));
    setSaved(false);
  };

  return (
    <AppShell title="Production tasks">
      <h2 className="text-[1.75rem] leading-tight font-extrabold">Production tasks</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        Seven open · {done.length} ticked. {saved ? "Everything is saved." : "Tap Save to keep your changes."}
      </p>


      <div className="mt-5 grid grid-cols-3 gap-3">
        <AButton size="lg" className="col-span-2 w-full">
          <Plus className="h-4 w-4" strokeWidth={3} />
          Create new task
        </AButton>
        <AButton
          size="lg"
          variant="soft"
          className="w-full"
          disabled={saved}
          onClick={() => setSaved(true)}
        >
          {saved ? "Saved" : "Save"}
        </AButton>
      </div>

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
