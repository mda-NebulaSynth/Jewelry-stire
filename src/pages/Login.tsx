import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { login, register } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(loginData.email, loginData.password);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (registerData.password !== registerData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            await register({
                username: registerData.username,
                email: registerData.email,
                password: registerData.password,
                firstName: registerData.firstName,
                lastName: registerData.lastName,
            });
            setSuccess('Account created successfully! Redirecting...');
            // Delay navigation to show success message
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (err: any) {
            console.error('Registration Error Object:', err);
            let errorMessage = 'Registration failed. Please try again.';

            if (err.response) {
                console.error('Error Response Data:', err.response.data);
                console.error('Error Response Status:', err.response.status);

                const data = err.response.data;

                if (data) {
                    if (typeof data === 'string') {
                        errorMessage = data;
                    } else if (typeof data === 'object') {
                        if (data.message) {
                            errorMessage = data.message;
                        } else {
                            // Flatten all values in the object to find error strings
                            const messages = Object.values(data).flat();
                            if (messages.length > 0) {
                                errorMessage = messages.join(' ');
                            }
                        }
                    }
                }
            } else if (err.message) {
                errorMessage = err.message;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--spacing-xl)',
                background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
                style={{
                    width: '100%',
                    maxWidth: '500px',
                    padding: 'var(--spacing-2xl)',
                }}
            >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
                    <h1 className="gradient-text-gold" style={{ marginBottom: 'var(--spacing-sm)' }}>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        {isLogin ? 'Login to your NebulaJewel account' : 'Join NebulaJewel today'}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            padding: 'var(--spacing-md)',
                            background: 'var(--color-error)',
                            borderRadius: 'var(--border-radius-md)',
                            marginBottom: 'var(--spacing-lg)',
                            textAlign: 'center',
                        }}
                    >
                        {error}
                    </motion.div>
                )}

                {/* Success Message */}
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            padding: 'var(--spacing-md)',
                            background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                            borderRadius: 'var(--border-radius-md)',
                            marginBottom: 'var(--spacing-lg)',
                            textAlign: 'center',
                            color: 'white',
                            fontWeight: 500,
                        }}
                    >
                        {success}
                    </motion.div>
                )}

                {/* Login Form */}
                {isLogin ? (
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                Email
                            </label>
                            <div style={{ position: 'relative' }}>
                                <FiMail
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--color-text-tertiary)',
                                    }}
                                />
                                <input
                                    type="email"
                                    className="input"
                                    placeholder="your@email.com"
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    required
                                    style={{ paddingLeft: '3rem' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <FiLock
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--color-text-tertiary)',
                                    }}
                                />
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="••••••••"
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    required
                                    style={{ paddingLeft: '3rem' }}
                                />
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ width: '100%', marginBottom: 'var(--spacing-lg)' }}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </motion.button>
                    </form>
                ) : (
                    /* Register Form */
                    <form onSubmit={handleRegister}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="John"
                                    value={registerData.firstName}
                                    onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
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
                                    placeholder="Doe"
                                    value={registerData.lastName}
                                    onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                Username
                            </label>
                            <div style={{ position: 'relative' }}>
                                <FiUser
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
                                    className="input"
                                    placeholder="johndoe"
                                    value={registerData.username}
                                    onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                                    required
                                    style={{ paddingLeft: '3rem' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                Email
                            </label>
                            <div style={{ position: 'relative' }}>
                                <FiMail
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--color-text-tertiary)',
                                    }}
                                />
                                <input
                                    type="email"
                                    className="input"
                                    placeholder="your@email.com"
                                    value={registerData.email}
                                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                    required
                                    style={{ paddingLeft: '3rem' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <FiLock
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--color-text-tertiary)',
                                    }}
                                />
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="••••••••"
                                    value={registerData.password}
                                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                    required
                                    minLength={8}
                                    style={{ paddingLeft: '3rem' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                Confirm Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <FiLock
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--color-text-tertiary)',
                                    }}
                                />
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="••••••••"
                                    value={registerData.confirmPassword}
                                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                                    required
                                    style={{ paddingLeft: '3rem' }}
                                />
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ width: '100%', marginBottom: 'var(--spacing-lg)' }}
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </motion.button>
                    </form>
                )}

                {/* Toggle Login/Register */}
                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                                setSuccess('');
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-primary)',
                                cursor: 'pointer',
                                fontWeight: 600,
                                textDecoration: 'underline',
                            }}
                        >
                            {isLogin ? 'Sign up' : 'Login'}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
