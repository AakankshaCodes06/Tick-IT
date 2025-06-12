# TICK-IT Deployment Guide

This guide covers deploying TICK-IT to various hosting platforms.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/tick-it)

1. **One-Click Deploy**: Click the button above
2. **GitHub Integration**: Connect your GitHub account
3. **Auto-Deploy**: Pushes to main branch auto-deploy

### Option 2: Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/tick-it)

1. **One-Click Deploy**: Click the button above
2. **Build Settings**: Automatically detected from netlify.toml
3. **Branch Deploys**: Preview deployments for pull requests

### Option 3: Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/ticket-it)

1. **GitHub Connection**: Connect your repository
2. **Environment**: Node.js auto-detected
3. **Database**: Optional PostgreSQL addon

## 📋 Manual Deployment Steps

### Prerequisites
- Git repository
- Node.js 18+ locally
- Platform account (Vercel/Netlify/Railway)

### 1. Prepare Repository

```bash
# Clone and setup
git clone https://github.com/your-username/tick-it.git
cd tick-it
npm install

# Test locally
npm run dev
```

### 2. Environment Configuration

Create `.env.production` if needed:
```bash
NODE_ENV=production
PORT=5000
```

### 3. Platform-Specific Setup

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel

# Production deployment
vercel --prod
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login and deploy
netlify login
netlify deploy

# Production deployment
netlify deploy --prod
```

#### Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

## 🛠 Build Configuration

### Vite Build Settings
The project uses Vite with these optimizations:

- **Code Splitting**: Automatic vendor/app bundles
- **Tree Shaking**: Removes unused code
- **Asset Optimization**: Images and fonts optimized
- **CSS Bundling**: Tailwind CSS purged and minified

### Build Command
```bash
npm run build
```

Output directory: `dist/`

### Environment Variables

#### Required
- `NODE_ENV=production`

#### Optional
- `PORT=5000` (auto-detected by most platforms)
- `VITE_API_BASE_URL` (if using external API)

## 🔧 Platform Configurations

### Vercel
- **Framework**: Vite detected automatically
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node Version**: 18.x

Configuration in `vercel.json`:
```json
{
  "version": 2,
  "builds": [{"src": "package.json", "use": "@vercel/node"}],
  "routes": [
    {"src": "/api/(.*)", "dest": "/server/index.ts"},
    {"src": "/(.*)", "dest": "/client/index.html"}
  ]
}
```

### Netlify
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18

Configuration in `netlify.toml`:
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Railway
- **Framework**: Node.js
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

## 🌐 Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS with provided records

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update nameservers or add CNAME

### Railway
1. Go to Project → Settings → Domains
2. Add custom domain
3. Configure DNS records

## 📊 Performance Optimizations

### Build Optimizations
- **Minification**: JavaScript and CSS minified
- **Compression**: Gzip compression enabled
- **Caching**: Static assets cached for 1 year
- **Preloading**: Critical resources preloaded

### Runtime Optimizations
- **Lazy Loading**: Route-based code splitting
- **Image Optimization**: Responsive images with lazy loading
- **Bundle Analysis**: Use `npm run build -- --analyze`

## 🔍 Monitoring & Analytics

### Build Monitoring
- Vercel: Built-in deployment logs
- Netlify: Deploy notifications
- Railway: Real-time build logs

### Performance Monitoring
```javascript
// Add to client/src/main.tsx for monitoring
if (import.meta.env.PROD) {
  // Add your analytics code here
  console.log('TICK-IT deployed successfully!');
}
```

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

#### Route Issues (404s)
- Ensure SPA fallback is configured
- Check redirect rules in platform config
- Verify build output includes index.html

#### Performance Issues
```bash
# Analyze bundle size
npm run build -- --analyze

# Check for large dependencies
npx bundle-analyzer dist/stats.json
```

### Debug Mode
```bash
# Local debugging
npm run dev

# Production debugging
npm run preview
```

## 📈 Scaling Considerations

### Traffic Handling
- **Vercel**: Auto-scaling serverless
- **Netlify**: CDN with edge locations
- **Railway**: Vertical scaling available

### Database Scaling
- Consider PostgreSQL for production
- Add Redis for session storage
- Implement database connection pooling

### Monitoring
- Set up error tracking (Sentry)
- Monitor performance (Web Vitals)
- Track user analytics

## 🔒 Security Checklist

- [ ] Environment variables secured
- [ ] HTTPS enabled (automatic on all platforms)
- [ ] Content Security Policy configured
- [ ] Rate limiting implemented
- [ ] Input validation enabled
- [ ] Dependencies updated

## 📞 Support

### Platform Support
- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Railway**: [railway.app/help](https://railway.app/help)

### Project Support
- GitHub Issues: Report bugs and feature requests
- Discussions: Community Q&A
- Email: support@tick-it.com

---

## 📝 Deployment Checklist

Before deploying to production:

- [ ] All features tested locally
- [ ] Build process completes successfully
- [ ] Environment variables configured
- [ ] Domain/subdomain ready
- [ ] Monitoring/analytics setup
- [ ] Error tracking configured
- [ ] Performance optimized
- [ ] Security measures implemented
- [ ] Documentation updated
- [ ] Team notified of deployment

Happy deploying! 🚀