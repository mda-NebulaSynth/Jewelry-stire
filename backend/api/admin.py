from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (
    User, Product, ProductImage, Offer, Order, OrderItem,
    Wishlist, Review, ProductLike, ProductView
)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Custom user admin"""
    list_display = ['username', 'email', 'first_name', 'last_name', 'role', 'is_staff']
    list_filter = ['role', 'is_staff', 'is_active']
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('role', 'avatar', 'phone')}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Additional Info', {'fields': ('role', 'avatar', 'phone')}),
    )


class ProductImageInline(admin.TabularInline):
    """Product image inline"""
    model = ProductImage
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """Product admin"""
    list_display = ['name', 'category', 'material', 'price', 'stock', 'availability', 'likes', 'views']
    list_filter = ['category', 'material', 'availability']
    search_fields = ['name', 'description']
    inlines = [ProductImageInline]
    readonly_fields = ['likes', 'views', 'rating', 'review_count', 'created_at', 'updated_at']


@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    """Offer admin"""
    list_display = ['title', 'discount_percentage', 'start_date', 'end_date', 'active']
    list_filter = ['active', 'start_date', 'end_date']
    search_fields = ['title', 'description']
    filter_horizontal = ['products']


class OrderItemInline(admin.TabularInline):
    """Order item inline"""
    model = OrderItem
    extra = 0
    readonly_fields = ['product', 'quantity', 'price']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    """Order admin"""
    list_display = ['id', 'user', 'status', 'total', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user__username', 'user__email']
    inlines = [OrderItemInline]
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    """Wishlist admin"""
    list_display = ['user', 'product', 'added_at']
    list_filter = ['added_at']
    search_fields = ['user__username', 'product__name']


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    """Review admin"""
    list_display = ['user', 'product', 'rating', 'created_at']
    list_filter = ['rating', 'created_at']
    search_fields = ['user__username', 'product__name', 'comment']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(ProductLike)
class ProductLikeAdmin(admin.ModelAdmin):
    """Product like admin"""
    list_display = ['user', 'product', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username', 'product__name']


@admin.register(ProductView)
class ProductViewAdmin(admin.ModelAdmin):
    """Product view admin"""
    list_display = ['product', 'user', 'ip_address', 'viewed_at']
    list_filter = ['viewed_at']
    search_fields = ['product__name', 'user__username', 'ip_address']
    readonly_fields = ['viewed_at']
