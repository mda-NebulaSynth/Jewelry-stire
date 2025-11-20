import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiUser, FiSearch, FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { useState } from 'react';

export default function Header() {
    const { getCartItemCount, toggleCart, user, wishlist } = useStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const cartItemCount = getCartItemCount();

    return (
        <motion.header
            className="glass"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                padding: '1rem 0',
            }}
        >
            <div className="container">
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '2rem',
                    }}
                >
                    {/* Logo */}
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                            }}
                        >
                            <div
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'var(--gradient-gold)',
                                    borderRadius: 'var(--border-radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    color: 'var(--color-bg-primary)',
                                }}
                            >
                                ✦
                            </div>
                            <div>
                                <h2
                                    className="gradient-text-gold"
                                    style={{
                                        fontSize: 'var(--font-size-2xl)',
                                        fontFamily: 'var(--font-display)',
                                        margin: 0,
                                    }}
                                >
                                    LuxeJewels
                                </h2>
                                <p
                                    style={{
                                        fontSize: 'var(--font-size-xs)',
                                        color: 'var(--color-text-tertiary)',
                                        margin: 0,
                                        letterSpacing: '2px',
                                    }}
                                >
                                    FINE JEWELRY
                                </p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Navigation */}
                    <nav
                        style={{
                            display: 'flex',
                            gap: '2rem',
                            alignItems: 'center',
                        }}
                        className="desktop-nav"
                    >
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                        <Link to="/products" className="nav-link">
                            Shop
                        </Link>
                        <Link to="/collections" className="nav-link">
                            Collections
                        </Link>
                        <Link to="/offers" className="nav-link">
                            Offers
                        </Link>
                        <Link to="/about" className="nav-link">
                            About
                        </Link>
                    </nav>

                    {/* Search Bar */}
                    <motion.div
                        style={{
                            flex: 1,
                            maxWidth: '500px',
                            position: 'relative',
                        }}
                        animate={{
                            scale: isSearchFocused ? 1.02 : 1,
                        }}
                    >
                        <FiSearch
                            style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--color-text-tertiary)',
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search for jewelry..."
                            className="input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            style={{
                                paddingLeft: '3rem',
                            }}
                        />
                    </motion.div>

                    {/* Action Buttons */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center',
                        }}
                    >
                        {/* Wishlist */}
                        <Link to="/wishlist">
                            <motion.button
                                className="btn-icon"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                style={{ position: 'relative' }}
                            >
                                <FiHeart />
                                {wishlist.length > 0 && (
                                    <span
                                        style={{
                                            position: 'absolute',
                                            top: '-4px',
                                            right: '-4px',
                                            background: 'var(--color-error)',
                                            color: 'white',
                                            borderRadius: '50%',
                                            width: '20px',
                                            height: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {wishlist.length}
                                    </span>
                                )}
                            </motion.button>
                        </Link>

                        {/* Cart */}
                        <motion.button
                            className="btn-icon"
                            onClick={toggleCart}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{ position: 'relative' }}
                        >
                            <FiShoppingCart />
                            {cartItemCount > 0 && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: '-4px',
                                        right: '-4px',
                                        background: 'var(--gradient-gold)',
                                        color: 'var(--color-bg-primary)',
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {cartItemCount}
                                </span>
                            )}
                        </motion.button>

                        {/* User Account */}
                        <Link to={user ? '/profile' : '/login'}>
                            <motion.button
                                className="btn-icon"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FiUser />
                            </motion.button>
                        </Link>

                        {/* Mobile Menu */}
                        <motion.button
                            className="btn-icon mobile-menu"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FiMenu />
                        </motion.button>
                    </div>
                </div>
            </div>

            <style>{`
        .nav-link {
          color: var(--color-text-secondary);
          font-weight: 500;
          font-size: var(--font-size-base);
          transition: color var(--transition-fast);
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gradient-gold);
          transition: width var(--transition-base);
        }

        .nav-link:hover {
          color: var(--color-primary);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .mobile-menu {
          display: none;
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none;
          }

          .mobile-menu {
            display: flex;
          }
        }

        @media (max-width: 768px) {
          .input {
            display: none;
          }
        }
      `}</style>
        </motion.header>
    );
}
