import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, FileCheck, FileCode, Clock, ShieldCheck, CheckCircle2, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import SectionBadge from '../atoms/SectionBadge';

export default function WorkflowSOP() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const detailedSteps = [
    {
      num: "01",
      title: "Jelajahi Paket & Plafon Tarif",
      badge: "Transparansi Biaya",
      desc: "Calon Klien memilih 1 dari 5 paket utama (Rp 120rb – Rp 650rb) dengan estimasi pengerjaan disiplin 3–10 hari kerja tanpa risiko pembengkakan biaya tersembunyi.",
      icon: Layers,
      color: 'var(--prussian-blue)'
    },
    {
      num: "02",
      title: "Pengisian Brief Kebutuhan Terstruktur",
      badge: "Formulir Cerdas Web",
      desc: "Mengisi spesifikasi teknis (database MySQL, modul CRUD, dokumen SRS/SDD IEEE, diagram UML, preferensi visual) melalui sistem formulir terstruktur website.",
      icon: FileCheck,
      color: '#D97706'
    },
    {
      num: "03",
      title: "Analisis Teknis & Surat Penawaran Resmi",
      badge: "Nomor Dokumen Valid",
      desc: "Aksara Tech menerbitkan Surat Penawaran Harga resmi [OFFER-AT-2026-____] via WhatsApp 085600386692 memuat ruang lingkup, jadwal, dan syarat DP min 50%.",
      icon: FileCode,
      color: 'var(--prussian-blue)'
    },
    {
      num: "04",
      title: "Pengerjaan, Kuota 3x Revisi & Serah Terima",
      badge: "Disiplin & Terpercaya",
      desc: "Penulisan kode dimulai pasca DP. Tersedia fasilitas MAKSIMAL 3 KALI REVISI mutlak pasca Preview 1. Pelunasan 50% sebelum serah terima master (.zip, .sql, PDF) & Data Cleansing.",
      icon: ShieldCheck,
      color: '#059669'
    }
  ];

  return (
    <section id="alur" className="section-padding workflow-sop-section" style={{ background: '#F1F5F9', borderTop: '2px solid #0F172A', borderBottom: '2px solid #0F172A' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <SectionBadge icon={Clock}>
            Standar Operasional Prosedur (SOP)
          </SectionBadge>
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
              >
                <span className="sop-pill-num">{step.num}</span>
                <span className="sop-pill-title">{step.title.split(' ')[0]} {step.title.split(' ')[1]}</span>
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
                    <span className="sop-step-number">
                      {step.num}
                    </span>
                    <div className="sop-icon-wrap" style={{ color: step.color }}>
                      <Icon size={22} />
                    </div>
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
                  {idx < 3 && <ChevronRight size={18} className="sop-next-arrow" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* SOP Callout Card */}
        <div className="sop-callout-card neo-card">
          <div className="callout-left">
            <div className="callout-badge">
              <ShieldCheck size={16} /> KOMITMEN DISIPLIN WAKTU
            </div>
            <h3 className="callout-title">
              Pemberlakuan Kuota Maksimal 3x Revisi Resmi
            </h3>
            <p className="callout-desc">
              Penghitungan kuota dimulai setelah Klien menerima Preview 1. Seluruh koreksi wajib dikumpulkan secara tertulis dalam satu daftar poin (*bullet points*) lengkap per siklus demi menjaga target rilis 3–10 hari kerja.
            </p>
          </div>
          <div className="callout-right">
            <Link to="/alur-sop" className="btn btn-primary" style={{ padding: '14px 24px', whiteSpace: 'nowrap' }}>
              <span>Lihat Detail Alur SOP</span>
              <ArrowRight size={16} />
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
          gap: 24px;
          margin-bottom: 48px;
        }

        .sop-step-card {
          padding: 28px 24px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #FFFFFF;
          border: 2px solid #0F172A;
        }

        .sop-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .sop-step-number {
          font-family: var(--font-heading);
          font-size: 2.4rem;
          font-weight: 900;
          color: #CBD5E1;
          letter-spacing: -0.04em;
        }

        .sop-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background: #F8FAFC;
          border: 2px solid #0F172A;
          box-shadow: 2px 2px 0px #0F172A;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sop-badge-wrap {
          margin-bottom: 12px;
        }

        .sop-card-badge {
          font-size: 0.72rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 4px;
          background: #EFF6FF;
          border: 1px solid var(--prussian-blue);
          color: var(--prussian-blue);
        }

        .sop-card-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 10px;
          line-height: 1.35;
        }

        .sop-card-desc {
          font-size: 0.86rem;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .sop-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1.5px dashed #CBD5E1;
        }

        .sop-step-indicator {
          font-size: 0.76rem;
          font-weight: 800;
          color: #64748B;
          font-family: var(--font-mono);
        }

        .sop-next-arrow {
          color: #94A3B8;
        }

        .sop-callout-card {
          background: #FFFDF0;
          border: 2px solid #0F172A;
          box-shadow: 5px 5px 0px var(--kuning);
          padding: 32px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
        }

        .callout-left {
          max-width: 720px;
        }

        .callout-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--kuning);
          border: 1.5px solid #0F172A;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.76rem;
          font-weight: 900;
          color: #0F172A;
          box-shadow: 1.5px 1.5px 0px #0F172A;
          margin-bottom: 12px;
        }

        .callout-title {
          font-size: 1.35rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .callout-desc {
          font-size: 0.92rem;
          color: #334155;
          line-height: 1.65;
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 1040px) {
          .sop-steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .sop-mobile-tab-bar {
            display: block;
            margin-bottom: 16px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 6px;
          }

          .sop-mobile-tabs {
            display: flex;
            gap: 8px;
            min-width: max-content;
          }

          .sop-mobile-pill {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 14px;
            background: #FFFFFF;
            border: 2px solid #0F172A;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 800;
            color: #0F172A;
            box-shadow: 2px 2px 0px #0F172A;
            cursor: pointer;
            white-space: nowrap;
          }

          .sop-mobile-pill .sop-pill-num {
            color: var(--prussian-blue);
            font-family: var(--font-mono);
          }

          .sop-mobile-pill.active {
            background: var(--kuning);
            box-shadow: 2px 2px 0px var(--prussian-blue);
          }

          .sop-steps-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-bottom: 32px;
          }

          .sop-step-card {
            display: none;
          }

          .sop-step-card.mobile-active {
            display: flex;
            box-shadow: 4px 4px 0px var(--prussian-blue);
          }

          .sop-callout-card {
            padding: 22px;
          }

          .callout-right .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
