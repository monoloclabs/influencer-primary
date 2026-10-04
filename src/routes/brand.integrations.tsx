import { createFileRoute } from "@tanstack/react-router";
import { BrandShell, brandMeta } from "@/components/brand/BrandShell";
import { IntegrationsScreen } from "@/components/integrations/IntegrationsScreen";

export const Route = createFileRoute("/brand/integrations")({
  head: () => brandMeta("Integrations for Gymshark — INFLUENCER", "Connect the brand tools Gymshark uses for campaigns, content and communication."),
  component: BrandIntegrations,
});

function BrandIntegrations() {
  return <BrandShell title="Integrations"><IntegrationsScreen accountName="Gymshark" /></BrandShell>;
}