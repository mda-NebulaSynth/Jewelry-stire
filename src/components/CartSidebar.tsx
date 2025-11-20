import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';

export default function CartSidebar() {
    const {
        isCartOpen,
        toggleCart,
        cart,
        removeFromCart,
        updateCartItemQuantity,
        getCartTotal,
    } = useStore();

    const navigate = useNavigate();
    const total = getCartTotal();

    const handleCheckout = () => {
        toggleCart();
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.7)',
                            zIndex: 1040,
                            backdropFilter: 'blur(4px)',
                        }}
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            maxWidth: '500px',
                            background: 'var(--color-bg-secondary)',
                            zIndex: 1050,
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: 'var(--shadow-2xl)',
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                padding: 'var(--spacing-xl)',
                                borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <h2
                                className="gradient-text-gold"
                                style={{ margin: 0, fontSize: 'var(--font-size-2xl)' }}
                            >
                                Shopping Cart
                            </h2>
                            <motion.button
                                className="btn-icon"
                                onClick={toggleCart}
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FiX size={24} />
                            </motion.button>
                        </div>

                        {/* Cart Items */}
                        <div
                            style={{
                                flex: 1,
                                overflowY: 'auto',
                                padding: 'var(--spacing-xl)',
                            }}
                        >
                            {cart.length === 0 ? (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                        gap: '1rem',
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: '4rem',
                                            opacity: 0.3,
                                        }}
                                    >
                                        🛒
                                    </div>
                                    <h3 style={{ color: 'var(--color-text-secondary)' }}>
                                        Your cart is empty
                                    </h3>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            toggleCart();
                                            navigate('/products');
                                        }}
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.product.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            style={{
                                                display: 'flex',
                                                gap: '1rem',
                                                padding: '1rem',
                                                background: 'var(--color-bg-tertiary)',
                                                borderRadius: 'var(--border-radius-lg)',
                                                border: '1px solid rgba(212, 175, 55, 0.2)',
                                            }}
                                        >
                                            {/* Product Image */}
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                style={{
                                                    width: '80px',
                                                    height: '80px',
                                                    objectFit: 'cover',
                                                    borderRadius: 'var(--border-radius-md)',
                                                }}
                                            />

                                            {/* Product Info */}
                                            <div style={{ flex: 1 }}>
                                                <h4
                                                    style={{
                                                        margin: 0,
                                                        fontSize: 'var(--font-size-base)',
                                                        marginBottom: '0.25rem',
                                                    }}
                                                >
                                                    {item.product.name}
                                                </h4>
                                                <p
                                                    style={{
                                                        margin: 0,
                                                        fontSize: 'var(--font-size-sm)',
                                                        color: 'var(--color-text-tertiary)',
                                                        marginBottom: '0.5rem',
                                                    }}
                                                >
                                                    {item.product.material.replace('_', ' ').toUpperCase()}
                                                </p>
                                                <div
                                                    className="gradient-text-gold"
                                                    style={{
                                                        fontSize: 'var(--font-size-lg)',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    ${item.product.price.toFixed(2)}
                                                </div>

                                                {/* Quantity Controls */}
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        marginTop: '0.5rem',
                                                    }}
                                                >
                                                    <motion.button
                                                        className="btn-icon"
                                                        onClick={() =>
                                                            updateCartItemQuantity(
                                                                item.product.id,
                                                                item.quantity - 1
                                                            )
                                                        }
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        style={{ width: '32px', height: '32px' }}
                                                    >
                                                        <FiMinus size={16} />
                                                    </motion.button>

                                                    <span
                                                        style={{
                                                            minWidth: '40px',
                                                            textAlign: 'center',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {item.quantity}
                                                    </span>

                                                    <motion.button
                                                        className="btn-icon"
                                                        onClick={() =>
                                                            updateCartItemQuantity(
                                                                item.product.id,
                                                                item.quantity + 1
                                                            )
                                                        }
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        style={{ width: '32px', height: '32px' }}
                                                    >
                                                        <FiPlus size={16} />
                                                    </motion.button>

                                                    <motion.button
                                                        className="btn-icon"
                                                        onClick={() => removeFromCart(item.product.id)}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        style={{
                                                            width: '32px',
                                                            height: '32px',
                                                            marginLeft: 'auto',
                                                            background: 'var(--color-error)',
                                                        }}
                                                    >
                                                        <FiTrash2 size={16} />
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div
                                style={{
                                    padding: 'var(--spacing-xl)',
                                    borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                                    background: 'var(--color-bg-primary)',
                                }}
                            >
                                {/* Subtotal */}
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '1rem',
                                        fontSize: 'var(--font-size-lg)',
                                    }}
                                >
                                    <span style={{ color: 'var(--color-text-secondary)' }}>
                                        Subtotal:
                                    </span>
                                    <span
                                        className="gradient-text-gold"
                                        style={{ fontWeight: 'bold', fontSize: 'var(--font-size-2xl)' }}
                                    >
                                        ${total.toFixed(2)}
                                    </span>
                                </div>

                                {/* Checkout Button */}
                                <motion.button
                                    className="btn btn-primary"
                                    onClick={handleCheckout}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{ width: '100%', padding: '1rem' }}
                                >
                                    Proceed to Checkout
                                </motion.button>

                                <p
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 'var(--font-size-sm)',
                                        color: 'var(--color-text-tertiary)',
                                        marginTop: '1rem',
                                        marginBottom: 0,
                                    }}
                                >
                                    Shipping & taxes calculated at checkout
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
