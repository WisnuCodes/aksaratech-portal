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
      <section className="section-padding" style={{ paddingTop: '40px', paddingBottom: '96px', background: '#FFFFFF', borderTop: '2px solid #0F172A' }}>
        <div className="container">
          <div style={{
            background: '#F0F5FF',
            border: '2px solid #0F172A',
            borderRadius: 'var(--radius-md)',
            padding: '48px 36px',
            textAlign: 'center',
            boxShadow: '6px 6px 0px var(--kuning)',
            position: 'relative'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '6px',
              fontSize: '0.84rem',
              fontWeight: '800',
              background: 'var(--kuning)',
              color: '#0F172A',
              border: '2px solid #0F172A',
              boxShadow: '2px 2px 0px #0F172A',
              marginBottom: '20px'
            }}>
              <Shield size={16} /> Mulai Kolaborasi Tanpa Risiko
            </div>

            <h2 style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.7rem)', fontWeight: '900', marginBottom: '16px', color: '#0F172A' }}>
              Konsultasikan Kebutuhan Sistem Anda Bersama <span style={{ color: 'var(--prussian-blue)' }}>Aksara Tech</span>
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#334155', maxWidth: '720px', margin: '0 auto 36px auto', lineHeight: '1.7', fontWeight: '500' }}>
              Dapatkan draf Surat Penawaran resmi, spesifikasi arsitektur yang terukur, dan kepastian tarif transparan (plafon maksimal Rp 650.000) dengan fasilitas kuota revisi maksimal 3 kali mutlak.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <Link to="/pesan" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
                <span>Isi Lembar Kebutuhan Proyek</span>
                <ArrowRight size={18} />
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
                <FileText size={18} style={{ color: 'var(--prussian-blue)' }} />
                <span>Bandingkan 5 Paket Layanan</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
