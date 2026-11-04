import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/molecules/PageHeader';
import { 
  ShieldAlert, XCircle, CheckCircle2, AlertTriangle, 
  ArrowRight, Globe, Server, UploadCloud, Activity,
  FileCode2, Database, Shield, Wrench, Sparkles, Check
} from 'lucide-react';

export default function ServerExclusionPage() {
  const exclusions = [
    {
      icon: Globe,
      number: "1",
      title: "Domain & DNS",
      shortSummary: "Pendaftaran, perpanjangan, dan pengelolaan DNS record (.com, .id, dll).",
      boundary: "Domain dibeli mandiri atas nama Klien",
      tag: "Akun Mandiri"
    },
    {
      icon: Server,
      number: "2",
      title: "Sewa Hosting / VPS",
      shortSummary: "Biaya langganan bulanan/tahunan server, cPanel, atau infrastruktur cloud.",
      boundary: "Klien pegang kendali 100% server sendiri",
      tag: "Bebas Biaya Bulanan"
    },
    {
      icon: UploadCloud,
      number: "3",
      title: "Deployment Publik",
      shortSummary: "Proses login cPanel/SSH pihak ketiga untuk upload berkas atau konfigurasi SSL.",
      boundary: "Deliverable berupa master file bersih (.zip & .sql)",
      tag: "Master Source Code"
    },
    {
      icon: Activity,
      number: "4",
      title: "Downtime Server",
      shortSummary: "Kendala koneksi data center, server crash pihak ketiga, atau serangan DDoS.",
      boundary: "Tanggung jawab murni pada integritas kode program",
      tag: "Garansi Kode 7 Hari"
    }
  ];

  const inScope = [
    "Master Source Code bersih, modular & siap run (.zip)",
    "Skema Database relasional (.sql) siap import",
    "Dokumen Rekayasa formal SRS, SDD & UML (sesuai paket)",
    "Garansi Bug & Error Kode 1 Minggu (7 Hari Kalender)",
    "Panduan operasional dan deployment lokal (Local Run Guide)"
  ];

  const outScope = [
    "Pembelian atau tagihan perpanjangan nama domain internet",
    "Biaya sewa server hosting / VPS bulanan maupun tahunan",
    "Login cPanel / SSH hosting publik untuk proses upload berkas",
    "Penanganan server down akibat gangguan hosting pihak ketiga",
    "Pemasangan sertifikat SSL berbayar atau konfigurasi nameserver"
  ];

  return (
    <div className="server-exclusion-page" style={{ background: '#F8FAFC' }}>
      <PageHeader
        breadcrumbs={[{ label: 'Kebijakan Eksklusi Server' }]}
        badge="Transparansi Batasan Layanan"
        badgeIcon={ShieldAlert}
        title="Kebijakan Eksklusi Server &amp;"
        highlightText="Infrastruktur Hosting"
        description="Aksara Tech berfokus murni pada Software Engineering berkualitas tinggi. Pelajari batasan ruang lingkup ini agar kerja sama berjalan transparan, terukur, dan aman."
        action={
          <Link to="/paket" className="btn btn-secondary">
            <span>Katalog 6 Paket</span>
            <ArrowRight size={16} />
          </Link>
        }
      />

      {/* Trust Highlight Strip */}
      <div className="ex-trust-strip">
        <div className="container">
          <div className="ex-trust-row">
            <div className="ex-trust-chip">
              <CheckCircle2 size={14} className="text-emerald" />
              <span>100% Aset Milik Klien</span>
            </div>
            <span className="ex-trust-dot">•</span>
            <div className="ex-trust-chip">
              <CheckCircle2 size={14} className="text-emerald" />
              <span>Nol Mark-Up Sewa Server</span>
            </div>
            <span className="ex-trust-dot">•</span>
            <div className="ex-trust-chip">
              <CheckCircle2 size={14} className="text-emerald" />
              <span>Bebas Keterikatan (Vendor Lock-in)</span>
            </div>
          </div>
        </div>
      </div>

      <section className="section-padding ex-content-section">
        <div className="container">
          
          {/* Executive Philosophy Strip (Compact & Impactful) */}
          <div className="neo-card ex-philosophy-card">
            <div className="ex-phil-header">
              <AlertTriangle size={18} className="text-amber" />
              <span className="ex-phil-badge">MENGAPA KAMI MENERAPKAN EKSKLUSI SERVER?</span>
            </div>
            <h2 className="ex-phil-title">
              Melindungi Klien dari Keterikatan Agensi &amp; Biaya Tersembunyi
            </h2>
            <p className="ex-phil-desc">
              Banyak penyedia jasa menggabungkan biaya server ke dalam tagihan bulanan dengan mark-up tinggi agar klien terus terikat. Di <strong>Aksara Tech</strong>, kami memastikan <strong>kode program dan database 100% milik Anda seutuhnya</strong> tanpa biaya bulanan tersembunyi.
            </p>
          </div>

          {/* Quick Scope Comparison: Tanggung Jawab vs Eksklusi */}
          <div className="ex-comparison-wrapper">
            <div className="ex-comparison-header">
              <h2 className="ex-section-title">Pemetaan Ruang Lingkup Kerja</h2>
            </div>

            <div className="ex-scope-grid">
              {/* Box KIRI: Termasuk */}
              <div className="neo-card ex-scope-card scope-included">
                <div className="scope-card-head">
                  <div className="scope-icon-wrap icon-green">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <span className="scope-tag tag-green">TANGGUNG JAWAB KAMI</span>
                    <h3 className="scope-title">Termasuk dalam Layanan</h3>
                  </div>
                </div>
                <ul className="scope-list">
                  {inScope.map((item, idx) => (
                    <li key={idx} className="scope-item">
                      <Check size={15} className="check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box KANAN: Eksklusi */}
              <div className="neo-card ex-scope-card scope-excluded">
                <div className="scope-card-head">
                  <div className="scope-icon-wrap icon-rose">
                    <XCircle size={18} />
                  </div>
                  <div>
                    <span className="scope-tag tag-rose">EKSKLUSI SERVER</span>
                    <h3 className="scope-title">Dikelola Mandiri oleh Klien</h3>
                  </div>
                </div>
                <ul className="scope-list">
                  {outScope.map((item, idx) => (
                    <li key={idx} className="scope-item">
                      <XCircle size={15} className="cross-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 4 Detailed Exclusions (Compact 2x2 Grid) */}
          <div className="ex-details-section">
            <div className="ex-comparison-header">
              <h2 className="ex-section-title">4 Batasan Ruang Lingkup Mutlak</h2>
            </div>

            <div className="ex-cards-grid">
              {exclusions.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="neo-card ex-card-item">
                    <div className="ex-card-top">
                      <div className="ex-icon-box">
                        <Icon size={18} />
                      </div>
                      <span className="ex-badge-tag">{item.tag}</span>
                    </div>

                    <h3 className="ex-card-name">
                      {item.number}. {item.title}
                    </h3>
                    <p className="ex-card-summary">
                      {item.shortSummary}
                    </p>

                    <div className="ex-card-boundary">
                      <strong>Batas:</strong> {item.boundary}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Software Maintenance Clarification (Compact Card) */}
          <div className="neo-card ex-maintenance-card">
            <div className="ex-maint-head">
              <div className="ex-maint-icon">
                <Wrench size={18} />
              </div>
              <div>
                <span className="ex-maint-tag">LAYANAN HARIAN AKSARA TECH</span>
                <h3 className="ex-maint-title">
                  Software Maintenance &amp; Enhancement (Rp 50.000 / Hari)
                </h3>
              </div>
            </div>

            <p className="ex-maint-desc">
              Layanan pemeliharaan berfokus murni pada kesehatan dan efisiensi kode program (bukan operasional server):
            </p>

            <div className="ex-maint-chips">
              <span className="maint-chip">Investigasi &amp; Bug Fixing Logika</span>
              <span className="maint-chip">Refactoring Struktur Kode</span>
              <span className="maint-chip">Update Library &amp; Script</span>
              <span className="maint-chip">Optimasi Query Database</span>
              <span className="maint-chip">Penyesuaian Konten &amp; Styling Minor</span>
            </div>
          </div>

          {/* Bottom Action Group */}
          <div className="ex-cta-box">
            <Link to="/pesan" className="btn btn-primary ex-btn-main">
              <span>Isi Brief Kebutuhan Proyek</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/paket" className="btn btn-secondary ex-btn-sub">
              <span>Lihat Detail 6 Paket</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ── Embedded CSS ── */}
      <style>{`
        /* =======================================================
           TRUST HIGHLIGHT STRIP
           ======================================================= */
        .ex-trust-strip {
          background: #FFFFFF;
          border-bottom: 2px solid #0F172A;
          padding: 10px 0;
        }

        .ex-trust-row {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #334155;
        }

        .ex-trust-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .ex-trust-dot {
          color: #CBD5E1;
        }

        .text-emerald { color: #059669; }
        .text-amber { color: #D97706; }

        /* =======================================================
           EXECUTIVE PHILOSOPHY CARD
           ======================================================= */
        .ex-philosophy-card {
          background: #FFFBEB;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 24px 28px;
          margin-bottom: 40px;
        }

        .ex-phil-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .ex-phil-badge {
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          color: #B45309;
        }

        .ex-phil-title {
          font-size: 1.3rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .ex-phil-desc {
          font-size: 0.92rem;
          color: #334155;
          line-height: 1.6;
          margin: 0;
        }

        /* =======================================================
           SCOPE COMPARISON GRID (INCLUDED vs EXCLUDED)
           ======================================================= */
        .ex-comparison-wrapper {
          margin-bottom: 44px;
        }

        .ex-comparison-header {
          text-align: center;
          margin-bottom: 22px;
        }

        .ex-pretitle { display: none !important; }

        .ex-section-title {
          font-size: 1.6rem;
          font-weight: 900;
          color: #0F172A;
          margin: 0;
        }

        .ex-scope-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .ex-scope-card {
          padding: 22px 24px;
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }

        .scope-card-head {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 14px;
          margin-bottom: 14px;
          border-bottom: 2px solid #F1F5F9;
        }

        .scope-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon-green { background: #ECFDF5; color: #059669; }
        .icon-rose { background: #FFF1F2; color: #E11D48; }

        .scope-tag {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          display: block;
          margin-bottom: 2px;
        }

        .tag-green { color: #059669; }
        .tag-rose { color: #E11D48; }

        .scope-title {
          font-size: 1.05rem;
          font-weight: 900;
          color: #0F172A;
          margin: 0;
        }

        .scope-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .scope-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.85rem;
          color: #334155;
          line-height: 1.45;
          font-weight: 600;
        }

        .check-icon {
          color: #059669;
          margin-top: 3px;
          flex-shrink: 0;
        }

        .cross-icon {
          color: #E11D48;
          margin-top: 3px;
          flex-shrink: 0;
        }

        /* =======================================================
           4 DETAILED EXCLUSIONS GRID (COMPACT 2x2)
           ======================================================= */
        .ex-details-section {
          margin-bottom: 44px;
        }

        .ex-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .ex-card-item {
          padding: 20px;
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
        }

        .ex-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .ex-icon-box {
          width: 34px;
          height: 34px;
          border-radius: 6px;
          background: #F8FAFC;
          border: 1.5px solid #0F172A;
          color: #0F172A;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ex-badge-tag {
          font-size: 0.72rem;
          font-weight: 800;
          background: #F1F5F9;
          border: 1.5px solid #0F172A;
          border-radius: 4px;
          padding: 3px 8px;
          color: #0F172A;
        }

        .ex-card-name {
          font-size: 1.05rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 6px;
        }

        .ex-card-summary {
          font-size: 0.84rem;
          color: #475569;
          line-height: 1.55;
          margin-bottom: 14px;
          flex: 1;
        }

        .ex-card-boundary {
          padding-top: 10px;
          border-top: 1.5px dashed #E2E8F0;
          font-size: 0.78rem;
          color: #64748B;
        }

        .ex-card-boundary strong {
          color: #0F172A;
        }

        /* =======================================================
           SOFTWARE MAINTENANCE CARD
           ======================================================= */
        .ex-maintenance-card {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 22px 24px;
          margin-bottom: 40px;
        }

        .ex-maint-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .ex-maint-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #EEF4FF;
          border: 1px solid var(--border-subtle);
          color: var(--prussian-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ex-maint-tag {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          color: var(--prussian-blue);
          display: block;
        }

        .ex-maint-title {
          font-size: 1.1rem;
          font-weight: 900;
          color: #0F172A;
          margin: 0;
        }

        .ex-maint-desc {
          font-size: 0.86rem;
          color: #475569;
          line-height: 1.55;
          margin-bottom: 14px;
        }

        .ex-maint-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .maint-chip {
          background: #F8FAFC;
          border: 1.5px solid #0F172A;
          border-radius: 6px;
          padding: 5px 10px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #0F172A;
        }

        /* =======================================================
           CTA BUTTONS
           ======================================================= */
        .ex-cta-box {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .ex-btn-main {
          padding: 12px 26px;
          font-size: 0.94rem;
        }

        .ex-btn-sub {
          padding: 12px 22px;
          font-size: 0.94rem;
        }

        /* =======================================================
           MOBILE RESPONSIVENESS (max-width: 640px)
           ======================================================= */
        @media (max-width: 640px) {
          .ex-content-section {
            padding-top: 24px;
            padding-bottom: 48px;
          }

          .ex-trust-row {
            font-size: 0.74rem;
            gap: 6px;
          }

          .ex-trust-dot {
            display: none;
          }

          .ex-trust-chip {
            background: #F8FAFC;
            border: 1px solid #E2E8F0;
            padding: 4px 8px;
            border-radius: 6px;
          }

          .ex-philosophy-card {
            padding: 18px 18px;
            margin-bottom: 28px;
          }

          .ex-phil-title {
            font-size: 1.15rem;
          }

          .ex-phil-desc {
            font-size: 0.84rem;
          }

          .ex-comparison-header {
            margin-bottom: 16px;
          }

          .ex-section-title {
            font-size: 1.35rem;
          }

          .ex-scope-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .ex-scope-card {
            padding: 18px;
          }

          .scope-title {
            font-size: 0.98rem;
          }

          .scope-item {
            font-size: 0.82rem;
          }

          .ex-cards-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .ex-card-item {
            padding: 16px;
          }

          .ex-maintenance-card {
            padding: 18px;
            margin-bottom: 28px;
          }

          .ex-maint-title {
            font-size: 0.98rem;
          }

          .ex-maint-chips {
            gap: 6px;
          }

          .maint-chip {
            font-size: 0.74rem;
            padding: 4px 8px;
          }

          .ex-cta-box {
            flex-direction: column;
            width: 100%;
          }

          .ex-btn-main,
          .ex-btn-sub {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
