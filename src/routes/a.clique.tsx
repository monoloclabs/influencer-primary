import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { Card, Link, Pill } from "@/components/alfred/ui";
import { useCampaignState } from "@/components/influencer/CampaignState";
import { BrandMark } from "@/components/influencer/Marks";
import {
  campaignEvents,
  campaigns,
  statusMeta,
  transactions,
  type Campaign,
  type CampaignStatus,
  type PillTone,
} from "@/data/influencer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/a/clique")({
  head: () => ({
    meta: [
      { title: "Brand network | INFLUENCER" },
      { name: "description", content: "Every brand you work with: partnerships, payouts and the full relationship history." },
      { property: "og:title", content: "Brand network | INFLUENCER" },
      { property: "og:description", content: "Your 360° relationship record with each brand partner." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BrandNetworkScreen,
});

type Relationship = {
  name: string;
  contact: string;
  deals: Campaign[];
};

const closedStatuses = new Set<CampaignStatus>(["completed", "paid", "declined", "cancelled"]);
const incomeStatuses = new Set<CampaignStatus>([
  "accepted",
  "pending_approval",
  "active",
  "awaiting_content",
  "awaiting_brand_approval",
  "completed",
  "payment_pending",
  "paid",
]);

function amountFrom(value?: string) {
  return value ? Number(value.replace(/[^0-9.-]+/g, "")) || 0 : 0;
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function relationshipTone(statuses: CampaignStatus[]): PillTone {
  if (statuses.some((status) => status === "offer")) return "violet";
  if (statuses.some((status) => !closedStatuses.has(status))) return "orange";
  return "green";
}

function relationshipLabel(statuses: CampaignStatus[]) {
  if (statuses.some((status) => status === "offer")) return "Offer pending";
  if (statuses.some((status) => !closedStatuses.has(status))) return "Ongoing";
  return "Past partner";
}

function BrandNetworkScreen() {
  const [open, setOpen] = useState<string | null>(null);
  const { statusFor } = useCampaignState();
  const relationships = useMemo<Relationship[]>(() => {
    const names = Array.from(new Set(campaigns.map((campaign) => campaign.brand)));
    return names.map((name) => {
      const deals = campaigns.filter((campaign) => campaign.brand === name);
      return { name, contact: deals[0]?.contact ?? "Brand contact", deals };
    });
  }, []);
  const active = relationships.filter((relationship) =>
    relationship.deals.some((deal) => {
      const status = statusFor(deal.id) ?? deal.status;
      return status !== "offer" && !closedStatuses.has(status);
    }),
  ).length;
  const lifetimeIncome = relationships.reduce(
    (sum, relationship) =>
      sum +
      relationship.deals.reduce((dealSum, deal) => {
        const status = statusFor(deal.id) ?? deal.status;
        return dealSum + (incomeStatuses.has(status) ? amountFrom(deal.net) : 0);
      }, 0),
    0,
  );

  return (
    <AppShell title="Brand network">
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
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
          <p className="text-2xl font-extrabold">{money(lifetimeIncome)}</p>
          <p className="mt-0.5 text-xs font-semibold text-muted-foreground">Total income</p>
        </Card>
      </div>

      <p className="eyebrow mt-8 mb-3 px-1 text-muted-foreground">Partners</p>
      <div className="space-y-2.5">
        {relationships.map((relationship) => {
          const isOpen = open === relationship.name;
          const statuses = relationship.deals.map((deal) => statusFor(deal.id) ?? deal.status);
          const ongoingDeals = relationship.deals.filter((deal) => {
            const status = statusFor(deal.id) ?? deal.status;
            return status !== "offer" && !closedStatuses.has(status);
          });
          const brandTransactions = transactions.flatMap((group) =>
            group.items
              .filter((item) => item.title.toLowerCase().includes(relationship.name.toLowerCase()))
              .map((item) => ({ ...item, group: group.day })),
          );
          const brandEvents = campaignEvents.flatMap((group) =>
            group.items
              .filter((item) => item.title.toLowerCase().includes(relationship.name.toLowerCase()))
              .map((item) => ({ ...item, group: group.day })),
          );
          const paid = brandTransactions.reduce(
            (sum, item) => sum + (item.amount?.startsWith("+") ? amountFrom(item.amount) : 0),
            0,
          );
          const totalIncome = relationship.deals.reduce((sum, deal) => {
            const status = statusFor(deal.id) ?? deal.status;
            return sum + (incomeStatuses.has(status) ? amountFrom(deal.net) : 0);
          }, 0);
          return (
            <Card key={relationship.name} className="p-4">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : relationship.name)}
                className="flex w-full items-center gap-3.5 text-left"
                aria-expanded={isOpen}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface">
                  <BrandMark brand={relationship.name} className="h-5 w-5 text-foreground" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.9375rem] font-bold">{relationship.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {relationship.deals.length} {relationship.deals.length === 1 ? "deal" : "deals"} · {money(totalIncome)} income
                  </span>
                </span>
                <Pill tone={relationshipTone(statuses)}>{relationshipLabel(statuses)}</Pill>
                <ChevronDown
                  className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")}
                  strokeWidth={2.6}
                />
              </button>

              {isOpen && (
                <div className="mt-4 border-t border-border pt-4">
                  <p className="text-xs font-semibold text-muted-foreground">{relationship.contact}</p>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-2xl bg-surface px-3 py-3">
                      <p className="text-lg font-extrabold">{relationship.deals.length}</p>
                      <p className="text-[0.6875rem] font-semibold text-muted-foreground">Deals</p>
                    </div>
                    <div className="rounded-2xl bg-surface px-3 py-3">
                      <p className="text-lg font-extrabold">{money(paid)}</p>
                      <p className="text-[0.6875rem] font-semibold text-muted-foreground">Amount paid</p>
                    </div>
                    <div className="rounded-2xl bg-surface px-3 py-3">
                      <p className="text-lg font-extrabold">{money(totalIncome)}</p>
                      <p className="text-[0.6875rem] font-semibold text-muted-foreground">Total income</p>
                    </div>
                  </div>

                  {ongoingDeals.length > 0 && (
                    <section className="mt-5">
                      <p className="eyebrow mb-2.5 text-primary">Ongoing</p>
                      <div className="space-y-2">
                        {ongoingDeals.map((deal) => {
                          const status = statusFor(deal.id) ?? deal.status;
                          return (
                            <DealRow key={deal.id} deal={deal} status={status} />
                          );
                        })}
                      </div>
                    </section>
                  )}

                  <section className="mt-5">
                    <p className="eyebrow mb-2.5 text-muted-foreground">All deals</p>
                    <div className="space-y-2">
                      {relationship.deals.map((deal) => {
                        const status = statusFor(deal.id) ?? deal.status;
                        return <DealRow key={deal.id} deal={deal} status={status} />;
                      })}
                    </div>
                  </section>

                  {(brandEvents.length > 0 || brandTransactions.length > 0) && (
                    <section className="mt-5">
                      <p className="eyebrow mb-3 text-muted-foreground">Relationship timeline</p>
                      <div className="space-y-3.5 border-l border-border pl-4">
                        {brandEvents.map((event) => (
                          <div key={event.id} className="relative">
                            <span className="absolute top-1.5 -left-[1.1875rem] h-2 w-2 rounded-full bg-primary" />
                            <p className="text-[0.8125rem] font-bold">{event.title}</p>
                            <p className="text-xs text-muted-foreground">{event.group} · {event.meta}</p>
                          </div>
                        ))}
                        {brandTransactions.map((transaction) => (
                          <div key={transaction.id} className="relative">
                            <span className="absolute top-1.5 -left-[1.1875rem] h-2 w-2 rounded-full bg-foreground" />
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-[0.8125rem] font-bold">{transaction.title}</p>
                                <p className="text-xs text-muted-foreground">{transaction.group} · {transaction.meta}</p>
                              </div>
                              {transaction.amount && (
                                <span className="shrink-0 text-xs font-extrabold tabular-nums">{transaction.amount}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
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

function DealRow({ deal, status }: { deal: Campaign; status: CampaignStatus }) {
  const meta = statusMeta[status];
  return (
    <Link
      to={`/plan/${deal.id}`}
      className="flex items-center gap-3 rounded-2xl bg-surface px-3.5 py-3 active:scale-[0.99]"
    >
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.8125rem] font-bold">{deal.title}</span>
        <span className="block text-xs text-muted-foreground">{deal.window} · {deal.net} net</span>
      </span>
      <Pill tone={meta.tone}>{meta.label}</Pill>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2.4} />
    </Link>
  );
}
