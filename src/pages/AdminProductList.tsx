import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { productsApi } from '../services/api';
import { Product } from '../types';

export default function AdminProductList() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await productsApi.getAll();
            setProducts(response.results);
        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await productsApi.delete(id);
                setProducts(products.filter(p => p.id !== id));
            } catch (error) {
                console.error('Failed to delete product:', error);
            }
        }
    };

    return (
        <div className="container" style={{ padding: 'var(--spacing-2xl) var(--spacing-xl)' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                    <h1 style={{ margin: 0 }}>Product Management</h1>
                    <motion.button
                        className="btn btn-primary"
                        onClick={() => navigate('/admin/products/new')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FiPlus style={{ marginRight: '0.5rem' }} />
                        Add New Product
                    </motion.button>
                </div>

                {loading ? (
                    <div className="skeleton" style={{ height: '400px', width: '100%' }} />
                ) : (
                    <div className="card" style={{ overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Product</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Category</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Price</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Stock</th>
                                    <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <img
                                                src={product.images?.[0] || 'https://via.placeholder.com/40'}
                                                alt={product.name}
                                                style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                            />
                                            <span style={{ fontWeight: 500 }}>{product.name}</span>
                                        </td>
                                        <td style={{ padding: '1rem', textTransform: 'capitalize' }}>
                                            {product.category.toLowerCase()}
                                        </td>
                                        <td style={{ padding: '1rem' }}>${Number(product.price).toFixed(2)}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '1rem',
                                                    fontSize: '0.875rem',
                                                    background: product.stock > 0 ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                                                    color: product.stock > 0 ? '#4caf50' : '#f44336',
                                                }}
                                            >
                                                {product.stock} in stock
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                <button
                                                    className="btn-icon"
                                                    onClick={() => navigate(`/products/${product.id}`)}
                                                    title="View"
                                                >
                                                    <FiEye />
                                                </button>
                                                <button
                                                    className="btn-icon"
                                                    onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                                    title="Edit"
                                                >
                                                    <FiEdit2 />
                                                </button>
                                                <button
                                                    className="btn-icon"
                                                    onClick={() => handleDelete(product.id)}
                                                    style={{ color: 'var(--color-error)' }}
                                                    title="Delete"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
