import { createFileRoute, notFound, useParams } from "@tanstack/react-router";
import { ArrowLeft, Bell, CalendarDays, CheckCircle2 } from "lucide-react";
import { AButton, Card, IconBadge, Link, Pill, SectionHeader } from "@/components/alfred/ui";
import { BrandMark, PlatformMark } from "@/components/influencer/Marks";
import { getActivation, getCampaign } from "@/data/influencer";

export const Route = createFileRoute("/activation/$activationId")({
  loader: ({ params }) => {
    const activation = getActivation(params.activationId);
    if (!activation) throw notFound();
    const campaign = getCampaign(activation.campaignId);
    return { title: activation.title, brand: campaign?.brand ?? "Campaign" };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} — INFLUENCER` : "Activation unavailable — INFLUENCER";
    const description = loaderData ? `${loaderData.brand} activation schedule, content and production steps.` : "This activation could not be found.";
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] };
  },
  notFoundComponent: ActivationNotFound,
  component: ActivationDetail,
});

function ActivationNotFound() {
  return <div className="mx-auto flex min-h-screen max-w-[520px] flex-col items-center justify-center gap-4 px-6 text-center"><h1 className="text-xl font-extrabold">That activation isn't here</h1><Link to="/activations"><AButton>Back to activations</AButton></Link></div>;
}

function ActivationDetail() {
  const { activationId } = useParams({ from: "/activation/$activationId" });
  const activation = getActivation(activationId);
  const campaign = activation ? getCampaign(activation.campaignId) : undefined;
  if (!activation || !campaign) return null;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[520px] flex-col bg-background">
      <header className="sticky top-0 z-30 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 bg-background/85 px-5 pt-4 pb-3 backdrop-blur-xl">
        <Link to="/activations" aria-label="Back to activations" className="grid h-11 w-11 place-items-center rounded-full bg-card shadow-card"><ArrowLeft className="h-5 w-5" /></Link>
        <h1 className="truncate text-center text-base font-bold">Activation</h1>
        <AButton size="icon" variant="soft" aria-label="Remind me about this activation"><Bell className="h-5 w-5" /></AButton>
      </header>
      <main className="flex-1 px-5 pb-12">
        <div className="flex items-start gap-3.5">
          <IconBadge tone={campaign.tone} shape="squircle" size="lg"><BrandMark brand={campaign.brand} className="h-6 w-6" /></IconBadge>
          <div className="min-w-0 flex-1"><p className="eyebrow text-muted-foreground">{campaign.brand}</p><h2 className="text-[1.75rem] leading-tight font-extrabold">{activation.title}</h2><Link to={`/plan/${campaign.id}`} className="mt-1 inline-block text-xs font-bold text-tint-blue-foreground">Open campaign brief</Link></div>
          <Pill tone={activation.status === "complete" ? "green" : "orange"}>{activation.status}</Pill>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">{activation.platforms.map((platform) => <span key={platform} className="flex items-center gap-2 rounded-full bg-surface px-3 py-2 text-xs font-bold"><PlatformMark platform={platform} className="h-4 w-4" />{platform}</span>)}</div>
        <SectionHeader className="mt-8 mb-3" title="Content schedule" />
        <Card className="divide-y divide-border/70 p-0">{activation.contentItems.map((item) => <div key={item.id} className="flex items-start gap-3.5 px-4 py-4"><PlatformMark platform={item.platform} className="mt-0.5 h-5 w-5 shrink-0" /><span className="min-w-0 flex-1"><span className="block text-sm font-bold">{item.title}</span><span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" />{item.date} · {item.platform}</span></span><Pill tone={item.state === "Live" ? "green" : item.state === "Editing" ? "orange" : "neutral"}>{item.state}</Pill></div>)}</Card>
        <SectionHeader className="mt-8 mb-3" title="Upcoming steps" />
        <Card className="divide-y divide-border/70 p-0">{activation.nextSteps.map((step) => <div key={step} className="flex items-center gap-3 px-4 py-3.5"><CheckCircle2 className="h-5 w-5 text-muted-foreground" /><span className="text-sm font-semibold">{step}</span></div>)}</Card>
        <SectionHeader className="mt-8 mb-3" title="Production notes" />
        <div className="rounded-3xl bg-tint-blue p-5 text-sm font-semibold">{activation.notes}</div>
      </main>
    </div>
  );
}