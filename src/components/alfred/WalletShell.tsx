import { Link as RouterLink, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, ArrowLeftRight, ShieldCheck, Wallet } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const walletTabs = [
  { to: "/wallet", label: "Home", icon: Wallet },
  { to: "/wallet/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/wallet/approvals", label: "Approvals", icon: ShieldCheck },
] as const;

/** Contained Wallet experience with its own bottom navigation. */
export function WalletShell({ title, children }: { title: string; children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[520px] flex-col bg-background">
      <header className="sticky top-0 z-30 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 bg-background/85 px-5 pt-4 pb-3 backdrop-blur-xl">
        <RouterLink
          to="/"
          aria-label="Back to INFLUENCER"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-card shadow-card"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.4} />
        </RouterLink>
        <h1 className="truncate text-center text-base font-bold">{title}</h1>
        <span className="h-11 w-11" />
      </header>

      <main className="flex-1 px-5 pb-32">{children}</main>

      <nav className="fixed bottom-0 z-30 w-full max-w-[520px] border-t border-border/70 bg-background/95 px-4 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
        <ul className="grid grid-cols-3">
          {walletTabs.map((t) => {
            const active = pathname === t.to;
            const Icon = t.icon;
            return (
              <li key={t.to}>
                <RouterLink
                  to={t.to}
                  className="flex flex-col items-center gap-1 py-1.5"
                  aria-current={active ? "page" : undefined}
                >
                  <Icon
                    className={cn("h-6 w-6", active ? "text-primary" : "text-muted-foreground")}
                    strokeWidth={active ? 2.4 : 1.9}
                  />
                  <span
                    className={cn(
                      "text-[0.6875rem]",
                      active ? "font-bold text-foreground" : "font-medium text-muted-foreground",
                    )}
                  >
                    {t.label}
                  </span>
                </RouterLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
