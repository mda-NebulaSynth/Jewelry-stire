import axios from "axios";

const api = axios.create({
    baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Products API
export const productsApi = {
    getAll: async (filters?: ProductFilters, page = 1, pageSize = 12) => {
        const response = await api.get<PaginatedResponse<Product>>('/products/', {
            params: { ...filters, page, pageSize },
        });
        return response.data;
    },

    getById: async (id: string) => {
        const response = await api.get<ApiResponse<Product>>(`/products/${id}/`);
        return response.data.data;
    },

    create: async (product: Partial<Product>) => {
        const response = await api.post<ApiResponse<Product>>('/products/', product);
        return response.data.data;
    },

    update: async (id: string, product: Partial<Product>) => {
        const response = await api.put<ApiResponse<Product>>(`/products/${id}/`, product);
        return response.data.data;
    },

    delete: async (id: string) => {
        const response = await api.delete<ApiResponse<void>>(`/products/${id}/`);
        return response.data;
    },

    like: async (id: string) => {
        const response = await api.post<ApiResponse<Product>>(`/products/${id}/like/`);
        return response.data.data;
    },

    trackView: async (id: string) => {
        const response = await api.post<ApiResponse<void>>(`/products/${id}/view/`);
        return response.data;
    },
};

// Users API
export const usersApi = {
    register: async (userData: Partial<User> & { password: string }) => {
        const response = await api.post<ApiResponse<User>>('/users/register/', userData);
        return response.data.data;
    },

    login: async (email: string, password: string) => {
        const response = await api.post<ApiResponse<{ user: User; token: string }>>('/users/login/', {
            email,
            password,
        });
        return response.data.data;
    },

    getProfile: async () => {
        const response = await api.get<ApiResponse<User>>('/users/profile/');
        return response.data.data;
    },

    updateProfile: async (userData: Partial<User>) => {
        const response = await api.put<ApiResponse<User>>('/users/profile/', userData);
        return response.data.data;
    },
};

// Orders API
export const ordersApi = {
    create: async (orderData: Partial<Order>) => {
        const response = await api.post<ApiResponse<Order>>('/orders/', orderData);
        return response.data.data;
    },

    getAll: async (page = 1, pageSize = 10) => {
        const response = await api.get<PaginatedResponse<Order>>('/orders/', {
            params: { page, pageSize },
        });
        return response.data;
    },

    getById: async (id: string) => {
        const response = await api.get<ApiResponse<Order>>(`/orders/${id}/`);
        return response.data.data;
    },

    updateStatus: async (id: string, status: string) => {
        const response = await api.patch<ApiResponse<Order>>(`/orders/${id}/status/`, { status });
        return response.data.data;
    },
};

// Wishlist API
export const wishlistApi = {
    getAll: async () => {
        const response = await api.get<ApiResponse<Product[]>>('/wishlist/');
        return response.data.data;
    },

    add: async (productId: string) => {
        const response = await api.post<ApiResponse<void>>('/wishlist/', { productId });
        return response.data;
    },

    remove: async (productId: string) => {
        const response = await api.delete<ApiResponse<void>>(`/wishlist/${productId}/`);
        return response.data;
    },
};

// Offers API
export const offersApi = {
    getAll: async () => {
        const response = await api.get<ApiResponse<Offer[]>>('/offers/');
        return response.data.data;
    },

    getActive: async () => {
        const response = await api.get<ApiResponse<Offer[]>>('/offers/active/');
        return response.data.data;
    },

    create: async (offer: Partial<Offer>) => {
        const response = await api.post<ApiResponse<Offer>>('/offers/', offer);
        return response.data.data;
    },

    update: async (id: string, offer: Partial<Offer>) => {
        const response = await api.put<ApiResponse<Offer>>(`/offers/${id}/`, offer);
        return response.data.data;
    },

    delete: async (id: string) => {
        const response = await api.delete<ApiResponse<void>>(`/offers/${id}/`);
        return response.data;
    },
};

// Reviews API
export const reviewsApi = {
    getByProduct: async (productId: string, page = 1, pageSize = 10) => {
        const response = await api.get<PaginatedResponse<Review>>(`/products/${productId}/reviews/`, {
            params: { page, pageSize },
        });
        return response.data;
    },

    create: async (review: Partial<Review>) => {
        const response = await api.post<ApiResponse<Review>>('/reviews/', review);
        return response.data.data;
    },

    update: async (id: string, review: Partial<Review>) => {
        const response = await api.put<ApiResponse<Review>>(`/reviews/${id}/`, review);
        return response.data.data;
    },

    delete: async (id: string) => {
        const response = await api.delete<ApiResponse<void>>(`/reviews/${id}/`);
        return response.data;
    },
};

// Analytics API
export const analyticsApi = {
    getSalesAnalytics: async (startDate?: string, endDate?: string) => {
        const response = await api.get<ApiResponse<SalesAnalytics>>('/analytics/sales/', {
            params: { startDate, endDate },
        });
        return response.data.data;
    },

    getProductAnalytics: async (productId: string) => {
        const response = await api.get<ApiResponse<any>>(`/analytics/products/${productId}/`);
        return response.data.data;
    },
};

export default api;
