// Brand-side sample data. Creators are always anonymous here: identified by
// a match code, tier and reach band only, never names or handles.

export const brandAccount = { name: "Gymshark", contact: "Marcus Vance", period: "This quarter" };

export type BrandCampaignStatus = "matched" | "active" | "completed";

export type BrandCampaign = {
  id: string;
  title: string;
  status: BrandCampaignStatus;
  budget: number;
  spent: number;
  creator: { code: string; tier: string; reach: string; engagement: string; niche: string };
  platforms: string[];
  deliverables: { label: string; due: string; state: "Planned" | "In review" | "Approved" | "Live" }[];
  timeline: string;
  objective: string;
};

export const brandCampaigns: BrandCampaign[] = [
  {
    id: "bc1",
    title: "Summer Lift Series",
    status: "active",
    budget: 12500,
    spent: 6250,
    creator: { code: "CR-408", tier: "Mid-tier", reach: "50K–250K", engagement: "4.8%", niche: "Fitness" },
    platforms: ["Instagram", "TikTok"],
    deliverables: [
      { label: "Hero Reel", due: "Oct 8", state: "In review" },
      { label: "Story set (3)", due: "Oct 10", state: "Planned" },
      { label: "TikTok 60s", due: "Oct 14", state: "Planned" },
    ],
    timeline: "Oct 1 – Oct 20",
    objective: "Launch the Summer Lift capsule with authentic training content.",
  },
  {
    id: "bc2",
    title: "Recovery Range Teaser",
    status: "matched",
    budget: 6000,
    spent: 0,
    creator: { code: "CR-221", tier: "Micro", reach: "10K–50K", engagement: "6.1%", niche: "Wellness" },
    platforms: ["TikTok", "Threads"],
    deliverables: [
      { label: "TikTok teaser", due: "Oct 22", state: "Planned" },
      { label: "Threads carousel", due: "Oct 24", state: "Planned" },
    ],
    timeline: "Oct 18 – Oct 30",
    objective: "Build early anticipation for the recovery range.",
  },
  {
    id: "bc3",
    title: "Spring Training Drop",
    status: "completed",
    budget: 18500,
    spent: 18500,
    creator: { code: "CR-117", tier: "Pro", reach: "250K–1M", engagement: "3.9%", niche: "Fitness" },
    platforms: ["YouTube", "Instagram"],
    deliverables: [
      { label: "Dedicated YouTube video", due: "Apr 12", state: "Live" },
      { label: "Hero Reel", due: "Apr 15", state: "Live" },
    ],
    timeline: "Apr 1 – Apr 30",
    objective: "Drive sign-ups to the spring training programme.",
  },
];

export const brandStatusMeta: Record<BrandCampaignStatus, { label: string; className: string }> = {
  matched: { label: "Matched", className: "bg-tint-blue text-tint-blue-foreground" },
  active: { label: "Active", className: "bg-primary-soft text-primary" },
  completed: { label: "Completed", className: "bg-tint-green text-tint-green-foreground" },
};

export type BrandApproval = {
  id: string;
  kind: "content" | "counter";
  campaignId: string;
  title: string;
  creatorCode: string;
  summary: string;
  details: string[];
  due: string;
};

export const brandApprovals: BrandApproval[] = [
  {
    id: "ba1",
    kind: "content",
    campaignId: "bc1",
    title: "Hero Reel, first cut",
    creatorCode: "CR-408",
    summary: "45s Reel, gym floor footage, caption draft attached.",
    details: ["Length: 45 seconds", "Caption mentions #SummerLift and discount code", "Music: licensed track", "Posting window: Oct 8, 6pm"],
    due: "Review by Oct 7",
  },
  {
    id: "ba2",
    kind: "counter",
    campaignId: "bc2",
    title: "Counter-offer on usage rights",
    creatorCode: "CR-221",
    summary: "Creator asks +$900 for 30-day paid usage.",
    details: ["Original fee: $6,000", "Requested: $6,900", "Reason: 30-day paid amplification added to brief", "Exclusivity unchanged"],
    due: "Respond by Oct 9",
  },
];

export const briefsAwaitingMatch = [
  { id: "br1", title: "Hydration bottle launch", budget: "$4,000–$6,000", reach: "Micro", platforms: ["Instagram", "TikTok"], posted: "2 days ago" },
];

export const brandTransactions = [
  { id: "bt0", title: "Milestone due, Recovery Range final", amount: -3000, date: "Oct 12", pending: true },
  { id: "bt1", title: "Escrow deposit, Summer Lift Series", amount: -12500, date: "Oct 1" },
  { id: "bt2", title: "Milestone released, CR-408 kickoff", amount: -6250, date: "Oct 3" },
  { id: "bt3", title: "Escrow deposit, Recovery Range", amount: -6000, date: "Sep 28" },
  { id: "bt4", title: "Refund, unused usage add-on", amount: 450, date: "Sep 20" },
  { id: "bt5", title: "Final payout, Spring Training Drop", amount: -9250, date: "May 2" },
];

export const brandActivity = [
  { id: "a1", title: "Hero Reel submitted for review", meta: "Summer Lift Series · CR-408", date: "Today" },
  { id: "a2", title: "Counter-offer received", meta: "Recovery Range Teaser · CR-221", date: "Yesterday" },
  { id: "a3", title: "Brief posted", meta: "Hydration bottle launch", date: "2 days ago" },
  { id: "a4", title: "Creator matched", meta: "Recovery Range Teaser · CR-221", date: "Sep 27" },
  { id: "a5", title: "Campaign completed", meta: "Spring Training Drop · CR-117", date: "May 2" },
];

export const money = (n: number) =>
  `${n < 0 ? "−" : ""}$${Math.abs(n).toLocaleString("en-US")}`;
