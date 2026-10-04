import {
  siApplemusic,
  siFacebook,
  siInstagram,
  siNotion,
  siSpotify,
  siThreads,
  siTiktok,
  siWhatsapp,
  siX,
  siYoutube,
  type SimpleIcon,
} from "simple-icons";
import { cn } from "@/lib/utils";

type Mark = { path: string; label: string };

const toMark = (icon: SimpleIcon, label: string): Mark => ({ path: icon.path, label });

/** Brands without a simple-icons entry get a hand-traced silhouette so the row never falls back to a letter. */
const gymsharkMark: Mark = {
  label: "Gymshark",
  // stylised shark head, nose left, dorsal fin top-right
  path:
    "M1.4 12.1c2.5-2.2 5.4-3.4 8.6-3.6l3.1-4.9c.3-.5 1.1-.3 1.1.3l.1 4.9c3 .6 5.6 2 7.9 4.2.4.4.3 1-.2 1.2-2.6 1.1-4.6 2.6-6.1 4.6-.3.4-.9.4-1.2 0l-1.6-2.2c-3.6.3-6.9-.6-9.9-2.7l-1.8.9c-.6.3-1.2-.4-.8-.9l1.4-1.6-.5-.5Z",
};

const sephoraMark: Mark = {
  label: "Sephora",
  // flame-cut S
  path:
    "M15.9 2.6c.4-.3 1 .1.9.6-.5 2.4-2 4-4.5 5-2 .8-3.2 1.7-3.6 2.7-.4 1 .1 1.8 1.5 2.3l2.7 1c2.6 1 3.8 2.6 3.5 4.7-.3 2.1-2.2 3.7-5.6 4.6-.5.1-.9-.5-.6-.9 1.3-1.6 1.2-2.8-.4-3.5l-2.9-1.2C4.2 16.8 3 15.1 3.2 12.8c.2-2.4 1.9-4.3 5-5.7 3.2-1.5 5.4-2.9 7.7-4.5Z",
};

const brandMarks: Record<string, Mark | undefined> = {
  "Apple Music": toMark(siApplemusic, "Apple Music"),
  Gymshark: gymsharkMark,
  Notion: toMark(siNotion, "Notion"),
  Sephora: sephoraMark,
  Spotify: toMark(siSpotify, "Spotify"),
};

const platformMarks: Record<string, Mark | undefined> = {
  Facebook: toMark(siFacebook, "Facebook"),
  Instagram: toMark(siInstagram, "Instagram"),
  Threads: toMark(siThreads, "Threads"),
  TikTok: toMark(siTiktok, "TikTok"),
  X: toMark(siX, "X"),
  YouTube: toMark(siYoutube, "YouTube"),
  WhatsApp: toMark(siWhatsapp, "WhatsApp"),
};

const knownBrands = Object.keys(brandMarks);
const knownPlatforms = Object.keys(platformMarks);

function VectorMark({ mark, suffix, className }: { mark: Mark; suffix: string; className: string | undefined }) {
  const label = `${mark.label} ${suffix}`;
  return (
    <svg aria-label={label} role="img" viewBox="0 0 24 24" className={cn("h-5 w-5 shrink-0 fill-current", className)}>
      <title>{label}</title>
      <path d={mark.path} />
    </svg>
  );
}

export function BrandMark({ brand, className }: { brand: string; className?: string }) {
  const mark = brandMarks[brand];
  if (mark) return <VectorMark mark={mark} suffix="logo" className={className} />;

  return (
    <span
      role="img"
      aria-label={`${brand} mark`}
      title={`${brand} mark`}
      className={cn("grid h-5 w-5 shrink-0 place-items-center text-sm font-extrabold", className)}
    >
      {brand.slice(0, 1)}
    </span>
  );
}

export function PlatformMark({ platform, className }: { platform: string; className?: string }) {
  const mark = platformMarks[platform];
  if (mark) return <VectorMark mark={mark} suffix="logo" className={className} />;

  return (
    <span
      role="img"
      aria-label={`${platform} platform`}
      className={cn(
        "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-surface text-[0.625rem] font-extrabold",
        className,
      )}
    >
      {platform.slice(0, 1)}
    </span>
  );
}

/** Brand logo + name, then the platform logos it runs on, all on one line. */
export function BrandPlatformRow({
  brand,
  platforms,
  className,
}: {
  brand: string;
  platforms?: string[];
  className?: string;
}) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2", className)}>
      <span className="flex min-w-0 items-center gap-1.5">
        <BrandMark brand={brand} className="h-[0.9rem] w-[0.9rem] text-foreground" />
        <span className="truncate text-xs font-bold">{brand}</span>
      </span>
      {platforms && platforms.length > 0 && (
        <>
          <span aria-hidden className="text-border">|</span>
          <span className="flex items-center gap-2">
            {platforms.map((platform) => (
              <PlatformMark
                key={platform}
                platform={platform}
                className="h-[0.9rem] w-[0.9rem] text-muted-foreground"
              />
            ))}
          </span>
        </>
      )}
    </span>
  );
}

export function isDurationText(text: string) {
  return /usage|rights|exclusiv|perpetual|\b\d+\s*-?\s*(day|days|month|months|week|weeks|year|years)\b/i.test(text);
}

export function platformFromText(text: string) {
  if (isDurationText(text)) return undefined;
  if (/reel|stor(y|ies)/i.test(text)) return "Instagram";
  return knownPlatforms.find((platform) => text.toLowerCase().includes(platform.toLowerCase()));
}

/** Finds the brand a free-text row refers to, so records can carry a real logo. */
export function brandFromText(text: string) {
  return knownBrands.find((brand) => text.toLowerCase().includes(brand.toLowerCase()));
}
