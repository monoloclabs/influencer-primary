import {
  Camera,
  Film,
  Music4,
  ShoppingBag,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

/** The commercial lifecycle of a brand deal. */
export type CampaignStatus =
  | "offer"
  | "accepted"
  | "pending_approval"
  | "active"
  | "awaiting_content"
  | "awaiting_brand_approval"
  | "completed"
  | "payment_pending"
  | "paid"
  | "declined"
  | "cancelled";

export type PillTone = "neutral" | "blue" | "orange" | "green" | "red" | "amber" | "violet";

export const statusMeta: Record<CampaignStatus, { label: string; tone: PillTone }> = {
  offer: { label: "Offer", tone: "violet" },
  accepted: { label: "Accepted", tone: "blue" },
  pending_approval: { label: "Pending approval", tone: "amber" },
  active: { label: "Active", tone: "blue" },
  awaiting_content: { label: "Awaiting content", tone: "orange" },
  awaiting_brand_approval: { label: "Awaiting brand approval", tone: "amber" },
  completed: { label: "Completed", tone: "green" },
  payment_pending: { label: "Payment pending", tone: "orange" },
  paid: { label: "Paid", tone: "green" },
  declined: { label: "Declined", tone: "red" },
  cancelled: { label: "Cancelled", tone: "neutral" },
};


export type Deliverable = {
  id: string;
  title: string;
  platform: string;
  due: string;
  state: "Not started" | "Drafted" | "Submitted" | "Approved" | "Live";
};

export type ActivationStatus = "planning" | "producing" | "scheduled" | "live" | "complete";

export const activationTemplates = [
  { id: "content-calendar", name: "Content calendar", description: "Plan production, drafts, review and publishing around the campaign dates.", steps: ["Set production dates", "Prepare drafts for brand review", "Schedule approved posts"] },
  { id: "video-rollout", name: "Video rollout", description: "A video-first workflow from shoot through edit, approval and posting.", steps: ["Plan and shoot footage", "Edit and submit video drafts", "Publish approved videos"] },
  { id: "social-series", name: "Social series", description: "Coordinate multiple posts across the campaign's channels.", steps: ["Outline the post series", "Prepare platform-specific assets", "Schedule and publish the series"] },
] as const;

export type Activation = {
  id: string;
  campaignId: string;
  title: string;
  status: ActivationStatus;
  platforms: string[];
  contentItems: { id: string; title: string; platform: string; date: string; state: string }[];
  nextSteps: string[];
  notes: string;
};

export type Campaign = {
  id: string;
  brand: string;
  title: string;
  icon: LucideIcon;
  tone: "blue" | "orange" | "violet" | "green";
  status: CampaignStatus;
  window: string;
  fee: string;
  net: string;
  fees: string;
  terms: string;
  contact: string;
  brief: string;
  summary: string[];
  deliverables: Deliverable[];
  requirements: { id: string; title: string; meta: string }[];
  files: string[];
  nudge: string;
};

export const campaigns: Campaign[] = [
  {
    id: "c1",
    brand: "Gymshark",
    title: "Autumn Athlete Series",
    icon: ShoppingBag,
    tone: "orange",
    status: "awaiting_content",
    window: "12 – 26 October",
    fee: "$8,500",
    net: "$7,650",
    fees: "Platform fee 10% · $850",
    terms: "50% on signature · 50% Net 15 after approval",
    contact: "Mara Quinn · Brand Partnerships",
    brief: "Training-led storytelling. Real sweat, no studio gloss. Product in frame within 3 seconds.",
    summary: ["1 Reel · 60s", "3 Stories", "1 TikTok", "30-day paid usage"],
    deliverables: [
      { id: "d1", title: "Hero Reel — morning session", platform: "Instagram", due: "14 Oct", state: "Drafted" },
      { id: "d2", title: "Story set — kit unboxing", platform: "Instagram", due: "16 Oct", state: "Not started" },
      { id: "d3", title: "TikTok — 5 lifts, 5 cues", platform: "TikTok", due: "20 Oct", state: "Not started" },
    ],
    requirements: [
      { id: "r1", title: "Tag @gymshark and #GymsharkAthlete", meta: "Every deliverable" },
      { id: "r2", title: "No competing sportswear in frame", meta: "Exclusivity · 45 days" },
      { id: "r3", title: "Submit drafts 48h before posting", meta: "Brand review window" },
    ],
    files: ["Campaign brief.pdf", "Brand guidelines.pdf", "Signed contract.pdf"],
    nudge: "Your hero draft is due in 3 days — submit it for brand review.",
  },
  {
    id: "c2",
    brand: "Spotify",
    title: "Wrapped Creator Push",
    icon: Music4,
    tone: "violet",
    status: "offer",
    window: "1 – 15 December",
    fee: "$12,000",
    net: "$10,800",
    fees: "Platform fee 10% · $1,200",
    terms: "Net 30 after final approval",
    contact: "Devon Ilesanmi · Creator Marketing",
    brief: "Personal, warm, music-first. Your year in sound — no scripted product claims.",
    summary: ["2 Reels", "1 YouTube integration", "90-day usage"],
    deliverables: [
      { id: "d1", title: "Reel — my year in sound", platform: "Instagram", due: "4 Dec", state: "Not started" },
      { id: "d2", title: "YouTube integration — 60s", platform: "YouTube", due: "9 Dec", state: "Not started" },
      { id: "d3", title: "Reel — playlist reveal", platform: "Instagram", due: "12 Dec", state: "Not started" },
    ],
    requirements: [
      { id: "r1", title: "Accept before 28 September", meta: "Offer expires in 3 days" },
      { id: "r2", title: "Whitelisting for paid amplification", meta: "Additional $2,000" },
    ],
    files: ["Offer terms.pdf", "Creative brief.pdf"],
    nudge: "This offer is waiting on your decision in Approvals.",
  },
  {
    id: "c3",
    brand: "Notion",
    title: "Creator Workspace Tour",
    icon: Smartphone,
    tone: "blue",
    status: "payment_pending",
    window: "1 – 20 September",
    fee: "$5,200",
    net: "$4,680",
    fees: "Platform fee 10% · $520",
    terms: "Net 15 · released 26 September",
    contact: "Ivy Chen · Partnerships",
    brief: "Show the real system you run your business on. Screen-record heavy, calm voiceover.",
    summary: ["1 YouTube video", "2 Stories", "Perpetual organic usage"],
    deliverables: [
      { id: "d1", title: "YouTube — how I run my business", platform: "YouTube", due: "12 Sep", state: "Live" },
      { id: "d2", title: "Story set — template link", platform: "Instagram", due: "14 Sep", state: "Live" },
    ],
    requirements: [
      { id: "r1", title: "Affiliate link in description", meta: "Tracked" },
      { id: "r2", title: "Invoice submitted", meta: "20 September" },
    ],
    files: ["Invoice INV-0241.pdf", "Approval confirmation.pdf"],
    nudge: "Brand approved everything — payment releases on 26 September.",
  },
  {
    id: "c4",
    brand: "Sephora",
    title: "Holiday Glow Edit",
    icon: Camera,
    tone: "green",
    status: "paid",
    window: "5 – 22 August",
    fee: "$6,400",
    net: "$5,760",
    fees: "Platform fee 10% · $640",
    terms: "Paid 29 August",
    contact: "Renée Dubois · Influencer Lead",
    brief: "Soft, glowy, honest. Show the routine, not the ad.",
    summary: ["2 Reels", "4 Stories", "60-day usage"],
    deliverables: [
      { id: "d1", title: "Reel — evening routine", platform: "Instagram", due: "10 Aug", state: "Live" },
      { id: "d2", title: "Reel — 3 shades tested", platform: "Instagram", due: "17 Aug", state: "Live" },
    ],
    requirements: [
      { id: "r1", title: "Paid partnership label", meta: "Applied" },
      { id: "r2", title: "Final report shared", meta: "24 August" },
    ],
    files: ["Performance report.pdf", "Payment receipt.pdf"],
    nudge: "$5,760 landed in your wallet on 29 August.",
  },
  {
    id: "c5",
    brand: "Apple Music",
    title: "Summer Sessions",
    icon: Film,
    tone: "blue",
    status: "completed",
    window: "3 – 30 July",
    fee: "$9,800",
    net: "$8,820",
    fees: "Platform fee 10% · $980",
    terms: "Net 30 · invoice raised",
    contact: "Sam Oyelaran · Artist Partnerships",
    brief: "Cinematic, music-led, shot outdoors. Minimal talking to camera.",
    summary: ["1 YouTube film", "3 Reels", "6-month usage"],
    deliverables: [
      { id: "d1", title: "YouTube film — summer sessions", platform: "YouTube", due: "18 Jul", state: "Approved" },
      { id: "d2", title: "Reel cutdowns ×3", platform: "Instagram", due: "25 Jul", state: "Approved" },
    ],
    requirements: [
      { id: "r1", title: "Deliver raw files for brand archive", meta: "Done" },
      { id: "r2", title: "Raise invoice", meta: "Done · 31 July" },
    ],
    files: ["Final cut approval.pdf", "Invoice INV-0233.pdf"],
    nudge: "Everything is approved — the invoice is with Apple Music finance.",
  },
];

export const getCampaign = (id: string) => campaigns.find((c) => c.id === id);

export const activations: Activation[] = [
  {
    id: "act1",
    campaignId: "c1",
    title: "Autumn Athlete rollout",
    status: "producing",
    platforms: ["Instagram", "TikTok"],
    contentItems: [
      { id: "ac1", title: "Morning session hero Reel", platform: "Instagram", date: "14 Oct", state: "Editing" },
      { id: "ac2", title: "Kit unboxing Stories", platform: "Instagram", date: "16 Oct", state: "Shot list" },
      { id: "ac3", title: "Five lifts, five cues", platform: "TikTok", date: "20 Oct", state: "Planned" },
    ],
    nextSteps: ["Finish hero Reel edit", "Upload draft for brand review", "Confirm TikTok shoot location"],
    notes: "Keep the training footage natural and show the product within the first three seconds.",
  },
  {
    id: "act2",
    campaignId: "c3",
    title: "Creator Workspace publishing plan",
    status: "complete",
    platforms: ["YouTube", "Instagram"],
    contentItems: [
      { id: "ac4", title: "Workspace tour", platform: "YouTube", date: "12 Sep", state: "Live" },
      { id: "ac5", title: "Template link Stories", platform: "Instagram", date: "14 Sep", state: "Live" },
    ],
    nextSteps: ["Archive performance screenshots", "Confirm payout release"],
    notes: "All content is live and approved. Keep the affiliate link active through the reporting window.",
  },
];

export const getActivation = (id: string) => activations.find((activation) => activation.id === id);
export const getActivationForCampaign = (campaignId: string) =>
  activations.find((activation) => activation.campaignId === campaignId);

/** The campaign the dashboard leads with. */
export const heroCampaign = campaigns[0]!;

export const creator = {
  name: "Tola",
  fullName: "Tola Adeyemi",
  handle: "@tolacreates",
  initials: "TA",
  tier: "Creator Pro",
};

export const dashboardStats = [
  { label: "Earnings", value: "$32,900", sub: "+$5,760 last payout", tone: "green" as const, icon: "wallet", to: "/wallet", positive: true },
  { label: "Campaigns", value: "3", sub: "1 needs content", tone: "orange" as const, icon: "briefcase", to: "/plans" },
  { label: "Approvals", value: "3", sub: "Decisions waiting", tone: "blue" as const, icon: "shield", to: "/messages" },
  { label: "Pending", value: "$13,500", sub: "Incoming from 2 releases", tone: "violet" as const, icon: "clock", to: "/timeline", positive: true },
];

export type ApprovalKind = "brand_offer" | "contract_terms" | "content_revision";

export const approvalQueue: {
  id: string;
  kind: ApprovalKind;
  brand: string;
  title: string;
  meta: string;
  value: string;
  tone: "orange" | "blue" | "violet";
  campaignId?: string;
  details?: string;
}[] = [
  {
    id: "ap1",
    kind: "brand_offer",
    brand: "Spotify",
    title: "New campaign offer — Wrapped Creator Push",
    meta: "2 Reels + 1 YouTube integration · December",
    value: "$12,000",
    tone: "violet",
    campaignId: "c2",
  },
  {
    id: "ap2",
    kind: "contract_terms",
    brand: "Gymshark",
    title: "Usage extension — 30 extra paid days",
    meta: "Amends the Autumn Athlete Series contract",
    value: "+$1,750",
    tone: "orange",
    campaignId: "c1",
    details: "The brand proposes extending paid usage of your Autumn Athlete Series content by 30 days for an additional $1,750. Review the existing campaign's usage terms before accepting the change.",
  },
  {
    id: "ap3",
    kind: "content_revision",
    brand: "Notion",
    title: "Revision request — trim the intro",
    meta: "Brand wants the hook in the first 5 seconds",
    value: "No fee change",
    tone: "blue",
    campaignId: "c3",
    details: "The brand requests a shorter introduction on the Creator Workspace Tour so the hook appears within the first five seconds. This does not change the agreed fee.",
  },
];

export const upcomingDeliverables = [
  { id: "u1", when: "14 Oct", title: "Hero Reel — morning session", brand: "Gymshark", tone: "orange" as const, tag: "Instagram", platforms: ["Instagram", "Threads"] },
  { id: "u2", when: "16 Oct", title: "Story set — kit unboxing", brand: "Gymshark", tone: "blue" as const, tag: "Instagram", platforms: ["Instagram"] },
  { id: "u3", when: "20 Oct", title: "TikTok — 5 lifts, 5 cues", brand: "Gymshark", tone: "violet" as const, tag: "TikTok", platforms: ["TikTok", "Instagram", "X"] },
];

export type TimelineGroup = {
  day: string;
  items: { id: string; time: string; title: string; meta: string; tone: PillTone; tag: string; amount?: string }[];
};

export const transactions: TimelineGroup[] = [
  {
    day: "This week",
    items: [
      { id: "x1", time: "Tue", title: "Sephora — Holiday Glow Edit", meta: "Payout cleared", amount: "+$5,760.00", tone: "green" as const, tag: "Paid" },
      { id: "x2", time: "Tue", title: "Platform fee — Sephora", meta: "10% of gross", amount: "-$640.00", tone: "neutral" as const, tag: "Fee" },
      { id: "x3", time: "Mon", title: "Notion — Creator Workspace Tour", meta: "Releases 26 September", amount: "$4,680.00", tone: "orange" as const, tag: "Pending" },
    ],
  },
  {
    day: "Earlier this month",
    items: [
      { id: "x4", time: "12 Sep", title: "Apple Music — Summer Sessions", meta: "Invoice raised · Net 30", amount: "$8,820.00", tone: "amber" as const, tag: "Pending" },
      { id: "x5", time: "04 Sep", title: "Gymshark — signature payment", meta: "50% upfront cleared", amount: "+$4,250.00", tone: "green" as const, tag: "Paid" },
      { id: "x6", time: "01 Sep", title: "Withdrawal to bank", meta: "Sterling · ****4471", amount: "-$6,000.00", tone: "neutral" as const, tag: "Withdrawal" },
    ],
  },
];

export const campaignEvents: TimelineGroup[] = [
  {
    day: "This week",
    items: [
      { id: "e1", time: "Wed", title: "Draft submitted — Gymshark hero Reel", meta: "Awaiting brand approval", tone: "orange" as const, tag: "Submission" },
      { id: "e2", time: "Tue", title: "Content approved — Notion workspace tour", meta: "Brand signed off", tone: "green" as const, tag: "Approval" },
      { id: "e3", time: "Mon", title: "Offer received — Spotify Wrapped", meta: "Expires in 3 days", tone: "violet" as const, tag: "Offer" },
    ],
  },
  {
    day: "Earlier this month",
    items: [
      { id: "e4", time: "12 Sep", title: "Campaign completed — Apple Music", meta: "All deliverables approved", tone: "green" as const, tag: "Milestone" },
      { id: "e5", time: "04 Sep", title: "Contract signed — Gymshark", meta: "45-day exclusivity agreed", tone: "blue" as const, tag: "Contract" },
      { id: "e6", time: "01 Sep", title: "Offer accepted — Gymshark", meta: "Moved to Active", tone: "blue" as const, tag: "Decision" },
    ],
  },
];

export const assistantAbilities = [
  { id: "s1", title: "Price a campaign", sub: "What to charge for 2 Reels and 3 Stories" },
  { id: "s2", title: "Draft a brand pitch", sub: "Outreach written in your voice" },
  { id: "s3", title: "Summarise my earnings", sub: "Paid, pending and forecast" },
  { id: "s4", title: "Check my deadlines", sub: "What's due across every campaign" },
];
