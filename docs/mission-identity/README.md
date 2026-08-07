# LunarLogic Mission & Identity Document (v4)

Branded, 14-page PDF — 1 cover + 13 numbered sections — presenting LunarLogic's
mission, discovery-first build model, ideal client profile, differentiation, and
operating values.

## Files

- **`../LunarLogic_Mission_Identity_v4.pdf`** — the deliverable (Letter, one section per page).
- **`LunarLogic_Mission_Identity_v4.html`** — self-contained source. All CSS is inline
  and both typefaces (Fraunces, Nunito) are embedded as base64 woff2, so the file renders
  identically offline with no network access.

## Brand system

Pulled directly from the website theme (`tailwind.config.ts`, `app/globals.css`,
`components/`), not from any prior brand-guide PDF:

- **Background** `#020617` (slate-950) with blue/indigo radial glows
- **Wordmark gradient** blue-400 `#60A5FA` → indigo-400 `#818CF8`; crescent-moon mark
- **Accents** blue `#3B82F6`, indigo `#6366F1`, cyan `#22D3EE` (section labels, table
  headers, callout borders)
- **Type** Fraunces (serif) for titles, Nunito (sans) for body

## Rebuilding the PDF

The HTML is print-ready at Letter size. Render with headless Chromium:

```bash
chrome --headless --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=LunarLogic_Mission_Identity_v4.pdf \
  "file://$PWD/LunarLogic_Mission_Identity_v4.html"
```

To edit content, change the HTML and re-render — the layout, tables, callouts, and
numbered lists are all driven by the inline `<style>` block.
