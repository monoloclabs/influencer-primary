import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/alfred/ui";
import { CalendarDays, Plane, Stethoscope, UtensilsCrossed, Dumbbell, Users } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, Card, IconBadge, Pill } from "@/components/alfred/ui";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Alfred" },
      { name: "description", content: "Every scheduled happening in your life: dinners, appointments, flights and meetings." },
      { property: "og:title", content: "Events — Alfred" },
      { property: "og:description", content: "Individual scheduled happenings, some belonging to a bigger plan." },
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
      { id: "e1", title: "Dinner with Mum", when: "Sunday · 8:00 PM", where: "Yellow Chilli, Lekki", icon: UtensilsCrossed, tone: "orange" as const, plan: "Dinner with Mum" },
      { id: "e2", title: "Dentist", when: "Tuesday · 10:30 AM", where: "Smile Studio", icon: Stethoscope, tone: "green" as const },
      { id: "e3", title: "Flight to Lagos", when: "Friday · 6:45 PM", where: "AA 314 · Terminal 2", icon: Plane, tone: "blue" as const, plan: "Paris vacation" },
    ],
  },
  {
    label: "Next week",
    items: [
      { id: "e4", title: "Gym — leg day", when: "Monday · 7:00 AM", where: "Ikoyi Fitness", icon: Dumbbell, tone: "violet" as const },
      { id: "e5", title: "Design team lunch", when: "Wednesday · 12:30 PM", where: "The Yard", icon: Users, tone: "amber" as const },
    ],
  },
];

function EventsScreen() {
  return (
    <AppShell title="Events">
      <h2 className="text-[1.75rem] leading-tight font-extrabold">Events</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        Individual things happening, with times and places.
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
