import { motion } from 'framer-motion';
import { FiPackage, FiDollarSign, FiUsers, FiTrendingUp, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, hasRole } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    // Admin/Manager Dashboard
    if (hasRole([UserRole.ADMIN, UserRole.MANAGER])) {
        return (
            <div className="container" style={{ padding: 'var(--spacing-2xl) var(--spacing-xl)' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 style={{ marginBottom: 'var(--spacing-md)' }}>
                        Welcome back, {user.firstName}!
                    </h1>
                    <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2xl)' }}>
                        {user.role === UserRole.ADMIN ? 'Admin' : 'Manager'} Dashboard
                    </p>

                    {/* Stats Grid */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: 'var(--spacing-xl)',
                            marginBottom: 'var(--spacing-2xl)',
                        }}
                    >
                        {[
                            { icon: <FiDollarSign size={32} />, label: 'Total Revenue', value: '$24,580', change: '+12.5%' },
                            { icon: <FiShoppingCart size={32} />, label: 'Total Orders', value: '156', change: '+8.2%' },
                            { icon: <FiPackage size={32} />, label: 'Products', value: '48', change: '+3' },
                            { icon: <FiUsers size={32} />, label: 'Customers', value: '892', change: '+24' },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                style={{ padding: 'var(--spacing-xl)' }}
                            >
                                <div style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-md)' }}>
                                    {stat.icon}
                                </div>
                                <h3 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-sm)' }}>
                                    {stat.value}
                                </h3>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                                    {stat.label}
                                </p>
                                <span style={{ color: 'var(--color-success)', fontSize: 'var(--font-size-sm)' }}>
                                    {stat.change}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Quick Actions</h2>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: 'var(--spacing-md)',
                        }}
                    >
                        <motion.button
                            className="btn btn-primary"
                            onClick={() => navigate('/admin/products/new')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Add New Product
                        </motion.button>
                        <motion.button
                            className="btn btn-secondary"
                            onClick={() => navigate('/admin/orders')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            View Orders
                        </motion.button>
                        <motion.button
                            className="btn btn-outline"
                            onClick={() => navigate('/admin/offers')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Manage Offers
                        </motion.button>
                        <motion.button
                            className="btn btn-outline"
                            onClick={() => navigate('/admin/analytics')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            View Analytics
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Staff Dashboard
    if (hasRole([UserRole.STAFF])) {
        return (
            <div className="container" style={{ padding: 'var(--spacing-2xl) var(--spacing-xl)' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 style={{ marginBottom: 'var(--spacing-md)' }}>
                        Welcome, {user.firstName}!
                    </h1>
                    <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2xl)' }}>
                        Staff Dashboard
                    </p>

                    {/* Stats */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: 'var(--spacing-xl)',
                            marginBottom: 'var(--spacing-2xl)',
                        }}
                    >
                        {[
                            { icon: <FiShoppingCart size={32} />, label: 'Pending Orders', value: '12' },
                            { icon: <FiPackage size={32} />, label: 'Processing', value: '8' },
                            { icon: <FiTrendingUp size={32} />, label: 'Completed Today', value: '24' },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                style={{ padding: 'var(--spacing-xl)' }}
                            >
                                <div style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-md)' }}>
                                    {stat.icon}
                                </div>
                                <h3 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-sm)' }}>
                                    {stat.value}
                                </h3>
                                <p style={{ color: 'var(--color-text-secondary)' }}>
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Quick Actions</h2>
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                        <motion.button
                            className="btn btn-primary"
                            onClick={() => navigate('/staff/orders')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Manage Orders
                        </motion.button>
                        <motion.button
                            className="btn btn-outline"
                            onClick={() => navigate('/staff/inventory')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Check Inventory
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Customer Dashboard
    return (
        <div className="container" style={{ padding: 'var(--spacing-2xl) var(--spacing-xl)' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 style={{ marginBottom: 'var(--spacing-md)' }}>
                    Welcome, {user.firstName}!
                </h1>
                <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2xl)' }}>
                    Your Account Dashboard
                </p>

                {/* Quick Stats */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 'var(--spacing-xl)',
                        marginBottom: 'var(--spacing-2xl)',
                    }}
                >
                    {[
                        { icon: <FiShoppingCart size={28} />, label: 'Orders', value: '5' },
                        { icon: <FiHeart size={28} />, label: 'Wishlist', value: '12' },
                        { icon: <FiPackage size={28} />, label: 'In Transit', value: '2' },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}
                        >
                            <div style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-sm)' }}>
                                {stat.icon}
                            </div>
                            <h3 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: '0.25rem' }}>
                                {stat.value}
                            </h3>
                            <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Links */}
                <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Quick Links</h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 'var(--spacing-md)',
                    }}
                >
                    <motion.button
                        className="btn btn-primary"
                        onClick={() => navigate('/products')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Browse Products
                    </motion.button>
                    <motion.button
                        className="btn btn-secondary"
                        onClick={() => navigate('/orders')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        My Orders
                    </motion.button>
                    <motion.button
                        className="btn btn-outline"
                        onClick={() => navigate('/wishlist')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        My Wishlist
                    </motion.button>
                    <motion.button
                        className="btn btn-outline"
                        onClick={() => navigate('/profile')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Edit Profile
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
