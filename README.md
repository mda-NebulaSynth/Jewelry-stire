# LuxeJewels - Gold & Silver Jewelry E-Commerce Platform

A modern, full-stack e-commerce platform for luxury gold and silver jewelry with 3D product visualization, advanced analytics, and role-based access control.

## 🌟 Features

### Frontend (React + TypeScript + Vite)
- **Modern UI/UX**: Premium design with smooth animations using Framer Motion
- **3D Product Viewer**: Interactive 3D jewelry visualization using React Three Fiber
- **Advanced Filtering**: Filter by category, material, price range, and offers
- **Shopping Cart**: Persistent cart with quantity management
- **Wishlist & Likes**: Save favorite products and track likes
- **Responsive Design**: Fully responsive across all devices
- **State Management**: Zustand for efficient global state
- **Lazy Loading**: Optimized performance with code splitting

### Backend (Django + DRF + SQLite3)
- **RESTful API**: Versioned API (v1) for future compatibility
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Permissions**: Admin, Manager, Staff, and Customer roles
- **Advanced Analytics**: Track views, likes, purchases, and sales metrics
- **Product Management**: Full CRUD operations with image uploads
- **Order Processing**: Complete order management system
- **Offers & Discounts**: Time-limited promotional offers
- **Review System**: Customer reviews with ratings

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **React Router** for navigation
- **Zustand** for state management
- **React Three Fiber** for 3D rendering
- **Framer Motion** for animations
- **Axios** for API calls
- **React Icons** for iconography

### Backend
- **Django 5.0**
- **Django REST Framework**
- **SQLite3** (development) / PostgreSQL (production-ready)
- **JWT** for authentication
- **CORS** headers for cross-origin requests
- **Pillow** for image processing

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- Git

### Frontend Setup

```bash
cd jewelry-store
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/auth/login/` - Login and get JWT token
- `POST /api/v1/auth/refresh/` - Refresh JWT token
- `POST /api/v1/users/register/` - Register new user

### Products
- `GET /api/v1/products/` - List all products (with filters)
- `GET /api/v1/products/{id}/` - Get product details
- `POST /api/v1/products/` - Create product (Admin/Manager)
- `PUT /api/v1/products/{id}/` - Update product (Admin/Manager)
- `DELETE /api/v1/products/{id}/` - Delete product (Admin/Manager)
- `POST /api/v1/products/{id}/like/` - Like/unlike product
- `POST /api/v1/products/{id}/view/` - Track product view

### Orders
- `GET /api/v1/orders/` - List user orders
- `POST /api/v1/orders/` - Create new order
- `GET /api/v1/orders/{id}/` - Get order details
- `PATCH /api/v1/orders/{id}/update_status/` - Update order status (Staff)

### Wishlist
- `GET /api/v1/wishlist/` - Get user wishlist
- `POST /api/v1/wishlist/` - Add to wishlist
- `DELETE /api/v1/wishlist/{id}/` - Remove from wishlist

### Offers
- `GET /api/v1/offers/` - List all offers
- `GET /api/v1/offers/active/` - Get active offers
- `POST /api/v1/offers/` - Create offer (Admin/Manager)

### Reviews
- `GET /api/v1/reviews/?product_id={id}` - Get product reviews
- `POST /api/v1/reviews/` - Create review
- `PUT /api/v1/reviews/{id}/` - Update review
- `DELETE /api/v1/reviews/{id}/` - Delete review

### Analytics (Admin/Staff)
- `GET /api/v1/analytics/sales/` - Get sales analytics
- `GET /api/v1/analytics/product/{id}/` - Get product analytics

## 👥 User Roles & Permissions

### Admin / Owner
- Full control over all features
- Manage users, products, offers, and analytics
- Access to all API endpoints

### Manager
- Add, edit, and manage products
- View sales reports
- Manage offers and discounts
- Cannot manage users

### Staff
- Manage orders
- Update product status
- Limited dashboard access
- View-only analytics

### Customer
- Browse and search products
- Add to cart and wishlist
- Like products
- Purchase items
- View order history
- Write reviews

## 🎨 Design Features

- **Premium Color Scheme**: Gold (#D4AF37) and Silver (#C0C0C0) themed
- **Glassmorphism**: Modern frosted glass effects
- **Smooth Animations**: Micro-interactions for better UX
- **Dark Mode**: Elegant dark theme by default
- **Custom Fonts**: Playfair Display for headings, Inter for body
- **Responsive Grid**: Adaptive layouts for all screen sizes

## 📊 Analytics Features

- Product views tracking
- Like/wishlist analytics
- Sales metrics by category and material
- Revenue tracking
- Popular products identification
- User interaction analytics

## 🚢 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   - `VITE_API_BASE_URL=https://your-backend-url.com`
4. Deploy automatically on push

### Backend (Render)
1. Create new Web Service on Render
2. Connect repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn jewelry_backend.wsgi:application`
5. Add environment variables:
   - `SECRET_KEY`
   - `DEBUG=False`
   - `ALLOWED_HOSTS`
6. For production, switch to PostgreSQL database

## 🔒 Security Best Practices

- JWT token authentication
- CORS configuration
- Password validation
- SQL injection protection (Django ORM)
- XSS protection
- CSRF protection
- Role-based access control

## 📝 Environment Variables

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8000
VITE_ENV=development
```

### Backend (.env)
```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

## 🧪 Testing

```bash
# Frontend
npm run test

# Backend
python manage.py test
```

## 📚 Documentation

- API documentation available at `/api/v1/` when running the backend
- Admin panel at `/admin/`
- Swagger/OpenAPI docs can be added with drf-spectacular

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React Three Fiber for 3D rendering
- Framer Motion for animations
- Django REST Framework for API
- Unsplash for placeholder images

## 📞 Support

For support, email info@luxejewels.com or create an issue in the repository.

---

Built with ❤️ using React, TypeScript, Django, and modern web technologies.
