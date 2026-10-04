import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileVideo, Repeat2 } from "lucide-react";
import { Link } from "@/components/alfred/ui";
import { BrandShell, brandMeta } from "@/components/brand/BrandShell";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { brandApprovals, brandCampaigns, type BrandApproval } from "@/data/brand";

export const Route = createFileRoute("/brand/approvals")({
  head: () => brandMeta("Brand approvals — INFLUENCER", "Sign off creator content and respond to counter-offers."),
  component: BrandApprovals,
});

function BrandApprovals() {
  const [decided, setDecided] = useState<Record<string, "approved" | "declined">>({});
  const [open, setOpen] = useState<BrandApproval | null>(null);
  const decide = (id: string, d: "approved" | "declined") => {
    setDecided((s) => ({ ...s, [id]: d }));
    setOpen(null);
  };

  return (
    <BrandShell title="Approvals">
      <h2 className="pt-2 text-2xl font-extrabold tracking-tight">Approvals</h2>
      <p className="mt-1 text-sm text-muted-foreground">Content and counter-offers from your matched creators.</p>
      <div className="mt-4 grid gap-3">
        {brandApprovals.map((a) => {
          const Icon = a.kind === "content" ? FileVideo : Repeat2;
          const campaign = brandCampaigns.find((c) => c.id === a.campaignId);
          const d = decided[a.id];
          return (
            <div key={a.id} className="rounded-3xl bg-card p-4 shadow-card">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                <div className="min-w-0">
                  <p className="font-bold">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{campaign?.title} · {a.creatorCode} · {a.due}</p>
                  <p className="mt-1 text-sm">{a.summary}</p>
                </div>
              </div>
              {d ? (
                <p className={d === "approved" ? "mt-3 text-sm font-bold text-primary" : "mt-3 text-sm font-bold text-destructive"}>
                  {d === "approved" ? "Approved" : "Declined"}
                </p>
              ) : (
                <div className="mt-4 flex items-center gap-2">
                  <button onClick={() => decide(a.id, "approved")} className="h-10 flex-1 rounded-full bg-primary text-sm font-bold text-primary-foreground">Approve</button>
                  <button onClick={() => setOpen(a)} className="h-10 rounded-full bg-surface px-5 text-sm font-semibold">Inspect</button>
                  <button onClick={() => decide(a.id, "declined")} className="px-2 text-sm font-semibold text-destructive">Decline</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          {open && (
            <div className="pb-4">
              <SheetTitle className="text-lg font-extrabold">{open.title}</SheetTitle>
              <p className="text-xs text-muted-foreground">{open.creatorCode} · {open.due}</p>
              <ul className="mt-4 grid gap-2">
                {open.details.map((x) => <li key={x} className="rounded-2xl bg-surface p-3 text-sm">{x}</li>)}
              </ul>
              <Link to={`/brand/campaign/${open.campaignId}`} className="mt-3 block text-center text-sm font-semibold text-primary">View campaign</Link>
              <div className="mt-4 flex items-center gap-2">
                <button onClick={() => decide(open.id, "approved")} className="h-11 flex-1 rounded-full bg-primary font-bold text-primary-foreground">Approve</button>
                <button onClick={() => decide(open.id, "declined")} className="px-3 font-semibold text-destructive">Decline</button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </BrandShell>
  );
}
