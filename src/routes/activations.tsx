import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, ChevronRight, Plus } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, Card, IconBadge, Link, Pill } from "@/components/alfred/ui";
import { BrandMark, PlatformMark } from "@/components/influencer/Marks";
import { useCampaignState } from "@/components/influencer/CampaignState";
import { ActivationSetup } from "@/components/influencer/ActivationSetup";
import { getCampaign } from "@/data/influencer";

export const Route = createFileRoute("/activations")({
  head: () => ({
    meta: [
      { title: "Activations — INFLUENCER" },
      { name: "description", content: "Plan and manage the content, channels, schedule and publishing work behind accepted campaigns." },
      { property: "og:title", content: "Activations — INFLUENCER" },
      { property: "og:description", content: "The creator execution workspace for accepted brand campaigns." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ActivationsScreen,
});

const activationStatus = {
  planning: { label: "Planning", tone: "violet" as const },
  producing: { label: "Producing", tone: "orange" as const },
  scheduled: { label: "Scheduled", tone: "blue" as const },
  live: { label: "Live", tone: "green" as const },
  complete: { label: "Complete", tone: "green" as const },
};

function ActivationsScreen() {
  const [creating, setCreating] = useState(false);
  const { allActivations } = useCampaignState();

  return (
    <AppShell title="Activations">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[1.75rem] leading-tight font-extrabold">Creator execution</h2>
          <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
            Turn accepted campaign briefs into content, production dates and publishing steps.
          </p>
        </div>
        <AButton size="sm" aria-label="New activation" onClick={() => setCreating(true)}>
          <Plus className="h-4 w-4" strokeWidth={2.6} /> New
        </AButton>
      </div>

      <div className="mt-6 space-y-3.5">
        {allActivations.map((activation) => {
          const campaign = getCampaign(activation.campaignId);
          if (!campaign) return null;
          const meta = activationStatus[activation.status];
          return (
            <Link key={activation.id} to={`/activation/${activation.id}`} className="block active:scale-[0.99]">
              <Card className="p-5">
                <div className="flex items-start gap-3.5">
                  <IconBadge tone={campaign.tone} shape="squircle" size="md">
                    <BrandMark brand={campaign.brand} />
                  </IconBadge>
                  <div className="min-w-0 flex-1">
                    <p className="eyebrow text-muted-foreground">{campaign.brand} · Activation</p>
                    <p className="mt-1 text-[1.0625rem] leading-snug font-extrabold">{activation.title}</p>
                  </div>
                  <Pill tone={meta.tone}>{meta.label}</Pill>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  {activation.platforms.map((platform) => (
                    <span key={platform} className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-2 text-xs font-bold">
                      <PlatformMark platform={platform} className="h-3.5 w-3.5" />
                      {platform}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-surface px-4 py-3">
                  <span className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    {activation.contentItems.length} content pieces · next {activation.contentItems[0]?.date}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <ActivationSetup open={creating} onOpenChange={setCreating} />
    </AppShell>
  );
}