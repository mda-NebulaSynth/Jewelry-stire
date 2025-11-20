import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiTag } from 'react-icons/fi';
import { Offer } from '../types';
import { offersApi } from '../services/api';

export default function Offers() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOffers();
    }, []);

    const loadOffers = async () => {
        try {
            const data = await offersApi.getActive();
            setOffers(data);
        } catch (error) {
            console.error('Failed to load offers:', error);
        } finally {
            setLoading(false);
        }
    };

    const getTimeRemaining = (endDate: string) => {
        const end = new Date(endDate).getTime();
        const now = new Date().getTime();
        const distance = end - now;

        if (distance < 0) return 'Expired';

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        return `${days}d ${hours}h remaining`;
    };

    return (
        <div className="container" style={{ padding: 'var(--spacing-2xl) var(--spacing-xl)' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 style={{ marginBottom: 'var(--spacing-md)' }}>Special Offers</h1>
                <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2xl)' }}>
                    Don't miss out on our exclusive deals and limited-time offers
                </p>

                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 'var(--spacing-xl)' }}>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="skeleton" style={{ height: '300px', borderRadius: 'var(--border-radius-xl)' }} />
                        ))}
                    </div>
                ) : offers.length === 0 ? (
                    <div className="card" style={{ padding: 'var(--spacing-3xl)', textAlign: 'center' }}>
                        <h2>No active offers at the moment</h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Check back soon for amazing deals!
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 'var(--spacing-xl)' }}>
                        {offers.map((offer, index) => (
                            <motion.div
                                key={offer.id}
                                className="card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    padding: 'var(--spacing-xl)',
                                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(26, 26, 26, 0.8) 100%)',
                                }}
                            >
                                {/* Discount Badge */}
                                <div
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: 'var(--spacing-sm) var(--spacing-md)',
                                        background: 'var(--gradient-gold)',
                                        color: 'var(--color-bg-primary)',
                                        borderRadius: 'var(--border-radius-full)',
                                        fontWeight: 'bold',
                                        marginBottom: 'var(--spacing-lg)',
                                    }}
                                >
                                    <FiTag />
                                    {offer.discountPercentage}% OFF
                                </div>

                                <h2 style={{ marginBottom: 'var(--spacing-md)' }}>{offer.title}</h2>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                                    {offer.description}
                                </p>

                                {/* Countdown */}
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: 'var(--spacing-md)',
                                        background: 'var(--color-bg-tertiary)',
                                        borderRadius: 'var(--border-radius-md)',
                                        marginBottom: 'var(--spacing-lg)',
                                    }}
                                >
                                    <FiClock style={{ color: 'var(--color-primary)' }} />
                                    <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
                                        {getTimeRemaining(offer.endDate)}
                                    </span>
                                </div>

                                <motion.button
                                    className="btn btn-primary"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{ width: '100%' }}
                                    onClick={() => window.location.href = '/products'}
                                >
                                    Shop Now
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
