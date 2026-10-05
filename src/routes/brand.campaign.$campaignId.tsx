import { createFileRoute, notFound } from "@tanstack/react-router";
import { ChevronLeft, Lock } from "lucide-react";
import { Link } from "@/components/alfred/ui";
import { BrandShell, brandMeta } from "@/components/brand/BrandShell";
import { PlatformMark } from "@/components/influencer/Marks";
import { brandCampaigns, brandStatusMeta, money } from "@/data/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/brand/campaign/$campaignId")({
  loader: ({ params }) => {
    const campaign = brandCampaigns.find((c) => c.id === params.campaignId);
    if (!campaign) throw notFound();
    return { campaign };
  },
  head: ({ loaderData }) =>
    loaderData
      ? brandMeta(`${loaderData.campaign.title}, Brand campaign`, loaderData.campaign.objective)
      : { meta: [{ title: "Campaign unavailable" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: () => (
    <BrandShell title="Not found">
      <p className="mt-10 text-center text-muted-foreground">This campaign doesn't exist.</p>
    </BrandShell>
  ),
  component: CampaignDetail,
});

function CampaignDetail() {
  const { campaign: c } = Route.useLoaderData();
  const pct = Math.round((c.spent / c.budget) * 100);

  return (
    <BrandShell title={c.title}>
      <Link to="/brand/campaigns" className="inline-flex items-center gap-1 pt-2 text-sm font-semibold text-muted-foreground">
        <ChevronLeft className="h-4 w-4" /> Campaigns
      </Link>
      <div className="mt-2 flex items-start justify-between gap-3">
        <h2 className="text-2xl font-extrabold tracking-tight">{c.title}</h2>
        <span className={cn("mt-1 shrink-0 rounded-full px-2.5 py-1 text-xs font-bold", brandStatusMeta[c.status].className)}>{brandStatusMeta[c.status].label}</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{c.objective}</p>

      <section className="mt-5 rounded-3xl bg-card p-4 shadow-card">
        <p className="text-xs font-bold text-muted-foreground uppercase">Matched creator</p>
        <p className="mt-1 text-lg font-extrabold">{c.creator.code}</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <Stat label="Tier" value={c.creator.tier} />
          <Stat label="Reach" value={c.creator.reach} />
          <Stat label="Engagement" value={c.creator.engagement} />
          <Stat label="Niche" value={c.creator.niche} />
        </div>
        {c.status !== "completed" && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground"><Lock className="h-3.5 w-3.5" /> Identity revealed once the deal is locked.</p>
        )}
      </section>

      <section className="mt-4 rounded-3xl bg-card p-4 shadow-card">
        <div className="flex justify-between text-sm">
          <span className="font-bold">Budget</span>
          <span><b>{money(c.spent)}</b> <span className="text-muted-foreground">of {money(c.budget)}</span></span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-surface"><div className="h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} /></div>
        <p className="mt-2 text-xs text-muted-foreground">{money(c.budget - c.spent)} held in escrow · {c.timeline}</p>
      </section>

      <section className="mt-4 rounded-3xl bg-card p-4 shadow-card">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">Deliverables</span>
          <span className="flex gap-2">{c.platforms.map((p) => <PlatformMark key={p} platform={p} className="h-4 w-4" />)}</span>
        </div>
        <div className="mt-2 divide-y divide-border">
          {c.deliverables.map((d) => (
            <div key={d.label} className="flex items-center justify-between py-3 text-sm">
              <div><p className="font-semibold">{d.label}</p><p className="text-xs text-muted-foreground">Due {d.due}</p></div>
              <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-semibold">{d.state}</span>
            </div>
          ))}
        </div>
      </section>
    </BrandShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}
