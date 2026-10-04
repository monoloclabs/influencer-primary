import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Link2 } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, Card, Link } from "@/components/alfred/ui";
import { BrandMark, PlatformMark } from "@/components/influencer/Marks";
import { creator } from "@/data/influencer";

export const Route = createFileRoute("/a/media-kit")({
  head: () => ({
    meta: [
      { title: "Media kit and rates — INFLUENCER" },
      { name: "description", content: "Your audience, results and rate card, ready to share with brands." },
      { property: "og:title", content: "Media kit and rates — INFLUENCER" },
      { property: "og:description", content: "Audience, past results and pricing in one brand-ready kit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MediaKitScreen,
});

const stats = [
  { label: "Total reach", value: "340K" },
  { label: "Avg engagement", value: "4.8%" },
  { label: "Core audience", value: "24–34" },
];

const channels = [
  { platform: "Instagram", followers: "182K", engagement: "5.1%" },
  { platform: "TikTok", followers: "96K", engagement: "6.3%" },
  { platform: "YouTube", followers: "48K", engagement: "3.2%" },
  { platform: "Threads", followers: "14K", engagement: "2.4%" },
];

const rates = [
  { platform: "YouTube", item: "Dedicated video", price: "$7,500" },
  { platform: "Instagram", item: "Hero Reel · 60s", price: "$3,500" },
  { platform: "TikTok", item: "TikTok · 60s", price: "$2,200" },
  { platform: "Instagram", item: "Story set · 3 frames", price: "$1,200" },
];

const addOns = [
  { item: "30-day paid usage", price: "+30%" },
  { item: "Category exclusivity", price: "+40%" },
  { item: "Whitelisting access", price: "+$2,000" },
];

const results = [
  { brand: "Gymshark", result: "1.2M views · 6.8% engagement", value: "$8,500" },
  { brand: "Apple Music", result: "640K views · 4.1% engagement", value: "$9,800" },
  { brand: "Sephora", result: "410K views · 7.2% saves", value: "$6,400" },
];

function MediaKitScreen() {
  const [copied, setCopied] = useState(false);

  return (
    <AppShell title="Media kit and rates">
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
        <ArrowLeft className="h-4 w-4" strokeWidth={2.6} />
        Back
      </Link>

      <h2 className="mt-4 text-[1.75rem] leading-tight font-extrabold">Media kit and rates</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">How brands see you, and what you charge.</p>

      <Card className="mt-5 p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground">
            {creator.initials}
          </span>
          <div>
            <p className="text-[1.0625rem] font-extrabold">{creator.fullName}</p>
            <p className="text-xs text-muted-foreground">{creator.handle} · Fitness, music and lifestyle</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-surface p-3">
              <p className="text-[1.125rem] font-extrabold leading-none">{s.value}</p>
              <p className="mt-1 text-[0.6875rem] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </Card>

      <p className="eyebrow mt-7 mb-3 px-1 text-muted-foreground">Channels</p>
      <Card className="divide-y divide-border/70 p-0">
        {channels.map((c) => (
          <div key={c.platform} className="flex items-center gap-3 px-4 py-3.5">
            <PlatformMark platform={c.platform} className="h-4 w-4 text-foreground" />
            <span className="flex-1 text-sm font-bold">{c.platform}</span>
            <span className="text-sm font-bold">{c.followers}</span>
            <span className="w-14 text-right text-xs text-muted-foreground">{c.engagement}</span>
          </div>
        ))}
      </Card>

      <p className="eyebrow mt-7 mb-3 px-1 text-muted-foreground">Rate card</p>
      <Card className="divide-y divide-border/70 p-0">
        {rates.map((r) => (
          <div key={r.item} className="flex items-center gap-3 px-4 py-3.5">
            <PlatformMark platform={r.platform} className="h-4 w-4 text-foreground" />
            <span className="flex-1 text-sm font-semibold">{r.item}</span>
            <span className="text-sm font-extrabold">{r.price}</span>
          </div>
        ))}
      </Card>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {addOns.map((a) => (
          <span key={a.item} className="rounded-full bg-surface px-3 py-1.5 text-[0.75rem] font-semibold text-muted-foreground">
            {a.item} <span className="font-extrabold text-foreground">{a.price}</span>
          </span>
        ))}
      </div>

      <p className="eyebrow mt-7 mb-3 px-1 text-muted-foreground">Past results</p>
      <div className="space-y-2.5">
        {results.map((r) => (
          <Card key={r.brand} className="flex items-center gap-3.5 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface">
              <BrandMark brand={r.brand} className="h-[1.05rem] w-[1.05rem] text-foreground" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.9375rem] font-bold">{r.brand}</p>
              <p className="truncate text-xs text-muted-foreground">{r.result}</p>
            </div>
            <span className="text-sm font-extrabold">{r.value}</span>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        <AButton variant="neutral" size="lg" className="col-span-1 w-full">PDF</AButton>
        <AButton
          variant="primary"
          size="lg"
          className="col-span-2 w-full"
          onClick={() => setCopied(true)}
        >
          {copied ? <Check className="h-4 w-4" strokeWidth={2.6} /> : <Link2 className="h-4 w-4" strokeWidth={2.4} />}
          {copied ? "Link copied" : "Copy share link"}
        </AButton>
      </div>
    </AppShell>
  );
}
