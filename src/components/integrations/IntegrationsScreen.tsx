import { useState, type ReactNode } from "react";
import { Check, Plus } from "lucide-react";
import { siGmail, siGooglecalendar, siGoogledrive, siInstagram, siYoutube, type SimpleIcon } from "simple-icons";
import { AButton } from "@/components/alfred/ui";
import { cn } from "@/lib/utils";

type Integration = {
  id: string;
  name: string;
  category: string;
  connected: boolean;
  logo: ReactNode;
};

function SimpleLogo({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden className={cn("h-8 w-8 fill-current", className)}><path d={icon.path} /></svg>;
}

function SlackLogo() {
  return <span aria-label="Slack logo" role="img" className="relative block h-8 w-8"><i className="absolute top-0 left-2.5 h-3 w-2 rounded-full bg-logo-slack-a" /><i className="absolute top-2.5 right-0 h-2 w-3 rounded-full bg-logo-slack-b" /><i className="absolute right-2.5 bottom-0 h-3 w-2 rounded-full bg-logo-slack-c" /><i className="absolute bottom-2.5 left-0 h-2 w-3 rounded-full bg-logo-slack-d" /></span>;
}

function CanvaLogo() {
  return <span aria-label="Canva logo" role="img" className="grid h-9 w-9 place-items-center rounded-full bg-logo-canva text-xl font-bold italic text-primary-foreground">C</span>;
}

const integrations: Integration[] = [
  { id: "slack", name: "Slack", category: "Team communication", connected: true, logo: <SlackLogo /> },
  { id: "gmail", name: "Gmail", category: "Email", connected: true, logo: <SimpleLogo icon={siGmail} className="text-logo-gmail-a" /> },
  { id: "drive", name: "Google Drive", category: "Files & assets", connected: true, logo: <SimpleLogo icon={siGoogledrive} className="text-logo-drive-a" /> },
  { id: "canva", name: "Canva", category: "Creative production", connected: false, logo: <CanvaLogo /> },
  { id: "youtube", name: "YouTube", category: "Channel analytics", connected: true, logo: <SimpleLogo icon={siYoutube} className="text-logo-youtube" /> },
  { id: "instagram", name: "Instagram", category: "Audience & content", connected: false, logo: <SimpleLogo icon={siInstagram} className="text-logo-instagram" /> },
  { id: "calendar", name: "Google Calendar", category: "Dates & deadlines", connected: false, logo: <SimpleLogo icon={siGooglecalendar} className="text-tint-blue-foreground" /> },
];

export function IntegrationsScreen({ accountName }: { accountName: string }) {
  const [connected, setConnected] = useState(() => new Set(integrations.filter((item) => item.connected).map((item) => item.id)));

  const toggle = (id: string) => {
    setConnected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      <div className="pt-2">
        <p className="eyebrow text-primary">Connections</p>
        <h2 className="mt-1.5 text-[2rem] leading-tight font-extrabold">Your tools, working together.</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Connect the services {accountName} already uses. This preview keeps changes on this screen only.</p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3">
        {integrations.map((item) => {
          const isConnected = connected.has(item.id);
          return (
            <article key={item.id} className="flex min-h-48 flex-col rounded-3xl border border-border/70 bg-card p-4 shadow-card">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-surface">{item.logo}</div>
              <h3 className="mt-4 text-sm font-extrabold">{item.name}</h3>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">{item.category}</p>
              <AButton aria-label={`${isConnected ? "Disconnect" : "Connect"} ${item.name}`} variant={isConnected ? "soft" : "neutral"} size="sm" onClick={() => toggle(item.id)} className="mt-auto w-full px-3">
                {isConnected ? <Check className="h-4 w-4" strokeWidth={3} /> : <Plus className="h-4 w-4" strokeWidth={3} />}
                {isConnected ? "Connected" : "Connect"}
              </AButton>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex gap-2.5">
        <AButton size="lg" className="flex-1">Browse plugins</AButton>
        <button type="button" className="flex h-14 flex-1 items-center justify-center gap-1.5 rounded-full bg-tint-blue px-4 text-[0.9375rem] leading-none font-bold text-tint-blue-foreground active:scale-[0.98]">
          <Plus className="h-4 w-4" strokeWidth={3} />
          Add
        </button>
      </div>
    </>
  );
}