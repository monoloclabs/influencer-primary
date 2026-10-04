import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { InfluencerMark } from "@/components/alfred/InfluencerMark";
import { BrandMark, PlatformMark } from "@/components/influencer/Marks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome to INFLUENCER — Creators and brands, one deal flow" },
      { name: "description", content: "Choose your side: run your creator business, or post briefs and get matched with creators." },
      { property: "og:title", content: "Welcome to INFLUENCER" },
      { property: "og:description", content: "Creators and brands, one deal flow. Pick your side to get started." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Welcome,
});

type Role = "creator" | "brand";

function Welcome() {
  const [role, setRole] = useState<Role>("creator");
  const navigate = useNavigate();

  return (
    <div className={cn("mx-auto flex min-h-screen w-full max-w-[520px] flex-col transition-colors duration-500", role === "creator" ? "bg-welcome-creator text-home-ink" : "bg-tint-blue-foreground text-primary-foreground")}>
      <Link to="/" aria-label="INFLUENCER home" className="mx-auto flex items-center justify-center gap-1.5 pt-8 text-base font-bold tracking-tight">
        <span>INFLUENCER</span>
        <InfluencerMark className="h-[1.15rem] w-[1.15rem]" />
      </Link>

      {role === "creator" ? <CreatorCards /> : <BrandCards />}

      <div className="mt-auto px-6 pb-10 text-center">
        <h2 className="mx-auto max-w-md text-[2.25rem] leading-[1.04] font-extrabold">{role === "creator" ? "Turn your audience into a business." : "Reach the people who matter to your brand."}</h2>
        <p className="mx-auto mt-4 max-w-xs text-sm opacity-85">{role === "creator" ? "Find paid brand work, manage every campaign and get paid on time." : "Find the right creators, launch campaigns, track deliverables and reach real audiences."}</p>

        <div role="radiogroup" className="mt-8 grid grid-cols-2 rounded-full border border-current/60 p-1">
          {(["creator", "brand"] as const).map((r) => (
            <button
              key={r}
              role="radio"
              aria-checked={role === r}
              onClick={() => setRole(r)}
              className={cn(
                "h-12 rounded-full text-base font-semibold transition-colors",
                role === r ? "bg-card text-foreground" : "",
              )}
            >
              I'm a {r}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate({ to: role === "creator" ? "/dashboard" : "/brand" })}
          className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-bold text-primary-foreground active:scale-[0.98]"
        >
          {role === "creator" ? "Enter creator studio" : "Enter brand workspace"}
          <ArrowRight className="h-5 w-5" />
        </button>

        <p className="mt-6 text-sm opacity-85">
          Already have an account? <button className="font-bold underline">Log in</button>
        </p>
      </div>
    </div>
  );
}

/* Creator: varied-size, deliberately arranged composition with violet accent */
function CreatorCards() {
  return (
    <div className="mx-auto mt-8 grid w-full max-w-[360px] grid-cols-3 gap-3 px-5">
      <div className="col-span-1 row-span-2 flex flex-col justify-between rounded-3xl bg-home-yellow p-3 text-home-ink shadow-card">
        <BrandMark brand="Gymshark" className="h-7 w-7" />
        <div><p className="text-lg font-extrabold">$4,250</p><p className="text-[0.65rem] font-semibold">Payment released</p></div>
      </div>
      <div className="col-span-2 flex items-center gap-3 rounded-3xl bg-creator-violet p-4 text-primary-foreground shadow-card">
        <BrandMark brand="Spotify" className="h-8 w-8" />
        <div><p className="text-sm font-extrabold">New offer</p><p className="text-[0.65rem] opacity-85">Podcast launch · 3 deliverables</p></div>
      </div>
      <div className="col-span-2 flex items-center justify-center rounded-full bg-card px-4 py-3 text-xs font-bold text-foreground shadow-card">
        <span className="text-primary">✱</span>&nbsp;@tola · creator
      </div>
      <div className="col-span-2 flex items-center gap-3 rounded-3xl bg-home-sky p-4 text-home-ink shadow-card">
        <BrandMark brand="Sephora" className="h-7 w-7" />
        <div><p className="text-sm font-extrabold">Campaign accepted</p><p className="text-[0.65rem]">Hero Reel approved</p></div>
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center gap-1 rounded-3xl bg-primary p-3 text-primary-foreground shadow-card">
        <p className="text-lg font-extrabold">4/4</p><p className="text-[0.6rem] font-semibold">Delivered</p>
      </div>
    </div>
  );
}

/* Brand: clean horizontal stacked/overlapping cards with platform reach */
const brandRows: { platform: string; stat: string; label: string; bg: string }[][] = [
  [
    { platform: "Instagram", stat: "3.2M", label: "Reach", bg: "bg-creator-violet text-primary-foreground" },
    { platform: "YouTube", stat: "1.4M", label: "Views", bg: "bg-tint-amber text-tint-amber-foreground" },
    { platform: "TikTok", stat: "8M", label: "Views", bg: "bg-home-coral text-home-ink" },
  ],
  [
    { platform: "X", stat: "640K", label: "Impressions", bg: "bg-home-sky text-home-ink" },
    { platform: "WhatsApp", stat: "92%", label: "Open rate", bg: "bg-home-lime text-home-ink" },
    { platform: "Threads", stat: "24", label: "Creators matched", bg: "bg-card text-foreground" },
  ],
];

function BrandCards() {
  return (
    <div className="mt-8 flex flex-col items-center gap-4 px-5">
      {brandRows.map((row, i) => (
        <div key={i} className={cn("flex", i === 1 && "translate-x-4")}>
          {row.map((c, j) => (
            <div
              key={c.platform}
              className={cn("flex h-28 w-[6.5rem] -skew-y-6 flex-col justify-between rounded-3xl p-3 shadow-card", c.bg, j > 0 && "-ml-3")}
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-card text-foreground"><PlatformMark platform={c.platform} className="h-5 w-5 text-foreground" /></span>
              <div><p className="text-xl leading-none font-extrabold">{c.stat}</p><p className="text-[0.6rem] font-semibold">{c.label}</p></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
