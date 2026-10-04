# Public homepage, adaptive welcome, and shared integrations

## Build
- Move the existing creator dashboard from `/` to `/dashboard`, then make `/` the public first-load homepage in preview and published builds.
- Update only creator navigation that must still point to the moved dashboard; leave all creator screen content and the brand transaction styling unchanged.
- Build a bold, color-block public homepage for both creators and brands, with one Get Started action to `/welcome`.
- Rework `/welcome` into genuinely distinct creator and brand states while preserving its toggle and primary action styling.
- Build one reusable Integrations screen and render it inside both `/a/integrations` and `/brand/integrations`, parameterized as Tola or Gymshark.

## Visual direction
- Homepage: large confident typography, strong flat color fields, chunky graphic forms, and bold pictograms rather than thin dashboard-style icons.
- Welcome creator state: current dark red background, deal/payment moments, and brand marks.
- Welcome brand state: a contrasting background, offset platform/reach cards, and recognizable social platform marks.
- Integrations: a clean logo-led grid using recognizable Slack, Gmail, Drive, Canva, YouTube, and Instagram marks.

## Technical details
- Keep all data static; no Cloud or database is needed.
- Reuse a single integrations component with role-specific shell and account-name props.
- Add unique metadata for the new homepage and moved dashboard route.
- Verify homepage → welcome → both dashboards, both integrations paths, mobile/desktop layouts, and current build health.
