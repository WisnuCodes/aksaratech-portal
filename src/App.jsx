import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import HomePage from './pages/HomePage';
import PackagesPage from './pages/PackagesPage';
import ServerExclusionPage from './pages/ServerExclusionPage';
import WorkflowPage from './pages/WorkflowPage';
import OrderBriefPage from './pages/OrderBriefPage';
import FAQPage from './pages/FAQPage';
import TermsPrivacyPage from './pages/TermsPrivacyPage';
import ErrorPage from './pages/ErrorPage';
import ErrorBoundary from './components/common/ErrorBoundary';
import { SYSTEM_CONFIG } from './constants/systemConfig';
import './App.css';

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
    return <ErrorPage defaultCode={503} />;
  }

  // 2. Define valid non-error portal routes
  const validMainRoutes = [
    '/',
    '/paket',
    '/eksklusi-server',
    '/alur-sop',
    '/pesan',
    '/faq',
    '/ketentuan'
  ];

  // If path is not a valid main route, or explicitly an error route, render standalone error view without navbar & footer
  const isErrorPage = 
    !validMainRoutes.includes(location.pathname) || 
    location.pathname.startsWith('/error') || 
    location.pathname === '/404' || 
    location.pathname === '/500' || 
    location.pathname === '/503';

  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Full-width sticky Navbar - only rendered for standard portal pages */}
      {!isErrorPage && <Navbar />}

      {/* Multi-page Dynamic Body */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<HomePage onSelectPackage={handleSelectPackage} />} />
          <Route path="/paket" element={<PackagesPage onSelectPackage={handleSelectPackage} />} />
          <Route path="/eksklusi-server" element={<ServerExclusionPage />} />
          <Route path="/alur-sop" element={<WorkflowPage />} />
          <Route path="/pesan" element={<OrderBriefPage preselectedPackageId={selectedPackageId} />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/ketentuan" element={<TermsPrivacyPage />} />
          <Route path="/error" element={<ErrorPage defaultCode={404} />} />
          <Route path="/error/:code" element={<ErrorPage />} />
          <Route path="/404" element={<ErrorPage defaultCode={404} />} />
          <Route path="/500" element={<ErrorPage defaultCode={500} />} />
          <Route path="/503" element={<ErrorPage defaultCode={503} />} />
          <Route path="*" element={<ErrorPage defaultCode={404} />} />
        </Routes>
      </main>

      {/* Corporate Footer - only rendered for standard portal pages */}
      {!isErrorPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
