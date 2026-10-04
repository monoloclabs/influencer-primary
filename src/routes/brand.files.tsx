import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { FileSignature, FileText, Image, Palette, Presentation, Receipt, Shapes } from "lucide-react";
import { Pill } from "@/components/alfred/ui";
import { BrandShell, brandMeta } from "@/components/brand/BrandShell";
import { brandCampaigns } from "@/data/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/brand/files")({
  head: () => brandMeta("Files & Documents — Brand workspace | INFLUENCER", "Contracts, briefs and invoices alongside brand logos, guidelines and creative packs."),
  component: BrandFiles,
});

const documents = [
  { id: "d1", name: "Creator agreement — CR-408", meta: "Summer Lift Series · Signed Oct 2", kind: "Contract", icon: FileSignature, tint: "bg-tint-blue text-tint-blue-foreground", status: "Signed", tone: "green" as const },
  { id: "d2", name: "Usage rights addendum — CR-221", meta: "Recovery Range Teaser · Awaiting signature", kind: "Contract", icon: FileSignature, tint: "bg-tint-blue text-tint-blue-foreground", status: "Pending", tone: "amber" as const },
  { id: "d3", name: "Summer Lift Series brief", meta: "3 deliverables · Updated Sep 29", kind: "Brief", icon: FileText, tint: "bg-tint-violet text-tint-violet-foreground", status: "Live", tone: "blue" as const },
  { id: "d4", name: "Hydration bottle launch brief", meta: "Matching creators · Posted 2 days ago", kind: "Brief", icon: FileText, tint: "bg-tint-violet text-tint-violet-foreground", status: "Draft", tone: "neutral" as const },
  { id: "d5", name: "Invoice INV-1042", meta: "Kickoff milestone · $6,250", kind: "Invoice", icon: Receipt, tint: "bg-tint-green text-tint-green-foreground", status: "Paid", tone: "green" as const },
  { id: "d6", name: "Invoice INV-1029", meta: "Spring Training Drop · $9,250", kind: "Invoice", icon: Receipt, tint: "bg-tint-green text-tint-green-foreground", status: "Paid", tone: "green" as const },
];

const assets = [
  { id: "a1", name: "Logo pack", meta: "SVG, PNG · Light and dark", icon: Shapes, tint: "bg-tint-blue text-tint-blue-foreground" },
  { id: "a2", name: "Brand guidelines", meta: "Type, colour, tone of voice", icon: Palette, tint: "bg-tint-violet text-tint-violet-foreground" },
  { id: "a3", name: "Product photography", meta: "42 images · Summer range", icon: Image, tint: "bg-tint-amber text-tint-amber-foreground" },
  { id: "a4", name: "Creative deck — Summer Lift", meta: "18 slides · Do's and don'ts", icon: Presentation, tint: "bg-tint-green text-tint-green-foreground" },
];

function BrandFiles() {
  const [tab, setTab] = useState<"docs" | "assets">("docs");
  const [docFilter, setDocFilter] = useState("All");
  const active = brandCampaigns.filter((c) => c.status !== "completed");
  const shownDocs = docFilter === "All" ? documents : documents.filter((d) => d.kind === docFilter);

  return (
    <BrandShell title="Files & Documents">
      <h2 className="pt-2 text-[1.75rem] leading-tight font-extrabold">Files & Documents</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">Paperwork and brand assets for every campaign, in one place.</p>

      <div role="tablist" className="mt-5 grid grid-cols-2 rounded-full bg-surface p-1">
        {([["docs", "Documents"], ["assets", "Brand Assets"]] as const).map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={cn("h-11 rounded-full text-sm font-bold", tab === k ? "bg-card text-foreground shadow-card" : "text-muted-foreground")}>{l}</button>
        ))}
      </div>

      {tab === "docs" ? (
        <>
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {["All", "Contract", "Brief", "Invoice"].map((f) => (
              <button key={f} onClick={() => setDocFilter(f)} className={cn("h-9 shrink-0 rounded-full px-4 text-[0.8125rem] font-semibold", docFilter === f ? "bg-foreground text-background" : "bg-surface text-muted-foreground")}>{f === "All" ? f : `${f}s`}</button>
            ))}
          </div>
          <div className="mt-4 space-y-2.5">
            {shownDocs.map((d) => (
              <div key={d.id} className="flex items-center gap-3.5 rounded-3xl bg-card p-4 shadow-card">
                <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-2xl", d.tint)}><d.icon className="h-5 w-5" /></span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.9375rem] font-bold">{d.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{d.meta}</p>
                </div>
                <Pill tone={d.tone}>{d.status}</Pill>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3">
          {assets.map((a) => (
            <div key={a.id} className="flex flex-col rounded-3xl bg-card p-4 shadow-card">
              <span className={cn("grid h-11 w-11 place-items-center rounded-2xl", a.tint)}><a.icon className="h-5 w-5" /></span>
              <p className="mt-3 text-sm font-bold">{a.name}</p>
              <p className="text-xs text-muted-foreground">{a.meta}</p>
              <select
                aria-label={`Attach ${a.name} to campaign`}
                defaultValue=""
                onChange={(e) => { if (e.target.value) { toast.success(`${a.name} attached to ${e.target.value}`); e.target.value = ""; } }}
                className="mt-4 h-10 w-full rounded-full bg-primary-soft px-3 text-xs font-bold text-primary"
              >
                <option value="" disabled>Attach to campaign</option>
                {active.map((c) => <option key={c.id} value={c.title}>{c.title}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}
    </BrandShell>
  );
}
