import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, Card, Link, Pill } from "@/components/alfred/ui";
import { BrandMark } from "@/components/influencer/Marks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/a/clique")({
  head: () => ({
    meta: [
      { title: "Brand network — INFLUENCER" },
      { name: "description", content: "Every brand you work with: partnerships, payouts and the full relationship history." },
      { property: "og:title", content: "Brand network — INFLUENCER" },
      { property: "og:description", content: "Your 360° relationship record with each brand partner." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BrandNetworkScreen,
});

type Brand = {
  name: string;
  state: string;
  tone: "orange" | "blue" | "green" | "neutral";
  contact: string;
  projects: number;
  lifetime: string;
  campaignId?: string;
  history: { label: string; when: string; detail: string }[];
};

const brands: Brand[] = [
  {
    name: "Gymshark",
    state: "Anchor partner",
    tone: "orange",
    contact: "Marcus Vance · Partnerships",
    projects: 2,
    lifetime: "$18,500",
    campaignId: "c1",
    history: [
      { label: "In production", when: "Now", detail: "Reel and Threads set, content under review" },
      { label: "Contract change", when: "Sep", detail: "Usage window extended by 30 days" },
      { label: "Paid", when: "Jul", detail: "$4,250 received for the signature drop" },
    ],
  },
  {
    name: "Spotify",
    state: "Offer pending",
    tone: "blue",
    contact: "Elena Rostova · Creator marketing",
    projects: 1,
    lifetime: "$12,000",
    campaignId: "c2",
    history: [
      { label: "Offer received", when: "This week", detail: "$12,000 across 3 deliverables, expires in 3 days" },
      { label: "Pitch sent", when: "Aug", detail: "Playlist takeover concept shared" },
    ],
  },
  {
    name: "Notion",
    state: "Payment processing",
    tone: "green",
    contact: "David K. · Brand lead",
    projects: 2,
    lifetime: "$4,680",
    campaignId: "c3",
    history: [
      { label: "Delivered", when: "Sep", detail: "Walkthrough video and template kit approved" },
      { label: "Invoice sent", when: "Sep", detail: "$4,680 awaiting payout" },
    ],
  },
  {
    name: "Apple Music",
    state: "Payment processing",
    tone: "green",
    contact: "Amara Okafor · Artist services",
    projects: 1,
    lifetime: "$8,820",
    campaignId: "c5",
    history: [
      { label: "Delivered", when: "Sep", detail: "Launch event coverage completed" },
      { label: "Invoice sent", when: "Sep", detail: "$8,820 awaiting payout" },
    ],
  },
  {
    name: "Sephora",
    state: "Finished",
    tone: "neutral",
    contact: "Archived relationship",
    projects: 1,
    lifetime: "$5,760",
    history: [
      { label: "Paid and closed", when: "Jun", detail: "$5,760 received, $640 agency fee deducted" },
      { label: "Travel campaign", when: "May", detail: "Abuja shoot, 4 deliverables" },
    ],
  },
];

function BrandNetworkScreen() {
  const [open, setOpen] = useState<string | null>("Gymshark");
  const active = brands.filter((b) => b.state !== "Finished").length;

  return (
    <AppShell title="Brand network">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
        <ArrowLeft className="h-4 w-4" strokeWidth={2.6} />
        Back
      </Link>

      <h2 className="mt-4 text-[1.75rem] leading-tight font-extrabold">Brand network</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        Every brand you work with, with the full history behind each relationship.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2.5">
        <Card className="p-4">
          <p className="text-2xl font-extrabold">{active}</p>
          <p className="mt-0.5 text-xs font-semibold text-muted-foreground">Live relationships</p>
        </Card>
        <Card className="p-4">
          <p className="text-2xl font-extrabold">$49,760</p>
          <p className="mt-0.5 text-xs font-semibold text-muted-foreground">Lifetime earned</p>
        </Card>
      </div>

      <p className="eyebrow mt-8 mb-3 px-1 text-muted-foreground">Partners</p>
      <div className="space-y-2.5">
        {brands.map((b) => {
          const isOpen = open === b.name;
          return (
            <Card key={b.name} className="p-4">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : b.name)}
                className="flex w-full items-center gap-3.5 text-left"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface">
                  <BrandMark brand={b.name} className="h-5 w-5 text-foreground" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.9375rem] font-bold">{b.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {b.projects} {b.projects === 1 ? "project" : "projects"} · {b.lifetime} earned
                  </span>
                </span>
                <Pill tone={b.tone}>{b.state}</Pill>
                <ChevronDown
                  className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")}
                  strokeWidth={2.6}
                />
              </button>

              {isOpen && (
                <div className="mt-4 border-t border-border pt-4">
                  <p className="text-xs font-semibold text-muted-foreground">{b.contact}</p>
                  <div className="mt-3.5 space-y-3.5">
                    {b.history.map((h) => (
                      <div key={h.label + h.when} className="flex gap-3">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <div className="min-w-0">
                          <p className="text-[0.8125rem] font-bold">
                            {h.label} <span className="font-semibold text-muted-foreground">· {h.when}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{h.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {b.campaignId && (
                    <Link to={`/plan/${b.campaignId}`} className="mt-4 block">
                      <AButton variant="neutral" size="md" className="w-full">
                        Open campaign
                      </AButton>
                    </Link>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
