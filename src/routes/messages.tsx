import { createFileRoute } from "@tanstack/react-router";
import { Search, Sparkles } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, Card, IconBadge, Pill } from "@/components/alfred/ui";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Messages — Alfred" },
      { name: "description", content: "Conversations that need you, plus everything Alfred is handling on your behalf." },
      { property: "og:title", content: "Messages — Alfred" },
      { property: "og:description", content: "Your inbox, with Alfred drafting and chasing in the background." },
    ],
  }),
  component: MessagesScreen,
});

const threads = [
  { id: "1", who: "Ada", initials: "AD", preview: "Are we still on for Saturday?", time: "2m", unread: 2, tone: "blue" as const },
  { id: "2", who: "Alfred", initials: "AL", preview: "I drafted your gym cancellation email — want me to send it?", time: "1h", unread: 1, tone: "orange" as const },
  { id: "3", who: "Kola", initials: "KO", preview: "Sent the flat listing 🙌", time: "3h", unread: 0, tone: "green" as const },
  { id: "4", who: "Mum", initials: "MU", preview: "Don't be late tonight o.", time: "5h", unread: 0, tone: "violet" as const },
  { id: "5", who: "Sterling Bank", initials: "SB", preview: "Your statement for August is ready.", time: "Yest", unread: 0, tone: "neutral" as const },
];

function MessagesScreen() {
  return (
    <AppShell title="Messages">
      <h2 className="text-[1.75rem] leading-tight font-extrabold">Inbox</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        Three people are waiting. Alfred has drafted two replies already.
      </p>

      <div className="mt-5 flex items-center gap-3 rounded-full bg-surface px-4 py-3.5">
        <Search className="h-[1.1rem] w-[1.1rem] text-muted-foreground" strokeWidth={2.2} />
        <span className="text-sm text-muted-foreground">Search people and messages</span>
      </div>

      <div className="mt-4 rounded-4xl bg-primary-soft p-5">
        <div className="flex items-center gap-3">
          <IconBadge tone="orange" shape="round" size="sm" className="bg-background">
            <Sparkles className="h-4 w-4" strokeWidth={2.3} />
          </IconBadge>
          <p className="eyebrow text-primary">Alfred suggests</p>
        </div>
        <p className="mt-3 text-[0.9375rem] leading-snug font-bold">
          Reply to Ada confirming Saturday at 2pm and add it to your timeline.
        </p>
        <div className="mt-4 flex gap-2.5">
          <AButton size="sm" className="flex-1">
            Send it
          </AButton>
          <AButton size="sm" variant="neutral" className="bg-background">
            Edit
          </AButton>
        </div>
      </div>

      <p className="eyebrow mt-8 mb-3 px-1 text-muted-foreground">All conversations</p>
      <Card className="divide-y divide-border/70 p-0">
        {threads.map((t) => (
          <button key={t.id} className="flex w-full items-center gap-3.5 px-4 py-4 text-left active:bg-surface">
            <IconBadge tone={t.tone} shape="round" size="md">
              <span className="text-xs font-extrabold">{t.initials}</span>
            </IconBadge>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.9375rem] font-bold">{t.who}</span>
              <span className="block truncate text-xs text-muted-foreground">{t.preview}</span>
            </span>
            <span className="flex shrink-0 flex-col items-end gap-1.5">
              <span className="text-[0.6875rem] font-semibold text-muted-foreground">{t.time}</span>
              {t.unread > 0 && <Pill tone="orange">{t.unread} new</Pill>}
            </span>
          </button>
        ))}
      </Card>
    </AppShell>
  );
}
