import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/molecules/PageHeader';
import { 
  Clock, CheckCircle2, ShieldCheck, FileCheck, Layers, 
  ArrowRight, AlertCircle, RefreshCw, Lock, FileCode 
} from 'lucide-react';

export default function WorkflowPage() {
  const sopStages = [
    {
      num: "01",
      title: "Penjelajahan Paket & Plafon Tarif",
      timeline: "Tahap Awal",
      badge: "Transparansi Biaya",
      desc: "Calon Klien memilih satu dari lima kategori paket utama (Rp 120rb – Rp 650rb) dengan estimasi pengerjaan disiplin 3–10 hari kerja tanpa risiko lonjakan biaya di tengah jalan.",
      checklist: [
        "Meninjau batas atas tarif resmi (maksimal Rp 650.000)",
        "Memeriksa kelengkapan deliverables sesuai kebutuhan",
        "Membaca ketentuan batasan eksklusi server"
      ]
    },
    {
      num: "02",
      title: "Pengisian Brief Kebutuhan Terstruktur",
      timeline: "10–15 Menit",
      badge: "Formulir Cerdas Web",
      desc: "Mengisi formulir spesifikasi teknis (database MySQL, modul CRUD, dokumen SRS/SDD IEEE, diagram UML, preferensi visual) melalui sistem formulir website.",
      checklist: [
        "Pengisian identitas klien & kontak WhatsApp aktif",
        "Pemilihan modul fitur dan add-on spesifik",
        "Pemberian ID Permintaan Sementara (INQ-AT-YYYYMMDD-XXXX)",
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
      timeline: "3–10 Hari Kerja",
      badge: "Disiplin & Terpercaya",
      desc: "Penulisan kode dimulai pasca verifikasi DP. Diberikan Pratinjau Pertama (Preview 1) untuk pengujian sistem bersama. Fasilitas kuota MAKSIMAL 3 KALI REVISI mutlak disediakan secara terstruktur.",
      checklist: [
        "Koding fungsional, pembuatan skema database (.sql), dan dokumen IEEE",
        "Penyerahan Preview 1 dan pencatatan lembar kendali revisi",
        "Maksimal 3 kali siklus revisi terpadu",
        "Penerbitan Invoice Pelunasan [INV-AT-2026-____]",
        "Serah terima master berkas (.zip, .sql, PDF) & eksekusi Data Cleansing Policy"
      ]
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
      />

      <section className="section-padding" style={{ background: '#FFFFFF', borderBottom: '2px solid #0F172A' }}>
        <div className="container">
          
          {/* 4 Stages Detailed Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '64px' }}>
            {sopStages.map((stage, idx) => (
              <div
                key={idx}
                className="neo-card"
                style={{
                  padding: '32px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '32px',
                  alignItems: 'center',
                  background: '#FFFFFF',
                  border: '2px solid #0F172A',
                  boxShadow: '4px 4px 0px #0F172A'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '2.6rem',
                      fontWeight: '900',
                      color: 'var(--prussian-blue)',
                      lineHeight: '1',
                      letterSpacing: '-0.03em'
                    }}>
                      {stage.num}
                    </span>
                    <div>
                      <div className="category-pill" style={{ marginBottom: '6px', fontSize: '0.72rem' }}>
                        <span className="package-num">TAHAP {stage.num}</span>
                        <span className="divider">/</span>
                        <span className="cat-name">{stage.badge}</span>
                        <span className="divider">•</span>
                        <span style={{ color: '#D97706', fontWeight: '800' }}>{stage.timeline}</span>
                      </div>
                      <h2 style={{ fontSize: '1.38rem', fontWeight: '900', color: '#0F172A' }}>
                        {stage.title}
                      </h2>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.7', margin: 0, fontWeight: '500' }}>
                    {stage.desc}
                  </p>
                </div>

                <div style={{
                  background: '#F8FAFC',
                  border: '2px solid #0F172A',
                  boxShadow: '3px 3px 0px #0F172A',
                  borderRadius: '6px',
                  padding: '20px'
                }}>
                  <div style={{ fontSize: '0.78rem', color: '#0F172A', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={16} style={{ color: 'var(--prussian-blue)' }} /> Protokol Pengendalian Mutu:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {stage.checklist.map((item, cIdx) => (
                      <div key={cIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.86rem', color: '#1E293B', fontWeight: '600' }}>
                        <CheckCircle2 size={16} style={{ color: '#059669', marginTop: '2px', flexShrink: 0 }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Deep-dive into 3x Revision Rules */}
          <div style={{
            background: '#FFFDF5',
            border: '2px solid #0F172A',
            borderRadius: 'var(--radius-md)',
            boxShadow: '6px 6px 0px var(--kuning)',
            padding: '36px',
            marginBottom: '56px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--kuning)',
              color: '#0F172A',
              border: '2px solid #0F172A',
              boxShadow: '2px 2px 0px #0F172A',
              padding: '6px 14px',
              borderRadius: '4px',
              fontWeight: '900',
              fontSize: '0.85rem',
              marginBottom: '16px'
            }}>
              <RefreshCw size={16} />
              <span>ATURAN BAKU KUOTA REVISI</span>
            </div>

            <h2 style={{ fontSize: '1.65rem', fontWeight: '900', color: '#0F172A', marginBottom: '10px' }}>
              Ketentuan Mutlak Kuota Maksimal 3 Kali Revisi
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#475569', marginBottom: '24px', fontWeight: '500' }}>
              Standar baku pengendalian siklus perbaikan kode program agar proyek tetap berjalan terarah, disiplin, dan tepat waktu.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '18px' }}>
              <div style={{ background: '#FFFFFF', border: '2px solid #0F172A', borderRadius: '6px', padding: '18px', boxShadow: '3px 3px 0px #0F172A' }}>
                <strong style={{ color: 'var(--prussian-blue)', fontWeight: '900', fontSize: '0.94rem', display: 'block', marginBottom: '6px' }}>
                  1. Dihitung Pasca Preview 1
                </strong>
                <p style={{ margin: 0, color: '#334155', fontSize: '0.86rem', lineHeight: '1.6', fontWeight: '500' }}>
                  Penghitungan kuota dimulai setelah Klien menerima pratinjau pertama hasil koding untuk diuji coba secara mandiri.
                </p>
              </div>

              <div style={{ background: '#FFFFFF', border: '2px solid #0F172A', borderRadius: '6px', padding: '18px', boxShadow: '3px 3px 0px #0F172A' }}>
                <strong style={{ color: 'var(--prussian-blue)', fontWeight: '900', fontSize: '0.94rem', display: 'block', marginBottom: '6px' }}>
                  2. Wajib Daftar Terpadu
                </strong>
                <p style={{ margin: 0, color: '#334155', fontSize: '0.86rem', lineHeight: '1.6', fontWeight: '500' }}>
                  Seluruh poin perbaikan wajib dikumpulkan secara tertulis dalam satu daftar poin (*bullet points*) lengkap per siklus revisi.
                </p>
              </div>

              <div style={{ background: '#FFFFFF', border: '2px solid #0F172A', borderRadius: '6px', padding: '18px', boxShadow: '3px 3px 0px #0F172A' }}>
                <strong style={{ color: 'var(--prussian-blue)', fontWeight: '900', fontSize: '0.94rem', display: 'block', marginBottom: '6px' }}>
                  3. Tanpa Beda Minor / Mayor
                </strong>
                <p style={{ margin: 0, color: '#334155', fontSize: '0.86rem', lineHeight: '1.6', fontWeight: '500' }}>
                  Setiap daftar revisi yang diajukan dan diproses resmi mengurangi 1 kuota revisi (dari 3 menjadi 2, 1, dan 0).
                </p>
              </div>

              <div style={{ background: '#FFFFFF', border: '2px solid #0F172A', borderRadius: '6px', padding: '18px', boxShadow: '3px 3px 0px #0F172A' }}>
                <strong style={{ color: 'var(--prussian-blue)', fontWeight: '900', fontSize: '0.94rem', display: 'block', marginBottom: '6px' }}>
                  4. Kuota Habis = Add-on
                </strong>
                <p style={{ margin: 0, color: '#334155', fontSize: '0.86rem', lineHeight: '1.6', fontWeight: '500' }}>
                  Jika kuota 3 kali habis, penyesuaian lanjutan wajib dikompensasikan melalui Add-on resmi berbayar (Rp 50rb – Rp 150rb).
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center' }}>
            <Link to="/pesan" className="btn btn-primary" style={{ padding: '14px 32px' }}>
              <span>Mulai Proyek Sesuai Alur SOP</span>
              <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
