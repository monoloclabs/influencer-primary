import { useRouterState } from "@tanstack/react-router";
import { Link } from "@/components/alfred/ui";
import { Bell, Home, CalendarClock, SquarePen, MessageSquare, Sparkles, Menu } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AlfredDrawer } from "./AlfredDrawer";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/timeline", label: "Timeline", icon: CalendarClock },
  { to: "/create", label: "Create", icon: SquarePen, badge: true },
  { to: "/messages", label: "Messages", icon: MessageSquare, dot: true },
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
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-card shadow-card"
        >
          <Menu className="h-5 w-5" strokeWidth={2.4} />
        </button>
        <h1 className="truncate text-center text-base font-bold">{title}</h1>
        <button
          aria-label="Notifications"
          className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-card shadow-card"
        >
          <Bell className="h-5 w-5" strokeWidth={2.2} />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary" />
        </button>
      </header>

      <main className="flex-1 px-5 pb-32">{children}</main>

      <nav className="fixed bottom-0 z-30 w-full max-w-[520px] border-t border-border/70 bg-background/95 px-2 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
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
                    {"badge" in t && t.badge && (
                      <span className="absolute -top-1 -right-1.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-foreground text-[9px] font-bold text-background">
                        +
                      </span>
                    )}
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

      <AlfredDrawer open={open} onOpenChange={setOpen} />
    </div>
  );
}
