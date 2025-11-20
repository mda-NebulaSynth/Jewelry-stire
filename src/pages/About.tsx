import { motion } from 'framer-motion';
import { FiAward, FiHeart, FiShield, FiTruck } from 'react-icons/fi';

export default function About() {
    return (
        <div>
            {/* Hero Section */}
            <section
                style={{
                    position: 'relative',
                    padding: 'var(--spacing-3xl) 0',
                    background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
                }}
            >
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
                    >
                        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: 'var(--spacing-lg)' }}>
                            About NebulaJewel
                        </h1>
                        <p style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                            Crafting timeless elegance since 2020. We specialize in premium gold and silver jewelry
                            that celebrates life's precious moments.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story */}
            <section style={{ padding: 'var(--spacing-3xl) 0', background: 'var(--color-bg-secondary)' }}>
                <div className="container">
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 'var(--spacing-3xl)',
                            alignItems: 'center',
                        }}
                        className="about-grid"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--spacing-lg)' }}>
                                Our Story
                            </h2>
                            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 'var(--spacing-md)' }}>
                                NebulaJewel was born from a passion for creating exquisite jewelry that tells a story.
                                Each piece in our collection is carefully crafted by skilled artisans who pour their
                                heart and soul into every detail.
                            </p>
                            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                                We believe that jewelry is more than just an accessory—it's a celebration of life's
                                most precious moments, a symbol of love, and a legacy that can be passed down through
                                generations.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{
                                height: '400px',
                                borderRadius: 'var(--border-radius-xl)',
                                background: 'var(--gradient-gold)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '8rem',
                            }}
                        >
                            💎
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section style={{ padding: 'var(--spacing-3xl) 0' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}
                    >
                        <h2 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--spacing-md)' }}>
                            Our Values
                        </h2>
                        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)' }}>
                            What makes us different
                        </p>
                    </motion.div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: 'var(--spacing-xl)',
                        }}
                    >
                        {[
                            {
                                icon: <FiAward size={40} />,
                                title: 'Premium Quality',
                                description: 'Only the finest materials and craftsmanship go into every piece we create.',
                            },
                            {
                                icon: <FiHeart size={40} />,
                                title: 'Passion & Care',
                                description: 'Each piece is crafted with love and attention to detail by skilled artisans.',
                            },
                            {
                                icon: <FiShield size={40} />,
                                title: 'Lifetime Warranty',
                                description: 'We stand behind our work with a comprehensive lifetime warranty.',
                            },
                            {
                                icon: <FiTruck size={40} />,
                                title: 'Free Shipping',
                                description: 'Complimentary shipping on all orders, delivered securely to your door.',
                            },
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                className="card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}
                            >
                                <div style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-md)' }}>
                                    {value.icon}
                                </div>
                                <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>{value.title}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Craftsmanship */}
            <section style={{ padding: 'var(--spacing-3xl) 0', background: 'var(--color-bg-secondary)' }}>
                <div className="container">
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 'var(--spacing-3xl)',
                            alignItems: 'center',
                        }}
                        className="about-grid"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{
                                height: '400px',
                                borderRadius: 'var(--border-radius-xl)',
                                background: 'var(--gradient-silver)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '8rem',
                            }}
                        >
                            ⚒️
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--spacing-lg)' }}>
                                Exceptional Craftsmanship
                            </h2>
                            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 'var(--spacing-md)' }}>
                                Our master jewelers bring decades of experience to every piece they create. Using
                                traditional techniques combined with modern innovation, we ensure that each item
                                meets our exacting standards.
                            </p>
                            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                                From the initial design sketch to the final polish, every step is executed with
                                precision and care. We use only certified gold and silver, ensuring authenticity
                                and lasting beauty.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: 'var(--spacing-3xl) 0' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="card"
                        style={{
                            padding: 'var(--spacing-3xl)',
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(26, 26, 26, 0.8) 100%)',
                        }}
                    >
                        <h2 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--spacing-md)' }}>
                            Start Your Journey
                        </h2>
                        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xl)', maxWidth: '600px', margin: '0 auto var(--spacing-xl)' }}>
                            Discover our collection of timeless pieces and find the perfect jewelry to celebrate
                            your special moments.
                        </p>
                        <motion.button
                            className="btn btn-primary"
                            onClick={() => window.location.href = '/products'}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ fontSize: 'var(--font-size-lg)', padding: '1.25rem 2.5rem' }}
                        >
                            Explore Collection
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            <style>{`
        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
}
