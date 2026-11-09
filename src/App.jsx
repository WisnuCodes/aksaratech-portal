import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import HomePage from './pages/HomePage';
import ErrorBoundary from './components/common/ErrorBoundary';
import { SYSTEM_CONFIG } from './constants/systemConfig';
import './App.css';

// Code-split all subpages so initial homepage bundle remains ultra-lean
const PackagesPage = lazy(() => import('./pages/PackagesPage'));
const ServerExclusionPage = lazy(() => import('./pages/ServerExclusionPage'));
const WorkflowPage = lazy(() => import('./pages/WorkflowPage'));
const OrderBriefPage = lazy(() => import('./pages/OrderBriefPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const TermsPrivacyPage = lazy(() => import('./pages/TermsPrivacyPage'));
const OrderTrackerPage = lazy(() => import('./pages/OrderTrackerPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));

// Lightweight page loading fallback
function PageFallback() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F8FAFC'
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        background: '#FFFFFF',
        border: '2px solid #0F172A',
        
        borderRadius: '8px',
        padding: '10px 18px',
        fontWeight: '800',
        fontSize: '0.88rem',
        color: '#0F172A'
      }}>
        <span style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          border: '2px solid #1D63FF',
          borderTopColor: 'transparent',
          animation: 'spin 0.6s linear infinite'
        }} />
        <span>Memuat Halaman Aksara Tech...</span>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const [selectedPackageId, setSelectedPackageId] = useState('umkm-katalog');
  const location = useLocation();

  const handleSelectPackage = (packageId) => {
    setSelectedPackageId(packageId);
  };

  // 1. Real-time Maintenance Mode check (HTTP 503)
  if (SYSTEM_CONFIG.MAINTENANCE_MODE) {
    return (
      <Suspense fallback={<PageFallback />}>
        <ErrorPage defaultCode={503} />
      </Suspense>
    );
  }

  // 2. Define valid non-error portal routes
  const validMainRoutes = [
    '/',
    '/paket',
    '/eksklusi-server',
    '/alur-sop',
    '/pesan',
    '/lacak',
    '/faq',
    '/ketentuan',
    '/admin'
  ];

  // If path is not a valid main route, or explicitly an error route, render standalone error view without navbar & footer
  const isErrorPage = 
    !validMainRoutes.includes(location.pathname) || 
    location.pathname.startsWith('/error') || 
    location.pathname === '/404' || 
    location.pathname === '/500' || 
    location.pathname === '/503';

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Full-width sticky Navbar - only rendered for standard portal pages */}
      {!isErrorPage && !isAdminPage && <Navbar />}

      {/* Multi-page Dynamic Body with Suspense code splitting */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage onSelectPackage={handleSelectPackage} />} />
            <Route path="/paket" element={<PackagesPage onSelectPackage={handleSelectPackage} />} />
            <Route path="/eksklusi-server" element={<ServerExclusionPage />} />
            <Route path="/alur-sop" element={<WorkflowPage />} />
            <Route path="/pesan" element={<OrderBriefPage preselectedPackageId={selectedPackageId} />} />
            <Route path="/lacak" element={<OrderTrackerPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/ketentuan" element={<TermsPrivacyPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/error" element={<ErrorPage defaultCode={404} />} />
            <Route path="/error/:code" element={<ErrorPage />} />
            <Route path="/404" element={<ErrorPage defaultCode={404} />} />
            <Route path="/500" element={<ErrorPage defaultCode={500} />} />
            <Route path="/503" element={<ErrorPage defaultCode={503} />} />
            <Route path="*" element={<ErrorPage defaultCode={404} />} />
          </Routes>
        </Suspense>
      </main>

      {/* Corporate Footer - only rendered for standard portal pages */}
      {!isErrorPage && !isAdminPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <AppContent />
      </ErrorBoundary>
    </BrowserRouter>
  );
}
