import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/alfred/ui";
import { ArrowRight, Briefcase, Clock4, CircleCheckBig, Wallet } from "lucide-react";
import { BrandShell, brandMeta } from "@/components/brand/BrandShell";
import { BrandMark } from "@/components/influencer/Marks";
import { brandAccount, brandActivity, brandApprovals, brandCampaigns, briefsAwaitingMatch, money } from "@/data/brand";

export const Route = createFileRoute("/brand/")({
  head: () => brandMeta("Brand dashboard | INFLUENCER", "Active campaigns, spend, approvals and briefs awaiting a creator match."),
  component: BrandDashboard,
});

function BrandDashboard() {
  const active = brandCampaigns.filter((c) => c.status !== "completed").length;
  const spend = brandCampaigns.filter((c) => c.status !== "completed").reduce((s, c) => s + c.spent, 0);
  const next = brandApprovals[0]!;
  const stats = [
    { label: "Campaigns", value: String(active), sub: "Active", icon: Briefcase, tint: "bg-tint-blue", fg: "text-tint-blue-foreground" },
    { label: "Money", value: money(spend), sub: "Spend this quarter", icon: Wallet, tint: "bg-tint-green", fg: "text-tint-green-foreground" },
    { label: "Approvals", value: String(brandApprovals.length), sub: "Pending", icon: CircleCheckBig, tint: "bg-tint-amber", fg: "text-tint-amber-foreground" },
    { label: "Briefs", value: String(briefsAwaitingMatch.length), sub: "Awaiting match", icon: Clock4, tint: "bg-tint-violet", fg: "text-tint-violet-foreground" },
  ];

  return (
    <BrandShell title="Dashboard">
      <div className="flex items-center gap-3 pt-2">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-surface">
          <BrandMark brand={brandAccount.name} className="h-6 w-6" />
        </span>
        <div>
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h2 className="text-xl font-extrabold tracking-tight">{brandAccount.name}</h2>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-3xl p-4 shadow-card ${s.tint}`}>
            <div className="flex items-center gap-2"><s.icon className={`h-5 w-5 shrink-0 ${s.fg}`} /><p className="text-sm font-bold">{s.label}</p></div>
            <p className="mt-3 text-2xl font-extrabold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      <section className="mt-6 rounded-3xl bg-primary p-5 text-primary-foreground">
        <p className="text-xs font-bold tracking-wide uppercase opacity-80">Up next · {next.due}</p>
        <h3 className="mt-1 text-lg font-extrabold">{next.title}</h3>
        <p className="mt-1 text-sm opacity-90">{next.summary}</p>
        <Link to="/brand/approvals" className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-card px-4 text-sm font-bold text-foreground">
          Review now <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-bold">Recent activity</h3>
          <Link to="/brand/timeline" className="text-sm font-semibold text-primary">See all</Link>
        </div>
        <div className="divide-y divide-border rounded-3xl bg-card shadow-card">
          {brandActivity.slice(0, 4).map((a) => (
            <div key={a.id} className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{a.title}</p>
                <p className="truncate text-xs text-muted-foreground">{a.meta}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{a.date}</span>
            </div>
          ))}
        </div>
      </section>

      <Link to="/brand/brief" className="mt-6 flex h-12 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
        Post a new brief
      </Link>
    </BrandShell>
  );
}
