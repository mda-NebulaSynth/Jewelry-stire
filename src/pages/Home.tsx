import { motion } from 'framer-motion';
import { FiArrowRight, FiStar, FiTrendingUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Product, ProductCategory } from '../types';

export default function Home() {
    const navigate = useNavigate();
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

    // Mock featured products - replace with API call
    useEffect(() => {
        const mockProducts: Product[] = [
            {
                id: '1',
                name: 'Elegant Gold Ring',
                description: 'Handcrafted 24K gold ring with intricate design',
                price: 1299.99,
                category: ProductCategory.RINGS,
                material: 'gold' as any,
                images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500'],
                availability: true,
                stock: 5,
                likes: 234,
                views: 1520,
                rating: 4.8,
                reviewCount: 45,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: '2',
                name: 'Silver Necklace',
                description: 'Premium sterling silver necklace with pendant',
                price: 599.99,
                category: ProductCategory.NECKLACES,
                material: 'silver' as any,
                images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500'],
                availability: true,
                stock: 8,
                likes: 189,
                views: 980,
                rating: 4.6,
                reviewCount: 32,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: '3',
                name: 'Diamond Earrings',
                description: 'Luxurious gold earrings with genuine diamonds',
                price: 2499.99,
                originalPrice: 2999.99,
                category: ProductCategory.EARRINGS,
                material: 'gold' as any,
                images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500'],
                availability: true,
                stock: 3,
                likes: 412,
                views: 2340,
                rating: 5.0,
                reviewCount: 78,
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
            },
        ];
        setFeaturedProducts(mockProducts);
    }, []);

    const handleViewProduct = (product: Product) => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div>
            {/* Hero Section */}
            <section
                style={{
                    position: 'relative',
                    minHeight: '90vh',
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}
            >
                {/* Background */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
                        zIndex: -1,
                    }}
                />

                <div className="container">
                    <div style={{ maxWidth: '800px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.p
                                style={{
                                    fontSize: 'var(--font-size-lg)',
                                    color: 'var(--color-primary)',
                                    marginBottom: 'var(--spacing-md)',
                                    letterSpacing: '3px',
                                    textTransform: 'uppercase',
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                Premium Collection
                            </motion.p>

                            <h1
                                style={{
                                    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                                    marginBottom: 'var(--spacing-xl)',
                                    lineHeight: 1.1,
                                }}
                            >
                                Discover <br />
                                <span className="gradient-text-gold">NebulaJewel</span>
                            </h1>

                            <p
                                style={{
                                    fontSize: 'var(--font-size-xl)',
                                    color: 'var(--color-text-secondary)',
                                    marginBottom: 'var(--spacing-2xl)',
                                    lineHeight: 1.8,
                                }}
                            >
                                Discover our exquisite collection of handcrafted jewelry.
                                Each piece tells a story of luxury, craftsmanship, and timeless beauty.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <motion.button
                                    className="btn btn-primary"
                                    onClick={() => navigate('/products')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ fontSize: 'var(--font-size-lg)', padding: '1.25rem 2.5rem' }}
                                >
                                    Explore Collection
                                    <FiArrowRight />
                                </motion.button>

                                <motion.button
                                    className="btn btn-outline"
                                    onClick={() => navigate('/offers')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ fontSize: 'var(--font-size-lg)', padding: '1.25rem 2.5rem' }}
                                >
                                    View Offers
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{
                        position: 'absolute',
                        right: '10%',
                        top: '20%',
                        fontSize: '8rem',
                        opacity: 0.1,
                    }}
                >
                    💍
                </motion.div>
            </section>

            {/* Features Section */}
            <section style={{ padding: 'var(--spacing-3xl) 0' }}>
                <div className="container">
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: 'var(--spacing-xl)',
                        }}
                    >
                        {[
                            {
                                icon: <FiStar size={32} />,
                                title: 'Premium Quality',
                                description: 'Certified gold and silver with lifetime warranty',
                            },
                            {
                                icon: <FiTrendingUp size={32} />,
                                title: 'Trending Designs',
                                description: 'Latest styles curated by expert designers',
                            },
                            {
                                icon: '🎁',
                                title: 'Special Offers',
                                description: 'Exclusive deals and seasonal discounts',
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}
                            >
                                <div
                                    style={{
                                        fontSize: '3rem',
                                        marginBottom: 'var(--spacing-md)',
                                        color: 'var(--color-primary)',
                                    }}
                                >
                                    {feature.icon}
                                </div>
                                <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section style={{ padding: 'var(--spacing-3xl) 0', background: 'var(--color-bg-secondary)' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}
                    >
                        <h2 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--spacing-md)' }}>
                            Featured Collection
                        </h2>
                        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)' }}>
                            Handpicked pieces that define luxury
                        </p>
                    </motion.div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: 'var(--spacing-xl)',
                        }}
                    >
                        {featuredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProductCard product={product} onView={handleViewProduct} />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        style={{ textAlign: 'center', marginTop: 'var(--spacing-2xl)' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/products')}
                        >
                            View All Products
                            <FiArrowRight />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                style={{
                    padding: 'var(--spacing-3xl) 0',
                    background: 'var(--gradient-dark)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 30% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)',
                    }}
                />

                <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--spacing-md)' }}>
                            Subscribe to Our Newsletter
                        </h2>
                        <p
                            style={{
                                fontSize: 'var(--font-size-lg)',
                                color: 'var(--color-text-secondary)',
                                marginBottom: 'var(--spacing-xl)',
                                maxWidth: '600px',
                                margin: '0 auto var(--spacing-xl)',
                            }}
                        >
                            Stay updated with our latest collections, exclusive offers, and jewelry care tips.
                        </p>

                        <div
                            style={{
                                display: 'flex',
                                gap: '1rem',
                                maxWidth: '500px',
                                margin: '0 auto',
                            }}
                        >
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input"
                                style={{ flex: 1 }}
                            />
                            <button className="btn btn-primary">Subscribe</button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
