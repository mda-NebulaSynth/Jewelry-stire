from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    ProductViewSet, OfferViewSet, OrderViewSet,
    WishlistViewSet, ReviewViewSet, UserViewSet, AnalyticsViewSet,
    CustomTokenObtainPairView
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'offers', OfferViewSet, basename='offer')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'wishlist', WishlistViewSet, basename='wishlist')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'users', UserViewSet, basename='user')
router.register(r'analytics', AnalyticsViewSet, basename='analytics')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
