import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/alfred/ui";
import { ArrowRight, ClipboardList, Receipt, Users, Wallet } from "lucide-react";
import { OfficeShell } from "@/components/alfred/OfficeShell";
import { AButton, Card, IconBadge, Pill, SectionHeader } from "@/components/alfred/ui";
import { employees, expenditure, officeActivity, salaryRows } from "@/data/office";

export const Route = createFileRoute("/office/")({
  head: () => ({
    meta: [
      { title: "My Desk, Alfred Office" },
      {
        name: "description",
        content: "Your business at a glance: staff, salaries, expenditure and everything happening today.",
      },
      { property: "og:title", content: "My Desk, Alfred Office" },
      { property: "og:description", content: "A calm operating desk for your staff, salaries and work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MyDeskScreen,
});

function MyDeskScreen() {
  const active = employees.filter((e) => e.status === "Active").length;
  const pending = salaryRows.filter((s) => s.status === "Pending");

  return (
    <OfficeShell title="My Office">
      <p className="eyebrow text-primary">Friday · 4 September</p>
      <h2 className="mt-1.5 text-[2rem] leading-[1.1] font-extrabold">My Desk</h2>
      <p className="mt-2 text-[0.9375rem] text-muted-foreground">
        Brightlane Stores, {employees.length} people, {pending.length} salaries still to run this month.
      </p>

      {/* Staff */}
      <div className="mt-6 rounded-4xl bg-tint-blue p-5">
        <div className="flex items-start gap-3.5">
          <IconBadge tone="blue" shape="round" size="md" className="bg-background">
            <Users className="h-5 w-5" strokeWidth={2.2} />
          </IconBadge>
          <div className="min-w-0 flex-1">
            <p className="eyebrow text-tint-blue-foreground">Staff</p>
            <p className="mt-1 text-[1.5rem] leading-tight font-extrabold">{employees.length} employees</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {active} active · {employees.length - active} on leave or probation
            </p>
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          {employees.slice(0, 3).map((e) => (
            <li key={e.id} className="flex items-center gap-3 rounded-2xl bg-background px-3.5 py-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-tint-blue text-xs font-bold text-tint-blue-foreground">
                {e.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.875rem] font-bold">{e.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{e.role}</span>
              </span>
              <Pill tone={e.status === "Active" ? "green" : e.status === "On leave" ? "amber" : "violet"}>
                {e.status}
              </Pill>
            </li>
          ))}
        </ul>

        <Link to="/office/staff" className="mt-4 block">
          <AButton variant="secondary" size="md" className="w-full">
            See all staff
            <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
          </AButton>
        </Link>
      </div>

      {/* Salaries */}
      <Card className="mt-4 p-5">
        <div className="flex items-center gap-3">
          <IconBadge tone="orange" shape="squircle" size="md">
            <Wallet className="h-5 w-5" strokeWidth={2.2} />
          </IconBadge>
          <div className="min-w-0 flex-1">
            <p className="text-[1.0625rem] font-extrabold">Salaries</p>
            <p className="text-xs text-muted-foreground">August run · September upcoming</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-tint-green px-4 py-3.5">
            <p className="text-lg font-extrabold text-tint-green-foreground">₦565,000</p>
            <p className="text-xs font-semibold text-muted-foreground">Paid this month</p>
          </div>
          <div className="rounded-2xl bg-primary-soft px-4 py-3.5">
            <p className="text-lg font-extrabold text-primary">₦330,000</p>
            <p className="text-xs font-semibold text-muted-foreground">Upcoming · 30 Sep</p>
          </div>
        </div>
        <ul className="mt-3 divide-y divide-border/70">
          {salaryRows.slice(0, 2).map((s) => (
            <li key={s.id} className="flex items-center gap-3 py-2.5">
              <span className="min-w-0 flex-1 truncate text-sm font-semibold">{s.name}</span>
              <span className="text-sm font-bold tabular-nums">{s.amount}</span>
              <Pill tone={s.status === "Paid" ? "green" : "amber"}>{s.status}</Pill>
            </li>
          ))}
        </ul>
        <Link to="/office/salaries" className="mt-3 block">
          <AButton variant="soft" size="md" className="w-full">
            Manage salaries
          </AButton>
        </Link>
      </Card>

      {/* Expenditure */}
      <div className="mt-4 rounded-4xl bg-tint-amber p-5">
        <div className="flex items-start gap-3.5">
          <IconBadge tone="amber" shape="round" size="md" className="bg-background">
            <Receipt className="h-5 w-5" strokeWidth={2.2} />
          </IconBadge>
          <div className="min-w-0 flex-1">
            <p className="eyebrow text-tint-amber-foreground">Expenditure</p>
            <p className="mt-1 text-[1.5rem] leading-tight font-extrabold">₦341,700</p>
            <p className="mt-0.5 text-sm text-muted-foreground">Recorded this month · not linked to any account</p>
          </div>
        </div>
        <ul className="mt-4 space-y-2">
          {expenditure.map((x) => (
            <li key={x.id} className="flex items-center gap-3 rounded-2xl bg-background/70 px-3.5 py-2.5">
              <span className="min-w-0 flex-1 truncate text-[0.875rem] font-semibold">{x.label}</span>
              <span className="text-sm font-bold tabular-nums">{x.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Work shortcut */}
      <Link to="/office/work" className="mt-4 block active:scale-[0.99]">
        <Card className="flex items-center gap-3.5 p-4">
          <IconBadge tone="violet" shape="squircle" size="md">
            <ClipboardList className="h-5 w-5" strokeWidth={2.2} />
          </IconBadge>
          <span className="min-w-0 flex-1">
            <span className="block text-[0.9375rem] font-bold">Work</span>
            <span className="block text-xs text-muted-foreground">5 open items across your team</span>
          </span>
          <ArrowRight className="h-4 w-4 text-muted-foreground" strokeWidth={2.4} />
        </Card>
      </Link>

      {/* Recent activity */}
      <SectionHeader className="mt-8 mb-3" title="Recent activity" />
      <Card className="divide-y divide-border/70 p-0">
        {officeActivity.map((a) => (
          <div key={a.id} className="flex items-start gap-4 px-4 py-4">
            <span className="w-12 shrink-0 pt-0.5 text-sm font-extrabold tabular-nums">{a.time}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.9375rem] leading-snug font-semibold">{a.title}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{a.meta}</span>
            </span>
          </div>
        ))}
      </Card>
    </OfficeShell>
  );
}
