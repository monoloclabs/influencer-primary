# Alfred UI Update & Navigation Refinement

## Goal
Refine the existing Alfred mobile UI without changing its established white, orange/blue, rounded, spacious visual language. The update will separate life Plans from Alfred Subscription, strengthen the financial experience, and simplify schedule/navigation patterns.

## Implementation

### 1. Navigation and app shell
- Replace bottom tabs with **Home, Plans, Transactions, Approvals, Assistant** and highlight them by route.
- Add a centered floating orange **+** action above the nav that opens the existing Create experience; retain `/create` as the underlying flow but no longer present it as a destination tab.
- Update the top brand treatment to an orange **Alfred** wordmark with a small tie mark while preserving menu and notification controls.
- Keep safe-area spacing, fixed mobile navigation, and existing app width behavior.

### 2. Side drawer restructuring
- **Life:** Tasks, Reminders, Events, Calendar, Files in one divided card, with short deltas, blue treatment for Tasks/Reminders/Events, and no chevrons.
- **Money:** exactly Wallet, Purchases, Subscription; each as its own rounded card with larger uncontained icons and concise deltas. Rename membership references from Plans to Subscription.
- **Account:** clean uncontained rows for Profile, Subscription, What’s new, Invite friend, Settings, Support; orange ACCOUNT heading; simple red Logout row with door icon and no container.
- **Discover:** orange outlined Discover and blue Research using a book/reference icon.
- Preserve unrelated drawer groups and add unobtrusive Standard/Premium lock cues only where Money/My Office access is communicated.

### 3. Plans and Events
- Add a dedicated **Plans** destination showing substantial life-plan containers with dates, people, bookings, tasks, reminders, notes/files, locations, and Alfred actions.
- Add “Plan” to the existing Create flow so plans can be started manually; keep Assistant language capable of creating plans.
- Replace the Events placeholder with a focused scheduled-happenings screen, showing event time and optional parent Plan so Events and Plans remain clearly distinct.

### 4. Wallet and financial screens
- Refine Wallet around a dominant, correctly proportioned debit card with semantic warm-orange aurora/iridescent tokens, crisp dark details, and restrained peach/gold/amber light shifts.
- Add balanced **Withdraw, Top up, Controls** actions beneath the card.
- Create a bottom-nav **Transactions** screen with working **History | Subscriptions** tabs for transaction history and recurring subscription management.
- Refine Approvals around payment/booking authorization examples while preserving approve/decline interactions and the shared 1:2 secondary/primary CTA layout.
- Add a clear Alfred **Subscription** tier view (Free, Standard, Premium) where Standard unlocks Money and Premium unlocks My Office, without turning pricing into a primary app destination.

### 5. Timeline and Home schedule
- Replace the connected-line Timeline with a clean date-grouped chronological list, no line and no dots.
- Add a compact calendar jump action near the schedule heading.
- Refine Home’s upcoming schedule presentation using the existing Alfred cards, spacing, and orange/blue hierarchy while keeping Home the nerve center.

### 6. Data, metadata, and validation
- Extend static demo data only where needed for plans, events, transactions, subscriptions, approvals, and schedule examples.
- Give every new content route unique Alfred-specific title, description, Open Graph metadata, `og:type`, and `twitter:card`; complete missing social metadata on touched routes.
- Verify routing and interactions in the live app at mobile and desktop widths, including drawer rows, floating Create entry, tabs, approvals, wallet actions, and no content/nav overlap.

## Technical details
- Reuse `AppShell`, `AButton`, `ActionPair`, `Card`, `IconBadge`, `Pill`, TanStack Router links, Lucide icons, and current semantic color tokens.
- Add warm aurora card colors as global semantic tokens/utilities rather than hardcoded component colors.
- Keep all bottom sheets bottom-anchored and preserve the existing 1:2 action-row layout.
- Do not embed the supplied screenshots; use them only as component-level visual references.
