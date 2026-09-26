import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, ChevronRight, Plus, Workflow } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, ActionPair, Card, IconBadge, Link, Pill } from "@/components/alfred/ui";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { BrandMark, PlatformMark } from "@/components/influencer/Marks";
import { useCampaignState } from "@/components/influencer/CampaignState";
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
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const { allActivations, campaignsReadyForActivation, startActivation } = useCampaignState();
  const eligible = campaignsReadyForActivation;

  return (
    <AppShell title="Activations">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[1.75rem] leading-tight font-extrabold">Creator execution</h2>
          <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
            Turn accepted campaign briefs into content, production dates and publishing steps.
          </p>
        </div>
        <AButton size="icon" aria-label="New activation" onClick={() => setCreating(true)}>
          <Plus className="h-5 w-5" strokeWidth={2.8} />
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

      <Sheet open={creating} onOpenChange={setCreating}>
        <SheetContent side="bottom" className="mx-auto max-w-[520px] rounded-t-4xl border-0 px-6 pt-3 pb-8 [&>button]:hidden">
          <div className="mx-auto h-1.5 w-12 rounded-full bg-border" />
          <IconBadge tone="blue" shape="round" size="lg" className="mx-auto mt-6">
            <Workflow className="h-6 w-6" strokeWidth={2.2} />
          </IconBadge>
          <h3 className="mt-4 text-center text-xl font-extrabold">New activation</h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">Choose an accepted campaign, then outline its production and publishing plan.</p>
          <label className="mt-6 block text-xs font-bold text-muted-foreground">Accepted campaign</label>
          <select value={selectedCampaign} onChange={(event) => setSelectedCampaign(event.target.value)} className="mt-2 h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm font-semibold">
            <option value="">{eligible.length ? "Select campaign" : "No accepted campaigns yet"}</option>
            {eligible.map((campaign) => <option key={campaign.id} value={campaign.id}>{campaign.brand} — {campaign.title}</option>)}
          </select>
          <p className="mt-2 text-xs text-muted-foreground">Only accepted campaigns can be activated. Accept an offer first.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-surface px-4 py-3"><p className="text-xs font-bold">Platforms</p><p className="mt-1 text-xs text-muted-foreground">Instagram · TikTok</p></div>
            <div className="rounded-2xl bg-surface px-4 py-3"><p className="text-xs font-bold">First post</p><p className="mt-1 text-xs text-muted-foreground">Choose date</p></div>
          </div>
          <div className="mt-3 rounded-2xl bg-surface px-4 py-3"><p className="text-xs font-bold">Content and notes</p><p className="mt-1 text-xs text-muted-foreground">Reels, Stories, drafts and production details</p></div>
          <ActionPair className="mt-6" secondary={<AButton variant="neutral" size="lg" onClick={() => setCreating(false)}>Cancel</AButton>} primary={<AButton size="lg" disabled={!selectedCampaign} onClick={() => { startActivation(selectedCampaign); setSelectedCampaign(""); setCreating(false); }}>Create activation</AButton>} />
        </SheetContent>
      </Sheet>
    </AppShell>
  );
}