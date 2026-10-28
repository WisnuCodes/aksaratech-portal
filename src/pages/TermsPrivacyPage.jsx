import React from 'react';
import PageHeader from '../components/molecules/PageHeader';
import { FileText, ShieldCheck, AlertTriangle, RefreshCw, Lock, CheckCircle2 } from 'lucide-react';

export default function TermsPrivacyPage() {
  return (
    <div className="terms-page" style={{ background: '#F8FAFC' }}>
      <PageHeader
        breadcrumbs={[{ label: 'Ketentuan Layanan & Privasi' }]}
        badge="Legalitas & Tata Kelola"
        badgeIcon={FileText}
        title="Ketentuan Layanan Resmi &"
        highlightText="Kebijakan Privasi"
        description="Landasan hukum operasional Aksara Tech yang mengatur hak, kewajiban, batasan ruang lingkup koding, kuota revisi maksimal 3 kali, dan jaminan sanitasi data."
      />

      <section className="section-padding">
        <div className="container">
          <div className="neo-card" style={{
            maxWidth: '920px',
            margin: '0 auto',
            background: '#FFFFFF',
            border: '2px solid #0F172A',
            boxShadow: '6px 6px 0px #0F172A',
            padding: '48px',
            fontSize: '0.96rem',
            color: '#334155',
            lineHeight: '1.8'
          }}>
            
            {/* Meta info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderBottom: '2px solid #0F172A', paddingBottom: '20px', marginBottom: '32px', fontSize: '0.84rem', color: '#64748B' }}>
              <div>Nomor Dokumen: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--prussian-blue)', fontWeight: '800' }}>LEGAL-AT-2026-V1</span></div>
              <div>Entitas: <strong style={{ color: '#0F172A' }}>AKSARA TECH</strong> &bull; WhatsApp: <strong style={{ color: '#0F172A' }}>085600386692</strong></div>
            </div>

            {/* Section 1 */}
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={20} style={{ color: 'var(--prussian-blue)' }} />
                1. Identitas Usaha &amp; Saluran Komunikasi Tunggal
              </h2>
              <p>
                AKSARA TECH adalah penyedia jasa rekayasa perangkat lunak mandiri (<em>Enterprise Digital Solutions &amp; Software Engineering</em>). Seluruh proses transaksi, verifikasi kebutuhan, penerbitan surat penawaran, penagihan termin, serta penyerahan master berkas dilakukan secara tunggal dan resmi melalui saluran WhatsApp: <strong>085600386692</strong>.
              </p>
              <p style={{ marginTop: '8px' }}>
                Aksara Tech tidak bertanggung jawab atas kesepakatan atau transaksi finansial yang dilakukan di luar nomor resmi tersebut.
              </p>
            </div>

            {/* Section 2 */}
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#D97706', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle size={20} />
                2. Batasan Ruang Lingkup Mutlak (Eksklusi Server &amp; Hosting)
              </h2>
              <p>
                Aksara Tech murni melayani perancangan kode sumber (<em>software engineering</em>), pemodelan database MySQL, dan penyusunan dokumen rekayasa. Kami secara tegas <strong>TIDAK MENYEDIAKAN</strong>:
              </p>
              <ul style={{ paddingLeft: '24px', marginTop: '8px' }}>
                <li>Pembelian, registrasi, maupun perpanjangan nama domain internet (.com, .id, dll).</li>
                <li>Penyewaan server, hosting, VPS, cPanel, atau biaya infrastruktur pihak ketiga.</li>
                <li>Deployment, upload rilis, konfigurasi DNS/SSL pada server publik milik Klien.</li>
                <li>Penanganan server down, serangan jaringan, atau kendala hosting pihak ketiga.</li>
              </ul>
              <p style={{ marginTop: '10px', fontSize: '0.88rem', color: '#64748B', fontWeight: '600' }}>
                *Layanan Software Maintenance harian (Rp 50.000/hari) murni terbatas pada pemeliharaan baris kode, penanganan bug logika koding, refactoring skrip, dan optimasi performa software, <em>bukan</em> maintenance server hosting.
              </p>
            </div>

            {/* Section 3 */}
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RefreshCw size={20} style={{ color: 'var(--prussian-blue)' }} />
                3. Kebijakan Kuota Revisi Maksimal 3 Kali Mutlak
              </h2>
              <p>
                Demi kedisiplinan jadwal rilis dan keadilan kedua belah pihak, setiap pesanan paket mencakup fasilitas kuota revisi <strong>MAKSIMAL 3 KALI secara mutlak</strong> setelah pratinjau pertama (Preview 1) diserahkan:
              </p>
              <ul style={{ paddingLeft: '24px', marginTop: '8px' }}>
                <li>Batasan 3 kali berlaku merata baik untuk perubahan minor maupun mayor.</li>
                <li>Poin-poin revisi wajib dirangkum tertulis dalam satu daftar poin terstruktur (<em>revision list</em>) per pengajuan.</li>
                <li>Permintaan penyesuaian setelah kuota ke-3 habis otomatis dialihkan ke Add-on berbayar (Rp 50.000 – Rp 150.000) dan memerlukan kesepakatan tertulis baru.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={20} style={{ color: '#059669' }} />
                4. Skema Finansial &amp; Pembayaran Dua Termin
              </h2>
              <ul style={{ paddingLeft: '24px' }}>
                <li><strong>Termin 1 (Uang Muka / DP min. 50%):</strong> Wajib dibayarkan sebelum penulisan kode dimulai. Uang muka bersifat <em>non-refundable</em> jika Klien membatalkan proyek secara sepihak setelah pengerjaan kode berjalan.</li>
                <li><strong>Termin 2 (Pelunasan 50%):</strong> Wajib diselesaikan setelah hasil preview disetujui, sebelum penyerahan master berkas final (.zip, .sql, PDF).</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Lock size={20} style={{ color: 'var(--prussian-blue)' }} />
                5. Jaminan Kerahasiaan 100% &amp; Kebijakan Sanitasi Data (Data Cleansing)
              </h2>
              <p>
                Aksara Tech menjamin kerahasiaan penuh atas identitas Klien, ide sistem, materi bisnis, dan kode sumber proyek. Kami menerapkan <strong>Data Cleansing Policy</strong>, di mana seluruh berkas uji coba, database dummy, dan kredensial pengujian yang tersimpan di lingkungan internal kami akan dibersihkan secara permanen pasca proyek dinyatakan lunas dan serah terima selesai.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={20} style={{ color: 'var(--prussian-blue)' }} />
                6. Penyerahan Hak Master Berkas Akhir
              </h2>
              <p>
                Setelah pelunasan 100% diterima, Aksara Tech menyerahkan master berkas digital berupa arsip Source Code (.zip), Skema Database (.sql), serta Dokumen Rekayasa Sistem berstandar IEEE (SRS &amp; SDD) dan Diagram UML Lengkap sesuai spesifikasi paket yang disepakati. Seluruh hak penggunaan kode program diserahkan sepenuhnya kepada pihak Klien.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
