import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCreditCard, FiMapPin, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { useAuth } from '../contexts/AuthContext';
import { ordersApi } from '../services/api';

export default function Checkout() {
    const navigate = useNavigate();
    const { cart, getCartTotal, clearCart } = useStore();
    const { user, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        paymentMethod: 'card',
    });

    const total = getCartTotal();
    const shipping = 15.00;
    const tax = total * 0.1;
    const grandTotal = total + shipping + tax;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        if (cart.length === 0) {
            setError('Your cart is empty');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const orderData = {
                items: cart.map(item => ({
                    product_id: item.product.id,
                    quantity: item.quantity,
                    price: item.product.price,
                })),
                total: grandTotal,
                shipping_street: formData.street,
                shipping_city: formData.city,
                shipping_state: formData.state,
                shipping_zip_code: formData.zipCode,
                shipping_country: formData.country,
                payment_method: formData.paymentMethod,
            };

            await ordersApi.create(orderData as any);
            clearCart();
            navigate('/order-success');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container" style={{ padding: 'var(--spacing-3xl)', textAlign: 'center' }}>
                <h2>Your cart is empty</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xl)' }}>
                    Add some items to your cart to checkout
                </p>
                <button className="btn btn-primary" onClick={() => navigate('/products')}>
                    Browse Products
                </button>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: 'var(--spacing-2xl) var(--spacing-xl)' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 style={{ marginBottom: 'var(--spacing-md)' }}>Checkout</h1>
                <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2xl)' }}>
                    Complete your purchase
                </p>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            padding: 'var(--spacing-md)',
                            background: 'var(--color-error)',
                            borderRadius: 'var(--border-radius-md)',
                            marginBottom: 'var(--spacing-xl)',
                        }}
                    >
                        {error}
                    </motion.div>
                )}

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 400px',
                        gap: 'var(--spacing-2xl)',
                    }}
                    className="checkout-grid"
                >
                    {/* Checkout Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Contact Information */}
                        <div className="card" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
                            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Contact Information</h2>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="input"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    className="input"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="card" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
                            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Shipping Address</h2>

                            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                    Street Address
                                </label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.street}
                                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                    required
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                        State/Province
                                    </label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                        ZIP/Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={formData.zipCode}
                                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="card" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
                            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Payment Method</h2>

                            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                                {['card', 'paypal', 'cash'].map((method) => (
                                    <label
                                        key={method}
                                        style={{
                                            flex: 1,
                                            padding: 'var(--spacing-md)',
                                            border: `2px solid ${formData.paymentMethod === method ? 'var(--color-primary)' : 'rgba(212, 175, 55, 0.2)'}`,
                                            borderRadius: 'var(--border-radius-md)',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            transition: 'all var(--transition-fast)',
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method}
                                            checked={formData.paymentMethod === method}
                                            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                            style={{ display: 'none' }}
                                        />
                                        <div style={{ textTransform: 'capitalize', fontWeight: 600 }}>
                                            {method === 'card' ? 'Credit Card' : method}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ width: '100%', padding: '1rem', fontSize: 'var(--font-size-lg)' }}
                        >
                            {loading ? 'Processing...' : `Place Order - $${grandTotal.toFixed(2)}`}
                        </motion.button>
                    </form>

                    {/* Order Summary */}
                    <div>
                        <div className="card" style={{ padding: 'var(--spacing-xl)', position: 'sticky', top: '100px' }}>
                            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Order Summary</h2>

                            {/* Cart Items */}
                            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                {cart.map((item) => (
                                    <div
                                        key={item.product.id}
                                        style={{
                                            display: 'flex',
                                            gap: 'var(--spacing-md)',
                                            marginBottom: 'var(--spacing-md)',
                                            paddingBottom: 'var(--spacing-md)',
                                            borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                                        }}
                                    >
                                        <img
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                objectFit: 'cover',
                                                borderRadius: 'var(--border-radius-md)',
                                            }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
                                                {item.product.name}
                                            </h4>
                                            <p style={{ margin: 0, color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-xs)' }}>
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <div className="gradient-text-gold" style={{ fontWeight: 'bold' }}>
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: 'var(--spacing-lg)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                                    <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                                    <span style={{ color: 'var(--color-text-secondary)' }}>Shipping:</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-lg)' }}>
                                    <span style={{ color: 'var(--color-text-secondary)' }}>Tax:</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        paddingTop: 'var(--spacing-lg)',
                                        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                                    }}
                                >
                                    <span style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold' }}>Total:</span>
                                    <span className="gradient-text-gold" style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold' }}>
                                        ${grandTotal.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <style>{`
        @media (max-width: 1024px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
}
