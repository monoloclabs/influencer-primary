import { createFileRoute, notFound, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Link } from "@/components/alfred/ui";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  FileText,
  MapPin,
  Pencil,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";
import { AButton, ActionPair, Card, IconBadge, Pill, SectionHeader } from "@/components/alfred/ui";
import { getPlan } from "@/data/plans";

export const Route = createFileRoute("/plan/$planId")({
  loader: ({ params }) => {
    const plan = getPlan(params.planId);
    if (!plan) throw notFound();
    return { title: plan.title, when: plan.when };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Plan unavailable — Alfred" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.title} — Alfred plan`;
    const description = `${loaderData.title}: ${loaderData.when}. Every date, booking, task and person in one plan.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: PlanNotFound,
  component: PlanDetailScreen,
});

function PlanNotFound() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[520px] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-xl font-extrabold">That plan isn't here</h1>
      <p className="text-sm text-muted-foreground">It may have been removed or renamed.</p>
      <Link to="/plans">
        <AButton size="lg">Back to plans</AButton>
      </Link>
    </div>
  );
}

function PlanDetailScreen() {
  const { planId } = useParams({ from: "/plan/$planId" });
  const plan = getPlan(planId)!;
  const [editing, setEditing] = useState(false);
  const [shared, setShared] = useState(false);
  const Icon = plan.icon;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[520px] flex-col bg-background">
      <header className="sticky top-0 z-30 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 bg-background/85 px-5 pt-4 pb-3 backdrop-blur-xl">
        <Link
          to="/plans"
          aria-label="Back to plans"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-card shadow-card"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.4} />
        </Link>
        <h1 className="truncate text-center text-base font-bold">
          {editing ? "Editing plan" : "Plan"}
        </h1>
        <div className="flex items-center gap-2">
          {!editing && (
            <button
              aria-label="Share plan"
              onClick={() => setShared(true)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-card shadow-card"
            >
              <Share2 className="h-5 w-5" strokeWidth={2.2} />
            </button>
          )}
          <button
            aria-label="Edit plan"
            onClick={() => setEditing(true)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-soft"
          >
            <Pencil className="h-[1.1rem] w-[1.1rem] text-primary" strokeWidth={2.3} />
          </button>
        </div>
      </header>

      <main className="flex-1 px-5 pb-40">
        <div className="flex items-start gap-3.5">
          <IconBadge tone={plan.tone} shape="squircle" size="lg">
            <Icon className="h-6 w-6" strokeWidth={2.1} />
          </IconBadge>
          <div className="min-w-0 flex-1">
            <h2 className="text-[1.75rem] leading-tight font-extrabold">{plan.title}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
              <CalendarDays className="h-4 w-4" strokeWidth={2.3} />
              {plan.when}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" strokeWidth={2.3} />
              {plan.where}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="h-4 w-4" strokeWidth={2.3} />
              {plan.people}
            </p>
          </div>
          <Pill tone={plan.tone}>{plan.progress}</Pill>
        </div>

        {editing && (
          <div className="mt-5 rounded-3xl bg-tint-blue p-4">
            <p className="text-sm font-semibold text-tint-blue-foreground">
              You're editing this plan. Change what you need, then save your changes below.
            </p>
          </div>
        )}

        {shared && !editing && (
          <div className="mt-5 rounded-3xl bg-primary-soft p-4">
            <p className="text-sm font-semibold text-primary">
              Sharing is coming soon — this will open your phone's share sheet.
            </p>
          </div>
        )}

        <div className="mt-5 rounded-3xl bg-surface px-4 py-3.5">
          <p className="text-sm leading-snug font-semibold">{plan.note}</p>
        </div>

        <SectionHeader className="mt-8 mb-3" title="Itinerary" />
        <Card className="divide-y divide-border/70 p-0">
          {plan.itinerary.map((i) => (
            <div key={i.id} className="flex items-start gap-4 px-4 py-4">
              <span className="w-16 shrink-0 pt-0.5 text-sm font-extrabold tabular-nums">{i.time}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.9375rem] leading-snug font-bold">{i.title}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{i.meta}</span>
              </span>
            </div>
          ))}
        </Card>

        <SectionHeader className="mt-8 mb-3" title="Tasks in this plan" />
        <Card className="divide-y divide-border/70 p-0">
          {plan.tasks.map((t) => (
            <div key={t.id} className="flex items-center gap-3.5 px-4 py-3.5">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={2.2} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.9375rem] font-semibold">{t.title}</span>
                <span className="block truncate text-xs text-muted-foreground">{t.meta}</span>
              </span>
            </div>
          ))}
        </Card>

        <SectionHeader className="mt-8 mb-3" title="Notes & files" />
        <Card className="space-y-2.5 p-4">
          {plan.files.map((f) => (
            <div key={f} className="flex items-center gap-3 rounded-2xl bg-surface px-3.5 py-2.5">
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2.2} />
              <span className="truncate text-[0.8125rem] font-semibold">{f}</span>
            </div>
          ))}
        </Card>

        <div className="mt-8 flex items-center gap-2 rounded-3xl bg-primary-soft px-4 py-3.5">
          <Sparkles className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.4} />
          <span className="text-sm font-semibold">{plan.alfred}</span>
        </div>
      </main>

      {editing && (
        <div className="fixed bottom-0 z-30 w-full max-w-[520px] border-t border-border/70 bg-background/95 px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
          <ActionPair
            secondary={
              <AButton variant="secondary" size="lg" onClick={() => setEditing(false)}>
                Cancel
              </AButton>
            }
            primary={
              <AButton size="lg" onClick={() => setEditing(false)}>
                Save changes
              </AButton>
            }
          />
        </div>
      )}
    </div>
  );
}
