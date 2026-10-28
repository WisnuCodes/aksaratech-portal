import React, { useState, useMemo } from 'react';
import PageHeader from '../components/molecules/PageHeader';
import { FAQS, BUSINESS_INFO } from '../data/catalogData';
import { HelpCircle, Search, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIdx, setOpenIdx] = useState(0);

  const filteredFaqs = useMemo(() => {
    if (!searchTerm.trim()) return FAQS;
    const q = searchTerm.toLowerCase();
    return FAQS.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [searchTerm]);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <div className="faq-page" style={{ background: '#F8FAFC' }}>
      <PageHeader
        breadcrumbs={[{ label: 'Tanya Jawab Resmi (FAQ)' }]}
        badge="Pusat Informasi &amp; FAQ"
        badgeIcon={HelpCircle}
        title="Pertanyaan yang Sering"
        highlightText="Diajukan Calon Klien"
        description="Temukan jawaban transparan terkait batasan layanan server, tata kelola kuota 3 kali revisi, jaminan kerahasiaan data 100%, dan skema termin pembayaran."
      />

      <section className="section-padding">
        <div className="container">
          
          {/* Search Bar */}
          <div style={{ maxWidth: '640px', margin: '0 auto 48px auto', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            <input
              type="text"
              placeholder="Cari pertanyaan (contoh: hosting, kuota revisi, DP, skripsi)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '44px', background: '#FFFFFF', color: '#0F172A', border: '2px solid #0F172A', boxShadow: '3px 3px 0px #CBD5E1' }}
            />
          </div>

          {/* FAQ Accordion List */}
          <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '64px' }}>
            {filteredFaqs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#64748B', fontWeight: '600' }}>
                Tidak ditemukan pertanyaan yang cocok dengan "{searchTerm}". Silakan hubungi kami langsung via WhatsApp.
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div
                    key={idx}
                    className="neo-card"
                    style={{
                      padding: 0,
                      overflow: 'hidden',
                      background: '#FFFFFF',
                      border: '2px solid #0F172A',
                      boxShadow: isOpen ? '4px 4px 0px var(--prussian-blue)' : '3px 3px 0px #CBD5E1'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      style={{
                        width: '100%',
                        padding: '22px 28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        color: '#0F172A',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.05rem',
                        fontWeight: '800'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span style={{ color: 'var(--prussian-blue)', fontWeight: '900' }}>Q.</span>
                        {faq.q}
                      </span>
                      <div style={{ color: isOpen ? 'var(--prussian-blue)' : '#64748B', flexShrink: 0, marginLeft: '12px' }}>
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </button>

                    {isOpen && (
                      <div style={{
                        padding: '0 28px 24px 52px',
                        color: '#334155',
                        fontSize: '0.94rem',
                        lineHeight: '1.75',
                        borderTop: '2px solid #E2E8F0',
                        paddingTop: '16px',
                        fontWeight: '500'
                      }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Contact Support Strip */}
          <div style={{
            maxWidth: '880px',
            margin: '0 auto',
            background: '#FFFFFF',
            border: '2px solid #0F172A',
            boxShadow: '5px 5px 0px var(--prussian-blue)',
            borderRadius: 'var(--radius-md)',
            padding: '28px 32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px'
          }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0F172A', marginBottom: '4px' }}>
                Punya Pertanyaan Spesifik Terkait Sistem Anda?
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0, fontWeight: '500' }}>
                Konsultasikan langsung dengan tim pengembang Aksara Tech secara gratis melalui saluran resmi.
              </p>
            </div>
            <a
              href={`https://wa.me/${BUSINESS_INFO.waNumber}?text=Halo%20Aksara%20Tech,%20saya%20memiliki%20pertanyaan%20terkait%20layanan%20rekayasa%20website.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa"
            >
              <MessageCircle size={18} />
              <span>Tanya Tim Teknis via WA</span>
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
