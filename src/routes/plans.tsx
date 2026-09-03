import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/alfred/ui";
import {
  CalendarDays,
  CheckCircle2,
  FileText,
  MapPin,
  Plane,
  Plus,
  Sparkles,
  UtensilsCrossed,
  Cake,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, Card, IconBadge, Pill, SectionHeader } from "@/components/alfred/ui";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "Plans — Alfred" },
      { name: "description", content: "The trips, dinners, birthdays and projects you're planning, with every task, booking and person in one place." },
      { property: "og:title", content: "Plans — Alfred" },
      { property: "og:description", content: "Life plans that hold their own dates, bookings, tasks, people and files." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PlansScreen,
});

const plans = [
  {
    id: "p1",
    title: "Paris vacation",
    when: "12 – 19 October",
    icon: Plane,
    tone: "blue" as const,
    progress: "6 of 11 done",
    people: "You · Ada",
    parts: ["Flight booked", "Hotel held", "Dinner at Septime", "Places to visit", "Visa documents"],
    alfred: "Alfred is watching fares for the return leg.",
  },
  {
    id: "p2",
    title: "Dinner with Mum",
    when: "Tonight · 18:40",
    icon: UtensilsCrossed,
    tone: "orange" as const,
    progress: "3 of 4 done",
    people: "You · Mum",
    parts: ["Table for two — Yellow Chilli", "Ride at 18:20", "Pick up flowers"],
    alfred: "Alfred will nudge you 40 minutes before.",
  },
  {
    id: "p3",
    title: "Ada's birthday",
    when: "Sat 20 September",
    icon: Cake,
    tone: "violet" as const,
    progress: "2 of 7 done",
    people: "You · 8 guests",
    parts: ["Venue shortlist", "Cake order", "Guest list", "Gift budget ₦120,000"],
    alfred: "Alfred drafted the invite message.",
  },
];

function PlansScreen() {
  return (
    <AppShell title="Plans">
      <h2 className="text-[1.75rem] leading-tight font-extrabold">What you're planning</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        A plan holds the dates, bookings, tasks, people and files that belong together.
      </p>

      <div className="mt-5 flex gap-3">
        <Link to="/create" className="flex-1">
          <AButton size="lg" className="w-full">
            <Plus className="h-4 w-4" strokeWidth={3} />
            New plan
          </AButton>
        </Link>
        <Link to="/assistant">
          <AButton variant="secondary" size="lg">
            <Sparkles className="h-4 w-4" strokeWidth={2.5} />
            Ask Alfred
          </AButton>
        </Link>
      </div>

      <SectionHeader className="mt-8 mb-3" title="Active plans" />
      <div className="space-y-3.5">
        {plans.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex items-start gap-3.5">
              <IconBadge tone={p.tone} shape="squircle" size="lg">
                <p.icon className="h-6 w-6" strokeWidth={2.1} />
              </IconBadge>
              <div className="min-w-0 flex-1">
                <p className="text-[1.125rem] leading-snug font-extrabold">{p.title}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" strokeWidth={2.4} />
                  {p.when}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5" strokeWidth={2.4} />
                  {p.people}
                </p>
              </div>
              <Pill tone={p.tone}>{p.progress}</Pill>
            </div>

            <ul className="mt-4 space-y-2">
              {p.parts.map((part) => (
                <li key={part} className="flex items-center gap-2.5 rounded-2xl bg-surface px-3.5 py-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2.2} />
                  <span className="truncate text-[0.8125rem] font-semibold">{part}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-primary-soft px-3.5 py-3">
              <Sparkles className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.4} />
              <span className="text-xs font-semibold">{p.alfred}</span>
            </div>

            <div className="mt-3 flex items-center gap-4 px-1 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" strokeWidth={2.4} />
                Locations
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" strokeWidth={2.4} />
                Notes & files
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 rounded-4xl bg-tint-blue p-5">
        <p className="eyebrow text-tint-blue-foreground">Plans vs events</p>
        <p className="mt-2 text-[0.9375rem] leading-snug font-semibold">
          An event is something happening. A plan is the bigger intention around it — and it can hold
          many events.
        </p>
        <Link to="/events" className="mt-4 block">
          <AButton variant="secondary" size="md" className="w-full">
            See your events
          </AButton>
        </Link>
      </div>
    </AppShell>
  );
}
