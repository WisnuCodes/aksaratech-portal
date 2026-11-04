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
  ExternalLink, 
  MessageCircle, 
  Sparkles,
  Layers,
  FileCheck,
  CreditCard,
  Building,
  HelpCircle
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
      badge: 'Verifikasi Tunggal',
      badgeColor: 'var(--prussian-blue)',
      icon: Building,
      content: (
        <div>
          <p style={{ marginBottom: '12px' }}>
            <strong>AKSARA TECH</strong> adalah penyedia jasa rekayasa perangkat lunak mandiri (<em>Digital Solutions &amp; Software Engineering</em>) yang beroperasi secara transparan dan terstandar.
          </p>
          <div style={{
            background: '#F0F5FF',
            border: '1.5px solid #1D63FF',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 14px',
            marginBottom: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <ShieldCheck size={16} style={{ color: '#0F172A', flexShrink: 0 }} />
              <strong style={{ color: '#0F172A', fontSize: '0.9rem' }}>Saluran Komunikasi &amp; Transaksi Tunggal:</strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#334155', lineHeight: '1.6' }}>
              Seluruh konsultasi teknis, verifikasi kebutuhan, penerbitan surat penawaran, penagihan pembayaran termin, serta penyerahan master berkas koding dilakukan secara tunggal melalui kontak WhatsApp resmi: <strong style={{ color: '#1D63FF' }}>{BUSINESS_INFO.phoneDisplay}</strong> ({BUSINESS_INFO.phoneInternational}).
            </p>
          </div>
          <p style={{ margin: 0, fontSize: '0.86rem', color: '#64748B', fontWeight: '500' }}>
            *Aksara Tech tidak bertanggung jawab atas kesepakatan verbal, transaksi finansial, atau pengalihan dana yang dilakukan di luar saluran resmi tersebut.
          </p>
        </div>
      )
    },
    {
      id: 'eksklusi',
      number: '2',
      title: 'Batasan Ruang Lingkup Mutlak (Eksklusi Server & Hosting)',
      badge: 'Aturan Mutlak',
      badgeColor: 'var(--prussian-blue)',
      icon: AlertTriangle,
      content: (
        <div>
          <p style={{ marginBottom: '14px' }}>
            Aksara Tech berfokus murni pada rekayasa perangkat lunak (<em>software engineering</em>), pembuatan kode sumber aplikasi, perancangan database, dan penyusunan dokumen formal (SRS &amp; SDD).
          </p>
          
          <div style={{
            background: '#FFFBEB',
            border: '2px solid #0F172A',
            borderRadius: 'var(--radius-sm)',
            padding: '14px',
            
            marginBottom: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0F172A', fontWeight: '800', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
              <AlertTriangle size={15} /> Hal-Hal yang Tegas Berada di Luar Tanggung Jawab Aksara Tech:
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Penyewaan, registrasi, atau perpanjangan domain internet (.com, .id, dll).',
                'Pembelian langganan server, cPanel, VPS, Cloud Hosting, atau dedicated server.',
                'Proses deployment rilis berkas ke server pihak ketiga milik Klien.',
                'Penanganan kendala server down, serangan DDoS, atau gangguan infrastruktur penyedia hosting.'
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: '#334155' }}>
                  <span style={{ color: "#0F172A", fontWeight: "700", flexShrink: 0 }}>&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: '#F8FAFC',
            border: '1px solid #CBD5E1',
            borderRadius: '6px',
            padding: '10px 14px',
            fontSize: '0.84rem',
            color: '#475569'
          }}>
            <strong>Penjelasan Software Maintenance Harian (Rp 50.000/hari):</strong> Murni terbatas pada pemeliharaan baris kode, penanganan error logika, refactoring script, dan penyesuaian fungsi aplikasi — <em>bukan</em> pemeliharaan mesin server fisik atau cloud pihak ketiga.
          </div>
        </div>
      )
    },
    {
      id: 'revisi',
      number: '3',
      title: 'Kebijakan Kuota Revisi Maksimal 3 Kali Mutlak',
      badge: 'Maksimal 3 Kali',
      badgeColor: 'var(--prussian-blue)',
      icon: RefreshCw,
      content: (
        <div>
          <p style={{ marginBottom: '14px' }}>
            Demi kepastian jadwal rilis yang tepat waktu dan keadilan kedua belah pihak, seluruh paket di Aksara Tech mencakup fasilitas kuota revisi <strong>MAKSIMAL 3 KALI secara mutlak</strong> setelah pratinjau pertama (Preview 1) diserahkan:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
            {[
              {
                title: 'Berlaku Menyeluruh Tanpa Pembedaan Minor / Mayor',
                desc: 'Seluruh bentuk koreksi—baik perubahan warna/layout kecil maupun penyesuaian alur kerja—dihitung dalam jatah kuota 3 kali yang sama.'
              },
              {
                title: 'Format Daftar Poin Terstruktur (Revision List)',
                desc: 'Setiap pengajuan revisi wajib dirangkum secara tertulis dalam 1 berkas atau pesan tersusun rapi agar pengembang dapat mengerjakannya secara simultan.'
              },
              {
                title: 'Mekanisme Add-on Pasca Kuota Ke-3',
                desc: 'Permintaan penyesuaian setelah kuota 3 kali habis dialihkan sebagai modul Add-on berbayar (Rp 50.000 – Rp 75.000) dan memerlukan kesepakatan tertulis baru.'
              }
            ].map((rule, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '12px 14px',
                  
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ 
                    width: '20px', 
                    height: '20px', 
                    borderRadius: '50%', 
                    background: 'var(--prussian-blue)', 
                    color: '#FFFFFF', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '0.72rem', 
                    fontWeight: '900',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </span>
                  <strong style={{ fontSize: '0.88rem', color: '#0F172A' }}>{rule.title}</strong>
                </div>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569', paddingLeft: '28px', lineHeight: '1.55' }}>
                  {rule.desc}
                </p>
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
      badge: 'DP 50% & Pelunasan',
      badgeColor: 'var(--prussian-blue)',
      icon: CreditCard,
      content: (
        <div>
          <p style={{ marginBottom: '14px' }}>
            Aksara Tech menerapkan transparansi finansial penuh tanpa biaya siluman melalui skema termin pembayaran 50:50 yang terstruktur:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
            <div style={{
              background: '#F8FAFC',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0F172A', fontWeight: '900', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '6px' }}>
                <CreditCard size={15} /> Termin 1: Uang Muka (DP 50%)
              </div>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#334155', lineHeight: '1.6' }}>
                Wajib dibayarkan sebelum kick-off penulisan kode dimulai. Bersifat <strong>non-refundable</strong> apabila Klien membatalkan proyek secara sepihak setelah proses koding berjalan.
              </p>
            </div>

            <div style={{
              background: '#F8FAFC',
              border: '2px solid #0F172A',
              borderRadius: '8px',
              padding: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0F172A', fontWeight: '900', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '6px' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--prussian-blue)' }} /> Termin 2: Pelunasan (50%)
              </div>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#334155', lineHeight: '1.6' }}>
                Wajib diselesaikan setelah hasil preview disetujui, sebelum penyerahan master berkas final (.zip, .sql, PDF dokumentasi) dan sebelum masa garansi aktif.
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
      badge: '100% Confidential',
      badgeColor: 'var(--prussian-blue)',
      icon: Lock,
      content: (
        <div>
          <p style={{ marginBottom: '12px' }}>
            Aksara Tech menjamin kerahasiaan penuh atas identitas Klien, brief materi bisnis, data sensitif, dan seluruh kode sumber proyek yang dikembangkan.
          </p>

          <div style={{
            background: '#F0F5FF',
            border: '1px solid var(--border-subtle)',
            
            borderRadius: '6px',
            padding: '14px',
            marginBottom: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Lock size={16} style={{ color: '#0F172A' }} />
              <strong style={{ fontSize: '0.9rem', color: '#0F172A' }}>Protokol Sanitasi Data (Data Cleansing Policy):</strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#334155', lineHeight: '1.65' }}>
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
      badge: 'Garansi 7 Hari',
      badgeColor: 'var(--prussian-blue)',
      icon: ShieldCheck,
      content: (
        <div>
          <p style={{ marginBottom: '14px' }}>
            Setiap proyek resmi Aksara Tech dilindungi oleh <strong>Garansi Perbaikan Bug Kode selama 1 Minggu (7 hari kalender)</strong> pasca serah terima berkas final:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: '#334155' }}>
              <span style={{ color: "#0F172A", fontWeight: "700" }}>&bull;</span>
              <span><strong>Cakupan Garansi:</strong> Penanganan galat fungsi (*runtime error*), kesalahan sintaks koding, atau ketidaksesuaian fungsional terhadap lembar brief teknis awal.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: '#334155' }}>
              <span style={{ color: "#475569", fontWeight: "700" }}>&bull;</span>
              <span><strong>Pengecualian:</strong> Tidak mencakup penambahan fitur baru di luar lembar kesepakatan awal (fitur baru dialihkan ke Add-on resmi).</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: '#334155' }}>
              <span style={{ color: "#475569", fontWeight: "700" }}>&bull;</span>
              <span><strong>Gugurnya Garansi:</strong> Garansi gugur otomatis apabila source code telah dimodifikasi mandiri oleh pihak ketiga atau kendala server hosting eksternal milik klien.</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'serah-terima',
      number: '7',
      title: 'Penyerahan Hak Cipta & Berkas Master Final',
      badge: 'Master Source Code',
      badgeColor: 'var(--prussian-blue)',
      icon: FileCheck,
      content: (
        <div>
          <p style={{ marginBottom: '12px' }}>
            Setelah pelunasan 100% diterima, Aksara Tech menyerahkan seluruh deliverables master secara lengkap tanpa retensi:
          </p>

          <div style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            padding: '12px 14px',
            
            marginBottom: '10px'
          }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.86rem', color: '#334155' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={15} style={{ color: '#0F172A' }} />
                <span><strong>Master Source Code Penuh (.zip):</strong> Kode sumber bersih terstruktur tanpa obfuscation.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={15} style={{ color: '#0F172A' }} />
                <span><strong>Skema Database (.sql):</strong> Skema tabel relasional siap impor.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={15} style={{ color: '#0F172A' }} />
                <span><strong>Dokumen Rekayasa (SRS &amp; SDD):</strong> PDF terstruktur formal &amp; Diagram UML lengkap (sesuai paket).</span>
              </li>
            </ul>
          </div>
          <p style={{ margin: 0, fontSize: '0.86rem', color: '#475569', fontWeight: '600' }}>
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
    const summary = `[KETENTUAN LAYANAN RESMI AKSARA TECH]\n1. Kontak Tunggal: WA ${BUSINESS_INFO.phoneDisplay}\n2. Eksklusi Server: Software murni, tidak melayani sewa hosting/domain.\n3. Kuota Revisi: Maksimal 3 kali mutlak (minor/mayor merata).\n4. Termin: DP 50% non-refundable & Pelunasan 50% sebelum serah terima.\n5. Kerahasiaan: 100% Confidential & Data Cleansing Policy.\n6. Garansi: Bebas bug 7 hari kalender pasca rilis final.\n7. Deliverables: Full Master Source Code (.zip), .sql, dan SRS/SDD PDF.`;
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="terms-page" style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <PageHeader
        breadcrumbs={[{ label: 'Ketentuan Layanan & Privasi' }]}
        badge="Legalitas &amp; Tata Kelola"
        badgeIcon={FileText}
        title="Ketentuan Layanan Resmi &amp;"
        highlightText="Kebijakan Privasi"
        description="Landasan hukum operasional Aksara Tech yang mengatur hak, kewajiban, batasan ruang lingkup koding, kuota revisi maksimal 3 kali, dan jaminan sanitasi data."
      />

      <section className="section-padding" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          
          {/* Document Verification & Actions Banner (Mobile Optimized) */}
          <div 
            className="neo-card"
            style={{
              background: '#FFFFFF',
              border: '2px solid #0F172A',
              
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              marginBottom: '24px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#EBF2FF',
                border: '1px solid var(--border-subtle)',
                color: 'var(--prussian-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Scale size={18} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: '900', color: '#0F172A', background: '#D1FAE5', padding: '2px 8px', borderRadius: '4px' }}>
                    ● DOKUMEN AKTIF &amp; BERLAKU
                  </span>
                  <span style={{ fontFamily: 'var(--)', fontSize: '0.74rem', color: '#64748B', fontWeight: '700' }}>
                    DOC-ID: AT/LEGAL/SOP-V1.4
                  </span>
                </div>
                <div style={{ fontSize: '0.84rem', fontWeight: '700', color: '#0F172A', marginTop: '2px' }}>
                  Entitas Resmi: Aksara Tech Enterprise Solutions
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="terms-header-actions">
              <button
                type="button"
                onClick={handleCopySummary}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: copied ? '#0F172A' : '#FFFFFF',
                  color: copied ? '#FFFFFF' : '#0F172A',
                  border: '1px solid var(--border-subtle)',
                  
                  borderRadius: 'var(--radius-sm)',
                  padding: '7px 12px',
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Tersalin!' : 'Salin Poin Inti'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#FFFFFF',
                  color: '#475569',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: 'var(--radius-sm)',
                  padding: '7px 12px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                <Printer size={14} />
                <span>Cetak</span>
              </button>
            </div>
          </div>

          {/* Quick Jump Category Chips for Mobile */}
          <div 
            className="terms-category-scroll"
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '12px',
              marginBottom: '20px',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none'
            }}
          >
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-subtle)',
                background: activeFilter === 'all' ? '#0F172A' : '#FFFFFF',
                color: activeFilter === 'all' ? '#FFFFFF' : '#0F172A',
                boxShadow: 'none',
                fontSize: '0.8rem',
                fontWeight: '800',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <span>Semua 7 Pasal</span>
            </button>

            {sections.map(s => {
              const isActive = activeFilter === s.id;
              const IconComp = s.icon;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveFilter(s.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-subtle)',
                    background: isActive ? '#0F172A' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#0F172A',
                    boxShadow: 'none',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <IconComp size={13} style={{ color: isActive ? '#0F172A' : '#475569' }} />
                  <span>Pasal {s.number}</span>
                </button>
              );
            })}
          </div>

          {/* Section Clauses List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            {filteredSections.map((sec) => {
              const IconComponent = sec.icon;
              return (
                <article
                  key={sec.id}
                  id={`pasal-${sec.number}`}
                  className="neo-card terms-clause-card"
                  style={{
                    background: '#FFFFFF',
                    border: '2px solid #0F172A',
                    
                    borderRadius: 'var(--radius-md)',
                    padding: '24px 20px',
                    position: 'relative'
                  }}
                >
                  {/* Clause Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div 
                        style={{
                          width: '32px',
                          height: '32px',
                          minWidth: '32px',
                          borderRadius: '8px',
                          background: '#F1F5F9',
                          border: '1px solid var(--border-subtle)',
                          color: sec.badgeColor || 'var(--prussian-blue)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: '900',
                          fontSize: '0.9rem',
                          marginTop: '2px'
                        }}
                      >
                        {sec.number}
                      </div>
                      <div>
                        <span 
                          style={{
                            display: 'inline-block',
                            fontSize: '0.68rem',
                            fontWeight: '900',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            color: sec.badgeColor || 'var(--prussian-blue)',
                            background: '#F8FAFC',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            border: '1px solid #CBD5E1',
                            marginBottom: '4px'
                          }}
                        >
                          {sec.badge}
                        </span>
                        <h2 
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.08rem',
                            fontWeight: '900',
                            color: '#0F172A',
                            lineHeight: '1.35',
                            margin: 0
                          }}
                        >
                          Pasal {sec.number}: {sec.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Clause Body */}
                  <div style={{
                    fontSize: '0.92rem',
                    color: '#334155',
                    lineHeight: '1.7',
                    fontWeight: '500',
                    borderTop: '1px solid #E2E8F0',
                    paddingTop: '14px'
                  }}>
                    {sec.content}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Legal Acceptance & Direct WhatsApp Contact Card */}
          <div 
            className="neo-card"
            style={{
              background: '#FFFFFF',
              border: '2px solid #0F172A',
              
              borderRadius: 'var(--radius-md)',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div 
                style={{
                  width: '42px',
                  height: '42px',
                  minWidth: '42px',
                  borderRadius: '10px',
                  background: '#EBF2FF',
                  border: '2px solid #0F172A',
                  color: 'var(--prussian-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  
                }}
              >
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A', marginBottom: '4px', lineHeight: '1.3' }}>
                  Persetujuan Otomatis Ketentuan Layanan
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, fontWeight: '500', lineHeight: '1.6' }}>
                  Dengan mengirimkan brief kebutuhan dan menyelesaikan pembayaran Uang Muka (DP 50%), Klien dinyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan tata kelola operasional Aksara Tech di atas secara mutlak.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }} className="terms-bottom-buttons">
              <a
                href={`https://wa.me/${BUSINESS_INFO.waNumber}?text=Halo%20Aksara%20Tech,%20saya%20ingin%20berkonsultasi%20terkait%20Ketentuan%20Layanan%20dan%20SOP%20Kerja.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  fontSize: '0.92rem',
                  fontWeight: '800'
                }}
              >
                <MessageCircle size={18} />
                <span>Konsultasi Pertanyaan Legal via WA</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      <style>{`
        @media (min-width: 640px) {
          .terms-clause-card {
            padding: 28px 32px !important;
          }
          .terms-clause-card h2 {
            font-size: 1.22rem !important;
          }
        }

        @media (max-width: 480px) {
          .terms-header-actions {
            width: 100%;
          }
          .terms-header-actions > * {
            flex: 1;
            justify-content: center;
          }
          .terms-bottom-buttons > * {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
