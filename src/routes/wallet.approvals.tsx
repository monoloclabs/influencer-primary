import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Car, Check, Plane, ShieldCheck, Tv } from "lucide-react";
import { WalletShell } from "@/components/alfred/WalletShell";
import { AButton, ActionPair, Card, IconBadge, Pill } from "@/components/alfred/ui";

export const Route = createFileRoute("/wallet/approvals")({
  head: () => ({
    meta: [
      { title: "Approvals — Alfred Wallet" },
      { name: "description", content: "Payment authorizations waiting for your yes before Alfred spends a naira." },
      { property: "og:title", content: "Approvals — Alfred Wallet" },
      { property: "og:description", content: "Review, approve or decline pending wallet authorizations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WalletApprovals,
});

const pending = [
  { id: "p1", icon: Car, tone: "blue" as const, tag: "Ride", title: "Uber", amount: "₦18,500", detail: "Payment authorization required for tonight's ride to Lekki." },
  { id: "p2", icon: Plane, tone: "orange" as const, tag: "Travel", title: "Flight booking", amount: "₦240,000", detail: "Lagos → Abuja, Friday 18:45. Authorization required." },
  { id: "p3", icon: Tv, tone: "violet" as const, tag: "Subscription", title: "DSTV Compact+", amount: "₦24,500", detail: "Renews tomorrow at 00:00 from your wallet." },
];

function WalletApprovals() {
  const [decided, setDecided] = useState<Record<string, "approved" | "declined">>({});

  return (
    <WalletShell title="Approvals">
      <h2 className="text-[1.75rem] leading-tight font-extrabold">Pending authorization</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        Nothing leaves your wallet until you say yes.
      </p>

      <div className="mt-6 space-y-3.5">
        {pending.map((it) => {
          const state = decided[it.id];
          return (
            <Card key={it.id} className="p-5">
              <div className="flex items-start gap-3.5">
                <IconBadge tone={it.tone} shape="round" size="md">
                  <it.icon className="h-5 w-5" strokeWidth={2.2} />
                </IconBadge>
                <div className="min-w-0 flex-1">
                  <Pill tone={it.tone}>{it.tag}</Pill>
                  <p className="mt-2 text-[1.0625rem] leading-snug font-bold">{it.title}</p>
                  <p className="text-xl font-extrabold">{it.amount}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{it.detail}</p>
                </div>
              </div>

              {state ? (
                <div className="mt-4 flex items-center gap-2 rounded-full bg-surface px-4 py-3 text-sm font-bold">
                  <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                  {state === "approved" ? "Approved — Alfred is on it" : "Declined"}
                </div>
              ) : (
                <ActionPair
                  className="mt-4"
                  secondary={
                    <AButton
                      variant="neutral"
                      size="lg"
                      onClick={() => setDecided((d) => ({ ...d, [it.id]: "declined" }))}
                    >
                      Decline
                    </AButton>
                  }
                  primary={
                    <AButton size="lg" onClick={() => setDecided((d) => ({ ...d, [it.id]: "approved" }))}>
                      <ShieldCheck className="h-4 w-4" strokeWidth={2.6} />
                      Approve
                    </AButton>
                  }
                />
              )}
            </Card>
          );
        })}
      </div>
    </WalletShell>
  );
}
