import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Handshake, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@/components/alfred/ui";
import { InfluencerMark } from "@/components/alfred/InfluencerMark";
import { BrandMark, PlatformMark } from "@/components/influencer/Marks";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "INFLUENCER, Brands and creators, in motion" },
      { name: "description", content: "Connect brands and creators, launch campaigns quickly, track live deliverables and release milestone-verified payouts." },
      { property: "og:title", content: "INFLUENCER, Brands and creators, in motion" },
      { property: "og:description", content: "Brief to live in minutes, with tracked deliverables and milestone-verified payouts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Homepage,
});

const cta = "inline-flex h-16 w-full max-w-md items-center justify-center gap-3 rounded-full text-lg font-bold active:scale-[0.98]";
const sectionHead = "mx-auto max-w-3xl text-center text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.92] font-extrabold tracking-tight";
const sectionCopy = "mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed sm:text-xl";
const sections = [["how-it-works", "How it works"], ["creators", "For creators"], ["brands", "For brands"], ["platform", "Why us"], ["questions", "Questions"]] as const;

function Homepage() {
  const [contact, setContact] = useState(false);
  const [menu, setMenu] = useState(false);
  const [partner, setPartner] = useState(false);
  const [pRole, setPRole] = useState<"Brand" | "Influencer">("Brand");
  const [pType, setPType] = useState("");
  const go = (id: string) => {
    setMenu(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 300);
  };
  return (
    <div className="min-h-screen overflow-x-clip bg-home-lime text-home-ink">
      <header className="sticky top-0 z-50 bg-home-lime/95 backdrop-blur"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-2 text-base font-extrabold text-primary">
          <span>INFLUENCER</span>
          <InfluencerMark className="h-5 w-5 text-primary" />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setContact(true)} className="inline-flex h-9 items-center rounded-full bg-home-ink px-4 text-sm font-bold text-primary-foreground active:scale-[0.98]">Contact Us</button>
          <button aria-label="Menu" onClick={() => setMenu(true)} className="grid h-9 w-9 place-items-center rounded-full bg-home-ink text-primary-foreground"><Menu className="h-5 w-5" strokeWidth={2.6} /></button>
        </div>
      </div></header>

      <main>
        {/* 1, Hero */}
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

        {/* 2, Connect / Create / Clear */}
        <section id="how-it-works" className="scroll-mt-20 bg-home-ink text-primary-foreground">
          <div className="mx-auto grid max-w-[1440px] gap-px bg-primary-foreground/15 md:grid-cols-3">
            {[["01", "Connect", "Brands find creators with the audience, fit and proof to make the work matter."], ["02", "Create", "Briefs become live campaigns with every deliverable visible as it moves."], ["03", "Clear", "Payments stay in escrow, then release automatically when milestones are verified."]].map(([number, title, copy]) => (
              <article key={number} className="bg-home-ink p-8 sm:p-10"><p className="text-sm font-extrabold text-home-lime">{number}</p><h2 className="mt-8 text-4xl font-extrabold">{title}</h2><p className="mt-4 max-w-sm text-base leading-relaxed text-primary-foreground/75">{copy}</p></article>
            ))}
          </div>
        </section>

        {/* 3, Creators (magenta, varied-size cards) */}
        <section id="creators" className="scroll-mt-20 bg-home-magenta px-5 py-20 text-primary-foreground sm:py-28">
          <h2 className={sectionHead}>Turn your audience into income.</h2>
          <p className={sectionCopy}>Discover paid brand work, run every campaign from one place, track each deliverable and see exactly when your money lands. Build a creator business, not a side hustle.</p>
          <div className="mx-auto mt-14 grid max-w-xl grid-cols-2 gap-4">
            <div className="mt-6 flex flex-col items-center justify-center rounded-[2rem] bg-home-lime p-6 text-home-ink">
              <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-home-ink/40 text-2xl font-bold">$</span>
              <p className="mt-3 text-4xl font-semibold">$13.5k</p><p className="font-bold">Earned this month</p>
            </div>
            <div className="row-span-2 rounded-[2rem] bg-card p-5 text-foreground shadow-card">
              <div className="flex items-center gap-3"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-surface"><BrandMark brand="Spotify" className="h-8 w-8" /></span><div><p className="text-sm font-bold leading-tight">Wrapped Creator Push</p><p className="text-xs text-muted-foreground">New offer · 3 deliverables</p></div></div>
              <p className="mt-3 text-3xl font-extrabold">$12,000</p>
              <div className="mt-3 flex h-11 items-center justify-center rounded-full bg-home-ink text-sm font-bold text-primary-foreground">Accept offer</div>
              <p className="mt-4 text-xs font-bold">Deliverables</p>
              {["Reel, my year in sound", "YouTube integration · 60s", "Story set"].map((d, i) => (
                <div key={d} className="flex items-center gap-2 border-b border-border py-2.5 text-xs last:border-0"><span className={`grid h-5 w-5 place-items-center rounded-full ${i === 0 ? "bg-home-lime" : "bg-surface"}`}>{i === 0 && <Check className="h-3 w-3" strokeWidth={3.5} />}</span>{d}</div>
              ))}
            </div>
            <div className="rounded-[2rem] bg-home-pink p-4 text-home-ink shadow-card">
              <div className="flex items-center gap-2"><BrandMark brand="Gymshark" className="h-7 w-7" /><p className="text-xs font-bold">Autumn Athlete</p></div>
              <p className="mt-2 text-2xl font-extrabold">$4,250</p>
              <div className="mt-2 flex h-9 items-center justify-center rounded-full bg-home-ink text-xs font-bold text-primary-foreground">Payment released</div>
            </div>
            <div className="flex items-center justify-end"><div className="flex w-3/4 flex-col items-center justify-center rounded-[2rem] bg-home-sky p-4 text-home-ink"><p className="text-3xl font-semibold">3</p><p className="text-sm font-bold">Active briefs</p></div></div>
            <div className="flex w-3/4 flex-col items-center justify-center rounded-[2rem] bg-home-pink p-5 text-home-plum">
              <p className="text-4xl font-semibold">4/4</p><p className="font-bold">Delivered</p>
            </div>
          </div>
          <div className="mt-14 flex justify-center"><Link to="/welcome" className={`${cta} bg-home-lime text-home-ink`}>Start as a creator</Link></div>
        </section>

        {/* 4, Brands (lime, stacked tilted platform cards) */}
        <section id="brands" className="scroll-mt-20 bg-home-yellow px-5 py-20 text-home-forest sm:py-28">
          <h2 className={sectionHead}>Reach the people who matter.</h2>
          <p className={sectionCopy}>Find relevant creators, build campaigns across many of them at once, manage briefs, approve work and watch progress and spend in real time.</p>
          <div className="relative mx-auto mt-14 h-[26rem] max-w-md">
            {[
              { p: "TikTok", t: "8M views", bg: "bg-home-ink text-primary-foreground", pos: "left-0 top-0" },
              { p: "Instagram", t: "3.2M reach", bg: "bg-home-coral text-home-ink", pos: "left-[16%] top-[3.5rem]" },
              { p: "YouTube", t: "1.4M views", bg: "bg-home-sky text-home-ink", pos: "left-[32%] top-[7rem]" },
              { p: "X", t: "640K impressions", bg: "bg-home-mustard text-home-ink", pos: "left-[48%] top-[10.5rem]" },
            ].map((c) => (
              <div key={c.p} className={`absolute ${c.pos} w-[52%] -rotate-6 overflow-hidden rounded-3xl bg-card shadow-card`}>
                <div className={`flex items-center gap-2 px-4 py-3 ${c.bg}`}><span className="grid h-8 w-8 place-items-center rounded-lg bg-card"><PlatformMark platform={c.p} className="h-4 w-4 text-foreground" /></span><span className="text-base font-extrabold">{c.p}</span></div>
                <div className="space-y-2 p-4 text-foreground"><p className="text-xl font-extrabold">{c.t}</p><div className="h-2 rounded-full bg-surface" /><div className="h-2 w-2/3 rounded-full bg-surface" /><div className="flex h-9 items-center justify-center rounded-full bg-home-lime text-xs font-bold text-home-ink">Approve deliverable</div></div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center"><Link to="/welcome" className={`${cta} bg-home-forest text-primary-foreground`}>Post a brief</Link></div>
        </section>

        {/* 5, Different (sage + plum stat cards) */}
        <section id="platform" className="scroll-mt-20 bg-home-sage px-5 py-20 text-home-electric sm:py-28">
          <h2 className={sectionHead}>One deal flow. Not a directory.</h2>
          <p className={sectionCopy}>Creators and brands work in the same commercial workflow. Reach becomes campaign inventory, and we run the whole deal, not just the introduction.</p>
          <div className="mx-auto mt-14 max-w-xl rounded-[2.5rem] bg-home-plum p-6 text-primary-foreground sm:p-8">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 flex items-center justify-between rounded-3xl bg-home-navy p-5"><div className="flex -space-x-2">{["Gymshark", "Sephora", "Notion"].map((b) => <span key={b} className="grid h-11 w-11 place-items-center rounded-full bg-card ring-2 ring-home-navy"><BrandMark brand={b} className="h-6 w-6" /></span>)}</div><div className="text-right"><p className="text-3xl font-semibold">24</p><p className="text-xs font-bold">Creators matched</p></div></div>
              <div className="rounded-3xl bg-home-blue p-5 text-center"><p className="text-3xl font-semibold">$48k</p><p className="text-xs font-bold">In escrow</p></div>
              <div className="rounded-3xl bg-home-pink p-5 text-center text-home-plum"><p className="text-3xl font-semibold">92%</p><p className="text-xs font-bold">Approved first pass</p></div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm font-bold">
              {["Brief", "Match", "Deliver", "Approve", "Paid"].map((s, i) => (
                <span key={s} className="flex items-center gap-2"><span className="rounded-full bg-primary-foreground/15 px-3 py-1.5">{s}</span>{i < 4 && <ArrowRight className="h-4 w-4 opacity-60" />}</span>
              ))}
            </div>
          </div>
          <div className="mt-14 flex justify-center"><Link to="/welcome" className={`${cta} bg-home-electric text-primary-foreground`}>Get started today</Link></div>
        </section>

        {/* FAQ (mustard) */}
        <section id="questions" className="scroll-mt-20 bg-home-sky px-5 py-16 text-home-ink">
          <h2 className="text-center text-4xl font-extrabold">Questions</h2>
          <Accordion type="single" collapsible className="mx-auto mt-8 max-w-2xl">
            {[
              ["How do creators get paid?", "Brand funds sit in escrow and release automatically when each milestone is approved."],
              ["How do brands find creators?", "Post a brief and we match you with creators whose audience fits your goals."],
              ["What does it cost?", "Pricing details are coming soon."],
              ["Can I be both a creator and a brand?", "Yes, pick a side on the welcome screen and switch any time."],
            ].map(([q, a]) => (
              <AccordionItem key={q} value={q ?? ""} className="border-home-ink/20">
                <AccordionTrigger className="text-left text-lg font-bold">{q}</AccordionTrigger>
                <AccordionContent className="text-base">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      {/* Footer (charcoal, vertical) */}
      <footer className="bg-home-charcoal px-6 py-14 text-primary-foreground sm:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center gap-2 text-lg font-extrabold text-primary"><span>INFLUENCER</span><InfluencerMark className="h-6 w-6 text-primary" /></div>
          <div className="mt-8 flex gap-6">{["X", "YouTube", "Instagram", "TikTok"].map((p) => <PlatformMark key={p} platform={p} className="h-7 w-7 text-primary-foreground" />)}</div>
          <div className="mt-12 grid max-w-lg grid-cols-2 gap-8">
            {[["Company", ["About", "Blog", "Contact"]], ["Explore", ["Products", "Partnerships", "Pricing"]]].map(([h, items]) => (
              <div key={h as string}><p className="text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground/80">{h}</p><ul className="mt-5 space-y-4">{(items as string[]).map((i) => <li key={i} className="text-lg text-primary-foreground/60">{i === "Partnerships" ? <button onClick={() => setPartner(true)}>{i}</button> : i === "Contact" ? <button onClick={() => setContact(true)}>{i}</button> : i}</li>)}</ul></div>
            ))}
          </div>
        </div>
      </footer>

      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent side="right" hideClose className="flex w-[85%] flex-col border-0 bg-home-ink px-6 pt-6 pb-8 text-primary-foreground">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-base font-extrabold text-primary">INFLUENCER <InfluencerMark className="h-5 w-5 text-primary" /></SheetTitle>
            <SheetClose aria-label="Close menu" className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/15 active:scale-95"><X className="h-4 w-4" strokeWidth={3} /></SheetClose>
          </div>
          <nav className="mt-10 flex flex-col gap-1">
            {sections.map(([id, label]) => (
              <button key={id} onClick={() => go(id)} className="flex items-center justify-between rounded-2xl px-2 py-3 text-left text-2xl font-extrabold active:bg-primary-foreground/10">{label}<ArrowRight className="h-5 w-5 opacity-50" strokeWidth={3} /></button>
            ))}
            <button onClick={() => { setMenu(false); setPartner(true); }} className="mt-2 flex items-center justify-between rounded-2xl bg-home-lime px-4 py-3 text-left text-2xl font-extrabold text-home-ink">Partnerships<Handshake className="h-6 w-6" strokeWidth={2.6} /></button>
          </nav>
          <Link to="/welcome" className="mt-auto inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary text-base font-bold text-primary-foreground">Get Started <ArrowRight className="h-5 w-5" strokeWidth={3} /></Link>
        </SheetContent>
      </Sheet>

      <Sheet open={partner} onOpenChange={setPartner}>
        <SheetContent side="bottom" hideClose className="max-h-[92svh] overflow-y-auto rounded-t-[2rem] border-0 px-5 pt-6 pb-10">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-extrabold">Partner with us</SheetTitle>
            <SheetClose aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full bg-surface active:scale-95"><X className="h-4 w-4" strokeWidth={3} /></SheetClose>
          </div>
          <div className="mt-5 grid grid-cols-2 rounded-full bg-surface p-1">
            {(["Brand", "Influencer"] as const).map((r) => (
              <button key={r} type="button" onClick={() => { setPRole(r); setPType(""); }} className={`h-11 rounded-full text-sm font-bold ${pRole === r ? "bg-home-ink text-primary-foreground" : "text-muted-foreground"}`}>{r}</button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setPartner(false); toast.success("Thanks, we will be in touch soon."); }} className="mt-5 space-y-4">
            <div>
              <p className="mb-2 text-sm font-bold">Type of partnership</p>
              <div className="flex flex-wrap gap-2">
                {(pRole === "Brand" ? ["Campaign", "Long-term ambassador", "Agency", "Integration", "Other"] : ["Brand deals", "Management", "Events", "Affiliate", "Other"]).map((t) => (
                  <button key={t} type="button" onClick={() => setPType(t)} className={`rounded-full px-4 py-2 text-sm font-bold ${pType === t ? "bg-primary text-primary-foreground" : "bg-surface"}`}>{t}</button>
                ))}
              </div>
            </div>
            {[
              ["Contact number", "tel", "+234 800 000 0000"],
              ["Email", "email", "you@company.com"],
              ["Social handle", "text", "@handle"],
              ["Website", "url", "https://"],
            ].map(([l, t, p]) => (
              <label key={l} className="block">
                <span className="mb-1.5 block text-sm font-bold">{l}</span>
                <input type={t} placeholder={p} required={l === "Email"} className="h-12 w-full rounded-2xl bg-surface px-4 text-base outline-none focus:ring-2 focus:ring-primary" />
              </label>
            ))}
            <button type="submit" className="h-14 w-full rounded-full bg-home-ink text-base font-bold text-primary-foreground active:scale-[0.98]">Send request</button>
          </form>
        </SheetContent>
      </Sheet>

      <Sheet open={contact} onOpenChange={setContact}>
        <SheetContent side="bottom" hideClose className="rounded-t-[2rem] border-0 px-5 pt-6 pb-10">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-extrabold">Get in touch</SheetTitle>
            <SheetClose aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full bg-surface active:scale-95"><X className="h-4 w-4" strokeWidth={3} /></SheetClose>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { l: "Email", Icon: Mail, bg: "bg-home-sky" },
              { l: "WhatsApp", Icon: MessageCircle, bg: "bg-home-lime" },
              { l: "Call", Icon: Phone, bg: "bg-home-coral" },
            ].map(({ l, Icon, bg }) => (
              <button key={l} onClick={() => setContact(false)} className={`flex flex-col items-center gap-3 rounded-3xl ${bg} p-5 text-home-ink active:scale-[0.97]`}>
                <span className="grid h-14 w-14 place-items-center rounded-full bg-home-ink text-primary-foreground"><Icon className="h-7 w-7" fill="currentColor" strokeWidth={1.5} /></span>
                <span className="font-bold">{l}</span>
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
