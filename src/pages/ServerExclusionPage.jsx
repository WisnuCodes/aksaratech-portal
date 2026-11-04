import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/molecules/PageHeader';
import { 
  ShieldAlert, XCircle, CheckCircle2, AlertTriangle, 
  Globe, Server, UploadCloud, Activity,
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
            </Link>
        }
      />

      {/* Trust Highlight Strip */}
      <div className="ex-trust-strip">
        <div className="container">
          <div className="ex-trust-row">
            <div className="ex-trust-chip">
              <CheckCircle2 size={14} style={{ color: "#0F172A" }} />
              <span>100% Aset Milik Klien</span>
            </div>
            <span className="ex-trust-dot">•</span>
            <div className="ex-trust-chip">
              <CheckCircle2 size={14} style={{ color: "#0F172A" }} />
              <span>Nol Mark-Up Sewa Server</span>
            </div>
            <span className="ex-trust-dot">•</span>
            <div className="ex-trust-chip">
              <CheckCircle2 size={14} style={{ color: "#0F172A" }} />
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
              <AlertTriangle size={18} style={{ color: "#0F172A" }} />
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
                  <div className="scope-icon-wrap">
                    <CheckCircle2 size={18} style={{ color: "#0F172A" }} />
                  </div>
                  <div>
                    <span className="scope-tag">Tanggung Jawab Kami</span>
                    <h3 className="scope-title">Termasuk dalam Layanan</h3>
                  </div>
                </div>
                <ul className="scope-list">
                  {inScope.map((item, idx) => (
                    <li key={idx} className="scope-item">
                      <Check size={15} style={{ color: "#0F172A", marginTop: "3px", flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box KANAN: Eksklusi */}
              <div className="neo-card ex-scope-card scope-excluded">
                <div className="scope-card-head">
                  <div className="scope-icon-wrap">
                    <XCircle size={18} style={{ color: "#0F172A" }} />
                  </div>
                  <div>
                    <span className="scope-tag">Eksklusi Server</span>
                    <h3 className="scope-title">Dikelola Mandiri oleh Klien</h3>
                  </div>
                </div>
                <ul className="scope-list">
                  {outScope.map((item, idx) => (
                    <li key={idx} className="scope-item">
                      <XCircle size={15} style={{ color: "#475569", marginTop: "3px", flexShrink: 0 }} />
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
          padding: 12px 0;
        }

        .ex-trust-row {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 0.85rem;
          font-weight: 600;
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

        /* =======================================================
           EXECUTIVE PHILOSOPHY CARD
           ======================================================= */
        .ex-philosophy-card {
          background: #F8FAFC;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 24px 28px;
          margin-bottom: 40px;
        }

        .ex-phil-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .ex-phil-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 8px;
          line-height: 1.35;
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
          margin-bottom: 24px;
        }

        .ex-pretitle { display: none !important; }

        .ex-section-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0;
          line-height: 1.3;
        }

        .ex-scope-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .ex-scope-card {
          padding: 24px;
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
        }

        .scope-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: #F1F5F9;
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #0F172A;
        }

        .scope-tag {
          font-size: 0.74rem;
          font-weight: 700;
          color: #64748B;
          display: block;
          margin-bottom: 2px;
        }

        .scope-title {
          font-size: 1.05rem;
          font-weight: 800;
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
          font-size: 0.86rem;
          color: #334155;
          line-height: 1.5;
          font-weight: 500;
        }

        /* =======================================================
           4 DETAILED EXCLUSIONS GRID
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
          padding: 22px;
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
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #F8FAFC;
          border: 1px solid var(--border-subtle);
          color: #0F172A;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ex-badge-tag {
          font-size: 0.74rem;
          font-weight: 700;
          background: #F1F5F9;
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          padding: 3px 8px;
          color: #0F172A;
        }

        .ex-card-name {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 6px;
        }

        .ex-card-summary {
          font-size: 0.86rem;
          color: #475569;
          line-height: 1.55;
          margin-bottom: 14px;
          flex: 1;
        }

        .ex-card-boundary {
          padding-top: 10px;
          font-size: 0.8rem;
          color: #475569;
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
          padding: 24px;
          margin-bottom: 40px;
        }

        .ex-maint-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .ex-maint-icon {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: #F1F5F9;
          border: 1px solid var(--border-subtle);
          color: #0F172A;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ex-maint-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0;
        }

        .ex-maint-desc {
          font-size: 0.9rem;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .ex-maint-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .maint-chip {
          font-size: 0.78rem;
          background: #F8FAFC;
          border: 1px solid var(--border-subtle);
          color: #1E293B;
          padding: 5px 12px;
          border-radius: 6px;
          font-weight: 600;
        }

        .ex-cta-box {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .ex-scope-grid,
          .ex-cards-grid {
            grid-template-columns: 1fr;
          }
          .ex-philosophy-card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
