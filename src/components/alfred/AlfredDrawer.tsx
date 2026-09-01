import { Link } from "@tanstack/react-router";
import {
  X,
  ChevronRight,
  CheckCircle2,
  Bell,
  CalendarDays,
  Calendar,
  Folder,
  Layers,
  BookOpen,
  Lightbulb,
  ScrollText,
  ShieldCheck,
  Activity,
  Wallet,
  ArrowLeftRight,
  Repeat,
  ShoppingBag,
  Users,
  Compass,
  Search,
  Briefcase,
  Plug,
  User,
  BadgeCheck,
  Sparkles,
  UserPlus,
  LifeBuoy,
  Settings,
  LogOut,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { IconBadge } from "./ui";
import { user } from "@/data/alfred";
import { cn } from "@/lib/utils";

type Item = { label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; to?: string; meta?: string };

const life: Item[] = [
  { label: "Tasks", icon: CheckCircle2, to: "/tasks", meta: "5 today · 2 overdue" },
  { label: "Reminders", icon: Bell, to: "/a/reminders" },
  { label: "Events", icon: CalendarDays, to: "/a/events" },
  { label: "Calendar", icon: Calendar, to: "/a/calendar" },
  { label: "Files", icon: Folder, to: "/a/files" },
];

const workspace: Item[] = [
  { label: "Projects", icon: Layers, to: "/a/projects" },
  { label: "Journal", icon: BookOpen, to: "/a/journal" },
  { label: "Ideas", icon: Lightbulb, to: "/a/ideas" },
];

const alfred: Item[] = [
  { label: "Instructions", icon: ScrollText, to: "/instructions", meta: "6 rules running" },
  { label: "Approvals", icon: ShieldCheck, to: "/approvals", meta: "3 waiting on you" },
  { label: "Activity", icon: Activity, to: "/a/activity" },
];

const money: Item[] = [
  { label: "Wallet", icon: Wallet, to: "/wallet", meta: "₦248,400" },
  { label: "Transactions", icon: ArrowLeftRight, to: "/a/transactions" },
  { label: "Subscriptions", icon: Repeat, to: "/a/subscriptions" },
  { label: "Purchases", icon: ShoppingBag, to: "/a/purchases" },
];

const account: Item[] = [
  { label: "Profile", icon: User, to: "/a/profile" },
  { label: "Plans", icon: BadgeCheck, to: "/a/plans" },
  { label: "What's New", icon: Sparkles, to: "/a/whats-new" },
  { label: "Invite a Friend", icon: UserPlus, to: "/a/invite" },
  { label: "Support", icon: LifeBuoy, to: "/a/support" },
  { label: "Settings", icon: Settings, to: "/a/settings" },
];

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-7 first:mt-0">
      <p className="eyebrow mb-3 px-2 text-muted-foreground">{label}</p>
      {children}
    </section>
  );
}

function Row({
  item,
  onNavigate,
  tone,
  shape = "squircle",
  contained = true,
}: {
  item: Item;
  onNavigate: () => void;
  tone: "orange" | "blue" | "green" | "violet" | "amber" | "neutral" | "dark";
  shape?: "round" | "squircle";
  contained?: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to ?? "/"}
      onClick={onNavigate}
      className="flex items-center gap-3.5 rounded-2xl px-2 py-2.5 active:bg-surface"
    >
      {contained ? (
        <IconBadge tone={tone} shape={shape} size="sm">
          <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={2.1} />
        </IconBadge>
      ) : (
        <span className="grid h-9 w-9 place-items-center text-foreground">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.9375rem] font-semibold">{item.label}</span>
        {item.meta && (
          <span className="block truncate text-xs text-muted-foreground">{item.meta}</span>
        )}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60" strokeWidth={2.2} />
    </Link>
  );
}

