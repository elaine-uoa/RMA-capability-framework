# Deployment Guide for RMA Capability Framework

## Recommended Hosting Options

### 🥇 **Option 1: Vercel (Recommended)**

**Why Vercel?**
- Built by Next.js creators - perfect integration
- Zero-config deployment for Next.js
- Free tier is generous for this use case
- Automatic HTTPS, CDN, and global edge network
- Easy GitHub integration
- Built-in analytics and monitoring

**Cost:** Free tier is sufficient for university use
- 100GB bandwidth/month
- Unlimited requests
- Automatic deployments from GitHub

**Deployment Steps:**
1. Push code to GitHub (already done)
2. Sign up at vercel.com with GitHub
3. Import your repository
4. Vercel auto-detects Next.js and configures everything
5. Deploy - takes ~2 minutes
6. Get a URL like: `rma-framework.vercel.app`
7. Optionally add custom domain: `rma-framework.auckland.ac.nz`

**Pros:**
- ✅ Easiest deployment (literally 3 clicks)
- ✅ Automatic deployments on git push
- ✅ Free SSL certificate
- ✅ Global CDN for fast loading
- ✅ Preview deployments for testing
- ✅ Built-in analytics

**Cons:**
- ⚠️ Free tier has usage limits (but sufficient for university)
- ⚠️ Custom domain requires DNS configuration

---

### 🥈 **Option 2: Netlify**

**Why Netlify?**
- Similar to Vercel, excellent for static sites
- Great free tier
- Easy GitHub integration
- Good for Next.js static exports

**Cost:** Free tier available

**Deployment Steps:**
1. Sign up at netlify.com
2. Connect GitHub repository
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Deploy

**Pros:**
- ✅ Easy deployment
- ✅ Free tier
- ✅ Good performance

**Cons:**
- ⚠️ Slightly less optimized for Next.js than Vercel
- ⚠️ May need configuration for App Router

---

### 🥉 **Option 3: University Hosting**

**If University of Auckland has hosting infrastructure:**

**Options:**
- University web servers
- University cloud infrastructure (AWS/Azure/GCP)
- University-managed containers

**Considerations:**
- ✅ Full control
- ✅ University branding/domain
- ✅ Potentially better integration with university systems
- ⚠️ Requires IT department support
- ⚠️ May need server setup and maintenance
- ⚠️ SSL certificate management

**Deployment Steps:**
1. Contact University IT department
2. Request hosting space
3. Set up Node.js environment
4. Deploy using `npm run build && npm start`
5. Configure reverse proxy (nginx/Apache)
6. Set up SSL certificate

---

### **Option 4: Cloud Platforms (AWS/Azure/GCP)**

**For enterprise-level hosting:**

**AWS:**
- **Amplify** - Similar to Vercel, easy Next.js deployment
- **EC2** - Full server control
- **S3 + CloudFront** - Static hosting with CDN

**Azure:**
- **Static Web Apps** - Good for Next.js
- **App Service** - Full hosting

**Google Cloud:**
- **Cloud Run** - Container-based
- **App Engine** - Managed hosting

**Pros:**
- ✅ Enterprise-grade reliability
- ✅ Scalable
- ✅ University may have existing accounts

**Cons:**
- ⚠️ More complex setup
- ⚠️ May require payment
- ⚠️ More configuration needed

---

## Recommended Approach: **Vercel**

### Why Vercel is Best for This Project:

1. **Perfect Next.js Integration**
   - Zero configuration needed
   - Automatic optimization
   - Built-in support for App Router

2. **Free Tier is Sufficient**
   - Your app is lightweight (no backend)
   - University staff usage will fit within limits
   - No database = no ongoing costs

3. **Easy Deployment**
   - Connect GitHub → Deploy → Done
   - Automatic deployments on every push
   - Preview deployments for testing

4. **Professional Features**
   - Custom domain support
   - Analytics included
   - Environment variables
   - Team collaboration

### Deployment Process with Vercel:

#### Step 1: Prepare Repository
```bash
# Already done - code is on GitHub
# Repository: elaine-uoa/RMA-capability-framework
```

