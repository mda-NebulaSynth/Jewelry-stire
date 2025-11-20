import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiX } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { Product, ProductCategory, ProductMaterial, ProductFilters } from '../types';
import { useNavigate } from 'react-router-dom';

export default function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<ProductFilters>({
        category: [],
        material: [],
        priceRange: { min: 0, max: 10000 },
        onOffer: false,
        inStock: true,
        sortBy: 'popularity',
    });

    // Mock products - replace with API call
    useEffect(() => {
        const mockProducts: Product[] = Array.from({ length: 12 }, (_, i) => ({
            id: `${i + 1}`,
            name: `Jewelry Item ${i + 1}`,
            description: 'Exquisite handcrafted jewelry piece with premium materials',
            price: Math.random() * 2000 + 500,
            category: Object.values(ProductCategory)[i % 6],
            material: i % 2 === 0 ? ProductMaterial.GOLD : ProductMaterial.SILVER,
            images: [`https://images.unsplash.com/photo-${1599643478518 + i}?w=500`],
            availability: true,
            stock: Math.floor(Math.random() * 10) + 1,
            likes: Math.floor(Math.random() * 500),
            views: Math.floor(Math.random() * 2000),
            rating: 4 + Math.random(),
            reviewCount: Math.floor(Math.random() * 100),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }));

        setTimeout(() => {
            setProducts(mockProducts);
            setLoading(false);
        }, 1000);
    }, [filters]);

    const handleViewProduct = (product: Product) => {
        navigate(`/products/${product.id}`);
    };

    const toggleCategory = (category: ProductCategory) => {
        setFilters((prev) => ({
            ...prev,
            category: prev.category?.includes(category)
                ? prev.category.filter((c) => c !== category)
                : [...(prev.category || []), category],
        }));
    };

    const toggleMaterial = (material: ProductMaterial) => {
        setFilters((prev) => ({
            ...prev,
            material: prev.material?.includes(material)
                ? prev.material.filter((m) => m !== material)
                : [...(prev.material || []), material],
        }));
    };

    return (
        <div className="container" style={{ padding: 'var(--spacing-2xl) var(--spacing-xl)' }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: 'var(--spacing-2xl)' }}
            >
                <h1 style={{ marginBottom: 'var(--spacing-md)' }}>Our Collection</h1>
                <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)' }}>
                    Explore our exquisite range of gold and silver jewelry
                </p>
            </motion.div>

            {/* Filters & Products */}
            <div style={{ display: 'flex', gap: 'var(--spacing-xl)' }}>
                {/* Sidebar Filters */}
                <motion.aside
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="filters-sidebar"
                    style={{
                        width: '300px',
                        flexShrink: 0,
                    }}
                >
                    <div className="card" style={{ padding: 'var(--spacing-xl)', position: 'sticky', top: '100px' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 'var(--spacing-lg)',
                            }}
                        >
                            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FiFilter /> Filters
                            </h3>
                            <button
                                className="btn-icon mobile-filter-toggle"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <FiX />
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: 'var(--font-size-base)' }}>
                                Category
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {Object.values(ProductCategory).map((category) => (
                                    <label
                                        key={category}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            cursor: 'pointer',
                                            padding: '0.5rem',
                                            borderRadius: 'var(--border-radius-md)',
                                            transition: 'background var(--transition-fast)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'var(--color-bg-tertiary)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filters.category?.includes(category)}
                                            onChange={() => toggleCategory(category)}
                                            style={{ accentColor: 'var(--color-primary)' }}
                                        />
                                        <span style={{ textTransform: 'capitalize' }}>
                                            {category.replace('_', ' ')}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Material Filter */}
                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: 'var(--font-size-base)' }}>
                                Material
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {Object.values(ProductMaterial).map((material) => (
                                    <label
                                        key={material}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            cursor: 'pointer',
                                            padding: '0.5rem',
                                            borderRadius: 'var(--border-radius-md)',
                                            transition: 'background var(--transition-fast)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'var(--color-bg-tertiary)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filters.material?.includes(material)}
                                            onChange={() => toggleMaterial(material)}
                                            style={{ accentColor: 'var(--color-primary)' }}
                                        />
                                        <span style={{ textTransform: 'capitalize' }}>
                                            {material.replace('_', ' ')}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: 'var(--font-size-base)' }}>
                                Price Range
                            </h4>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <input
                                    type="number"
                                    placeholder="Min"
                                    className="input"
                                    value={filters.priceRange?.min}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            priceRange: { ...prev.priceRange!, min: Number(e.target.value) },
                                        }))
                                    }
                                    style={{ padding: '0.5rem' }}
                                />
                                <span>-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    className="input"
                                    value={filters.priceRange?.max}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            priceRange: { ...prev.priceRange!, max: Number(e.target.value) },
                                        }))
                                    }
                                    style={{ padding: '0.5rem' }}
                                />
                            </div>
                        </div>

                        {/* Other Filters */}
                        <div>
                            <label
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    padding: '0.5rem',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={filters.onOffer}
                                    onChange={(e) => setFilters((prev) => ({ ...prev, onOffer: e.target.checked }))}
                                    style={{ accentColor: 'var(--color-primary)' }}
                                />
                                <span>On Offer</span>
                            </label>

                            <label
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    padding: '0.5rem',
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={filters.inStock}
                                    onChange={(e) => setFilters((prev) => ({ ...prev, inStock: e.target.checked }))}
                                    style={{ accentColor: 'var(--color-primary)' }}
                                />
                                <span>In Stock</span>
                            </label>
                        </div>
                    </div>
                </motion.aside>

                {/* Products Grid */}
                <div style={{ flex: 1 }}>
                    {/* Sort & Filter Toggle */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 'var(--spacing-xl)',
                        }}
                    >
                        <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                            Showing {products.length} products
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <button
                                className="btn-icon mobile-filter-btn"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <FiFilter />
                            </button>

                            <select
                                className="input"
                                value={filters.sortBy}
                                onChange={(e) =>
                                    setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))
                                }
                                style={{ padding: '0.75rem 1rem', width: 'auto' }}
                            >
                                <option value="popularity">Most Popular</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="newest">Newest First</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: 'var(--spacing-xl)',
                            }}
                        >
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="skeleton"
                                    style={{ height: '500px', borderRadius: 'var(--border-radius-xl)' }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: 'var(--spacing-xl)',
                            }}
                        >
                            {products.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <ProductCard product={product} onView={handleViewProduct} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        .mobile-filter-toggle,
        .mobile-filter-btn {
          display: none;
        }

        @media (max-width: 1024px) {
          .filters-sidebar {
            position: fixed;
            top: 0;
            left: ${showFilters ? '0' : '-100%'};
            bottom: 0;
            z-index: 1050;
            background: var(--color-bg-secondary);
            transition: left var(--transition-base);
            width: 300px !important;
            overflow-y: auto;
          }

          .mobile-filter-toggle {
            display: flex;
          }

          .mobile-filter-btn {
            display: flex;
          }
        }

        @media (max-width: 768px) {
          .filters-sidebar {
            width: 100% !important;
          }
        }
      `}</style>
        </div>
    );
}
