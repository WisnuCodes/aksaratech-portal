import React, { useState } from 'react';
import PageHeader from '../components/molecules/PageHeader';
import { 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  RefreshCw, 
  Lock, 
  CheckCircle2, 
  Copy, 
  Check, 
  Printer, 
  Scale, 
  MessageCircle, 
  FileCheck, 
  CreditCard, 
  Building,
  CheckCheck
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/catalogData';

export default function TermsPrivacyPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [copied, setCopied] = useState(false);

  const sections = [
    {
      id: 'identitas',
      number: '1',
      title: 'Identitas Usaha & Saluran Komunikasi Tunggal',
      tag: 'Verifikasi Tunggal',
      icon: Building,
      summary: 'Seluruh transaksi dan komunikasi sah hanya melalui nomor WhatsApp resmi tunggal Aksara Tech.',
      content: (
        <div className="terms-clause-content">
          <p className="terms-lead-text">
            <strong>AKSARA TECH</strong> adalah penyedia jasa rekayasa perangkat lunak mandiri (<em>Digital Solutions &amp; Software Engineering</em>) yang beroperasi secara transparan, independen, dan terstandar.
          </p>

          <div className="terms-callout-box">
            <div className="terms-callout-header">
              <ShieldCheck size={18} style={{ color: '#0F172A', flexShrink: 0 }} />
              <strong className="terms-callout-title">Saluran Komunikasi &amp; Transaksi Tunggal:</strong>
            </div>
            <p className="terms-callout-desc">
              Seluruh konsultasi teknis, verifikasi kebutuhan, penerbitan surat penawaran, penagihan termin pembayaran, serta penyerahan master berkas koding dilakukan secara tunggal melalui kontak WhatsApp resmi: <strong>{BUSINESS_INFO.phoneDisplay}</strong> ({BUSINESS_INFO.phoneInternational}).
            </p>
          </div>

          <p className="terms-note-text">
            Catatan: Aksara Tech tidak bertanggung jawab atas kesepakatan verbal, transaksi finansial, atau pengalihan dana yang dilakukan di luar saluran resmi tersebut.
          </p>
        </div>
      )
    },
    {
      id: 'eksklusi',
      number: '2',
      title: 'Batasan Ruang Lingkup Mutlak (Eksklusi Server & Hosting)',
      tag: 'Aturan Mutlak',
      icon: AlertTriangle,
      summary: 'Fokus murni rekayasa software. Aksara Tech tidak menyediakan, mengelola, atau menagih biaya server/hosting.',
      content: (
        <div className="terms-clause-content">
          <p className="terms-lead-text">
            Aksara Tech berfokus murni pada rekayasa perangkat lunak (<em>software engineering</em>), pembuatan kode sumber aplikasi, perancangan basis data, dan penyusunan dokumen formal rekayasa (SRS &amp; SDD).
          </p>

          <div className="terms-callout-box">
            <div className="terms-callout-header">
              <AlertTriangle size={18} style={{ color: '#0F172A', flexShrink: 0 }} />
              <strong className="terms-callout-title">Hal-Hal Tegas di Luar Tanggung Jawab Aksara Tech:</strong>
            </div>
            <ul className="terms-bullet-list">
              {[
                'Penyewaan, registrasi, atau perpanjangan domain internet (.com, .id, dll).',
                'Pembelian langganan server, cPanel, VPS, Cloud Hosting, atau dedicated server.',
                'Proses deployment rilis berkas ke server pihak ketiga milik Klien.',
                'Penanganan kendala server down, serangan DDoS, atau gangguan infrastruktur penyedia hosting.'
              ].map((item, idx) => (
                <li key={idx} className="terms-bullet-item">
                  <span className="terms-dot">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="terms-callout-box subtle">
            <p className="terms-callout-desc">
              <strong>Software Maintenance Harian (Rp 50.000/hari):</strong> Murni terbatas pada pemeliharaan baris kode, penanganan error logika, refactoring script, dan penyesuaian fungsi aplikasi — <em>bukan</em> pemeliharaan mesin server fisik atau cloud pihak ketiga.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'revisi',
      number: '3',
      title: 'Kebijakan Kuota Revisi Maksimal 3 Kali Mutlak',
      tag: 'Maksimal 3 Kali',
      icon: RefreshCw,
      summary: 'Seluruh paket dibatasi kuota revisi maksimal 3 kali mutlak pasca penyerahan pratinjau pertama (Preview 1).',
      content: (
        <div className="terms-clause-content">
          <p className="terms-lead-text">
            Demi kepastian jadwal rilis yang tepat waktu dan transparansi kerja kedua belah pihak, seluruh paket di Aksara Tech mencakup fasilitas kuota revisi <strong>MAKSIMAL 3 KALI secara mutlak</strong> setelah pratinjau pertama (Preview 1) diserahkan:
          </p>

          <div className="terms-steps-grid">
            {[
              {
                title: 'Berlaku Menyeluruh Tanpa Pembedaan Minor / Mayor',
                desc: 'Seluruh bentuk koreksi—baik penyesuaian tata letak teks maupun perubahan alur kerja—dihitung dalam jatah kuota 3 kali yang sama.'
              },
              {
                title: 'Format Daftar Poin Terstruktur (Revision List)',
                desc: 'Setiap pengajuan revisi wajib dirangkum secara tertulis dalam 1 daftar tersusun rapi agar pengembang dapat mengerjakannya secara simultan.'
              },
              {
                title: 'Mekanisme Add-on Pasca Kuota Ke-3',
                desc: 'Permintaan penyesuaian setelah kuota 3 kali habis dialihkan sebagai modul Add-on resmi berbayar dan memerlukan konfirmasi tertulis baru.'
              }
            ].map((rule, idx) => (
              <div key={idx} className="terms-step-card">
                <div className="terms-step-indicator">
                  <CheckCircle2 size={16} style={{ color: '#0F172A', flexShrink: 0 }} />
                  <strong className="terms-step-title">{rule.title}</strong>
                </div>
                <p className="terms-step-desc">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'pembayaran',
      number: '4',
      title: 'Skema Finansial & Pembayaran Dua Termin (50:50)',
      tag: 'DP 50% & Pelunasan',
      icon: CreditCard,
      summary: 'Pembayaran terbagi transparan menjadi 2 termin: Uang Muka 50% di awal dan Pelunasan 50% pasca preview disetujui.',
      content: (
        <div className="terms-clause-content">
          <p className="terms-lead-text">
            Aksara Tech menerapkan transparansi finansial penuh tanpa biaya siluman melalui skema termin pembayaran 50:50 yang terstruktur:
          </p>

          <div className="terms-payment-grid">
            <div className="terms-payment-card">
              <div className="terms-payment-header">
                <CreditCard size={18} style={{ color: '#0F172A' }} />
                <strong>Termin 1: Uang Muka (DP 50%)</strong>
              </div>
              <p className="terms-payment-desc">
                Wajib diselesaikan sebelum kick-off penulisan kode dimulai. Bersifat <strong>non-refundable</strong> apabila Klien membatalkan proyek secara sepihak setelah proses koding berjalan.
              </p>
            </div>

            <div className="terms-payment-card highlight">
              <div className="terms-payment-header">
                <CheckCircle2 size={18} style={{ color: '#0F172A' }} />
                <strong>Termin 2: Pelunasan (50%)</strong>
              </div>
              <p className="terms-payment-desc">
                Wajib diselesaikan setelah hasil preview disetujui, sebelum penyerahan master berkas final (.zip, .sql, PDF dokumentasi) dan sebelum masa garansi resmi aktif.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'kerahasiaan',
      number: '5',
      title: 'Jaminan Kerahasiaan 100% & Data Cleansing Policy',
      tag: '100% Confidential',
      icon: Lock,
      summary: 'Perlindungan penuh data sensitif klien dan pembersihan lingkungan pengujian pasca serah terima.',
      content: (
        <div className="terms-clause-content">
          <p className="terms-lead-text">
            Aksara Tech menjamin kerahasiaan penuh atas identitas Klien, brief materi bisnis, data sensitif, dan seluruh kode sumber proyek yang dikembangkan.
          </p>

          <div className="terms-callout-box">
            <div className="terms-callout-header">
              <Lock size={18} style={{ color: '#0F172A', flexShrink: 0 }} />
              <strong className="terms-callout-title">Protokol Sanitasi Data (Data Cleansing Policy):</strong>
            </div>
            <p className="terms-callout-desc">
              Seluruh berkas pengujian, basis data dummy uji coba, dan kredensial sementara yang tersimpan di lingkungan sistem internal kami akan dibersihkan secara permanen pasca proyek dinyatakan lunas dan serah terima tuntas.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'garansi',
      number: '6',
      title: 'Garansi Pemeliharaan Kode 1 Minggu (7 Hari Kalender)',
      tag: 'Garansi 7 Hari',
      icon: ShieldCheck,
      summary: 'Jaminan perbaikan bug dan galat runtime gratis selama 7 hari kalender pasca penyerahan berkas master.',
      content: (
        <div className="terms-clause-content">
          <p className="terms-lead-text">
            Setiap proyek resmi Aksara Tech dilindungi oleh <strong>Garansi Perbaikan Bug Kode selama 1 Minggu (7 hari kalender)</strong> pasca serah terima berkas final:
          </p>

          <ul className="terms-bullet-list">
            <li className="terms-bullet-item">
              <span className="terms-dot">•</span>
              <span><strong>Cakupan Garansi:</strong> Penanganan galat fungsi (*runtime error*), kesalahan sintaks koding, atau ketidaksesuaian fungsional terhadap lembar brief teknis awal.</span>
            </li>
            <li className="terms-bullet-item">
              <span className="terms-dot">•</span>
              <span><strong>Pengecualian:</strong> Tidak mencakup penambahan fitur baru di luar lembar kesepakatan awal (fitur baru dialihkan ke Add-on resmi).</span>
            </li>
            <li className="terms-bullet-item">
              <span className="terms-dot">•</span>
              <span><strong>Gugurnya Garansi:</strong> Garansi gugur otomatis apabila source code telah dimodifikasi mandiri oleh pihak ketiga atau kendala server hosting eksternal milik klien.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'serah-terima',
      number: '7',
      title: 'Penyerahan Hak Cipta & Berkas Master Final',
      tag: 'Master Source Code',
      icon: FileCheck,
      summary: 'Kepemilikan kode sumber penuh 100% dialihkan ke Klien tanpa enkripsi atau kunci lisensi.',
      content: (
        <div className="terms-clause-content">
          <p className="terms-lead-text">
            Setelah pelunasan 100% diterima, Aksara Tech menyerahkan seluruh deliverables master secara lengkap tanpa retensi:
          </p>

          <div className="terms-callout-box">
            <ul className="terms-bullet-list">
              <li className="terms-bullet-item">
                <CheckCircle2 size={16} style={{ color: '#0F172A', flexShrink: 0, marginTop: '3px' }} />
                <span><strong>Master Source Code Penuh (.zip):</strong> Kode sumber bersih terstruktur tanpa proteksi obfuscation.</span>
              </li>
              <li className="terms-bullet-item">
                <CheckCircle2 size={16} style={{ color: '#0F172A', flexShrink: 0, marginTop: '3px' }} />
                <span><strong>Skema Basis Data (.sql):</strong> Struktur tabel relasional siap impor dengan integritas relasi.</span>
              </li>
              <li className="terms-bullet-item">
                <CheckCircle2 size={16} style={{ color: '#0F172A', flexShrink: 0, marginTop: '3px' }} />
                <span><strong>Dokumen Rekayasa (SRS &amp; SDD):</strong> Berkas PDF formal &amp; Diagram UML lengkap (sesuai spesifikasi paket).</span>
              </li>
            </ul>
          </div>

          <p className="terms-note-text">
            Seluruh hak guna dan kepemilikan kode sumber diserahkan secara bebas dan mutlak kepada pihak Klien.
          </p>
        </div>
      )
    }
  ];

  const filteredSections = activeFilter === 'all' 
    ? sections 
    : sections.filter(s => s.id === activeFilter);

  const handleCopySummary = () => {
    const summary = `[KETENTUAN LAYANAN RESMI AKSARA TECH]
1. Kontak Tunggal: WA ${BUSINESS_INFO.phoneDisplay} (${BUSINESS_INFO.phoneInternational})
2. Eksklusi Server: Software murni, tidak melayani sewa hosting/domain/cPanel.
3. Kuota Revisi: Maksimal 3 kali mutlak (minor/mayor dihitung merata).
4. Termin Pembayaran: DP 50% non-refundable & Pelunasan 50% sebelum serah terima berkas.
5. Kerahasiaan: Jaminan kerahasiaan 100% & Data Cleansing Policy pasca serah terima.
6. Garansi Kode: Bebas bug 7 hari kalender pasca rilis master.
7. Deliverables: Full Master Source Code (.zip), .sql relasional, dan SRS/SDD PDF.`;

    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="terms-page">
      <PageHeader
        breadcrumbs={[{ label: 'Ketentuan Layanan & Privasi' }]}
        badge="Legalitas &amp; Tata Kelola"
        badgeIcon={FileText}
        title="Ketentuan Layanan &amp;"
        highlightText="Kebijakan Privasi"
        description="Landasan hukum operasional Aksara Tech yang mengatur batasan ruang lingkup koding, hak cipta, kuota revisi maksimal 3 kali, dan jaminan sanitasi data."
      />

      <section className="section-padding terms-section">
        <div className="container terms-container">
          
          {/* Executive Document Dispatch & Action Bar */}
          <div className="terms-dispatch-bar">
            <div className="terms-dispatch-info">
              <div className="terms-dispatch-icon">
                <Scale size={20} />
              </div>
              <div className="terms-dispatch-meta">
                <div className="terms-dispatch-tags">
                  <span className="terms-tag-active">DOKUMEN RESMI BERLAKU</span>
                  <span className="terms-tag-id">DOC-ID: AT/LEGAL/SOP-V1.4</span>
                </div>
                <div className="terms-dispatch-entity">
                  Entitas Resmi: Aksara Tech Enterprise Solutions
                </div>
              </div>
            </div>

            <div className="terms-dispatch-actions">
              <button
                type="button"
                onClick={handleCopySummary}
                className="terms-action-btn"
                title="Salin Poin Inti Ketentuan Layanan"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? 'Tersalin' : 'Salin Poin Inti'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="terms-action-btn secondary"
                title="Cetak Dokumen Legal"
              >
                <Printer size={15} />
                <span>Cetak Dokumen</span>
              </button>
            </div>
          </div>

          {/* Quick Jump Category Chips */}
          <nav aria-label="Navigasi Pasal" className="terms-category-nav">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`terms-nav-chip ${activeFilter === 'all' ? 'active' : ''}`}
            >
              <span>Semua 7 Pasal</span>
            </button>

            {sections.map(s => {
              const isActive = activeFilter === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveFilter(s.id)}
                  className={`terms-nav-chip ${isActive ? 'active' : ''}`}
                >
                  <span>Pasal {s.number}</span>
                </button>
              );
            })}
          </nav>

          {/* Articles List */}
          <div className="terms-articles-stack">
            {filteredSections.map((sec) => (
              <article
                key={sec.id}
                id={`pasal-${sec.number}`}
                className="terms-article-card"
              >
                <div className="terms-article-head">
                  <div className="terms-article-badge-row">
                    <span className="terms-article-pill">PASAL {sec.number}</span>
                    <span className="terms-article-scope">{sec.tag}</span>
                  </div>
                  <h2 className="terms-article-title">
                    {sec.title}
                  </h2>
                  <p className="terms-article-summary">
                    {sec.summary}
                  </p>
                </div>

                <div className="terms-article-body">
                  {sec.content}
                </div>
              </article>
            ))}
          </div>

          {/* Legal Acceptance & WhatsApp Consultation Card */}
          <div className="terms-acceptance-card">
            <div className="terms-acceptance-head">
              <div className="terms-acceptance-icon">
                <CheckCheck size={22} />
              </div>
              <div>
                <h3 className="terms-acceptance-title">
                  Persetujuan Otomatis Ketentuan Layanan
                </h3>
                <p className="terms-acceptance-desc">
                  Dengan mengirimkan lembar brief kebutuhan dan menyelesaikan pembayaran Uang Muka (DP 50%), Klien dinyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan tata kelola operasional Aksara Tech di atas secara mutlak.
                </p>
              </div>
            </div>

            <div className="terms-acceptance-action">
              <a
                href={`https://wa.me/${BUSINESS_INFO.waNumber}?text=Halo%20Aksara%20Tech,%20saya%20ingin%20berkonsultasi%20terkait%20Ketentuan%20Layanan%20dan%20SOP%20Kerja.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa terms-wa-btn"
              >
                <MessageCircle size={18} />
                <span>Konsultasi Pertanyaan Legal via WA</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Scoped CSS Enforcing Anti-Slop & Editorial Taste Laws */}
      <style>{`
        .terms-page {
          background-color: #F8FAFC;
          min-height: 100dvh;
        }

        .terms-section {
          padding-top: 36px;
          padding-bottom: 72px;
        }

        .terms-container {
          max-width: 920px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Dispatch Bar */
        .terms-dispatch-bar {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          margin-bottom: 24px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .terms-dispatch-info {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .terms-dispatch-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #F1F5F9;
          color: #0F172A;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .terms-dispatch-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .terms-dispatch-tags {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .terms-tag-active {
          font-size: 0.72rem;
          font-weight: 800;
          color: #0F172A;
          background: #F1F5F9;
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.02em;
        }

        .terms-tag-id {
          font-size: 0.74rem;
          color: #64748B;
          font-weight: 700;
        }

        .terms-dispatch-entity {
          font-size: 0.88rem;
          font-weight: 700;
          color: #0F172A;
        }

        .terms-dispatch-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .terms-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0F172A;
          color: #FFFFFF;
          border: 1px solid #0F172A;
          border-radius: var(--radius-sm);
          padding: 9px 16px;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.18s ease, color 0.18s ease;
        }

        .terms-action-btn.secondary {
          background: #FFFFFF;
          color: #0F172A;
          border: 1px solid var(--border-subtle);
        }

        .terms-action-btn.secondary:hover {
          background: #F8FAFC;
          border-color: var(--border-main);
        }

        /* Category Nav */
        .terms-category-nav {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 8px;
          margin-bottom: 24px;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }

        .terms-category-nav::-webkit-scrollbar {
          display: none;
        }

        .terms-nav-chip {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-subtle);
          background: #FFFFFF;
          color: #334155;
          font-size: 0.82rem;
          font-weight: 700;
          white-space: nowrap;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
        }

        .terms-nav-chip:hover {
          border-color: var(--border-main);
          color: #0F172A;
        }

        .terms-nav-chip.active {
          background: #0F172A;
          color: #FFFFFF;
          border-color: #0F172A;
        }

        /* Article Cards */
        .terms-articles-stack {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 40px;
        }

        .terms-article-card {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 32px 36px;
          transition: border-color 0.2s ease;
        }

        .terms-article-card:hover {
          border-color: var(--border-main);
        }

        .terms-article-head {
          margin-bottom: 20px;
        }

        .terms-article-badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .terms-article-pill {
          font-size: 0.72rem;
          font-weight: 800;
          color: #FFFFFF;
          background: #0F172A;
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.04em;
        }

        .terms-article-scope {
          font-size: 0.78rem;
          font-weight: 700;
          color: #64748B;
        }

        .terms-article-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.35;
          margin-bottom: 8px;
          letter-spacing: -0.015em;
        }

        .terms-article-summary {
          font-size: 0.94rem;
          color: #64748B;
          line-height: 1.55;
          margin: 0;
        }

        /* Article Body Content */
        .terms-clause-content {
          font-size: 0.98rem;
          color: #334155;
          line-height: 1.7;
          font-weight: 450;
        }

        .terms-lead-text {
          margin-bottom: 16px;
        }

        .terms-callout-box {
          background: #F8FAFC;
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 18px 20px;
          margin-bottom: 16px;
        }

        .terms-callout-box.subtle {
          padding: 14px 18px;
        }

        .terms-callout-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .terms-callout-title {
          font-size: 0.92rem;
          color: #0F172A;
          font-weight: 700;
        }

        .terms-callout-desc {
          margin: 0;
          font-size: 0.92rem;
          color: #334155;
          line-height: 1.65;
        }

        .terms-note-text {
          font-size: 0.88rem;
          color: #64748B;
          font-weight: 500;
          line-height: 1.55;
          margin: 0;
        }

        /* Bullet List */
        .terms-bullet-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .terms-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.92rem;
          color: #334155;
          line-height: 1.6;
        }

        .terms-dot {
          color: #0F172A;
          font-weight: 800;
          flex-shrink: 0;
          font-size: 1.1rem;
          line-height: 1.2;
        }

        /* 3-Steps Grid in Pasal 3 */
        .terms-steps-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }

        .terms-step-card {
          background: #F8FAFC;
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 16px 20px;
        }

        .terms-step-indicator {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .terms-step-badge {
          font-size: 0.76rem;
          font-weight: 800;
          background: #0F172A;
          color: #FFFFFF;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .terms-step-title {
          font-size: 0.92rem;
          color: #0F172A;
          font-weight: 700;
        }

        .terms-step-desc {
          font-size: 0.9rem;
          color: #475569;
          margin: 0;
          line-height: 1.6;
        }

        /* Payment 50:50 Grid in Pasal 4 */
        .terms-payment-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 16px;
        }

        .terms-payment-card {
          background: #F8FAFC;
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 18px 20px;
        }

        .terms-payment-card.highlight {
          border-color: #0F172A;
        }

        .terms-payment-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.92rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .terms-payment-desc {
          margin: 0;
          font-size: 0.9rem;
          color: #475569;
          line-height: 1.6;
        }

        /* Acceptance Bottom Card */
        .terms-acceptance-card {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 28px 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .terms-acceptance-head {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .terms-acceptance-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #F1F5F9;
          color: #0F172A;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .terms-acceptance-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 6px;
          line-height: 1.35;
        }

        .terms-acceptance-desc {
          font-size: 0.92rem;
          color: #475569;
          margin: 0;
          line-height: 1.65;
        }

        .terms-acceptance-action {
          display: flex;
          align-items: center;
        }

        .terms-wa-btn {
          width: 100%;
          justify-content: center;
          padding: 14px 24px;
          font-size: 0.96rem;
          font-weight: 800;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .terms-article-card {
            padding: 24px 20px;
          }

          .terms-article-title {
            font-size: 1.18rem;
          }

          .terms-payment-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .terms-dispatch-bar {
            padding: 16px 18px;
          }

          .terms-dispatch-actions {
            width: 100%;
          }

          .terms-action-btn {
            flex: 1;
            justify-content: center;
          }

          .terms-acceptance-card {
            padding: 22px 20px;
          }
        }
      `}</style>
    </div>
  );
}
