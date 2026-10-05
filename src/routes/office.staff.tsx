import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, Phone, Plus, Sparkles } from "lucide-react";
import { OfficeShell } from "@/components/alfred/OfficeShell";
import { AButton, Card, Pill } from "@/components/alfred/ui";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { employees, type Employee } from "@/data/office";

export const Route = createFileRoute("/office/staff")({
  head: () => ({
    meta: [
      { title: "Staff, Alfred Office" },
      { name: "description", content: "Your employees, their roles, pay and contact details in one place." },
      { property: "og:title", content: "Staff, Alfred Office" },
      { property: "og:description", content: "Employees, roles, pay and contact details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: StaffScreen,
});

const statusTone = { Active: "green", "On leave": "amber", Probation: "violet" } as const;

function StaffScreen() {
  const [selected, setSelected] = useState<Employee | null>(null);

  return (
    <OfficeShell title="Staff">
      <h2 className="text-[1.75rem] leading-tight font-extrabold">Employees</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        {employees.length} people on your team. Tap anyone to see their details.
      </p>

      <AButton size="lg" className="mt-5 w-full">
        <Plus className="h-4 w-4" strokeWidth={3} />
        Add an employee
      </AButton>

      <Card className="mt-6 divide-y divide-border/70 p-0">
        {employees.map((e) => (
          <button
            key={e.id}
            onClick={() => setSelected(e)}
            className="flex w-full items-center gap-3.5 px-4 py-4 text-left active:bg-surface"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-tint-blue text-sm font-bold text-tint-blue-foreground">
              {e.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.9375rem] font-bold">{e.name}</span>
              <span className="block truncate text-xs text-muted-foreground">
                {e.role} · {e.salary}
              </span>
            </span>
            <Pill tone={statusTone[e.status]}>{e.status}</Pill>
          </button>
        ))}
      </Card>

      <Sheet open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <SheetContent side="bottom" className="rounded-t-4xl border-0 bg-background px-5 pt-6 pb-8">
          {selected && (
            <div>
              <div className="flex items-center gap-3.5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-tint-blue text-base font-bold text-tint-blue-foreground">
                  {selected.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-lg font-extrabold">{selected.name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {selected.role} · {selected.since}
                  </p>
                </div>
                <Pill tone={statusTone[selected.status]}>{selected.status}</Pill>
              </div>

              <dl className="mt-5 divide-y divide-border/70 rounded-3xl bg-surface px-4">
                {[
                  ["Phone", selected.phone],
                  ["WhatsApp", selected.whatsapp],
                  ["Email", selected.email],
                  ["Salary", selected.salary],
                  ["Bank account", selected.bank],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3 py-3">
                    <dt className="text-xs font-semibold text-muted-foreground">{k}</dt>
                    <dd className="min-w-0 flex-1 truncate text-right text-sm font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 grid grid-cols-4 gap-2.5">
                {[
                  { label: "Call", icon: Phone },
                  { label: "Message", icon: MessageCircle },
                  { label: "WhatsApp", icon: MessageCircle },
                  { label: "Email", icon: Mail },
                ].map((a) => (
                  <button
                    key={a.label}
                    className="rounded-2xl border border-border/70 bg-card p-3 text-center shadow-card active:scale-[0.98]"
                  >
                    <a.icon className="mx-auto h-5 w-5 text-tint-blue-foreground" strokeWidth={2.2} />
                    <span className="mt-2 block text-[0.6875rem] font-semibold">{a.label}</span>
                  </button>
                ))}
              </div>

              <AButton size="lg" className="mt-4 w-full">
                <Sparkles className="h-4 w-4" strokeWidth={2.6} />
                Ask Alfred to contact {selected.name.split(" ")[0]}
              </AButton>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </OfficeShell>
  );
}
