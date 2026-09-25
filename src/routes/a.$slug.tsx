import { createFileRoute, useParams } from "@tanstack/react-router";
import { Link } from "@/components/alfred/ui";
import { ArrowLeft, Sparkles } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, ActionPair, Card, IconBadge } from "@/components/alfred/ui";

export const Route = createFileRoute("/a/$slug")({
  head: () => ({
    meta: [
      { title: "Coming soon — INFLUENCER" },
      { name: "description", content: "This part of INFLUENCER is designed and on the way." },
      { property: "og:title", content: "Coming soon — INFLUENCER" },
      { property: "og:description", content: "This part of INFLUENCER is designed and on the way." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PlaceholderScreen,
});

const titles: Record<string, { title: string; blurb: string }> = {
  reminders: { title: "Reminders", blurb: "Nudges before a deadline slips." },
  events: { title: "Events", blurb: "Shoots, postings and brand dates." },
  calendar: { title: "Content calendar", blurb: "Your month of deliverables, without the clutter." },
  files: { title: "Files", blurb: "Briefs, contracts and invoices worth keeping." },
  projects: { title: "Projects", blurb: "Work that runs across campaigns." },
  journal: { title: "Journal", blurb: "Notes on how each partnership went." },
  ideas: { title: "Ideas", blurb: "Concepts to pitch, kept safe." },
  activity: { title: "Activity", blurb: "Everything that moved across your campaigns." },
  transactions: { title: "Transactions", blurb: "Every payout, fee and withdrawal." },
  subscriptions: { title: "Subscriptions", blurb: "What renews, and when." },
  purchases: { title: "Purchases", blurb: "Gear, software and business spend." },
  clique: { title: "Network", blurb: "Brand contacts, managers and collaborators." },
  discover: { title: "Discover brands", blurb: "Partnerships worth your audience." },
  research: { title: "Rate research", blurb: "Ask once, see what others charge." },
  "media-kit": { title: "Media kit", blurb: "Your audience and results, brand-ready." },
  "brand-marketplace": { title: "Brand marketplace", blurb: "Inbound demand, matched to you." },
  "my-office": { title: "My Office", blurb: "The team side of your business." },
  integrations: { title: "Integrations", blurb: "Instagram, TikTok, YouTube and your bank." },
  profile: { title: "Creator profile", blurb: "How brands see you." },
  plans: { title: "Plans", blurb: "Your INFLUENCER subscription." },
  "whats-new": { title: "What's New", blurb: "Small, useful changes to INFLUENCER." },
  invite: { title: "Invite a creator", blurb: "Bring someone onto the platform." },
  support: { title: "Support", blurb: "We're a message away." },
  settings: { title: "Settings", blurb: "Preferences, privacy and permissions." },
};

function PlaceholderScreen() {
  const { slug } = useParams({ from: "/a/$slug" });
  const meta = titles[slug] ?? { title: "INFLUENCER", blurb: "This area is on the way." };

  return (
    <AppShell title={meta.title}>
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
        <ArrowLeft className="h-4 w-4" strokeWidth={2.6} />
        Back
      </Link>

      <h2 className="mt-4 text-[1.75rem] leading-tight font-extrabold">{meta.title}</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">{meta.blurb}</p>

      <Card className="mt-6 p-6 text-center">
        <IconBadge tone="orange" shape="round" size="lg" className="mx-auto">
          <Sparkles className="h-6 w-6" strokeWidth={2.1} />
        </IconBadge>
        <p className="mt-4 text-[1.0625rem] font-bold">Being built next</p>
        <p className="mx-auto mt-2 max-w-[19rem] text-sm text-muted-foreground">
          {meta.title} is part of the INFLUENCER architecture. The screen is designed — it just isn't
          wired up in this preview yet.
        </p>
        <ActionPair
          className="mt-6"
          secondary={
            <Link to="/">
              <AButton variant="neutral" size="lg">
                Dashboard
              </AButton>
            </Link>
          }
          primary={
            <Link to="/assistant">
              <AButton size="lg">Ask the assistant</AButton>
            </Link>
          }
        />
      </Card>
    </AppShell>
  );
}
