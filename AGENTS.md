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

- Keep all editable portfolio content in `src/lib/portfolio-data.ts` so personal details stay centralized.
- Keep the first-version chat local and stateless; it truthfully identifies itself as mock behavior until a server AI integration is requested.
- The "Hỏi AI" section calls Gemini server-side via createServerFn in src/lib/ai-chat.functions.ts using GOOGLE_API_KEY; the floating chat stays local mock. Why: keeps the key off the browser.
