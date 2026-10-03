import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
    <div className="mx-auto flex min-h-screen w-full max-w-[520px] flex-col bg-welcome text-primary-foreground">
      <div className="flex items-center justify-center gap-1.5 pt-8 text-base font-bold tracking-tight text-primary">
        <span>INFLUENCER</span>
        <InfluencerMark className="h-[1.15rem] w-[1.15rem]" />
      </div>

      <div className="relative mx-5 mt-8 h-64">
        <Tile className="left-2 top-6 h-28 w-24 rotate-[-6deg] bg-tint-amber text-tint-amber-foreground">
          <span className="text-xs font-bold">$4,250</span>
          <span className="text-[0.65rem]">Paid out</span>
        </Tile>
        <Tile className="left-[34%] top-0 h-24 w-36 bg-welcome-accent text-foreground">
          <BrandMark brand="Gymshark" className="h-6 w-6" />
          <span className="text-[0.65rem] font-semibold">Brief matched</span>
        </Tile>
        <Tile className="right-2 top-16 h-28 w-24 rotate-[5deg] bg-primary text-primary-foreground">
          <PlatformMark platform="TikTok" className="h-6 w-6" />
          <span className="text-[0.65rem] font-semibold">Live</span>
        </Tile>
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-card px-4 py-2 text-xs font-bold whitespace-nowrap text-foreground shadow-card">
          ✱ Approved · Hero Reel
        </span>
        <Tile className="bottom-0 left-6 h-16 w-20 bg-secondary text-secondary-foreground">
          <PlatformMark platform="Instagram" className="h-5 w-5" />
        </Tile>
      </div>

      <div className="mt-auto px-6 pb-10 text-center">
        <h2 className="text-[2.6rem] leading-[1.02] font-extrabold tracking-tight">
          Brand deals,
          <br />
          <span className="text-welcome-accent">done right.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xs text-base opacity-85">
          Creators run their business. Brands post briefs and get matched. One place for both.
        </p>

        <div role="radiogroup" className="mt-8 grid grid-cols-2 rounded-full border border-primary-foreground/60 p-1">
          {(["creator", "brand"] as const).map((r) => (
            <button
              key={r}
              role="radio"
              aria-checked={role === r}
              onClick={() => setRole(r)}
              className={cn(
                "h-12 rounded-full text-base font-semibold transition-colors",
                role === r ? "bg-card text-foreground" : "text-primary-foreground",
              )}
            >
              I'm a {r}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate({ to: role === "creator" ? "/" : "/brand" })}
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

function Tile({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("absolute flex flex-col items-center justify-center gap-1.5 rounded-2xl shadow-card", className)}>
      {children}
    </div>
  );
}
