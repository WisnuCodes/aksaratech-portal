import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../../data/catalogData';
import SectionBadge from '../atoms/SectionBadge';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // first open by default

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="section-padding" style={{ background: '#F8FAFC', borderTop: '2px solid #0F172A' }}>
      <div className="container">
        <div className="section-header">
          <SectionBadge icon={HelpCircle}>
            Tanya Jawab Resmi
          </SectionBadge>
          <h2 className="section-title">
            Pertanyaan yang <span style={{ color: 'var(--prussian-blue)' }}>Sering Diajukan</span>
          </h2>
          <p className="section-desc">
            Pahami batasan layanan, skema kuota 3 kali revisi, jaminan kerahasiaan data, dan prosedur pembayaran sebelum memulai pesanan.
          </p>
        </div>

        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="neo-card"
                style={{
                  padding: '0',
                  overflow: 'hidden',
                  background: '#FFFFFF',
                  borderColor: isOpen ? '#0F172A' : '#0F172A',
                  boxShadow: isOpen ? '4px 4px 0px var(--kuning)' : '3px 3px 0px #0F172A',
                  transition: 'all 0.15s ease'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: isOpen ? '#FFFDF0' : '#FFFFFF',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: '#0F172A',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.02rem',
                    fontWeight: '800'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: 'var(--prussian-blue)', fontWeight: '900' }}>Q.</span>
                    {faq.q}
                  </span>
                  <div style={{ color: isOpen ? 'var(--prussian-blue)' : '#64748B', flexShrink: 0, marginLeft: '12px' }}>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 24px 22px 48px',
                    color: '#334155',
                    fontSize: '0.94rem',
                    lineHeight: '1.7',
                    borderTop: '2px solid #0F172A',
                    paddingTop: '16px',
                    background: '#FFFFFF'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
