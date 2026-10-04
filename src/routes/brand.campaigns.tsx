import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Link } from "@/components/alfred/ui";
import { AnonCreator, BrandShell, brandMeta } from "@/components/brand/BrandShell";
import { PlatformMark } from "@/components/influencer/Marks";
import { brandCampaigns, brandStatusMeta, money, type BrandCampaignStatus } from "@/data/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/brand/campaigns")({
  head: () => brandMeta("Brand campaigns — INFLUENCER", "Your matched, active and completed creator campaigns."),
  component: BrandCampaigns,
});

const filters: ("all" | BrandCampaignStatus)[] = ["all", "matched", "active", "completed"];

function BrandCampaigns() {
  const [f, setF] = useState<(typeof filters)[number]>("all");
  const list = brandCampaigns.filter((c) => f === "all" || c.status === f);

  return (
    <BrandShell title="Campaigns">
      <h2 className="pt-2 text-2xl font-extrabold tracking-tight">Campaigns</h2>
      <div className="mt-4 flex gap-2 overflow-x-auto">
        {filters.map((x) => (
          <button key={x} onClick={() => setF(x)} className={cn("h-9 shrink-0 rounded-full px-4 text-sm font-semibold capitalize", f === x ? "bg-foreground text-background" : "bg-surface")}>
            {x}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3">
        {list.map((c) => (
          <Link key={c.id} to={`/brand/campaign/${c.id}`} className="block rounded-3xl bg-card p-4 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold">{c.title}</h3>
              <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-bold", brandStatusMeta[c.status].className)}>{brandStatusMeta[c.status].label}</span>
            </div>
            <div className="mt-2"><AnonCreator code={c.creator.code} tier={c.creator.tier} reach={c.creator.reach} /></div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                {c.platforms.map((p) => <PlatformMark key={p} platform={p} className="h-4 w-4" />)}
              </span>
              <span className="font-semibold">{money(c.spent)} <span className="text-muted-foreground">/ {money(c.budget)}</span></span>
            </div>
            <span className="mt-3 flex h-10 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">Open campaign</span>
          </Link>
        ))}
      </div>
    </BrandShell>
  );
}
