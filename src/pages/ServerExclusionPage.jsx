import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/molecules/PageHeader';
import { 
  ShieldAlert, XCircle, CheckCircle2, AlertTriangle, 
  ArrowRight
} from 'lucide-react';

export default function ServerExclusionPage() {
  const detailedExclusions = [
    {
      title: "Pendaftaran & Perpanjangan Domain",
      desc: "Aksara Tech tidak melayani pembelian, registrasi, pengelolaan DNS record, atau perpanjangan biaya tahunan nama domain internet (.com, .id, .ac.id, dll). Hak dan kepemilikan nama domain mutlak berada di akun Klien sendiri.",
      boundary: "Domain harus dibeli mandiri oleh Klien"
    },
    {
      title: "Sewa Hosting, cPanel, VPS & Server Cloud",
      desc: "Aksara Tech tidak menyewakan infrastruktur hosting, tidak menyediakan akses server bersama, dan tidak menagih biaya langganan bulanan/tahunan server. Klien bebas memilih penyedia hosting sesuai kebutuhan dan anggaran.",
      boundary: "Klien memiliki kendali 100% atas server mereka"
    },
    {
      title: "Proses Deployment ke Server Publik Klien",
      desc: "Batasan layanan kami berakhir pada penyusunan source code siap jalan beserta panduan operasional lokal (Local Run Guide). Kami tidak melakukan login cPanel/SSH/FTP ke hosting publik Klien untuk proses upload, migrasi berkas, atau setup SSL.",
      boundary: "Aksara Tech menyerahkan master file bersih (.zip & .sql)"
    },
    {
      title: "Penanganan Server Down & Kendala Infrastruktur",
      desc: "Kami tidak bertanggung jawab atas gangguan koneksi data center, server crash pihak ketiga, overload bandwidth hosting, maupun serangan siber DDoS pada server hosting publik milik Klien.",
      boundary: "Tanggung jawab software murni pada kode program"
    }
  ];

  return (
    <div className="server-exclusion-page" style={{ background: '#F8FAFC' }}>
      <PageHeader
        breadcrumbs={[{ label: 'Kebijakan Eksklusi Server' }]}
        badge="Transparansi Batasan Layanan"
        badgeIcon={ShieldAlert}
        title="Kebijakan Eksklusi Server &amp;"
        highlightText="Infrastruktur Hosting"
        description="Aksara Tech berfokus murni pada Software Engineering (penulisan kode program, database, dan dokumen rekayasa). Pahami batasan tegas berikut demi kenyamanan dan perlindungan hukum kedua pihak."
      />

      <section className="section-padding">
        <div className="container">
          
          {/* Executive Philosophy Strip */}
          <div style={{
            background: '#FFFBEB',
            border: '2px solid #0F172A',
            borderRadius: 'var(--radius-md)',
            boxShadow: '5px 5px 0px var(--prussian-blue)',
            padding: '36px',
            marginBottom: '56px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#D97706', fontWeight: '800', fontSize: '0.9rem', marginBottom: '12px' }}>
              <AlertTriangle size={20} />
              <span>MENGAPA KAMI MENERAPKAN KEBIJAKAN EKSKLUSI SERVER?</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0F172A', marginBottom: '14px' }}>
              Melindungi Klien dari Keterikatan (Vendor Lock-in) &amp; Biaya Siluman
            </h2>
            <p style={{ fontSize: '0.98rem', color: '#334155', lineHeight: '1.7', margin: 0, fontWeight: '500' }}>
              Banyak agensi web mengunci klien dengan menyatukan biaya server ke dalam tagihan bulanan berulang dengan mark-up tinggi. Di AKSARA TECH, kami percaya bahwa <strong>Klien berhak memiliki aset kode program dan basis data mereka 100%</strong> tanpa ketergantungan infrastruktur pada kami. Dengan batasan ini, Anda tidak pernah dikenakan tagihan server terselubung.
            </p>
          </div>

          {/* 4 Detailed Exclusions */}
          <div style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '1.65rem', fontWeight: '900', color: '#0F172A', marginBottom: '8px' }}>
              4 Batasan Ruang Lingkup Mutlak
            </h2>
            <p style={{ fontSize: '0.94rem', color: '#475569', marginBottom: '28px' }}>
              Hal-hal berikut secara tegas tidak termasuk dalam deliverables paket maupun add-on:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {detailedExclusions.map((item, idx) => (
                <div key={idx} className="neo-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#E11D48', marginBottom: '12px' }}>
                    <XCircle size={20} />
                    <span style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Eksklusi #{idx + 1}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', marginBottom: '10px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                    {item.desc}
                  </p>
                  <div style={{
                    paddingTop: '12px',
                    borderTop: '1.5px solid #E2E8F0',
                    fontSize: '0.8rem',
                    color: '#64748B',
                    fontWeight: '600'
                  }}>
                    {item.boundary}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What Software Maintenance Covers */}
          <div style={{
            background: '#FFFFFF',
            border: '2px solid #0F172A',
            borderRadius: 'var(--radius-md)',
            boxShadow: '4px 4px 0px #0F172A',
            padding: '36px',
            marginBottom: '56px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#059669', fontWeight: '800', fontSize: '0.9rem', marginBottom: '12px' }}>
              <CheckCircle2 size={20} />
              <span>KLARIFIKASI LAYANAN MAINTENANCE</span>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '900', color: '#0F172A', marginBottom: '12px' }}>
              Apa yang Dicakup oleh Software Maintenance Rp 50.000 / Hari Kerja?
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: '1.7', marginBottom: '20px', fontWeight: '500' }}>
              Sesuai dengan ketentuan resmi, layanan Software Maintenance &amp; Code Enhancement harian murni berfokus pada <strong>rekayasa dan kesehatan kode program</strong>, meliputi:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              {[
                'Investigasi & perbaikan bug/error logika pemrograman.',
                'Refactoring dan pembersihan struktur kode agar lebih efisien.',
                'Pembaruan versi library frontend / script pendukung.',
                'Optimasi query database MySQL agar lebih ringan.',
                'Penyesuaian teks konten atau elemen styling minor.'
              ].map((text, i) => (
                <div key={i} style={{ background: '#F8FAFC', border: '1.5px solid #0F172A', borderRadius: '6px', padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: '10px', boxShadow: '2px 2px 0px #CBD5E1' }}>
                  <CheckCircle2 size={16} style={{ color: '#059669', marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: '#0F172A', fontWeight: '600' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center' }}>
            <Link to="/pesan" className="btn btn-primary" style={{ padding: '14px 32px' }}>
              <span>Lanjut ke Formulir Brief Proyek</span>
              <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
