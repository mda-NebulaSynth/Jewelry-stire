# Vercel Deployment Guide

## Environment Variables for Vercel

Add these environment variables in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add the following:

```
VITE_API_BASE_URL=https://jewelry-store-sd4y.onrender.com
VITE_ENV=production
```

## Render Environment Variables

Add these in your Render service settings:

1. Go to Render dashboard → Your service → Environment
2. Add these variables:

```
SECRET_KEY=<generate-a-strong-random-key>
DEBUG=False
ALLOWED_HOSTS=jewelry-store-sd4y.onrender.com
CORS_ALLOWED_ORIGINS=https://jewelry-stire.vercel.app,https://jewelry-stire.vercel.app
```

## Build Command for Render

Update your Build Command in Render:

```bash
pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --no-input
```

## Deploy Steps

1. **Push changes to GitHub**:
   ```bash
   git add .
   git commit -m "Configure for production deployment"
   git push
   ```

2. **Vercel will auto-deploy** when you push to GitHub

3. **Render will auto-deploy** when you push to GitHub

## Testing the Connection

1. Visit: https://jewelry-stire.vercel.app
2. Try to register/login
3. Check browser console for any CORS errors
4. Check Render logs for incoming requests

## Troubleshooting

### CORS Errors
- Make sure `CORS_ALLOWED_ORIGINS` in Render includes your Vercel URL
- Check that the URL has no trailing slash

### API Connection Failed
- Verify `VITE_API_BASE_URL` in Vercel environment variables
- Check Render service is running
- Test API directly: https://jewelry-store-sd4y.onrender.com/api/v1/products/

### Database Errors
- Ensure migrations ran successfully in Render build logs
- Check that Build Command includes `python manage.py migrate`
