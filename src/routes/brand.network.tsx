import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ChevronDown, Ban, Star } from "lucide-react";
import { Card, Link, Pill } from "@/components/alfred/ui";
import { BrandShell, brandMeta } from "@/components/brand/BrandShell";
import { PlatformMark } from "@/components/influencer/Marks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/brand/network")({
  head: () => brandMeta("Creator network, Brand workspace | INFLUENCER", "Every creator your brand works with: reach, rates and the full project history."),
  component: CreatorNetworkScreen,
});

type Status = "Past" | "Ongoing" | "Pending approval";
type Creator = {
  handle: string;
  name: string;
  niche: string;
  status: Status;
  reach: string;
  engagement: string;
  audience: string;
  channels: { platform: string; followers: string; engagement: string }[];
  rates: { item: string; price: string }[];
  history: { date: string; title: string; amount: string; state: string }[];
};

const creators: Creator[] = [
  {
    handle: "@tolacreates", name: "Tola Adeyemi", niche: "Fitness and lifestyle", status: "Ongoing",
    reach: "1.24M", engagement: "5.8%", audience: "Women 18 to 34 · Lagos, London, Houston",
    channels: [{ platform: "Instagram", followers: "612K", engagement: "6.1%" }, { platform: "TikTok", followers: "488K", engagement: "7.4%" }, { platform: "YouTube", followers: "140K", engagement: "3.2%" }],
    rates: [{ item: "Instagram Reel", price: "$3,200" }, { item: "TikTok video", price: "$2,600" }, { item: "YouTube integration", price: "$5,500" }],
    history: [{ date: "Oct 2026", title: "Summer Lift Series", amount: "$12,500", state: "Live" }, { date: "Jun 2026", title: "Training Kit Drop", amount: "$6,800", state: "Paid" }],
  },
  {
    handle: "@amaramoves", name: "Amara Okafor", niche: "Running and recovery", status: "Pending approval",
    reach: "420K", engagement: "6.9%", audience: "Adults 22 to 40 · UK, Nigeria",
    channels: [{ platform: "Instagram", followers: "260K", engagement: "7.2%" }, { platform: "TikTok", followers: "160K", engagement: "6.4%" }],
    rates: [{ item: "Instagram Reel", price: "$1,800" }, { item: "Story set", price: "$700" }],
    history: [{ date: "Oct 2026", title: "Recovery Range Teaser", amount: "$4,200", state: "Awaiting approval" }],
  },
  {
    handle: "@kofilifts", name: "Kofi Mensah", niche: "Strength training", status: "Past",
    reach: "880K", engagement: "4.6%", audience: "Men 18 to 30 · Ghana, US",
    channels: [{ platform: "YouTube", followers: "520K", engagement: "4.1%" }, { platform: "Instagram", followers: "360K", engagement: "5.0%" }],
    rates: [{ item: "YouTube integration", price: "$4,800" }, { item: "Instagram Reel", price: "$2,200" }],
    history: [{ date: "Mar 2026", title: "Spring Strength Push", amount: "$7,400", state: "Paid" }, { date: "Nov 2025", title: "Black Friday Haul", amount: "$3,900", state: "Paid" }],
  },
];

const filters = ["All", "Past", "Ongoing", "Pending approval"] as const;
const tone = { Past: "green", Ongoing: "orange", "Pending approval": "violet" } as const;

