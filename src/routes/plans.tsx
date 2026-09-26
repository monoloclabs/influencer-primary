import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Link } from "@/components/alfred/ui";
import { CalendarDays, CheckCircle2, FileText, Plus, Sparkles, UserRound } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, Card, IconBadge, Pill, SectionHeader } from "@/components/alfred/ui";
import { campaigns, statusMeta, type CampaignStatus } from "@/data/influencer";
import { cn } from "@/lib/utils";
import { BrandMark, PlatformMark, isDurationText, platformFromText } from "@/components/influencer/Marks";
import { useCampaignState } from "@/components/influencer/CampaignState";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "Campaigns — INFLUENCER" },
      {
        name: "description",
        content:
          "Every brand deal in one place: offers, active campaigns, deliverables, payment terms and completed history.",
      },
      { property: "og:title", content: "Campaigns — INFLUENCER" },
      {
        property: "og:description",
        content: "Brand deals with their deliverables, deadlines, fees and payment status.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CampaignsScreen,
});

const filters = [
  { id: "all", label: "All" },
  { id: "offers", label: "Offers" },
  { id: "active", label: "Active" },
  { id: "payment", label: "Payment" },
  { id: "completed", label: "Completed" },
] as const;

const groupOf = (s: CampaignStatus) => {
  if (s === "offer" || s === "pending_approval") return "offers";
  if (s === "accepted" || s === "active" || s === "awaiting_content" || s === "awaiting_brand_approval") return "active";
  if (s === "payment_pending") return "payment";
  return "completed";
};

function CampaignsScreen() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const { statusFor } = useCampaignState();
  const shown = campaigns.filter((c) => filter === "all" || groupOf(statusFor(c.id) ?? c.status) === filter);

  return (
    <AppShell title="Campaigns">
      <h2 className="text-[1.75rem] leading-tight font-extrabold">Your brand deals</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        A campaign holds the brief, deliverables, deadlines, fee and payment status in one place.
      </p>

      <div className="mt-5">
        <Link to="/activations" className="block">
          <AButton size="lg" className="w-full">
            <Plus className="h-4 w-4" strokeWidth={3} />
            Activations
          </AButton>
        </Link>
      </div>

      <div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 no-scrollbar">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-[0.8125rem] font-bold",
              filter === f.id ? "bg-foreground text-background" : "bg-surface text-muted-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <SectionHeader className="mt-7 mb-3" title={`${shown.length} campaigns`} />
      <div className="space-y-3.5">
        {shown.map((c) => {
          const currentStatus = statusFor(c.id) ?? c.status;
          return (
          <Card key={c.id} className="p-5">
            <div className="flex items-start gap-3.5">
              <IconBadge tone={c.tone} shape="squircle" size="lg">
                <BrandMark brand={c.brand} className="h-6 w-6" />
              </IconBadge>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-muted-foreground">{c.brand}</p>
                <p className="text-[1.125rem] leading-snug font-extrabold">{c.title}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" strokeWidth={2.4} />
                  {c.window}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <UserRound className="h-3.5 w-3.5" strokeWidth={2.4} />
                  {c.contact}
                </p>
              </div>
              <Pill tone={statusMeta[currentStatus].tone}>{statusMeta[currentStatus].label}</Pill>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-surface px-4 py-3">
              <span className="text-xs font-semibold text-muted-foreground">Gross fee</span>
              <span className="text-[1.0625rem] font-extrabold tabular-nums text-tint-green-foreground">{c.fee}</span>
            </div>

            <ul className="mt-3 space-y-2">
              {c.summary.map((part) => {
                const platform = platformFromText(part);
                return (
                <li key={part} className="flex items-center gap-2.5 rounded-2xl bg-surface px-3.5 py-2.5">
                  {platform ? <PlatformMark platform={platform} className="h-4 w-4 text-muted-foreground" /> : isDurationText(part) ? <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2.2} /> : <CheckCircle2 className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2.2} />}
                  <span className="truncate text-[0.8125rem] font-semibold">{part}</span>
                </li>
              )})}
            </ul>

            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-primary-soft px-3.5 py-3">
              <Sparkles className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.4} />
              <span className="text-xs font-semibold">{c.nudge}</span>
            </div>

            <div className="mt-3 flex items-center gap-4 px-1 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" strokeWidth={2.4} />
                Brief & contract
              </span>
              <span className="text-tint-blue-foreground">Net {c.net}</span>
            </div>

            <Link to={`/plan/${c.id}`} className="mt-4 block">
              <AButton variant="soft" size="md" className="w-full">{currentStatus === "offer" ? "Review offer" : "Open campaign"}</AButton>
            </Link>

          </Card>
        )})}
      </div>

      <div className="mt-8 rounded-4xl bg-tint-blue p-5">
        <p className="eyebrow text-tint-blue-foreground">Offers vs campaigns</p>
        <p className="mt-2 text-[0.9375rem] leading-snug font-semibold">
          An offer is a proposal. It only becomes a campaign once you accept it — that decision lives
          in Approvals.
        </p>
        <Link to="/messages" className="mt-4 block">
          <AButton variant="secondary" size="md" className="w-full">
            Review your offers
          </AButton>
        </Link>
      </div>
    </AppShell>
  );
}
