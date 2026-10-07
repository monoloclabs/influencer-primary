import type { ReactNode } from "react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export type DetailRow = { label: string; value: ReactNode };

/** Shared bottom sheet for tapping a schedule item (content calendar, shoots and events). */
export function ItemDetailSheet({
  open,
  onOpenChange,
  eyebrow,
  title,
  mark,
  rows,
  children,
  actions,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  eyebrow: string;
  title: string;
  mark?: ReactNode;
  rows: DetailRow[];
  children?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="mx-auto flex max-h-[88vh] w-full max-w-[520px] flex-col gap-0 rounded-t-[2rem] border-0 bg-background p-0"
      >
        <div className="mx-auto mt-3 h-1.5 w-10 shrink-0 rounded-full bg-border" />
        <div className="flex items-center gap-3 px-6 pt-4 pb-3">
          {mark && <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface">{mark}</span>}
          <div className="min-w-0 flex-1">
            <SheetDescription className="eyebrow text-muted-foreground">{eyebrow}</SheetDescription>
            <SheetTitle className="text-xl leading-tight font-extrabold">{title}</SheetTitle>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          <dl className="divide-y divide-border rounded-3xl bg-surface px-4">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between gap-4 py-3">
                <dt className="text-sm text-muted-foreground">{r.label}</dt>
                <dd className="text-right text-sm font-bold">{r.value}</dd>
              </div>
            ))}
          </dl>
          {children}
        </div>
        {actions && (
          <div className="shrink-0 space-y-2 border-t border-border/70 px-6 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            {actions}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
