# BhcJobs React Native Application

This is a React Native application built with [Expo](https://expo.dev) that serves as a candidate task for developing the "BhcJobs" platform interface.

## 🚀 Features

- **Landing Page:** Displays a hero banner, popular industries, top companies, and recommended jobs fetched from live APIs.
- **Login Screen:** User authentication interface with form validation and API integration.
- **Registration Screen:** Multi-step user registration with OTP verification.
- **Modern UI/UX:** Clean, responsive design following the requested blue-theme standard.
- **State Management:** Functional React components with hooks.

## 🛠️ Tech Stack

- **Framework:** [React Native](https://reactnative.dev)
- **Toolchain:** [Expo](https://expo.dev)
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/)
- **API Integration:** Fetch API

## 📦 Setup Instructions

1. **Clone the repository:**
   \`\`\`bash
   git clone <your-github-repo-url>
   cd my-app
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server:**
   \`\`\`bash
   npm start
   \`\`\`

4. **Run the app:**
   - Press \`a\` to run on Android Emulator.
   - Press \`i\` to run on iOS Simulator (macOS only).
   - Scan the QR code with the Expo Go app on your physical device.

## ⚙️ Building the APK

To generate an APK file for Android:
1. Ensure you have the EAS CLI installed (\`npm install -g eas-cli\`).
2. Log in to your Expo account (\`eas login\`).
3. Run the build command:
   \`\`\`bash
   eas build -p android --profile preview
   \`\`\`
   *(You may need to configure \`eas.json\` if not already set up)*

## 📄 API Reference Used
- Base URL: \`https://dev.bhcjobs.com\`
- GET \`/api/industry/get\`
- GET \`/api/job/get\`
- GET \`/api/company/get\`
- POST \`/api/job_seeker/register\`
- POST \`/api/job_seeker/phone_verify\`
- POST \`/api/job_seeker/login\`

---
*Developed for evaluation purposes.*
