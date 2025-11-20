from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from django.db.models import Q, Count, Sum, Avg
from django.utils import timezone
from .models import (
    Product, ProductImage, Offer, Order, OrderItem,
    Wishlist, Review, ProductLike, ProductView, User
)
from .serializers import (
    ProductSerializer, ProductListSerializer, OfferSerializer,
    OrderSerializer, WishlistSerializer, ReviewSerializer,
    UserSerializer, UserRegistrationSerializer
)
from .permissions import IsAdminOrManager, IsAdminOrStaff


class ProductViewSet(viewsets.ModelViewSet):
    """Product viewset with filtering and search"""
    queryset = Product.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'category', 'material']
    ordering_fields = ['price', 'created_at', 'likes', 'rating']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ProductListSerializer
        return ProductSerializer
    
    def get_queryset(self):
        queryset = Product.objects.all()
        
        # Filter by category
        category = self.request.query_params.getlist('category')
        if category:
            queryset = queryset.filter(category__in=category)
        
        # Filter by material
        material = self.request.query_params.getlist('material')
        if material:
            queryset = queryset.filter(material__in=material)
        
        # Filter by price range
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Filter by availability
        in_stock = self.request.query_params.get('in_stock')
        if in_stock == 'true':
            queryset = queryset.filter(availability=True, stock__gt=0)
        
        # Filter by offers
        on_offer = self.request.query_params.get('on_offer')
        if on_offer == 'true':
            queryset = queryset.filter(
                offers__active=True,
                offers__start_date__lte=timezone.now(),
                offers__end_date__gte=timezone.now()
            ).distinct()
        
        # Sort by
        sort_by = self.request.query_params.get('sort_by')
        if sort_by == 'price_asc':
            queryset = queryset.order_by('price')
        elif sort_by == 'price_desc':
            queryset = queryset.order_by('-price')
        elif sort_by == 'popularity':
            queryset = queryset.order_by('-likes', '-views')
        elif sort_by == 'newest':
            queryset = queryset.order_by('-created_at')
        elif sort_by == 'rating':
            queryset = queryset.order_by('-rating')
        
        return queryset
    
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        """Like a product"""
        product = self.get_object()
        user = request.user
        
        like, created = ProductLike.objects.get_or_create(user=user, product=product)
        
        if not created:
            like.delete()
            product.likes = max(0, product.likes - 1)
            product.save()
            return Response({'message': 'Product unliked'})
        else:
            product.likes += 1
            product.save()
            return Response({'message': 'Product liked'})
    
    @action(detail=True, methods=['post'])
    def view(self, request, pk=None):
        """Track product view"""
        product = self.get_object()
        user = request.user if request.user.is_authenticated else None
        ip_address = request.META.get('REMOTE_ADDR')
        
        ProductView.objects.create(
            product=product,
            user=user,
            ip_address=ip_address
        )
        
        product.views += 1
        product.save()
        
        return Response({'message': 'View tracked'})


class OfferViewSet(viewsets.ModelViewSet):
    """Offer viewset"""
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminOrManager()]
        return super().get_permissions()
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get active offers"""
        active_offers = Offer.objects.filter(
            active=True,
            start_date__lte=timezone.now(),
            end_date__gte=timezone.now()
        )
        serializer = self.get_serializer(active_offers, many=True)
        return Response(serializer.data)


class OrderViewSet(viewsets.ModelViewSet):
    """Order viewset"""
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role in ['admin', 'manager', 'staff']:
            return Order.objects.all()
        return Order.objects.filter(user=user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        """Update order status (staff only)"""
        if request.user.role not in ['admin', 'manager', 'staff']:
            return Response(
                {'error': 'Permission denied'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        order = self.get_object()
        new_status = request.data.get('status')
        
        if new_status in dict(Order.Status.choices):
            order.status = new_status
            order.save()
            serializer = self.get_serializer(order)
            return Response(serializer.data)
        
        return Response(
            {'error': 'Invalid status'},
            status=status.HTTP_400_BAD_REQUEST
        )


class WishlistViewSet(viewsets.ModelViewSet):
    """Wishlist viewset"""
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)
    
    def create(self, request):
        product_id = request.data.get('product_id')
        if not product_id:
            return Response(
                {'error': 'product_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {'error': 'Product not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        wishlist_item, created = Wishlist.objects.get_or_create(
            user=request.user,
            product=product
        )
        
        if created:
            serializer = self.get_serializer(wishlist_item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(
            {'message': 'Product already in wishlist'},
            status=status.HTTP_200_OK
        )


class ReviewViewSet(viewsets.ModelViewSet):
    """Review viewset"""
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        product_id = self.request.query_params.get('product_id')
        if product_id:
            return Review.objects.filter(product_id=product_id)
        return Review.objects.all()
    
    def perform_create(self, serializer):
        review = serializer.save(user=self.request.user)
        
        # Update product rating
        product = review.product
        reviews = product.reviews.all()
        product.rating = reviews.aggregate(Avg('rating'))['rating__avg'] or 0
        product.review_count = reviews.count()
        product.save()


class UserViewSet(viewsets.ModelViewSet):
    """User viewset"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def profile(self, request):
        """Get current user profile"""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def register(self, request):
        """Register new user"""
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                UserSerializer(user).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnalyticsViewSet(viewsets.ViewSet):
    """Analytics viewset for sales and product metrics"""
    permission_classes = [IsAdminOrStaff]
    
    @action(detail=False, methods=['get'])
    def sales(self, request):
        """Get sales analytics"""
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        
        orders = Order.objects.filter(status='delivered')
        
        if start_date:
            orders = orders.filter(created_at__gte=start_date)
        if end_date:
            orders = orders.filter(created_at__lte=end_date)
        
        total_revenue = orders.aggregate(Sum('total'))['total__sum'] or 0
        total_orders = orders.count()
        avg_order_value = total_revenue / total_orders if total_orders > 0 else 0
        
        # Top products
        top_products = OrderItem.objects.filter(
            order__in=orders
        ).values('product__name').annotate(
            total_sold=Sum('quantity'),
            revenue=Sum('price')
        ).order_by('-revenue')[:10]
        
        return Response({
            'total_revenue': total_revenue,
            'total_orders': total_orders,
            'average_order_value': avg_order_value,
            'top_products': top_products
        })
    
    @action(detail=True, methods=['get'])
    def product(self, request, pk=None):
        """Get product analytics"""
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response(
                {'error': 'Product not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        total_sold = OrderItem.objects.filter(
            product=product,
            order__status='delivered'
        ).aggregate(Sum('quantity'))['quantity__sum'] or 0
        
        revenue = OrderItem.objects.filter(
            product=product,
            order__status='delivered'
        ).aggregate(Sum('price'))['price__sum'] or 0
        
        return Response({
            'product_id': product.id,
            'product_name': product.name,
            'views': product.views,
            'likes': product.likes,
            'total_sold': total_sold,
            'revenue': revenue,
            'rating': product.rating,
            'review_count': product.review_count
        })
