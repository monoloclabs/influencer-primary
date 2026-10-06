import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type IconProps = SVGProps<SVGSVGElement> & { active?: boolean; strokeWidth?: number };
type Artwork = { body?: string; detail?: string };

const art: Record<string, Artwork> = {
  grid: { body: "M3 3h7v7H3zm11 0h7v7h-7zm-11 11h7v7H3zm11 0h7v7h-7z", detail: "M5 5h3 M16 5h3 M5 16h3 M16 16h3" },
  calendar: { body: "M4 5h16v15H4z M8 3v4 M16 3v4", detail: "M4 10h16 M8 13h2 M14 13h2 M8 17h2 M14 17h2" },
  briefcase: { body: "M3 7h18v13H3z M8 7V4h8v3", detail: "M3 12h18 M10 12h4v4h-4z" },
  document: { body: "M6 3h9l5 5v13H6z M15 3v5h5", detail: "M9 9h6 M9 13h7 M9 17h7" },
  sparkles: { body: "M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5z", detail: "M12 6v2 M6 12h2 M16 12h2 M12 18v-2" },
  wallet: { body: "M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5V7.5z M4 10h16", detail: "M15 13h5 M15 16h3 M8 10h5" },
  clock: { body: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", detail: "M12 7v5l4 2 M5 12h2 M17 12h2" },
  shield: { body: "M12 2l8 4v6c0 5-8 10-8 10S4 17 4 12V6z", detail: "M8 11l3 3 5-6" },
  folder: { body: "M3 6h7l2 3h9v10H3z M3 9h18", detail: "M6 14h12 M6 17h9" },
  scroll: { body: "M6 3h12a2 2 0 0 1 2 2v15l-3-2-3 2-3-2-3 2-3-2V5a2 2 0 0 1 2-2z", detail: "M9 8h6 M9 12h8 M9 16h5" },
  users: { body: "M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 19v-2a5 5 0 0 1 10 0v2zm12 0v-2a5 5 0 0 1 8 0v2", detail: "M5 16v3 M19 16v3" },
  user: { body: "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-8 18v-2a6 6 0 0 1 12 0v2", detail: "M8 18v-2 M16 18v-2" },
  repeat: { body: "M4 8h13V5l6 5-6 5v-3H6v4H4zm16 8H7v3l-6-5 6-5v3h11v-4h2z", detail: "M10 8h7 M14 16h-7" },
  plug: { body: "M8 2v5h8V2h3v5h2v4a6 6 0 0 1-12 0V7h2V2z", detail: "M10 11h4 M12 11v7" },
  settings: { body: "M12 3.5a1 1 0 0 1 1 1V5a1 1 0 0 1-2 0v-.5a1 1 0 0 1 1-1zm0 15.5a1 1 0 0 1 1 1V20a1 1 0 0 1-2 0v-.5a1 1 0 0 1 1-1zm8.5-6.5a1 1 0 0 1 1 1v.5a1 1 0 0 1-2 0v-.5a1 1 0 0 1 1-1zm-15.5 0a1 1 0 0 1 1 1v.5a1 1 0 0 1-2 0v-.5a1 1 0 0 1 1-1zm12.2-7.1l.7.7a1 1 0 0 1-1.4 1.4l-.7-.7a1 1 0 0 1 1.4-1.4zm-10.4 10.4l.7.7a1 1 0 0 1-1.4 1.4l-.7-.7a1 1 0 0 1 1.4-1.4zm0-10.4l-.7.7a1 1 0 1 1-1.4-1.4l.7-.7a1 1 0 0 1 1.4 1.4zm10.4 10.4l-.7.7a1 1 0 1 1-1.4-1.4l.7-.7a1 1 0 0 1 1.4 1.4z", detail: "M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" },
  support: { body: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", detail: "M6 6l3 3 M15 15l3 3 M18 6l-3 3 M9 15l-3 3" },
  door: { body: "M5 3h9v18H5z M14 9h5v9h-5", detail: "M8 11h2 M8 15h2" },
  workflow: { body: "M3 4h7v5H3zm11 11h7v5h-7zM3 15h7v5H3z", detail: "M6 9v6 M10 6h7v9 M10 18h4" },
  camera: { body: "M3 7h4l2-3h6l2 3h4v14H3z", detail: "M12 10a4 4 0 1 1 0 8 4 4 0 0 1 0-8z M17 9h1 M5 9h1" },
  video: { body: "M3 6h13v12H3z M16 10l5-4v12l-5-4z", detail: "M7 9h7 M7 15h5" },
  mic: { body: "M9 3a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0zm-2 7v2a5 5 0 0 0 10 0v-2", detail: "M12 18v3 M9 21h6" },
  plane: { body: "M11 2l2 6 8 4-8 2-2 7-2-7-8-2 8-4 2-6z", detail: "M12 7v4 M12 13v1" },
  coins: { body: "M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm-9 11a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v4H3z", detail: "M12 5v5 M9 7h6 M7 17h10" },
  mail: { body: "M3 6h18v12H3z M4 7l8 6 8-6", detail: "M4 18l6-6 M20 18l-6-6" },
  chat: { body: "M3 4h18v12h-8l-6 5v-5H3z", detail: "M7 8h10 M7 12h7" },
  bag: { body: "M4 8h16l-1 12H5z M8 8V6a4 4 0 1 1 8 0v2", detail: "M8 12v2 M16 12v2" },
  zap: { body: "M13 2L4 13h7l-1 9 10-11h-7l1-9z", detail: "M9 8h4" },
  sliders: { body: "M3 6h18 M3 12h18 M3 18h18 M7 3v6 M14 9v6 M19 15v6", detail: "M7 8h2 M14 14h2 M19 20h2" },
  download: { body: "M12 3v10m-4-4l4 4 4-4 M4 18h16", detail: "M6 21h12" },
  incoming: { body: "M4 9l8 8 8-8 M12 17V4", detail: "M6 8l6-6 6 6" },
  outgoing: { body: "M20 15l-8-8-8 8 M12 7v13", detail: "M18 11l-6 6-6-6" },
  arrows: { body: "M3 7h12V3l6 6-6 6V9H3z M21 17H9v4l-6-6 6-6v4h12z", detail: "M8 8h7 M15 16h-7" },
  plus: { body: "M12 3v18 M3 12h18", detail: "M12 3v18 M3 12h18" },
  tv: { body: "M3 5h18v12H3z M8 19h8", detail: "M7 9h10v8H7z" },
  music: { body: "M9 4l12-2v14a3 3 0 1 1-3-3V7l-6 1v10a3 3 0 1 1-3-3z", detail: "M9 8h8" },
  car: { body: "M3 12l3-6h12l3 6v6h-3l-1 3H7l-1-3H3z", detail: "M6 12h12 M7 15h2 M15 15h2" },
};

function icon(name: string) {
  return function CreatorArtwork({ active = false, className, strokeWidth = 1.8, ...props }: IconProps) {
    const artwork = art[name] ?? art.document;
    const body = artwork.body ?? "";
    const detail = artwork.detail ?? "";

    return (
      <svg
        {...props}
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={cn("creator-icon h-6 w-6 shrink-0", active && "creator-icon-active", className)}
        fill="var(--creator-icon-fill)"
        stroke="var(--creator-icon-outline)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {body && <path d={body} fill="var(--creator-icon-fill)" stroke="var(--creator-icon-outline)" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />}
        {detail && <path d={detail} fill="none" stroke="var(--creator-icon-detail)" strokeWidth={Math.max(1.1, strokeWidth * 0.8)} strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
    );
  };
}

export const LayoutGrid = icon("grid"), CalendarClock = icon("calendar"), CalendarDays = icon("calendar"), Calendar = icon("calendar");
export const Briefcase = icon("briefcase"), FileCheck2 = icon("document"), Sparkles = icon("sparkles"), Wallet = icon("wallet");
export const Clock4 = icon("clock"), Clock = icon("clock"), ShieldCheck = icon("shield"), CheckCircle2 = icon("shield"), BadgeCheck = icon("shield");
export const Folder = icon("folder"), ScrollText = icon("scroll"), Library = icon("folder"), Users = icon("users"), User = icon("user"), UserPlus = icon("users");
export const Repeat = icon("repeat"), Plug = icon("plug"), Settings = icon("settings"), LifeBuoy = icon("support"), DoorOpen = icon("door"), Workflow = icon("workflow");
export const Camera = icon("camera"), Video = icon("video"), Mic = icon("mic"), Plane = icon("plane"), HandCoins = icon("coins"), Mails = icon("mail"), MessageCircleMore = icon("chat");
export const ShoppingBag = icon("bag"), Zap = icon("zap"), SlidersHorizontal = icon("sliders"), ArrowDownToLine = icon("download"), ArrowDownLeft = icon("incoming"), ArrowUpRight = icon("outgoing");
export const ArrowLeftRight = icon("arrows");
export const FileSignature = icon("document");
export const Handshake = icon("users");
export const ScissorsLineDashed = icon("scissors") as typeof icon("document");
export const Car = icon("car");
export const Tv = icon("tv");
export const Send = icon("outgoing");
export const CircleCheck = icon("shield");
export const FileText = icon("document");
export const UserRound = icon("user");
export const Plus = icon("plus");
export const Check = icon("shield");
