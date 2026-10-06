import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type IconProps = SVGProps<SVGSVGElement> & { active?: boolean; strokeWidth?: number };
type Artwork = { body: string; detail?: string };
const art: Record<string, Artwork> = {
  grid: { body: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z", detail: "M5 5h3 M16 5h3 M5 16h3 M16 16h3" },
  calendar: { body: "M4 5h16v16H4z", detail: "M4 10h16 M8 3v4 M16 3v4 M8 13h2 M14 13h2 M8 17h2 M14 17h2" },
  briefcase: { body: "M3 7h18v13H3z M8 7V4h8v3", detail: "M3 12q9 5 18 0 M10 12h4v4h-4z" },
  document: { body: "M5 3h10l4 4v14H5z", detail: "M15 3v5h4 M8 11h5 M8 15l2 2 5-5" },
  sparkles: { body: "M12 2l2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7z", detail: "M12 6v4 M6 12h4 M17 3v3 M3 18v3" },
  wallet: { body: "M3 6l15-3v4H3z M3 7h18v14H3z", detail: "M15 11h6v6h-6z M17 14h1 M6 10h5" },
  clock: { body: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", detail: "M12 6v6l4 3 M5 12h1 M18 12h1 M12 18v1" },
  shield: { body: "M12 2l8 4v6c0 5-8 10-8 10S4 17 4 12V6z", detail: "M8 11l3 3 5-6" },
  folder: { body: "M3 5h7l3 3h8v13H3z", detail: "M3 10h18 M6 16h8" },
  scroll: { body: "M5 3h14v15l-3 3H5z", detail: "M8 7h8 M8 11h8 M8 15h5 M16 21v-3h3" },
  users: { body: "M8 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M16 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M2 20v-4q0-5 6-5t6 5v4z M14 12q8-1 8 5v3h-6", detail: "M5 16v3 M19 16v3" },
  user: { body: "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M4 21v-3q0-5 8-5t8 5v3z", detail: "M8 17v2 M16 17v2" },
  repeat: { body: "M3 7h13V3l6 5-6 5V9H5v4H3z M21 17H8v4l-6-5 6-5v4h11v-4h2z" },
  plug: { body: "M7 3h3v5h4V3h3v5h2v4q0 5-6 5v5h-2v-5q-6 0-6-5V8h2z", detail: "M8 11h8 M9 14h6" },
  settings: { body: "M9 2h6l1 4 4 1 2 5-3 3v4l-5 3-3-2-4 1-4-4 1-4-2-3 3-5 4 1z", detail: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" },
  support: { body: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", detail: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M5 5l3 3 M16 16l3 3 M5 19l3-3 M16 8l3-3" },
  door: { body: "M4 3h11v18H4z M15 10h7l-3-3 M22 10l-3 3", detail: "M7 6v12 M11 12h1" },
  workflow: { body: "M3 3h7v6H3z M14 15h7v6h-7z M3 15h7v6H3z", detail: "M6 9v6 M10 6h7v9 M10 18h4" },
  camera: { body: "M3 7h4l2-3h6l2 3h4v14H3z", detail: "M12 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M17 10h1 M5 10h1" },
  video: { body: "M3 5h13v15H3z M16 10l6-4v13l-6-4z", detail: "M6 8h7 M6 17h5" },
  mic: { body: "M9 3q3-2 6 0v9q-3 3-6 0z M5 10v3q0 6 7 6t7-6v-3 M11 19h2v3h-2z", detail: "M10 6h4 M10 9h4" },
  plane: { body: "M10 3q2-2 4 0v6l8 5v3l-8-2v5l3 2H7l3-2v-5l-8 2v-3l8-5z", detail: "M12 4v8" },
  coins: { body: "M14 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M2 15h5l4-3h7q3 0 2 3l-7 6H7l-5-2z", detail: "M14 4v6 M12 5h4 M8 16h6" },
  mail: { body: "M3 6h18v15H3z M6 3h15v3", detail: "M3 7l9 7 9-7 M3 21l6-8 M21 21l-6-8" },
  chat: { body: "M3 3h18v14H9l-6 5z", detail: "M7 7h10 M7 11h7" },
  bag: { body: "M4 7h16l1 14H3z M8 8V5q4-5 8 0v3", detail: "M8 11v1 M16 11v1" },
  zap: { body: "M13 2L4 14h7l-1 8 10-13h-7z" },
  sliders: { body: "M3 6h18 M3 12h18 M3 18h18 M7 3h3v6H7z M14 9h3v6h-3z M6 15h3v6H6z" },
  download: { body: "M10 2h4v10h4l-6 6-6-6h4z M3 18h3v3h12v-3h3v5H3z" },
  incoming: { body: "M18 2l3 3-10 10h6v4H4V6h4v6z" },
  outgoing: { body: "M6 22l-3-3L13 9H7V5h13v13h-4v-6z" },
  arrows: { body: "M2 6h15V2l5 6-5 6v-4H2z M22 18H7v4l-5-6 5-6v4h15z" },
  plus: { body: "M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z" },
  tv: { body: "M3 6h18v13H3z M8 22h8 M12 19v3", detail: "M6 9h12v7H6z M8 2l4 4 4-4" },
  music: { body: "M9 4l12-2v14a3 3 0 1 1-3-3V7l-6 1v10a3 3 0 1 1-3-3z" },
  car: { body: "M3 10l3-6h12l3 6v10h-4v-3H7v3H3z", detail: "M5 10h14 M6 13h2 M16 13h2" },
};

function icon(name: string) {
  return function CreatorArtwork({ active = false, className, strokeWidth: _strokeWidth, ...props }: IconProps) {
    const artwork = art[name] ?? art.document;
    if (!artwork) return null;
    return <svg {...props} aria-hidden="true" viewBox="0 0 24 24" className={cn("creator-icon h-6 w-6 shrink-0", active && "creator-icon-active", className)} fill="var(--creator-icon-fill)" stroke="var(--creator-icon-outline)" strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round">
      <path d={artwork.body} />
      {artwork.detail && <path d={artwork.detail} fill="none" stroke="var(--creator-icon-detail)" strokeWidth="1.25" />}
    </svg>;
  };
}
export const LayoutGrid = icon("grid"), CalendarClock = icon("calendar"), CalendarDays = icon("calendar"), Calendar = icon("calendar");
export const Briefcase = icon("briefcase"), FileCheck2 = icon("document"), Sparkles = icon("sparkles"), Wallet = icon("wallet");
export const Clock4 = icon("clock"), Clock = icon("clock"), ShieldCheck = icon("shield"), CheckCircle2 = icon("shield"), BadgeCheck = icon("shield");
export const Folder = icon("folder"), ScrollText = icon("scroll"), Library = icon("folder"), Users = icon("users"), User = icon("user"), UserPlus = icon("users");
export const Repeat = icon("repeat"), Plug = icon("plug"), Settings = icon("settings"), LifeBuoy = icon("support"), DoorOpen = icon("door"), Workflow = icon("workflow");
export const Camera = icon("camera"), Video = icon("video"), Mic = icon("mic"), Plane = icon("plane"), HandCoins = icon("coins"), Mails = icon("mail"), MessageCircleMore = icon("chat");
export const ShoppingBag = icon("bag"), Zap = icon("zap"), SlidersHorizontal = icon("sliders"), ArrowDownToLine = icon("download"), ArrowDownLeft = icon("incoming"), ArrowUpRight = icon("outgoing"), ArrowLeftRight = icon("arrows"), Plus = icon("plus"), Tv = icon("tv"), Music = icon("music"), Car = icon("car");