import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, Card, Link, Pill } from "@/components/alfred/ui";
import { BrandMark } from "@/components/influencer/Marks";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/a/files")({
  head: () => ({
    meta: [
      { title: "Contracts and briefs | INFLUENCER" },
      {
        name: "description",
        content: "Signed contracts, creative briefs, usage terms and invoices for every brand deal.",
      },
      { property: "og:title", content: "Contracts and briefs | INFLUENCER" },
      { property: "og:description", content: "Deal terms, usage rights and briefs kept in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContractsScreen,
});

type Category = "Contracts" | "Briefs" | "Usage" | "Invoices";

type Doc = {
  id: string;
  brand: string;
  title: string;
  category: Category;
  format: string;
  signed: string;
  campaignId?: string;
  terms: { label: string; value: string }[];
  scope: string;
};

const docs: Doc[] = [
  {
    id: "f1",
    brand: "Gymshark",
    title: "Autumn Athlete Series, signed contract",
    category: "Contracts",
    format: "PDF · 1.4 MB",
    signed: "Signed 8 October",
    campaignId: "c1",
    terms: [
      { label: "Fee", value: "$8,500" },
      { label: "Payment", value: "50% on signature · 50% Net 15" },
      { label: "Exclusivity", value: "No competing sportswear · 45 days" },
      { label: "Usage", value: "30-day paid amplification" },
    ],
    scope: "1 Reel (60s), 3 Stories and 1 TikTok, delivered between 12 and 26 October with drafts submitted 48 hours before posting.",
  },
  {
    id: "f2",
    brand: "Gymshark",
    title: "Campaign brief, training-led storytelling",
    category: "Briefs",
    format: "PDF · 820 KB",
    signed: "Received 2 October",
    campaignId: "c1",
    terms: [
      { label: "Tone", value: "Real sweat, no studio gloss" },
      { label: "Product", value: "In frame within 3 seconds" },
      { label: "Tags", value: "@gymshark · #GymsharkAthlete" },
    ],
    scope: "Creative direction, reference frames and the shot list the brand expects across all three deliverables.",
  },
  {
    id: "f3",
    brand: "Gymshark",
    title: "Usage extension, 30 extra paid days",
    category: "Usage",
    format: "PDF · 310 KB",
    signed: "Awaiting your decision",
    campaignId: "c1",
    terms: [
      { label: "Added fee", value: "+$1,750" },
      { label: "New window", value: "60 paid days total" },
      { label: "Channels", value: "Meta and TikTok ads" },
    ],
    scope: "An amendment to the signed contract extending paid usage of the Autumn Athlete content by 30 days.",
  },
  {
    id: "f4",
    brand: "Spotify",
    title: "Wrapped Creator Push, offer terms",
    category: "Contracts",
    format: "PDF · 640 KB",
    signed: "Unsigned · expires in 3 days",
    campaignId: "c2",
    terms: [
      { label: "Fee", value: "$12,000" },
      { label: "Payment", value: "Net 30 after final approval" },
      { label: "Usage", value: "90 days organic and paid" },
      { label: "Whitelisting", value: "Optional · +$2,000" },
    ],
    scope: "2 Reels and 1 YouTube integration across December, music-first with no scripted product claims.",
  },
  {
    id: "f5",
    brand: "Notion",
    title: "Invoice INV-0241",
    category: "Invoices",
    format: "PDF · 180 KB",
    signed: "Submitted 20 September",
    campaignId: "c3",
    terms: [
      { label: "Amount", value: "$5,200" },
      { label: "Net of fees", value: "$4,680" },
      { label: "Terms", value: "Net 15 · releases 26 September" },
    ],
    scope: "Invoice for the Creator Workspace Tour, covering 1 YouTube video and 2 Stories.",
  },
  {
    id: "f6",
    brand: "Sephora",
    title: "Holiday Glow Edit, final contract",
    category: "Contracts",
    format: "PDF · 1.1 MB",
    signed: "Completed 29 August",
    campaignId: "c4",
    terms: [
      { label: "Fee", value: "$6,400" },
      { label: "Status", value: "Paid in full" },
      { label: "Usage", value: "60 days organic" },
    ],
    scope: "2 Reels and 4 Stories, delivered August and paid in full with the performance report shared.",
  },
  {
    id: "f7",
    brand: "Apple Music",
    title: "Summer Sessions, usage and archive terms",
    category: "Usage",
    format: "PDF · 460 KB",
    signed: "Signed 3 July",
    campaignId: "c5",
    terms: [
      { label: "Usage", value: "6 months all channels" },
      { label: "Raw files", value: "Delivered for brand archive" },
      { label: "Payment", value: "Net 30 · invoice raised" },
    ],
    scope: "Usage grant for the Summer Sessions film and three Reel cutdowns, including the raw footage archive clause.",
  },
];

const filters: (Category | "All")[] = ["All", "Contracts", "Briefs", "Usage", "Invoices"];

const categoryTone: Record<Category, "blue" | "violet" | "amber" | "green"> = {
  Contracts: "blue",
  Briefs: "violet",
  Usage: "amber",
  Invoices: "green",
};

function ContractsScreen() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? docs : docs.filter((d) => d.category === filter)),
    [filter],
  );
  const selected = docs.find((d) => d.id === openId) ?? null;

  return (
    <AppShell title="Contracts and briefs" className="bg-home-lime">
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
        <ArrowLeft className="h-4 w-4" strokeWidth={2.6} />
        Back
      </Link>

      <h2 className="mt-4 text-[1.75rem] leading-tight font-extrabold">Contracts and briefs</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        Deal terms, usage rights and briefs for every brand you work with.
      </p>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "inline-flex h-9 shrink-0 items-center rounded-full px-4 text-[0.8125rem] font-semibold",
              filter === f ? "bg-foreground text-background" : "bg-surface text-muted-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-2.5">
        {visible.map((d) => (
          <Card key={d.id} className="p-4">
            <button onClick={() => setOpenId(d.id)} className="flex w-full items-start gap-3.5 text-left">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface">
                <BrandMark brand={d.brand} className="h-[1.05rem] w-[1.05rem] text-foreground" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="truncate text-xs font-bold">{d.brand}</span>
                  <Pill tone={categoryTone[d.category]}>{d.category}</Pill>
                </span>
                <span className="mt-1 block truncate text-[0.9375rem] font-bold">{d.title}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {d.format} · {d.signed}
                </span>
              </span>
            </button>
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border/70 pt-3">
              {d.terms.slice(0, 2).map((t) => (
                <span key={t.label} className="rounded-full bg-surface px-3 py-1 text-[0.6875rem] font-semibold text-muted-foreground">
                  {t.label}: {t.value}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Sheet open={!!selected} onOpenChange={(open) => { if (!open) setOpenId(null); }}>
        <SheetContent hideClose side="bottom" className="mx-auto max-w-[520px] rounded-t-4xl border-0 px-6 pt-6 pb-8">
          {selected && (
            <div>
              <div className="flex items-center gap-2">
                <BrandMark brand={selected.brand} className="h-4 w-4 text-foreground" />
                <p className="text-xs font-bold">{selected.brand}</p>
                <Pill tone={categoryTone[selected.category]}>{selected.category}</Pill>
              </div>
              <p className="mt-2 text-[1.0625rem] font-extrabold leading-snug">{selected.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {selected.format} · {selected.signed}
              </p>

              <p className="mt-4 text-sm text-muted-foreground">{selected.scope}</p>

              <div className="mt-5 divide-y divide-border/70 rounded-3xl bg-surface px-4">
                {selected.terms.map((t) => (
                  <div key={t.label} className="flex items-center justify-between gap-4 py-3">
                    <span className="text-xs text-muted-foreground">{t.label}</span>
                    <span className="text-right text-[0.8125rem] font-bold">{t.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2.5">
                <AButton variant="primary" size="lg" className="w-full">
                  <Download className="h-4 w-4" strokeWidth={2.4} />
                  Download document
                </AButton>
                {selected.campaignId && (
                  <Link to={`/plan/${selected.campaignId}`} onClick={() => setOpenId(null)} className="block">
                    <AButton variant="neutral" size="lg" className="w-full">
                      <FileText className="h-4 w-4" strokeWidth={2.4} />
                      View related campaign
                    </AButton>
                  </Link>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </AppShell>
  );
}