#### Step 2: Sign Up & Deploy
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Click "Add New Project"
4. Import `elaine-uoa/RMA-capability-framework`
5. Vercel auto-detects Next.js settings
6. Click "Deploy"
7. Wait ~2 minutes
8. Get live URL: `rma-capability-framework.vercel.app`

#### Step 3: Custom Domain (Optional)
1. In Vercel dashboard → Settings → Domains
2. Add domain: `rma-framework.auckland.ac.nz`
3. Configure DNS with university IT
4. SSL certificate auto-generated

#### Step 4: Environment Variables (If Needed)
- Currently none needed (all client-side)
- Can add later if needed

---

## Project Characteristics

### Current Setup:
- **Framework:** Next.js 16 (App Router)
- **Type:** Static + Dynamic pages
- **Backend:** None (client-side only)
- **Database:** None (localStorage only)
- **Size:** ~496MB (with node_modules), ~5MB built
- **Dependencies:** Minimal (React, Next.js, Tailwind)

### Deployment Requirements:
- ✅ Node.js 18+ runtime
- ✅ Static file serving
- ✅ HTTPS (required for modern browsers)
- ✅ CDN for performance (optional but recommended)

---

## Cost Comparison

| Platform | Free Tier | Paid Tier | Best For |
|----------|-----------|-----------|----------|
| **Vercel** | ✅ Generous | $20/month | **Recommended** |
| **Netlify** | ✅ Good | $19/month | Alternative |
| **University Hosting** | Varies | Varies | If available |
| **AWS Amplify** | ✅ Limited | Pay-as-you-go | Enterprise |
| **Azure Static Web Apps** | ✅ Good | Pay-as-you-go | Enterprise |

**For University Use:** Vercel free tier is likely sufficient

---

## Security Considerations

### Current Setup:
- ✅ No sensitive data stored (all client-side)
- ✅ No authentication needed (public tool)
- ✅ No API keys or secrets
- ✅ HTTPS required (all platforms provide)

### Future Considerations:
- If adding authentication: Use Vercel's environment variables
- If adding analytics: Consider privacy requirements
- If adding user accounts: Will need backend/database

---

## Maintenance & Updates

### With Vercel:
1. **Update Code:**
   ```bash
   git add .
   git commit -m "Update message"
   git push origin main
   ```
2. **Automatic Deployment:**
   - Vercel detects push
   - Builds automatically
   - Deploys to production
   - Takes ~2-3 minutes

### Rollback:
- Vercel keeps deployment history
- One-click rollback to previous version

---

## Recommended Action Plan

### Phase 1: Initial Deployment (Vercel)
1. ✅ Code already on GitHub
2. Sign up for Vercel
3. Deploy from GitHub
4. Test with university staff
5. Get feedback

### Phase 2: Custom Domain (Optional)
1. Request domain from university IT
2. Configure DNS
3. Add to Vercel
4. Update links/documentation

### Phase 3: Monitoring (Optional)
1. Set up Vercel Analytics
2. Monitor usage
3. Check if free tier is sufficient
4. Upgrade if needed (unlikely)

---

## Quick Start: Deploy to Vercel Now

1. **Go to:** https://vercel.com
2. **Sign up** with GitHub
3. **Click:** "Add New Project"
4. **Select:** `elaine-uoa/RMA-capability-framework`
5. **Click:** "Deploy"
6. **Done!** Your app is live in ~2 minutes

**That's it!** No configuration needed. Vercel handles everything.

---

## Support & Documentation

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **GitHub Repository:** Already set up

---

## Summary

**Best Choice: Vercel**
- ✅ Easiest deployment
- ✅ Free tier sufficient
- ✅ Perfect for Next.js
- ✅ Professional features
- ✅ Zero maintenance

**Alternative: University Hosting**
- If university has infrastructure
- Better for branding/domain
- Requires IT support

**Not Recommended:**
- ❌ Self-hosting on personal server (maintenance burden)
- ❌ Complex cloud setup (overkill for this project)

