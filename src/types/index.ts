// User Types
export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager',
    STAFF = 'staff',
    CUSTOMER = 'customer',
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    avatar?: string;
    createdAt: string;
}

// Product Types
export enum ProductCategory {
    RINGS = 'rings',
    NECKLACES = 'necklaces',
    EARRINGS = 'earrings',
    BRACELETS = 'bracelets',
    CUTLERY = 'cutlery',
    DECORATIVE = 'decorative',
}

export enum ProductMaterial {
    GOLD = 'gold',
    SILVER = 'silver',
    GOLD_PLATED = 'gold_plated',
    SILVER_PLATED = 'silver_plated',
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: ProductCategory;
    material: ProductMaterial;
    images: string[];
    model3D?: string;
    availability: boolean;
    stock: number;
    likes: number;
    views: number;
    rating: number;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
    offer?: Offer;
}

// Offer Types
export interface Offer {
    id: string;
    title: string;
    description: string;
    discountPercentage: number;
    startDate: string;
    endDate: string;
    active: boolean;
    productIds?: string[];
}

// Cart Types
export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    total: number;
    itemCount: number;
}

// Order Types
export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}

export interface OrderItem {
    product: Product;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    shippingAddress: Address;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
}

// Address Type
export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

// Wishlist Type
export interface WishlistItem {
    id: string;
    userId: string;
    productId: string;
    addedAt: string;
}

// Analytics Types
export interface ProductAnalytics {
    productId: string;
    views: number;
    likes: number;
    wishlistAdds: number;
    purchases: number;
    revenue: number;
}

export interface SalesAnalytics {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    topProducts: ProductAnalytics[];
    revenueByCategory: Record<ProductCategory, number>;
    revenueByMaterial: Record<ProductMaterial, number>;
    salesByDate: Array<{
        date: string;
        revenue: number;
        orders: number;
    }>;
}

// Filter Types
export interface ProductFilters {
    category?: ProductCategory[];
    material?: ProductMaterial[];
    priceRange?: {
        min: number;
        max: number;
    };
    onOffer?: boolean;
    inStock?: boolean;
    sortBy?: 'price_asc' | 'price_desc' | 'popularity' | 'newest' | 'rating';
    search?: string;
}

// API Response Types
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    results: T[];
    count: number;
    next?: string | null;
    previous?: string | null;
}

// Review Types
export interface Review {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: {
        firstName: string;
        lastName: string;
        avatar?: string;
    };
}
