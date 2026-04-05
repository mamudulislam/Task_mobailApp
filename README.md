# BHC Jobs - Mobile App

A modern, high-performance job search and career platform built with **React Native** and **Expo**. This application allows users to discover job opportunities, explore different industries, and connect with top companies.

## 🚀 Overview

BHC Jobs is designed to provide a seamless experience for job seekers. It features a robust search system, industry-specific browsing, and a personalized user interface with support for both Light and Dark modes.

## 📱 Features

- **Advanced Job Search:** Filter and search jobs by title, company, or location.
- **Industry Insights:** Browse job opportunities categorized by industry.
- **Top Companies:** Explore featured companies and their current openings.
- **User Authentication:** Secure Login and Registration screens for personalized experiences.
- **Dynamic Theming:** Built-in support for Light and Dark modes.
- **Responsive Design:** Optimized for various mobile screen sizes using `react-native-safe-area-context` and `react-native-reanimated`.
- **API Integration:** Real-time data fetching from the BHC Jobs backend.

## 🛠️ Tech Stack

- **Framework:** [Expo](https://expo.dev/) (SDK 54)
- **Library:** [React Native](https://reactnative.dev/)
- **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Styling:** React Native Stylesheets & Theme Context
- **Animations:** [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) & [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)
- **Icons:** [@expo/vector-icons](https://docs.expo.dev/guides/icons/) (Ionicons)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## 📥 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo Go app on your mobile device (for development)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your API URL:
   ```env
   EXPO_PUBLIC_API_URL=https://dev.bhcjobs.com
   ```

4. Start the development server:
   ```bash
   npx expo start
   ```

## 📦 Build & APK

You can find the latest Android build (APK) here:

👉 **[Download APK (Expo Build)](https://expo.dev/accounts/mamudul/projects/my-app/builds/1491c0ac-d92e-4e67-a8da-11ba2780aa88)**

> **Note:** This link grants access to the build artifacts generated via EAS (Expo Application Services) and will remain valid for 13 days from the date of generation.

## 📁 Project Structure

```text
├── app/               # Main application screens (Expo Router)
│   ├── _layout.tsx    # Root layout and providers
│   ├── index.tsx      # Home / Dashboard
│   ├── login.tsx      # Login screen
│   └── register.tsx   # Registration screen
├── components/        # Reusable UI components
│   ├── JobCard.tsx
│   ├── CompanyCard.tsx
│   ├── IndustryCard.tsx
│   └── ...
├── context/           # React Context (Theme, etc.)
└── assets/            # Static assets (images, fonts)
```

## 📄 License

This project is private and intended for internal use.
