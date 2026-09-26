import { createFileRoute, notFound, useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Link } from "@/components/alfred/ui";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  FileText,
  Bell,
  Share2,
  Sparkles,
  UserRound,
} from "lucide-react";
import { AButton, ActionPair, Card, IconBadge, Pill, SectionHeader } from "@/components/alfred/ui";
import { getCampaign, statusMeta } from "@/data/influencer";
import { BrandMark, PlatformMark } from "@/components/influencer/Marks";
import { useCampaignState } from "@/components/influencer/CampaignState";

export const Route = createFileRoute("/plan/$planId")({
  loader: ({ params }) => {
    const campaign = getCampaign(params.planId);
    if (!campaign) throw notFound();
    return { title: campaign.title, brand: campaign.brand, window: campaign.window };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Campaign unavailable — INFLUENCER" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.brand} — ${loaderData.title}`;
    const description = `${loaderData.brand}: ${loaderData.title}, ${loaderData.window}. Deliverables, deadlines, fee and payment terms in one brief.`;
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
  notFoundComponent: CampaignNotFound,
  component: CampaignDetailScreen,
});

function CampaignNotFound() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[520px] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-xl font-extrabold">That campaign isn't here</h1>
      <p className="text-sm text-muted-foreground">It may have been withdrawn or renamed.</p>
      <Link to="/plans">
        <AButton size="lg">Back to campaigns</AButton>
      </Link>
    </div>
  );
}

