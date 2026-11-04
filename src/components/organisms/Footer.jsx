import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  MessageCircle, 
  FileText, 
  Lock, 
  ArrowUp, 
  ExternalLink,
  ChevronRight,
  Clock,
  CheckCircle2,
  Layers,
  FileCheck
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/catalogData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-corporate" style={{
      background: '#F8FAFC',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '56px',
      paddingBottom: '28px',
      position: 'relative'
    }}>
      <style>{`
        .footer-corporate {
          font-family: var(--font-body);
        }

        .footer-grid-corporate {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.1fr;
          gap: 40px;
          margin-bottom: 48px;
        }

        .footer-logo-img {
          height: 38px;
          width: auto;
          max-width: 230px;
          object-fit: contain;
          display: block;
        }

        .footer-link-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #475569;
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.18s ease, opacity 0.18s ease, background-color 0.18s ease;
          padding: 3px 0;
        }

        .footer-link-item:hover {
          color: var(--prussian-blue);
          transform: translateX(3px);
        }

        .footer-heading {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 900;
          color: #0F172A;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-heading::after {
          content: '';
          flex: 1;
          height: 1.5px;
          background: #E2E8F0;
        }

        @media (max-width: 1024px) {
          .footer-grid-corporate {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
        }

        @media (max-width: 640px) {
          .footer-corporate {
            padding-top: 40px !important;
            padding-bottom: 24px !important;
          }

          .footer-grid-corporate {
            grid-template-columns: 1fr;
            gap: 32px;
            margin-bottom: 36px;
          }

          .footer-logo-img {
            height: 34px;
            max-width: 200px;
          }

          .footer-bottom-corporate {
            flex-direction: column !important;
            align-items: stretch !important;
            text-align: center;
            gap: 16px !important;
          }

          .footer-bottom-links {
            justify-content: center !important;
            flex-wrap: wrap;
          }

          .footer-bottom-actions {
            justify-content: center !important;
            width: 100%;
          }
        }
      `}</style>

      <div className="container">
        <div className="footer-grid-corporate">
          
          {/* Kolom 1: Brand Authority & Kontak Resmi */}
          <div>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '14px' }} aria-label="Aksara Tech Beranda">
              <img 
                src="/brand-logo.png" 
                alt="Aksara Tech Enterprise Solutions" 
                className="footer-logo-img"
                width="230"
                height="38"
                loading="lazy"
                decoding="async"
              />
            </Link>

            <p style={{
              fontSize: '0.88rem',
              color: '#475569',
              lineHeight: '1.65',
              marginBottom: '18px',
              fontWeight: '500'
            }}>
              Penyedia solusi rekayasa perangkat lunak mandiri, arsitektur basis data relasional, dan perancangan dokumen formal sistem berstandar akademik dan korporat.
            </p>

            {/* Status Operasional Tim */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              
              fontSize: '0.76rem',
              fontWeight: '800',
              color: '#0F172A',
              marginBottom: '16px'
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#0F172A', display: 'inline-block' }} />
              <span>Tim Teknis Siaga: 08.00 – 22.00 WIB</span>
            </div>

            {/* Direct Official WhatsApp Channel */}
            <a
              href={`https://wa.me/${BUSINESS_INFO.waNumber}?text=Halo%20Aksara%20Tech,%20saya%20ingin%20berkonsultasi%20layanan%20rekayasa%20website.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa btn-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                width: 'auto'
              }}
            >
              <MessageCircle size={15} />
              <span>WhatsApp: {BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>

          {/* Kolom 2: Layanan & Klasifikasi Paket */}
          <div>
            <h4 className="footer-heading">
              <span>Solusi &amp; Paket</span>
            </h4>
            <nav aria-label="Navigasi Layanan Footer" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/paket" className="footer-link-item">
                <ChevronRight size={13} style={{ color: 'var(--prussian-blue)' }} />
                <span>6 Klasifikasi Paket Resmi</span>
              </Link>
              <Link to="/paket" className="footer-link-item">
                <ChevronRight size={13} style={{ color: '#94A3B8' }} />
                <span>Landing Page Korporat</span>
              </Link>
              <Link to="/paket" className="footer-link-item">
                <ChevronRight size={13} style={{ color: '#94A3B8' }} />
                <span>Website UMKM &amp; Katalog</span>
              </Link>
              <Link to="/paket" className="footer-link-item">
                <ChevronRight size={13} style={{ color: '#94A3B8' }} />
                <span>Company Profile Korporat</span>
              </Link>
              <Link to="/paket" className="footer-link-item">
                <ChevronRight size={13} style={{ color: '#94A3B8' }} />
                <span>Toko Daring / E-Commerce</span>
              </Link>
              <Link to="/paket" className="footer-link-item">
                <ChevronRight size={13} style={{ color: '#94A3B8' }} />
                <span>Modul Akademik &amp; Tugas Kuliah</span>
              </Link>
              <Link to="/pesan" className="footer-link-item" style={{ color: 'var(--prussian-blue)', fontWeight: '800' }}>
                <ChevronRight size={13} />
                <span>Isi Lembar Brief Proyek</span>
              </Link>
            </nav>
          </div>

          {/* Kolom 3: Tata Kelola, Dokumen & FAQ */}
          <div>
            <h4 className="footer-heading">
              <span>Tata Kelola &amp; SOP</span>
            </h4>
            <nav aria-label="Navigasi Tata Kelola Footer" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/eksklusi-server" className="footer-link-item" style={{ color: 'var(--prussian-blue)', fontWeight: '700' }}>
                <ShieldCheck size={14} />
                <span>Batasan Eksklusi Server</span>
              </Link>
              <Link to="/alur-sop" className="footer-link-item">
                <Clock size={14} style={{ color: '#64748B' }} />
                <span>Alur SOP 4 Tahap Disiplin</span>
              </Link>
              <Link to="/alur-sop" className="footer-link-item">
                <FileCheck size={14} style={{ color: '#64748B' }} />
                <span>Ketentuan Revisi Max 3x</span>
              </Link>
              <Link to="/faq" className="footer-link-item">
                <Layers size={14} style={{ color: '#64748B' }} />
                <span>Pusat Tanya Jawab (FAQ)</span>
              </Link>
              <Link to="/ketentuan" className="footer-link-item">
                <FileText size={14} style={{ color: '#64748B' }} />
                <span>Perjanjian Kontrak Layanan</span>
              </Link>
              <Link to="/ketentuan" className="footer-link-item">
                <Lock size={14} style={{ color: '#64748B' }} />
                <span>100% Confidentiality Policy</span>
              </Link>
            </nav>
          </div>

          {/* Kolom 4: Penegasan Standar & Jaminan Mutu */}
          <div>
            <div style={{
              background: '#FFFFFF',
              border: '2px solid #0F172A',
              
              borderRadius: 'var(--radius-md)',
              padding: '18px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: '#F1F5F9',
                  border: '1px solid var(--border-subtle)',
                  color: '#0F172A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <ShieldCheck size={16} />
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: '900', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Penegasan Ruang Lingkup
                </span>
              </div>

              <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: '1.6', margin: 0, fontWeight: '500' }}>
                Aksara Tech murni melayani rekayasa software (*source code &amp; database*). Urusan sewa hosting dan domain publik adalah hak akses milik klien.
              </p>

              <div style={{ borderTop: '1px dashed #E2E8F0', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#0F172A', fontWeight: '700' }}>
                  <CheckCircle2 size={13} />
                  <span>Garansi Pemeliharaan Bug 7 Hari</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--prussian-blue)', fontWeight: '800' }}>
                  <CheckCircle2 size={13} />
                  <span>Fasilitas Kuota Revisi Max 3 Kali</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Baris Bawah: Hak Cipta, Tautan Legal & Back To Top */}
        <div 
          className="footer-bottom-corporate" 
          style={{
            borderTop: '2px solid #E2E8F0',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.84rem',
            color: '#64748B'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} <strong style={{ color: '#0F172A' }}>{BUSINESS_INFO.name}</strong>. Hak Cipta Terpelihara.
          </div>

          <div className="footer-bottom-links" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/ketentuan" style={{ color: '#64748B', textDecoration: 'none', fontWeight: '600', fontSize: '0.82rem' }}>
              Ketentuan Layanan
            </Link>
            <span style={{ color: '#CBD5E1' }}>•</span>
            <Link to="/ketentuan" style={{ color: '#64748B', textDecoration: 'none', fontWeight: '600', fontSize: '0.82rem' }}>
              Kebijakan Privasi
            </Link>
            <span style={{ color: '#CBD5E1' }}>•</span>
            <Link to="/eksklusi-server" style={{ color: '#64748B', textDecoration: 'none', fontWeight: '600', fontSize: '0.82rem' }}>
              Eksklusi Server
            </Link>
          </div>

          <div className="footer-bottom-actions" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Kembali ke atas halaman"
              style={{
                background: '#FFFFFF',
                border: '2px solid #0F172A',
                
                borderRadius: 'var(--radius-sm)',
                padding: '6px 14px',
                color: '#0F172A',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                fontWeight: '800',
                transition: 'all 0.15s ease'
              }}
            >
              <span>Ke Atas</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
