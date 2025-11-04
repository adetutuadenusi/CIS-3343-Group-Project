import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PublicLayout } from './components/PublicLayout';
import { AdminLayout } from './components/AdminLayout';
import { ToastProvider } from './components/ToastContext';
import { InquiriesProvider } from './contexts/InquiriesContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Loader2 } from 'lucide-react';

// Lazy load all pages for code splitting
const PublicHome = lazy(() => import('./pages/public/Home').then(m => ({ default: m.PublicHome })));
const Shop = lazy(() => import('./pages/public/Shop').then(m => ({ default: m.Shop })));
const Builder = lazy(() => import('./pages/public/Builder').then(m => ({ default: m.Builder })));
const OrderReview = lazy(() => import('./pages/public/OrderReview').then(m => ({ default: m.OrderReview })));
const Gallery = lazy(() => import('./pages/public/Gallery').then(m => ({ default: m.Gallery })));
const About = lazy(() => import('./pages/public/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/public/Contact').then(m => ({ default: m.Contact })));
const Login = lazy(() => import('./pages/admin/Login').then(m => ({ default: m.Login })));

// Lazy load admin pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard').then(m => ({ default: m.AdminDashboard })));
const OrderBoard = lazy(() => import('./pages/admin/OrderBoard').then(m => ({ default: m.OrderBoard })));
const OrderList = lazy(() => import('./pages/admin/OrderList').then(m => ({ default: m.OrderList })));
const OrderCreate = lazy(() => import('./pages/admin/OrderCreate').then(m => ({ default: m.OrderCreate })));
const AdminProducts = lazy(() => import('./pages/admin/Products').then(m => ({ default: m.AdminProducts })));
const Inquiries = lazy(() => import('./pages/admin/Inquiries').then(m => ({ default: m.Inquiries })));
const Orders = lazy(() => import('./pages/Orders').then(m => ({ default: m.Orders })));
const Customers = lazy(() => import('./pages/Customers').then(m => ({ default: m.Customers })));
const Products = lazy(() => import('./pages/Products').then(m => ({ default: m.Products })));
const Reports = lazy(() => import('./pages/Reports').then(m => ({ default: m.Reports })));
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));

// Loading fallback component
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '60vh',
    flexDirection: 'column',
    gap: '16px'
  }}>
    <Loader2 size={40} className="animate-spin" style={{ color: '#C44569' }} />
    <p style={{ fontFamily: 'Poppins', fontSize: '15px', color: '#5A3825', opacity: 0.7 }}>
      Loading...
    </p>
  </div>
);

type AppMode = 'public' | 'login' | 'admin';

export default function App() {
  // Disable welcome screen entirely to fix freezing issues
  const [showWelcome] = useState(false);
  const [appMode, setAppMode] = useState<AppMode>('public');
  const [activePage, setActivePage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('🌐 Emily Bakes Cakes - Loaded');
  }, []);

  // Scroll to top instantly on page change (Y:0 reset)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activePage, appMode]);

  // Handle navigation for public pages
  const handlePublicNavigate = (page: string) => {
    setActivePage(page);
  };

  // Handle admin access
  const handleAdminAccess = () => {
    setAppMode('login');
  };

  // Handle login
  const handleLogin = () => {
    setIsAuthenticated(true);
    setAppMode('admin');
    setActivePage('analytics-dashboard');
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAppMode('public');
    setActivePage('home');
  };

  // Handle back to public from login
  const handleBackToPublic = () => {
    setAppMode('public');
    setActivePage('home');
  };

  // Render public pages
  const renderPublicPage = () => {
    switch (activePage) {
      case 'home':
        return <PublicHome onNavigate={handlePublicNavigate} />;
      case 'shop':
        return <Shop onNavigate={handlePublicNavigate} />;
      case 'builder':
        return <Builder onNavigate={handlePublicNavigate} />;
      case 'order-review':
        return <OrderReview onNavigate={handlePublicNavigate} onBack={() => setActivePage('builder')} />;
      case 'gallery':
        return <Gallery />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <PublicHome onNavigate={handlePublicNavigate} />;
    }
  };

  // Render admin pages - Professional OMS naming
  const renderAdminPage = () => {
    switch (activePage) {
      // Modern OMS Pages
      case 'analytics-dashboard':
        return <AdminDashboard />;
      case 'fulfillment-board':
        return <OrderBoard />;
      case 'order-management':
        return <OrderList onNavigate={setActivePage} />;
      case 'order-create':
        return <OrderCreate onBack={() => setActivePage('order-management')} />;
      case 'inquiry-management':
        return <Inquiries />;
      case 'inventory-management':
        return <AdminProducts />;
      case 'customer-accounts':
        return <Customers />;
      case 'business-intelligence':
        return <Reports />;
      case 'system-configuration':
        return <Settings />;
      
      // Legacy routes (backward compatibility)
      case 'dashboard':
      case 'analytics':
        return <AdminDashboard />;
      case 'order-board':
        return <OrderBoard />;
      case 'order-list':
        return <OrderList onNavigate={setActivePage} />;
      case 'inquiries':
        return <Inquiries />;
      case 'products-new':
        return <AdminProducts />;
      case 'customers':
        return <Customers />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      
      // Deprecated legacy pages
      case 'orders':
        return <Orders />;
      case 'products':
        return <Products />;
      
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <ErrorBoundary>
      <InquiriesProvider>
        <ToastProvider>
        <AnimatePresence>
          {showWelcome ? (
            <WelcomeScreen key="welcome" />
          ) : (
          <motion.div
            key={appMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{ minHeight: '100vh' }}
          >
            {appMode === 'public' && (
              <Suspense fallback={<PageLoader />}>
                <PublicLayout 
                  activePage={activePage} 
                  onNavigate={handlePublicNavigate}
                  onAdminAccess={handleAdminAccess}
                >
                  <motion.div
                    key={activePage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                  >
                    {renderPublicPage()}
                  </motion.div>
                </PublicLayout>
              </Suspense>
            )}

            {appMode === 'login' && (
              <Suspense fallback={<PageLoader />}>
                <Login 
                  onLogin={handleLogin}
                  onBackToPublic={handleBackToPublic}
                />
              </Suspense>
            )}

            {appMode === 'admin' && isAuthenticated && (
              <Suspense fallback={<PageLoader />}>
                <AdminLayout
                  activePage={activePage}
                  onNavigate={setActivePage}
                  onLogout={handleLogout}
                >
                  <div className="light-theme">
                    <motion.div
                      key={activePage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                    >
                      {renderAdminPage()}
                    </motion.div>
                  </div>
                </AdminLayout>
              </Suspense>
            )}
          </motion.div>
        )}
        </AnimatePresence>
        </ToastProvider>
      </InquiriesProvider>
    </ErrorBoundary>
  );
}
