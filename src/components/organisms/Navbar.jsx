import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Shield, MessageCircle, FileText, Menu, X, ArrowRight, 
  ChevronRight, Package, Clock, HelpCircle, PhoneCall 
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/catalogData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll listener for sticky navbar elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on resize past desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const mobileNavItems = [
    { 
      to: '/paket', 
      label: 'Katalog Paket & Harga', 
      desc: '5 paket standar mulai Rp 150rb – Rp 650rb',
      icon: <Package size={18} /> 
    },
    { 
      to: '/eksklusi-server', 
      label: 'Batasan Eksklusi Server', 
      desc: 'Software engineering murni & kepemilikan kode',
      icon: <Shield size={18} style={{ color: '#D97706' }} /> 
    },
    { 
      to: '/alur-sop', 
      label: 'Alur Kerja SOP (4 Tahap)', 
      desc: 'Pengerjaan terstruktur & kuota 3x revisi mutlak',
      icon: <Clock size={18} style={{ color: '#059669' }} /> 
    },
    { 
      to: '/faq', 
      label: 'FAQ & Tanya Jawab', 
      desc: 'Jawaban teknis, DP 50%, & serah terima',
      icon: <HelpCircle size={18} /> 
    },
    { 
      to: '/ketentuan', 
      label: 'Ketentuan Layanan & Privasi', 
      desc: 'Perjanjian legal & proteksi kerahasiaan brief',
      icon: <FileText size={18} /> 
    },
  ];

  return (
    <header className={`nav-container ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-bar-inner">
        
        {/* Brand Logo */}
        <Link to="/" className="brand-link" aria-label="Aksara Tech Beranda">
          <div className="brand-icon-box">
            <img 
              src="/brand-icon.png" 
              alt="Aksara Tech Logo" 
              className="brand-logo-mark"
              width="60"
              height="34"
            />
          </div>
          <div className="brand-info">
            <div className="brand-title-wrap">
              <span className="brand-title-aksara">AKSARA</span>
              <span className="brand-title-tech">TECH</span>
            </div>
            <div className="brand-subtitle">
              Enterprise Digital Solutions
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links (Hidden on Mobile) */}
        <nav className="desktop-nav">
          <NavLink 
            to="/paket" 
            className={({ isActive }) => `desktop-nav-link ${isActive ? 'is-active' : ''}`}
          >
            Paket &amp; Harga
          </NavLink>
          <NavLink 
            to="/eksklusi-server" 
            className={({ isActive }) => `desktop-nav-link ${isActive ? 'is-active' : ''}`}
          >
            <Shield size={14} className="nav-link-icon shield-icon" />
            <span>Eksklusi Server</span>
          </NavLink>
          <NavLink 
            to="/alur-sop" 
            className={({ isActive }) => `desktop-nav-link ${isActive ? 'is-active' : ''}`}
          >
            Alur SOP
          </NavLink>
          <NavLink 
            to="/faq" 
            className={({ isActive }) => `desktop-nav-link ${isActive ? 'is-active' : ''}`}
          >
            FAQ
          </NavLink>
          <NavLink 
            to="/ketentuan" 
            className={({ isActive }) => `desktop-nav-link ${isActive ? 'is-active' : ''}`}
          >
            <FileText size={14} className="nav-link-icon doc-icon" />
            <span>Ketentuan &amp; Privasi</span>
          </NavLink>
        </nav>

        {/* Desktop & Mobile Action Buttons */}
        <div className="nav-actions">
          {/* Desktop WhatsApp Button */}
          <a 
            href={`https://wa.me/${BUSINESS_INFO.waNumber}?text=Halo%20Aksara%20Tech,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20rekayasa%20website.`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-wa btn-sm wa-btn-desktop"
            title="Hubungi WhatsApp Korporat Resmi"
          >
            <MessageCircle size={16} />
            <span className="wa-btn-text">WA Korporat</span>
            <span className="wa-pulse-dot" />
          </a>

          {/* Desktop Order Button */}
          <Link to="/pesan" className="btn btn-primary btn-sm" id="order-btn-desktop">
            <span>Pesan Proyek</span>
            <ArrowRight size={15} />
          </Link>

          {/* Mobile WA Quick Button */}
          <a
            href={`https://wa.me/${BUSINESS_INFO.waNumber}?text=Halo%20Aksara%20Tech,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20rekayasa%20website.`}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-header-btn mobile-wa-btn"
            aria-label="Konsultasi WhatsApp"
            title="Chat WhatsApp"
          >
            <MessageCircle size={18} strokeWidth={2.2} style={{ color: '#059669' }} />
            <span className="mobile-wa-indicator" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`mobile-header-btn mobile-toggle-btn ${mobileMenuOpen ? 'active' : ''}`}
            aria-label={mobileMenuOpen ? 'Tutup Navigasi' : 'Buka Navigasi'}
          >
            {mobileMenuOpen ? <X size={19} strokeWidth={2.5} /> : <Menu size={19} strokeWidth={2.5} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Dropdown */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          
          <div className="mobile-drawer-header">
            <span className="mobile-drawer-label">MENU NAVIGASI</span>
            <span className="mobile-drawer-sub">Aksara Tech Platform</span>
          </div>

          <div className="mobile-menu-list">
            {mobileNavItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`mobile-menu-row ${isActive ? 'is-active' : ''}`}
                >
                  <div className="mobile-row-icon">
                    {item.icon}
                  </div>
                  <div className="mobile-row-text">
                    <div className="mobile-row-title">{item.label}</div>
                    <div className="mobile-row-desc">{item.desc}</div>
                  </div>
                  <ChevronRight size={16} className="mobile-row-chevron" />
                </Link>
              );
            })}
          </div>

          <div className="mobile-drawer-action">
            <Link 
              to="/pesan" 
              className="btn btn-primary mobile-order-cta"
            >
              <span>Isi Brief &amp; Formulir Proyek</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <a
            href={`https://wa.me/${BUSINESS_INFO.waNumber}?text=Halo%20Aksara%20Tech,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20rekayasa%20website.`}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-wa-hotline-card"
          >
            <div className="hotline-icon-wrap">
              <PhoneCall size={16} style={{ color: '#059669' }} />
            </div>
            <div className="hotline-body">
              <div className="hotline-title">
                <span className="hotline-pulse" />
                <span>Konsultasi WhatsApp Aktif</span>
              </div>
              <div className="hotline-meta">
                085600386692 &bull; Plafon Max Rp 650.000
              </div>
            </div>
            <div className="hotline-arrow">
              <ChevronRight size={16} />
            </div>
          </a>

        </div>
      </div>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Embedded CSS with Strict Desktop vs Mobile Separation */}
      <style>{`
        /* =======================================================
           COMMON HEADER BASE
           ======================================================= */
        .nav-container {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: #FFFFFF;
          border-bottom: 2px solid #0F172A;
          width: 100%;
          transition: background-color 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .nav-container.is-scrolled {
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.08);
        }

        .nav-bar-inner {
          transition: height 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .brand-link {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
          text-decoration: none;
        }

        .brand-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .brand-logo-mark {
          height: 34px;
          width: auto;
          max-width: 65px;
          object-fit: contain;
          display: block;
          filter: drop-shadow(1.5px 1.5px 0px rgba(15, 23, 42, 0.25));
          transition: transform 0.15s ease;
        }

        .brand-link:hover .brand-icon-box {
          transform: translateY(-1px) scale(1.04);
        }

        .brand-title-wrap {
          font-weight: 800;
          font-size: 1.2rem;
          letter-spacing: -0.03em;
          display: flex;
          align-items: baseline;
          line-height: 1.1;
        }

        .brand-title-aksara {
          color: #0F172A;
          font-family: var(--font-heading);
          font-weight: 800;
        }

        .brand-title-tech {
          color: var(--prussian-blue);
          font-family: var(--font-heading);
          font-weight: 800;
          margin-left: 5px;
        }

        .brand-subtitle {
          font-size: 0.65rem;
          color: #64748B;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 700;
          margin-top: 3px;
        }

        /* Desktop Nav Link Items - Clean, Professional Typography */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          margin: 0 16px;
        }

        .desktop-nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #475569;
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 6px;
          white-space: nowrap;
          transition: all 0.15s ease;
        }

        .desktop-nav-link .nav-link-icon {
          flex-shrink: 0;
          transition: color 0.15s ease;
        }

        .desktop-nav-link .shield-icon {
          color: #D97706;
        }

        .desktop-nav-link .doc-icon {
          color: #64748B;
        }

        /* Refined, professional hover state - NOT AI-looking pill */
        .desktop-nav-link:hover {
          color: #0F172A;
          background: #F1F5F9;
        }

        .desktop-nav-link:hover .nav-link-icon {
          color: #0F172A;
        }

        /* Confident, grounded active state */
        .desktop-nav-link.is-active {
          color: #0F172A;
          font-weight: 800;
          background: #F8FAFC;
        }

        /* Subtle crisp accent indicator line for active page */
        .desktop-nav-link.is-active::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 12px;
          right: 12px;
          height: 2px;
          background: var(--prussian-blue);
          border-radius: 9999px;
        }

        .wa-btn-desktop {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          position: relative;
        }

        .wa-pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #34D399;
          display: inline-block;
          box-shadow: 0 0 6px #34D399;
        }

        /* =======================================================
           DESKTOP VIEW (Breakpoints: >= 1024px)
           ======================================================= */
        @media (min-width: 1024px) {
          .nav-bar-inner {
            width: 100%;
            max-width: 1360px;
            margin: 0 auto;
            padding: 0 clamp(24px, 3.5vw, 48px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 74px;
          }

          .nav-container.is-scrolled .nav-bar-inner {
            height: 66px;
          }

          .desktop-nav {
            display: flex;
            align-items: center;
            gap: 6px;
            margin: 0 16px;
          }

          .nav-actions {
            display: flex;
            align-items: center;
            gap: 14px !important;
            flex-shrink: 0;
          }

          #order-btn-desktop {
            display: inline-flex !important;
            padding: 9px 20px !important;
            font-size: 0.88rem !important;
            box-shadow: 3px 3px 0px var(--kuning) !important;
            transition: all 0.15s ease !important;
          }

          #order-btn-desktop:hover {
            transform: translate(-1px, -1px);
            box-shadow: 4px 4px 0px var(--kuning) !important;
          }

          #order-btn-desktop:active {
            transform: translate(1px, 1px);
            box-shadow: 1px 1px 0px var(--kuning) !important;
          }

          .wa-btn-desktop {
            display: inline-flex !important;
            padding: 9px 16px !important;
            font-size: 0.88rem !important;
            box-shadow: 3px 3px 0px #0F172A !important;
            transition: all 0.15s ease !important;
          }

          .wa-btn-desktop:hover {
            transform: translate(-1px, -1px);
            box-shadow: 4px 4px 0px #0F172A !important;
          }

          .wa-btn-desktop:active {
            transform: translate(1px, 1px);
            box-shadow: 1px 1px 0px #0F172A !important;
          }

          /* Hide Mobile-Only Elements on Desktop */
          .mobile-header-btn,
          .mobile-menu-drawer,
          .mobile-backdrop {
            display: none !important;
          }
        }

        /* =======================================================
           MOBILE & TABLET VIEW (Breakpoints: < 1024px)
           ======================================================= */
        @media (max-width: 1023px) {
          .nav-bar-inner {
            width: 100%;
            padding: 0 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 60px;
          }

          .nav-container.is-scrolled .nav-bar-inner {
            height: 60px;
          }

          /* Hide Desktop-Only Elements on Mobile */
          .desktop-nav,
          #order-btn-desktop,
          .wa-btn-desktop,
          .brand-subtitle {
            display: none !important;
          }

          .brand-link {
            gap: 8px;
          }

          .brand-logo-mark {
            height: 28px;
            max-width: 52px;
          }

          .brand-title-wrap {
            font-size: 1.12rem;
          }

          .nav-actions {
            display: flex;
            align-items: center;
            gap: 10px; /* Clean gap on mobile */
            flex-shrink: 0;
          }

          .mobile-header-btn {
            display: flex !important;
            width: 38px;
            height: 38px;
            border-radius: 8px;
            border: 1.5px solid #0F172A;
            background: #FFFFFF;
            box-shadow: 2px 2px 0px #0F172A;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.15s ease;
            text-decoration: none;
            flex-shrink: 0;
          }

          .mobile-wa-btn {
            position: relative;
          }

          .mobile-wa-btn:hover {
            background: #F0FDF4;
            transform: translate(-1px, -1px);
          }

          .mobile-wa-indicator {
            position: absolute;
            top: 6px;
            right: 6px;
            width: 6px;
            height: 6px;
            background: #10B981;
            border-radius: 50%;
          }

          .mobile-toggle-btn {
            color: #0F172A;
          }

          .mobile-toggle-btn.active {
            background: #0F172A;
            color: #FFFFFF;
            box-shadow: 1px 1px 0px rgba(15, 23, 42, 0.4);
          }
        }

        /* Mobile Menu Drawer Styles */
        .mobile-menu-drawer {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #FFFFFF;
          border-bottom: 2.5px solid #0F172A;
          box-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
          z-index: 101;
        }

        .mobile-menu-drawer.open {
          max-height: 90vh;
          overflow-y: auto;
          opacity: 1;
        }

        .mobile-menu-content {
          padding: 14px 16px 20px;
        }

        .mobile-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 10px;
          margin-bottom: 6px;
          border-bottom: 1px solid #F1F5F9;
        }

        .mobile-drawer-label {
          font-size: 0.68rem;
          font-weight: 800;
          color: #94A3B8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .mobile-drawer-sub {
          font-size: 0.68rem;
          color: #64748B;
          font-weight: 600;
        }

        .mobile-menu-list {
          display: flex;
          flex-direction: column;
        }

        .mobile-menu-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 10px;
          border-bottom: 1px solid #F1F5F9;
          text-decoration: none;
          color: #0F172A;
          border-radius: 8px;
          transition: background-color 0.15s ease;
        }

        .mobile-menu-row:hover {
          background: #F8FAFC;
        }

        .mobile-menu-row.is-active {
          background: rgba(29, 99, 255, 0.05);
          border-left: 3px solid var(--prussian-blue);
          padding-left: 10px;
        }

        .mobile-row-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--prussian-blue);
          flex-shrink: 0;
        }

        .mobile-menu-row.is-active .mobile-row-icon {
          background: #EBF2FF;
          border-color: rgba(29, 99, 255, 0.3);
        }

        .mobile-row-text {
          flex: 1;
          min-width: 0;
        }

        .mobile-row-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: #0F172A;
          line-height: 1.3;
        }

        .mobile-menu-row.is-active .mobile-row-title {
          color: var(--prussian-blue);
        }

        .mobile-row-desc {
          font-size: 0.74rem;
          color: #64748B;
          line-height: 1.35;
          margin-top: 1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mobile-row-chevron {
          color: #CBD5E1;
          flex-shrink: 0;
          transition: transform 0.15s ease;
        }

        .mobile-menu-row:hover .mobile-row-chevron,
        .mobile-menu-row.is-active .mobile-row-chevron {
          color: var(--prussian-blue);
          transform: translateX(2px);
        }

        .mobile-drawer-action {
          margin-top: 14px;
          margin-bottom: 12px;
        }

        .mobile-order-cta {
          width: 100%;
          justify-content: center;
          padding: 13px 18px !important;
          font-size: 0.92rem !important;
          font-weight: 800;
          box-shadow: 3px 3px 0px #0F172A !important;
        }

        .mobile-wa-hotline-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #F0FDF4;
          border: 1.5px solid #0F172A;
          border-radius: 8px;
          padding: 10px 14px;
          box-shadow: 2px 2px 0px #0F172A;
          text-decoration: none;
          color: #0F172A;
          transition: all 0.15s ease;
        }

        .mobile-wa-hotline-card:hover {
          background: #DCFCE7;
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0px #0F172A;
        }

        .hotline-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: #FFFFFF;
          border: 1.2px solid #0F172A;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .hotline-body {
          flex: 1;
          min-width: 0;
        }

        .hotline-title {
          font-size: 0.8rem;
          font-weight: 800;
          color: #065F46;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .hotline-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
          display: inline-block;
          box-shadow: 0 0 6px #10B981;
        }

        .hotline-meta {
          font-size: 0.72rem;
          color: #047857;
          font-weight: 600;
          margin-top: 1px;
        }

        .hotline-arrow {
          color: #065F46;
          flex-shrink: 0;
        }

        .mobile-backdrop {
          position: fixed;
          inset: 0;
          top: 64px;
          background: rgba(15, 23, 42, 0.4);
          z-index: 90;
          backdrop-filter: blur(2px);
        }
      `}</style>
    </header>
  );
}
