import { Link } from "@/components/alfred/ui";
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
  Repeat,
  ShoppingBag,
  Users,
  Compass,
  Library,
  Briefcase,
  Plug,
  User,
  BadgeCheck,
  Sparkles,
  UserPlus,
  LifeBuoy,
  Settings,
  DoorOpen,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { IconBadge } from "./ui";
import { user } from "@/data/alfred";
import { cn } from "@/lib/utils";

type IconType = React.ComponentType<{ className?: string; strokeWidth?: number }>;
type Item = { label: string; icon: IconType; to: string; meta?: string; blue?: boolean };

const life: Item[] = [
  { label: "Tasks", icon: CheckCircle2, to: "/tasks", meta: "4 due this week", blue: true },
  { label: "Reminders", icon: Bell, to: "/a/reminders", meta: "2 deadlines coming up", blue: true },
  { label: "Events", icon: CalendarDays, to: "/events", meta: "3 shoots this week", blue: true },
  { label: "Content calendar", icon: Calendar, to: "/a/calendar", meta: "Your posting schedule", blue: true },
  { label: "Files", icon: Folder, to: "/a/files", meta: "Briefs, contracts, invoices", blue: true },
];

const workspace: Item[] = [
  { label: "Projects", icon: Layers, to: "/a/projects" },
  { label: "Journal", icon: BookOpen, to: "/a/journal" },
  { label: "Ideas", icon: Lightbulb, to: "/a/ideas" },
];

const alfred: Item[] = [
  { label: "Instructions", icon: ScrollText, to: "/instructions", meta: "6 rules running" },
  { label: "Approvals", icon: ShieldCheck, to: "/messages", meta: "3 waiting on you" },
  { label: "Activity", icon: Activity, to: "/a/activity" },
];

const money: Item[] = [
  { label: "Wallet", icon: Wallet, to: "/wallet", meta: "Earnings and payouts" },
  { label: "Purchases", icon: ShoppingBag, to: "/a/purchases", meta: "Gear and business spend" },
  { label: "Subscription", icon: Repeat, to: "/subscription", meta: "Creator Pro · renews Oct 12" },
];

const account: Item[] = [
  { label: "Creator profile", icon: User, to: "/a/profile" },
  { label: "Media kit", icon: BadgeCheck, to: "/a/media-kit" },
  { label: "What's new", icon: Sparkles, to: "/a/whats-new" },
  { label: "Invite a creator", icon: UserPlus, to: "/a/invite" },
  { label: "Settings", icon: Settings, to: "/a/settings" },
  { label: "Support", icon: LifeBuoy, to: "/a/support" },
];

function Group({
  label,
  children,
  labelClassName,
}: {
  label: string;
  children: React.ReactNode;
  labelClassName?: string;
}) {
  return (
    <section className="mt-7 first:mt-0">
      <p className={cn("eyebrow mb-3 px-2 text-muted-foreground", labelClassName)}>{label}</p>
      {children}
    </section>
  );
}

/** Life row: divided list item, tinted icon, delta text, no chevron. */
function LifeRow({ item, onNavigate }: { item: Item; onNavigate: () => void }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      className="flex items-center gap-3.5 px-3 py-3.5 active:bg-surface"
    >
      <IconBadge tone={item.blue ? "blue" : "neutral"} shape="squircle" size="sm">
        <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={2.2} />
      </IconBadge>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block truncate text-[0.9375rem] font-semibold",
            item.blue && "text-tint-blue-foreground",
          )}
        >
          {item.label}
        </span>
        {item.meta && (
          <span className="block truncate text-xs text-muted-foreground">{item.meta}</span>
        )}
      </span>
    </Link>
  );
}

/** Alfred-section row keeps the existing contained treatment. */
function AlfredRow({ item, onNavigate }: { item: Item; onNavigate: () => void }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      className="flex items-center gap-3.5 rounded-2xl px-2 py-2.5 active:bg-surface"
    >
      <IconBadge tone="orange" shape="round" size="sm">
        <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={2.1} />
      </IconBadge>
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
            <p className="truncate text-xs text-muted-foreground">Standard · Personal</p>
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
            <div className="divide-y divide-border/70 rounded-3xl border border-border/70 bg-card px-1.5 shadow-card">
              {life.map((i) => (
                <LifeRow key={i.label} item={i} onNavigate={close} />
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
                    to={i.to}
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
                <AlfredRow key={i.label} item={i} onNavigate={close} />
              ))}
            </div>
          </Group>

          <Group label="Money">
            <div className="space-y-2.5">
              {money.map((i) => {
                const Icon = i.icon;
                return (
                  <Link
                    key={i.label}
                    to={i.to}
                    onClick={close}
                    className="flex items-center gap-4 rounded-3xl border border-border/70 bg-card px-4 py-4 shadow-card active:scale-[0.99]"
                  >
                    <Icon className="h-6 w-6 shrink-0 text-foreground" strokeWidth={2.4} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.9375rem] font-bold">{i.label}</span>
                      <span className="block truncate text-xs text-muted-foreground">{i.meta}</span>
                    </span>
                  </Link>
                );
              })}
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
              to="/office"
              onClick={close}
              className="rounded-3xl bg-tint-amber p-4 active:scale-[0.98]"
            >
              <Briefcase className="h-5 w-5 text-tint-amber-foreground" strokeWidth={2.3} />
              <p className="mt-3 text-sm font-bold">My Office</p>
              <p className="text-xs text-muted-foreground">Premium · work side of life</p>
            </Link>
          </div>

          <Group label="Discover">
            <div className="flex gap-2.5">
              <Link
                to="/a/discover"
                onClick={close}
                className="flex flex-1 items-center gap-2.5 rounded-full border border-primary/50 bg-primary-soft px-4 py-3 active:opacity-80"
              >
                <Compass className="h-[1.1rem] w-[1.1rem] text-primary" strokeWidth={2.3} />
                <span className="text-sm font-bold text-primary">Discover</span>
              </Link>
              <Link
                to="/a/research"
                onClick={close}
                className="flex flex-1 items-center gap-2.5 rounded-full border border-tint-blue-foreground/30 bg-tint-blue px-4 py-3 active:opacity-80"
              >
                <Library className="h-[1.1rem] w-[1.1rem] text-tint-blue-foreground" strokeWidth={2.3} />
                <span className="text-sm font-bold text-tint-blue-foreground">Research</span>
              </Link>
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

          <Group label="Account" labelClassName="text-primary">
            <div>
              {account.map((i) => {
                const Icon = i.icon;
                return (
                  <Link
                    key={i.label}
                    to={i.to}
                    onClick={close}
                    className="flex items-center gap-3.5 px-2 py-3 active:opacity-70"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-foreground" strokeWidth={1.9} />
                    <span className="truncate text-[0.9375rem] font-semibold">{i.label}</span>
                  </Link>
                );
              })}
              <button
                onClick={close}
                className="flex w-full items-center gap-3.5 px-2 py-3 text-left active:opacity-70"
              >
                <DoorOpen className="h-5 w-5 shrink-0 text-destructive" strokeWidth={1.9} />
                <span className="text-[0.9375rem] font-semibold text-destructive">Logout</span>
              </button>
            </div>
          </Group>
        </div>
      </SheetContent>
    </Sheet>
  );
}
