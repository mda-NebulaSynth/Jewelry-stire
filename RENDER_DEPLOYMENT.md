# Render Deployment Guide for NebulaJewel Backend

## Prerequisites
- GitHub repository with your code pushed
- Render account (free tier works)

## Step 1: Configure Render Service

### In Render Dashboard:

1. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Build Settings:**
   - **Name**: `nebulajewel-backend` (or your preferred name)
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --no-input && python manage.py migrate`
   - **Start Command**: `gunicorn jewelry_backend.wsgi:application`

3. **Set Environment Variables:**
   Click "Environment" tab and add these variables:

   ```
   SECRET_KEY=<generate-a-strong-random-key>
   DEBUG=False
   ALLOWED_HOSTS=<your-render-url>.onrender.com
   DATABASE_URL=<will-be-auto-set-if-using-render-postgres>
   CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
   ```

   To generate a SECRET_KEY, run in Python:
   ```python
   from django.core.management.utils import get_random_secret_key
   print(get_random_secret_key())
   ```

## Step 2: Add PostgreSQL Database (Optional but Recommended)

1. In Render Dashboard, create a new PostgreSQL database
2. Link it to your web service
3. Render will automatically set the `DATABASE_URL` environment variable

## Step 3: Deploy

1. Click "Create Web Service"
2. Render will automatically deploy your app
3. Monitor the build logs for any errors

## Step 4: Post-Deployment

### Create Superuser (Admin Account)
Once deployed, use Render Shell to create an admin:

```bash
python manage.py createsuperuser
```

### Access Admin Panel
Visit: `https://your-app.onrender.com/admin/`

## Troubleshooting

### Common Issues:

1. **Static files not loading**
   - Ensure `collectstatic` runs in build command
   - Check `STATIC_ROOT` and `STATICFILES_STORAGE` settings

2. **Database connection errors**
   - Verify `DATABASE_URL` is set correctly
   - Check PostgreSQL database is running

3. **CORS errors**
   - Add your frontend domain to `CORS_ALLOWED_ORIGINS`
   - Format: `https://yourdomain.com` (no trailing slash)

4. **Module import errors**
   - Ensure all dependencies are in `requirements.txt`
   - Check Python version compatibility

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `SECRET_KEY` | Django secret key | `django-insecure-abc123...` |
| `DEBUG` | Debug mode (False in production) | `False` |
| `ALLOWED_HOSTS` | Comma-separated allowed hosts | `myapp.onrender.com,www.myapp.com` |
| `DATABASE_URL` | PostgreSQL connection string | Auto-set by Render |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins | `https://myapp.com,https://www.myapp.com` |

## Alternative: Using build.sh (if not setting Root Directory)

If you prefer not to set Root Directory in Render:

1. Use the `build.sh` file in the project root
2. Set Build Command to: `./build.sh`
3. Ensure build.sh has execute permissions

## Notes

- Free tier services sleep after 15 minutes of inactivity
- First request after sleep may take 30-60 seconds
- Consider upgrading to paid tier for production apps
- Always use HTTPS in production
- Keep SECRET_KEY secure and never commit it to Git
