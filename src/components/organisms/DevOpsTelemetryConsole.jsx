import React, { useState } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  Terminal, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Lock, 
  Server, 
  Code2, 
  Printer, 
  Clock,
  Play,
  FileCode2,
  AlertTriangle,
  Layers,
  FileCheck2,
  CheckCircle,
  MessageCircle
} from 'lucide-react';
import { getOrderDevOps } from '../../utils/orderStorage';

export default function DevOpsTelemetryConsole({ order, className = '' }) {
  const [activeTab, setActiveTab] = useState('stream'); // 'stream' | 'staging' | 'audit'
  const [copiedText, setCopiedText] = useState('');

  if (!order) return null;

  const devops = getOrderDevOps(order);
  if (!devops) return null;

  const stage = Number(order.currentStageNumber) || 1;
  const isStagingReady = stage >= 4;

  const handleCopy = (text, label) => {
    if (!text) return;
    navigator.clipboard?.writeText(text);
    setCopiedText(label);
    setTimeout(() => {
      setCopiedText('');
    }, 2000);
  };

  const handlePrintAudit = () => {
    window.print();
  };

  return (
    <section className={`devops-telemetry-console ${className}`}>
      
      {/* Console Header Bar */}
      <div className="devops-console-header">
        <div className="devops-console-title-group">
          <div className="devops-console-badge-row">
            <span className="devops-pill devops-pill-dark">
              <Code2 size={13} />
              <span>DevOps Telemetry Console</span>
            </span>
            <span className="devops-pill devops-pill-status">
              <span className="devops-status-dot" />
              <span>CI/CD PIPELINE: PASS</span>
            </span>
          </div>
          <h3 className="devops-console-title">
            Telemetri Rekayasa &amp; Kendali Versi Git
          </h3>
          <p className="devops-console-subtitle">
            Transparansi alur kendali versi kode, lingkungan pratinjau live demo, dan verifikasi kepatuhan arsitektur perangkat lunak.
          </p>
        </div>

        {/* Console Branch Metadata */}
        <div className="devops-meta-box">
          <div className="devops-meta-item">
            <span className="devops-meta-label">Branch Aktif:</span>
            <span className="devops-meta-val">
              <GitBranch size={14} />
              <code>{devops.branch}</code>
            </span>
          </div>
          <div className="devops-meta-item">
            <span className="devops-meta-label">Total Commit:</span>
            <span className="devops-meta-val">{devops.totalCommits} Versi Tercatat</span>
          </div>
        </div>
      </div>

      {/* Segmented Tab Navigation */}
      <div className="devops-tab-bar" role="tablist" aria-label="DevOps Tabs">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'stream'}
          onClick={() => setActiveTab('stream')}
          className={`devops-tab-btn ${activeTab === 'stream' ? 'active' : ''}`}
        >
          <GitCommit size={15} />
          <span>Repositori &amp; Git Stream</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'staging'}
          onClick={() => setActiveTab('staging')}
          className={`devops-tab-btn ${activeTab === 'staging' ? 'active' : ''}`}
        >
          <Play size={15} />
          <span>Pratinjau Sandbox (Demo Live)</span>
          {isStagingReady && <span className="devops-tab-chip">Aktif</span>}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'audit'}
          onClick={() => setActiveTab('audit')}
          className={`devops-tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
        >
          <ShieldCheck size={15} />
          <span>Audit Kualitas &amp; Keamanan</span>
        </button>
      </div>

      {/* TAB 1: Repositori & Git Stream */}
      {activeTab === 'stream' && (
        <div className="devops-panel-body">
          
          {/* Repository Specs Grid */}
          <div className="devops-repo-grid">
            <div className="devops-spec-card">
              <div className="devops-spec-label">
                <Lock size={13} />
                <span>Repositori Internal (Privat)</span>
              </div>
              <div className="devops-spec-val-row">
                <code>{devops.repoName}</code>
                <button
                  type="button"
                  onClick={() => handleCopy(devops.repoName, 'repo')}
                  className="devops-copy-btn"
                  title="Salin nama repositori"
                  aria-label="Salin nama repositori"
                >
                  {copiedText === 'repo' ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                </button>
              </div>
              <div className="devops-spec-footnote">
                Terenkripsi &bull; Akses master code diserahkan penuh pasca-pelunasan.
              </div>
            </div>

            <div className="devops-spec-card">
              <div className="devops-spec-label">
                <GitCommit size={13} />
                <span>Commit Milestone Terakhir</span>
              </div>
              <div className="devops-spec-val-row">
                <code>{devops.latestCommit.hash}</code>
                <button
                  type="button"
                  onClick={() => handleCopy(devops.latestCommit.hash, 'hash')}
                  className="devops-copy-btn"
                  title="Salin commit hash"
                  aria-label="Salin commit hash"
                >
                  {copiedText === 'hash' ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                </button>
              </div>
              <div className="devops-spec-footnote">
                Oleh {devops.latestCommit.author} &bull; {devops.latestCommit.date}
              </div>
            </div>
          </div>

          {/* Commit History Timeline */}
          <div className="devops-commit-timeline-wrap">
            <h4 className="devops-subheading">
              Linimasa Rekayasa Kode Program (Commit Log Milestone)
            </h4>

            <div className="devops-timeline-list">
              {devops.commitHistory.map((item, idx) => (
                <div key={item.hash} className="devops-timeline-item">
                  <div className="devops-timeline-node">
                    <span className="devops-timeline-dot" />
                    {idx < devops.commitHistory.length - 1 && <span className="devops-timeline-line" />}
                  </div>
                  
                  <div className="devops-commit-card">
                    <div className="devops-commit-header">
                      <div className="devops-commit-hash-group">
                        <code className="devops-commit-hash">{item.hash}</code>
                        <span className="devops-stage-pill">
                          Tahap {item.stage} SOP
                        </span>
                      </div>
                      <span className="devops-commit-date">
                        {item.date}
                      </span>
                    </div>
                    <div className="devops-commit-message">
                      {item.message}
                    </div>
                    <div className="devops-commit-author">
                      Engineer: <strong>{item.author}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Local Deployment Command Preview */}
          <div className="devops-terminal-box">
            <div className="devops-terminal-top">
              <div className="devops-terminal-dots">
                <span className="t-dot t-red" />
                <span className="t-dot t-yellow" />
                <span className="t-dot t-green" />
              </div>
              <span className="devops-terminal-title">Instruksi Eksekusi Master Code Pasca Serah Terima</span>
              <button
                type="button"
                onClick={() => handleCopy(`git clone git@aksaratech-private:${devops.repoName}.git\ncd ${order.packageId}\nnpm install && npm run dev`, 'cmd')}
                className="devops-terminal-copy"
                aria-label="Salin instruksi terminal"
              >
                {copiedText === 'cmd' ? <Check size={13} color="#34D399" /> : <Copy size={13} />}
                <span>{copiedText === 'cmd' ? 'Tersalin' : 'Salin Perintah'}</span>
              </button>
            </div>
            <pre className="devops-terminal-code">
              <code>{`# 1. Ekstrak arsip master source code (.zip) atau clone repositori privat\ngit clone git@aksaratech-private:${devops.repoName}.git\n\n# 2. Masuk ke direktori dan pasang dependensi terverifikasi\ncd ${order.packageId}\nnpm install\n\n# 3. Jalankan server lokal mandiri tanpa biaya sewa cloud pihak ketiga\nnpm run dev\n# -> Local server aktif: http://localhost:5173/`}</code>
            </pre>
          </div>

        </div>
      )}

      {/* TAB 2: Pratinjau Sandbox (Demo Live) */}
      {activeTab === 'staging' && (
        <div className="devops-panel-body">
          {isStagingReady ? (
            <div className="devops-staging-active-box">
              <div className="devops-staging-banner">
                <div className="devops-staging-status-row">
                  <span className="devops-status-badge-active">
                    <span className="devops-pulse-dot" />
                    <span>LINGKUNGAN SANDBOX LIVE AKTIF</span>
                  </span>
                  <span className="devops-staging-badge-ssl">SSL TLS 1.3 Terverifikasi</span>
                </div>
                <h4 className="devops-staging-heading">
                  Sesi Uji Coba Pratinjau Pertama Telah Siap Digunakan
                </h4>
                <p className="devops-staging-desc">
                  Sistem web telah selesai dirangkai pada lingkungan isolasi *staging sandbox*. Anda dapat menguji seluruh fungsionalitas, alur navigasi responsif, dan pengolahan data sebelum melakukan pelunasan sisa 50%.
                </p>

                {/* Staging URL Link Box */}
                <div className="devops-staging-url-card">
                  <div className="devops-url-text-group">
                    <span className="devops-url-label">Alamat URL Staging Live:</span>
                    <a 
                      href={devops.staging.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="devops-url-link"
                    >
                      <span>{devops.staging.url}</span>
                      <ExternalLink size={15} />
                    </a>
                  </div>
                  
                  <a
                    href={devops.staging.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="devops-launch-btn"
                  >
                    <span>Buka Demo Pratinjau</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Credentials & Guidelines 2 Columns */}
              <div className="devops-staging-info-grid">
                
                {/* Demo Credentials Box */}
                <div className="devops-card-white">
                  <h5 className="devops-card-title">
                    <Lock size={15} color="#0F172A" />
                    <span>Kredensial Akun Pengujian (Testing Account)</span>
                  </h5>
                  <div className="devops-credential-rows">
                    <div className="devops-cred-row">
                      <span className="devops-cred-label">Akun Uji Coba:</span>
                      <div className="devops-cred-val-group">
                        <code>admin@demo.test</code>
                        <button
                          type="button"
                          onClick={() => handleCopy('admin@demo.test', 'user')}
                          className="devops-copy-icon-btn"
                          aria-label="Salin email uji coba"
                        >
                          {copiedText === 'user' ? <Check size={13} color="#059669" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>
                    <div className="devops-cred-row">
                      <span className="devops-cred-label">Kata Sandi:</span>
                      <div className="devops-cred-val-group">
                        <code>AksaraDev2026!</code>
                        <button
                          type="button"
                          onClick={() => handleCopy('AksaraDev2026!', 'pwd')}
                          className="devops-copy-icon-btn"
                          aria-label="Salin kata sandi uji coba"
                        >
                          {copiedText === 'pwd' ? <Check size={13} color="#059669" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="devops-cred-note">
                    *Gunakan akun pengujian di atas untuk memeriksa halaman dashboard admin dan simulasi input database.
                  </div>
                </div>

                {/* SOP Testing Protocol Box */}
                <div className="devops-card-white">
                  <h5 className="devops-card-title">
                    <CheckCircle2 size={15} color="#0F172A" />
                    <span>Panduan Validasi Uji Mandiri</span>
                  </h5>
                  <ul className="devops-testing-checklist">
                    <li>Uji tampilan responsif di layar HP dan monitor desktop.</li>
                    <li>Coba formulir kontak / pemesanan dan verifikasi pesan terkirim.</li>
                    <li>Coba tambah atau cari data etalase (jika paket berdatabase).</li>
                    <li>Catat poin penyesuaian jika ada untuk Sesi Revisi SOP resmi.</li>
                  </ul>
                  <div className="devops-testing-action-row">
                    <a
                      href={`https://wa.me/6285600386692?text=${encodeURIComponent(`Halo PIC Aksara Tech, saya telah memeriksa pratinjau demo live untuk tiket ${order.id}. Berikut catatan pengujian mandiri saya:`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="devops-wa-report-btn"
                    >
                      <MessageCircle size={15} color="#25D366" />
                      <span>Kirim Catatan Uji Coba ke PIC</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            /* When Stage < 4 (Preparing) */
            <div className="devops-staging-pending-box">
              <div className="devops-pending-icon-wrap">
                <Clock size={28} color="#0F172A" />
              </div>
              <h4 className="devops-pending-heading">
                Lingkungan Sandbox Sedang Dalam Tahap Kompilasi
              </h4>
              <p className="devops-pending-desc">
                Sesuai standar operasional (SOP) Aksara Tech, lingkungan pratinjau live demo diaktifkan secara resmi pada <strong>Tahap 4</strong> setelah skema basis data relasional (Tahap 2) dan arsitektur kode sumber (Tahap 3) selesai terintegrasi secara utuh.
              </p>
              
              <div className="devops-pending-metrics">
                <div className="devops-pending-step">
                  <div className="devops-pending-step-num">Tahap {stage}</div>
                  <div className="devops-pending-step-desc">Status Proyek Saat Ini</div>
                </div>
                <div className="devops-pending-step">
                  <div className="devops-pending-step-num">Tahap 4</div>
                  <div className="devops-pending-step-desc">Target Rilis Staging Live</div>
                </div>
                <div className="devops-pending-step">
                  <div className="devops-pending-step-num">{order.estimatedCompletion}</div>
                  <div className="devops-pending-step-desc">Estimasi Waktu Penyelesaian</div>
                </div>
              </div>

              <div className="devops-pending-target-box">
                <span className="devops-pending-target-label">Target URL Staging:</span>
                <code>{devops.staging.url}</code>
                <span className="devops-pill-pending">Status: Menunggu Antrean Build</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Audit Kualitas & Keamanan Rekayasa */}
      {activeTab === 'audit' && (
        <div className="devops-panel-body">
          
          {/* Certificate Header Banner */}
          <div className="devops-audit-cert-banner">
            <div className="devops-cert-left">
              <div className="devops-cert-badge">
                <ShieldCheck size={16} />
                <span>VERIFIKASI MUTU REKAYASA SISTEM</span>
              </div>
              <h4 className="devops-cert-title">
                Sertifikat Kepatuhan Standar Perangkat Lunak Aksara Tech
              </h4>
              <p className="devops-cert-desc">
                Setiap baris kode sumber melewati empat lapis pengujian deterministik sebelum diserahkan kepada klien: sanitasi parameter basis data, pemisahan arsitektur modular, kelengkapan dokumentasi, dan pemeriksaan kerentanan dependensi.
              </p>
            </div>
            
            <div className="devops-cert-score-box">
              <div className="devops-cert-score-label">Indeks Integritas Kode:</div>
              <div className="devops-cert-score-val">{devops.audit.securityScore}</div>
              <div className="devops-cert-score-date">Audit per {devops.audit.auditDate}</div>
            </div>
          </div>

          {/* 4 Deterministic Audit Gates */}
          <div className="devops-audit-gates-grid">
            
            {/* Gate 1: SQL Injection & Input Sanitization */}
            <div className="devops-gate-card">
              <div className="devops-gate-top">
                <div className="devops-gate-status pass">
                  <CheckCircle size={15} />
                  <span>TERVERIFIKASI AMAN</span>
                </div>
                <span className="devops-gate-tag">Keamanan Basis Data</span>
              </div>
              <h5 className="devops-gate-title">
                Proteksi Injeksi SQL &amp; Sanitasi Parameter Input
              </h5>
              <p className="devops-gate-desc">
                Seluruh kueri basis data memanfaatkan *Prepared Statements* (PDO/ORM) dengan pemisahan parameter ketat guna menutup celah SQL Injection dan sanitasi XSS pada input pengguna.
              </p>
              <div className="devops-gate-meta">
                Standar: OWASP Top 10 A03:2021 &bull; 0 Vulnerabilities Detected
              </div>
            </div>

            {/* Gate 2: Clean Modular Architecture */}
            <div className="devops-gate-card">
              <div className="devops-gate-top">
                <div className="devops-gate-status pass">
                  <CheckCircle size={15} />
                  <span>TERVERIFIKASI AMAN</span>
                </div>
                <span className="devops-gate-tag">Arsitektur Kode</span>
              </div>
              <h5 className="devops-gate-title">
                Pemisahan Tanggung Jawab Modular (Separation of Concerns)
              </h5>
              <p className="devops-gate-desc">
                Struktur kode bersih tanpa logika spaghetti. Antarmuka (presentation), manipulasi data (business logic), dan konfigurasi dipisahkan secara modular untuk kemudahan modifikasi mandiri.
              </p>
              <div className="devops-gate-meta">
                Pola: 3-Tier Layered &bull; Clean Code Hygiene Certified
              </div>
            </div>

            {/* Gate 3: Relational Database 3NF & Documentation */}
            <div className="devops-gate-card">
              <div className="devops-gate-top">
                <div className="devops-gate-status pass">
                  <CheckCircle size={15} />
                  <span>TERVERIFIKASI RESMI</span>
                </div>
                <span className="devops-gate-tag">Struktur Database</span>
              </div>
              <h5 className="devops-gate-title">
                Normalisasi Basis Data 3NF &amp; Dokumen Rekayasa Formal
              </h5>
              <p className="devops-gate-desc">
                Skema tabel database dirancang memenuhi bentuk normalisasi ketiga (3NF) guna mencegah anomali data, dilengkapi diagram ERD dan use case fungsional sesuai ketentuan paket.
              </p>
              <div className="devops-gate-meta">
                Skema: Relasional MySQL/PostgreSQL &bull; Integritas Relasi Terkunci
              </div>
            </div>

            {/* Gate 4: Dependency Vulnerability Audit */}
            <div className="devops-gate-card">
              <div className="devops-gate-top">
                <div className="devops-gate-status pass">
                  <CheckCircle size={15} />
                  <span>TERVERIFIKASI BERSIH</span>
                </div>
                <span className="devops-gate-tag">Integritas Dependensi</span>
              </div>
              <h5 className="devops-gate-title">
                Pemeriksaan Dependensi Pihak Ketiga &amp; Garansi Kode
              </h5>
              <p className="devops-gate-desc">
                Audit otomatis terhadap pustaka dependensi (package audit) memastikan nol kerentanan berisiko tinggi. Terlindungi garansi perbaikan bug kode selama 7 hari kalender pasca-serah terima.
              </p>
              <div className="devops-gate-meta">
                Garansi Bug: 1 Minggu Kalender Aktif &bull; Zero High-Risk CVEs
              </div>
            </div>

          </div>

          {/* Action Row: Print Certificate */}
          <div className="devops-audit-actions">
            <div className="devops-audit-action-note">
              Dokumen audit mutu rekayasa ini dilampirkan bersama berkas Master Source Code (.zip) dan skema database (.sql).
            </div>
            <button
              type="button"
              onClick={handlePrintAudit}
              className="devops-print-btn"
            >
              <Printer size={16} />
              <span>Cetak Berita Acara Audit Rekayasa (PDF)</span>
            </button>
          </div>

        </div>
      )}

      <style>{`
        /* Core Console Frame */
        .devops-telemetry-console {
          background-color: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-radius: 12px;
          overflow: hidden;
          color: #0F172A;
          margin-top: 4px;
        }

        /* Header Bar */
        .devops-console-header {
          background-color: #0F172A;
          color: #FFFFFF;
          padding: 22px 24px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
        }
        .devops-console-title-group {
          flex: 1 1 360px;
        }
        .devops-console-badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }
        .devops-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.74rem;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 4px;
          letter-spacing: 0.04em;
        }
        .devops-pill-dark {
          background-color: #1E293B;
          color: #F8FAFC;
          border: 1.5px solid #334155;
        }
        .devops-pill-status {
          background-color: #064E3B;
          color: #A7F3D0;
          border: 1.5px solid #059669;
        }
        .devops-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #34D399;
        }
        .devops-console-title {
          font-size: 1.22rem;
          font-weight: 900;
          color: #FFFFFF;
          margin: 0 0 6px 0;
          letter-spacing: -0.015em;
        }
        .devops-console-subtitle {
          font-size: 0.86rem;
          color: #94A3B8;
          margin: 0;
          line-height: 1.5;
          max-width: 640px;
        }
        .devops-meta-box {
          background-color: #1E293B;
          border: 1.5px solid #334155;
          border-radius: 8px;
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 220px;
        }
        .devops-meta-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.82rem;
        }
        .devops-meta-label {
          color: #94A3B8;
          font-weight: 600;
        }
        .devops-meta-val {
          color: #F8FAFC;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .devops-meta-val code {
          background-color: #0F172A;
          padding: 2px 6px;
          border-radius: 4px;
          color: #38BDF8;
          font-size: 0.82rem;
        }

        /* Segmented Tabs */
        .devops-tab-bar {
          display: flex;
          background-color: #F8FAFC;
          border-bottom: 1.5px solid #CBD5E1;
          padding: 6px 12px 0 12px;
          gap: 6px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .devops-tab-bar::-webkit-scrollbar {
          display: none;
        }
        .devops-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1.5px solid transparent;
          border-bottom: none;
          border-radius: 8px 8px 0 0;
          padding: 10px 16px;
          font-size: 0.86rem;
          font-weight: 700;
          color: #475569;
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .devops-tab-btn:hover {
          color: #0F172A;
          background-color: #F1F5F9;
        }
        .devops-tab-btn.active {
          background-color: #FFFFFF;
          color: #0F172A;
          border-color: #CBD5E1;
          border-bottom: 2px solid #FFFFFF;
          margin-bottom: -1.5px;
        }
        .devops-tab-chip {
          background-color: #059669;
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 1px 6px;
          border-radius: 4px;
        }

        /* Panel Body */
        .devops-panel-body {
          padding: 24px;
          background-color: #FFFFFF;
        }

        /* Repo Specs Grid */
        .devops-repo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 14px;
          margin-bottom: 24px;
        }
        .devops-spec-card {
          background-color: #F8FAFC;
          border: 1.5px solid #CBD5E1;
          border-radius: 8px;
          padding: 14px 16px;
        }
        .devops-spec-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #475569;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .devops-spec-val-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 6px;
        }
        .devops-spec-val-row code {
          font-size: 0.94rem;
          font-weight: 700;
          color: #0F172A;
          word-break: break-all;
        }
        .devops-copy-btn {
          background-color: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-radius: 4px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #334155;
          flex-shrink: 0;
          transition: background-color 0.15s;
        }
        .devops-copy-btn:hover {
          background-color: #F1F5F9;
        }
        .devops-spec-footnote {
          font-size: 0.76rem;
          color: #64748B;
          line-height: 1.4;
        }

        /* Subheadings */
        .devops-subheading {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 16px 0;
        }

        /* Commit Timeline */
        .devops-commit-timeline-wrap {
          margin-bottom: 24px;
        }
        .devops-timeline-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .devops-timeline-item {
          display: grid;
          grid-template-columns: 24px 1fr;
          gap: 14px;
        }
        .devops-timeline-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 14px;
        }
        .devops-timeline-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #0F172A;
          border: 2px solid #CBD5E1;
          box-sizing: border-box;
          flex-shrink: 0;
        }
        .devops-timeline-line {
          width: 2px;
          flex: 1;
          background-color: #E2E8F0;
          margin-top: 4px;
        }
        .devops-commit-card {
          background-color: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 8px;
          padding: 12px 16px;
          margin-bottom: 10px;
        }
        .devops-commit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 6px;
        }
        .devops-commit-hash-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .devops-commit-hash {
          font-size: 0.82rem;
          font-weight: 800;
          color: #0F172A;
          background-color: #E2E8F0;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .devops-stage-pill {
          font-size: 0.74rem;
          font-weight: 700;
          color: #0F172A;
          background-color: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .devops-commit-date {
          font-size: 0.78rem;
          color: #64748B;
          font-weight: 600;
        }
        .devops-commit-message {
          font-size: 0.88rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 4px;
          line-height: 1.4;
        }
        .devops-commit-author {
          font-size: 0.78rem;
          color: #64748B;
        }

        /* Terminal Box */
        .devops-terminal-box {
          background-color: #0F172A;
          border: 1.5px solid #334155;
          border-radius: 8px;
          overflow: hidden;
        }
        .devops-terminal-top {
          background-color: #1E293B;
          padding: 8px 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1.5px solid #334155;
        }
        .devops-terminal-dots {
          display: flex;
          gap: 6px;
        }
        .t-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .t-red { background-color: #EF4444; }
        .t-yellow { background-color: #F59E0B; }
        .t-green { background-color: #10B981; }
        .devops-terminal-title {
          font-size: 0.78rem;
          font-weight: 700;
          color: #94A3B8;
        }
        .devops-terminal-copy {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background-color: #0F172A;
          color: #F8FAFC;
          border: 1.5px solid #334155;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.15s;
        }
        .devops-terminal-copy:hover {
          background-color: #334155;
        }
        .devops-terminal-code {
          margin: 0;
          padding: 16px;
          color: #F8FAFC;
          font-size: 0.84rem;
          line-height: 1.6;
          overflow-x: auto;
          font-family: inherit;
        }
        .devops-terminal-code code {
          font-family: Consolas, Monaco, "Courier New", monospace;
          color: #38BDF8;
        }

        /* Staging Active */
        .devops-staging-active-box {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .devops-staging-banner {
          background-color: #F8FAFC;
          border: 1.5px solid #CBD5E1;
          border-radius: 10px;
          padding: 22px;
        }
        .devops-staging-status-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }
        .devops-status-badge-active {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: #ECFDF5;
          color: #065F46;
          border: 1.5px solid #059669;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.04em;
        }
        .devops-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #10B981;
        }
        .devops-staging-badge-ssl {
          font-size: 0.76rem;
          font-weight: 700;
          color: #475569;
          background-color: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          padding: 3px 8px;
          border-radius: 4px;
        }
        .devops-staging-heading {
          font-size: 1.18rem;
          font-weight: 900;
          color: #0F172A;
          margin: 0 0 6px 0;
        }
        .devops-staging-desc {
          font-size: 0.9rem;
          color: #475569;
          margin: 0 0 18px 0;
          line-height: 1.55;
          max-width: 860px;
        }
        .devops-staging-url-card {
          background-color: #FFFFFF;
          border: 1.5px solid #0F172A;
          border-radius: 8px;
          padding: 14px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
        }
        .devops-url-text-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .devops-url-label {
          font-size: 0.76rem;
          font-weight: 700;
          color: #64748B;
          text-transform: uppercase;
        }
        .devops-url-link {
          font-size: 1.02rem;
          font-weight: 800;
          color: var(--prussian-blue, #2563EB);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .devops-url-link:hover {
          text-decoration: underline;
        }
        .devops-launch-btn {
          background-color: #0F172A;
          color: #FFFFFF;
          padding: 10px 18px;
          border-radius: 6px;
          font-size: 0.88rem;
          font-weight: 800;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.15s;
          min-height: 44px;
        }
        .devops-launch-btn:hover {
          background-color: #1E293B;
        }

        /* Staging Grid 2 Col */
        .devops-staging-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 16px;
        }
        .devops-card-white {
          background-color: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-radius: 8px;
          padding: 18px;
        }
        .devops-card-title {
          font-size: 0.96rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 14px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .devops-credential-rows {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background-color: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          padding: 12px;
          border-radius: 6px;
        }
        .devops-cred-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.86rem;
        }
        .devops-cred-label {
          color: #475569;
          font-weight: 600;
        }
        .devops-cred-val-group {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .devops-cred-val-group code {
          font-weight: 800;
          color: #0F172A;
          background-color: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.86rem;
        }
        .devops-copy-icon-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: #64748B;
          display: flex;
          padding: 2px;
        }
        .devops-cred-note {
          font-size: 0.78rem;
          color: #64748B;
          margin-top: 10px;
          line-height: 1.45;
        }
        .devops-testing-checklist {
          margin: 0 0 14px 0;
          padding-left: 20px;
          font-size: 0.86rem;
          color: #334155;
          line-height: 1.6;
        }
        .devops-testing-action-row {
          margin-top: 10px;
        }
        .devops-wa-report-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #F8FAFC;
          border: 1.5px solid #CBD5E1;
          color: #0F172A;
          padding: 9px 14px;
          border-radius: 6px;
          font-size: 0.84rem;
          font-weight: 700;
          text-decoration: none;
          transition: background-color 0.15s;
        }
        .devops-wa-report-btn:hover {
          background-color: #F1F5F9;
        }

        /* Staging Pending */
        .devops-staging-pending-box {
          background-color: #F8FAFC;
          border: 1.5px solid #CBD5E1;
          border-radius: 10px;
          padding: 32px 24px;
          text-align: center;
        }
        .devops-pending-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px auto;
        }
        .devops-pending-heading {
          font-size: 1.25rem;
          font-weight: 900;
          color: #0F172A;
          margin: 0 0 8px 0;
        }
        .devops-pending-desc {
          font-size: 0.92rem;
          color: #475569;
          max-width: 680px;
          margin: 0 auto 24px auto;
          line-height: 1.6;
        }
        .devops-pending-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
          max-width: 680px;
          margin: 0 auto 20px auto;
        }
        .devops-pending-step {
          background-color: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 8px;
          padding: 12px;
        }
        .devops-pending-step-num {
          font-size: 1rem;
          font-weight: 800;
          color: #0F172A;
        }
        .devops-pending-step-desc {
          font-size: 0.76rem;
          color: #64748B;
          margin-top: 2px;
        }
        .devops-pending-target-box {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background-color: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 0.84rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .devops-pending-target-label {
          color: #64748B;
          font-weight: 700;
        }
        .devops-pending-target-box code {
          font-weight: 700;
          color: #0F172A;
        }
        .devops-pill-pending {
          background-color: #FEF3C7;
          color: #92400E;
          border: 1.5px solid #F59E0B;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 4px;
        }

        /* Audit Panel */
        .devops-audit-cert-banner {
          background-color: #F8FAFC;
          border: 1.5px solid #CBD5E1;
          border-radius: 10px;
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 24px;
        }
        .devops-cert-left {
          flex: 1 1 420px;
        }
        .devops-cert-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: #0F172A;
          color: #FFFFFF;
          font-size: 0.74rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 4px;
          margin-bottom: 10px;
          letter-spacing: 0.05em;
        }
        .devops-cert-title {
          font-size: 1.25rem;
          font-weight: 900;
          color: #0F172A;
          margin: 0 0 8px 0;
        }
        .devops-cert-desc {
          font-size: 0.88rem;
          color: #475569;
          margin: 0;
          line-height: 1.6;
        }
        .devops-cert-score-box {
          background-color: #FFFFFF;
          border: 2px solid #0F172A;
          border-radius: 8px;
          padding: 16px 20px;
          min-width: 200px;
          text-align: center;
        }
        .devops-cert-score-label {
          font-size: 0.76rem;
          font-weight: 800;
          color: #64748B;
          text-transform: uppercase;
        }
        .devops-cert-score-val {
          font-size: 1.4rem;
          font-weight: 900;
          color: #059669;
          margin: 4px 0;
        }
        .devops-cert-score-date {
          font-size: 0.76rem;
          color: #64748B;
          font-weight: 600;
        }

        /* 4 Gates Grid */
        .devops-audit-gates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        .devops-gate-card {
          background-color: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-radius: 8px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 10px;
        }
        .devops-gate-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2px;
        }
        .devops-gate-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.74rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .devops-gate-status.pass {
          background-color: #ECFDF5;
          color: #065F46;
          border: 1.5px solid #059669;
        }
        .devops-gate-tag {
          font-size: 0.74rem;
          color: #64748B;
          font-weight: 700;
        }
        .devops-gate-title {
          font-size: 0.98rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0;
          line-height: 1.35;
        }
        .devops-gate-desc {
          font-size: 0.84rem;
          color: #475569;
          margin: 0;
          line-height: 1.55;
        }
        .devops-gate-meta {
          font-size: 0.76rem;
          color: #64748B;
          font-weight: 700;
          border-top: 1.5px solid #F1F5F9;
          padding-top: 8px;
        }

        /* Audit Actions */
        .devops-audit-actions {
          background-color: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 8px;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .devops-audit-action-note {
          font-size: 0.84rem;
          color: #475569;
          font-weight: 600;
        }
        .devops-print-btn {
          background-color: #0F172A;
          color: #FFFFFF;
          border: none;
          border-radius: 6px;
          padding: 10px 18px;
          font-size: 0.86rem;
          font-weight: 800;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.15s;
          min-height: 44px;
        }
        .devops-print-btn:hover {
          background-color: #1E293B;
        }

        /* Mobile Adjustments */
        @media (max-width: 640px) {
          .devops-console-header {
            padding: 18px 16px;
          }
          .devops-meta-box {
            width: 100%;
          }
          .devops-panel-body {
            padding: 16px 14px;
          }
          .devops-tab-btn {
            padding: 8px 12px;
            font-size: 0.8rem;
          }
          .devops-staging-banner {
            padding: 16px 14px;
          }
          .devops-staging-url-card {
            padding: 12px 14px;
          }
          .devops-launch-btn {
            width: 100%;
            justify-content: center;
          }
          .devops-audit-cert-banner {
            padding: 16px 14px;
          }
          .devops-cert-score-box {
            width: 100%;
          }
          .devops-print-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
