import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/components/alfred/ui";
import { InfluencerMark } from "@/components/alfred/InfluencerMark";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "INFLUENCER — Brands and creators, in motion" },
      { name: "description", content: "Connect brands and creators, launch campaigns quickly, track live deliverables and release milestone-verified payouts." },
      { property: "og:title", content: "INFLUENCER — Brands and creators, in motion" },
      { property: "og:description", content: "Brief to live in minutes, with tracked deliverables and milestone-verified payouts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Homepage,
});

function Homepage() {
  return (
    <div className="min-h-screen overflow-hidden bg-home-lime text-home-ink">
      <header className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-2 text-base font-extrabold">
          <span>INFLUENCER</span>
          <InfluencerMark className="h-5 w-5 text-primary" />
        </div>
        <Link to="/welcome" className="inline-flex h-11 items-center rounded-full bg-home-ink px-5 text-sm font-bold text-primary-foreground active:scale-[0.98]">Get Started</Link>
      </header>

      <main>
        <section className="mx-auto grid min-h-[calc(min(100svh,52rem)-5.25rem)] max-w-[1440px] content-between px-5 pt-8 pb-6 sm:px-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(22rem,0.7fr)] lg:gap-10 lg:px-12 lg:pt-14">
          <div className="relative z-10">
            <p className="mb-5 max-w-xl text-sm font-bold uppercase tracking-[0.12em]">One platform. Both sides of the deal.</p>
            <h1 className="max-w-5xl text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.86] font-extrabold">Real reach.<br />Real work.<br /><span className="text-primary">Paid right.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed font-semibold sm:text-xl">Brands meet creators who move real audiences. Creators turn influence into a business.</p>
            <Link to="/welcome" className="mt-8 inline-flex h-16 items-center gap-3 rounded-full bg-primary px-7 text-base font-bold text-primary-foreground shadow-card active:scale-[0.98]">Get Started <ArrowRight className="h-5 w-5" strokeWidth={3} /></Link>
          </div>

          <div className="relative mt-12 min-h-[24rem] lg:mt-0 lg:min-h-0">
            <div className="absolute top-2 right-0 w-[82%] rotate-3 rounded-[2rem] bg-home-lilac p-5 shadow-card sm:w-[72%] lg:w-full">
              <p className="text-xs font-extrabold uppercase tracking-[0.12em]">Campaign velocity</p><p className="mt-4 text-5xl font-extrabold">Brief → live</p><p className="mt-2 text-lg font-bold">in minutes, not weeks.</p>
            </div>
            <div className="absolute top-40 left-0 w-[74%] -rotate-3 rounded-[2rem] bg-home-coral p-5 text-home-ink shadow-card sm:w-[60%] lg:top-[44%] lg:w-[78%]">
              <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-full bg-home-ink text-primary-foreground"><Check className="h-6 w-6" strokeWidth={3.5} /></span><span className="text-xs font-extrabold uppercase tracking-[0.12em]">Verified</span></div>
              <p className="mt-8 text-3xl font-extrabold">$12,500 released</p><p className="mt-1 font-bold">Milestone complete</p>
            </div>
            <div className="absolute right-2 bottom-0 w-[56%] rotate-2 rounded-[2rem] bg-home-sky p-5 shadow-card sm:w-[44%] lg:w-[62%]"><p className="text-4xl font-extrabold">4/4</p><p className="mt-1 font-bold">Deliverables tracked live</p></div>
          </div>
        </section>

        <section className="bg-home-ink text-primary-foreground">
          <div className="mx-auto grid max-w-[1440px] gap-px bg-primary-foreground/15 md:grid-cols-3">
            {[["01", "Connect", "Brands find creators with the audience, fit and proof to make the work matter."], ["02", "Create", "Briefs become live campaigns with every deliverable visible as it moves."], ["03", "Clear", "Payments stay in escrow, then release automatically when milestones are verified."]].map(([number, title, copy]) => (
              <article key={number} className="bg-home-ink p-8 sm:p-10"><p className="text-sm font-extrabold text-home-lime">{number}</p><h2 className="mt-8 text-4xl font-extrabold">{title}</h2><p className="mt-4 max-w-sm text-base leading-relaxed text-primary-foreground/75">{copy}</p></article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}