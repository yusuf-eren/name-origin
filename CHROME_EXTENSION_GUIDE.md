# Name Origin Chrome Extension

A Chrome extension that shows a popup when you select text on any webpage, similar to Google Translate.

## Features

- Select any text on a webpage
- A circular popup appears above the selection
- Click the popup to open a menu showing the selected text in a text box

## Development

### Install Dependencies
```bash
npm install
```

### Build the Extension
```bash
npm run build
```

This will create a `dist` folder with all the necessary files.

## Install in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `dist` folder from this project
5. The extension is now installed!

## Testing

1. Go to any webpage
2. Select some text
3. You'll see a circular purple popup appear above the text
4. Click the popup to open a menu with the selected text

## Publishing to Chrome Web Store

1. Create a developer account at [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Pay the one-time $5 registration fee
3. Click "New Item"
4. Upload a ZIP file of your `dist` folder
5. Fill in the required information:
   - Description
   - Screenshots
   - Category
   - Privacy policy (if collecting data)
6. Submit for review
7. Wait for approval (usually 1-3 days)

## Project Structure

- `public/manifest.json` - Chrome extension configuration
- `src/content.tsx` - Content script (injected into web pages)
- `src/components/SelectionPopup.tsx` - Popup button component
- `src/components/MenuPanel.tsx` - Menu with text display
- `dist/` - Build output (load this in Chrome)

