<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

Use the shared CampaignState provider for offer decisions and activation creation, and reuse one activation setup sheet across entry points; this keeps campaign lifecycle actions consistent without a backend.

Keep unfinished brand drawer destinations under the brand route namespace and render them with the brand shell; this prevents navigation into creator-only screens while brand features are pending.

Render creator and brand integrations from one shared screen with account context supplied by each route; this keeps connection UI and behavior identical across roles.

Use the creator-only CreatorIcon artwork module on designated creator navigation and money surfaces, never in brand shells; this keeps artwork consistent without changing brand styling.

Use SocialHandlesField for prototype partnership social inputs and keep partnership header/footer outside the scrolling field area; this preserves repeatable input behavior and visible submission controls.
