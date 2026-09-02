import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Wallet,
  Sparkles,
  UtensilsCrossed,
  MessageSquare,
} from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, ActionPair, Card, IconBadge, Pill, SectionHeader } from "@/components/alfred/ui";
import { alfredActivity, approvals, events, messages, tasks, upNext, user } from "@/data/alfred";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alfred — Your personal life OS" },
      {
        name: "description",
        content:
          "Alfred keeps track of your tasks, reminders, money and people, and quietly handles the rest of everyday life.",
      },
      { property: "og:title", content: "Alfred — Your personal life OS" },
      {
        property: "og:description",
        content: "A calm personal operating system for tasks, reminders, money and everyday life.",
      },
    ],
  }),
  component: HomeScreen,
});

const statIcons = { check: CheckCircle2, shield: ShieldCheck, bell: Bell, wallet: Wallet };

function HomeScreen() {
  return (
    <AppShell title="Alfred">
      <p className="eyebrow text-primary">Tuesday · 1 September</p>
      <h2 className="mt-1.5 text-[2rem] leading-[1.1] font-extrabold">Good evening, {user.name}</h2>
      <p className="mt-2 text-[0.9375rem] text-muted-foreground">
        Dinner in just over an hour, three approvals waiting, and your wallet needs funding.
      </p>

      {/* Up next */}
      <div className="mt-6 rounded-4xl bg-tint-blue p-5">
        <div className="flex items-start gap-3.5">
          <IconBadge tone="blue" shape="round" size="md" className="bg-background">
            <UtensilsCrossed className="h-5 w-5" strokeWidth={2.2} />
          </IconBadge>
          <div className="min-w-0 flex-1">
            <p className="eyebrow text-tint-blue-foreground">Up next · {upNext.time}</p>
            <p className="mt-1 text-[1.0625rem] leading-snug font-bold">{upNext.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{upNext.meta}</p>
          </div>
        </div>
        <ActionPair
          className="mt-4"
          secondary={
            <AButton variant="neutral" size="lg" className="bg-background">
              Snooze
            </AButton>
          }
          primary={
            <AButton size="lg">
              {upNext.cta}
              <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
            </AButton>
          }
        />
      </div>

      {/* Stat cards */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {(
          [
            { label: "Tasks today", value: "5", sub: "2 overdue", tone: "orange", icon: "check", to: "/tasks" },
            { label: "Approvals", value: "3", sub: "Alfred is waiting", tone: "blue", icon: "shield", to: "/approvals" },
            { label: "Reminders", value: "4", sub: "Next at 20:00", tone: "violet", icon: "bell", to: "/a/$slug" as const, params: { slug: "reminders" } },
            { label: "Wallet", value: "₦248k", sub: "Fund on 30th", tone: "green", icon: "wallet", to: "/wallet" },
          ] as const
        ).map((s) => {
          const Icon = statIcons[s.icon];
          return (
            <Link key={s.label} to={s.to} className="active:scale-[0.98]">
              <Card className="h-full p-4">
                <div className="flex items-start justify-between">
                  <IconBadge tone={s.tone} size="sm">
                    <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={2.3} />
                  </IconBadge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50" strokeWidth={2.4} />
                </div>
                <p className="mt-3 text-2xl font-extrabold">{s.value}</p>
                <p className="text-sm font-semibold">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Approvals */}
      <SectionHeader
        className="mt-8 mb-3"
        title="Waiting on you"
        action={
          <Link to="/approvals" className="text-sm font-bold text-tint-blue-foreground">
            All approvals
          </Link>
        }
      />
      <div className="space-y-2.5">
        {approvals.map((a) => (
          <Card key={a.id} className="flex items-center gap-3.5 p-4">
            <IconBadge tone={a.tone} shape="round" size="md">
              <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
            </IconBadge>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.9375rem] font-bold">{a.title}</p>
              <p className="truncate text-xs text-muted-foreground">{a.meta}</p>
            </div>
            <AButton size="sm" variant="secondary">
              Approve
            </AButton>
          </Card>
        ))}
      </div>

      {/* Tasks */}
      <SectionHeader
        className="mt-8 mb-3"
        title="Today's tasks"
        action={
          <Link to="/tasks" className="text-sm font-bold text-tint-blue-foreground">
            All tasks
          </Link>
        }
      />
      <Card className="divide-y divide-border/70 p-0">
        {tasks.map((t) => (
          <div key={t.id} className="flex items-center gap-3.5 px-4 py-3.5">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-border" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.9375rem] font-semibold">{t.title}</p>
              <p className="truncate text-xs text-muted-foreground">{t.meta}</p>
            </div>
            <Pill tone={t.tone}>{t.action}</Pill>
          </div>
        ))}
      </Card>

      {/* Events */}
      <SectionHeader className="mt-8 mb-3" title="Later today" />
      <div className="space-y-2.5">
        {events.map((e) => (
          <div
            key={e.id}
            className="flex items-center gap-4 rounded-3xl bg-surface px-4 py-3.5"
          >
            <span className="w-12 shrink-0 text-sm font-extrabold">{e.time}</span>
            <span className="min-w-0 flex-1 truncate text-[0.9375rem] font-semibold">{e.title}</span>
            <Pill tone={e.tone}>{e.tag}</Pill>
          </div>
        ))}
      </div>

      {/* Messages */}
      <SectionHeader
        className="mt-8 mb-3"
        title="Needs a reply"
        action={
          <Link to="/messages" className="text-sm font-bold text-tint-blue-foreground">
            Inbox
          </Link>
        }
      />
      <Card className="space-y-3.5 p-4">
        {messages.slice(0, 2).map((m) => (
          <div key={m.id} className="flex items-center gap-3.5">
            <IconBadge tone="neutral" shape="round" size="sm">
              <MessageSquare className="h-4 w-4" strokeWidth={2.2} />
            </IconBadge>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{m.from}</p>
              <p className="truncate text-xs text-muted-foreground">{m.preview}</p>
            </div>
            <span className="text-xs font-semibold text-muted-foreground">{m.time}</span>
          </div>
        ))}
      </Card>

      {/* Alfred activity */}
      <div className="mt-8 rounded-4xl bg-primary-soft p-5">
        <div className="flex items-center gap-3">
          <IconBadge tone="orange" shape="round" size="sm" className="bg-background">
            <Sparkles className="h-4 w-4" strokeWidth={2.3} />
          </IconBadge>
          <p className="eyebrow text-primary">Alfred has been busy</p>
        </div>
        <ul className="mt-4 space-y-3.5">
          {alfredActivity.map((a) => (
            <li key={a.id} className="border-b border-primary/10 pb-3.5 last:border-0 last:pb-0">
              <p className="text-[0.9375rem] leading-snug font-semibold">{a.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{a.meta}</p>
            </li>
          ))}
        </ul>
        <Link to="/a/$slug" params={{ slug: "activity" }} className="mt-4 block">
          <AButton variant="soft" size="md" className="w-full bg-background">
            See all activity
          </AButton>
        </Link>
      </div>
    </AppShell>
  );
}
