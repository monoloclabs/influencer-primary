import { useNavigate } from "@tanstack/react-router";
import { Link, IconBadge } from "@/components/alfred/ui";
import {
  X,
  ChevronRight,
  Calendar,
  Folder,
  Sparkles,
  ScrollText,
  Plug,
  User,
  CreditCard,
  Settings,
  LifeBuoy,
  DoorOpen,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { InfluencerMark } from "@/components/alfred/InfluencerMark";
import { cn } from "@/lib/utils";

type IconType = React.ComponentType<{ className?: string; strokeWidth?: number }>;
type Item = { label: string; icon: IconType; to: string; meta?: string };

const workspace: Item[] = [
  { label: "Calendar", icon: Calendar, to: "/brand/calendar", meta: "Campaign dates and deliverables" },
  { label: "Files & Documents", icon: Folder, to: "/brand/files", meta: "Briefs, contracts and assets" },
];
const ai: Item[] = [{ label: "Assistant", icon: Sparkles, to: "/brand/assistant", meta: "Draft briefs and review content" }];
const rules: Item[] = [{ label: "Instructions", icon: ScrollText, to: "/brand/instructions", meta: "Standing brand rules" }];
const account: Item[] = [
  { label: "Profile", icon: User, to: "/brand/profile" },
  { label: "Plan & Billing", icon: CreditCard, to: "/brand/plans" },
  { label: "Settings", icon: Settings, to: "/brand/settings" },
  { label: "Support", icon: LifeBuoy, to: "/brand/support" },
];

function Group({ label, children, labelClassName }: { label: string; children: React.ReactNode; labelClassName?: string }) {
  return (
    <section className="mt-7 first:mt-0">
      <p className={cn("eyebrow mb-3 px-2 text-muted-foreground", labelClassName)}>{label}</p>
      {children}
    </section>
  );
}

function LifeRow({ item, onNavigate }: { item: Item; onNavigate: () => void }) {
  const Icon = item.icon;
  return (
    <Link to={item.to} onClick={onNavigate} className="flex items-center gap-3.5 px-3 py-3.5 active:bg-surface">
      <IconBadge tone="blue" shape="squircle" size="sm">
        <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={2.2} />
      </IconBadge>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.9375rem] font-semibold text-tint-blue-foreground">{item.label}</span>
        {item.meta && <span className="block truncate text-xs text-muted-foreground">{item.meta}</span>}
      </span>
    </Link>
  );
}

function OrangeRow({ item, onNavigate }: { item: Item; onNavigate: () => void }) {
  const Icon = item.icon;
  return (
    <Link to={item.to} onClick={onNavigate} className="flex items-center gap-3.5 rounded-2xl px-2 py-2.5 active:bg-surface">
      <IconBadge tone="orange" shape="round" size="sm">
        <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={2.1} />
      </IconBadge>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.9375rem] font-semibold">{item.label}</span>
        {item.meta && <span className="block truncate text-xs text-muted-foreground">{item.meta}</span>}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60" strokeWidth={2.2} />
    </Link>
  );
}

export function BrandDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const close = () => onOpenChange(false);
  const navigate = useNavigate();
  const logout = () => {
    close();
    navigate({ to: "/welcome" });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[88vw] max-w-[380px] gap-0 overflow-y-auto border-0 bg-background p-0 no-scrollbar [&>button]:hidden"
      >
        <div className="sticky top-0 z-10 flex items-center gap-3 bg-background/95 px-5 pt-6 pb-4 backdrop-blur-xl">
          <InfluencerMark className="h-8 w-8 shrink-0 text-primary" />
          <div className="min-w-0 flex-1" />
          <button aria-label="Close menu" onClick={close} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface">
            <X className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>

        <div className="px-4 pb-12">
          <Group label="Workspace">
            <div className="divide-y divide-border/70 rounded-3xl border border-border/70 bg-card px-1.5 shadow-card">
              {workspace.map((i) => <LifeRow key={i.label} item={i} onNavigate={close} />)}
            </div>
          </Group>

          <Group label="AI">
            <div className="rounded-3xl bg-primary-soft p-1.5">
              {ai.map((i) => <OrangeRow key={i.label} item={i} onNavigate={close} />)}
            </div>
          </Group>

          <Group label="Rules">
            <div className="rounded-3xl bg-primary-soft p-1.5">
              {rules.map((i) => <OrangeRow key={i.label} item={i} onNavigate={close} />)}
            </div>
          </Group>

          <Group label="Connections">
            <Link to="/brand/integrations" onClick={close} className="flex items-center gap-3.5 rounded-3xl bg-surface px-4 py-3.5 active:opacity-80">
              <IconBadge tone="dark" shape="round" size="sm">
                <Plug className="h-[1.05rem] w-[1.05rem]" strokeWidth={2.1} />
              </IconBadge>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.9375rem] font-semibold">Integrations</span>
                <span className="block text-xs text-muted-foreground">Ads · Analytics · Payments</span>
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/60" strokeWidth={2.2} />
            </Link>
          </Group>

          <Group label="Account" labelClassName="text-primary">
            <div>
              {account.map((i) => {
                const Icon = i.icon;
                return (
                  <Link key={i.label} to={i.to} onClick={close} className="flex items-center gap-3.5 px-2 py-3 active:opacity-70">
                    <Icon className="h-5 w-5 shrink-0 text-foreground" strokeWidth={1.9} />
                    <span className="truncate text-[0.9375rem] font-semibold">{i.label}</span>
                  </Link>
                );
              })}
              <button onClick={logout} className="flex w-full items-center gap-3.5 px-2 py-3 text-left active:opacity-70">
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
