import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, MessageCircle, CheckCircle2 } from 'lucide-react';
import { FAQS, BUSINESS_INFO } from '../../data/catalogData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // first open by default

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="section-padding faq-section" style={{ background: '#F8FAFC', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            Pertanyaan yang <span style={{ color: 'var(--prussian-blue)' }}>Sering Diajukan</span> Calon Klien
          </h2>
          <p className="section-desc">
            Pahami batasan layanan server hosting, tata kelola kuota 3 kali revisi mutlak, garansi 7 hari, dan skema pembayaran sebelum memulai proyek.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-list-container">
          {FAQS.slice(0, 5).map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.id || idx}
                className={`faq-card ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
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

                {isOpen && (
                  <div className="faq-answer-pane">
                    <p className="faq-answer-prose">
                      {faq.a}
                    </p>

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
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View All FAQs CTA Banner */}
        <div className="faq-bottom-cta">
          <div className="faq-bottom-cta-text">
            <div className="faq-bottom-cta-icon-wrap">
              <HelpCircle size={20} />
            </div>
            <div>
              <h4 className="faq-bottom-cta-title">
                Ingin Membaca Ketentuan Layanan &amp; Tanya Jawab Lengkap?
              </h4>
              <p className="faq-bottom-cta-desc">
                Pelajari rincian teknis deliverable kode, kebijakan privasi data, atau diskusikan kebutuhan sistem Anda langsung dengan tim kami.
              </p>
            </div>
          </div>

          <div className="faq-bottom-cta-actions">
            <Link 
              to="/faq" 
              className="btn btn-primary btn-sm faq-cta-btn"
            >
              <span>Buka Halaman FAQ Lengkap</span>
            </Link>
            
            <a 
              href={`https://wa.me/${BUSINESS_INFO.waNumber}?text=Halo%20Aksara%20Tech,%20saya%20ingin%20tanya%20jawab%20terkait%20layanan%20website.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm faq-cta-btn"
            >
              <MessageCircle size={15} style={{ color: '#059669' }} />
              <span>Tanya via WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

      {/* Embedded Responsive Scoped CSS */}
      <style>{`
        .faq-list-container {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
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

        /* Bottom Callout Banner */
        .faq-bottom-cta {
          max-width: 860px;
          margin: 32px auto 0 auto;
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 22px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .faq-bottom-cta-text {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          flex: 1 1 380px;
        }

        .faq-bottom-cta-icon-wrap {
          width: 40px;
          height: 40px;
          min-width: 40px;
          border-radius: 8px;
          background: #F1F5F9;
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0F172A;
          flex-shrink: 0;
        }

        .faq-bottom-cta-title {
          font-size: 0.98rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 4px 0;
          line-height: 1.4;
        }

        .faq-bottom-cta-desc {
          font-size: 0.86rem;
          color: #475569;
          margin: 0;
          line-height: 1.55;
          font-weight: 500;
        }

        .faq-bottom-cta-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* Mobile Adjustments (<= 640px) */
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

          .faq-bottom-cta {
            padding: 18px 16px;
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .faq-bottom-cta-text {
            flex: initial;
            gap: 12px;
          }

          .faq-bottom-cta-title {
            font-size: 0.94rem;
          }

          .faq-bottom-cta-desc {
            font-size: 0.82rem;
          }

          .faq-bottom-cta-actions {
            flex-direction: column;
            width: 100%;
            gap: 8px;
          }

          .faq-cta-btn {
            width: 100%;
            justify-content: center;
            padding: 11px 16px !important;
            font-size: 0.88rem !important;
          }
        }
      `}</style>
    </section>
  );
}
