import { createFileRoute, useParams } from "@tanstack/react-router";
import { Link } from "@/components/alfred/ui";
import { ArrowLeft, Sparkles } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, ActionPair, Card, IconBadge } from "@/components/alfred/ui";

export const Route = createFileRoute("/a/$slug")({
  head: () => ({
    meta: [
      { title: "Coming soon — Alfred" },
      { name: "description", content: "This part of Alfred is designed and on the way." },
      { property: "og:title", content: "Coming soon — Alfred" },
      { property: "og:description", content: "This part of Alfred is designed and on the way." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PlaceholderScreen,
});

const titles: Record<string, { title: string; blurb: string }> = {
  reminders: { title: "Reminders", blurb: "Gentle nudges at exactly the right moment." },
  events: { title: "Events", blurb: "Everything you've said yes to." },
  calendar: { title: "Calendar", blurb: "Your month, without the clutter." },
  files: { title: "Files", blurb: "Documents, receipts and things worth keeping." },
  projects: { title: "Projects", blurb: "Work that runs longer than a task." },
  journal: { title: "Journal", blurb: "How the days actually went." },
  ideas: { title: "Ideas", blurb: "Half-thoughts, kept safe." },
  activity: { title: "Activity", blurb: "Everything Alfred has done for you." },
  transactions: { title: "Transactions", blurb: "Every naira in and out." },
  subscriptions: { title: "Subscriptions", blurb: "What renews, and when." },
  purchases: { title: "Purchases", blurb: "Receipts, warranties and orders." },
  clique: { title: "Clique", blurb: "The people who matter, and what you owe them." },
  discover: { title: "Discover", blurb: "Places, deals and things worth your time." },
  research: { title: "Research", blurb: "Ask once, Alfred digs." },
  "my-office": { title: "My Office", blurb: "The work side of your life." },
  integrations: { title: "Integrations", blurb: "Bank, calendar, mail and more." },
  profile: { title: "Profile", blurb: "How Alfred sees you." },
  plans: { title: "Plans", blurb: "Your Alfred subscription." },
  "whats-new": { title: "What's New", blurb: "Small, useful changes to Alfred." },
  invite: { title: "Invite a Friend", blurb: "Give someone their own Alfred." },
  support: { title: "Support", blurb: "We're a message away." },
  settings: { title: "Settings", blurb: "Preferences, privacy and permissions." },
};

function PlaceholderScreen() {
  const { slug } = useParams({ from: "/a/$slug" });
  const meta = titles[slug] ?? { title: "Alfred", blurb: "This area is on the way." };

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
          {meta.title} is part of Alfred's architecture. The screen is designed — it just isn't
          wired up in this preview yet.
        </p>
        <ActionPair
          className="mt-6"
          secondary={
            <Link to="/">
              <AButton variant="neutral" size="lg">
                Home
              </AButton>
            </Link>
          }
          primary={
            <Link to="/assistant">
              <AButton size="lg">Ask Alfred instead</AButton>
            </Link>
          }
        />
      </Card>
    </AppShell>
  );
}
