import { useState } from "react";
import { Plus, X } from "lucide-react";
import { siSnapchat } from "simple-icons";
import { AButton } from "@/components/alfred/ui";
import { PlatformMark } from "./Marks";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const platforms = ["TikTok", "Instagram", "Facebook", "X", "Snapchat", "YouTube"] as const;
type Platform = typeof platforms[number];
function SocialLogo({ platform }: { platform: Platform }) {
  if (platform === "Snapchat") return <svg role="img" aria-label="Snapchat logo" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><title>Snapchat</title><path d={siSnapchat.path} /></svg>;
  return <PlatformMark platform={platform} className="h-5 w-5" />;
}

export function SocialHandlesField() {
  const [rows, setRows] = useState<{ id: number; platform: Platform; handle: string }[]>([{ id: 0, platform: "TikTok", handle: "" }]);
  const [nextId, setNextId] = useState(1);
  return <fieldset className="space-y-2">
    <legend className="mb-1.5 text-sm font-bold">Social handles</legend>
    {rows.map((row, index) => <div key={row.id} className="flex min-w-0 items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <AButton type="button" variant="neutral" size="icon" className="h-12 w-12 shrink-0 rounded-2xl text-foreground" aria-label={`Select platform for social handle ${index + 1}, currently ${row.platform}`}><SocialLogo platform={row.platform} /></AButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="z-[60] min-w-0">
          {platforms.map(platform => <DropdownMenuItem key={platform} aria-label={platform} title={platform} className="h-11 justify-center px-4 [&>svg]:size-5" onSelect={() => setRows(current => current.map(item => item.id === row.id ? { ...item, platform } : item))}><SocialLogo platform={platform} /><span className="sr-only">{platform}</span></DropdownMenuItem>)}
        </DropdownMenuContent>
      </DropdownMenu>
      <label className="flex h-12 min-w-0 flex-1 items-center gap-1 rounded-2xl bg-surface px-3 focus-within:ring-2 focus-within:ring-primary">
        <span aria-hidden className="text-muted-foreground">@</span>
        <span className="sr-only">{row.platform} handle {index + 1}</span>
        <input type="text" name={`social-handle-${row.id}`} value={row.handle} onChange={event => setRows(current => current.map(item => item.id === row.id ? { ...item, handle: event.target.value } : item))} placeholder="handle" className="min-w-0 w-full bg-transparent text-base outline-none" />
      </label>
      <AButton type="button" variant="ghost" size="icon" className="h-10 w-8 shrink-0 px-0" aria-label={`Add social handle below row ${index + 1}`} title="Add social handle" onClick={() => { setRows(current => { const added = [...current]; added.splice(index + 1, 0, { id: nextId, platform: platforms.find(platform => !current.some(item => item.platform === platform)) ?? "TikTok", handle: "" }); return added; }); setNextId(value => value + 1); }}><Plus className="h-5 w-5" /></AButton>
      {rows.length > 1 && <AButton type="button" variant="ghost" size="icon" className="h-10 w-7 shrink-0 px-0" aria-label={`Remove social handle ${index + 1}`} title="Remove social handle" onClick={() => setRows(current => current.filter(item => item.id !== row.id))}><X className="h-4 w-4" /></AButton>}
    </div>)}
  </fieldset>;
}