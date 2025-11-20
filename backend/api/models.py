from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator


class User(AbstractUser):
    """Custom User model with role-based permissions"""
    
    class Role(models.TextChoices):
        ADMIN = 'admin', 'Admin'
        MANAGER = 'manager', 'Manager'
        STAFF = 'staff', 'Staff'
        CUSTOMER = 'customer', 'Customer'
    
    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.CUSTOMER
    )
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    
    def __str__(self):
        return f"{self.username} ({self.role})"


class Product(models.Model):
    """Product model for jewelry items"""
    
    class Category(models.TextChoices):
        RINGS = 'rings', 'Rings'
        NECKLACES = 'necklaces', 'Necklaces'
        EARRINGS = 'earrings', 'Earrings'
        BRACELETS = 'bracelets', 'Bracelets'
        CUTLERY = 'cutlery', 'Cutlery'
        DECORATIVE = 'decorative', 'Decorative'
    
    class Material(models.TextChoices):
        GOLD = 'gold', 'Gold'
        SILVER = 'silver', 'Silver'
        GOLD_PLATED = 'gold_plated', 'Gold Plated'
        SILVER_PLATED = 'silver_plated', 'Silver Plated'
    
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    category = models.CharField(max_length=20, choices=Category.choices)
    material = models.CharField(max_length=20, choices=Material.choices)
    availability = models.BooleanField(default=True)
    stock = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    likes = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    views = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    review_count = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    model_3d = models.FileField(upload_to='models/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['category']),
            models.Index(fields=['material']),
            models.Index(fields=['price']),
        ]
    
    def __str__(self):
        return self.name


class ProductImage(models.Model):
    """Product images"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    alt_text = models.CharField(max_length=255, blank=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.product.name} - Image {self.order}"


class Offer(models.Model):
    """Offers and discounts"""
    title = models.CharField(max_length=255)
    description = models.TextField()
    discount_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    active = models.BooleanField(default=True)
    products = models.ManyToManyField(Product, related_name='offers', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title


class Order(models.Model):
    """Customer orders"""
    
    class Status(models.TextChoices):
        PENDING = 'pending', 'Pending'
        PROCESSING = 'processing', 'Processing'
        SHIPPED = 'shipped', 'Shipped'
        DELIVERED = 'delivered', 'Delivered'
        CANCELLED = 'cancelled', 'Cancelled'
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Shipping Address
    shipping_street = models.CharField(max_length=255)
    shipping_city = models.CharField(max_length=100)
    shipping_state = models.CharField(max_length=100)
    shipping_zip_code = models.CharField(max_length=20)
    shipping_country = models.CharField(max_length=100)
    
    payment_method = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Order #{self.id} - {self.user.username}"


class OrderItem(models.Model):
    """Items in an order"""
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"{self.quantity}x {self.product.name}"


class Wishlist(models.Model):
    """User wishlist"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wishlist')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'product')
        ordering = ['-added_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.product.name}"


class Review(models.Model):
    """Product reviews"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('user', 'product')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.product.name} ({self.rating}★)"


class ProductLike(models.Model):
    """Track product likes"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='liked_products')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_likes')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'product')
    
    def __str__(self):
        return f"{self.user.username} likes {self.product.name}"


class ProductView(models.Model):
    """Track product views for analytics"""
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_views')
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    viewed_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.product.name} viewed at {self.viewed_at}"
