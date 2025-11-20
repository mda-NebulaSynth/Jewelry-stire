import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, User, WishlistItem } from '../types';

interface StoreState {
    // User State
    user: User | null;
    setUser: (user: User | null) => void;

    // Cart State
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateCartItemQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartItemCount: () => number;

    // Wishlist State
    wishlist: string[];
    addToWishlist: (productId: string) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;

    // Liked Products State
    likedProducts: string[];
    toggleLike: (productId: string) => void;
    isLiked: (productId: string) => boolean;

    // UI State
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    isCartOpen: boolean;
    toggleCart: () => void;
}

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            // User State
            user: null,
            setUser: (user) => set({ user }),

            // Cart State
            cart: [],
            addToCart: (product, quantity = 1) => {
                const cart = get().cart;
                const existingItem = cart.find(item => item.product.id === product.id);

                if (existingItem) {
                    set({
                        cart: cart.map(item =>
                            item.product.id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    });
                } else {
                    set({ cart: [...cart, { product, quantity }] });
                }
            },

            removeFromCart: (productId) => {
                set({ cart: get().cart.filter(item => item.product.id !== productId) });
            },

            updateCartItemQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeFromCart(productId);
                    return;
                }

                set({
                    cart: get().cart.map(item =>
                        item.product.id === productId
                            ? { ...item, quantity }
                            : item
                    ),
                });
            },

            clearCart: () => set({ cart: [] }),

            getCartTotal: () => {
                return get().cart.reduce(
                    (total, item) => total + (item.product.price * item.quantity),
                    0
                );
            },

            getCartItemCount: () => {
                return get().cart.reduce((count, item) => count + item.quantity, 0);
            },

            // Wishlist State
            wishlist: [],
            addToWishlist: (productId) => {
                if (!get().wishlist.includes(productId)) {
                    set({ wishlist: [...get().wishlist, productId] });
                }
            },

            removeFromWishlist: (productId) => {
                set({ wishlist: get().wishlist.filter(id => id !== productId) });
            },

            isInWishlist: (productId) => {
                return get().wishlist.includes(productId);
            },

            // Liked Products State
            likedProducts: [],
            toggleLike: (productId) => {
                const likedProducts = get().likedProducts;
                if (likedProducts.includes(productId)) {
                    set({ likedProducts: likedProducts.filter(id => id !== productId) });
                } else {
                    set({ likedProducts: [...likedProducts, productId] });
                }
            },

            isLiked: (productId) => {
                return get().likedProducts.includes(productId);
            },

            // UI State
            isSidebarOpen: false,
            toggleSidebar: () => set({ isSidebarOpen: !get().isSidebarOpen }),

            isCartOpen: false,
            toggleCart: () => set({ isCartOpen: !get().isCartOpen }),
        }),
        {
            name: 'jewelry-store',
            partialize: (state) => ({
                cart: state.cart,
                wishlist: state.wishlist,
                likedProducts: state.likedProducts,
                user: state.user,
            }),
        }
    )
);
