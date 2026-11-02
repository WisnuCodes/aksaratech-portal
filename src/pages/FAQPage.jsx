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
  Sparkles, 
  X,
  Server,
  Layers,
  CreditCard,
  Lock,
  FileCheck
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
      <div style={{
        background: '#FFFFFF',
        borderBottom: '2px solid #0F172A',
        padding: '14px 0',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'nowrap', minWidth: 'max-content' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--prussian-blue)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '6px', marginRight: '6px' }}>
            <Sparkles size={14} /> Standar Layanan:
          </span>
          <span className="faq-quick-pill">
            <ShieldCheck size={13} style={{ color: '#10B981' }} />
            <span>Garansi 7 Hari Kalender</span>
          </span>
          <span className="faq-quick-pill">
            <Clock size={13} style={{ color: '#F59E0B' }} />
            <span>Kuota Max 3x Revisi Mutlak</span>
          </span>
          <span className="faq-quick-pill">
            <Lock size={13} style={{ color: '#1D63FF' }} />
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
          <div style={{ marginBottom: '24px' }}>
            <div style={{ position: 'relative', width: '100%', marginBottom: '16px' }}>
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
                placeholder="Cari topik (hosting, kuota revisi, garansi, skripsi, DP)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
                style={{ 
                  paddingLeft: '44px', 
                  paddingRight: searchTerm ? '42px' : '16px',
                  background: '#FFFFFF', 
                  color: '#0F172A', 
                  border: '2px solid #0F172A', 
                  boxShadow: '3px 3px 0px #CBD5E1',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.95rem',
                  fontWeight: '600'
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  aria-label="Hapus pencarian"
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#E2E8F0',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#0F172A'
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category Filter Chips - Mobile First Horizontal Scrolling */}
            <div 
              className="faq-category-scroll"
              style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '8px',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none'
              }}
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.key;
                const IconComp = cat.icon;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-full)',
                      border: '2px solid #0F172A',
                      background: isActive ? '#0F172A' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#0F172A',
                      boxShadow: isActive ? '2px 2px 0px var(--kuning)' : '2px 2px 0px #E2E8F0',
                      fontSize: '0.82rem',
                      fontWeight: '800',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      flexShrink: 0
                    }}
                  >
                    <IconComp size={14} style={{ color: isActive ? 'var(--kuning)' : 'var(--prussian-blue)' }} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Status & Bulk Expand/Collapse Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              paddingTop: '10px',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '14px'
            }}>
              <span style={{ fontSize: '0.84rem', color: '#475569', fontWeight: '700' }}>
                Menampilkan <strong style={{ color: '#0F172A' }}>{filteredFaqs.length}</strong> pertanyaan resmi
                {selectedCategory !== 'all' && <span> • Kategori: <em>{selectedCategory}</em></span>}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={expandAll}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--prussian-blue)',
                    fontSize: '0.82rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}
                >
                  Buka Semua
                </button>
                <span style={{ color: '#CBD5E1' }}>|</span>
                <button
                  type="button"
                  onClick={collapseAll}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#64748B',
                    fontSize: '0.82rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}
                >
                  Tutup Semua
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '48px' }}>
            {filteredFaqs.length === 0 ? (
              <div 
                className="neo-card"
                style={{ 
                  textAlign: 'center', 
                  padding: '48px 24px', 
                  background: '#FFFFFF',
                  border: '2px dashed #0F172A',
                  boxShadow: 'none'
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#F1F5F9',
                  border: '2px solid #0F172A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  color: '#64748B'
                }}>
                  <Search size={24} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
                  Tidak Ada Pertanyaan yang Cocok
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 20px auto', lineHeight: '1.6' }}>
                  Kata kunci "<strong>{searchTerm}</strong>" tidak ditemukan dalam daftar FAQ resmi. Silakan reset filter atau tanyakan langsung ke tim kami.
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
                
                // Color coding for takeaways
                const takeawayBorderColor = 
                  faq.takeawayType === 'warning' ? '#F59E0B' :
                  faq.takeawayType === 'success' ? '#10B981' : 'var(--prussian-blue)';

                const takeawayBg = 
                  faq.takeawayType === 'warning' ? '#FFFBEB' :
                  faq.takeawayType === 'success' ? '#ECFDF5' : '#F0F5FF';

                return (
                  <div
                    key={faq.id || idx}
                    className="faq-accordion-card neo-card"
                    style={{
                      padding: 0,
                      overflow: 'hidden',
                      background: '#FFFFFF',
                      border: '2px solid #0F172A',
                      boxShadow: isOpen ? '4px 4px 0px var(--prussian-blue)' : '2px 2px 0px #0F172A',
                      transition: 'box-shadow 0.15s ease, transform 0.15s ease'
                    }}
                  >
                    {/* Header Button */}
                    <button
                      type="button"
                      onClick={() => toggleIndex(idx)}
                      aria-expanded={isOpen}
                      style={{
                        width: '100%',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        background: isOpen ? '#F8FAFC' : '#FFFFFF',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        color: '#0F172A',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      {/* Stylized Q Badge */}
                      <div 
                        style={{
                          width: '28px',
                          height: '28px',
                          minWidth: '28px',
                          borderRadius: '6px',
                          background: isOpen ? 'var(--prussian-blue)' : '#F1F5F9',
                          color: isOpen ? '#FFFFFF' : '#0F172A',
                          border: '1.5px solid #0F172A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: '900',
                          fontSize: '0.85rem',
                          marginTop: '2px',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        Q
                      </div>

                      {/* Question Content & Meta Tag */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {faq.badge && (
                          <div style={{ marginBottom: '4px' }}>
                            <span 
                              style={{
                                display: 'inline-block',
                                fontSize: '0.7rem',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                color: 'var(--prussian-blue)',
                                background: '#EBF2FF',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                border: '1px solid rgba(29, 99, 255, 0.2)'
                              }}
                            >
                              {faq.badge}
                            </span>
                          </div>
                        )}
                        <h3 
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.98rem',
                            fontWeight: '800',
                            lineHeight: '1.45',
                            color: '#0F172A',
                            margin: 0
                          }}
                        >
                          {faq.q}
                        </h3>
                      </div>

                      {/* Rotating Chevron Toggle Button */}
                      <div 
                        style={{
                          width: '28px',
                          height: '28px',
                          minWidth: '28px',
                          borderRadius: '50%',
                          background: isOpen ? 'var(--kuning)' : '#F8FAFC',
                          border: '1.5px solid #0F172A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#0F172A',
                          marginTop: '2px',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.15s ease',
                          flexShrink: 0
                        }}
                      >
                        <ChevronDown size={16} />
                      </div>
                    </button>

                    {/* Collapsible Answer Body */}
                    {isOpen && (
                      <div 
                        style={{
                          padding: '16px',
                          borderTop: '2px solid #0F172A',
                          background: '#FFFFFF'
                        }}
                      >
                        {/* Full Answer Prose */}
                        <div 
                          style={{
                            color: '#334155',
                            fontSize: '0.92rem',
                            lineHeight: '1.7',
                            fontWeight: '500',
                            marginBottom: '16px'
                          }}
                        >
                          {faq.a}
                        </div>

                        {/* Executive Summary / Key Takeaway Card */}
                        {faq.takeaway && (
                          <div 
                            style={{
                              background: takeawayBg,
                              borderLeft: `4px solid ${takeawayBorderColor}`,
                              borderTop: '1px solid #E2E8F0',
                              borderRight: '1px solid #E2E8F0',
                              borderBottom: '1px solid #E2E8F0',
                              borderRadius: '4px',
                              padding: '10px 14px',
                              marginBottom: '16px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                              <span style={{ fontSize: '0.72rem', fontWeight: '900', color: takeawayBorderColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                Poin Ringkasan Eksekutif
                              </span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.86rem', color: '#0F172A', fontWeight: '600', lineHeight: '1.5' }}>
                              {faq.takeaway}
                            </p>
                          </div>
                        )}

                        {/* Interactive Action Bar (Copy & WA Query) */}
                        <div 
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '8px',
                            paddingTop: '12px',
                            borderTop: '1px dashed #E2E8F0'
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => handleCopy(faq, idx)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: isCopied ? '#ECFDF5' : '#F1F5F9',
                              color: isCopied ? '#059669' : '#475569',
                              border: isCopied ? '1px solid #10B981' : '1px solid #CBD5E1',
                              padding: '6px 12px',
                              borderRadius: 'var(--radius-sm)',
                              fontSize: '0.78rem',
                              fontWeight: '700',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {isCopied ? <Check size={13} /> : <Copy size={13} />}
                            <span>{isCopied ? 'Tersalin!' : 'Salin Jawaban'}</span>
                          </button>

                          <a
                            href={`https://wa.me/${BUSINESS_INFO.waNumber}?text=${encodeURIComponent(`Halo Aksara Tech, saya ingin konsultasi lebih lanjut terkait FAQ: "${faq.q}"`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: '#FFFFFF',
                              color: '#059669',
                              border: '1px solid #059669',
                              padding: '6px 12px',
                              borderRadius: 'var(--radius-sm)',
                              fontSize: '0.78rem',
                              fontWeight: '700',
                              textDecoration: 'none'
                            }}
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

          {/* Contact Support Strip - Mobile Redesigned Card */}
          <div 
            className="neo-card"
            style={{
              background: '#FFFFFF',
              border: '2px solid #0F172A',
              boxShadow: '4px 4px 0px var(--prussian-blue)',
              borderRadius: 'var(--radius-md)',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div 
                style={{
                  width: '44px',
                  height: '44px',
                  minWidth: '44px',
                  borderRadius: '10px',
                  background: '#ECFDF5',
                  border: '2px solid #0F172A',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '2px 2px 0px #0F172A'
                }}
              >
                <MessageCircle size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', fontWeight: '900', color: '#059669', background: '#D1FAE5', padding: '2px 8px', borderRadius: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669' }}></span>
                    Tim Teknis Siaga
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '600' }}>
                    08.00 – 22.00 WIB
                  </span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A', marginBottom: '4px', lineHeight: '1.3' }}>
                  Punya Pertanyaan Spesifik Terkait Sistem Anda?
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, fontWeight: '500', lineHeight: '1.6' }}>
                  Konsultasikan rancangan sistem, skripsi, atau kebutuhan bisnis langsung dengan lead developer kami secara gratis tanpa komitmen.
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${BUSINESS_INFO.waNumber}?text=Halo%20Aksara%20Tech,%20saya%20ingin%20konsultasi%20langsung%20terkait%20layanan%20pembuatan%20website.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 20px',
                fontSize: '0.92rem',
                fontWeight: '800'
              }}
            >
              <MessageCircle size={18} />
              <span>Hubungi Tim Pengembang Resmi via WA</span>
            </a>
          </div>

        </div>
      </section>

      {/* Embedded Mobile Polish Stylesheet */}
      <style>{`
        .faq-quick-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #F8FAFC;
          border: 1.5px solid #0F172A;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 0.76rem;
          font-weight: 700;
          color: #0F172A;
          box-shadow: 1.5px 1.5px 0px #CBD5E1;
          white-space: nowrap;
        }

        @media (min-width: 640px) {
          .faq-accordion-card button {
            padding: 18px 22px !important;
          }
          .faq-accordion-card button h3 {
            font-size: 1.05rem !important;
          }
          .faq-accordion-card > div:last-child {
            padding: 20px 22px 22px 22px !important;
          }
          .faq-page .neo-card.contact-card {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
          }
          .faq-page .neo-card.contact-card .btn-wa {
            width: auto !important;
          }
        }

        @media (max-width: 480px) {
          .faq-quick-pill {
            font-size: 0.72rem;
            padding: 3px 8px;
          }
          .faq-category-scroll button {
            font-size: 0.78rem !important;
            padding: 7px 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
