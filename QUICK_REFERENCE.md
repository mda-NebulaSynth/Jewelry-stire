# 🚀 LuxeJewels - Quick Reference

## 📍 Access Points

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | http://localhost:5174 | ✅ RUNNING |
| **Backend API** | http://localhost:8000/api/v1/ | ✅ READY |
| **Admin Panel** | http://localhost:8000/admin/ | ✅ READY |

## 🔑 Credentials

**Admin Account:**
- Username: `admin`
- Email: `admin@luxejewels.com`
- Password: `admin123`
- Role: Admin

## ⚡ Quick Commands

### Start Frontend
```bash
cd c:\Users\USER\Documents\NebulaSynth\jewelry-store
npm run dev
```

### Start Backend
```bash
cd c:\Users\USER\Documents\NebulaSynth\jewelry-store\backend
venv\Scripts\activate
python manage.py runserver
```

### Or use the setup script:
```powershell
cd backend
.\setup.ps1
```

## 📦 Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- Zustand (state)
- React Three Fiber (3D)
- Framer Motion (animations)
- React Router
- Axios

**Backend:**
- Django 5.0
- Django REST Framework
- JWT Authentication
- SQLite3
- CORS Headers
- Pillow (images)

## 🎨 Design Tokens

```css
--color-primary: #D4AF37;        /* Gold */
--color-secondary: #C0C0C0;      /* Silver */
--color-bg-primary: #0A0A0A;     /* Dark */
--font-display: 'Playfair Display';
--font-body: 'Inter';
```

## 📁 Key Files

```
jewelry-store/
├── src/
│   ├── App.tsx              # Main app
│   ├── index.css            # Design system
│   ├── components/          # React components
│   ├── pages/               # Page components
│   ├── store/index.ts       # Zustand store
│   └── services/api.ts      # API client
│
└── backend/
    ├── manage.py            # Django CLI
    ├── api/models.py        # Database models
    ├── api/views.py         # API endpoints
    └── api/serializers.py   # DRF serializers
```

## 🔗 Important Endpoints

### Products
- `GET /api/v1/products/` - List all
- `GET /api/v1/products/{id}/` - Get one
- `POST /api/v1/products/{id}/like/` - Like
- `POST /api/v1/products/{id}/view/` - Track view

### Orders
- `GET /api/v1/orders/` - List orders
- `POST /api/v1/orders/` - Create order

### Auth
- `POST /api/v1/auth/login/` - Login (JWT)
- `POST /api/v1/users/register/` - Register

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| **Admin** | Full access |
| **Manager** | Products, offers, reports |
| **Staff** | Orders, limited access |
| **Customer** | Browse, purchase, review |

## 🎯 Next Steps

1. ✅ Both apps running
2. ⏳ Create sample products in admin
3. ⏳ Test full user flow
4. ⏳ Add product images
5. ⏳ Implement checkout
6. ⏳ Deploy to production

## 📚 Documentation

- `README.md` - Full setup guide
- `PROJECT_SUMMARY.md` - Feature overview
- `SETUP_COMPLETE.md` - Detailed guide
- `QUICK_REFERENCE.md` - This file

## 🆘 Help

**Issues?** Check:
1. Both servers running?
2. Virtual environment activated?
3. Dependencies installed?
4. Migrations applied?
5. Browser console for errors

**Reset Database:**
```bash
cd backend
rm db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

---

**🎊 Everything is ready! Start building!**
