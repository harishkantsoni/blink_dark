# CLAUDE.md

## Project

Blink Dark is a Chrome Manifest V3 extension. It paints pages dark while they load, so there is no white flash. It has no build step, no dependencies and no tests. It is plain JS and CSS.

## Files

- `manifest.json`: declares one content script that runs on `<all_urls>` at `document_start`, top frame only (`all_frames: false`). It injects `prepaint.css` and `done.js`.
- `prepaint.css`: sets `html` to `#111` with `color-scheme: dark`, but only while `html` has no `data-prepaint-done` attribute. It uses `!important` to beat page styles.
- `done.js`: sets `data-prepaint-done` on `<html>` after the first paint, which turns the dark override off. It waits for `DOMContentLoaded` (or runs immediately if the document has already loaded) and then two `requestAnimationFrame` calls. A 3s `setTimeout` is a fallback, because rAF doesn't fire in background tabs and slow pages may never reach `DOMContentLoaded`.

## How it works

CSS and JS are injected together. The CSS applies at once, and the JS removes its effect by adding the attribute. The CSS selector depends on the exact attribute name `data-prepaint-done`, so if you rename it, change it in both files.

## Development

- Load it by opening `chrome://extensions`, enabling Developer mode, choosing "Load unpacked" and selecting this directory. After edits, click reload on the extension card.
- Test by loading a slow page, or by throttling the network in DevTools, and check that no white flash appears. Also check that the page renders normally once the override lifts.
- Keep `done.js` idempotent (the `finished` guard) and keep the safety-net timeout.
- Bump `version` in `manifest.json` when you make a user-visible change.
