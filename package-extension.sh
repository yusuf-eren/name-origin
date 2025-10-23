#!/bin/bash

echo "🚀 Building Name Origin Chrome Extension..."
echo ""

# Build the extension
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "📦 Creating ZIP file..."
echo ""

# Remove old ZIP if exists
if [ -f "name-origin-extension.zip" ]; then
    rm name-origin-extension.zip
    echo "🗑️  Removed old ZIP file"
fi

# Create new ZIP from dist folder
cd dist
zip -r ../name-origin-extension.zip .
cd ..

# Check if ZIP was created successfully
if [ -f "name-origin-extension.zip" ]; then
    FILE_SIZE=$(du -h name-origin-extension.zip | cut -f1)
    echo ""
    echo "✅ Extension packaged successfully!"
    echo "📁 File: name-origin-extension.zip"
    echo "📊 Size: $FILE_SIZE"
    echo ""
    echo "🎯 Ready to upload to Chrome Web Store!"
    echo "   Go to: https://chrome.google.com/webstore/devconsole/"
else
    echo "❌ Failed to create ZIP file!"
    exit 1
fi

