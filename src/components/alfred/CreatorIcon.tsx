import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type IconProps = SVGProps<SVGSVGElement> & { active?: boolean; strokeWidth?: number };
type Artwork = { body?: string; detail?: string };

const art: Record<string, Artwork> = {
  grid: { body: "M5.5 3h3a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 8.5 11h-3A2.5 2.5 0 0 1 3 8.5v-3A2.5 2.5 0 0 1 5.5 3zm10 0h3A2.5 2.5 0 0 1 21 5.5v3a2.5 2.5 0 0 1-2.5 2.5h-3A2.5 2.5 0 0 1 13 8.5v-3A2.5 2.5 0 0 1 15.5 3zm-10 10h3a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 8.5 21h-3A2.5 2.5 0 0 1 3 18.5v-3A2.5 2.5 0 0 1 5.5 13zm10 0h3a2.5 2.5 0 0 1 2.5 2.5v3a2.5 2.5 0 0 1-2.5 2.5h-3a2.5 2.5 0 0 1-2.5-2.5v-3a2.5 2.5 0 0 1 2.5-2.5z", detail: "M6 6.5h2 M16 6.5h2" },
  calendar: { body: "M7 4.5h10a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3z", detail: "M4.5 9.5h15 M8.5 3v3 M15.5 3v3 M8.5 13.5h.5 M12 13.5h.5 M15.5 13.5h.5 M8.5 17h.5 M12 17h.5" },
  clapper: { body: "M5 9.5h14a1.5 1.5 0 0 1 1.5 1.5v7a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3v-7A1.5 1.5 0 0 1 5 9.5z M4 7.2l13.4-3.6a1.5 1.5 0 0 1 1.8 1l.4 1.4a1 1 0 0 1-.7 1.2L5.4 10.8a1 1 0 0 1-1.2-.7l-.4-1.4A1.3 1.3 0 0 1 4 7.2z", detail: "M8.5 5.9l2 3 M13 4.7l2 3 M10 14.5l4 1.8-4 1.8z" },
  history: { body: "M12 3a9 9 0 1 1-8.6 6.3", detail: "M3.4 4.5v4.8h4.8 M12 7.5V12l3 2" },
  check: { body: "M12 2.8a9.2 9.2 0 1 1 0 18.4 9.2 9.2 0 0 1 0-18.4z", detail: "M8 12.3l2.7 2.7L16 9.7" },
  store: { body: "M4.5 10.5V18a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-7.5 M5.6 3.5h12.8a1.5 1.5 0 0 1 1.4 1l1.1 3.2a2.6 2.6 0 0 1-2.5 3.3 2.7 2.7 0 0 1-2.7-2.2 2.7 2.7 0 0 1-5.4 0 2.7 2.7 0 0 1-5.4 0A2.7 2.7 0 0 1 2.2 7.7l1.4-3.2a1.5 1.5 0 0 1 1.4-1z", detail: "M10 21v-4a2 2 0 0 1 4 0v4" },
  subscription: { body: "M6 5h12a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-4.5 M10 17H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z", detail: "M3.5 9.5h17 M6.5 13.5h3 M17.8 19.5a3 3 0 1 1-.7-4.6 M17.6 13.3l-.2 1.8 1.8.3" },
  bell: { body: "M12 3a6 6 0 0 1 6 6v3.5c0 1.2.5 2.3 1.4 3.1.4.4.1 1.1-.5 1.1H5.1c-.6 0-.9-.7-.5-1.1.9-.8 1.4-1.9 1.4-3.1V9a6 6 0 0 1 6-6z", detail: "M10 19.5a2 2 0 0 0 4 0" },
  briefcase: { body: "M6 7h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z M8.5 7V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2V7", detail: "M3.5 12.5c5.5 2.5 11.5 2.5 17 0 M11 14h2" },
  document: { body: "M8.5 3h7a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z", detail: "M9 8h6 M9 12h6 M9 16h3.5" },
  sparkles: { body: "M11 3.5c.5 3.6 2.4 5.5 6 6-3.6.5-5.5 2.4-6 6-.5-3.6-2.4-5.5-6-6 3.6-.5 5.5-2.4 6-6z M18 14.5c.3 1.9 1.1 2.7 3 3-1.9.3-2.7 1.1-3 3-.3-1.9-1.1-2.7-3-3 1.9-.3 2.7-1.1 3-3z", detail: "" },
  wallet: { body: "M6.5 5H18a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 18 19H6.5A3 3 0 0 1 3.5 16V8A3 3 0 0 1 6.5 5z M14.5 10h6v4h-6a2 2 0 0 1 0-4z", detail: "M16 12h.5 M6.5 8.5h5" },
  clock: { body: "M12 2.8a9.2 9.2 0 1 1 0 18.4 9.2 9.2 0 0 1 0-18.4z", detail: "M12 7.5V12l3 2" },
  shield: { body: "M11.2 2.6a2 2 0 0 1 1.6 0l5.7 2.4A2 2 0 0 1 19.8 7v4.5c0 4.6-3.6 8.2-7 9.6a2 2 0 0 1-1.6 0c-3.4-1.4-7-5-7-9.6V7a2 2 0 0 1 1.3-2z", detail: "M8.8 11.8l2.3 2.3 4-4.2" },
  folder: { body: "M5.5 4.5h3.3a2 2 0 0 1 1.6.8l1.1 1.5a2 2 0 0 0 1.6.7h5.4a2.5 2.5 0 0 1 2.5 2.5v7.5a3 3 0 0 1-3 3H5.5a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3z", detail: "M3 10.5h18 M7 15h6" },
  scroll: { body: "M7 3.5h10a2.5 2.5 0 0 1 2.5 2.5v10.5 M7 3.5A2.5 2.5 0 0 0 4.5 6v.5h2.5 M7 3.5A2.5 2.5 0 0 1 9.5 6v12a2.5 2.5 0 0 0 5 0v-1.5h5V18a2.5 2.5 0 0 1-2.5 2.5h-5", detail: "M12.5 8h4 M12.5 11.5h4" },
  users: { body: "M8.5 4a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4z M2.5 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 19z M16 5a2.8 2.8 0 1 1 0 5.6", detail: "M17 13.6c2.6.4 4.5 2.3 4.5 5a1.5 1.5 0 0 1-1.5 1.5h-2.5" },
  user: { body: "M12 3.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z M4.5 19c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 19z", detail: "" },
  repeat: { body: "M4 11V9.5A3.5 3.5 0 0 1 7.5 6H19 M16 3l3 3-3 3 M20 13v1.5a3.5 3.5 0 0 1-3.5 3.5H5 M8 21l-3-3 3-3", detail: "" },
  plug: { body: "M7 8.5h10v3a5 5 0 0 1-10 0z M12 16.5v4", detail: "M9.5 3.5v5 M14.5 3.5v5" },
  settings: { body: "M10.4 3.2a1.6 1.6 0 0 1 3.2 0l.2 1a1.6 1.6 0 0 0 2.3 1l.9-.5a1.6 1.6 0 0 1 2.2 2.3l-.5.9a1.6 1.6 0 0 0 1 2.3l1 .2a1.6 1.6 0 0 1 0 3.2l-1 .2a1.6 1.6 0 0 0-1 2.3l.5.9a1.6 1.6 0 0 1-2.2 2.3l-.9-.5a1.6 1.6 0 0 0-2.3 1l-.2 1a1.6 1.6 0 0 1-3.2 0l-.2-1a1.6 1.6 0 0 0-2.3-1l-.9.5a1.6 1.6 0 0 1-2.2-2.3l.5-.9a1.6 1.6 0 0 0-1-2.3l-1-.2a1.6 1.6 0 0 1 0-3.2l1-.2a1.6 1.6 0 0 0 1-2.3l-.5-.9a1.6 1.6 0 0 1 2.2-2.3l.9.5a1.6 1.6 0 0 0 2.3-1z", detail: "M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" },
  support: { body: "M12 2.8a9.2 9.2 0 1 1 0 18.4 9.2 9.2 0 0 1 0-18.4z", detail: "M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z M6 6l3 3 M15 15l3 3 M18 6l-3 3 M9 15l-3 3" },
  door: { body: "M7 3.5h6.5a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z", detail: "M12 12h.5 M18 9l3 3-3 3 M21 12h-5" },
  workflow: { body: "M5.5 3h3A2.5 2.5 0 0 1 11 5.5v1A2.5 2.5 0 0 1 8.5 9h-3A2.5 2.5 0 0 1 3 6.5v-1A2.5 2.5 0 0 1 5.5 3z M15.5 15h3a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-2.5 2.5h-3a2.5 2.5 0 0 1-2.5-2.5v-1a2.5 2.5 0 0 1 2.5-2.5z", detail: "M7 9v4a3 3 0 0 0 3 3h3" },
  camera: { body: "M6 7h1.5l1.3-1.9a2 2 0 0 1 1.7-.9h3a2 2 0 0 1 1.7.9L16.5 7H18a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3z", detail: "M12 10a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z M17.5 10h.5" },
  video: { body: "M6 5.5h7.5a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3z M16.5 10.5l3.4-2.3a1 1 0 0 1 1.6.8v6a1 1 0 0 1-1.6.8l-3.4-2.3", detail: "M7 9.5h3" },
  mic: { body: "M12 2.8a3.2 3.2 0 0 1 3.2 3.2v5.5a3.2 3.2 0 0 1-6.4 0V6A3.2 3.2 0 0 1 12 2.8z", detail: "M5.5 11a6.5 6.5 0 0 0 13 0 M12 17.5V21" },
  plane: { body: "M10.2 4a1.8 1.8 0 0 1 3.6 0v5l6.5 3.6a1.5 1.5 0 0 1 .7 1.3v.7a.8.8 0 0 1-1 .8l-6.2-1.7V18l2 1.5a.8.8 0 0 1 .3.6v.4a.6.6 0 0 1-.8.6L12 20l-3.3 1.1a.6.6 0 0 1-.8-.6v-.4a.8.8 0 0 1 .3-.6l2-1.5v-4.3L4 15.4a.8.8 0 0 1-1-.8v-.7a1.5 1.5 0 0 1 .7-1.3L10.2 9z", detail: "" },
  coins: { body: "M12 2.8a9.2 9.2 0 1 1 0 18.4 9.2 9.2 0 0 1 0-18.4z", detail: "M12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12z M10.5 13.5l3-3 M10 11.2l-.6.6a1.8 1.8 0 0 0 2.6 2.6l.6-.6 M14 12.8l.6-.6a1.8 1.8 0 0 0-2.6-2.6l-.6.6" },
  mail: { body: "M6 5h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z", detail: "M4 7.5l6.9 5a2 2 0 0 0 2.2 0l6.9-5" },
  chat: { body: "M6.5 4h11A3.5 3.5 0 0 1 21 7.5v6a3.5 3.5 0 0 1-3.5 3.5H12l-4.2 3.2a.8.8 0 0 1-1.3-.6V17A3.5 3.5 0 0 1 3 13.5v-6A3.5 3.5 0 0 1 6.5 4z", detail: "M8 9h8 M8 12.5h5" },
  bag: { body: "M6.3 8h11.4a1.5 1.5 0 0 1 1.5 1.4l.7 9a2.5 2.5 0 0 1-2.5 2.6H6.6a2.5 2.5 0 0 1-2.5-2.6l.7-9A1.5 1.5 0 0 1 6.3 8z M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8", detail: "M9 12h.5 M14.5 12h.5" },
  zap: { body: "M13.4 2.9a.8.8 0 0 1 1.4.6L14 10h4.6a.8.8 0 0 1 .6 1.3l-8.6 9.8a.8.8 0 0 1-1.4-.6L10 14H5.4a.8.8 0 0 1-.6-1.3z", detail: "" },
  sliders: { body: "M4 7h16 M4 17h16", detail: "M9 4.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z M15 14.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" },
  download: { body: "M12 3.5v10 M8 10l4 4 4-4", detail: "M4.5 15.5v1.5a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-1.5" },
  incoming: { body: "M17 7L7 17 M7 9.5V17h7.5", detail: "" },
  outgoing: { body: "M7 17L17 7 M9.5 7H17v7.5", detail: "" },
  arrows: { body: "M4 8h15 M16 5l3 3-3 3 M20 16H5 M8 13l-3 3 3 3", detail: "" },
  plus: { body: "M12 5v14 M5 12h14", detail: "" },
  tv: { body: "M6 6h12a3 3 0 0 1 3 3v6.5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z", detail: "M9 21h6 M9 2.8l3 3 3-3" },
  music: { body: "M9 17.5V6.3a1.5 1.5 0 0 1 1.2-1.5l8-1.6a1.5 1.5 0 0 1 1.8 1.5v10.8 M9 15a2.5 2.5 0 1 1-2.5 2.5A2.5 2.5 0 0 1 9 15z M20 13a2.5 2.5 0 1 1-2.5 2.5A2.5 2.5 0 0 1 20 13z", detail: "M9 8.5l11-2" },
  car: { body: "M7.2 6h9.6a2 2 0 0 1 1.8 1.2l1.7 3.8a3 3 0 0 1 .7 1.9V17a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 17v-4.1a3 3 0 0 1 .7-1.9l1.7-3.8A2 2 0 0 1 7.2 6z", detail: "M4 11.5h16 M7 14.5h1 M16 14.5h1" },
};

