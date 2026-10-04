import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/alfred/ui";
import {
  ArrowRight,
  Briefcase,
  ChevronRight,
  Clock4,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, ActionPair, Card, IconBadge, Pill, SectionHeader } from "@/components/alfred/ui";
import {
  approvalQueue,
  campaignEvents,
  creator,
  dashboardStats,
  heroCampaign,
  statusMeta,
  upcomingDeliverables,
} from "@/data/influencer";
import { BrandMark, BrandPlatformRow } from "@/components/influencer/Marks";
import { useCampaignState } from "@/components/influencer/CampaignState";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "INFLUENCER — Your creator business, in one place" },
      {
        name: "description",
        content:
          "Track brand campaigns, deliverables, approvals and earnings from one creator command centre.",
      },
      { property: "og:title", content: "INFLUENCER — Your creator business, in one place" },
      {
        property: "og:description",
        content: "Brand deals, deliverables, decisions and payouts in one calm mobile dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardScreen,
});

const statIcons = { wallet: Wallet, briefcase: Briefcase, shield: ShieldCheck, clock: Clock4 };

function DashboardScreen() {
  const { statusFor, acceptOffer } = useCampaignState();
  const hero = heroCampaign;

  return (
    <AppShell title="Dashboard">
      <p className="eyebrow text-primary">Friday · 25 September</p>
      <h2 className="mt-1.5 text-[2rem] leading-[1.1] font-extrabold">Good afternoon, {creator.name}</h2>
      <p className="mt-2 text-[0.9375rem] text-muted-foreground">
        One draft due this week, three decisions waiting, and $13,500 on its way to you.
      </p>

      {/* Hero campaign */}
      <div className="mt-6 rounded-4xl bg-tint-blue p-5">
        <div className="flex items-start gap-3.5">
          <IconBadge tone="blue" shape="round" size="md" className="bg-background">
            <BrandMark brand={hero.brand} className="h-5 w-5 text-foreground" />
          </IconBadge>
          <div className="min-w-0 flex-1">
            <p className="eyebrow text-tint-blue-foreground">Up next · {hero.brand}</p>
            <p className="mt-1 text-[1.0625rem] leading-snug font-bold">{hero.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {hero.fee} · {hero.window}
            </p>
          </div>
          <Pill tone={statusMeta[hero.status].tone}>{statusMeta[hero.status].label}</Pill>
        </div>
        <p className="mt-3 text-sm font-semibold">{hero.nudge}</p>
        <ActionPair
          className="mt-4"
          secondary={
            <AButton variant="neutral" size="lg" className="bg-background">
              Remind me
            </AButton>
          }
          primary={
            <Link to={`/plan/${hero.id}`} className="block">
              <AButton size="lg" className="w-full">
                View campaign
                <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
              </AButton>
            </Link>
          }
        />
      </div>

      {/* Economic snapshot */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {dashboardStats.map((s) => {
          const Icon = statIcons[s.icon as keyof typeof statIcons];
          return (
            <Link key={s.label} to={s.to} className="active:scale-[0.98]">
              <Card className="h-full p-4">
                <div className="flex items-center gap-2">
                  <IconBadge tone={s.tone} size="sm">
                    <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={2.3} />
                  </IconBadge>
                  <p className="min-w-0 flex-1 truncate text-sm font-bold">{s.label}</p>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50" strokeWidth={2.4} />
                </div>
                <p className={cn("mt-3 text-2xl font-extrabold", s.positive && "text-tint-green-foreground")}>{s.value}</p>
                <p className={cn("mt-0.5 text-xs", s.positive ? "font-semibold text-tint-green-foreground" : "text-muted-foreground")}>{s.sub}</p>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Waiting on you */}
      <SectionHeader
        className="mt-8 mb-3"
        title="Waiting on you"
        action={
          <Link to="/messages" className="text-sm font-bold text-tint-blue-foreground">
            All approvals
          </Link>
        }
      />
      <div className="space-y-2.5">
        {approvalQueue.filter((item) => item.kind === "brand_offer").map((a) => {
          const state = a.campaignId ? statusFor(a.campaignId) : undefined;
          if (a.kind === "brand_offer" && state !== "offer") return null;
          return (
            <Card key={a.id} className="p-4">
              <div className="flex items-center gap-3.5">
                <IconBadge tone={a.tone} shape="round" size="md">
                  <BrandMark brand={a.brand} />
                </IconBadge>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.9375rem] font-bold">{a.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {a.brand} · {a.value}
                  </p>
                </div>
              </div>
              {a.kind === "brand_offer" && a.campaignId && (
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
              )}
            </Card>
          );
        })}
      </div>

      {/* Upcoming deliverables */}
      <SectionHeader
        className="mt-8 mb-3"
        title="Upcoming deliverables"
        action={
          <Link to="/plans" className="text-sm font-bold text-tint-blue-foreground">
            Campaigns
          </Link>
        }
      />
      <Card className="divide-y divide-border/70 p-0">
        {upcomingDeliverables.map((d) => (
          <div key={d.id} className="flex items-start gap-4 px-4 py-4">
            <span className="w-14 shrink-0 pt-0.5 text-sm font-extrabold tabular-nums">{d.when}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.9375rem] font-bold">{d.title}</span>
              <BrandPlatformRow brand={d.brand} platforms={d.platforms} className="mt-1.5" />
            </span>
          </div>
        ))}
      </Card>

      {/* Recent commercial activity */}
      <div className="mt-8 rounded-4xl bg-primary-soft p-5">
        <div className="flex items-center gap-3">
          <IconBadge tone="orange" shape="round" size="sm" className="bg-background">
            <Sparkles className="h-4 w-4" strokeWidth={2.3} />
          </IconBadge>
          <p className="eyebrow text-primary">Recent activity</p>
        </div>
        <ul className="mt-4 space-y-3.5">
          {(campaignEvents[0]?.items ?? []).map((e) => (
            <li key={e.id} className="border-b border-primary/10 pb-3.5 last:border-0 last:pb-0">
              <p className="text-[0.9375rem] leading-snug font-semibold">{e.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{e.meta}</p>
            </li>
          ))}
        </ul>
        <Link to="/timeline" className="mt-4 block">
          <AButton variant="soft" size="md" className="w-full bg-background">
            Open the timeline
          </AButton>
        </Link>
      </div>
    </AppShell>
  );
}
