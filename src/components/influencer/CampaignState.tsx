import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { campaigns, type CampaignStatus } from "@/data/influencer";

type CampaignStateValue = {
  statusFor: (campaignId: string) => CampaignStatus | undefined;
  acceptOffer: (campaignId: string) => void;
  declineOffer: (campaignId: string) => void;
};

const CampaignStateContext = createContext<CampaignStateValue | undefined>(undefined);

export function CampaignStateProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, CampaignStatus>>({});

  const value = useMemo<CampaignStateValue>(
    () => ({
      statusFor: (campaignId) => overrides[campaignId] ?? campaigns.find((campaign) => campaign.id === campaignId)?.status,
      acceptOffer: (campaignId) => setOverrides((current) => ({ ...current, [campaignId]: "pending_approval" })),
      declineOffer: (campaignId) => setOverrides((current) => ({ ...current, [campaignId]: "declined" })),
    }),
    [overrides],
  );

  return <CampaignStateContext.Provider value={value}>{children}</CampaignStateContext.Provider>;
}

export function useCampaignState() {
  const value = useContext(CampaignStateContext);
  if (!value) throw new Error("useCampaignState must be used inside CampaignStateProvider");
  return value;
}