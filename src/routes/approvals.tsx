import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Car, Tv, Send, Check } from "lucide-react";
import { AppShell } from "@/components/alfred/AppShell";
import { AButton, ActionPair, Card, IconBadge, Pill } from "@/components/alfred/ui";

export const Route = createFileRoute("/approvals")({
  head: () => ({
    meta: [
      { title: "Approvals — Alfred" },
      { name: "description", content: "Actions Alfred wants to take on your behalf, waiting for your go-ahead." },
      { property: "og:title", content: "Approvals — Alfred" },
      { property: "og:description", content: "Approve or decline what Alfred is about to do for you." },
    ],
  }),
  component: ApprovalsScreen,
});

const items = [
  {
    id: "a1",
    icon: Tv,
    tone: "orange" as const,
    tag: "Money",
    title: "Pay DSTV subscription — ₦24,500",
    detail: "From your instruction “keep my subscriptions alive”. Renews tomorrow at 00:00.",
  },
  {
    id: "a2",
    icon: Car,
    tone: "blue" as const,
    tag: "Travel",
    title: "Book a ride for 18:20 to Lekki",
    detail: "So you make dinner with Mum on time. Estimated ₦6,300.",
  },
  {
    id: "a3",
    icon: Send,
    tone: "violet" as const,
    tag: "Email",
    title: "Send the gym cancellation email",
    detail: "Drafted this morning. Notice period ends on Friday.",
  },
];

function ApprovalsScreen() {
  const [decided, setDecided] = useState<Record<string, "approved" | "declined">>({});

  return (
    <AppShell title="Approvals">
      <h2 className="text-[1.75rem] leading-tight font-extrabold">Waiting on you</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
        Alfred never spends money or speaks for you without a yes.
      </p>

      <div className="mt-6 space-y-3.5">
        {items.map((it) => {
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
                    <AButton
                      size="lg"
                      onClick={() => setDecided((d) => ({ ...d, [it.id]: "approved" }))}
                    >
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

      <div className="mt-8 rounded-4xl bg-tint-blue p-5">
        <p className="eyebrow text-tint-blue-foreground">How this works</p>
        <p className="mt-2 text-[0.9375rem] leading-snug font-semibold">
          Instructions tell Alfred what to do. Approvals are the moments it stops and checks with you
          first.
        </p>
      </div>
    </AppShell>
  );
}
