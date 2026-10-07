# Blink Dark

A small Chrome extension that keeps page backgrounds light grey while a page loads, so you don't get a white flash. Once the page has finished loading, the page's own colours come back.

## Install

1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Click **Load unpacked** and select this folder.

After editing any file, click the reload icon on the extension's card, then reload the tab you're testing.

## How it works

- `manifest.json` runs a content script on every page at `document_start` (top frame only).
- `prepaint.css` sets `background-color` to light grey (`#d3d3d3`) on `html`, `body` and everything inside, until `<html>` gets a `data-prepaint-done` attribute. Images, text, icons and `background-image` are not touched.
- `done.js` sets that attribute once the window `load` event has fired and two frames have painted. A 10-second timeout lifts it anyway, so a page that never finishes loading isn't grey forever.

## Customising

- **Colour:** change `#d3d3d3` in `prepaint.css`.
- **Maximum grey time:** change `10000` (milliseconds) at the bottom of `done.js`.

## Limitations

- Chrome can show a white frame between navigation and the first moment a content script can run. An extension can't change that. A dark browser theme is the usual workaround.
- Coloured blocks such as buttons, banners and spinners drawn with a background colour look flat grey until the page loads.
- On single-page apps, `load` can fire before the app has drawn its interface, so the grey may lift early.
