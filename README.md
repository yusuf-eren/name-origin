# Name Origin - Nationality Identifier

Chrome extension that identifies nationality and ethnicity by analyzing names and surnames with AI-powered insights.

## 🚀 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build extension
npm run build
```

## 📦 Package for Chrome Web Store

### Option 1: Using NPM Script (Quick)
```bash
npm run package
```

### Option 2: Using Shell Script (Detailed)
```bash
./package-extension.sh
```

This will:
1. Build the extension
2. Create `name-origin-extension.zip`
3. Show file size and confirmation

## 🔧 Manual Build & Package

```bash
# Build
npm run build

# Create ZIP manually
cd dist
zip -r ../name-origin-extension.zip .
cd ..
```

## 📤 Publishing to Chrome Web Store

1. Run `npm run package` or `./package-extension.sh`
2. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
3. Click "New Item"
4. Upload `name-origin-extension.zip`
5. Fill in store listing details
6. Submit for review

## 🎨 Brand Colors

- Dark Navy: `#001b3d`
- Medium Blue: `#143c8b`
- Bright Blue: `#0095ff`

## 📁 Project Structure

```
name-origin/
├── public/
│   ├── manifest.json           # Extension manifest
│   └── *.png                    # Extension icons
├── src/
│   ├── assets/                  # Logo files
│   ├── components/
│   │   ├── MenuPanel.tsx        # Main nationality display
│   │   ├── MenuPanel.css
│   │   ├── SelectionPopup.tsx   # Selection button
│   │   └── SelectionPopup.css
│   ├── content.tsx              # Content script entry
│   └── content.css
├── dist/                        # Build output (gitignored)
└── name-origin-extension.zip    # Package for upload (gitignored)
```

## 🔑 Setup

1. Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com/)
2. Install the extension
3. Select any name on a webpage
4. Enter your API key when prompted
5. The extension will analyze and display nationality

## ⚙️ Features

- 🌍 Primary nationality identification with confidence %
- 🗺️ Specific regional analysis
- 👥 Ethnic background detection
- 🔄 Alternative nationality suggestions
- 🎯 Cultural and religious context
- 📊 Detailed name analysis (surname & first name)
- 🏛️ Historical context and etymology

## 📝 Privacy

- API keys stored locally in Chrome storage
- No data sent to our servers
- All analysis done via OpenAI API
- See full privacy policy in store listing

## 🛠️ Tech Stack

- React 19
- TypeScript
- Vite
- Chrome Extension Manifest V3
- OpenAI API (GPT-4.1-mini)

## 📄 License

All rights reserved.
