# INFLUENCER Offer and Activation Refinement

## Goal
Refine the existing INFLUENCER prototype in place so received brand offers, accepted campaigns, and creator-run Activations form one coherent flow. Preserve the current mobile visual system, five-tab app navigation, reusable UI components, static demo approach, and contained Wallet/Office experiences.

## Implementation

### 1. Global shell and shared identity marks
- Replace the top-left hamburger with a compact text **MENU** control and the top-right bell with a curved messages/chat icon; keep the opened drawer free of any MENU label.
- Preserve the existing Dashboard, Timeline, Campaigns, Approvals, Assistant bottom navigation and floating Create action.
- Add reusable `BrandMark` and `PlatformMark` components backed by a reputable brand-icon set, with accessible labels and graceful fallback marks.
- Cover Gymshark, Spotify, Notion, Sephora, Apple Music, Instagram, TikTok, YouTube, Facebook, and any other platform present in the demo data.

### 2. Shared prototype state and commercial data
- Keep `Campaign` as the brand-owned deal/brief and extend the existing influencer data with typed platform identifiers plus `Activation`, activation status, content items, dates, steps, and campaign references.
- Add a small client-side prototype state provider so accepting or declining an offer persists while navigating among Dashboard, Approvals, Campaigns, campaign detail, and Activations during the current session.
- Transition accepted offers to the existing next commercial state (`pending_approval`), hide resolved offers from pending queues, and prevent activation creation until a campaign is accepted.
- Keep all data static and local; add no authentication, backend, API, or AI integration.

### 3. Dashboard and Campaigns
- Update Dashboard money details: Earnings shows `+$5,760 last payout` in positive green, and the `$13,500` pending-payment value uses the same positive treatment.
- Change compact brand-offer actions to **Open** plus a wider **Accept**; Open uses the existing generic `/plan/$planId` route, while Decline remains exclusive to offer detail.
- Remove embedded Ask AI controls from Campaigns and Approvals.
- Use brand marks on campaign cards, platform marks on platform-specific summary/deliverable rows, green gross fees, and shared blue treatment for net values and the existing Offers vs campaigns explanation.
- Retain text-only commercial requirements such as paid usage rather than forcing a platform logo onto them.

### 4. Approvals and status-aware campaign detail
- Refine brand-offer approval cards into compact, openable cards showing offer type, brand, title, concise meta, value, and **Open / Accept** actions.
- Preserve suitable decision actions for contract-term and content-revision approvals instead of applying offer-only behavior to every item.
- Refactor `/plan/$planId` into one generic, data-populated detail screen:
  - Offers are clearly titled and labeled as offers, retain the rich brief/payment/deliverable/document overview, show a reminder bell, remove edit and wallet actions, and use a fixed **Decline / Accept** action bar.
  - Accepted, active, completed, and payment-stage campaigns remain read-only records with a reminder bell and no editing language.
  - Accepted campaigns expose **Start activation** or **Open activation** when eligible.
- Keep Share where useful, but remove all creator editing of received campaign terms.

### 5. Activations execution workspace
- Add **Activations** to the drawer’s existing DESK grid without changing the drawer’s overall information architecture.
- Add **New activation** beside Campaign in Create’s Business Items, described as the creator execution plan for an accepted campaign.
- Build `/activations` as a data-driven list of activation cards tied only to accepted campaigns, showing campaign reference, platforms, content pieces, schedule, production status, and next steps.
- Build one generic `/activation/$activationId` detail route for all activation records; do not create per-brand pages.
- Add a compact bottom-sheet creation prototype with campaign selection, platforms, content, dates, and notes. Disable or omit offer-stage campaigns so unaccepted offers cannot create activations.

### 6. Wallet terminology and metadata cleanup
- Preserve Wallet’s separate three-item bottom navigation and avoid introducing global app navigation there.
- Remove any obsolete `CD` pill/action only if it exists, and update stale Alfred wording in touched Wallet shell/routes and global metadata to INFLUENCER terminology without redesigning Wallet or Office.
- Keep existing wallet actions and contained behavior otherwise unchanged.

### 7. Validation
- Check every added or touched content route for unique INFLUENCER title, description, Open Graph title/description/type, and Twitter card metadata.
- Verify `/`, `/plans`, `/messages`, `/plan/c2`, `/activations`, `/activation/<id>`, `/create`, drawer navigation, and Wallet at mobile and desktop widths.
- Confirm offer acceptance/decline propagation, activation eligibility, fixed action bars, brand/platform marks, no navigation overlap, no broken links, and no TypeScript, build, console, or runtime errors.

## Technical details
- Reuse `AppShell`, `ActionPair`, `Card`, `Pill`, `IconBadge`, existing sheets, semantic color tokens, and current spacing/radii.
- Use TanStack Router `Link` with route params for dynamic campaign and activation navigation; create both activation route files in the same change so route generation stays valid.
- Use the existing ActionPair 1:2 proportions for Open/Accept and Decline/Accept actions.
- Prefer a small React context for prototype decisions over storage or server persistence; initial SSR and client state remain deterministic.
- Keep brand/platform icons monochrome and token-colored so official shapes remain recognizable without disrupting the existing palette.

## Assumptions
- Accepting an offer moves it to `pending_approval`, matching the existing lifecycle and copy; declining moves it to `declined`.
- Existing accepted campaign records may open pre-seeded activations; eligible records without one show Start activation.
- “CD” will only be removed if found in the current Wallet implementation; no replacement control will be invented.
