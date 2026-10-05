import { createFileRoute, notFound } from "@tanstack/react-router";
import { Link } from "@/components/alfred/ui";
import { BrandShell, brandMeta } from "@/components/brand/BrandShell";

const destinations: Record<string, { title: string; description: string }> = {
  assistant: { title: "Assistant", description: "Your brand campaign assistant." },
  instructions: { title: "Instructions", description: "Standing instructions for your brand." },
  integrations: { title: "Integrations", description: "Connections for your brand workspace." },
  profile: { title: "Profile", description: "Your brand profile." },
  plans: { title: "Plan & Billing", description: "Brand plan and billing." },
  settings: { title: "Settings", description: "Brand workspace settings." },
  support: { title: "Support", description: "Help for your brand workspace." },
};

export const Route = createFileRoute("/brand/$slug")({
  loader: ({ params }) => {
    const destination = destinations[params.slug];
    if (!destination) throw notFound();
    return destination;
  },
  head: ({ loaderData }) => loaderData
    ? brandMeta(`${loaderData.title}, Brand workspace | INFLUENCER`, loaderData.description)
    : { meta: [{ title: "Brand page unavailable | INFLUENCER" }, { name: "robots", content: "noindex" }, { name: "description", content: "This brand page is unavailable." }, { property: "og:title", content: "Brand page unavailable | INFLUENCER" }, { property: "og:description", content: "This brand page is unavailable." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] },
  component: BrandPlaceholder,
});

function BrandPlaceholder() {
  const { title } = Route.useLoaderData();
  return (
    <BrandShell title={title}>
      <h2 className="pt-2 text-2xl font-extrabold">{title}</h2>
      <p className="mt-3 text-sm text-muted-foreground">Coming soon for brands.</p>
      <Link to="/brand" className="mt-6 inline-flex h-11 items-center rounded-full bg-primary-soft px-5 text-sm font-bold text-primary">Back to dashboard</Link>
    </BrandShell>
  );
}