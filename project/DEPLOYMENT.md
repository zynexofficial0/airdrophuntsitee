# Airdrop Hunt - Deployment Guide

## Pre-Deployment Checklist

- [ ] All environment variables set in `.env.local` or Vercel dashboard
- [ ] Database migrations completed
- [ ] Seed data loaded into production database
- [ ] Analytics ID configured (optional)
- [ ] Images optimized and uploaded to CDN
- [ ] HTTPS certificate configured
- [ ] Domain DNS records updated
- [ ] Backup strategy implemented

## Production Environment Variables

Set these in your deployment platform:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://airdrophunt.io

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: API Configuration
NEXT_PUBLIC_API_URL=https://api.airdrophunt.io
```

## Vercel Deployment

### Step 1: Connect Repository
1. Push code to GitHub
2. Go to https://vercel.com/new
3. Select your GitHub repository
4. Click "Import"

### Step 2: Configure Environment Variables
1. Click "Environment Variables"
2. Add all variables from `.env.example`
3. Set appropriate values for production
4. Click "Deploy"

### Step 3: Configure Build Settings
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Step 4: Post-Deployment
1. Verify deployment at assigned Vercel URL
2. Update DNS to point to Vercel (instructions provided)
3. Configure custom domain in Vercel dashboard
4. Enable SSL/TLS (automatic with Vercel)

## Database Setup

### Supabase Configuration

1. Create new Supabase project
2. Run migrations from `migrations/` directory
3. Enable Row Level Security (RLS) on all tables
4. Create service role for server-side operations

### Seed Database

After deployment:
```bash
curl -X POST https://your-domain.com/api/seed \
  -H "Content-Type: application/json"
```

## SSL/TLS Certificate

- **Automatic**: Vercel provides free SSL certificates
- **Custom**: Upload your own certificate in Project Settings
- **Renewal**: Automatic renewal for Let's Encrypt certificates

## Performance Monitoring

### Vercel Analytics
- Enable in project settings
- Monitor Core Web Vitals
- Track deployment performance

### Google Analytics
- Configure GA4 property
- Add ID to environment variables
- Monitor user behavior and conversions

## Security Best Practices

### Database Security
- Enable RLS on all tables
- Use environment variables for all secrets
- Rotate keys periodically
- Enable database backups

### Application Security
- Set secure headers in `next.config.js`
- Enable CORS policies
- Use environment variables for API keys
- Enable rate limiting

### Content Security Policy
Add to `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
      ],
    },
  ];
}
```

## Scaling Recommendations

### Database
- Enable Connection Pooling (Supabase PgBouncer)
- Monitor query performance
- Add indexes for frequently queried fields
- Implement caching strategy

### CDN
- Use Vercel's built-in CDN
- Configure image optimization limits
- Set appropriate cache headers
- Enable gzip compression

### Monitoring
- Set up error tracking (Sentry, Vercel)
- Monitor API response times
- Track database query performance
- Set up alerts for anomalies

## Backup & Recovery

### Database Backups
1. Enable automated backups in Supabase
2. Set backup retention to 30+ days
3. Test restoration process monthly
4. Store backups in multiple regions

### Disaster Recovery
1. Document recovery procedures
2. Maintain offsite backup copies
3. Test failover procedures
4. Document rollback procedures

## Monitoring & Alerts

### Key Metrics to Monitor
- API response times (< 200ms target)
- Database query times (< 100ms target)
- Error rate (< 0.1% target)
- Core Web Vitals (LCP, CLS, INP)
- Page load times (< 2s target)

### Set Up Alerts For
- High error rates
- Slow database queries
- High memory usage
- Deployment failures
- SSL certificate expiration

## Maintenance Tasks

### Daily
- Monitor error logs
- Check API health
- Review user feedback

### Weekly
- Analyze performance metrics
- Check database size
- Review security logs
- Update dependencies

### Monthly
- Full system health check
- Performance optimization review
- Database optimization
- Security audit
- Backup verification

## Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check connection string
echo $NEXT_PUBLIC_SUPABASE_URL

# Verify service role key is set
echo $SUPABASE_SERVICE_ROLE_KEY

# Test connection
npx tsx lib/test-connection.ts
```

#### Missing Environment Variables
```bash
# Verify all required vars are set
vercel env ls
```

#### Slow Performance
1. Check database query performance
2. Review Vercel Analytics
3. Check for N+1 queries
4. Analyze bundle size with `npm run analyze`

#### Build Failures
1. Check build logs in Vercel dashboard
2. Verify all dependencies installed
3. Check for TypeScript errors
4. Clear build cache and redeploy

## Rollback Procedure

### If Deployment Issues Occur

1. Go to Vercel Dashboard
2. Click "Deployments"
3. Find last stable deployment
4. Click "Promote to Production"
5. Verify rollback completed

### Environment Variable Rollback
1. Go to "Settings" > "Environment Variables"
2. Update to previous values
3. Trigger new deployment
4. Verify changes applied

## Domain Configuration

### DNS Setup
For example with GoDaddy:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Domain Verification
1. Add domain in Vercel dashboard
2. Verify DNS records propagated
3. Enable SSL certificate
4. Test HTTPS accessibility

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

---

**Last Updated**: June 28, 2026  
**Next Review**: July 28, 2026
