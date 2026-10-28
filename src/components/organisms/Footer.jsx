import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MessageCircle, FileText, Lock, ArrowUp, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/catalogData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container" style={{
      background: '#F1F5F9',
      borderTop: '2px solid #0F172A',
      paddingTop: '64px',
      paddingBottom: '32px',
      position: 'relative'
    }}>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 40px;
          margin-bottom: 56px;
        }

        @media (max-width: 768px) {
          .footer-container {
            padding-top: 40px !important;
            padding-bottom: 24px !important;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .footer-bottom {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
          }

          .footer-bottom-actions {
            justify-content: center !important;
          }

          .footer-exclusion-box {
            padding: 12px !important;
          }
        }
      `}</style>

      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'var(--prussian-blue)',
                border: '2px solid #0F172A',
                boxShadow: '3px 3px 0px var(--kuning)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900',
                color: '#FFFFFF',
                flexShrink: 0
              }}>
                A
              </div>
              <div style={{ fontWeight: '900', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
                <span style={{ color: '#0F172A' }}>AKSARA</span>{' '}
                <span style={{
                  background: 'var(--kuning)',
                  color: '#0F172A',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  border: '1.5px solid #0F172A',
                  fontSize: '1rem',
                  fontWeight: '900'
                }}>TECH</span>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.6', marginBottom: '20px', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
              Penyedia layanan rekayasa perangkat lunak mandiri, perancangan basis data relasional MySQL, dan penyusunan dokumen rekayasa perangkat lunak berstandar IEEE (SRS &amp; SDD) dan diagram UML.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#0F172A', fontWeight: '700' }}>
              <MessageCircle size={18} style={{ color: '#059669', flexShrink: 0 }} />
              <span>WhatsApp Resmi: <strong style={{ color: 'var(--prussian-blue)' }}>{BUSINESS_INFO.phoneDisplay}</strong></span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '900', color: '#0F172A', marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Layanan &amp; Paket
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#475569', fontWeight: '600' }}>
              <li><Link to="/paket" style={{ transition: 'all 0.15s ease' }}>5 Paket Utama (Rp 120rb – Rp 650rb)</Link></li>
              <li><Link to="/eksklusi-server" style={{ transition: 'all 0.15s ease', color: '#D97706', fontWeight: '800' }}>Kebijakan Eksklusi Server</Link></li>
              <li><Link to="/alur-sop" style={{ transition: 'all 0.15s ease' }}>SOP 4 Tahap &amp; Kuota Revisi 3x</Link></li>
              <li><Link to="/pesan" style={{ transition: 'all 0.15s ease' }}>Formulir Brief Proyek</Link></li>
              <li><Link to="/faq" style={{ transition: 'all 0.15s ease' }}>Pusat Tanya Jawab (FAQ)</Link></li>
            </ul>
          </div>

          {/* Governance & Legal */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '900', color: '#0F172A', marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Legalitas &amp; Tata Kelola
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#475569', fontWeight: '600' }}>
              <li>
                <Link to="/ketentuan" style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={15} /> Ketentuan Layanan &amp; SOP
                </Link>
              </li>
              <li>
                <Link to="/ketentuan" style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={15} /> Jaminan Kerahasiaan 100%
                </Link>
              </li>
              <li>
                <Link to="/ketentuan" style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Shield size={15} /> Data Cleansing Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Exclusion Notice Box */}
          <div>
            <div className="footer-exclusion-box" style={{
              background: '#FFFBEB',
              border: '2px solid #0F172A',
              boxShadow: '3px 3px 0px #0F172A',
              borderRadius: '6px',
              padding: '16px',
              fontSize: '0.84rem',
              color: '#334155',
              lineHeight: '1.5'
            }}>
              <div style={{ fontWeight: '900', color: '#D97706', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={16} /> Penegasan Resmi:
              </div>
              Aksara Tech murni melayani rekayasa software. Kami tidak melayani pembelian domain, sewa hosting, atau pemeliharaan server pihak ketiga.
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="footer-bottom" style={{
          borderTop: '2px solid #CBD5E1',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.86rem',
          color: '#64748B'
        }}>
          <div>
            &copy; {new Date().getFullYear()} <strong style={{ color: '#0F172A' }}>{BUSINESS_INFO.name}</strong>. Seluruh hak cipta dilindungi undang-undang.
          </div>

          <div className="footer-bottom-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a
              href={`https://wa.me/${BUSINESS_INFO.waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '800' }}
            >
              <span>WhatsApp Resmi (085600386692)</span>
              <ExternalLink size={14} />
            </a>
            <button
              onClick={scrollToTop}
              style={{
                background: '#FFFFFF',
                border: '2px solid #0F172A',
                boxShadow: '2px 2px 0px #0F172A',
                borderRadius: '6px',
                padding: '6px 14px',
                color: '#0F172A',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.82rem',
                fontWeight: '800'
              }}
            >
              <span>Atas</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
