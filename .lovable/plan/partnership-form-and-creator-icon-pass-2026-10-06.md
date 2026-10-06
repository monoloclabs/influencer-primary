# Partnership form and creator icon pass

## Changes
1. Pin the partnership form header and Send request button. Only the fields between them scroll, including when many social handles are added.
2. Accept arbitrary prototype text in social handle and website fields, without URL validation.
3. Add repeatable social handle rows with an icon-only platform picker, an @ handle field and a plus control. Offer TikTok, Instagram, Facebook, X, Snapchat and YouTube using recognizable platform logos.
4. Replace icon artwork only on creator bottom navigation, drawer, Dashboard snapshots, Shoots & Events, Instructions and Money. Use detailed filled artwork with gray outlines and gray drop shadows, without background containers. Selected bottom navigation icons become solid orange. Preserve navigation chrome, labels, links and existing screen content. Leave brand screens unchanged.

## Assumptions
- The partnership form remains a prototype thank-you flow, with no message delivery added.
- No new reference attachment is available in this message. Use the described detailed filled, gray outlined and shadowed style; exact reference matching requires the image.

## Technical details
- Use a shared creator-only SVG icon component with semantic artwork and shadow tokens, without changing shared brand icon components.
- Reuse a shared social handles field wherever the specified prototype input exists.
- Check passive build/error signals only. No browser automation or test scripts.
