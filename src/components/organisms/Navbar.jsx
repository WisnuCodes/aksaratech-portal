import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Box, 
  Collapse, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Button as MuiButton,
  Badge as MuiBadge,
  Typography
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded';

import { BUSINESS_INFO } from '../../data/catalogData';

// Brand Typography Theme for Material UI Components
const muiBrandTheme = createTheme({
  typography: {
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    allVariants: {
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    button: {
      fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
      fontWeight: 800,
    },
  },
});

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

  // Material UI Navigation Items - Unified Brand Palette
  const mobileNavItems = [
    { 
      to: '/paket', 
      label: 'Katalog Paket & Harga', 
      desc: '6 paket resmi mulai Rp 100.000 – Rp 500.000',
      icon: <Inventory2RoundedIcon sx={{ fontSize: 21 }} />
    },
    { 
      to: '/eksklusi-server', 
      label: 'Batasan Eksklusi Server', 
      desc: 'Software engineering murni & kepemilikan kode 100%',
      icon: <ShieldRoundedIcon sx={{ fontSize: 21 }} />
    },
    { 
      to: '/alur-sop', 
      label: 'Alur Kerja SOP (4 Tahap)', 
      desc: 'Pengerjaan terstruktur & kuota 3x revisi mutlak',
      icon: <AccessTimeRoundedIcon sx={{ fontSize: 21 }} />
    },
    { 
      to: '/faq', 
      label: 'FAQ & Tanya Jawab', 
      desc: 'Jawaban teknis, DP 50%, & garansi bug 1 minggu',
      icon: <HelpOutlineRoundedIcon sx={{ fontSize: 21 }} />
    },
    { 
      to: '/ketentuan', 
      label: 'Ketentuan Layanan & Privasi', 
      desc: 'Perjanjian legal formal & proteksi kerahasiaan brief',
      icon: <DescriptionRoundedIcon sx={{ fontSize: 21 }} />
    },
  ];

  return (
    <ThemeProvider theme={muiBrandTheme}>
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
              Digital Solutions
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
            <ShieldRoundedIcon sx={{ fontSize: 16, color: 'var(--prussian-blue)', mr: 0.5 }} />
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
            <DescriptionRoundedIcon sx={{ fontSize: 16, color: 'var(--prussian-blue)', mr: 0.5 }} />
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
            <WhatsAppIcon sx={{ fontSize: 18 }} />
            <span className="wa-btn-text">WA Korporat</span>
            <span className="wa-pulse-dot" />
          </a>

          {/* Desktop Order Button */}
          <Link to="/pesan" className="btn btn-primary btn-sm" id="order-btn-desktop">
            <span>Pesan Proyek</span>
            </Link>

          {/* Mobile WA Quick Button via Material UI IconButton */}
          <IconButton
            component="a"
            href={`https://wa.me/${BUSINESS_INFO.waNumber}?text=Halo%20Aksara%20Tech,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20rekayasa%20website.`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Konsultasi WhatsApp"
            title="Chat WhatsApp"
            className="mobile-header-mui-btn"
            sx={{
              display: { xs: 'flex', lg: 'none' },
              width: 38,
              height: 38,
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              bgcolor: '#FFFFFF',
              
              color: '#0F172A',
              transition: 'all 0.15s cubic-bezier(0.2, 0, 0, 1)',
              '&:hover': {
                bgcolor: '#F1F5F9',
                transform: 'translate(-1px, -1px)',
                
              },
              '&:active': {
                transform: 'translate(1.5px, 1.5px)',
                
              }
            }}
          >
            <MuiBadge
              variant="dot"
              sx={{
                '& .MuiBadge-badge': {
                  bgcolor: '#0F172A',
                  
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  top: 2,
                  right: 2
                }
              }}
            >
              <WhatsAppIcon sx={{ fontSize: 20 }} />
            </MuiBadge>
          </IconButton>

          {/* Mobile Menu Toggle Button via Material UI IconButton */}
          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Tutup Navigasi' : 'Buka Navigasi'}
            className="mobile-header-mui-btn"
            sx={{
              display: { xs: 'flex', lg: 'none' },
              width: 38,
              height: 38,
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              bgcolor: mobileMenuOpen ? '#0F172A' : '#FFFFFF',
              color: mobileMenuOpen ? '#FFFFFF' : '#0F172A',
              
              transition: 'all 0.15s cubic-bezier(0.2, 0, 0, 1)',
              '&:hover': {
                bgcolor: mobileMenuOpen ? '#1E293B' : '#F1F5F9',
                transform: 'translate(-1px, -1px)',
                
              },
              '&:active': {
                transform: 'translate(1.5px, 1.5px)',
                
              }
            }}
          >
            {mobileMenuOpen ? (
              <CloseRoundedIcon sx={{ fontSize: 22 }} />
            ) : (
              <MenuRoundedIcon sx={{ fontSize: 22 }} />
            )}
          </IconButton>
        </div>

      </div>

      {/* Material UI Mobile Menu Drawer Dropdown — Floating Overlay (Never Pushes Page Content) */}
      <Box
        sx={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 1000,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none'
        }}
      >
        <Collapse in={mobileMenuOpen} timeout={250}>
          <Box 
            sx={{
              bgcolor: '#FFFFFF',
              borderBottom: '1px solid #E2E8F0',
              
              overflow: 'hidden', // No scrollbar
              p: { xs: '10px 14px 14px', sm: '12px 18px 16px' },
              position: 'relative'
            }}
          >
            {/* Compact Drawer Header */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              pb: 0.8,
              mb: 0.8,
              borderBottom: '1px solid #F1F5F9'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Typography 
                sx={{ 
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.64rem',
                  fontWeight: 900,
                  color: '#64748B',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}
              >
                MENU NAVIGASI
              </Typography>
              <Box 
                sx={{ 
                  fontSize: '0.6rem',
                  fontWeight: 800,
                  bgcolor: '#ECFDF5',
                  color: '#059669',
                  border: '1px solid #10B981',
                  borderRadius: '3px',
                  px: 0.6,
                  py: 0.1
                }}
              >
                Resmi
              </Box>
            </Box>
            <Typography sx={{ fontSize: '0.66rem', color: '#94A3B8', fontWeight: 600 }}>
              Aksara Tech Platform
            </Typography>
          </Box>

          {/* Material UI List with Interactive Touch Ripple Buttons */}
          <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
            {mobileNavItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <ListItem key={item.to} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.to}
                    selected={isActive}
                    sx={{
                      borderRadius: '10px',
                      py: 0.7,
                      px: 1.2,
                      gap: 1.2,
                      border: '1.5px solid',
                      borderColor: isActive ? 'var(--prussian-blue)' : 'transparent',
                      bgcolor: isActive ? '#EEF4FF' : 'transparent',
                      boxShadow: 'none',
                      transition: 'all 0.15s cubic-bezier(0.2, 0, 0, 1)',
                      '&.Mui-selected': {
                        bgcolor: '#EEF4FF',
                        '&:hover': {
                          bgcolor: '#E0EAFF',
                        }
                      },
                      '&:hover': {
                        bgcolor: '#F8FAFC',
                        transform: 'translateX(2px)',
                        borderColor: isActive ? 'var(--prussian-blue)' : '#E2E8F0'
                      },
                      '&:active': {
                        transform: 'scale(0.99)'
                      }
                    }}
                  >
                    {/* Unified Brand Color Material Icon Container */}
                    <ListItemIcon sx={{ minWidth: 'auto' }}>
                      <Box 
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: '8px',
                          bgcolor: isActive ? 'var(--prussian-blue)' : '#EEF4FF',
                          color: isActive ? '#FFFFFF' : 'var(--prussian-blue)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1.5px solid',
                          borderColor: isActive ? '#0F172A' : 'rgba(29, 99, 255, 0.25)',
                          boxShadow: 'none',
                          transition: 'all 0.15s cubic-bezier(0.2, 0, 0, 1)',
                          '.MuiListItemButton-root:hover &': {
                            transform: 'scale(1.05)',
                            bgcolor: 'var(--prussian-blue)',
                            color: '#FFFFFF',
                            borderColor: '#0F172A',
                            
                          }
                        }}
                      >
                        {item.icon}
                      </Box>
                    </ListItemIcon>

                    <ListItemText
                      primary={item.label}
                      secondary={item.desc}
                      primaryTypographyProps={{
                        fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
                        fontWeight: isActive ? 800 : 700,
                        fontSize: '0.84rem',
                        color: isActive ? 'var(--prussian-blue)' : '#0F172A',
                        lineHeight: 1.25,
                        letterSpacing: '-0.015em'
                      }}
                      secondaryTypographyProps={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '0.68rem',
                        color: isActive ? '#334155' : '#64748B',
                        lineHeight: 1.2,
                        mt: 0.1,
                        noWrap: true
                      }}
                    />

                    <ChevronRightRoundedIcon 
                      sx={{ 
                        color: isActive ? 'var(--prussian-blue)' : '#CBD5E1', 
                        fontSize: 17,
                        flexShrink: 0,
                        transition: 'transform 0.15s ease, color 0.15s ease',
                        '.MuiListItemButton-root:hover &': {
                          transform: 'translateX(2px)',
                          color: 'var(--prussian-blue)'
                        }
                      }} 
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          {/* Primary Action Button via Material UI Button */}
          <Box sx={{ mt: 1.2, mb: 0.8 }}>
            <MuiButton
              component={Link}
              to="/pesan"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: 'var(--prussian-blue)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.86rem',
                textTransform: 'none',
                py: 1.1,
                px: 2,
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                
                transition: 'all 0.15s cubic-bezier(0.2, 0, 0, 1)',
                '&:hover': {
                  bgcolor: 'var(--prussian-blue-dark)',
                  transform: 'translate(-1px, -1px)',
                  
                },
                '&:active': {
                  transform: 'translate(1px, 1px)',
                  
                }
              }}
            >
              Isi Brief &amp; Formulir Proyek
            </MuiButton>
          </Box>

          {/* WhatsApp Hotline Surface Card via Material UI Button (Compact 1-Row Pill) */}
          <MuiButton
            component="a"
            href={`https://wa.me/${BUSINESS_INFO.waNumber}?text=Halo%20Aksara%20Tech,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20rekayasa%20website.`}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1.2,
              bgcolor: '#F0FDF4',
              color: '#0F172A',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              py: 0.8,
              px: 1.5,
              
              textTransform: 'none',
              textAlign: 'left',
              transition: 'all 0.15s cubic-bezier(0.2, 0, 0, 1)',
              '&:hover': {
                bgcolor: '#DCFCE7',
                transform: 'translate(-1px, -1px)',
                
              },
              '&:active': {
                transform: 'translate(1px, 1px)',
                
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, minWidth: 0, flex: 1 }}>
              <Box 
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '6px',
                  bgcolor: '#FFFFFF',
                  border: '1.2px solid #0F172A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#059669',
                  flexShrink: 0
                }}
              >
                <PhoneInTalkRoundedIcon sx={{ fontSize: 16 }} />
              </Box>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                  <Box 
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: '#10B981',
                      
                      flexShrink: 0
                    }}
                  />
                  <Typography sx={{ fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif", fontSize: '0.76rem', fontWeight: 800, color: '#065F46', lineHeight: 1.2 }}>
                    Konsultasi WhatsApp Aktif
                  </Typography>
                </Box>
                <Typography sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.68rem', color: '#047857', fontWeight: 600, lineHeight: 1.2, mt: 0.1 }}>
                  {BUSINESS_INFO.phoneDisplay} &bull; Plafon Max Rp 500.000
                </Typography>
              </Box>
            </Box>
            <ChevronRightRoundedIcon sx={{ color: '#065F46', fontSize: 17, flexShrink: 0 }} />
          </MuiButton>

          </Box>
        </Collapse>
      </Box>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Embedded CSS for Desktop Base & Backdrop */}
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
          /* border separated by tone */
          width: 100%;
          transition: background-color 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .nav-container.is-scrolled {
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
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

        /* Desktop Nav Link Items */
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
          gap: 4px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #475569;
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 6px;
          white-space: nowrap;
          transition: color 0.15s ease, background-color 0.15s ease;
        }

        .desktop-nav-link:hover {
          color: #0F172A;
          background: #F1F5F9;
        }

        .desktop-nav-link.is-active {
          color: #0F172A;
          font-weight: 800;
          background: #F8FAFC;
        }

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
            transition: transform 0.15s ease, background-color 0.15s ease !important;
          }

          #order-btn-desktop:hover {
            transform: translate(-1px, -1px);
          }

          #order-btn-desktop:active {
            transform: translate(1px, 1px);
          }

          .wa-btn-desktop {
            display: inline-flex !important;
            padding: 9px 16px !important;
            font-size: 0.88rem !important;
            transition: transform 0.15s ease, background-color 0.15s ease !important;
          }

          .wa-btn-desktop:hover {
            transform: translate(-1px, -1px);
          }

          .wa-btn-desktop:active {
            transform: translate(1px, 1px);
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
            gap: 8px;
            flex-shrink: 0;
          }
        }

        /* Force Material UI to strictly inherit website typography */
        .MuiTypography-root,
        .MuiListItemText-root,
        .MuiListItemText-primary,
        .MuiListItemText-secondary,
        .MuiButton-root,
        .MuiButtonBase-root {
          font-family: var(--font-body) !important;
        }

        .MuiListItemText-primary,
        .mobile-order-cta,
        .MuiButton-contained,
        .drawer-header-left,
        .mobile-row-title {
          font-family: var(--font-heading) !important;
        }

        .mobile-backdrop {
          position: fixed;
          inset: 0;
          top: 60px;
          background: rgba(15, 23, 42, 0.4);
          z-index: 90;
          backdrop-filter: blur(3px);
        }
      `}</style>
    </header>
  </ThemeProvider>
);
}
