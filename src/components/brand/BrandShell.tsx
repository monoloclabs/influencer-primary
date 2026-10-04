import { useRouterState } from "@tanstack/react-router";
import { Link, AButton } from "@/components/alfred/ui";
import { LayoutGrid, FilePlus2, Briefcase, FileCheck2, CalendarClock, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { InfluencerMark } from "@/components/alfred/InfluencerMark";
import { BrandDrawer } from "./BrandDrawer";

const tabs = [
  { to: "/brand", label: "Dashboard", icon: LayoutGrid },
  { to: "/brand/timeline", label: "Timeline", icon: CalendarClock },
  { to: "/brand/brief", label: "Post a Brief", icon: FilePlus2 },
  { to: "/brand/campaigns", label: "Campaigns", icon: Briefcase },
  { to: "/brand/approvals", label: "Approvals", icon: FileCheck2, dot: true },
] as const;

export function BrandShell({ title, children, focused = false }: { title: string; children: ReactNode; focused?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[520px] flex-col bg-background">
      <header className="sticky top-0 z-30 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 bg-background/85 px-5 pt-4 pb-3 backdrop-blur-xl">
        {focused ? <span aria-hidden className="w-[3.25rem]" /> : <AButton
          aria-label="Open menu"
          variant="neutral"
          onClick={() => setOpen(true)}
          className="h-11 shrink-0 bg-card px-3 text-[0.6875rem] font-extrabold text-foreground shadow-card"
        >MENU</AButton>}
        <h1 className="flex min-w-0 items-center justify-center gap-1.5 text-base font-bold tracking-tight text-primary">
          <span className="truncate">INFLUENCER</span>
          <InfluencerMark className="h-[1.15rem] w-[1.15rem] shrink-0" />
          <span className="sr-only">— {title}</span>
        </h1>
        {focused ? <Link to="/brand" aria-label="Close brief" className="grid h-11 w-11 place-items-center rounded-full bg-surface"><X className="h-5 w-5" /></Link> : <span aria-hidden className="w-[3.25rem]" />}
      </header>
      {!focused && <BrandDrawer open={open} onOpenChange={setOpen} />}

      <main className={cn("flex-1 px-5", focused ? "pb-28" : "pb-32")}>{children}</main>

      {!focused && <nav className="fixed bottom-0 z-30 w-full max-w-[520px] border-t border-border/70 bg-background/95 px-2 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
        <ul className="grid grid-cols-5">
          {tabs.map((t) => {
            const active =
              t.to === "/brand" ? pathname === "/brand" || pathname === "/brand/" : pathname.startsWith(t.to);
            const Icon = t.icon;
            return (
              <li key={t.to}>
                <Link to={t.to} className="flex flex-col items-center gap-1 py-1.5" aria-current={active ? "page" : undefined}>
                  <span className="relative">
                    <Icon className={cn("h-6 w-6", active ? "text-primary" : "text-muted-foreground")} strokeWidth={active ? 2.4 : 1.9} />
                    {"dot" in t && t.dot && <span className="absolute -top-0.5 -right-1 h-2 w-2 rounded-full bg-destructive" />}
                  </span>
                  <span className={cn("text-[0.6875rem] whitespace-nowrap", active ? "font-bold text-foreground" : "font-medium text-muted-foreground")}>
                    {t.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>}
    </div>
  );
}

export function AnonCreator({ code, tier, reach }: { code: string; tier: string; reach: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {code} · {tier} · {reach}
    </span>
  );
}

export function brandMeta(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}
