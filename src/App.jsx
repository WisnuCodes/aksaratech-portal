import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import './App.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [selectedPackageId, setSelectedPackageId] = useState('umkm-katalog');

  const handleSelectPackage = (packageId) => {
    setSelectedPackageId(packageId);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Full-width sticky Navbar */}
        <Navbar />

        {/* Multi-page Dynamic Body */}
        <main style={{ flex: 1 }}>
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

        {/* Corporate Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
