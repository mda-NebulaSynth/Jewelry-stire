import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiArrowLeft, FiUpload, FiX } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { productsApi } from '../services/api';
import { Product, ProductCategory, ProductMaterial } from '../types';

export default function ProductForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: ProductCategory.RINGS,
        material: 'gold' as ProductMaterial,
        stock: '',
        images: [] as string[],
        availability: true,
    });

    useEffect(() => {
        if (isEditMode) {
            loadProduct();
        }
    }, [id]);

    const loadProduct = async () => {
        try {
            setLoading(true);
            const product = await productsApi.getById(id!);
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price.toString(),
                category: product.category,
                material: product.material,
                stock: product.stock.toString(),
                images: product.images,
                availability: product.availability,
            });
        } catch (err) {
            setError('Failed to load product details');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const price = parseFloat(formData.price);
            const stock = parseInt(formData.stock, 10);

            if (isNaN(price) || price < 0) {
                setError('Please enter a valid price');
                setLoading(false);
                return;
            }

            if (isNaN(stock) || stock < 0) {
                setError('Please enter a valid stock quantity');
                setLoading(false);
                return;
            }

            const productData = {
                ...formData,
                price,
                stock,
            };

            if (isEditMode) {
                await productsApi.update(id!, productData);
            } else {
                await productsApi.create(productData);
            }
            navigate('/admin/products');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    const handleImageAdd = () => {
        const url = prompt('Enter image URL:');
        if (url) {
            setFormData({ ...formData, images: [...formData.images, url] });
        }
    };

    const handleImageRemove = (index: number) => {
        setFormData({
            ...formData,
            images: formData.images.filter((_, i) => i !== index),
        });
    };

    return (
        <div className="container" style={{ padding: 'var(--spacing-2xl) var(--spacing-xl)' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ maxWidth: '800px', margin: '0 auto' }}
            >
                <button
                    onClick={() => navigate('/admin/products')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: 'var(--spacing-lg)',
                        cursor: 'pointer',
                    }}
                >
                    <FiArrowLeft /> Back to Products
                </button>

                <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>
                    {isEditMode ? 'Edit Product' : 'Add New Product'}
                </h1>

                {error && (
                    <div
                        style={{
                            padding: 'var(--spacing-md)',
                            background: 'var(--color-error)',
                            borderRadius: 'var(--border-radius-md)',
                            marginBottom: 'var(--spacing-lg)',
                        }}
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="card" style={{ padding: 'var(--spacing-xl)' }}>
                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                            Product Name
                        </label>
                        <input
                            type="text"
                            className="input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                            Description
                        </label>
                        <textarea
                            className="input"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            required
                            style={{ resize: 'vertical' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                Price ($)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                className="input"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                Stock Quantity
                            </label>
                            <input
                                type="number"
                                className="input"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                Category
                            </label>
                            <select
                                className="input"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                            >
                                {Object.values(ProductCategory).map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                Material
                            </label>
                            <select
                                className="input"
                                value={formData.material}
                                onChange={(e) => setFormData({ ...formData, material: e.target.value as ProductMaterial })}
                            >
                                {Object.values(ProductMaterial).map((mat) => (
                                    <option key={mat} value={mat}>
                                        {mat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Image Management */}
                    <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                            Product Images
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                            {formData.images.map((url, index) => (
                                <div key={index} style={{ position: 'relative', aspectRatio: '1' }}>
                                    <img
                                        src={url}
                                        alt={`Product ${index + 1}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--border-radius-md)' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleImageRemove(index)}
                                        style={{
                                            position: 'absolute',
                                            top: '-5px',
                                            right: '-5px',
                                            background: 'var(--color-error)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '20px',
                                            height: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <FiX size={12} />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleImageAdd}
                                style={{
                                    aspectRatio: '1',
                                    border: '2px dashed var(--color-text-tertiary)',
                                    background: 'transparent',
                                    color: 'var(--color-text-secondary)',
                                    borderRadius: 'var(--border-radius-md)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                }}
                            >
                                <FiUpload size={24} />
                                <span>Add URL</span>
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => navigate('/admin/products')}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