function CreatorNetworkScreen() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [open, setOpen] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [blocked, setBlocked] = useState<Set<string>>(new Set());
  const toggle = (set: Set<string>, setter: (s: Set<string>) => void, key: string) => {
    const next = new Set(set);
    if (next.has(key)) next.delete(key); else next.add(key);
    setter(next);
  };
  const visible = creators.filter((c) => filter === "All" || c.status === filter);

  return (
    <BrandShell title="Creator network">
      <Link to="/brand" className="inline-flex items-center gap-1.5 pt-2 text-sm font-bold text-muted-foreground">
        <ArrowLeft className="h-4 w-4" strokeWidth={2.6} />
        Back
      </Link>
      <h2 className="mt-4 text-[1.75rem] leading-tight font-extrabold">Creator network</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">Every creator you work with, with the full history behind each relationship.</p>

      <div className="mt-6 grid grid-cols-2 gap-2.5">
        <Card className="p-4">
          <p className="text-2xl font-extrabold">{creators.filter((c) => c.status === "Ongoing").length}</p>
          <p className="mt-0.5 text-xs font-semibold text-muted-foreground">Live relationships</p>
        </Card>
        <Card className="p-4">
          <p className="text-2xl font-extrabold">$34,800</p>
          <p className="mt-0.5 text-xs font-semibold text-muted-foreground">Total spend</p>
        </Card>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={cn("h-9 shrink-0 rounded-full px-4 text-[0.8125rem] font-semibold", filter === f ? "bg-foreground text-background" : "bg-surface text-muted-foreground")}>{f}</button>
        ))}
      </div>

      <div className="mt-4 space-y-2.5">
        {visible.map((c) => {
          const isOpen = open === c.handle;
          const fav = favorites.has(c.handle);
          const bl = blocked.has(c.handle);
          return (
            <Card key={c.handle} className={cn("overflow-hidden", bl && "opacity-60")}>
              <button onClick={() => setOpen(isOpen ? null : c.handle)} className="flex w-full items-center gap-3.5 p-4 text-left">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-surface text-sm font-extrabold">{c.name.split(" ").map((n) => n[0]).join("")}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 truncate text-[0.9375rem] font-bold">{c.handle}{fav && <Star className="h-3.5 w-3.5 fill-primary text-primary" />}</span>
                  <span className="block truncate text-xs text-muted-foreground">{c.niche} · {c.reach} reach</span>
                </span>
                <Pill tone={bl ? "neutral" : tone[c.status]}>{bl ? "Blacklisted" : c.status}</Pill>
                <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
              </button>

              {isOpen && (
                <div className="border-t border-border/70 p-4">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="rounded-2xl bg-surface p-3"><p className="text-lg font-extrabold">{c.reach}</p><p className="text-xs text-muted-foreground">Total reach</p></div>
                    <div className="rounded-2xl bg-surface p-3"><p className="text-lg font-extrabold">{c.engagement}</p><p className="text-xs text-muted-foreground">Avg engagement</p></div>
                  </div>
                  <p className="eyebrow mt-5 mb-2 text-muted-foreground">Core audience</p>
                  <p className="text-sm font-semibold">{c.audience}</p>

                  <p className="eyebrow mt-5 mb-2 text-muted-foreground">Channels</p>
                  <div className="space-y-2">
                    {c.channels.map((ch) => (
                      <div key={ch.platform} className="flex items-center gap-3 rounded-2xl bg-surface px-3 py-2.5">
                        <PlatformMark platform={ch.platform} className="h-4 w-4 text-foreground" />
                        <span className="flex-1 text-sm font-semibold">{ch.platform}</span>
                        <span className="text-sm font-bold">{ch.followers}</span>
                        <span className="w-12 text-right text-xs text-muted-foreground">{ch.engagement}</span>
                      </div>
                    ))}
                  </div>

                  <p className="eyebrow mt-5 mb-2 text-muted-foreground">Rate card</p>
                  <div className="divide-y divide-border/70 rounded-2xl bg-surface px-3">
                    {c.rates.map((r) => (
                      <div key={r.item} className="flex justify-between py-2.5 text-sm"><span>{r.item}</span><span className="font-bold">{r.price}</span></div>
                    ))}
                  </div>

                  <p className="eyebrow mt-5 mb-2 text-muted-foreground">Projects with you</p>
                  <ol className="space-y-2.5 border-l-2 border-border pl-4">
                    {c.history.map((h) => (
                      <li key={h.title}>
                        <p className="text-xs text-muted-foreground">{h.date} · {h.state}</p>
                        <p className="text-sm font-bold">{h.title} <span className="font-semibold text-muted-foreground">· {h.amount}</span></p>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    <button onClick={() => toggle(favorites, setFavorites, c.handle)} className={cn("flex h-11 items-center justify-center gap-1.5 rounded-full text-sm font-bold", fav ? "bg-primary text-primary-foreground" : "bg-surface text-foreground")}>
                      <Star className={cn("h-4 w-4", fav && "fill-current")} />{fav ? "Favorited" : "Favorite"}
                    </button>
                    <button onClick={() => toggle(blocked, setBlocked, c.handle)} className="flex h-11 items-center justify-center gap-1.5 rounded-full bg-destructive/10 text-sm font-bold text-destructive">
                      <Ban className="h-4 w-4" />{bl ? "Unblock" : "Blacklist"}
                    </button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </BrandShell>
  );
}
