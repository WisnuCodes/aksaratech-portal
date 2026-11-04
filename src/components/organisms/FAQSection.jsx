import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { FAQS, BUSINESS_INFO } from '../../data/catalogData';
import SectionBadge from '../atoms/SectionBadge';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // first open by default

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="section-padding" style={{ background: '#F8FAFC', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Pertanyaan yang <span style={{ color: 'var(--prussian-blue)' }}>Sering Diajukan</span> Calon Klien
          </h2>
          <p className="section-desc">
            Pahami batasan layanan server hosting, tata kelola kuota 3 kali revisi mutlak, garansi 7 hari, dan skema pembayaran sebelum memulai proyek.
          </p>
        </div>

        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {FAQS.slice(0, 5).map((faq, idx) => {
            const isOpen = openIndex === idx;
            
            const takeawayBorderColor = 
              faq.takeawayType === 'warning' ? '#F59E0B' :
              faq.takeawayType === 'success' ? '#10B981' : 'var(--prussian-blue)';

            const takeawayBg = 
              faq.takeawayType === 'warning' ? '#FFFBEB' :
              faq.takeawayType === 'success' ? '#ECFDF5' : '#F0F5FF';

            return (
              <div
                key={faq.id || idx}
                className="faq-home-card neo-card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  background: '#FFFFFF',
                  borderColor: 'var(--border-subtle)', borderWidth: '1px', 
                  transition: 'all 0.15s ease'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
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
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: '900',
                      fontSize: '0.85rem',
                      marginTop: '2px',
                      flexShrink: 0
                    }}
                  >
                    Q
                  </div>

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
                      border: '1px solid var(--border-subtle)',
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

                {isOpen && (
                  <div 
                    style={{
                      padding: '16px',
                      borderTop: '1px solid var(--border-subtle)',
                      background: '#FFFFFF'
                    }}
                  >
                    <div 
                      style={{
                        color: '#334155',
                        fontSize: '0.92rem',
                        lineHeight: '1.7',
                        fontWeight: '500',
                        marginBottom: faq.takeaway ? '14px' : 0
                      }}
                    >
                      {faq.a}
                    </div>

                    {faq.takeaway && (
                      <div 
                        style={{
                          background: takeawayBg,
                          borderLeft: `4px solid ${takeawayBorderColor}`,
                          borderTop: '1px solid #E2E8F0',
                          borderRight: '1px solid #E2E8F0',
                          borderBottom: '1px solid #E2E8F0',
                          borderRadius: '4px',
                          padding: '10px 14px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: '900', color: takeawayBorderColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Poin Kunci:
                          </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.86rem', color: '#0F172A', fontWeight: '600', lineHeight: '1.5' }}>
                          {faq.takeaway}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View All FAQs CTA Banner */}
        <div 
          style={{ 
            maxWidth: '860px', 
            margin: '32px auto 0 auto', 
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: '16px',
            background: '#FFFFFF',
            border: '2px solid #0F172A',
            
            borderRadius: 'var(--radius-md)',
            padding: '18px 20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} style={{ color: 'var(--prussian-blue)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0F172A' }}>
              Ingin membaca seluruh ketentuan layanan dan tanya jawab lengkap?
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', justifyContent: 'flex-start' }} className="faq-cta-buttons">
            <Link 
              to="/faq" 
              className="btn btn-primary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
            >
              <span>Buka Halaman FAQ Lengkap</span>
              <ArrowRight size={14} />
            </Link>
            
            <a 
              href={`https://wa.me/${BUSINESS_INFO.waNumber}?text=Halo%20Aksara%20Tech,%20saya%20ingin%20tanya%20jawab%20terkait%20layanan%20website.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
            >
              <MessageCircle size={14} style={{ color: '#059669' }} />
              <span>Tanya via WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 640px) {
          .faq-home-card button {
            padding: 18px 22px !important;
          }
          .faq-home-card button h3 {
            font-size: 1.04rem !important;
          }
          .faq-home-card > div:last-child {
            padding: 18px 22px 20px 22px !important;
          }
          .faq-cta-buttons {
            width: auto !important;
            justify-content: flex-end !important;
          }
        }

        @media (max-width: 480px) {
          .faq-cta-buttons {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .faq-cta-buttons > * {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