function CampaignDetailScreen() {
  const { planId } = useParams({ from: "/plan/$planId" });
  const navigate = useNavigate();
  const campaign = getCampaign(planId);
  const [shared, setShared] = useState(false);
  const [reminded, setReminded] = useState(false);
  const { statusFor, acceptOffer, declineOffer, startActivation, activationForCampaign } = useCampaignState();
  if (!campaign) return null;
  const currentStatus = statusFor(campaign.id) ?? campaign.status;
  const status = statusMeta[currentStatus];
  const isOffer = currentStatus === "offer";
  const activation = activationForCampaign(campaign.id);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[520px] flex-col bg-background">
      <header className="sticky top-0 z-30 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 bg-background/85 px-5 pt-4 pb-3 backdrop-blur-xl">
        <Link
          to="/plans"
          aria-label="Back to campaigns"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-card shadow-card"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.4} />
        </Link>
        <h1 className="truncate text-center text-base font-bold">
          {isOffer ? "Campaign offer" : "Campaign"}
        </h1>
        <div className="flex items-center gap-2">
          <button aria-label="Share campaign" onClick={() => setShared(true)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-card shadow-card"><Share2 className="h-5 w-5" strokeWidth={2.2} /></button>
          <button
            aria-label="Remind me about this campaign"
            onClick={() => setReminded(true)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-soft"
          >
            <Bell className="h-[1.1rem] w-[1.1rem] text-primary" strokeWidth={2.3} />
          </button>
        </div>
      </header>

      <main className="flex-1 px-5 pb-40">
        <div className="flex items-start gap-3.5">
          <IconBadge tone={campaign.tone} shape="squircle" size="lg">
            <BrandMark brand={campaign.brand} className="h-6 w-6" />
          </IconBadge>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-muted-foreground">{campaign.brand}</p>
            <h2 className="text-[1.75rem] leading-tight font-extrabold">{campaign.title}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
              <CalendarDays className="h-4 w-4" strokeWidth={2.3} />
              {campaign.window}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <UserRound className="h-4 w-4" strokeWidth={2.3} />
              {campaign.contact}
            </p>
          </div>
          <Pill tone={status.tone}>{status.label}</Pill>
        </div>

        {(shared || reminded) && (
          <div className="mt-5 rounded-3xl bg-primary-soft p-4">
            <p className="text-sm font-semibold text-primary">
              {reminded ? "Reminder set for the next deadline on this campaign." : "Sharing is coming soon — this will send a read-only campaign brief."}
            </p>
          </div>
        )}

        <div className="mt-5 rounded-3xl bg-surface px-4 py-3.5">
          <p className="text-sm leading-snug font-semibold">{campaign.brief}</p>
        </div>

        <SectionHeader className="mt-8 mb-3" title="Payment" />
        <Card className="p-0">
          <div className="divide-y divide-border/70">
            {[
              { label: "Gross fee", value: campaign.fee },
              { label: "Fees", value: campaign.fees },
              { label: "Net to you", value: campaign.net },
              { label: "Terms", value: campaign.terms },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-3.5">
                <span className="text-sm font-semibold text-muted-foreground">{row.label}</span>
                <span className={row.label === "Gross fee" || row.label === "Net to you" ? "text-right text-[0.9375rem] font-extrabold text-tint-green-foreground" : "text-right text-[0.9375rem] font-extrabold"}>{row.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <SectionHeader className="mt-8 mb-3" title="Deliverables" />
        <Card className="divide-y divide-border/70 p-0">
          {campaign.deliverables.map((d) => (
            <div key={d.id} className="flex items-start gap-4 px-4 py-4">
              <span className="w-14 shrink-0 pt-0.5 text-sm font-extrabold tabular-nums">{d.due}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.9375rem] leading-snug font-bold">{d.title}</span>
                <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><PlatformMark platform={d.platform} className="h-3.5 w-3.5" />{d.platform}</span>
              </span>
              <Pill tone={d.state === "Live" || d.state === "Approved" ? "green" : d.state === "Submitted" ? "amber" : d.state === "Drafted" ? "orange" : "neutral"}>
                {d.state}
              </Pill>
            </div>
          ))}
        </Card>

        <SectionHeader className="mt-8 mb-3" title="Content requirements" />
        <Card className="divide-y divide-border/70 p-0">
          {campaign.requirements.map((r) => (
            <div key={r.id} className="flex items-center gap-3.5 px-4 py-3.5">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={2.2} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.9375rem] font-semibold">{r.title}</span>
                <span className="block truncate text-xs text-muted-foreground">{r.meta}</span>
              </span>
            </div>
          ))}
        </Card>

        <SectionHeader className="mt-8 mb-3" title="Brief & documents" />
        <Card className="space-y-2.5 p-4">
          {campaign.files.map((f) => (
            <div key={f} className="flex items-center gap-3 rounded-2xl bg-surface px-3.5 py-2.5">
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2.2} />
              <span className="truncate text-[0.8125rem] font-semibold">{f}</span>
            </div>
          ))}
        </Card>

        <div className="mt-8 flex items-center gap-2 rounded-3xl bg-primary-soft px-4 py-3.5">
          <Sparkles className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.4} />
          <span className="text-sm font-semibold">{campaign.nudge}</span>
        </div>

      </main>

      <div className="fixed bottom-0 z-30 w-full max-w-[520px] border-t border-border/70 bg-background/95 px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
        {isOffer ? (
          <ActionPair
            secondary={
              <AButton variant="neutral" size="lg" onClick={() => declineOffer(campaign.id)}>Decline</AButton>
            }
            primary={<AButton size="lg" onClick={() => acceptOffer(campaign.id)}>Accept</AButton>}
          />
        ) : currentStatus === "declined" ? (
          <p className="rounded-2xl bg-surface px-4 py-3 text-center text-sm font-semibold text-muted-foreground">
            You declined this offer.
          </p>
        ) : activation ? (
          <AButton
            size="lg"
            className="w-full"
            onClick={() => navigate({ to: "/activation/$activationId", params: { activationId: activation.id } })}
          >
            Open activation
          </AButton>
        ) : currentStatus === "accepted" ? (
          <AButton
            size="lg"
            className="w-full"
            onClick={() => {
              const id = startActivation(campaign.id);
              if (id) navigate({ to: "/activation/$activationId", params: { activationId: id } });
            }}
          >
            Start activation
          </AButton>
        ) : (
          <Link to="/activations" className="block">
            <AButton variant="soft" size="lg" className="w-full">Open your activations</AButton>
          </Link>
        )}
      </div>
    </div>
  );
}

