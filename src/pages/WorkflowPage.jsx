import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/molecules/PageHeader';
import { 
  Clock, CheckCircle2, ShieldCheck, FileCheck, Layers, 
  ArrowRight, AlertCircle, RefreshCw, Lock, FileCode,
  Sparkles, Check, ChevronRight, Shield
} from 'lucide-react';

export default function WorkflowPage() {
  const sopStages = [
    {
      num: "01",
      title: "Penjelajahan Paket & Plafon Tarif",
      timeline: "Tahap Awal",
      badge: "Transparansi Biaya",
      desc: "Calon Klien memilih satu dari enam klasifikasi paket resmi (Rp 100.000 – Rp 500.000) dengan estimasi pengerjaan disiplin 1–10 hari kerja tanpa risiko lonjakan biaya di tengah jalan.",
      checklist: [
        "Meninjau batas atas tarif resmi (maksimal Rp 500.000)",
        "Memeriksa kelengkapan deliverables sesuai kebutuhan",
        "Membaca ketentuan batasan eksklusi server"
      ]
    },
    {
      num: "02",
      title: "Pengisian Brief Kebutuhan Terstruktur",
      timeline: "10–15 Menit",
      badge: "Formulir Cerdas Web",
      desc: "Mengisi formulir spesifikasi teknis (database MySQL, modul CRUD, dokumen SRS/SDD formal, diagram UML, preferensi visual) melalui sistem formulir website.",
      checklist: [
        "Pemberian ID Klien / Inquiry otomatis (INQ-AT-YYYYMMDD-XXXX)",
        "Pengisian nomor WhatsApp aktif untuk koordinasi resmi",
        "Pemilihan modul fitur dan add-on spesifik",
        "Persetujuan awal dan pengiriman brief via WhatsApp 085600386692"
      ]
    },
    {
      num: "03",
      title: "Analisis Teknis & Surat Penawaran Resmi",
      timeline: "1 Hari Kerja",
      badge: "Nomor Dokumen Valid",
      desc: "Tim pengembang Aksara Tech memetakan ruang lingkup dan menerbitkan Surat Penawaran Harga resmi [OFFER-AT-2026-____] memuat deliverables terperinci, jadwal rilis, dan termin DP min 50%.",
      checklist: [
        "Verifikasi kelayakan arsitektur teknis",
        "Penerbitan nomor penawaran resmi",
        "Persetujuan tertulis 'Deal' dari Klien",
        "Pembayaran DP 50% (Non-refundable pasca koding berjalan)"
      ]
    },
    {
      num: "04",
      title: "Pengerjaan, Kuota 3x Revisi & Serah Terima",
      timeline: "1–10 Hari Kerja",
      badge: "Disiplin & Terpercaya",
      desc: "Penulisan kode dimulai pasca verifikasi DP. Diberikan Pratinjau Pertama (Preview 1) untuk pengujian sistem bersama. Fasilitas kuota MAKSIMAL 3 KALI REVISI mutlak serta garansi bug 1 minggu disediakan secara resmi.",
      checklist: [
        "Koding fungsional, pembuatan skema database (.sql), dan dokumen rekayasa formal",
        "Penyerahan Preview 1 dan pencatatan lembar kendali revisi",
        "Maksimal 3 kali siklus revisi terpadu",
        "Penerbitan Invoice Pelunasan [INV-AT-2026-____]",
        "Serah terima master berkas (.zip, .sql, PDF) & eksekusi Data Cleansing Policy",
        "Aktivasi garansi bug kode selama 1 minggu (7 hari kalender)"
      ]
    }
  ];

  const revisionRules = [
    {
      num: "1",
      title: "Dihitung Pasca Preview 1",
      desc: "Penghitungan kuota dimulai setelah Klien menerima pratinjau pertama hasil koding untuk diuji coba secara mandiri."
    },
    {
      num: "2",
      title: "Wajib Daftar Terpadu",
      desc: "Seluruh poin perbaikan wajib dikumpulkan secara tertulis dalam satu daftar poin (bullet points) lengkap per siklus revisi."
    },
    {
      num: "3",
      title: "Tanpa Beda Minor / Mayor",
      desc: "Setiap daftar revisi yang diajukan dan diproses resmi mengurangi 1 kuota revisi (dari 3 menjadi 2, 1, dan 0)."
    },
    {
      num: "4",
      title: "Kuota Habis = Add-on",
      desc: "Jika kuota 3 kali habis, penyesuaian lanjutan wajib dikompensasikan melalui Add-on resmi berbayar (Rp 50rb – Rp 150rb)."
    }
  ];

  return (
    <div className="workflow-page" style={{ background: '#F8FAFC' }}>
      <PageHeader
        breadcrumbs={[{ label: 'Alur SOP & Regulasi Revisi' }]}
        badge="Standar Operasional Prosedur"
        badgeIcon={Clock}
        title="Alur Kerja Proyek & Kebijakan"
        highlightText="Kuota Maksimal 3x Revisi"
        description="Tata kelola operasional yang terstandarisasi demi menjamin kejelasan ruang lingkup, kepastian jadwal rilis, dan perlindungan hak kedua belah pihak."
        action={
          <Link to="/pesan" className="btn btn-primary">
            <span>Isi Brief Kebutuhan</span>
            <ArrowRight size={16} />
          </Link>
        }
      />

      {/* Top 4-Stage Stepper Roadmap (Mobile & Desktop Friendly) */}
      <div className="sop-roadmap-strip">
        <div className="container">
          <div className="sop-roadmap-items">
            <div className="roadmap-step active">
              <span className="step-num">01</span>
              <span className="step-label">Pilih Paket</span>
            </div>
            <span className="step-arrow">→</span>
            <div className="roadmap-step">
              <span className="step-num">02</span>
              <span className="step-label">Kirim Brief</span>
            </div>
            <span className="step-arrow">→</span>
            <div className="roadmap-step">
              <span className="step-num">03</span>
              <span className="step-label">Penawaran &amp; DP</span>
            </div>
            <span className="step-arrow">→</span>
            <div className="roadmap-step">
              <span className="step-num">04</span>
              <span className="step-label">3x Revisi &amp; Rilis</span>
            </div>
          </div>
        </div>
      </div>

      <section className="section-padding sop-content-section">
        <div className="container">
          
          {/* Section Heading */}
          <div className="sop-section-head">
            <span className="sop-pretitle">TAHAPAN SISTEMATIS PROYEK</span>
            <h2 className="sop-main-title">4 Tahap Eksekusi Standar Aksara Tech</h2>
            <p className="sop-main-desc">
              Setiap proyek dikawal dengan alur kendali mutu formal sejak pemilihan spesifikasi hingga serah terima master file.
            </p>
          </div>

          {/* 4 Stages Detailed Cards */}
          <div className="sop-cards-stack">
            {sopStages.map((stage, idx) => (
              <div key={idx} className="neo-card sop-stage-card">
                
                {/* Left Column: Stage Info */}
                <div className="stage-left-info">
                  <div className="stage-header-row">
                    <div className="stage-num-badge">
                      <span>{stage.num}</span>
                    </div>

                    <div className="stage-meta-col">
                      <div className="stage-meta-tags">
                        <span className="stage-order-tag">TAHAP {stage.num}</span>
                        <span className="stage-badge-tag">{stage.badge}</span>
                        <span className="stage-time-tag">
                          <Clock size={12} style={{ color: '#D97706' }} />
                          <span>{stage.timeline}</span>
                        </span>
                      </div>
                      <h3 className="stage-card-title">{stage.title}</h3>
                    </div>
                  </div>

                  <p className="stage-card-desc">
                    {stage.desc}
                  </p>
                </div>

                {/* Right Column: QA Checklist */}
                <div className="stage-qa-box">
                  <div className="qa-box-header">
                    <ShieldCheck size={16} className="qa-shield-icon" />
                    <span>Protokol Pengendalian Mutu:</span>
                  </div>
                  <div className="qa-checklist">
                    {stage.checklist.map((item, cIdx) => (
                      <div key={cIdx} className="qa-check-item">
                        <CheckCircle2 size={15} className="qa-check-icon" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Deep-dive into 3x Revision Rules (High-Impact Neo-Brutalist Box) */}
          <div className="neo-card sop-revision-hub">
            <div className="hub-top-badge">
              <RefreshCw size={15} />
              <span>ATURAN BAKU KUOTA REVISI</span>
            </div>

            <h2 className="hub-title">
              Ketentuan Mutlak Kuota Maksimal 3 Kali Revisi
            </h2>
            <p className="hub-subtitle">
              Standar baku pengendalian siklus perbaikan kode program agar proyek tetap berjalan terarah, disiplin, dan tepat waktu.
            </p>

            {/* Visual Quota Counter Bar */}
            <div className="quota-counter-bar">
              <div className="quota-step-pill">
                <span className="quota-dot dot-1" />
                <span>Revisi 1: Pratinjau Pertama (Preview 1)</span>
              </div>
              <span className="quota-sep">→</span>
              <div className="quota-step-pill">
                <span className="quota-dot dot-2" />
                <span>Revisi 2: Pengujian Mandiri Klien</span>
              </div>
              <span className="quota-sep">→</span>
              <div className="quota-step-pill">
                <span className="quota-dot dot-3" />
                <span>Revisi 3: Finalisasi Serah Terima</span>
              </div>
            </div>

            {/* 4 Rules Grid */}
            <div className="hub-rules-grid">
              {revisionRules.map((rule, rIdx) => (
                <div key={rIdx} className="hub-rule-card">
                  <div className="rule-card-header">
                    <span className="rule-number-pill">{rule.num}</span>
                    <strong className="rule-title">{rule.title}</strong>
                  </div>
                  <p className="rule-desc">{rule.desc}</p>
                </div>
              ))}
            </div>

            {/* Warranty Assurance Banner */}
            <div className="hub-warranty-footer">
              <Shield size={16} style={{ color: '#16A34A', flexShrink: 0 }} />
              <span>
                <strong>Termasuk Garansi Bug 1 Minggu:</strong> Setelah revisi ke-3 atau serah terima selesai, Klien tetap terlindungi garansi perbaikan bug kode selama 7 hari kalender.
              </span>
            </div>
          </div>

          {/* CTA Box */}
          <div className="sop-cta-box">
            <Link to="/pesan" className="btn btn-primary sop-btn-main">
              <span>Mulai Proyek Sesuai Alur SOP</span>
              <ArrowRight size={17} />
            </Link>
            <Link to="/paket" className="btn btn-secondary sop-btn-sub">
              <span>Katalog 6 Paket &amp; Tarif Resmi</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ── Embedded CSS with Strict Responsive Design ── */}
      <style>{`
        /* =======================================================
           ROADMAP STEPPER STRIP
           ======================================================= */
        .sop-roadmap-strip {
          background: #FFFFFF;
          border-bottom: 2px solid #0F172A;
          padding: 10px 0;
        }

        .sop-roadmap-items {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .roadmap-step {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #475569;
          background: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 6px;
          padding: 4px 10px;
        }

        .roadmap-step.active {
          background: #EEF4FF;
          border-color: var(--prussian-blue);
          color: var(--prussian-blue);
          font-weight: 800;
        }

        .roadmap-step .step-num {
          font-family: var(--font-mono);
          font-weight: 900;
        }

        .step-arrow {
          color: #94A3B8;
          font-weight: bold;
          font-size: 0.85rem;
        }

        /* =======================================================
           SECTION HEADER
           ======================================================= */
        .sop-section-head {
          text-align: center;
          margin-bottom: 40px;
        }

        .sop-pretitle {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          color: var(--prussian-blue);
          display: block;
          margin-bottom: 6px;
        }

        .sop-main-title {
          font-size: clamp(1.6rem, 3.5vw, 2.2rem);
          font-weight: 900;
          color: #0F172A;
          margin: 0 0 10px 0;
        }

        .sop-main-desc {
          font-size: 0.95rem;
          color: #64748B;
          max-width: 680px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* =======================================================
           4 STAGES CARDS STACK
           ======================================================= */
        .sop-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 56px;
        }

        .sop-stage-card {
          padding: 28px;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 28px;
          align-items: start;
          background: #FFFFFF;
          border: 2px solid #0F172A;
          box-shadow: 4px 4px 0px #0F172A;
          border-radius: var(--radius-md);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .sop-stage-card:hover {
          transform: translateY(-2px);
          box-shadow: 6px 6px 0px var(--prussian-blue);
        }

        .stage-left-info {
          display: flex;
          flex-direction: column;
        }

        .stage-header-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 14px;
        }

        .stage-num-badge {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: #EEF4FF;
          border: 2px solid #0F172A;
          box-shadow: 2.5px 2.5px 0px #0F172A;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stage-num-badge span {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--prussian-blue);
          line-height: 1;
        }

        .stage-meta-col {
          flex: 1;
          min-width: 0;
        }

        .stage-meta-tags {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 6px;
        }

        .stage-order-tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--prussian-blue);
          background: #EEF4FF;
          border: 1px solid rgba(29, 99, 255, 0.3);
          border-radius: 4px;
          padding: 2px 6px;
        }

        .stage-badge-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: #475569;
          background: #F1F5F9;
          border-radius: 4px;
          padding: 2px 6px;
        }

        .stage-time-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          font-weight: 800;
          color: #D97706;
          background: #FFFBEB;
          border: 1px solid rgba(217, 119, 6, 0.3);
          border-radius: 4px;
          padding: 2px 7px;
        }

        .stage-card-title {
          font-size: 1.25rem;
          font-weight: 900;
          color: #0F172A;
          line-height: 1.3;
          margin: 0;
        }

        .stage-card-desc {
          font-size: 0.88rem;
          color: #334155;
          line-height: 1.65;
          margin: 0;
          font-weight: 500;
        }

        /* QA Box */
        .stage-qa-box {
          background: #F8FAFC;
          border: 1.5px solid #0F172A;
          box-shadow: 2.5px 2.5px 0px #0F172A;
          border-radius: 8px;
          padding: 18px;
        }

        .qa-box-header {
          font-size: 0.76rem;
          color: #0F172A;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .qa-shield-icon {
          color: var(--prussian-blue);
        }

        .qa-checklist {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .qa-check-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.82rem;
          color: #1E293B;
          font-weight: 600;
          line-height: 1.45;
        }

        .qa-check-icon {
          color: #059669;
          margin-top: 2px;
          flex-shrink: 0;
        }

        /* =======================================================
           REVISION POLICY HUB (YELLOW NEO-BRUTALIST CARD)
           ======================================================= */
        .sop-revision-hub {
          background: #FFFDF5;
          border: 2px solid #0F172A;
          border-radius: var(--radius-md);
          box-shadow: 5px 5px 0px var(--kuning);
          padding: 32px;
          margin-bottom: 48px;
        }

        .hub-top-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--kuning);
          color: #0F172A;
          border: 1.5px solid #0F172A;
          box-shadow: 2px 2px 0px #0F172A;
          padding: 5px 12px;
          border-radius: 6px;
          font-weight: 900;
          font-size: 0.8rem;
          font-family: var(--font-mono);
          margin-bottom: 14px;
        }

        .hub-title {
          font-size: clamp(1.4rem, 3vw, 1.8rem);
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .hub-subtitle {
          font-size: 0.9rem;
          color: #475569;
          margin-bottom: 22px;
          line-height: 1.6;
        }

        .quota-counter-bar {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;
          background: #FFFFFF;
          border: 1.5px solid #0F172A;
          border-radius: 8px;
          padding: 10px 16px;
          margin-bottom: 22px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .quota-counter-bar::-webkit-scrollbar {
          display: none;
        }

        .quota-step-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 800;
          color: #0F172A;
          white-space: nowrap;
        }

        .quota-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .dot-1 { background: #3B82F6; }
        .dot-2 { background: #F59E0B; }
        .dot-3 { background: #10B981; }

        .quota-sep {
          color: #94A3B8;
          font-weight: 900;
          font-size: 0.8rem;
        }

        .hub-rules-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        .hub-rule-card {
          background: #FFFFFF;
          border: 1.5px solid #0F172A;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 2.5px 2.5px 0px #0F172A;
        }

        .rule-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .rule-number-pill {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--prussian-blue);
          color: #FFFFFF;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .rule-title {
          color: #0F172A;
          font-weight: 900;
          font-size: 0.92rem;
        }

        .rule-desc {
          margin: 0;
          color: #475569;
          font-size: 0.82rem;
          line-height: 1.55;
          font-weight: 500;
        }

        .hub-warranty-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #F0FDF4;
          border: 1.5px solid #86EFAC;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 0.82rem;
          color: #166534;
          line-height: 1.5;
        }

        /* =======================================================
           CTA BUTTONS
           ======================================================= */
        .sop-cta-box {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .sop-btn-main {
          padding: 13px 28px;
          font-size: 0.95rem;
        }

        .sop-btn-sub {
          padding: 13px 24px;
          font-size: 0.95rem;
        }

        /* =======================================================
           MOBILE RESPONSIVENESS (max-width: 640px)
           ======================================================= */
        @media (max-width: 640px) {
          .sop-content-section {
            padding-top: 24px;
            padding-bottom: 48px;
          }

          .sop-roadmap-strip {
            padding: 8px 0;
          }

          .sop-roadmap-items {
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            padding: 0 4px;
          }

          .sop-roadmap-items::-webkit-scrollbar {
            display: none;
          }

          .roadmap-step {
            flex-shrink: 0;
            font-size: 0.74rem;
            padding: 3px 8px;
          }

          .step-arrow {
            flex-shrink: 0;
            font-size: 0.75rem;
          }

          .sop-section-head {
            margin-bottom: 24px;
          }

          .sop-cards-stack {
            gap: 16px;
            margin-bottom: 36px;
          }

          .sop-stage-card {
            grid-template-columns: 1fr;
            padding: 16px;
            gap: 16px;
            box-shadow: 3px 3px 0px #0F172A;
          }

          .stage-header-row {
            gap: 12px;
            margin-bottom: 10px;
          }

          .stage-num-badge {
            width: 44px;
            height: 44px;
            border-radius: 10px;
          }

          .stage-num-badge span {
            font-size: 1.25rem;
          }

          .stage-card-title {
            font-size: 1.1rem;
          }

          .stage-card-desc {
            font-size: 0.82rem;
            line-height: 1.55;
          }

          .stage-qa-box {
            padding: 14px;
          }

          .qa-check-item {
            font-size: 0.78rem;
            gap: 6px;
          }

          /* Revision Hub on Mobile */
          .sop-revision-hub {
            padding: 18px 16px;
            margin-bottom: 32px;
            box-shadow: 4px 4px 0px var(--kuning);
          }

          .hub-title {
            font-size: 1.25rem;
          }

          .hub-subtitle {
            font-size: 0.82rem;
            margin-bottom: 16px;
          }

          .quota-counter-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            padding: 10px 12px;
          }

          .quota-sep {
            display: none;
          }

          .quota-step-pill {
            font-size: 0.74rem;
          }

          .hub-rules-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .hub-rule-card {
            padding: 14px;
          }

          .rule-title {
            font-size: 0.88rem;
          }

          .rule-desc {
            font-size: 0.78rem;
          }

          .hub-warranty-footer {
            font-size: 0.76rem;
            padding: 8px 12px;
          }

          .sop-cta-box {
            flex-direction: column;
            width: 100%;
          }

          .sop-btn-main,
          .sop-btn-sub {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
