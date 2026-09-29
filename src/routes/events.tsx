import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/alfred/ui";
import { CalendarDays, Camera, Video, Mic, Users, Plane } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, Card, IconBadge, Pill } from "@/components/alfred/ui";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Shoots and events — INFLUENCER" },
      { name: "description", content: "Shoots, brand meetings, launches and collaborations on your schedule." },
      { property: "og:title", content: "Shoots and events — INFLUENCER" },
      { property: "og:description", content: "Upcoming shoots and brand dates, some belonging to a campaign." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EventsScreen,
});

const groups = [
  {
    label: "This week",
    items: [
      { id: "e1", title: "Gymshark Reel shoot", when: "Sunday · 8:00 AM", where: "Ikoyi Fitness studio", icon: Camera, tone: "orange" as const, plan: "Gymshark" },
      { id: "e2", title: "Notion walkthrough recording", when: "Tuesday · 10:30 AM", where: "Home desk setup", icon: Video, tone: "green" as const, plan: "Notion" },
      { id: "e3", title: "Spotify brand call", when: "Friday · 6:45 PM", where: "Video call · 30 min", icon: Mic, tone: "blue" as const, plan: "Spotify" },
    ],
  },
  {
    label: "Next week",
    items: [
      { id: "e4", title: "Apple Music launch event", when: "Monday · 7:00 PM", where: "Victoria Island", icon: Users, tone: "violet" as const, plan: "Apple Music" },
      { id: "e5", title: "Travel for the Sephora campaign", when: "Wednesday · 12:30 PM", where: "Flight to Abuja", icon: Plane, tone: "amber" as const },
    ],
  },
];

function EventsScreen() {
  return (
    <AppShell title="Shoots and events">
      <h2 className="text-[1.75rem] leading-tight font-extrabold">Shoots and events</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        What is coming up, with times and places.
      </p>


      <div className="mt-7 space-y-8">
        {groups.map((g) => (
          <section key={g.label}>
            <p className="eyebrow mb-3 px-1 text-muted-foreground">{g.label}</p>
            <div className="space-y-2.5">
              {g.items.map((e) => (
                <Card key={e.id} className="flex items-center gap-3.5 p-4">
                  <IconBadge tone={e.tone} shape="round" size="md">
                    <e.icon className="h-5 w-5" strokeWidth={2.2} />
                  </IconBadge>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.9375rem] font-bold">{e.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {e.when} · {e.where}
                    </p>
                  </div>
                  {"plan" in e && e.plan && <Pill tone="blue">{e.plan}</Pill>}
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-8 rounded-4xl bg-surface p-5">
        <p className="flex items-center gap-2 text-[0.9375rem] font-semibold">
          <CalendarDays className="h-4 w-4 text-primary" strokeWidth={2.4} />
          Events can sit inside a plan.
        </p>
        <Link to="/plans" className="mt-4 block">
          <AButton variant="secondary" size="md" className="w-full">
            Open Plans
          </AButton>
        </Link>
      </div>
    </AppShell>
  );
}
