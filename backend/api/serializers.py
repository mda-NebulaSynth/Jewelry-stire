from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Product, ProductImage, Offer, Order, OrderItem,
    Wishlist, Review, ProductLike, ProductView
)

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """User serializer"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'avatar', 'phone', 'date_joined']
        read_only_fields = ['id', 'date_joined']


class UserRegistrationSerializer(serializers.ModelSerializer):
    """User registration serializer"""
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'first_name', 'last_name']
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user


class ProductImageSerializer(serializers.ModelSerializer):
    """Product image serializer"""
    url = serializers.SerializerMethodField()
    
    class Meta:
        model = ProductImage
        fields = ['id', 'url', 'alt_text', 'order']
        
    def get_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url


class OfferSerializer(serializers.ModelSerializer):
    """Offer serializer"""
    class Meta:
        model = Offer
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    """Product serializer"""
    images = ProductImageSerializer(many=True, read_only=True)
    offer = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'original_price',
            'category', 'material', 'images', 'model_3d', 'availability',
            'stock', 'likes', 'views', 'rating', 'review_count',
            'created_at', 'updated_at', 'offer'
        ]
        read_only_fields = ['likes', 'views', 'rating', 'review_count', 'created_at', 'updated_at']
    
    def get_offer(self, obj):
        """Get active offer for product"""
        from django.utils import timezone
        active_offers = obj.offers.filter(
            active=True,
            start_date__lte=timezone.now(),
            end_date__gte=timezone.now()
        ).first()
        if active_offers:
            return OfferSerializer(active_offers).data
        return None

    def create(self, validated_data):
        images = self.initial_data.get('images', [])
        product = super().create(validated_data)
        
        if isinstance(images, list):
            for i, url in enumerate(images):
                if isinstance(url, str) and url.startswith('http'):
                    ProductImage.objects.create(product=product, image_url=url, order=i)
            
        return product

    def update(self, instance, validated_data):
        images = self.initial_data.get('images')
        product = super().update(instance, validated_data)
        
        if images is not None and isinstance(images, list):
            instance.images.all().delete()
            for i, url in enumerate(images):
                if isinstance(url, str) and url.startswith('http'):
                    ProductImage.objects.create(product=product, image_url=url, order=i)
                
        return product


class ProductListSerializer(serializers.ModelSerializer):
    """Lightweight product serializer for lists"""
    images = serializers.SerializerMethodField()
    offer = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'original_price',
            'category', 'material', 'images', 'availability',
            'stock', 'likes', 'views', 'rating', 'review_count',
            'created_at', 'offer'
        ]
    
    def get_images(self, obj):
        """Get first image URL"""
        first_image = obj.images.first()
        if first_image:
            if first_image.image:
                request = self.context.get('request')
                if request:
                    return [request.build_absolute_uri(first_image.image.url)]
                return [first_image.image.url]
            elif first_image.image_url:
                return [first_image.image_url]
        return []
    
    def get_offer(self, obj):
        """Get active offer for product"""
        from django.utils import timezone
        active_offers = obj.offers.filter(
            active=True,
            start_date__lte=timezone.now(),
            end_date__gte=timezone.now()
        ).first()
        if active_offers:
            return {
                'id': active_offers.id,
                'title': active_offers.title,
                'discount_percentage': active_offers.discount_percentage,
                'end_date': active_offers.end_date
            }
        return None


class ReviewSerializer(serializers.ModelSerializer):
    """Review serializer"""
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Review
        fields = ['id', 'user', 'product', 'rating', 'comment', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']


class OrderItemSerializer(serializers.ModelSerializer):
    """Order item serializer"""
    product = ProductListSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    """Order serializer"""
    items = OrderItemSerializer(many=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'user', 'status', 'total', 'items',
            'shipping_street', 'shipping_city', 'shipping_state',
            'shipping_zip_code', 'shipping_country', 'payment_method',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['user', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        
        for item_data in items_data:
            product_id = item_data.pop('product_id')
            product = Product.objects.get(id=product_id)
            OrderItem.objects.create(
                order=order,
                product=product,
                **item_data
            )
        
        return order


class WishlistSerializer(serializers.ModelSerializer):
    """Wishlist serializer"""
    product = ProductListSerializer(read_only=True)
    
    class Meta:
        model = Wishlist
        fields = ['id', 'product', 'added_at']
        read_only_fields = ['added_at']


class ProductLikeSerializer(serializers.ModelSerializer):
    """Product like serializer"""
    class Meta:
        model = ProductLike
        fields = ['id', 'user', 'product', 'created_at']
        read_only_fields = ['user', 'created_at']
