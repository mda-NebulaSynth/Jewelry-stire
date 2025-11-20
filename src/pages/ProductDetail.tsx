import { useState, useEffect, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import Product3DViewer from '../components/Product3DViewer';
import { Product, Review } from '../types';
import { useStore } from '../store';

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart, toggleLike, isLiked, addToWishlist, isInWishlist } = useStore();

    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'reviews' | '3d'>('3d');
    const [reviews, setReviews] = useState<Review[]>([]);

    const liked = product ? isLiked(product.id) : false;
    const inWishlist = product ? isInWishlist(product.id) : false;

    useEffect(() => {
        // Mock product data - replace with API call
        const mockProduct: Product = {
            id: id || '1',
            name: 'Elegant Gold Diamond Ring',
            description: 'Exquisite 18K gold ring featuring a stunning centerpiece diamond surrounded by smaller accent diamonds. Handcrafted by master jewelers with attention to every detail. This timeless piece combines classic elegance with modern sophistication, perfect for engagements, anniversaries, or as a statement piece for special occasions.',
            price: 2499.99,
            originalPrice: 2999.99,
            category: 'rings' as any,
            material: 'gold' as any,
            images: [
                'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
                'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
                'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800',
            ],
            availability: true,
            stock: 5,
            likes: 342,
            views: 2156,
            rating: 4.9,
            reviewCount: 87,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            offer: {
                id: 'offer1',
                title: 'Limited Time Offer',
                description: 'Save 20% on select items',
                discountPercentage: 20,
                startDate: new Date().toISOString(),
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                active: true,
            },
        };

        setProduct(mockProduct);

        // Mock reviews
        const mockReviews: Review[] = [
            {
                id: '1',
                userId: 'user1',
                productId: id || '1',
                rating: 5,
                comment: 'Absolutely stunning! The craftsmanship is impeccable.',
                createdAt: new Date().toISOString(),
                user: {
                    firstName: 'Sarah',
                    lastName: 'Johnson',
                },
            },
            {
                id: '2',
                userId: 'user2',
                productId: id || '1',
                rating: 5,
                comment: 'Beautiful ring, exceeded my expectations. Fast shipping too!',
                createdAt: new Date().toISOString(),
                user: {
                    firstName: 'Michael',
                    lastName: 'Chen',
                },
            },
        ];

        setReviews(mockReviews);
    }, [id]);

    if (!product) {
        return (
            <div className="container" style={{ padding: 'var(--spacing-3xl)', textAlign: 'center' }}>
                <div className="spinner" style={{ margin: '0 auto' }} />
            </div>
        );
    }

    const hasOffer = product.offer && new Date(product.offer.endDate) > new Date();
    const discountedPrice = hasOffer
        ? product.price * (1 - (product.offer?.discountPercentage || 0) / 100)
        : product.price;

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="container" style={{ padding: 'var(--spacing-2xl) var(--spacing-xl)' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'var(--spacing-3xl)',
                    marginBottom: 'var(--spacing-3xl)',
                }}
                className="product-detail-grid"
            >
                {/* Left: Images & 3D Viewer */}
                <div>
                    {/* Main Image/3D Viewer */}
                    <div
                        className="card"
                        style={{
                            padding: 0,
                            marginBottom: 'var(--spacing-lg)',
                            overflow: 'hidden',
                        }}
                    >
                        {activeTab === '3d' ? (
                            <Suspense
                                fallback={
                                    <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div className="spinner" />
                                    </div>
                                }
                            >
                                <Product3DViewer material={product.material.includes('gold') ? 'gold' : 'silver'} />
                            </Suspense>
                        ) : (
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                style={{
                                    width: '100%',
                                    height: '500px',
                                    objectFit: 'cover',
                                }}
                            />
                        )}
                    </div>

                    {/* Thumbnail Gallery */}
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                        <motion.button
                            className={`card ${activeTab === '3d' ? 'active-tab' : ''}`}
                            onClick={() => setActiveTab('3d')}
                            whileHover={{ scale: 1.05 }}
                            style={{
                                padding: 'var(--spacing-md)',
                                cursor: 'pointer',
                                border: activeTab === '3d' ? '2px solid var(--color-primary)' : '1px solid rgba(212, 175, 55, 0.2)',
                                background: 'var(--color-bg-tertiary)',
                                flex: 1,
                                textAlign: 'center',
                                fontWeight: 600,
                            }}
                        >
                            3D View
                        </motion.button>

                        {product.images.map((image, index) => (
                            <motion.img
                                key={index}
                                src={image}
                                alt={`${product.name} ${index + 1}`}
                                onClick={() => {
                                    setSelectedImage(index);
                                    setActiveTab('description');
                                }}
                                whileHover={{ scale: 1.05 }}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    objectFit: 'cover',
                                    borderRadius: 'var(--border-radius-md)',
                                    cursor: 'pointer',
                                    border:
                                        selectedImage === index && activeTab !== '3d'
                                            ? '2px solid var(--color-primary)'
                                            : '1px solid rgba(212, 175, 55, 0.2)',
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div>
                    {/* Badges */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: 'var(--spacing-md)' }}>
                        <span className={`badge ${product.material.includes('gold') ? 'badge-gold' : 'badge-silver'}`}>
                            {product.material.replace('_', ' ').toUpperCase()}
                        </span>
                        {hasOffer && (
                            <span className="badge badge-offer">
                                {product.offer?.discountPercentage}% OFF
                            </span>
                        )}
                        {product.stock < 5 && (
                            <span className="badge" style={{ background: 'var(--color-warning)' }}>
                                Only {product.stock} left
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 style={{ marginBottom: 'var(--spacing-md)' }}>{product.name}</h1>

                    {/* Rating */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-md)',
                            marginBottom: 'var(--spacing-lg)',
                        }}
                    >
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                            {[...Array(5)].map((_, i) => (
                                <FiStar
                                    key={i}
                                    fill={i < Math.floor(product.rating) ? 'var(--color-primary)' : 'none'}
                                    color="var(--color-primary)"
                                    size={20}
                                />
                            ))}
                        </div>
                        <span style={{ color: 'var(--color-text-secondary)' }}>
                            {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                        </span>
                    </div>

                    {/* Price */}
                    <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                        {hasOffer && (
                            <div
                                style={{
                                    fontSize: 'var(--font-size-xl)',
                                    color: 'var(--color-text-tertiary)',
                                    textDecoration: 'line-through',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                ${product.price.toFixed(2)}
                            </div>
                        )}
                        <div
                            className="gradient-text-gold"
                            style={{
                                fontSize: 'var(--font-size-4xl)',
                                fontWeight: 'bold',
                            }}
                        >
                            ${discountedPrice.toFixed(2)}
                        </div>
                    </div>

                    {/* Description */}
                    <p
                        style={{
                            fontSize: 'var(--font-size-lg)',
                            lineHeight: 1.8,
                            color: 'var(--color-text-secondary)',
                            marginBottom: 'var(--spacing-xl)',
                        }}
                    >
                        {product.description}
                    </p>

                    {/* Quantity Selector */}
                    <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-sm)',
                                fontWeight: 600,
                            }}
                        >
                            Quantity
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button
                                className="btn-icon"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="input"
                                style={{ width: '80px', textAlign: 'center', padding: '0.75rem' }}
                            />
                            <button
                                className="btn-icon"
                                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
                        <motion.button
                            className="btn btn-primary"
                            onClick={handleAddToCart}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ flex: 1, fontSize: 'var(--font-size-lg)', padding: '1rem' }}
                        >
                            <FiShoppingCart /> Add to Cart
                        </motion.button>

                        <motion.button
                            className={`btn-icon ${liked ? 'active' : ''}`}
                            onClick={() => toggleLike(product.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{ width: '56px', height: '56px' }}
                        >
                            <FiHeart fill={liked ? 'currentColor' : 'none'} size={24} />
                        </motion.button>

                        <motion.button
                            className={`btn-icon ${inWishlist ? 'active' : ''}`}
                            onClick={() => {
                                if (inWishlist) {
                                    useStore.getState().removeFromWishlist(product.id);
                                } else {
                                    addToWishlist(product.id);
                                }
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{ width: '56px', height: '56px' }}
                        >
                            ⭐
                        </motion.button>
                    </div>

                    {/* Features */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 'var(--spacing-md)',
                            marginBottom: 'var(--spacing-xl)',
                        }}
                    >
                        {[
                            { icon: <FiTruck />, text: 'Free Shipping' },
                            { icon: <FiShield />, text: 'Lifetime Warranty' },
                            { icon: <FiRefreshCw />, text: '30-Day Returns' },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="card"
                                style={{
                                    padding: 'var(--spacing-md)',
                                    textAlign: 'center',
                                    background: 'var(--color-bg-tertiary)',
                                }}
                            >
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
                                    {feature.icon}
                                </div>
                                <div style={{ fontSize: 'var(--font-size-sm)' }}>{feature.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Reviews Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card"
                style={{ padding: 'var(--spacing-2xl)' }}
            >
                <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>Customer Reviews</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            style={{
                                padding: 'var(--spacing-lg)',
                                background: 'var(--color-bg-tertiary)',
                                borderRadius: 'var(--border-radius-lg)',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 'var(--spacing-sm)',
                                }}
                            >
                                <div>
                                    <strong>
                                        {review.user.firstName} {review.user.lastName}
                                    </strong>
                                </div>
                                <div style={{ display: 'flex', gap: '0.25rem' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar
                                            key={i}
                                            fill={i < review.rating ? 'var(--color-primary)' : 'none'}
                                            color="var(--color-primary)"
                                            size={16}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                                {review.comment}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>

            <style>{`
        @media (max-width: 1024px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
}
