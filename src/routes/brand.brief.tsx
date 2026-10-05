import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { AButton, Link } from "@/components/alfred/ui";
import { BrandShell, brandMeta } from "@/components/brand/BrandShell";
import { PlatformMark } from "@/components/influencer/Marks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/brand/brief")({
  head: () => brandMeta("Post a brief | INFLUENCER", "Describe what you need. We match you with a creator, identities stay private until the deal is locked."),
  component: PostBrief,
});

const tiers = ["$1K–$3K", "$3K–$7.5K", "$7.5K–$15K", "$15K+"];
const reach = ["Micro 10K–50K", "Mid 50K–250K", "Pro 250K–1M"];
const platforms = ["Instagram", "TikTok", "YouTube", "Threads", "X"];
const niches = ["Fitness", "Beauty", "Tech", "Music", "Lifestyle", "Food"];
const formats = ["Reel", "Story set", "TikTok video", "Dedicated YouTube", "Carousel"];

function PostBrief() {
  const [sent, setSent] = useState(false);
  const [title, setTitle] = useState("");
  const [tier, setTier] = useState(tiers[1]!);
  const [band, setBand] = useState(reach[0]!);
  const [plats, setPlats] = useState<string[]>(["Instagram"]);
  const [niche, setNiche] = useState(niches[0]!);
  const [fmt, setFmt] = useState<string[]>(["Reel"]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  if (sent) {
    return (
      <BrandShell title="Brief posted" focused>
        <div className="mt-16 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
          <h2 className="mt-4 text-2xl font-extrabold">Brief posted</h2>
          <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
            We're matching "{title || "Untitled brief"}" with a {band.split(" ")[0]} {niche.toLowerCase()} creator. You'll see their stats once matched.
          </p>
          <div className="mt-6 grid gap-3">
            <Link to="/brand" className="flex h-12 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">Back to dashboard</Link>
            <AButton onClick={() => setSent(false)} variant="neutral" className="h-12">Post another</AButton>
          </div>
        </div>
      </BrandShell>
    );
  }

  return (
    <BrandShell title="Post a brief" focused>
      <h2 className="pt-2 text-2xl font-extrabold tracking-tight">Post a brief</h2>
      <p className="mt-1 text-sm text-muted-foreground">Tell us what you need. We find the creator.</p>
      <div className="mt-3 flex items-start gap-2 rounded-2xl bg-tint-blue p-3 text-xs text-tint-blue-foreground">
        <ShieldCheck className="h-4 w-4 shrink-0" />
        Creator identities stay private until the deal is locked.
      </div>

      <Field label="Campaign title">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Hydration bottle launch" className="h-12 w-full rounded-2xl bg-surface px-4 text-sm outline-none focus:ring-2 focus:ring-ring" />
      </Field>
      <Field label="Budget"><Chips options={tiers} isOn={(v) => v === tier} onTap={setTier} /></Field>
      <Field label="Target reach"><Chips options={reach} isOn={(v) => v === band} onTap={setBand} /></Field>
      <Field label="Platforms">
        <div className="flex flex-wrap gap-2">
          {platforms.map((p) => (
            <button key={p} onClick={() => toggle(plats, setPlats, p)} className={chip(plats.includes(p))}>
              <PlatformMark platform={p} className="h-4 w-4" /> {p}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Niche"><Chips options={niches} isOn={(v) => v === niche} onTap={setNiche} /></Field>
      <Field label="Deliverables"><Chips options={formats} isOn={(v) => fmt.includes(v)} onTap={(v) => toggle(fmt, setFmt, v)} /></Field>
      <Field label="Timeline">
        <div className="grid grid-cols-2 gap-3">
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="h-12 rounded-2xl bg-surface px-3 text-sm" aria-label="Start date" />
          <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="h-12 rounded-2xl bg-surface px-3 text-sm" aria-label="End date" />
        </div>
      </Field>

      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[520px] -translate-x-1/2 border-t border-border bg-background/95 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
        <AButton
          disabled={!plats.length || !fmt.length}
          onClick={() => setSent(true)}
          size="lg"
          className="w-full text-base font-bold"
        >
          Submit brief for matching
        </AButton>
      </div>
    </BrandShell>
  );
}

const chip = (on: boolean) =>
  cn(
    "inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors",
    on ? "bg-primary text-primary-foreground" : "bg-surface text-foreground",
  );

function Chips({ options, isOn, onTap }: { options: string[]; isOn: (v: string) => boolean; onTap: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o} onClick={() => onTap(o)} className={chip(isOn(o))}>{o}</button>
      ))}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <p className="mb-2 text-sm font-bold">{label}</p>
      {children}
    </div>
  );
}
