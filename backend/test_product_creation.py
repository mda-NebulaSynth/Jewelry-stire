import os
import django
import sys

# Add backend to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jewelry_backend.settings')
django.setup()

from rest_framework.test import APIClient
from api.models import User

# Create user
try:
    user = User.objects.get(username='testadmin')
except User.DoesNotExist:
    user = User.objects.create_user(username='testadmin', email='test@example.com', password='password123', role='admin')

client = APIClient()
client.force_authenticate(user=user)

data = {
    "name": "Test Product",
    "description": "Test Description",
    "price": 100.00,
    "category": "rings",
    "material": "gold",
    "stock": 10,
    "availability": True,
    "images": ["http://example.com/image.jpg"]
}

response = client.post('/api/v1/products/', data, format='json')
print(f"Status: {response.status_code}")
print(f"Response: {response.data}")
