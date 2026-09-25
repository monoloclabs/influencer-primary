import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/alfred/ui";
import { FileCheck2, FileSignature, Handshake, ScissorsLineDashed, Sparkles } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, ActionPair, Card, IconBadge, Pill } from "@/components/alfred/ui";
import { approvalQueue, type ApprovalKind } from "@/data/influencer";
import { BrandMark } from "@/components/influencer/Marks";
import { useCampaignState } from "@/components/influencer/CampaignState";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Approvals — INFLUENCER" },
      {
        name: "description",
        content:
          "Every commercial decision waiting on you: new campaign offers, contract terms and content revision requests.",
      },
      { property: "og:title", content: "Approvals — INFLUENCER" },
      {
        property: "og:description",
        content: "Accept or decline brand offers, contract changes and content revisions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ApprovalsScreen,
});

const kindMeta: Record<ApprovalKind, { label: string; icon: typeof Handshake }> = {
  brand_offer: { label: "Campaign offer", icon: Handshake },
  contract_terms: { label: "Contract terms", icon: FileSignature },
  content_revision: { label: "Content revision", icon: ScissorsLineDashed },
};

function ApprovalsScreen() {
  const { statusFor, acceptOffer } = useCampaignState();
  const pending = approvalQueue.filter((a) => a.kind !== "brand_offer" || (a.campaignId && statusFor(a.campaignId) === "offer"));

  return (
    <AppShell title="Approvals">
      <h2 className="text-[1.75rem] leading-tight font-extrabold">Decisions</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        Brands don't message you here. They send decisions — you accept or decline.
      </p>

      <div className="mt-5 flex items-center gap-3 rounded-full bg-surface px-4 py-3.5">
        <FileCheck2 className="h-[1.1rem] w-[1.1rem] text-muted-foreground" strokeWidth={2.2} />
        <span className="text-sm font-semibold text-muted-foreground">
          {pending.length} waiting on you
        </span>
      </div>

      <div className="mt-4 rounded-4xl bg-primary-soft p-5">
        <div className="flex items-center gap-3">
          <IconBadge tone="orange" shape="round" size="sm" className="bg-background">
            <Sparkles className="h-4 w-4" strokeWidth={2.3} />
          </IconBadge>
          <p className="eyebrow text-primary">Worth knowing</p>
        </div>
        <p className="mt-3 text-[0.9375rem] leading-snug font-bold">
          The Spotify offer expires in 3 days and is 41% above your average December rate.
        </p>
        <Link to="/plan/c2" className="mt-4 block">
          <AButton size="sm" className="w-full">See the offer</AButton>
        </Link>
      </div>

      <p className="eyebrow mt-8 mb-3 px-1 text-muted-foreground">Everything awaiting a decision</p>
      <div className="space-y-2.5">
        {pending.map((a) => {
          const meta = kindMeta[a.kind];
          const Icon = meta.icon;
          return (
            <Card key={a.id} className="p-4">
              <div className="flex items-start gap-3.5">
                <IconBadge tone={a.tone} shape="round" size="md">
                  {a.kind === "brand_offer" ? <BrandMark brand={a.brand} /> : <Icon className="h-5 w-5" strokeWidth={2.2} />}
                </IconBadge>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.6875rem] font-bold text-muted-foreground uppercase">
                    {meta.label} · {a.brand}
                  </p>
                  <p className="text-[0.9375rem] leading-snug font-bold">{a.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.meta}</p>
                </div>
                <Pill tone="neutral">{a.value}</Pill>
              </div>

              {a.kind === "brand_offer" && a.campaignId ? (
                <ActionPair
                  className="mt-3.5"
                  secondary={
                    <Link to={`/plan/${a.campaignId}`} className="block"><AButton size="md" variant="neutral" className="w-full">Open</AButton></Link>
                  }
                  primary={
                    <AButton size="md" onClick={() => acceptOffer(a.campaignId ?? "")}>
                      Accept
                    </AButton>
                  }
                />
              ) : (
                <ActionPair className="mt-3.5" secondary={<AButton size="md" variant="neutral">Decline</AButton>} primary={a.campaignId ? <Link to={`/plan/${a.campaignId}`} className="block"><AButton size="md" className="w-full">Open</AButton></Link> : <AButton size="md">Accept</AButton>} />
              )}
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
