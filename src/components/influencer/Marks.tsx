import {
  siApplemusic,
  siFacebook,
  siInstagram,
  siNotion,
  siSpotify,
  siTiktok,
  siYoutube,
  type SimpleIcon,
} from "simple-icons";
import { cn } from "@/lib/utils";

const brandIcons: Record<string, SimpleIcon | undefined> = {
  "Apple Music": siApplemusic,
  Notion: siNotion,
  Spotify: siSpotify,
};

const platformIcons: Record<string, SimpleIcon | undefined> = {
  Facebook: siFacebook,
  Instagram: siInstagram,
  TikTok: siTiktok,
  YouTube: siYoutube,
};

function SimpleMark({ icon, label, className }: { icon: SimpleIcon; label: string; className: string | undefined }) {
  return (
    <svg
      aria-label={label}
      role="img"
      viewBox="0 0 24 24"
      className={cn("h-5 w-5 fill-current", className)}
    >
      <title>{label}</title>
      <path d={icon.path} />
    </svg>
  );
}

export function BrandMark({ brand, className }: { brand: string; className?: string }) {
  const icon = brandIcons[brand];
  if (icon) return <SimpleMark icon={icon} label={`${brand} logo`} className={className} />;

  return (
    <span
      role="img"
      aria-label={`${brand} mark`}
      title={`${brand} mark`}
      className={cn("grid h-5 w-5 place-items-center text-sm font-extrabold", className)}
    >
      {brand === "Gymshark" ? "G" : brand === "Sephora" ? "S" : brand.slice(0, 1)}
    </span>
  );
}

export function PlatformMark({ platform, className }: { platform: string; className?: string }) {
  const icon = platformIcons[platform];
  if (icon) return <SimpleMark icon={icon} label={`${platform} logo`} className={className} />;

  return (
    <span
      role="img"
      aria-label={`${platform} platform`}
      className={cn("grid h-5 w-5 place-items-center rounded-full bg-surface text-[0.625rem] font-extrabold", className)}
    >
      {platform.slice(0, 1)}
    </span>
  );
}

export function platformFromText(text: string) {
  const platforms = ["Instagram", "TikTok", "YouTube", "Facebook"];
  if (/reel|stor(y|ies)/i.test(text)) return "Instagram";
  return platforms.find((platform) => text.toLowerCase().includes(platform.toLowerCase()));
}