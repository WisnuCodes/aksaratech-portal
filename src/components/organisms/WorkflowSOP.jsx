import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, FileCheck, FileCode, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';

export default function WorkflowSOP() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const detailedSteps = [
    {
      step: 1,
      shortTitle: "Pilih Paket",
      title: "Jelajahi Paket & Plafon Tarif",
      badge: "Transparansi Biaya",
      desc: "Calon Klien memilih 1 dari 6 klasifikasi paket resmi (Rp 100.000 – Rp 500.000) dengan estimasi pengerjaan disiplin 1–10 hari kerja tanpa risiko lonjakan biaya di tengah jalan.",
      icon: Layers
    },
    {
      step: 2,
      shortTitle: "Isi Brief",
      title: "Pengisian Brief Kebutuhan Terstruktur",
      badge: "Formulir Cerdas Web",
      desc: "Mengisi spesifikasi teknis (database MySQL, modul CRUD, dokumen SRS/SDD formal, diagram UML, preferensi visual) melalui sistem formulir website.",
      icon: FileCheck
    },
    {
      step: 3,
      shortTitle: "Penawaran",
      title: "Analisis Teknis & Surat Penawaran Resmi",
      badge: "Nomor Dokumen Valid",
      desc: "Aksara Tech menerbitkan Surat Penawaran Harga resmi [OFFER-AT-2026-____] via WhatsApp 085600386692 memuat ruang lingkup kerja, jadwal rilis, dan syarat DP min 50%.",
      icon: FileCode
    },
    {
      step: 4,
      shortTitle: "Koding & Rilis",
      title: "Pengerjaan, Kuota 3x Revisi & Serah Terima",
      badge: "Disiplin & Terpercaya",
      desc: "Penulisan kode dimulai pasca verifikasi DP. Tersedia fasilitas MAKSIMAL 3 KALI REVISI mutlak pasca Preview 1. Pelunasan 50% sebelum serah terima master (.zip, .sql, PDF) & garansi bug 1 minggu.",
      icon: ShieldCheck
    }
  ];

  return (
    <section id="alur" className="section-padding workflow-sop-section" style={{ background: '#F8FAFC', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            Alur Pengerjaan Proyek yang <span style={{ color: 'var(--prussian-blue)' }}>Terstruktur &amp; Disiplin</span>
          </h2>
          <p className="section-desc">
            Setiap tahap dirancang demi melindungi hak kedua belah pihak, menjamin kejelasan ruang lingkup kerja, dan memastikan proyek selesai tepat waktu.
          </p>
        </div>

        {/* Mobile Horizontal Step Tabs Bar */}
        <div className="sop-mobile-tab-bar">
          <div className="sop-mobile-tabs">
            {detailedSteps.map((step, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStepIdx(idx)}
                className={`sop-mobile-pill ${activeStepIdx === idx ? 'active' : ''}`}
                aria-label={`Buka Tahap ${idx + 1}: ${step.shortTitle}`}
              >
                <span className="sop-pill-num">{idx + 1}.</span>
                <span className="sop-pill-title">{step.shortTitle}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Steps Grid (Desktop: 4 Cards in Row, Mobile: Interactive Step Card) */}
        <div className="sop-steps-grid">
          {detailedSteps.map((step, idx) => {
            const Icon = step.icon;
            const isMobileActive = activeStepIdx === idx;
            return (
              <div
                key={idx}
                className={`neo-card sop-step-card ${isMobileActive ? 'mobile-active' : ''}`}
              >
                <div>
                  <div className="sop-card-top">
                    <div className="sop-icon-wrap">
                      <Icon size={20} />
                    </div>
                    <span className="sop-step-tag">Tahap {idx + 1}</span>
                  </div>

                  <div className="sop-badge-wrap">
                    <span className="sop-card-badge">{step.badge}</span>
                  </div>

                  <h3 className="sop-card-title">
                    {step.title}
                  </h3>

                  <p className="sop-card-desc">
                    {step.desc}
                  </p>
                </div>

                <div className="sop-card-footer">
                  <span className="sop-step-indicator">
                    Tahap {idx + 1} dari 4
                  </span>

                  {/* Mobile Stepper Controls */}
                  <div className="sop-mobile-card-nav">
                    <button
                      type="button"
                      onClick={() => setActiveStepIdx(Math.max(0, activeStepIdx - 1))}
                      disabled={activeStepIdx === 0}
                      className="sop-nav-btn"
                      aria-label="Tahap Sebelumnya"
                    >
                      <ChevronLeft size={15} />
                      <span>Sebelumnya</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStepIdx(Math.min(detailedSteps.length - 1, activeStepIdx + 1))}
                      disabled={activeStepIdx === detailedSteps.length - 1}
                      className="sop-nav-btn sop-nav-btn-primary"
                      aria-label="Tahap Selanjutnya"
                    >
                      <span>Selanjutnya</span>
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SOP Callout Card */}
        <div className="sop-callout-card neo-card">
          <div className="callout-left">
            <h3 className="callout-title">
              Pemberlakuan Kuota Maksimal 3x Revisi Resmi
            </h3>
            <p className="callout-desc">
              Penghitungan kuota dimulai setelah Klien menerima Preview 1. Seluruh koreksi wajib dikumpulkan secara tertulis dalam satu daftar poin (<em>bullet points</em>) lengkap per siklus demi menjaga target rilis 1–10 hari kerja.
            </p>
          </div>
          <div className="callout-right">
            <Link to="/alur-sop" className="btn btn-primary sop-callout-btn">
              <span>Lihat Detail Alur SOP</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Embedded Responsive CSS */}
      <style>{`
        .sop-mobile-tab-bar {
          display: none;
        }

        .sop-steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 36px;
        }

        .sop-step-card {
          padding: 24px 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-radius: var(--radius-md);
          transition: border-color 0.18s ease, transform 0.18s ease;
        }

        .sop-step-card:hover {
          border-color: #0F172A;
          transform: translateY(-2px);
        }

        .sop-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .sop-step-tag {
          font-size: 0.76rem;
          font-weight: 800;
          color: var(--prussian-blue);
          background: #EFF6FF;
          padding: 3px 9px;
          border-radius: 6px;
          letter-spacing: 0.02em;
        }

        .sop-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #F8FAFC;
          border: 1.5px solid #CBD5E1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0F172A;
        }

        .sop-badge-wrap {
          margin-bottom: 10px;
        }

        .sop-card-badge {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
          background: #F1F5F9;
          border: 1.5px solid #CBD5E1;
          color: #0F172A;
          display: inline-block;
        }

        .sop-card-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 8px;
          line-height: 1.35;
        }

        .sop-card-desc {
          font-size: 0.85rem;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .sop-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 14px;
        }

        .sop-step-indicator {
          font-size: 0.76rem;
          font-weight: 800;
          color: #64748B;
          font-family: var(--font-body);
        }

        .sop-mobile-card-nav {
          display: none;
        }

        /* SOP Callout Card */
        .sop-callout-card {
          background: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-radius: var(--radius-md);
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }

        .callout-left {
          flex: 1;
          min-width: 0;
          max-width: 720px;
        }

        .callout-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .callout-desc {
          font-size: 0.9rem;
          color: #334155;
          line-height: 1.6;
          margin: 0;
        }

        .callout-right {
          flex-shrink: 0;
        }

        .sop-callout-btn {
          padding: 13px 26px;
          font-size: 0.95rem;
          font-weight: 800;
          border-radius: 8px;
          white-space: nowrap;
          transition: transform 0.18s ease, background-color 0.18s ease;
        }

        .sop-callout-btn:hover {
          transform: translateY(-1px);
        }

        /* Tablet Responsive (< 1040px) */
        @media (max-width: 1040px) {
          .sop-steps-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        /* Mobile Responsive (< 768px) */
        @media (max-width: 768px) {
          .workflow-sop-section {
            padding-top: 40px !important;
            padding-bottom: 48px !important;
          }

          .sop-mobile-tab-bar {
            display: block;
            margin-bottom: 14px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 4px;
            scrollbar-width: none;
          }

          .sop-mobile-tab-bar::-webkit-scrollbar {
            display: none;
          }

          .sop-mobile-tabs {
            display: flex;
            gap: 8px;
            width: 100%;
          }

          .sop-mobile-pill {
            flex: 1;
            min-width: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            padding: 8px 6px;
            background: #FFFFFF;
            border: 1.5px solid #CBD5E1;
            border-radius: 8px;
            font-size: 0.74rem;
            font-weight: 700;
            color: #475569;
            cursor: pointer;
            white-space: nowrap;
            transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
          }

          .sop-mobile-pill .sop-pill-num {
            color: var(--prussian-blue);
            font-weight: 800;
            font-size: 0.72rem;
          }

          .sop-mobile-pill.active {
            background: #0F172A;
            border-color: #0F172A;
            color: #FFFFFF;
          }

          .sop-mobile-pill.active .sop-pill-num {
            color: #93C5FD;
          }

          .sop-steps-grid {
            grid-template-columns: 1fr;
            gap: 14px;
            margin-bottom: 24px;
          }

          .sop-step-card {
            display: none;
          }

          .sop-step-card.mobile-active {
            display: flex;
            padding: 18px 16px;
            border-radius: 10px;
          }

          .sop-card-top {
            margin-bottom: 12px;
          }

          .sop-card-title {
            font-size: 1rem;
            margin-bottom: 6px;
          }

          .sop-card-desc {
            font-size: 0.82rem;
            line-height: 1.55;
            margin-bottom: 16px;
          }

          .sop-card-footer {
            padding-top: 12px;
          }

          .sop-mobile-card-nav {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .sop-nav-btn {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 7px 11px;
            border-radius: 6px;
            font-size: 0.76rem;
            font-weight: 700;
            cursor: pointer;
            background: #FFFFFF;
            border: 1.5px solid #CBD5E1;
            color: #0F172A;
            transition: background-color 0.15s ease, border-color 0.15s ease;
          }

          .sop-nav-btn:hover:not(:disabled) {
            background: #F1F5F9;
            border-color: #0F172A;
          }

          .sop-nav-btn-primary {
            background: var(--prussian-blue);
            border-color: var(--prussian-blue);
            color: #FFFFFF;
          }

          .sop-nav-btn:disabled {
            opacity: 0.35;
            cursor: not-allowed;
          }

          /* Callout Card Mobile Stacking */
          .sop-callout-card {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 16px !important;
            padding: 20px 16px !important;
            text-align: left !important;
            border-radius: 10px !important;
          }

          .callout-left {
            width: 100% !important;
            max-width: 100% !important;
          }

          .callout-title {
            font-size: 1.1rem !important;
            font-weight: 800 !important;
            color: #0F172A !important;
            margin-bottom: 8px !important;
            line-height: 1.3 !important;
          }

          .callout-desc {
            font-size: 0.85rem !important;
            line-height: 1.55 !important;
            color: #475569 !important;
          }

          .callout-right {
            width: 100% !important;
          }

          .sop-callout-btn {
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            padding: 13px 20px !important;
            font-size: 0.94rem !important;
            font-weight: 800 !important;
            border-radius: 8px !important;
            min-height: 48px !important; /* Accessible 48px tap target */
          }
        }
      `}</style>
    </section>
  );
}
