# Deployment Guide - Scientific Calculator

This guide will help you deploy your scientific calculator to various platforms.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is built by the creators of Next.js and provides the best Next.js hosting experience.

#### Prerequisites
- GitHub account
- Vercel account (free tier available)

#### Steps:
1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Scientific Calculator"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"
   - Done! Your app will be live in ~2 minutes

**Your calculator will be live at**: `https://your-project-name.vercel.app`

#### Custom Domain (Optional)
- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records as instructed
- SSL certificate is automatic

---

### Option 2: Netlify

Another excellent option with generous free tier.

#### Steps:
1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository
   - Build settings (auto-detected):
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy"

**Your calculator will be live at**: `https://random-name.netlify.app`

---

### Option 3: Local Network Access

Share your calculator on your local network (great for testing on mobile devices).

#### Steps:
1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Find your local IP**:
   - The terminal will show something like:
     ```
     - Network: http://192.168.1.111:3000
     ```

3. **Access from other devices**:
   - On your phone/tablet, open browser
   - Go to the Network URL shown in your terminal
   - The calculator works on any device on your network

---

### Option 4: Docker (For Advanced Users)

Deploy as a container.

#### Create Dockerfile:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

#### Build and run:
```bash
docker build -t scientific-calculator .
docker run -p 3000:3000 scientific-calculator
```

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- ✅ All features work in production build
- ✅ No console errors
- ✅ Responsive on mobile devices
- ✅ Keyboard shortcuts work
- ✅ History persistence (if added)
- ✅ SEO metadata is correct

### Test Production Build Locally:
```bash
npm run build
npm start
```

Visit `http://localhost:3000` and test thoroughly.

---

## 🔧 Environment Configuration

This calculator doesn't require environment variables, but if you add features that do:

### For Vercel:
1. Go to Project Settings → Environment Variables
2. Add your variables
3. Redeploy

### For Netlify:
1. Go to Site Settings → Environment Variables
2. Add your variables
3. Trigger a new deploy

---

## 📊 Performance Optimization

### Before Deploying (Optional):

1. **Image Optimization** (if you add images):
   - Use Next.js Image component
   - Optimize in WebP format

2. **Bundle Analysis**:
   ```bash
   npm install @next/bundle-analyzer
   ```
   Update `next.config.mjs`:
   ```javascript
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   })

   module.exports = withBundleAnalyzer({})
   ```

3. **Check Lighthouse Score**:
   - Open DevTools
   - Go to Lighthouse tab
   - Run audit
   - Aim for 90+ scores

---

## 🌍 CDN & Edge Deployment

### Cloudflare Pages

1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Build output: `.next`
3. Deploy

### AWS Amplify

1. Connect repository
2. Auto-detect build settings
3. Deploy

---

## 📱 PWA (Progressive Web App) - Optional Enhancement

To make your calculator installable on mobile:

1. **Install next-pwa**:
   ```bash
   npm install next-pwa
   ```

2. **Update next.config.mjs**:
   ```javascript
   const withPWA = require('next-pwa')({
     dest: 'public',
     disable: process.env.NODE_ENV === 'development'
   })

   module.exports = withPWA({})
   ```

3. **Create manifest.json** in `/public`:
   ```json
   {
     "name": "Scientific Calculator",
     "short_name": "Sci Calc",
     "description": "Professional scientific calculator",
     "icons": [
       {
         "src": "/icon-192.png",
         "sizes": "192x192",
         "type": "image/png"
       },
       {
         "src": "/icon-512.png",
         "sizes": "512x512",
         "type": "image/png"
       }
     ],
     "theme_color": "#6366f1",
     "background_color": "#0a0a0f",
     "display": "standalone",
     "start_url": "/"
   }
   ```

---

## 🔍 SEO Enhancements (Already Implemented)

Current SEO optimizations:
- ✅ Descriptive title tag
- ✅ Meta description
- ✅ Semantic HTML
- ✅ Fast performance
- ✅ Mobile responsive

### Additional SEO (Optional):
- Add Open Graph tags for social sharing
- Add structured data (JSON-LD)
- Create sitemap.xml
- Add robots.txt

---

## 📈 Analytics (Optional)

### Google Analytics:
1. Get GA tracking ID
2. Add to `app/layout.js`:
   ```javascript
   import Script from 'next/script'

   export default function RootLayout({ children }) {
     return (
       <html>
         <head>
           <Script
             src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
             strategy="afterInteractive"
           />
           <Script id="google-analytics" strategy="afterInteractive">
             {`
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', 'GA_ID');
             `}
           </Script>
         </head>
         <body>{children}</body>
       </html>
     )
   }
   ```

---

## 🎯 Recommended: Vercel Deployment

For the best experience with Next.js:

1. **Automatic HTTPS**
2. **Global CDN**
3. **Perfect for Next.js** (same company)
4. **Zero config** required
5. **Free tier** is generous
6. **Instant rollbacks**
7. **Preview deployments** for branches

### Deploy Now:
```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy
vercel

# Follow prompts
# Your app will be live in minutes!
```

---

## 🛡️ Security Considerations

This calculator runs entirely client-side, so there are minimal security concerns. However:

- ✅ No sensitive data stored
- ✅ No backend/database
- ✅ No user authentication
- ✅ All calculations in browser
- ✅ HTTPS on deployed platforms

---

## 📞 Support & Troubleshooting

### Common Issues:

**Build fails:**
- Ensure Node.js 18+ is installed
- Delete `node_modules` and `.next`, then `npm install`
- Check for syntax errors

**Styles not working:**
- Clear browser cache
- Check Tailwind config
- Rebuild: `npm run build`

**Performance issues:**
- Run production build (not dev mode)
- Check bundle size
- Enable compression

---

## ✅ Post-Deployment Testing

After deployment, test:
- [ ] All buttons work
- [ ] Keyboard shortcuts work
- [ ] History saves and clears
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Fast page load
- [ ] Works on different browsers

---

**🎉 Congratulations! Your calculator is now deployed and accessible worldwide!**

Share your live URL:
- With students and colleagues
- On social media
- In your portfolio
- As a useful tool

Enjoy! 🧮✨
