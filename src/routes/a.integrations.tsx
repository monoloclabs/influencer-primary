import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/alfred/AppShell";
import { IntegrationsScreen } from "@/components/integrations/IntegrationsScreen";

export const Route = createFileRoute("/a/integrations")({
  head: () => ({ meta: [
    { title: "Integrations for Tola — INFLUENCER" },
    { name: "description", content: "Connect the creator tools Tola uses for campaigns, content and communication." },
    { property: "og:title", content: "Creator integrations — INFLUENCER" },
    { property: "og:description", content: "Creator tools, connected in one workspace." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: CreatorIntegrations,
});

function CreatorIntegrations() {
  return <AppShell title="Integrations"><IntegrationsScreen accountName="Tola" /></AppShell>;
}