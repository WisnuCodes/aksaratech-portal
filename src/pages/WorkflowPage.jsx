import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/molecules/PageHeader';
import { 
  Clock, CheckCircle2, ShieldCheck, FileCheck, Layers, 
  AlertCircle, RefreshCw, Lock, FileCode,
  Sparkles, Check, ChevronRight, Shield
} from 'lucide-react';

export default function WorkflowPage() {
  const sopStages = [
    {
      num: "1",
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
      num: "2",
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
      num: "3",
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
      num: "4",
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
            </Link>
        }
      />

      {/* Top 4-Stage Stepper Roadmap (Mobile & Desktop Friendly) */}
      <div className="sop-roadmap-strip">
        <div className="container">
          <div className="sop-roadmap-items">
            <div className="roadmap-step active">
              <span className="step-num">1</span>
              <span className="step-label">Pilih Paket</span>
            </div>
            <div className="roadmap-step">
              <span className="step-num">2</span>
              <span className="step-label">Kirim Brief</span>
            </div>
            <div className="roadmap-step">
              <span className="step-num">3</span>
              <span className="step-label">Penawaran &amp; DP</span>
            </div>
            <div className="roadmap-step">
              <span className="step-num">4</span>
              <span className="step-label">3x Revisi &amp; Rilis</span>
            </div>
          </div>
        </div>
      </div>

      <section className="section-padding sop-content-section">
        <div className="container">
          
          {/* Section Heading */}
          <div className="sop-section-head">
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
                          <Clock size={12} style={{ color: "#0F172A" }} />
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
              <div className="quota-step-pill">
                <span className="quota-dot dot-2" />
                <span>Revisi 2: Pengujian Mandiri Klien</span>
              </div>
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
              <Shield size={16} style={{ color: "#0F172A", flexShrink: 0 }} />
              <span>
                <strong>Termasuk Garansi Bug 1 Minggu:</strong> Setelah revisi ke-3 atau serah terima selesai, Klien tetap terlindungi garansi perbaikan bug kode selama 7 hari kalender.
              </span>
            </div>
          </div>

          {/* CTA Box */}
          <div className="sop-cta-box">
            <Link to="/pesan" className="btn btn-primary sop-btn-main">
              <span>Mulai Proyek Sesuai Alur SOP</span>
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
          padding: 12px 0;
        }

        .sop-roadmap-items {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .roadmap-step {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #475569;
          background: #F8FAFC;
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          padding: 5px 12px;
        }

        .roadmap-step.active {
          background: #F1F5F9;
          border-color: var(--border-main);
          color: #0F172A;
          font-weight: 700;
        }

        .roadmap-step .step-num {
          font-weight: 800;
          color: var(--prussian-blue);
        }

        /* =======================================================
           SECTION HEADER
           ======================================================= */
        .sop-section-head {
          text-align: center;
          margin-bottom: 40px;
        }

        .sop-pretitle { display: none !important; }

        .sop-main-title {
          font-size: clamp(1.6rem, 3.5vw, 2.2rem);
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 10px 0;
          line-height: 1.25;
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
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .sop-stage-card:hover {
          transform: translateY(-2px);
          border-color: var(--border-main);
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
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: #F8FAFC;
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stage-num-badge span {
          font-size: 1.4rem;
          font-weight: 800;
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
          font-size: 0.72rem;
          font-weight: 700;
          color: #0F172A;
          background: #F1F5F9;
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          padding: 2px 7px;
        }

        .stage-badge-tag {
          font-size: 0.72rem;
          font-weight: 600;
          color: #475569;
          background: #F8FAFC;
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          padding: 2px 7px;
        }

        .stage-time-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          font-weight: 600;
          color: #0F172A;
          background: #F1F5F9;
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          padding: 2px 7px;
        }

        .stage-card-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.35;
          margin: 0;
        }

        .stage-card-desc {
          font-size: 0.88rem;
          color: #475569;
          line-height: 1.6;
          margin: 0;
          font-weight: 500;
        }

        /* QA Box */
        .stage-qa-box {
          background: #F8FAFC;
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 20px;
        }

        .qa-box-header {
          font-size: 0.76rem;
          color: #0F172A;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .qa-shield-icon {
          color: #0F172A;
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
          font-size: 0.84rem;
          color: #334155;
          font-weight: 500;
          line-height: 1.45;
        }

        .qa-check-icon {
          color: #0F172A;
          margin-top: 2px;
          flex-shrink: 0;
        }

        /* =======================================================
           REVISION POLICY HUB
           ======================================================= */
        .sop-revision-hub {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 32px;
          margin-bottom: 48px;
        }

        .hub-title {
          font-size: clamp(1.4rem, 3vw, 1.8rem);
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .hub-subtitle {
          font-size: 0.92rem;
          color: #475569;
          margin-bottom: 22px;
          line-height: 1.6;
        }

        .quota-counter-bar {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          background: #F8FAFC;
          border: 1px solid var(--border-subtle);
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
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #0F172A;
          white-space: nowrap;
        }

        .quota-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          background: var(--prussian-blue);
        }

        .hub-rules-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        .hub-rule-card {
          background: #F8FAFC;
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 16px;
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
          font-size: 0.72rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .rule-title {
          color: #0F172A;
          font-weight: 800;
          font-size: 0.92rem;
        }

        .rule-desc {
          margin: 0;
          color: #475569;
          font-size: 0.84rem;
          line-height: 1.55;
          font-weight: 500;
        }

        .hub-warranty-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #F8FAFC;
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 0.84rem;
          color: #1E293B;
          line-height: 1.5;
        }

        .sop-cta-box {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        @media (max-width: 1024px) {
          .sop-stage-card {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 22px;
          }
          .hub-rules-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
