import { useRouterState } from "@tanstack/react-router";
import { Link } from "@/components/alfred/ui";
import { LayoutGrid, CalendarClock, FileCheck2, Sparkles, MessageCircleMore, Plus, Briefcase } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AlfredDrawer } from "./AlfredDrawer";
import { InfluencerMark } from "./InfluencerMark";

const tabs = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/timeline", label: "Timeline", icon: CalendarClock },
  { to: "/plans", label: "Campaigns", icon: Briefcase },
  { to: "/messages", label: "Approvals", icon: FileCheck2, dot: true },
  { to: "/assistant", label: "Assistant", icon: Sparkles },
] as const;

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[520px] flex-col bg-background">
      <header className="sticky top-0 z-30 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 bg-background/85 px-5 pt-4 pb-3 backdrop-blur-xl">
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="h-11 shrink-0 rounded-full bg-card px-3 text-[0.6875rem] font-extrabold text-foreground shadow-card"
        >
          MENU
        </button>
        <h1 className="flex min-w-0 items-center justify-center gap-1.5 text-base font-bold tracking-tight text-primary">
          <span className="truncate">INFLUENCER</span>
          <InfluencerMark className="h-[1.15rem] w-[1.15rem] shrink-0" />
          <span className="sr-only">- {title}</span>
        </h1>
        <button
          aria-label="Notifications"
          className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-card shadow-card"
        >
          <MessageCircleMore className="h-5 w-5" strokeWidth={2.2} />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary" />
        </button>
      </header>

      <main className="flex-1 px-5 pb-36">{children}</main>

      <div className="pointer-events-none fixed bottom-0 z-30 w-full max-w-[520px]">
        <div className="pointer-events-auto relative">
          <Link
            to="/create"
            aria-label="Create"
            className="absolute -top-16 right-5 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_28px_-10px_var(--primary)] active:scale-[0.95]"
          >
            <Plus className="h-6 w-6" strokeWidth={2.8} />
          </Link>

          <nav className="border-t border-border/70 bg-background/95 px-2 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
            <ul className="grid grid-cols-5">
              {tabs.map((t) => {
                const active = pathname === t.to;
                const Icon = t.icon;
                return (
                  <li key={t.to}>
                    <Link
                      to={t.to}
                      className="flex flex-col items-center gap-1 py-1.5"
                      aria-current={active ? "page" : undefined}
                    >
                      <span className="relative">
                        <Icon
                          className={cn("h-6 w-6", active ? "text-primary" : "text-muted-foreground")}
                          strokeWidth={active ? 2.4 : 1.9}
                        />
                        {"dot" in t && t.dot && (
                          <span className="absolute -top-0.5 -right-1 h-2 w-2 rounded-full bg-destructive" />
                        )}
                      </span>
                      <span
                        className={cn(
                          "text-[0.6875rem]",
                          active ? "font-bold text-foreground" : "font-medium text-muted-foreground",
                        )}
                      >
                        {t.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      <AlfredDrawer open={open} onOpenChange={setOpen} />
    </div>
  );
}
