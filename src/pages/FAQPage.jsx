import React, { useState, useMemo } from 'react';
import PageHeader from '../components/molecules/PageHeader';
import { FAQS, BUSINESS_INFO } from '../data/catalogData';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  MessageCircle, 
  Copy, 
  Check, 
  RotateCcw, 
  ShieldCheck, 
  Clock, 
  X,
  Server,
  Layers,
  CreditCard,
  Lock,
  FileCheck,
  CheckCircle2
} from 'lucide-react';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Support multi-open or single-open; defaulting to first open
  const [openIndexes, setOpenIndexes] = useState([0]);
  const [copiedId, setCopiedId] = useState(null);

  // Category list derived from FAQS
  const categories = useMemo(() => {
    return [
      { key: 'all', label: 'Semua Tanya Jawab', icon: Layers, count: FAQS.length },
      { key: 'Infrastruktur', label: 'Hosting & Server', icon: Server },
      { key: 'Ketentuan', label: 'Kuota Revisi', icon: Clock },
      { key: 'Garansi', label: 'Garansi 7 Hari', icon: ShieldCheck },
      { key: 'Timeline', label: 'Estimasi Waktu', icon: Clock },
      { key: 'Pembayaran', label: 'Skema DP & Termin', icon: CreditCard },
      { key: 'Keamanan', label: 'Kerahasiaan Data', icon: Lock },
      { key: 'Deliverables', label: 'Serah Terima Berkas', icon: FileCheck }
    ];
  }, []);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return FAQS.filter(faq => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      const inQuestion = faq.q.toLowerCase().includes(q);
      const inAnswer = faq.a.toLowerCase().includes(q);
      const inBadge = faq.badge?.toLowerCase().includes(q);
      const inTakeaway = faq.takeaway?.toLowerCase().includes(q);
      return inQuestion || inAnswer || inBadge || inTakeaway;
    });
  }, [searchTerm, selectedCategory]);

  const toggleIndex = (idx) => {
    setOpenIndexes(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const expandAll = () => {
    setOpenIndexes(filteredFaqs.map((_, idx) => idx));
  };

  const collapseAll = () => {
    setOpenIndexes([]);
  };

  const handleCopy = (faq, idx) => {
    const textToCopy = `[FAQ Aksara Tech]\nQ: ${faq.q}\nA: ${faq.a}\n(Poin Kunci: ${faq.takeaway || faq.highlight})`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(idx);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => {});
  };

  return (
    <div className="faq-page" style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <PageHeader
        breadcrumbs={[{ label: 'Tanya Jawab Resmi (FAQ)' }]}
        badge="Pusat Informasi &amp; FAQ"
        badgeIcon={HelpCircle}
        title="Pertanyaan yang Sering"
        highlightText="Diajukan Calon Klien"
        description="Temukan jawaban transparan dan komprehensif terkait batasan server hosting, tata kelola kuota 3 kali revisi mutlak, garansi 7 hari, jaminan kerahasiaan data 100%, serta skema termin pembayaran."
      />

      {/* Quick Highlights Strip for Mobile / Desktop */}
      <div className="faq-highlights-bar">
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'nowrap', minWidth: 'max-content' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px', marginRight: '6px' }}>
            <ShieldCheck size={14} style={{ color: '#0F172A' }} /> Standar Layanan:
          </span>
          <span className="faq-quick-pill">
            <CheckCircle2 size={13} style={{ color: '#0F172A' }} />
            <span>Garansi 7 Hari Kalender</span>
          </span>
          <span className="faq-quick-pill">
            <Clock size={13} style={{ color: '#0F172A' }} />
            <span>Kuota Max 3x Revisi Mutlak</span>
          </span>
          <span className="faq-quick-pill">
            <Lock size={13} style={{ color: '#0F172A' }} />
            <span>100% Confidentiality &amp; Data Cleansing</span>
          </span>
          <span className="faq-quick-pill">
            <CreditCard size={13} style={{ color: '#0F172A' }} />
            <span>DP 50% &amp; Pelunasan 50%</span>
          </span>
        </div>
      </div>

      <section className="section-padding" style={{ paddingTop: '36px', paddingBottom: '60px' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          
          {/* Search Bar & Instant Actions */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ position: 'relative', width: '100%', marginBottom: '18px' }}>
              <Search 
                size={18} 
                style={{ 
                  position: 'absolute', 
                  left: '16px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#64748B',
                  pointerEvents: 'none'
                }} 
              />
              <input
                type="text"
                placeholder="Cari kata kunci (contoh: hosting, revisi 3x, garansi bug, database, UML, penawaran)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="faq-search-input"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#F1F5F9',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#64748B'
                  }}
                  title="Hapus pencarian"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category Filter Pills (Horizontal Scroll on Mobile) */}
            <div className="faq-category-scroll">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.key;
                const IconComp = cat.icon;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`faq-cat-pill ${isActive ? 'active' : ''}`}
                  >
                    <IconComp size={14} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Status & Bulk Expand/Collapse Actions */}
            <div className="faq-status-bar">
              <span style={{ fontSize: '0.84rem', color: '#475569', fontWeight: '600' }}>
                Menampilkan <strong style={{ color: '#0F172A' }}>{filteredFaqs.length}</strong> pertanyaan resmi
                {selectedCategory !== 'all' && <span> &bull; Kategori: <strong style={{ color: '#0F172A' }}>{selectedCategory}</strong></span>}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={expandAll}
                  className="faq-text-action-btn"
                >
                  Buka Semua
                </button>
                <span style={{ color: '#CBD5E1' }}>&bull;</span>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="faq-text-action-btn"
                >
                  Tutup Semua
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="faq-accordion-list">
            {filteredFaqs.length === 0 ? (
              <div className="faq-empty-state">
                <div className="faq-empty-icon-wrap">
                  <Search size={22} />
                </div>
                <h3 className="faq-empty-title">
                  Tidak Ada Pertanyaan yang Cocok
                </h3>
                <p className="faq-empty-desc">
                  Kata kunci "<strong>{searchTerm}</strong>" tidak ditemukan dalam daftar FAQ resmi. Silakan reset filter atau tanyakan langsung ke tim teknis kami.
                </p>
                <button
                  type="button"
                  onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <RotateCcw size={14} />
                  <span>Reset Semua Pencarian</span>
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndexes.includes(idx);
                const isCopied = copiedId === idx;

                return (
                  <div
                    key={faq.id || idx}
                    className={`faq-card ${isOpen ? 'is-open' : ''}`}
                  >
                    {/* Header Button */}
                    <button
                      type="button"
                      onClick={() => toggleIndex(idx)}
                      aria-expanded={isOpen}
                      className="faq-trigger-btn"
                    >
                      <div className="faq-trigger-text">
                        <h3 className="faq-question-title">
                          {faq.q}
                        </h3>
                      </div>

                      <div className={`faq-chevron-wrap ${isOpen ? 'open' : ''}`}>
                        <ChevronDown size={18} />
                      </div>
                    </button>

                    {/* Collapsible Answer Body */}
                    {isOpen && (
                      <div className="faq-answer-pane">
                        <p className="faq-answer-prose">
                          {faq.a}
                        </p>

                        {/* Executive Summary / Key Takeaway Card */}
                        {faq.takeaway && (
                          <div className="faq-takeaway-card">
                            <div className="faq-takeaway-header">
                              <CheckCircle2 size={15} className="faq-takeaway-icon" />
                              <span className="faq-takeaway-label">Poin Kunci Transparansi:</span>
                            </div>
                            <p className="faq-takeaway-text">
                              {faq.takeaway}
                            </p>
                          </div>
                        )}

                        {/* Interactive Action Bar (Copy & WA Query) */}
                        <div className="faq-card-action-bar">
                          <button
                            type="button"
                            onClick={() => handleCopy(faq, idx)}
                            className="faq-copy-btn"
                          >
                            {isCopied ? <Check size={13} style={{ color: '#0F172A' }} /> : <Copy size={13} style={{ color: '#0F172A' }} />}
                            <span>{isCopied ? 'Tersalin ke Clipboard!' : 'Salin Jawaban'}</span>
                          </button>

                          <a
                            href={`https://wa.me/${BUSINESS_INFO.waNumber}?text=${encodeURIComponent(`Halo Aksara Tech, saya ingin konsultasi lebih lanjut terkait FAQ: "${faq.q}"`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="faq-wa-link"
                          >
                            <MessageCircle size={13} />
                            <span>Tanya Topik Ini di WA</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Contact Support Strip */}
          <div className="faq-contact-card">
            <div className="faq-contact-left">
              <div className="faq-contact-icon-wrap">
                <MessageCircle size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className="faq-status-pill">
                    <span className="faq-status-dot"></span>
                    Tim Teknis Siaga
                  </span>
                  <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '600' }}>
                    08.00 – 22.00 WIB
                  </span>
                </div>
                <h3 className="faq-contact-title">
                  Punya Pertanyaan Spesifik Terkait Sistem Anda?
                </h3>
                <p className="faq-contact-desc">
                  Konsultasikan rancangan sistem, skripsi, atau kebutuhan bisnis langsung dengan lead developer kami secara gratis tanpa komitmen.
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${BUSINESS_INFO.waNumber}?text=Halo%20Aksara%20Tech,%20saya%20ingin%20konsultasi%20langsung%20terkait%20layanan%20pembuatan%20website.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa faq-contact-wa-btn"
            >
              <MessageCircle size={18} />
              <span>Hubungi Tim Pengembang Resmi via WA</span>
            </a>
          </div>

        </div>
      </section>

      {/* Embedded Mobile Polish Stylesheet */}
      <style>{`
        .faq-highlights-bar {
          background: #FFFFFF;
          padding: 12px 0;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .faq-highlights-bar::-webkit-scrollbar {
          display: none;
        }

        .faq-quick-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #F8FAFC;
          border: 1px solid var(--border-subtle);
          padding: 5px 12px;
          border-radius: var(--radius-full);
          font-size: 0.76rem;
          font-weight: 700;
          color: #0F172A;
          white-space: nowrap;
        }

        .faq-search-input {
          width: 100%;
          padding: 13px 44px 13px 44px;
          font-size: 0.94rem;
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: #0F172A;
          font-family: inherit;
          font-weight: 500;
          transition: border-color 0.15s ease;
        }

        .faq-search-input:focus {
          outline: none;
          border-color: var(--prussian-blue);
        }

        .faq-category-scroll {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 8px;
          margin-bottom: 14px;
          scrollbar-width: none;
        }

        .faq-category-scroll::-webkit-scrollbar {
          display: none;
        }

        .faq-cat-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-subtle);
          background: #FFFFFF;
          color: #475569;
          font-size: 0.82rem;
          font-weight: 700;
          white-space: nowrap;
          cursor: pointer;
          transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
          flex-shrink: 0;
        }

        .faq-cat-pill:hover {
          background: #F8FAFC;
          border-color: #CBD5E1;
          color: #0F172A;
        }

        .faq-cat-pill.active {
          background: #0F172A;
          border-color: #0F172A;
          color: #FFFFFF;
        }

        .faq-status-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 10px;
          padding-bottom: 14px;
        }

        .faq-text-action-btn {
          background: none;
          border: none;
          color: var(--prussian-blue);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          padding: 4px 6px;
        }

        .faq-text-action-btn:hover {
          text-decoration: underline;
        }

        .faq-accordion-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 40px;
        }

        .faq-card {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        .faq-card.is-open {
          border-color: #CBD5E1;
        }

        .faq-trigger-btn {
          width: 100%;
          padding: 18px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: #FFFFFF;
          border: none;
          text-align: left;
          cursor: pointer;
          color: #0F172A;
          transition: background-color 0.15s ease;
          min-height: 52px;
        }

        .faq-trigger-btn:hover {
          background-color: #F8FAFC;
        }

        .faq-card.is-open .faq-trigger-btn {
          background-color: #F8FAFC;
        }

        .faq-trigger-text {
          flex: 1;
          min-width: 0;
        }

        .faq-question-title {
          font-family: var(--font-heading);
          font-size: 1.02rem;
          font-weight: 700;
          line-height: 1.45;
          color: #0F172A;
          margin: 0;
        }

        .faq-chevron-wrap {
          width: 32px;
          height: 32px;
          min-width: 32px;
          border-radius: 50%;
          background: #F1F5F9;
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0F172A;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease;
          flex-shrink: 0;
        }

        .faq-chevron-wrap.open {
          transform: rotate(180deg);
          background-color: #E2E8F0;
        }

        .faq-answer-pane {
          padding: 18px 22px 22px 22px;
          background: #FFFFFF;
        }

        .faq-answer-prose {
          color: #334155;
          font-size: 0.94rem;
          line-height: 1.7;
          font-weight: 450;
          margin: 0;
        }

        .faq-takeaway-card {
          margin-top: 16px;
          background: #F8FAFC;
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 12px 16px;
        }

        .faq-takeaway-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }

        .faq-takeaway-icon {
          color: #0F172A;
          flex-shrink: 0;
        }

        .faq-takeaway-label {
          font-size: 0.8rem;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: 0.02em;
        }

        .faq-takeaway-text {
          margin: 0;
          font-size: 0.88rem;
          color: #334155;
          font-weight: 600;
          line-height: 1.55;
        }

        .faq-card-action-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          padding-top: 14px;
          margin-top: 16px;
        }

        .faq-copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #F1F5F9;
          color: #475569;
          border: 1px solid var(--border-subtle);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }

        .faq-copy-btn:hover {
          background: #E2E8F0;
          color: #0F172A;
        }

        .faq-wa-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          color: #0F172A;
          border: 1px solid var(--border-subtle);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 700;
          text-decoration: none;
          transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }

        .faq-wa-link:hover {
          background: #F1F5F9;
          border-color: var(--border-main);
        }

        .faq-empty-state {
          text-align: center;
          padding: 48px 24px;
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }

        .faq-empty-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #F1F5F9;
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px auto;
          color: #64748B;
        }

        .faq-empty-title {
          font-size: 1.12rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .faq-empty-desc {
          color: #64748B;
          font-size: 0.9rem;
          max-width: 420px;
          margin: 0 auto 20px auto;
          line-height: 1.6;
        }

        /* Bottom Contact Card */
        .faq-contact-card {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .faq-contact-left {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          flex: 1 1 420px;
        }

        .faq-contact-icon-wrap {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 10px;
          background: #F1F5F9;
          border: 1px solid var(--border-subtle);
          color: #0F172A;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .faq-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          font-weight: 800;
          color: #0F172A;
          background: #F1F5F9;
          border: 1px solid var(--border-subtle);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .faq-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0F172A;
        }

        .faq-contact-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 4px;
          line-height: 1.35;
        }

        .faq-contact-desc {
          font-size: 0.88rem;
          color: #475569;
          margin: 0;
          font-weight: 500;
          line-height: 1.6;
        }

        .faq-contact-wa-btn {
          white-space: nowrap;
          padding: 12px 24px;
        }

        /* Mobile Responsive Overhauls */
        @media (max-width: 640px) {
          .faq-trigger-btn {
            padding: 16px 16px;
            gap: 12px;
          }

          .faq-question-title {
            font-size: 0.94rem;
            line-height: 1.4;
          }

          .faq-chevron-wrap {
            width: 28px;
            height: 28px;
            min-width: 28px;
          }

          .faq-answer-pane {
            padding: 14px 16px 18px 16px;
          }

          .faq-answer-prose {
            font-size: 0.89rem;
            line-height: 1.65;
          }

          .faq-takeaway-card {
            padding: 10px 14px;
          }

          .faq-takeaway-text {
            font-size: 0.84rem;
          }

          .faq-card-action-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }

          .faq-copy-btn,
          .faq-wa-link {
            width: 100%;
            justify-content: center;
            padding: 9px 12px;
          }

          .faq-contact-card {
            padding: 18px 16px;
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .faq-contact-left {
            flex: initial;
            gap: 12px;
          }

          .faq-contact-title {
            font-size: 0.98rem;
          }

          .faq-contact-desc {
            font-size: 0.84rem;
          }

          .faq-contact-wa-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
