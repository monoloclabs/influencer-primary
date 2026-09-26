import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  activations as seedActivations,
  campaigns,
  type Activation,
  type Campaign,
  type CampaignStatus,
  activationTemplates,
} from "@/data/influencer";

type CampaignStateValue = {
  statusFor: (campaignId: string) => CampaignStatus | undefined;
  acceptOffer: (campaignId: string) => void;
  declineOffer: (campaignId: string) => void;
  startActivation: (campaignId: string, templateId?: string) => string | undefined;
  allActivations: Activation[];
  activationById: (activationId: string) => Activation | undefined;
  activationForCampaign: (campaignId: string) => Activation | undefined;
  campaignsReadyForActivation: Campaign[];
  pendingOfferCount: number;
  decisionFor: (approvalId: string) => "accepted" | "declined" | undefined;
  decideApproval: (approvalId: string, decision: "accepted" | "declined") => void;
};

const CampaignStateContext = createContext<CampaignStateValue | undefined>(undefined);

function buildActivation(campaign: Campaign, templateId?: string): Activation {
  const platforms = Array.from(new Set(campaign.deliverables.map((d) => d.platform)));
  const template = activationTemplates.find((item) => item.id === templateId);
  return {
    id: `act-${campaign.id}`,
    campaignId: campaign.id,
    title: `${campaign.title} rollout`,
    status: "planning",
    platforms,
    contentItems: campaign.deliverables.map((d) => ({
      id: `${campaign.id}-${d.id}`,
      title: d.title,
      platform: d.platform,
      date: d.due,
      state: "Planned",
    })),
    nextSteps: template ? [...template.steps] : ["Confirm shoot dates", "Draft the first piece of content", "Share drafts for brand review"],
    notes: campaign.brief,
  };
}

export function CampaignStateProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, CampaignStatus>>({});
  const [created, setCreated] = useState<Activation[]>([]);
  const [approvalDecisions, setApprovalDecisions] = useState<Record<string, "accepted" | "declined">>({});

  const value = useMemo<CampaignStateValue>(() => {
    const statusFor = (campaignId: string) =>
      overrides[campaignId] ?? campaigns.find((campaign) => campaign.id === campaignId)?.status;

    const allActivations = [...seedActivations, ...created];
    const activationForCampaign = (campaignId: string) =>
      allActivations.find((activation) => activation.campaignId === campaignId);

    return {
      statusFor,
      acceptOffer: (campaignId) =>
        setOverrides((current) => ({ ...current, [campaignId]: "accepted" })),
      declineOffer: (campaignId) =>
        setOverrides((current) => ({ ...current, [campaignId]: "declined" })),
      startActivation: (campaignId, templateId) => {
        const existing = activationForCampaign(campaignId);
        if (existing) return existing.id;
        const campaign = campaigns.find((item) => item.id === campaignId);
        if (!campaign || statusFor(campaignId) !== "accepted") return undefined;
        const activation = buildActivation(campaign, templateId);
        setCreated((current) => [...current, activation]);
        setOverrides((current) => ({ ...current, [campaignId]: "active" }));
        return activation.id;
      },
      allActivations,
      activationById: (activationId) => allActivations.find((activation) => activation.id === activationId),
      activationForCampaign,
      campaignsReadyForActivation: campaigns.filter(
        (campaign) => statusFor(campaign.id) === "accepted" && !activationForCampaign(campaign.id),
      ),
      pendingOfferCount: campaigns.filter((campaign) => statusFor(campaign.id) === "offer").length,
      decisionFor: (approvalId) => approvalDecisions[approvalId],
      decideApproval: (approvalId, decision) => setApprovalDecisions((current) => ({ ...current, [approvalId]: decision })),
    };
  }, [overrides, created, approvalDecisions]);

  return <CampaignStateContext.Provider value={value}>{children}</CampaignStateContext.Provider>;
}

export function useCampaignState() {
  const value = useContext(CampaignStateContext);
  if (!value) throw new Error("useCampaignState must be used inside CampaignStateProvider");
  return value;
}
