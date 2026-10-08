import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { AButton, ActionPair, IconBadge } from "@/components/alfred/ui";
import { Workflow } from "lucide-react";
import { activationTemplates } from "@/data/influencer";
import { useCampaignState } from "@/components/influencer/CampaignState";

export function ActivationSetup({ open, onOpenChange, initialCampaignId = "", initialTemplateId = "" }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialCampaignId?: string;
  initialTemplateId?: string;
}) {
  const navigate = useNavigate();
  const { campaignsReadyForActivation, startActivation } = useCampaignState();
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const campaignId = selectedCampaign || initialCampaignId;
  const templateId = selectedTemplate || initialTemplateId;
  const eligible = campaignsReadyForActivation.some((campaign) => campaign.id === campaignId);

  const close = () => {
    onOpenChange(false);
    setSelectedCampaign("");
    setSelectedTemplate("");
  };

  return (
    <Sheet open={open} onOpenChange={(value) => { if (!value) close(); else onOpenChange(true); }}>
      <SheetContent side="bottom" className="mx-auto max-h-[90dvh] max-w-[520px] overflow-y-auto rounded-t-4xl border-0 px-6 pt-3 pb-8 [&>button]:hidden">
        <div className="mx-auto h-1.5 w-12 rounded-full bg-border" />
        <IconBadge tone="blue" shape="round" size="lg" className="mx-auto mt-6"><Workflow className="h-6 w-6" /></IconBadge>
        <h3 className="mt-4 text-center text-xl font-extrabold">Activate new campaign</h3>
        <p className="mt-2 text-center text-sm text-muted-foreground">Choose an accepted campaign and an execution structure for its content and schedule.</p>
        <div className="mt-6 grid grid-cols-2 gap-2">
          {activationTemplates.filter((t) => t.id === "submit-content" || t.id === "workspace-project").map((t) => (
            <button key={t.id} type="button" onClick={() => setSelectedTemplate(t.id)} className={"rounded-2xl p-3 text-left " + (templateId === t.id ? "bg-primary text-primary-foreground" : "bg-surface")}>
              <span className="block text-sm font-extrabold">{t.name}</span>
              <span className={"mt-0.5 block text-[0.6875rem] leading-snug " + (templateId === t.id ? "opacity-90" : "text-muted-foreground")}>{t.id === "workspace-project" ? "Spans campaigns" : "Send a draft"}</span>
            </button>
          ))}
        </div>
        <label className="mt-5 block text-xs font-bold text-muted-foreground" htmlFor="setup-campaign">Accepted campaign</label>
        <select id="setup-campaign" value={campaignId} onChange={(event) => setSelectedCampaign(event.target.value)} className="mt-2 h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm font-semibold">
          <option value="">{campaignsReadyForActivation.length ? "Select campaign" : "No accepted campaigns available"}</option>
          {campaignsReadyForActivation.map((campaign) => <option key={campaign.id} value={campaign.id}>{campaign.brand}, {campaign.title}</option>)}
        </select>
        <label className="mt-5 block text-xs font-bold text-muted-foreground" htmlFor="setup-template">Execution structure</label>
        <select id="setup-template" value={templateId} onChange={(event) => setSelectedTemplate(event.target.value)} className="mt-2 h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm font-semibold">
          <option value="">Campaign deliverables</option>
          {activationTemplates.map((template) => <option key={template.id} value={template.id}>{template.name}</option>)}
        </select>
        <p className="mt-2 text-xs text-muted-foreground">{activationTemplates.find((template) => template.id === templateId)?.description ?? "Start from the deliverables and dates in the brand brief."}</p>
        <ActionPair className="mt-6" secondary={<AButton variant="neutral" size="lg" onClick={close}>Cancel</AButton>} primary={<AButton size="lg" disabled={!eligible} onClick={() => {
          if (!eligible) return;
          const id = startActivation(campaignId, templateId || undefined);
          if (id) { close(); navigate({ to: "/activation/$activationId", params: { activationId: id } }); }
        }}>Start activation</AButton>} />
      </SheetContent>
    </Sheet>
  );
}