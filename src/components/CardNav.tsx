import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface CardNavItem {
    id: string;
    label: string;
    path?: string;
    action?: () => void;
    image?: string;
    color: string;
}

interface CardNavProps {
    items: CardNavItem[];
    isOpen: boolean;
    onClose: () => void;
}

const CardNav = ({ items, isOpen, onClose }: CardNavProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, pointerEvents: 'none' }}
            animate={{
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? 'auto' : 'none'
            }}
            transition={{ duration: 0.3 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 2000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem',
                    width: '100%',
                    maxWidth: '1200px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    padding: '1rem'
                }}
            >
                {items.map((item, index) => {
                    const CardContent = (
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{
                                y: isOpen ? 0 : 50,
                                opacity: isOpen ? 1 : 0
                            }}
                            transition={{
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 100,
                                damping: 20
                            }}
                            whileHover={{
                                scale: 1.05,
                                y: -5
                            }}
                            style={{
                                background: item.color,
                                borderRadius: '20px',
                                padding: '2rem',
                                height: '300px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ zIndex: 2 }}>
                                <h3 style={{
                                    color: 'white',
                                    fontSize: '2rem',
                                    margin: '0 0 0.5rem 0',
                                    fontFamily: 'var(--font-display)'
                                }}>
                                    {item.label}
                                </h3>
                                <div style={{
                                    width: '40px',
                                    height: '4px',
                                    background: 'white',
                                    borderRadius: '2px'
                                }} />
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                color: 'white',
                                zIndex: 2
                            }}>
                                <span style={{ marginRight: '0.5rem', fontWeight: 500 }}>Explore</span>
                                <FiArrowRight size={24} />
                            </div>

                            {/* Decorative Circle */}
                            <div style={{
                                position: 'absolute',
                                bottom: '-50px',
                                right: '-50px',
                                width: '200px',
                                height: '200px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.1)',
                                zIndex: 1
                            }} />

                            {/* Image Overlay if provided */}
                            {item.image && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url(${item.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    opacity: 0.2,
                                    zIndex: 0
                                }} />
                            )}
                        </motion.div>
                    );

                    if (item.path) {
                        return (
                            <Link
                                key={item.id}
                                to={item.path}
                                onClick={onClose}
                                style={{ textDecoration: 'none' }}
                            >
                                {CardContent}
                            </Link>
                        );
                    } else {
                        return (
                            <div
                                key={item.id}
                                onClick={() => {
                                    if (item.action) item.action();
                                    onClose();
                                }}
                            >
                                {CardContent}
                            </div>
                        );
                    }
                })}
            </div>

            {/* Close Button */}
            <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    background: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2001,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </motion.button>
        </motion.div>
    );
};

export default CardNav;
