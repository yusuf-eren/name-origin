# Chrome Web Store Submission Guide

## 📋 Required Information

### **1. Contact Email**
- Go to: Account tab
- Enter your email address
- Verify the email (check inbox for verification link)

---

## 🔒 Privacy Practices Tab

### **Single Purpose Description**
```
This extension identifies the nationality and ethnicity of names by analyzing their linguistic and cultural characteristics using AI technology.
```

### **Permission Justifications**

#### **activeTab Permission**
**Justification:**
```
The activeTab permission is required to allow users to select text (names) on any webpage. When a user highlights a name, our extension displays a popup button to analyze that name. This permission ensures the extension can read the selected text and inject the analysis interface into the current page without requiring broad access to all website data.
```

#### **Host Permissions (all_urls)**
**Justification:**
```
The <all_urls> host permission is necessary because users need to analyze names on any website they visit. This permission allows our content script to run on all pages, enabling the text selection feature and popup display functionality. The extension only reads user-selected text and does not access or collect any other webpage data.
```

#### **storage Permission**
**Justification:**
```
The storage permission is used to securely store the user's OpenAI API key locally in the browser. This key is necessary for the name analysis functionality. The key is stored using Chrome's sync storage API, allowing users to maintain their settings across devices. No other data is collected or stored. Users have full control to delete or update their API key at any time through the extension interface.
```

#### **Remote Code Use**
**Justification:**
```
This extension does NOT use remote code. All code is bundled within the extension package. We only make API calls to OpenAI's API service to analyze names, which is necessary for the core functionality. No remote JavaScript code is loaded or executed.
```

**OR if they ask specifically:**
```
Not applicable - This extension does not use remote code. All functionality is contained within the packaged extension files.
```

---

## 📝 Data Usage Certification

Check the following on the Privacy practices tab:

✅ **What user data does your item access or collect?**
- User-provided data: OpenAI API Key (stored locally)
- Selected text from webpages (only when user selects text)

✅ **How is user data being used?**
- The API key is used to authenticate with OpenAI's service
- Selected text is sent to OpenAI API for name analysis
- Data is NOT shared with third parties
- Data is NOT used for personalization

✅ **I certify that:**
- My use of data complies with the Limited Use requirements
- My use of data complies with the User Data Privacy policy
- I have a privacy policy

---

## 🔐 Privacy Policy

**You need to host a privacy policy.** Here's the content:

### Privacy Policy Template:

```
Privacy Policy for Name Origin - Nationality Identifier

Last Updated: [Current Date]

1. OVERVIEW
Name Origin is a Chrome extension that helps identify the nationality and ethnicity of names using AI analysis.

2. DATA COLLECTION
We collect and store:
- Your OpenAI API key (stored locally in Chrome's sync storage)
- Text that you select on webpages (only when you actively select text)

3. HOW WE USE YOUR DATA
- API Key: Used solely to authenticate requests to OpenAI's API service
- Selected Text: Sent to OpenAI's API for name analysis and immediately discarded

4. DATA STORAGE
- Your API key is stored locally in your browser using Chrome's storage.sync API
- No data is stored on our servers
- We do not have access to your API key or analyzed names

5. THIRD-PARTY SERVICES
- OpenAI API: Selected text is sent to OpenAI for analysis
- OpenAI's privacy policy applies to data sent to their service
- View OpenAI's privacy policy at: https://openai.com/privacy/

6. DATA SHARING
- We do NOT share your data with any third parties
- We do NOT sell your data
- We do NOT use your data for advertising

7. USER RIGHTS
You can:
- Delete your API key at any time through the extension interface
- Uninstall the extension to remove all stored data
- Request data deletion by contacting us

8. SECURITY
- All data is stored locally using Chrome's secure storage API
- API communications use HTTPS encryption
- We follow industry-standard security practices

9. CHANGES TO THIS POLICY
We may update this privacy policy. Changes will be posted with a new "Last Updated" date.

10. CONTACT
For questions about this privacy policy, contact: [YOUR EMAIL]

11. COMPLIANCE
This extension complies with:
- Chrome Web Store Developer Program Policies
- Google API Services User Data Policy
- General Data Protection Regulation (GDPR)
- California Consumer Privacy Act (CCPA)
```

---

## 📤 Where to Host Privacy Policy

**Option 1: GitHub Pages (Free)**
1. Create a file `privacy-policy.html` in your repo
2. Enable GitHub Pages in repo settings
3. Use URL: `https://[username].github.io/name-origin/privacy-policy.html`

**Option 2: Your Website**
- Host on your personal/company website

**Option 3: Free Hosting Services**
- Google Sites
- Netlify
- Vercel

---

## ✅ Submission Checklist

Before submitting:

- [ ] Contact email added and verified
- [ ] Single purpose description filled
- [ ] activeTab permission justified
- [ ] Host permissions justified
- [ ] storage permission justified
- [ ] Remote code justification provided
- [ ] Privacy policy created and hosted
- [ ] Privacy policy URL added to submission
- [ ] Data usage certification completed
- [ ] Screenshots uploaded (1-5 images)
- [ ] Extension icon uploaded (128x128)
- [ ] Store listing description written
- [ ] Promotional images uploaded (optional)

---

## 📸 Required Assets

### Screenshots (Required: 1-5)
- Size: 1280x800 or 640x400 pixels
- Show the extension in action
- Recommended: 3-4 screenshots showing:
  1. Text selection with popup
  2. Nationality result display
  3. API key setup screen
  4. Alternative nationalities view

### Store Listing
**Short Description (132 chars max):**
```
Instantly identify nationality & ethnicity from names with AI-powered analysis. Simple, fast, accurate.
```

**Detailed Description:**
```
Name Origin - Nationality Identifier

Discover the nationality and ethnicity behind any name with just a click!

✨ KEY FEATURES:
• Select any name on any webpage
• Instant AI-powered nationality identification
• Confidence percentage for results
• Alternative nationality suggestions
• Regional and ethnic background analysis
• Cultural and religious context
• Beautiful, intuitive interface

🚀 HOW IT WORKS:
1. Select a name on any webpage
2. Click the popup button that appears
3. View detailed nationality analysis instantly

🔐 PRIVACY & SECURITY:
• Your OpenAI API key is stored securely and locally
• No data is sent to our servers
• You have full control over your data

💡 PERFECT FOR:
• Genealogy research
• Cultural studies
• Professional networking
• Academic research
• General curiosity about name origins

⚙️ SETUP:
Requires an OpenAI API key (you'll be prompted on first use)
Get your key at: https://platform.openai.com/

🎨 FEATURES:
✓ Works on all websites
✓ Lightning-fast analysis
✓ Clean, modern design
✓ No ads, no tracking
✓ Offline storage

Start discovering name origins today!
```

**Category:** Productivity or Tools

**Language:** English

---

## 🎯 Quick Start After Approval

Once approved, users will:
1. Install from Chrome Web Store
2. Select any name on a webpage
3. Enter OpenAI API key when prompted
4. Get instant nationality analysis

---

## 📞 Support

For any questions during submission, refer to:
- Chrome Web Store Developer Support
- Google Developer Program Policies: https://developer.chrome.com/docs/webstore/program-policies/

