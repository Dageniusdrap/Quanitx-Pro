# Quantix Pro Deployment Guide

This guide outlines the steps to deploy Quantix Pro to the web and prepare it for mobile app stores.

## Phase 1: Instant Web Deployment (Free)

The fastest way to get your app live and shareable is using Vercel (the creators of Next.js).

### Steps:
1.  **Create a Vercel Account:** Go to [vercel.com](https://vercel.com) and sign up using your GitHub account.
2.  **Import Project:**
    *   Click "Add New..." -> "Project".
    *   Select your `Quanitx-Pro` repository.
    *   Click "Deploy".
3.  **Wait for Build:** Vercel will build your site. In about 1 minute, you will get a live URL (e.g., `quantix-pro.vercel.app`).
4.  **Custom Domain (Optional):** You can buy `quantixpro.com` or similar and connect it in Vercel settings for a professional look.

## Phase 2: Convert to Mobile App (Capacitor)

To publish on the Apple App Store and Google Play Store, we use **Capacitor** to wrap your Next.js website in a native shell.

### Prerequisites:
*   **Xcode** (for iOS) - Required Mac.
*   **Android Studio** (for Android).

### Setup Commands:
1.  Install Capacitor:
    ```bash
    npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
    npx cap init
    ```
    *   App Name: `Quantix Pro`
    *   Package ID: `com.talentedvillagers.quantixpro`
    *   Web Dir: `out` (We need to change Next.js to static export)

2.  Update `next.config.mjs`:
    ```javascript
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      output: 'export',
      images: { unoptimized: true }
    };
    export default nextConfig;
    ```

3.  Build and Sync:
    ```bash
    npm run build
    npx cap add ios
    npx cap add android
    npx cap sync
    ```

4.  Open in Native IDEs:
    *   `npx cap open ios` -> Opens Xcode.
    *   `npx cap open android` -> Opens Android Studio.

## Phase 3: App Store Listing Checklist

Before submitting, you need these assets:

| Asset | Requirements | Status | 
| :--- | :--- | :--- |
| **App Icon** | 1024x1024px PNG (We have this!) | ✅ |
| **Screenshots** | 6.5" iPhone (1284x2778px) | ❌ |
| **Privacy Policy** | A URL explaining data usage | ❌ |
| **Support URL** | A URL for user contact | ✅ (GitHub) |
| **Description** | SEO-optimized text | ✅ |

### Next Steps for You:
1.  **Deploy to Vercel** to get a live testing link.
2.  **Decide on Mobile:** Do you want to proceed with the Capacitor setup for iOS/Android now?
