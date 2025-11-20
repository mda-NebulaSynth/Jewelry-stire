import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiUser, FiSearch, FiMenu, FiLogOut, FiGrid, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import CardNav from './CardNav';
import { useStore } from '../store';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function Header() {
    const { getCartItemCount, toggleCart, wishlist } = useStore();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const cartItemCount = getCartItemCount();

    const handleLogout = () => {
        logout();
        setActiveMenu(null);
        navigate('/');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setActiveMenu(null);
        }
    };

    const navGroups = {
        shop: [
            { id: 'shop', label: 'Shop All', path: '/products', color: '#4ECDC4', image: 'https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=1000&auto=format&fit=crop' },
            { id: 'collections', label: 'Collections', path: '/collections', color: '#45B7D1', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop' },
            { id: 'offers', label: 'Offers', path: '/offers', color: '#96CEB4', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop' },
        ],
        explore: [
            { id: 'home', label: 'Home', path: '/', color: '#FF6B6B', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000&auto=format&fit=crop' },
            { id: 'about', label: 'About', path: '/about', color: '#FFEEAD', image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1000&auto=format&fit=crop' },
        ],
        account: [
            ...(user ? [
                { id: 'dashboard', label: 'Dashboard', path: '/dashboard', color: '#A8E6CF' },
                { id: 'logout', label: 'Logout', action: handleLogout, color: '#FF8B94' }
            ] : [
                { id: 'login', label: 'Login', path: '/login', color: '#FF8B94' },
                { id: 'register', label: 'Register', path: '/login', color: '#FF8B94' }
            ]),
            ...(user?.role === 'admin' ? [{ id: 'admin', label: 'Admin', path: '/admin/products', color: '#D4AF37' }] : []),
        ]
    };

    const mobileItems = [
        ...navGroups.explore,
        ...navGroups.shop,
        ...navGroups.account
    ];

    const currentItems = activeMenu === 'mobile' ? mobileItems : (activeMenu ? navGroups[activeMenu as keyof typeof navGroups] : []);

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
                                    NebulaJewel
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

                    {/* Desktop Navigation Groups */}
                    <nav
                        style={{
                            display: 'flex',
                            gap: '2rem',
                            alignItems: 'center',
                        }}
                        className="desktop-nav"
                    >
                        <button
                            className={`nav-link ${activeMenu === 'explore' ? 'active' : ''}`}
                            onClick={() => setActiveMenu(activeMenu === 'explore' ? null : 'explore')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                            Explore
                        </button>
                        <button
                            className={`nav-link ${activeMenu === 'shop' ? 'active' : ''}`}
                            onClick={() => setActiveMenu(activeMenu === 'shop' ? null : 'shop')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                            Shop
                        </button>
                        <button
                            className={`nav-link ${activeMenu === 'account' ? 'active' : ''}`}
                            onClick={() => setActiveMenu(activeMenu === 'account' ? null : 'account')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                            Account
                        </button>
                    </nav>

                    {/* Desktop Search Bar */}
                    <motion.form
                        onSubmit={handleSearch}
                        className="desktop-search"
                        style={{
                            flex: 1,
                            maxWidth: '400px',
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
                            placeholder="Search..."
                            className="input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            style={{
                                paddingLeft: '3rem',
                                borderRadius: 'var(--border-radius-full)',
                            }}
                        />
                    </motion.form>

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
                                    <span className="badge-count">
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
                                <span className="badge-count" style={{ background: 'var(--gradient-gold)', color: 'var(--color-bg-primary)' }}>
                                    {cartItemCount}
                                </span>
                            )}
                        </motion.button>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="btn-icon mobile-menu-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setActiveMenu(activeMenu === 'mobile' ? null : 'mobile')}
                        >
                            {activeMenu === 'mobile' ? <FiX /> : <FiMenu />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Card Nav Overlay */}
            <CardNav
                items={currentItems || []}
                isOpen={!!activeMenu}
                onClose={() => setActiveMenu(null)}
            />

            <style>{`
        .nav-link {
          color: var(--color-text-secondary);
          font-weight: 500;
          font-size: var(--font-size-base);
          transition: color var(--transition-fast);
          text-decoration: none;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--color-primary);
        }

        .nav-link-mobile {
          color: var(--color-text-primary);
          font-size: 1.1rem;
          font-weight: 500;
          padding: 0.5rem 0;
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .nav-link-mobile:hover {
          color: var(--color-primary);
        }

        .badge-count {
            position: absolute;
            top: -4px;
            right: -4px;
            background: var(--color-error);
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: bold;
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-search {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }

        @media (min-width: 1025px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
        </motion.header>
    );
}
