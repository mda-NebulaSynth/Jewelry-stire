import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

import ProtectedRoute from './components/ProtectedRoute';
import { UserRole } from './types';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Offers = lazy(() => import('./pages/Offers'));
const About = lazy(() => import('./pages/About'));
const AdminProductList = lazy(() => import('./pages/AdminProductList'));
const ProductForm = lazy(() => import('./pages/ProductForm'));

// Loading component
function PageLoader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
      }}
    >
      <div className="spinner" />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <CartSidebar />

          <main style={{ flex: 1 }}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/about" element={<About />} />

                {/* Protected Customer Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/wishlist" element={<div className="container" style={{ padding: '3rem' }}><h1>Wishlist - Coming Soon</h1></div>} />
                  <Route path="/profile" element={<div className="container" style={{ padding: '3rem' }}><h1>Profile - Coming Soon</h1></div>} />
                </Route>

                {/* Admin Routes */}
                <Route element={<ProtectedRoute roles={[UserRole.ADMIN, UserRole.MANAGER]} />}>
                  <Route path="/admin/products" element={<AdminProductList />} />
                  <Route path="/admin/products/new" element={<ProductForm />} />
                  <Route path="/admin/products/edit/:id" element={<ProductForm />} />
                </Route>

                <Route path="/collections" element={<div className="container" style={{ padding: '3rem' }}><h1>Collections - Coming Soon</h1></div>} />
                <Route path="*" element={<div className="container" style={{ padding: '3rem', textAlign: 'center' }}><h1>404 - Page Not Found</h1></div>} />
              </Routes>
            </Suspense>
          </main>

          {/* Footer */}
          <footer
            style={{
              background: 'var(--color-bg-secondary)',
              borderTop: '1px solid rgba(212, 175, 55, 0.2)',
              padding: 'var(--spacing-2xl) 0',
              marginTop: 'var(--spacing-3xl)',
            }}
          >
            <div className="container">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: 'var(--spacing-2xl)',
                  marginBottom: 'var(--spacing-xl)',
                }}
              >
                {/* About */}
                <div>
                  <h3 className="gradient-text-gold" style={{ marginBottom: 'var(--spacing-md)' }}>
                    LuxeJewels
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Premium gold and silver jewelry crafted with passion and precision.
                    Timeless elegance for every occasion.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Quick Links</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {['About Us', 'Contact', 'Shipping', 'Returns', 'Privacy Policy'].map((link) => (
                      <li key={link} style={{ marginBottom: 'var(--spacing-sm)' }}>
                        <a
                          href="#"
                          style={{
                            color: 'var(--color-text-secondary)',
                            transition: 'color var(--transition-fast)',
                          }}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Categories */}
                <div>
                  <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Categories</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Cutlery'].map((category) => (
                      <li key={category} style={{ marginBottom: 'var(--spacing-sm)' }}>
                        <a
                          href="#"
                          style={{
                            color: 'var(--color-text-secondary)',
                            transition: 'color var(--transition-fast)',
                          }}
                        >
                          {category}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Contact Us</h4>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                    Email: info@luxejewels.com
                  </p>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                    Phone: +1 (555) 123-4567
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                    {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="btn-icon"
                        style={{ width: '40px', height: '40px' }}
                      >
                        {social[0]}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                  paddingTop: 'var(--spacing-lg)',
                  textAlign: 'center',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                <p style={{ margin: 0 }}>
                  © {new Date().getFullYear()} LuxeJewels. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

