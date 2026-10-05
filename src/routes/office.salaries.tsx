import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { OfficeShell } from "@/components/alfred/OfficeShell";
import { AButton, Card, Pill } from "@/components/alfred/ui";
import { salaryRows } from "@/data/office";
import { employees } from "@/data/office";

export const Route = createFileRoute("/office/salaries")({
  head: () => ({
    meta: [
      { title: "Salaries, Alfred Office" },
      { name: "description", content: "Who is paid, who is pending, and what the next salary run looks like." },
      { property: "og:title", content: "Salaries, Alfred Office" },
      { property: "og:description", content: "Salary status and the next payment run for your team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SalariesScreen,
});

function SalariesScreen() {
  const [paid, setPaid] = useState<string[]>(
    salaryRows.filter((s) => s.status === "Paid").map((s) => s.id),
  );

  return (
    <OfficeShell title="Salaries">
      <h2 className="text-[1.75rem] leading-tight font-extrabold">Salaries</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        {employees.length} people on payroll · next run 30 September.
      </p>

      <div className="mt-5 rounded-4xl bg-primary-soft p-5">
        <p className="eyebrow text-primary">Next salary run</p>
        <p className="mt-1.5 text-[1.75rem] leading-tight font-extrabold">₦330,000</p>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" strokeWidth={2.3} />
          Due 30 September · {salaryRows.length - paid.length} pending
        </p>
        <AButton size="lg" className="mt-4 w-full">
          Run salaries
        </AButton>
      </div>

      <p className="eyebrow mt-8 mb-3 px-1 text-muted-foreground">This month</p>
      <Card className="divide-y divide-border/70 p-0">
        {salaryRows.map((s) => {
          const isPaid = paid.includes(s.id);
          return (
            <div key={s.id} className="flex items-center gap-3.5 px-4 py-4">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.9375rem] font-bold">{s.name}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {isPaid ? s.when : `Due 30 Sep`}
                </span>
              </span>
              <span className="text-sm font-extrabold tabular-nums">{s.amount}</span>
              {isPaid ? (
                <Pill tone="green">Paid</Pill>
              ) : (
                <AButton
                  size="sm"
                  variant="soft"
                  onClick={() => setPaid((p) => [...p, s.id])}
                >
                  Mark paid
                </AButton>
              )}
            </div>
          );
        })}
      </Card>
    </OfficeShell>
  );
}