function icon(name: string) {
  return function CreatorArtwork({ active = false, className, strokeWidth = 1.8, ...props }: IconProps) {
    const artwork = (art[name] ?? art["document"]) as { body?: string; detail?: string };
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
export const Clock4 = icon("clock"), Clock = icon("clock"), ShieldCheck = icon("check"), CheckCircle2 = icon("check"), BadgeCheck = icon("check");
export const Folder = icon("folder"), ScrollText = icon("scroll"), Library = icon("folder"), Users = icon("users"), User = icon("user"), UserPlus = icon("users");
export const Repeat = icon("repeat"), Plug = icon("plug"), Settings = icon("settings"), LifeBuoy = icon("support"), DoorOpen = icon("door"), Workflow = icon("workflow");
export const Camera = icon("camera"), Video = icon("video"), Mic = icon("mic"), Plane = icon("plane"), HandCoins = icon("coins"), Mails = icon("mail"), MessageCircleMore = icon("chat");
export const ShoppingBag = icon("bag"), Zap = icon("zap"), SlidersHorizontal = icon("sliders"), ArrowDownToLine = icon("download"), ArrowDownLeft = icon("incoming"), ArrowUpRight = icon("outgoing");
export const ArrowLeftRight = icon("arrows");
export const FileSignature = icon("document");
export const Handshake = icon("users");
export const ScissorsLineDashed = icon("document");
export const Car = icon("car");
export const Tv = icon("tv");
export const Send = icon("outgoing");
export const CircleCheck = icon("check");
export const FileText = icon("document");
export const UserRound = icon("user");
export const Plus = icon("plus");
export const Check = icon("check");
export const Clapperboard = icon("clapper");
export const History = icon("history");
export const CircleCheckBig = icon("check");
export const Store = icon("store");
export const CreditCardRepeat = icon("subscription");
export const Bell = icon("bell");
