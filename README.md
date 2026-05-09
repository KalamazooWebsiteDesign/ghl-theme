# KWD GHL Theme

Custom CSS for Kalamazoo Website Design's GoHighLevel agency portal (white-labeled as **NEXUS**).

Hosted via [jsDelivr](https://www.jsdelivr.com/) — single `<link>` tag in GHL → all clients pull the latest tagged release.

## Use it

Paste this into **Agency → Settings → Company → Custom JavaScript** (the Custom CSS field rejects HTML tags — loader injects the link tag for you and also marks `<html data-kwd-page="settings|main">` for SPA-aware CSS scoping):

```html
<script src="https://cdn.jsdelivr.net/gh/KalamazooWebsiteDesign/ghl-theme@v1.0.3/dist/loader.js"></script>
```

The loader auto-loads the matching CSS at the same version tag.

Bump the version in the `<script src>` to upgrade — that's the only change needed in GHL.

For latest (auto-update, no rollback safety):
```
https://cdn.jsdelivr.net/gh/KalamazooWebsiteDesign/ghl-theme@main/dist/loader.js
```

## Structure

```
src/sections/
  01-fonts.css         Google Fonts imports
  02-tokens.css        :root CSS variables (brand colors, fonts)
  03-sidebar-nav.css   Sidebar + nav theming
  04-dashboard.css     Header, action buttons, conversations
  05-login.css         NEXUS login screen (scoped via :has(.hl_login))
dist/main.css          Built bundle (committed for jsDelivr)
build.sh               Concatenates sections into dist/main.css
```

## Develop

```bash
# Edit sections
vim src/sections/03-sidebar-nav.css

# Rebuild
bash build.sh

# Commit + tag
git add . && git commit -m "feat: tweak sidebar hover"
git tag v1.0.1
git push && git push --tags
```

jsDelivr serves the new tag immediately. URL pattern:
```
https://cdn.jsdelivr.net/gh/KalamazooWebsiteDesign/ghl-theme@<tag>/dist/main.css
```

## Per-tenant overrides

Each subaccount's Custom CSS field accepts raw CSS (no HTML). Put var overrides there:

```css
:root {
  --primary: #ff6600;
  --kwd-gold: #c0392b;
}
```

The shared bundle is loaded once at agency level via Custom JS injector and cascades down — subaccount only needs vars.

## Versioning

- `v1.x` — current major. Token + selector rules backwards-compatible within major.
- `v2.x` — breaking restructure. Pin clients to `v1.x` until manually migrated.
- Use `git tag -a vX.Y.Z -m "..."` to create annotated tags.

## Rollback

Old tag still served. Change client's `<link>` URL back to previous version.

## Notes

- GHL exposes 533 `--*` CSS vars on `<html>`. Theme overrides ~40 of them.
- `:has(.hl_login)` scopes login styles — only fires on login screen.
- Tailwind utility classes (`.bg-apple-500`, `.text-white`, etc.) require `!important` in many places because GHL inlines styles.
- `hr-*` prefix = HighLevel React design system primitives (stable). `hl-*` = app-specific (less stable).
