# LuxeJewels Backend Setup Script
# Run this script to set up and start the Django backend

Write-Host "🚀 Setting up LuxeJewels Backend..." -ForegroundColor Cyan

# Navigate to backend directory
Set-Location -Path "c:\Users\USER\Documents\NebulaSynth\jewelry-store\backend"

# Check if virtual environment exists
if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
.\venv\Scripts\Activate.ps1

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt

# Run migrations
Write-Host "Running migrations..." -ForegroundColor Yellow
python manage.py makemigrations
python manage.py migrate

# Create superuser if it doesn't exist
Write-Host "Creating superuser (if needed)..." -ForegroundColor Yellow
python manage.py shell -c "from api.models import User; User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@luxejewels.com', 'admin123', role='admin')"

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "`n📝 Superuser credentials:" -ForegroundColor Cyan
Write-Host "   Username: admin" -ForegroundColor White
Write-Host "   Password: admin123" -ForegroundColor White
Write-Host "`n🌐 Starting Django development server..." -ForegroundColor Cyan
Write-Host "   API will be available at: http://localhost:8000/api/v1/" -ForegroundColor White
Write-Host "   Admin panel at: http://localhost:8000/admin/" -ForegroundColor White
Write-Host "`nPress Ctrl+C to stop the server`n" -ForegroundColor Yellow

# Start Django server
python manage.py runserver