export function AlfredDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[88vw] max-w-[380px] gap-0 overflow-y-auto border-0 bg-background p-0 no-scrollbar [&>button]:hidden"
      >
        <div className="sticky top-0 z-10 flex items-center gap-3 bg-background/95 px-5 pt-6 pb-4 backdrop-blur-xl">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-foreground text-sm font-bold text-background">
            {user.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold">{user.fullName}</p>
            <p className="truncate text-xs text-muted-foreground">{user.plan} · Personal</p>
          </div>
          <button
            aria-label="Close menu"
            onClick={close}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface"
          >
            <X className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>

        <div className="px-4 pb-12">
          <Group label="Life">
            <div className="rounded-3xl bg-surface/70 p-1.5">
              {life.map((i) => (
                <Row key={i.label} item={i} onNavigate={close} tone="blue" shape="squircle" />
              ))}
            </div>
          </Group>

          <Group label="Workspace">
            <div className="grid grid-cols-3 gap-2.5">
              {workspace.map((i) => {
                const Icon = i.icon;
                return (
                  <Link
                    key={i.label}
                    to={i.to ?? "/"}
                    onClick={close}
                    className="rounded-2xl border border-border/70 bg-card p-3 text-center shadow-card active:scale-[0.98]"
                  >
                    <Icon className="mx-auto h-5 w-5 text-tint-violet-foreground" strokeWidth={2.2} />
                    <span className="mt-2 block text-xs font-semibold">{i.label}</span>
                  </Link>
                );
              })}
            </div>
          </Group>

          <Group label="Alfred">
            <div className="rounded-3xl bg-primary-soft p-1.5">
              {alfred.map((i) => (
                <Row key={i.label} item={i} onNavigate={close} tone="orange" shape="round" />
              ))}
            </div>
          </Group>

          <Group label="Money">
            <div className="rounded-3xl border border-border/70 bg-card p-1.5 shadow-card">
              {money.map((i) => (
                <Row key={i.label} item={i} onNavigate={close} tone="green" shape="round" />
              ))}
            </div>
          </Group>

          <div className="mt-7 grid grid-cols-2 gap-2.5">
            <Link
              to="/a/clique"
              onClick={close}
              className="rounded-3xl bg-tint-blue p-4 active:scale-[0.98]"
            >
              <Users className="h-5 w-5 text-tint-blue-foreground" strokeWidth={2.3} />
              <p className="mt-3 text-sm font-bold">Clique</p>
              <p className="text-xs text-muted-foreground">People who matter</p>
            </Link>
            <Link
              to="/a/my-office"
              onClick={close}
              className="rounded-3xl bg-tint-amber p-4 active:scale-[0.98]"
            >
              <Briefcase className="h-5 w-5 text-tint-amber-foreground" strokeWidth={2.3} />
              <p className="mt-3 text-sm font-bold">My Office</p>
              <p className="text-xs text-muted-foreground">Work side of life</p>
            </Link>
          </div>

          <Group label="Discover">
            <div className="flex gap-2.5">
              {[
                { label: "Discover", icon: Compass, to: "/a/discover" },
                { label: "Research", icon: Search, to: "/a/research" },
              ].map((i) => {
                const Icon = i.icon;
                return (
                  <Link
                    key={i.label}
                    to={i.to}
                    onClick={close}
                    className="flex flex-1 items-center gap-2.5 rounded-full border border-border bg-background px-4 py-3 active:bg-surface"
                  >
                    <Icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={2.2} />
                    <span className="text-sm font-semibold">{i.label}</span>
                  </Link>
                );
              })}
            </div>
          </Group>

          <Group label="Connections">
            <Link
              to="/a/integrations"
              onClick={close}
              className="flex items-center gap-3.5 rounded-3xl bg-surface px-4 py-3.5 active:opacity-80"
            >
              <IconBadge tone="dark" shape="round" size="sm">
                <Plug className="h-[1.05rem] w-[1.05rem]" strokeWidth={2.1} />
              </IconBadge>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.9375rem] font-semibold">Integrations</span>
                <span className="block text-xs text-muted-foreground">
                  Bank · Calendar · Mail · 4 connected
                </span>
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/60" strokeWidth={2.2} />
            </Link>
          </Group>

          <Group label="Account">
            <div className="divide-y divide-border/70">
              {account.map((i) => (
                <Row key={i.label} item={i} onNavigate={close} tone="neutral" contained={false} />
              ))}
            </div>
            <button
              onClick={close}
              className={cn(
                "mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-destructive px-5 py-3.5",
                "text-sm font-bold text-destructive-foreground active:scale-[0.98]",
              )}
            >
              <LogOut className="h-[1.05rem] w-[1.05rem]" strokeWidth={2.4} />
              Logout
            </button>
          </Group>
        </div>
      </SheetContent>
    </Sheet>
  );
}
