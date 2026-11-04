import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/organisms/HeroSection';
import WhyChooseUsSection from '../components/organisms/WhyChooseUsSection';
import PackageShowcase from '../components/organisms/PackageShowcase';
import TestimonialsSection from '../components/organisms/TestimonialsSection';
import ServerExclusionBanner from '../components/organisms/ServerExclusionBanner';
import WorkflowSOP from '../components/organisms/WorkflowSOP';
import TechStackSection from '../components/organisms/TechStackSection';
import FAQSection from '../components/organisms/FAQSection';
import { ArrowRight, FileText, Shield, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/catalogData';

export default function HomePage({ onSelectPackage }) {
  return (
    <div className="home-page" style={{ background: '#F8FAFC' }}>
      {/* 1. Hero Section with Key Metrics */}
      <HeroSection />

      {/* 2. Value Propositions & Pillars (Mengapa Aksara Tech) */}
      <WhyChooseUsSection />

      {/* 3. Package Showcase Snapshot */}
      <PackageShowcase onSelectPackage={onSelectPackage} />

      {/* 4. Client Testimonials & Track Record */}
      <TestimonialsSection />

      {/* 5. 4-Step Operational SOP & Governance */}
      <WorkflowSOP />

      {/* 6. Dedicated Server Exclusion Scope Banner */}
      <ServerExclusionBanner />

      {/* 7. Architecture & Official Tech Stacks */}
      <TechStackSection />

      {/* 8. Frequently Asked Questions */}
      <FAQSection />

      {/* 9. Conversion Banner Section */}
      <section className="section-padding" style={{ paddingTop: '40px', paddingBottom: '96px', background: '#FFFFFF', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{
            background: '#F8FAFC',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '48px 36px',
            textAlign: 'center',
            
            position: 'relative'
          }}>
            

            <h2 style={{ fontSize: 'clamp(1.5rem, 3.4vw, 2.3rem)', fontWeight: '900', marginBottom: '16px', color: '#0F172A' }}>
              Konsultasi Sistem Bersama <span style={{ color: 'var(--prussian-blue)' }}>Aksara Tech</span>
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#334155', maxWidth: '720px', margin: '0 auto 36px auto', lineHeight: '1.7', fontWeight: '500' }}>
              Dapatkan draf Surat Penawaran resmi, spesifikasi arsitektur yang terukur, kepastian tarif transparan (plafon maksimal Rp 500.000), fasilitas kuota revisi maksimal 3 kali mutlak, serta garansi bug kode 1 minggu.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <Link to="/pesan" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
                <span>Isi Lembar Kebutuhan Proyek</span>
              </Link>
              <a
                href={`https://wa.me/${BUSINESS_INFO.waNumber}?text=Halo%20Aksara%20Tech,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20rekayasa%20website.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
                style={{ padding: '14px 28px', fontSize: '1rem' }}
              >
                <MessageCircle size={18} />
                <span>Konsultasi WhatsApp Langsung</span>
              </a>
              <Link to="/paket" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                <FileText size={18} style={{ color: '#0F172A' }} />
                <span>Bandingkan 6 Klasifikasi Paket</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
