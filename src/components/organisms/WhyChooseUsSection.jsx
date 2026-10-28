import React, { useState } from 'react';
import { Shield, Code, FileText, Lock, Zap, ServerOff, Clock, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WhyChooseUsSection() {
  const [activePillarIdx, setActivePillarIdx] = useState(0);

  const pillars = [
    {
      id: 1,
      num: '01',
      icon: Code,
      accent: 'var(--prussian-blue)',
      iconBg: '#EEF4FF',
      tag: 'Kualitas Kode',
      title: 'Arsitektur Kode Bersih & Modular',
      shortDesc: 'Penulisan source code rapi (MVC, PHP Native, Laravel, TypeScript/React) mudah dirawat.',
      fullDesc: 'Kami menerapkan standar rekayasa software teruji. Source code ditulis dengan konvensi penamaan standar industri, pemisahan dependensi (Separation of Concerns), serta komentar kode yang jelas sehingga mudah dipelajari mahasiswa atau dikembangkan tim internal korporat Anda.',
      guarantees: [
        'Source code 100% bersih tanpa obfuscation',
        'Struktur direktori modular (Controllers, Models, Views/API)',
        'Disertai panduan instalasi lokal lengkap (Local Setup Guide)',
        'Bebas dependensi bajakan atau skrip ilegal'
      ],
      techChips: ['MVC Architecture', 'PHP Native', 'Laravel', 'React / TS', 'MySQL Relasional']
    },
    {
      id: 2,
      num: '02',
      icon: FileText,
      accent: '#D97706',
      iconBg: '#FFF9E6',
      tag: 'Standar Akademik & Audit',
      title: 'Dokumentasi IEEE (SRS & SDD) & UML',
      shortDesc: 'Dokumen spesifikasi formal IEEE lengkap dengan Class Diagram, ERD, Use Case, Sequence.',
      fullDesc: 'Bukan sekadar koding jalan. Kami menyusun dokumen rekayasa formal berstandar IEEE 830 (Software Requirements Specification) dan IEEE 1016 (Software Design Description) serta diagram pemodelan UML terpadu yang siap diujikan di depan dewan penguji sidang maupun audit sistem korporat.',
      guarantees: [
        'Dokumen SRS (Software Requirements Specification) IEEE format',
        'Dokumen SDD (Software Design Description) arsitektural',
        'Diagram UML komprehensif (Use Case, Activity, Sequence, Class)',
        'Skema Entity Relationship Diagram (ERD) normalisasi data'
      ],
      techChips: ['IEEE Std 830-1998', 'IEEE Std 1016', 'UML 2.5', 'ERD Crow\'s Foot']
    },
    {
      id: 3,
      num: '03',
      icon: Zap,
      accent: '#D97706',
      iconBg: '#FFF9E6',
      tag: 'Kepastian Finansial',
      title: 'Plafon Transparan Maks Rp 650.000',
      shortDesc: 'Tidak ada biaya siluman di tengah jalan. Batasan tarif resmi tertera jelas di katalog.',
      fullDesc: 'Salah satu komitmen etis Aksara Tech adalah transparansi biaya 100%. Tarif paket kami dibatasi secara ketat dengan plafon tertinggi resmi Rp 650.000 (Paket 5 Tugas Akhir). Anda tidak akan pernah dikejutkan oleh tagihan tak terduga di tengah masa pengerjaan.',
      guarantees: [
        'Plafon tarif maksimal mengikat di Surat Penawaran resmi',
        'Skema pembayaran 2 termin transparan (DP 50% & Pelunasan 50%)',
        'Rincian modul tertuang jelas sebelum pembayaran pertama',
        'Kompensasi add-on berbayar hanya atas permintaan Klien sendiri'
      ],
      techChips: ['Plafon Rp 650rb', 'No Hidden Fees', 'Surat Penawaran Resmi', 'DP 50% Termin']
    },
    {
      id: 4,
      num: '04',
      icon: Clock,
      accent: '#059669',
      iconBg: '#ECFDF5',
      tag: 'Disiplin Rilis',
      title: 'Kuota Revisi Maksimal 3x Mutlak',
      shortDesc: 'Kepastian alur kerja tanpa perselisihan revisi minor vs mayor, terpadu pasca preview.',
      fullDesc: 'Kami menerapkan batas baku maksimal 3 kali siklus revisi resmi pasca Preview 1. Seluruh daftar perbaikan dikumpulkan secara tertulis dalam satu berkas terpadu per siklus. Protokol ini melindungi jadwal rilis proyek Anda dari pembengkakan timeline tak berujung.',
      guarantees: [
        'Penghitungan kuota dimulai setelah Klien menerima Preview 1',
        'Setiap siklus memproses satu daftar poin revisi terpadu',
        'Tanpa perdebatan klasifikasi revisi minor atau mayor',
        'Pencatatan resmi pada lembar kendali revisi Aksara Tech'
      ],
      techChips: ['Maks 3x Mutlak', 'Daftar Terpadu', 'Lembar Kendali SOP', 'Target Rilis 3-10 Hari']
    },
    {
      id: 5,
      num: '05',
      icon: ServerOff,
      accent: '#E11D48',
      iconBg: '#FFF1F2',
      tag: 'Kemandirian Klien',
      title: 'Bebas Keterikatan Server / Hosting',
      shortDesc: 'Kami fokus murni pada software. Klien memegang kendali 100% atas server & hosting.',
      fullDesc: 'Kami secara sadar menolak praktik vendor lock-in. Aksara Tech tidak menyewakan hosting bulanan atau memungut biaya perpanjangan domain tahunan. Anda memegang kepemilikan mutlak atas kode program dan bebas menjalankan server di penyedia mana pun.',
      guarantees: [
        'Aksara Tech murni rekayasa software (Zero Server Mark-up)',
        'Master berkas bersih diserahkan (.zip, .sql, PDF dokumentasi)',
        'Klien memiliki kendali 100% atas kredensial hosting dan domain',
        'Bebas biaya langganan bulanan atau retensi server tersembunyi'
      ],
      techChips: ['Zero Server Mark-up', 'No Vendor Lock-in', 'Master File Bersih', 'Hak Milik Klien']
    },
    {
      id: 6,
      num: '06',
      icon: Lock,
      accent: 'var(--prussian-blue)',
      iconBg: '#EEF4FF',
      tag: 'Keamanan Data',
      title: '100% Confidentiality & Data Cleansing',
      shortDesc: 'Jaminan kerahasiaan penuh dan pembersihan berkas berkala setelah proyek lunas.',
      fullDesc: 'Kerahasiaan identitas dan integritas kode program Anda dijamin sepenuhnya. Pasca serah terima tuntas dan pembayaran pelunasan diverifikasi, sistem kami mengeksekusi Data Cleansing Policy untuk memusnahkan arsip pengerjaan internal demi keamanan Anda.',
      guarantees: [
        'Identitas klien dan institusi tidak dipublikasikan tanpa izin',
        'Kode program dan skema database tidak dibagikan ke pihak ketiga',
        'Data Cleansing Policy berkala pasca proyek dinyatakan lunas',
        'Kerahasiaan materi skripsi atau data bisnis klien terjamin aman'
      ],
      techChips: ['100% Confidentiality', 'Data Cleansing Policy', 'Non-Disclosure Guarantee', 'Privasi Aman']
    }
  ];

  const currentPillar = pillars[activePillarIdx];
  const ActiveIcon = currentPillar.icon;

  const handlePrevPillar = () => {
    setActivePillarIdx(prev => (prev === 0 ? pillars.length - 1 : prev - 1));
  };

  const handleNextPillar = () => {
    setActivePillarIdx(prev => (prev === pillars.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="section-padding why-choose-section" style={{ position: 'relative', background: '#F8FAFC', borderTop: '2px solid #0F172A', borderBottom: '2px solid #0F172A' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Shield size={14} /> Standar Rekayasa Terpercaya
          </div>
          <h2 className="section-title">
            Mengapa Memilih <span style={{ color: 'var(--prussian-blue)' }}>Aksara Tech</span>?
          </h2>
          <p className="section-desc">
            Komitmen kami menghadirkan layanan rekayasa perangkat lunak berdisiplin tinggi, transparan, dan bebas dari praktik biaya tersembunyi yang merugikan klien.
          </p>
        </div>

        {/* Mobile Horizontal Pill Selector (Kanan-Kiri Swiper) */}
        <div className="why-mobile-pills-bar">
          <div className="why-pills-track">
            {pillars.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActivePillarIdx(idx)}
                className={`why-pill-btn ${activePillarIdx === idx ? 'active' : ''}`}
              >
                <span className="pill-num">{item.num}</span>
                <span>{item.title.split(' ')[0]} {item.title.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Split-Screen Showcase (Kanan-Kiri Desktop Layout) */}
        <div className="why-split-container">
          
          {/* Left Column: Interactive Pillar Navigator */}
          <div className="why-left-nav">
            <div className="why-nav-header">
              <span className="why-nav-badge">6 PILAR KEUNGGULAN</span>
              <span className="why-nav-sub">Klik pilar untuk rincian:</span>
            </div>

            <div className="why-nav-list">
              {pillars.map((p, idx) => {
                const IconComponent = p.icon;
                const isSelected = activePillarIdx === idx;
                return (
                  <div
                    key={p.id}
                    onClick={() => setActivePillarIdx(idx)}
                    className={`why-nav-item ${isSelected ? 'active' : ''}`}
                  >
                    <div className="why-nav-item-left">
                      <span className={`why-item-num ${isSelected ? 'active-num' : ''}`}>{p.num}</span>
                      <div className="why-item-icon" style={{ background: p.iconBg, color: p.accent }}>
                        <IconComponent size={18} />
                      </div>
                      <div className="why-item-text">
                        <div className="why-item-title">{p.title}</div>
                        <div className="why-item-tag">{p.tag}</div>
                      </div>
                    </div>
                    <ArrowRight size={16} className={`why-arrow ${isSelected ? 'active-arrow' : ''}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Featured Deep-Dive Canvas */}
          <div className="why-right-canvas neo-card">
            
            {/* Top Meta Bar */}
            <div className="why-canvas-header">
              <div className="why-canvas-badge-group">
                <span className="why-canvas-counter">PILAR {currentPillar.num} DARI 06</span>
                <span className="why-canvas-tag">{currentPillar.tag}</span>
              </div>

              {/* Navigation arrows for quick switching */}
              <div className="why-canvas-nav-arrows">
                <button 
                  type="button" 
                  onClick={handlePrevPillar}
                  className="why-ctrl-btn" 
                  title="Pilar Sebelumnya"
                  aria-label="Pilar Sebelumnya"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  type="button" 
                  onClick={handleNextPillar}
                  className="why-ctrl-btn" 
                  title="Pilar Berikutnya"
                  aria-label="Pilar Berikutnya"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Pillar Main Hero Content */}
            <div className="why-canvas-body">
              <div className="why-canvas-icon-box" style={{ background: currentPillar.iconBg, color: currentPillar.accent }}>
                <ActiveIcon size={32} />
              </div>

              <h3 className="why-canvas-title">
                {currentPillar.title}
              </h3>

              <p className="why-canvas-desc">
                {currentPillar.fullDesc}
              </p>

              {/* Guarantees Checklist */}
              <div className="why-guarantee-box">
                <div className="why-guarantee-header">
                  <Shield size={16} style={{ color: 'var(--prussian-blue)' }} />
                  <span>Jaminan Spesifikasi Resmi Aksara Tech:</span>
                </div>
                <div className="why-guarantee-list">
                  {currentPillar.guarantees.map((g, i) => (
                    <div key={i} className="why-guarantee-item">
                      <CheckCircle2 size={16} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech & Standard Chips */}
              <div className="why-tech-chips">
                <span className="chips-label">Standar Terkait:</span>
                {currentPillar.techChips.map((chip, ci) => (
                  <span key={ci} className="why-chip">{chip}</span>
                ))}
              </div>

              {/* Action Link Footer */}
              <div className="why-canvas-footer">
                <Link to="/alur-sop" className="btn btn-secondary btn-sm">
                  <span>Pelajari di Alur SOP</span>
                  <ArrowRight size={14} />
                </Link>
                <Link to="/pesan" className="btn btn-primary btn-sm">
                  <span>Pesan dengan Standar Ini</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Quick Route Teaser Strip */}
        <div className="why-route-strip">
          <Link to="/paket" className="neo-card why-route-card">
            <div>
              <div className="route-card-title">Katalog 5 Paket &amp; Add-on</div>
              <div className="route-card-sub" style={{ color: '#D97706' }}>Mulai Rp 120.000 – Rp 650.000</div>
            </div>
            <ArrowRight size={20} style={{ color: 'var(--prussian-blue)' }} />
          </Link>

          <Link to="/eksklusi-server" className="neo-card why-route-card">
            <div>
              <div className="route-card-title">Kebijakan Eksklusi Server</div>
              <div className="route-card-sub" style={{ color: '#64748B' }}>Pelajari batasan resmi ruang lingkup</div>
            </div>
            <ArrowRight size={20} style={{ color: '#D97706' }} />
          </Link>

          <Link to="/alur-sop" className="neo-card why-route-card">
            <div>
              <div className="route-card-title">Alur SOP &amp; Kuota Revisi 3x</div>
              <div className="route-card-sub" style={{ color: '#64748B' }}>4 Tahap standar operasional kerja</div>
            </div>
            <ArrowRight size={20} style={{ color: '#059669' }} />
          </Link>
        </div>

      </div>

      {/* Embedded CSS */}
      <style>{`
        .why-mobile-pills-bar {
          display: none;
        }

        .why-split-container {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 28px;
          align-items: stretch;
          margin-bottom: 48px;
        }

        .why-left-nav {
          background: #FFFFFF;
          border: 2px solid #0F172A;
          border-radius: var(--radius-md);
          box-shadow: 4px 4px 0px #0F172A;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .why-nav-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          margin-bottom: 14px;
          border-bottom: 2px solid #E2E8F0;
        }

        .why-nav-badge {
          font-size: 0.76rem;
          font-weight: 900;
          color: #0F172A;
          background: var(--kuning);
          padding: 3px 8px;
          border-radius: 4px;
          border: 1.5px solid #0F172A;
          box-shadow: 1.5px 1.5px 0px #0F172A;
        }

        .why-nav-sub {
          font-size: 0.76rem;
          color: #64748B;
          font-weight: 600;
        }

        .why-nav-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .why-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-radius: 8px;
          border: 2px solid transparent;
          background: #F8FAFC;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .why-nav-item:hover {
          background: #FFFDF0;
          border-color: #0F172A;
          transform: translateX(4px);
        }

        .why-nav-item.active {
          background: #FFFDF0;
          border-color: #0F172A;
          box-shadow: 3px 3px 0px var(--kuning);
          transform: translateX(4px);
        }

        .why-nav-item-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .why-item-num {
          font-size: 0.78rem;
          font-weight: 900;
          font-family: var(--font-mono);
          color: #94A3B8;
        }

        .why-item-num.active-num {
          color: var(--prussian-blue);
        }

        .why-item-icon {
          width: 34px;
          height: 34px;
          border-radius: 6px;
          border: 1.5px solid #0F172A;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 1.5px 1.5px 0px #0F172A;
        }

        .why-item-text {
          text-align: left;
        }

        .why-item-title {
          font-size: 0.88rem;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.3;
        }

        .why-item-tag {
          font-size: 0.72rem;
          color: #64748B;
          font-weight: 600;
        }

        .why-arrow {
          color: #CBD5E1;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .why-arrow.active-arrow {
          color: var(--prussian-blue);
          transform: translateX(3px);
        }

        /* Right Canvas */
        .why-right-canvas {
          padding: 36px;
          background: #FFFFFF;
          border: 2px solid #0F172A;
          border-radius: var(--radius-md);
          box-shadow: 6px 6px 0px var(--prussian-blue);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .why-canvas-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 18px;
          padding-bottom: 20px;
          margin-bottom: 24px;
          border-bottom: 2px solid #E2E8F0;
        }

        .why-canvas-badge-group {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .why-canvas-counter {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 900;
          color: var(--prussian-blue);
          background: #EEF4FF;
          padding: 5px 12px;
          border-radius: 6px;
          border: 1.5px solid #0F172A;
        }

        .why-canvas-tag {
          font-size: 0.78rem;
          font-weight: 800;
          color: #0F172A;
          background: #F1F5F9;
          padding: 5px 12px;
          border-radius: 6px;
          border: 1.5px solid #0F172A;
        }

        .why-canvas-nav-arrows {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: auto;
        }

        .why-ctrl-btn {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: #FFFFFF;
          border: 1.5px solid #0F172A;
          color: #0F172A;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 2px 2px 0px #0F172A;
          transition: all 0.15s ease;
        }

        .why-ctrl-btn:hover {
          background: var(--kuning);
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0px #0F172A;
        }

        .why-canvas-icon-box {
          width: 58px;
          height: 58px;
          border-radius: 10px;
          border: 2px solid #0F172A;
          box-shadow: 3px 3px 0px #0F172A;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .why-canvas-title {
          font-size: 1.65rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 14px;
          line-height: 1.25;
        }

        .why-canvas-desc {
          font-size: 0.98rem;
          color: #334155;
          line-height: 1.7;
          margin-bottom: 24px;
          font-weight: 500;
        }

        .why-guarantee-box {
          background: #F8FAFC;
          border: 2px solid #0F172A;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .why-guarantee-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.86rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 14px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .why-guarantee-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .why-guarantee-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.85rem;
          color: #334155;
          line-height: 1.5;
          font-weight: 600;
        }

        .why-tech-chips {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
        }

        .chips-label {
          font-size: 0.78rem;
          font-weight: 800;
          color: #64748B;
        }

        .why-chip {
          background: #EFF6FF;
          border: 1.5px solid #0F172A;
          padding: 3px 10px;
          border-radius: 4px;
          font-size: 0.76rem;
          font-weight: 800;
          color: var(--prussian-blue);
          box-shadow: 1px 1px 0px #0F172A;
        }

        .why-canvas-footer {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 20px;
          border-top: 2px solid #E2E8F0;
        }

        /* Route Strip */
        .why-route-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .why-route-card {
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
          border: 2px solid #0F172A;
          box-shadow: 3px 3px 0px #0F172A;
          background: #FFFFFF;
        }

        .route-card-title {
          font-weight: 800;
          color: #0F172A;
          font-size: 0.98rem;
          margin-bottom: 2px;
        }

        .route-card-sub {
          font-size: 0.82rem;
          font-weight: 600;
        }

        /* Responsive Mobile (< 1024px) */
        @media (max-width: 1023px) {
          .why-split-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .why-left-nav {
            display: none;
          }

          .why-mobile-pills-bar {
            display: block;
            margin-bottom: 16px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 6px;
          }

          .why-pills-track {
            display: flex;
            gap: 8px;
            min-width: max-content;
          }

          .why-pill-btn {
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

          .why-pill-btn .pill-num {
            color: var(--prussian-blue);
            font-family: var(--font-mono);
          }

          .why-pill-btn.active {
            background: var(--kuning);
            box-shadow: 2px 2px 0px var(--prussian-blue);
          }

          .why-right-canvas {
            padding: 22px;
            box-shadow: 4px 4px 0px var(--prussian-blue);
          }

          .why-canvas-title {
            font-size: 1.35rem;
          }

          .why-guarantee-list {
            grid-template-columns: 1fr;
          }

          .why-canvas-footer {
            flex-direction: column;
          }

          .why-canvas-footer .btn {
            width: 100%;
            justify-content: center;
          }

          .why-route-strip {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}
