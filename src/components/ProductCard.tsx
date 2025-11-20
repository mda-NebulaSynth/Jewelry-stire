import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import { Product } from '../types';
import { useStore } from '../store';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
    onView: (product: Product) => void;
}

export default function ProductCard({ product, onView }: ProductCardProps) {
    const { addToCart, toggleLike, isLiked, addToWishlist, isInWishlist } = useStore();
    const [imageLoaded, setImageLoaded] = useState(false);

    const liked = isLiked(product.id);
    const inWishlist = isInWishlist(product.id);

    const hasOffer = product.offer && new Date(product.offer.endDate) > new Date();
    const discountedPrice = hasOffer
        ? product.price * (1 - (product.offer?.discountPercentage || 0) / 100)
        : product.price;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(product);
    };

    const handleToggleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleLike(product.id);
    };

    const handleAddToWishlist = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (inWishlist) {
            useStore.getState().removeFromWishlist(product.id);
        } else {
            addToWishlist(product.id);
        }
    };

    return (
        <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            onClick={() => onView(product)}
            style={{ cursor: 'pointer', position: 'relative' }}
        >
            {/* Offer Badge */}
            {hasOffer && (
                <div
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        zIndex: 10,
                    }}
                >
                    <span className="badge badge-offer">
                        {product.offer?.discountPercentage}% OFF
                    </span>
                </div>
            )}

            {/* Action Buttons */}
            <div
                style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    zIndex: 10,
                }}
            >
                <motion.button
                    className={`btn-icon ${liked ? 'active' : ''}`}
                    onClick={handleToggleLike}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FiHeart fill={liked ? 'currentColor' : 'none'} />
                </motion.button>

                <motion.button
                    className={`btn-icon ${inWishlist ? 'active' : ''}`}
                    onClick={handleAddToWishlist}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FiEye />
                </motion.button>
            </div>

            {/* Product Image */}
            <div style={{ position: 'relative', overflow: 'hidden', height: '300px' }}>
                {!imageLoaded && (
                    <div
                        className="skeleton"
                        style={{ width: '100%', height: '100%', position: 'absolute' }}
                    />
                )}
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="card-image"
                    onLoad={() => setImageLoaded(true)}
                    style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
                />
            </div>

            {/* Product Info */}
            <div className="card-content">
                {/* Material Badge */}
                <div style={{ marginBottom: '0.5rem' }}>
                    <span
                        className={`badge ${product.material.includes('gold') ? 'badge-gold' : 'badge-silver'
                            }`}
                    >
                        {product.material.replace('_', ' ').toUpperCase()}
                    </span>
                </div>

                {/* Product Name */}
                <h3 className="card-title">{product.name}</h3>

                {/* Product Description */}
                <p className="card-description">
                    {product.description.length > 80
                        ? `${product.description.substring(0, 80)}...`
                        : product.description}
                </p>

                {/* Rating & Reviews */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1rem',
                    }}
                >
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                style={{
                                    color: i < Math.floor(product.rating) ? '#D4AF37' : '#888',
                                    fontSize: '0.875rem',
                                }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)' }}>
                        ({product.reviewCount})
                    </span>
                </div>

                {/* Price & Add to Cart */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 'auto',
                    }}
                >
                    <div>
                        {hasOffer && (
                            <div
                                style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-text-tertiary)',
                                    textDecoration: 'line-through',
                                }}
                            >
                                ${product.price.toFixed(2)}
                            </div>
                        )}
                        <div className="card-price">${discountedPrice.toFixed(2)}</div>
                    </div>

                    <motion.button
                        className="btn-icon"
                        onClick={handleAddToCart}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ width: '56px', height: '56px' }}
                    >
                        <FiShoppingCart size={20} />
                    </motion.button>
                </div>

                {/* Stock Status */}
                {!product.availability && (
                    <div
                        style={{
                            marginTop: '0.5rem',
                            padding: '0.5rem',
                            background: 'var(--color-error)',
                            borderRadius: 'var(--border-radius-sm)',
                            textAlign: 'center',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 600,
                        }}
                    >
                        Out of Stock
                    </div>
                )}
            </div>
        </motion.div>
    );
}
