import React from 'react';
import { useOrderForm } from '../../hooks/useOrderForm';
import { PACKAGES, ADDONS } from '../../data/catalogData';
import { formatRupiah } from '../../utils/documentEngine';
import StepIndicator from '../molecules/StepIndicator';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { 
  FileText, ArrowRight, ArrowLeft, Send, CheckCircle2, 
  Layers, Clock, ShieldCheck, Database, HelpCircle, RotateCcw, Star,
  Link2, ExternalLink, MessageSquarePlus, MessageCircle, Sparkles, Info
} from 'lucide-react';

const featureOptions = [
  'Formulir Kontak Terhubung WhatsApp',
  'Etalase Katalog Produk Interaktif',
  'Database Relasional MySQL & CRUD',
  'Sistem Autentikasi Login & Multi-Role',
  'Ringkasan Dokumen Rekayasa SRS & SDD (IEEE)',
  'Pemodelan UML Lengkap (Class, ERD, Use Case, Sequence)',
  'Keranjang Belanja & Checkout WhatsApp',
  'Pencarian & Filter Data Real-time',
  'Laporan & Rekapitulasi Data (Cetak / Ekspor)',
  'Optimasi SEO On-Page Dasar'
];

export default function OrderBriefForm({ preselectedPackageId, hideHeader = false }) {
  const {
    formData,
    currentStep,
    errors,
    isSubmitted,
    selectedPackage,
    selectedAddons,
    calculations,
    updateField,
    toggleArrayItem,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
    submitToWhatsApp
  } = useOrderForm(preselectedPackageId);

  // Check if Custom Request Add-on (id: 4) is selected
  const isCustomModuleSelected = (formData.selectedAddonIds || []).includes('addon-custom-module');

  return (
    <section id="order-form" className="section-padding" style={{ background: '#F8FAFC' }}>
      <div className="container">
        
        {/* Section Header */}
        {!hideHeader && (
          <div className="section-header">
            <div className="section-badge">
              <FileText size={14} /> Briefing Engine
            </div>
            <h2 className="section-title">
              Formulir Spesifikasi <span style={{ color: 'var(--prussian-blue)' }}>Kebutuhan Proyek</span>
            </h2>
            <p className="section-desc">
              Sistem pengumpulan kebutuhan bertahap (Progressive Disclosure) untuk menghasilkan draf penawaran presisi sebelum konsultasi WhatsApp resmi.
            </p>
          </div>
        )}

        {/* Multi-Step Card */}
        <div className="neo-card order-brief-card" style={{ maxWidth: '940px', margin: '0 auto', position: 'relative', background: '#FFFFFF' }}>
          
          {/* Header Strip with Inquiry ID & Estimated Price */}
          <div className="order-header-strip">
            <div className="order-id-group">
              <div className="order-id-label">
                ID Permintaan Sementara
              </div>
              <div className="order-id-code">
                {formData.inquiryId}
              </div>
            </div>

            <div className="order-est-group">
              <div className="order-est-box">
                <div className="order-est-label">Estimasi Biaya Referensi</div>
                <div className="order-est-value">
                  {formatRupiah(calculations.minPrice)} – {formatRupiah(calculations.maxPrice)}
                </div>
              </div>
              <button
                type="button"
                onClick={resetForm}
                title="Reset formulir"
                className="order-reset-btn"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* Visual Step Progress */}
          <StepIndicator currentStep={currentStep} totalSteps={7} onStepClick={goToStep} />

          {/* Form Step Contents */}
          <form onSubmit={(e) => { e.preventDefault(); if (currentStep === 7) submitToWhatsApp(); else nextStep(); }}>
            
            {/* STEP 1: Informasi Klien & Kontak */}
            {currentStep === 1 && (
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '900', marginBottom: '8px', color: '#0F172A' }}>
                  Langkah 1: Identitas Klien &amp; Kontak Proyek
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '24px' }}>
                  Data kontak resmi akan dicantumkan pada Surat Penawaran Harga dan koordinasi WhatsApp.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                  <Input
                    label="Nama Klien / Nama Instansi"
                    required
                    placeholder="Contoh: Bpk. Hendra Gunawan / PT Sinergi"
                    value={formData.clientName}
                    onChange={(e) => updateField('clientName', e.target.value)}
                    error={errors.clientName}
                  />

                  <Input
                    label="Nomor WhatsApp Aktif"
                    required
                    type="tel"
                    placeholder="Contoh: 085600386692"
                    value={formData.clientPhone}
                    onChange={(e) => updateField('clientPhone', e.target.value)}
                    error={errors.clientPhone}
                    helperText="Saluran komunikasi utama untuk validasi dan penawaran resmi."
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                  <Input
                    label="Alamat Email (Opsional)"
                    type="email"
                    placeholder="nama@perusahaan.com"
                    value={formData.clientEmail}
                    onChange={(e) => updateField('clientEmail', e.target.value)}
                  />

                  <Input
                    label="Nama Proyek Website"
                    required
                    placeholder="Contoh: Website Katalog Usaha Furniture & Order WA"
                    value={formData.projectTitle}
                    onChange={(e) => updateField('projectTitle', e.target.value)}
                    error={errors.projectTitle}
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Pemilihan Paket Utama */}
            {currentStep === 2 && (
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '900', marginBottom: '8px', color: '#0F172A' }}>
                  Langkah 2: Pilih Paket Layanan Utama
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '20px' }}>
                  Pilih salah satu dari 5 paket standar resmi Aksara Tech. Plafon maksimal resmi Rp 650.000 (Paket 5).
                </p>

                <div className="selection-grid" style={{ marginBottom: '20px' }}>
                  {PACKAGES.map((pkg) => {
                    const isSelected = formData.selectedPackageId === pkg.id;
                    const isFeatured = pkg.number === 5;
                    return (
                      <div
                        key={pkg.id}
                        className={`select-card ${isSelected ? 'active' : ''}`}
                        onClick={() => updateField('selectedPackageId', pkg.id)}
                        style={{
                          background: isSelected ? '#FFFDF0' : '#FFFFFF',
                          borderColor: '#0F172A',
                          boxShadow: isSelected ? '4px 4px 0px var(--kuning)' : '3px 3px 0px #CBD5E1',
                          padding: '18px 20px',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative'
                        }}
                      >
                        {/* Top Meta Bar */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '8px',
                          marginBottom: '12px'
                        }}>
                          <div className="category-pill" style={{ padding: '3px 8px', fontSize: '0.7rem' }}>
                            <span className="package-num">PAKET {pkg.number}</span>
                            <span className="divider">/</span>
                            <span className="cat-name">{pkg.category}</span>
                          </div>

                          {pkg.badge && (
                            <div className={`badge ${isFeatured || isSelected ? 'badge-kuning' : 'badge-blue'}`} style={{ padding: '3px 8px', fontSize: '0.7rem' }}>
                              <Star size={11} fill="currentColor" />
                              <span>{pkg.badge}</span>
                            </div>
                          )}
                        </div>

                        <div style={{ fontWeight: '900', fontSize: '1.18rem', color: '#0F172A', marginBottom: '6px', lineHeight: '1.35' }}>
                          {pkg.name}
                        </div>

                        <div style={{ fontSize: '0.84rem', color: '#475569', marginBottom: '16px', lineHeight: '1.5', fontWeight: '500' }}>
                          {pkg.systemType}
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1.5px solid #E2E8F0' }}>
                          <div style={{ fontWeight: '900', fontSize: '1.18rem', color: 'var(--prussian-blue)' }}>
                            {formatRupiah(pkg.minPrice)} – {formatRupiah(pkg.maxPrice)}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontWeight: '700' }}>
                            <Clock size={14} style={{ color: '#D97706' }} /> {pkg.minDays}–{pkg.maxDays} Hari Kerja &bull; Max 3x Revisi
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {errors.selectedPackageId && (
                  <p style={{ color: 'var(--rose)', fontSize: '0.85rem' }}>{errors.selectedPackageId}</p>
                )}
              </div>
            )}

            {/* STEP 3: Tujuan & Target Sistem */}
            {currentStep === 3 && (
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '900', marginBottom: '8px', color: '#0F172A' }}>
                  Langkah 3: Sasaran &amp; Tujuan Sistem
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '20px' }}>
                  Bantu kami memahami konteks operasional atau akademik dari sistem web yang akan dibangun.
                </p>

                <div className="form-group">
                  <label className="form-label">Kategori Penggunaan <span className="req">*</span></label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {['UMKM & Bisnis', 'Korporat / Agensi', 'Toko Online / Retail', 'Tugas Akhir / Skripsi', 'Organisasi / Portofolio'].map((cat) => {
                      const isSel = formData.projectCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => updateField('projectCategory', cat)}
                          style={{
                            padding: '10px 18px',
                            borderRadius: '6px',
                            fontSize: '0.88rem',
                            fontWeight: '800',
                            border: '2px solid #0F172A',
                            background: isSel ? 'var(--prussian-blue)' : '#FFFFFF',
                            color: isSel ? '#FFFFFF' : '#0F172A',
                            boxShadow: isSel ? '3px 3px 0px var(--kuning)' : '2px 2px 0px #CBD5E1',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Deskripsi Singkat Target Website / Masalah yang Ingin Diselesaikan</label>
                  <textarea
                    rows={4}
                    className="form-textarea"
                    placeholder="Contoh: Kami ingin menampilkan katalog 30 produk pakaian dengan tombol pemesanan langsung WhatsApp, filter kategori, dan halaman profil toko yang cepat di mobile."
                    value={formData.projectGoal}
                    onChange={(e) => updateField('projectGoal', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Kebutuhan Fitur & Spesifikasi Teknis */}
            {currentStep === 4 && (
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '900', marginBottom: '8px', color: '#0F172A' }}>
                  Langkah 4: Fitur &amp; Spesifikasi Teknis
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '20px' }}>
                  Centang modul fungsional yang Anda perlukan. Sistem akan mengintegrasikannya ke dalam ruang lingkup pengerjaan.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                  {featureOptions.map((feat) => {
                    const isChecked = formData.functionalFeatures.includes(feat);
                    return (
                      <div
                        key={feat}
                        onClick={() => toggleArrayItem('functionalFeatures', feat)}
                        style={{
                          background: isChecked ? '#FFF9E6' : '#FFFFFF',
                          border: isChecked ? '2px solid #0F172A' : '1.5px solid #CBD5E1',
                          boxShadow: isChecked ? '3px 3px 0px var(--kuning)' : '2px 2px 0px #E2E8F0',
                          borderRadius: '6px',
                          padding: '12px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '4px',
                          border: '2px solid #0F172A',
                          background: isChecked ? 'var(--prussian-blue)' : '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {isChecked && <CheckCircle2 size={16} color="#FFFFFF" />}
                        </div>
                        <span style={{ fontSize: '0.88rem', color: '#0F172A', fontWeight: isChecked ? '800' : '600' }}>
                          {feat}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Kolom Chat Request Fitur Kustom Lainnya */}
                <div style={{
                  background: '#F0F5FF',
                  border: '2px solid #0F172A',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '4px 4px 0px var(--prussian-blue)',
                  padding: '22px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'var(--prussian-blue)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #0F172A',
                      boxShadow: '2px 2px 0px #0F172A',
                      flexShrink: 0
                    }}>
                      <MessageSquarePlus size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0F172A', margin: 0 }}>
                        Kolom Chat Request Fitur Tambahan (Ketik Sendiri)
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: '#475569', margin: '2px 0 0 0', fontWeight: '500' }}>
                        Punya kebutuhan fitur, alur logika, atau sistem yang tidak tercantum pada daftar di atas? Ketikkan di sini:
                      </p>
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    className="form-textarea"
                    style={{
                      background: '#FFFFFF',
                      border: '2px solid #0F172A',
                      borderRadius: '6px',
                      fontSize: '0.92rem',
                      padding: '12px 14px',
                      lineHeight: '1.6',
                      marginTop: '10px'
                    }}
                    placeholder="Contoh: Kami ingin fitur perhitungan ongkir otomatis berdasarkan kota tujuan, notifikasi WhatsApp otomatis saat ada pesanan baru, dan tombol share produk ke Instagram/TikTok..."
                    value={formData.customFeatures || ''}
                    onChange={(e) => updateField('customFeatures', e.target.value)}
                  />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', fontSize: '0.78rem', color: '#64748B', fontWeight: '700' }}>
                    <Sparkles size={14} style={{ color: 'var(--prussian-blue)' }} />
                    <span>Fitur kustom ini akan otomatis disertakan ke dalam brief pemesanan untuk dianalisis oleh tim teknis kami.</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Preferensi Desain & Materi */}
            {currentStep === 5 && (
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '900', marginBottom: '8px', color: '#0F172A' }}>
                  Langkah 5: Kesiapan Materi &amp; Aset Visual
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '20px' }}>
                  Informasikan kesiapan konten (teks, logo, foto produk) untuk estimasi pengerjaan yang akurat.
                </p>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Status Kesiapan Konten &amp; Materi</label>
                  <select
                    className="form-select"
                    value={formData.designReadiness}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateField('designReadiness', val);
                      if (val.startsWith('Belum Ada')) {
                        updateField('attachedFiles', []);
                        updateField('assetDriveUrl', '');
                      }
                    }}
                  >
                    <option value="Lengkap (Logo, Teks, dan Gambar Siap)">Lengkap (Logo, Teks, dan Gambar Siap Pakai)</option>
                    <option value="Sebagian (Hanya Logo dan Teks Kasar, butuh perapihan)">Sebagian (Hanya Logo dan Teks Kasar, butuh perapihan)</option>
                    <option value="Belum Ada (Butuh Dibantu Rancangkan)">Belum Ada (Butuh dibantu rancang teks dan placeholder)</option>
                  </select>
                </div>

                {/* Keterangan Profesional Sesuai Status Kesiapan */}
                {formData.designReadiness?.startsWith('Sebagian') && (
                  <div style={{
                    background: '#EFF6FF',
                    border: '2px solid #0F172A',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '3px 3px 0px var(--prussian-blue)',
                    padding: '16px 20px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}>
                    <Info size={22} style={{ color: 'var(--prussian-blue)', flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.88rem', color: '#0F172A', lineHeight: '1.6', fontWeight: '500' }}>
                      <strong style={{ color: 'var(--prussian-blue)', fontWeight: '800' }}>Kesiapan Sebagian (Butuh Perapihan):</strong> Cukup lampirkan aset yang telah Anda miliki saat ini (misal: logo, draf teks mentah, atau referensi gambar sederhana). Tim pengembang Aksara Tech akan membantu menyelaraskan tipografi, merapikan susunan <em>copywriting</em>, dan menyempurnakan struktur tata letak agar website Anda tetap tampil elegan dan berstandar korporat.
                    </div>
                  </div>
                )}

                {formData.designReadiness?.startsWith('Lengkap') && (
                  <div style={{
                    background: '#F0FDF4',
                    border: '2px solid #0F172A',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '3px 3px 0px #10B981',
                    padding: '14px 18px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <CheckCircle2 size={20} style={{ color: '#059669', flexShrink: 0 }} />
                    <div style={{ fontSize: '0.86rem', color: '#0F172A', lineHeight: '1.5', fontWeight: '600' }}>
                      <strong style={{ color: '#059669' }}>Materi Siap Pakai:</strong> Berkas logo, teks, dan gambar yang Anda lampirkan di bawah ini akan langsung diintegrasikan secara presisi ke dalam struktur sistem website.
                    </div>
                  </div>
                )}

                {/* Tampilkan input tautan cloud HANYA JIKA klien memiliki aset (Lengkap / Sebagian) */}
                {formData.designReadiness && !formData.designReadiness.startsWith('Belum Ada') ? (
                  <div style={{
                    background: '#FFFFFF',
                    border: '2px solid #0F172A',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '4px 4px 0px #CBD5E1',
                    padding: '24px',
                    marginBottom: '22px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '8px',
                        background: 'var(--prussian-blue)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #0F172A',
                        boxShadow: '2px 2px 0px #0F172A',
                        flexShrink: 0
                      }}>
                        <Link2 size={20} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0F172A', margin: 0 }}>
                          Tautan Folder / Berkas Aset (Google Drive / Dropbox / Figma / dll)
                        </h4>
                        <p style={{ fontSize: '0.84rem', color: '#475569', margin: '2px 0 0 0', fontWeight: '500' }}>
                          Masukkan link cloud berisi logo, materi teks, atau foto produk yang Anda miliki:
                        </p>
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <input
                        type="url"
                        className="form-input"
                        style={{
                          fontSize: '0.94rem',
                          padding: '13px 16px',
                          border: '2px solid #0F172A'
                        }}
                        placeholder="Contoh: https://drive.google.com/drive/folders/... atau link Dropbox/Figma/OneDrive"
                        value={formData.assetDriveUrl || ''}
                        onChange={(e) => updateField('assetDriveUrl', e.target.value)}
                      />
                    </div>

                    {/* Supported Services Pills */}
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                      <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '700', marginRight: '4px' }}>Layanan Didukung:</span>
                      {['Google Drive', 'Dropbox', 'Figma', 'OneDrive', 'iCloud'].map((srv) => (
                        <span key={srv} style={{
                          fontSize: '0.74rem',
                          background: '#F1F5F9',
                          border: '1.2px solid #0F172A',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontWeight: '700',
                          color: '#0F172A'
                        }}>
                          {srv}
                        </span>
                      ))}
                    </div>

                    {/* Security & Access Tip */}
                    <div style={{
                      background: '#FFFDF0',
                      border: '1.5px solid #0F172A',
                      borderRadius: '6px',
                      padding: '12px 14px',
                      fontSize: '0.82rem',
                      color: '#0F172A',
                      lineHeight: '1.5',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px'
                    }}>
                      <Info size={16} style={{ color: '#D97706', marginTop: '2px', flexShrink: 0 }} />
                      <span>
                        <strong>Tips Akses:</strong> Pastikan setelan berbagi tautan Google Drive / Cloud Anda telah diatur ke <u>"Siapa saja yang memiliki link" (*Anyone with the link*)</u> agar tim pengembang Aksara Tech dapat langsung membuka dan mengunduh berkas Anda.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    background: '#F0FDF4',
                    border: '2px solid #0F172A',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '3px 3px 0px #0F172A',
                    padding: '16px 20px',
                    marginBottom: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <Sparkles size={22} style={{ color: '#059669', flexShrink: 0 }} />
                    <div style={{ fontSize: '0.88rem', color: '#0F172A', lineHeight: '1.5', fontWeight: '600' }}>
                      <strong>Tenang, Tidak Masalah!</strong> Anda tidak perlu menyiapkan tautan berkas saat ini. Tim pengembang Aksara Tech akan membantu menyiapkan placeholder teks profesional, struktur tata letak awal, dan visual standar siap pakai untuk website Anda.
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Referensi Website / Warna / Gaya Desain yang Diinginkan (Opsional)</label>
                  <textarea
                    rows={3}
                    className="form-textarea"
                    placeholder="Contoh: Menginginkan gaya modern cerah dengan aksen Prussian blue dan Kuning seperti Aksara Tech."
                    value={formData.designReference}
                    onChange={(e) => updateField('designReference', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* STEP 6: Modul Add-on Tambahan */}
            {currentStep === 6 && (
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '900', marginBottom: '8px', color: '#0F172A' }}>
                  Langkah 6: Layanan Tambahan (Add-on Resmi)
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '20px' }}>
                  Pilih layanan tambahan resmi jika diperlukan. Biaya akan diakumulasikan secara transparan di Surat Penawaran.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '24px' }}>
                  {ADDONS.map((addon) => {
                    const isChecked = formData.selectedAddonIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleArrayItem('selectedAddonIds', addon.id)}
                        style={{
                          background: isChecked ? '#FFF9E6' : '#FFFFFF',
                          border: isChecked ? '2px solid #0F172A' : '1.5px solid #CBD5E1',
                          boxShadow: isChecked ? '3px 3px 0px var(--kuning)' : '2px 2px 0px #E2E8F0',
                          borderRadius: '6px',
                          padding: '14px 16px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '4px',
                          border: '2px solid #0F172A',
                          background: isChecked ? 'var(--prussian-blue)' : '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px'
                        }}>
                          {isChecked && <CheckCircle2 size={16} color="#FFFFFF" />}
                        </div>
                        <div>
                          <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#0F172A', marginBottom: '2px' }}>
                            {addon.name}
                          </div>
                          <div style={{ color: '#D97706', fontWeight: '900', fontSize: '0.88rem', marginBottom: '4px' }}>
                            {addon.priceDisplay}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: '1.4' }}>
                            {addon.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Kolom Chat Permintaan Modul Khusus */}
                <div style={{
                  background: isCustomModuleSelected ? '#FFFDF0' : '#F8FAFC',
                  border: '2px solid #0F172A',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: isCustomModuleSelected ? '5px 5px 0px var(--kuning)' : '3px 3px 0px #CBD5E1',
                  padding: '22px',
                  marginBottom: '22px',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: isCustomModuleSelected ? 'var(--kuning)' : 'var(--prussian-blue)',
                        color: isCustomModuleSelected ? '#0F172A' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #0F172A',
                        boxShadow: '2px 2px 0px #0F172A',
                        flexShrink: 0
                      }}>
                        <MessageCircle size={20} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0F172A', margin: 0 }}>
                          Kolom Chat Permintaan Modul Khusus / Fitur di Luar List
                        </h4>
                        <p style={{ fontSize: '0.82rem', color: '#475569', margin: '2px 0 0 0', fontWeight: '600' }}>
                          {isCustomModuleSelected 
                            ? 'Add-on Modul Khusus aktif! Jelaskan alur kerja atau fitur spesifik yang Anda inginkan:' 
                            : 'Punya ide fitur atau modul khusus di luar daftar resmi di atas? Tuliskan di sini:'}
                        </p>
                      </div>
                    </div>
                    {isCustomModuleSelected && (
                      <span className="badge badge-kuning">
                        Add-on #4 Terpilih
                      </span>
                    )}
                  </div>

                  <textarea
                    rows={3}
                    className="form-textarea"
                    style={{
                      background: '#FFFFFF',
                      border: '2px solid #0F172A',
                      borderRadius: '6px',
                      fontSize: '0.92rem',
                      padding: '12px 14px',
                      lineHeight: '1.6',
                      marginTop: '10px'
                    }}
                    placeholder="Contoh: Kami butuh modul generate kode QR otomatis untuk setiap transaksi yang dapat di-scan oleh kasir, sistem scoring SPK SAW untuk tugas akhir, atau kalkulator simulasi kredit custom..."
                    value={formData.customModuleRequest || ''}
                    onChange={(e) => updateField('customModuleRequest', e.target.value)}
                  />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', fontSize: '0.78rem', color: '#64748B', fontWeight: '700' }}>
                    <HelpCircle size={14} style={{ color: 'var(--prussian-blue)' }} />
                    <span>Tim pengembang Aksara Tech akan menganalisis kerumitan modul ini untuk perhitungan penawaran resmi.</span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Catatan Tambahan Lainnya (Opsional)</label>
                  <textarea
                    rows={2}
                    className="form-textarea"
                    placeholder="Contoh: Mohon dikerjakan lebih cepat jika memungkinkan, atau catatan penting lainnya..."
                    value={formData.specialNotes}
                    onChange={(e) => updateField('specialNotes', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* STEP 7: Ringkasan Pesanan & Kirim ke WA */}
            {currentStep === 7 && (
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '900', marginBottom: '8px', color: '#0F172A' }}>
                  Langkah 7: Ringkasan Pesanan &amp; Pernyataan Persetujuan
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '24px' }}>
                  Periksa kembali ringkasan brief teknis Anda sebelum diteruskan ke saluran resmi WhatsApp Aksara Tech.
                </p>

                {/* Summary Table Box */}
                <div style={{
                  background: '#F8FAFC',
                  border: '2px solid #0F172A',
                  boxShadow: '4px 4px 0px #CBD5E1',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  marginBottom: '28px'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '700' }}>Klien / Instansi</div>
                      <div style={{ fontWeight: '800', color: '#0F172A' }}>{formData.clientName || '-'}</div>
                      <div style={{ fontSize: '0.84rem', color: '#475569' }}>{formData.clientPhone}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '700' }}>Nama Proyek</div>
                      <div style={{ fontWeight: '800', color: '#0F172A' }}>{formData.projectTitle || '-'}</div>
                      <div style={{ fontSize: '0.84rem', color: '#475569' }}>{formData.projectCategory}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '700' }}>Paket Terpilih</div>
                      <div style={{ fontWeight: '800', color: 'var(--prussian-blue)' }}>{selectedPackage.name}</div>
                      <div style={{ fontSize: '0.84rem', color: '#475569' }}>{selectedPackage.minDays}–{selectedPackage.maxDays} Hari Kerja</div>
                    </div>
                  </div>

                  {/* Features breakdown */}
                  <div style={{ paddingTop: '16px', borderTop: '1.5px solid #E2E8F0', marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
                      Modul Fitur Terpilih ({formData.functionalFeatures?.length || 0}):
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#475569', lineHeight: '1.5', marginBottom: '8px' }}>
                      {formData.functionalFeatures?.join(', ') || '-'}
                    </div>

                    {formData.customFeatures && (
                      <div style={{ background: '#EFF6FF', border: '1.5px solid var(--prussian-blue)', borderRadius: '6px', padding: '10px 12px', marginTop: '6px' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--prussian-blue)', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <MessageSquarePlus size={14} /> Fitur Kustom (Ketik Sendiri):
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#0F172A', fontWeight: '600' }}>
                          "{formData.customFeatures}"
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Design & Asset Material */}
                  <div style={{ paddingTop: '16px', borderTop: '1.5px solid #E2E8F0', marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
                      Kesiapan Materi &amp; Aset Visual:
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#475569', marginBottom: '6px' }}>
                      Status: <strong>{formData.designReadiness}</strong>
                    </div>

                    {formData.assetDriveUrl ? (
                      <div style={{
                        background: '#EFF6FF',
                        border: '1.5px solid var(--prussian-blue)',
                        borderRadius: '6px',
                        padding: '10px 14px',
                        marginTop: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <Link2 size={16} style={{ color: 'var(--prussian-blue)', flexShrink: 0 }} />
                        <div style={{ fontSize: '0.82rem', color: '#0F172A', wordBreak: 'break-all' }}>
                          <strong>Tautan Aset:</strong>{' '}
                          <a href={formData.assetDriveUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--prussian-blue)', fontWeight: '700', textDecoration: 'underline' }}>
                            {formData.assetDriveUrl}
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.8rem', color: '#64748B', fontStyle: 'italic', marginTop: '2px' }}>
                        Tautan berkas cloud belum dilampirkan.
                      </div>
                    )}
                  </div>

                  {/* Addon breakdown */}
                  {selectedAddons.length > 0 && (
                    <div style={{ paddingTop: '16px', borderTop: '1.5px solid #E2E8F0', marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
                        Layanan Tambahan (Add-on):
                      </div>
                      {selectedAddons.map(a => (
                        <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: '#475569', marginBottom: '4px' }}>
                          <span>&bull; {a.name}</span>
                          <span style={{ color: '#0F172A', fontWeight: '700' }}>{a.priceDisplay}</span>
                        </div>
                      ))}

                      {formData.customModuleRequest && (
                        <div style={{ background: '#FFFDF0', border: '1.5px solid var(--kuning)', borderRadius: '6px', padding: '10px 12px', marginTop: '8px' }}>
                          <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#D97706', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MessageCircle size={14} /> Permintaan Modul Khusus:
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#0F172A', fontWeight: '600' }}>
                            "{formData.customModuleRequest}"
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Total summary */}
                  <div style={{
                    paddingTop: '16px',
                    borderTop: '2px solid #0F172A',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: '700' }}>Estimasi Tarif Referensi:</div>
                      <div style={{ fontSize: '1.45rem', fontWeight: '900', color: 'var(--prussian-blue)' }}>
                        {formatRupiah(calculations.minPrice)} – {formatRupiah(calculations.maxPrice)}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: '600' }}>
                        Uang Muka (DP 50%): {formatRupiah(calculations.dpMin)} – {formatRupiah(calculations.dpMax)}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#0F172A', background: 'var(--kuning)', border: '1.5px solid #0F172A', padding: '6px 14px', borderRadius: '4px', fontWeight: '800', boxShadow: '2px 2px 0px #0F172A' }}>
                      Kuota Revisi: Maksimal 3x Mutlak
                    </div>
                  </div>
                </div>

                {/* Mandatory Checkboxes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.serverExclusionAgreed}
                      onChange={(e) => updateField('serverExclusionAgreed', e.target.checked)}
                      style={{ marginTop: '4px' }}
                    />
                    <span style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.5' }}>
                      <strong style={{ color: '#D97706' }}>Pernyataan Eksklusi Server:</strong> Saya memahami bahwa Aksara Tech berfokus murni pada penulisan kode program (software engineering). Layanan <em>tidak</em> mencakup sewa hosting, pembelian domain, atau maintenance server fisik/cloud.
                    </span>
                  </label>
                  {errors.serverExclusionAgreed && (
                    <p style={{ color: 'var(--rose)', fontSize: '0.85rem', marginLeft: '26px', fontWeight: '700' }}>{errors.serverExclusionAgreed}</p>
                  )}

                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.termsAgreed}
                      onChange={(e) => updateField('termsAgreed', e.target.checked)}
                      style={{ marginTop: '4px' }}
                    />
                    <span style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.5' }}>
                      Saya menyetujui Ketentuan Layanan Aksara Tech, termasuk ketentuan <strong>Kuota Revisi Maksimal 3 Kali Mutlak</strong>, skema DP 50% non-refundable pasca koding dimulai, dan jaminan kerahasiaan data 100%.
                    </span>
                  </label>
                  {errors.termsAgreed && (
                    <p style={{ color: 'var(--rose)', fontSize: '0.85rem', marginLeft: '26px', fontWeight: '700' }}>{errors.termsAgreed}</p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation & Submit Buttons */}
            <div className={`order-nav-buttons ${currentStep === 7 ? 'is-step-final' : 'is-step-normal'}`}>
              {currentStep > 1 && (
                <Button
                  variant="secondary"
                  onClick={prevStep}
                  icon={ArrowLeft}
                  iconPosition="left"
                  className="order-btn-prev"
                >
                  Sebelumnya
                </Button>
              )}

              {currentStep < 7 ? (
                <Button
                  variant="primary"
                  onClick={nextStep}
                  icon={ArrowRight}
                  iconPosition="right"
                  className={`order-btn-next ${currentStep === 1 ? 'full-width' : ''}`}
                >
                  Lanjut ke Langkah {currentStep + 1}
                </Button>
              ) : (
                <Button
                  variant="wa"
                  onClick={submitToWhatsApp}
                  icon={Send}
                  iconPosition="right"
                  className="order-btn-submit"
                >
                  Kirim Brief ke WhatsApp Korporat (085600386692)
                </Button>
              )}
            </div>

            {currentStep === 7 && (
              <div style={{
                fontSize: '0.82rem',
                color: '#64748B',
                marginTop: '14px',
                textAlign: 'center',
                fontWeight: '600',
                lineHeight: '1.5'
              }}>
                📌 <em>Catatan:</em> Mengklik tombol di atas akan membuka obrolan WhatsApp dengan draf teks brief Anda. Berkas aset Anda dapat langsung diakses melalui tautan cloud yang Anda lampirkan.
              </div>
            )}

          </form>

        </div>
      </div>

      {/* Embedded Responsive Styles for Order Form */}
      <style>{`
        /* =======================================================
           DESKTOP ORDER FORM STYLES (>= 1024px)
           ======================================================= */
        .order-brief-card {
          padding: 36px 40px;
        }

        .order-header-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 24px;
          padding-bottom: 18px;
          border-bottom: 2px solid #0F172A;
        }

        .order-id-label {
          font-size: 0.76rem;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 800;
        }

        .order-id-code {
          font-family: var(--font-mono);
          color: var(--prussian-blue);
          font-weight: 900;
          font-size: 1.1rem;
        }

        .order-est-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .order-est-box {
          text-align: right;
        }

        .order-est-label {
          font-size: 0.76rem;
          color: #64748B;
          font-weight: 700;
        }

        .order-est-value {
          font-weight: 900;
          color: #059669;
          font-size: 1.05rem;
        }

        .order-reset-btn {
          background: #F1F5F9;
          border: 2px solid #0F172A;
          color: #0F172A;
          cursor: pointer;
          padding: 7px 9px;
          border-radius: 6px;
          box-shadow: 1.5px 1.5px 0px #0F172A;
          transition: all 0.15s ease;
        }

        .order-reset-btn:hover {
          background: var(--kuning);
          transform: translate(-1px, -1px);
        }

        .order-nav-buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 32px;
          padding-top: 20px;
          border-top: 2px solid #0F172A;
          gap: 16px;
        }

        .order-btn-next.full-width {
          margin-left: auto;
        }

        .selection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }

        /* =======================================================
           MOBILE & TABLET ORDER FORM (< 1024px)
           ======================================================= */
        @media (max-width: 1023px) {
          .order-brief-card {
            padding: 20px 16px !important;
            border-radius: var(--radius-sm) !important;
            box-shadow: 3px 3px 0px #0F172A !important;
          }

          .order-header-strip {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            margin-bottom: 18px;
            padding-bottom: 14px;
          }

          .order-id-group {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .order-id-code {
            font-size: 0.95rem;
          }

          .order-est-group {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #F8FAFC;
            border: 1.5px solid #0F172A;
            border-radius: 6px;
            padding: 10px 14px;
            box-shadow: 2px 2px 0px #CBD5E1;
          }

          .order-est-box {
            text-align: left !important;
          }

          .order-est-value {
            font-size: 0.95rem;
          }

          .selection-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .order-nav-buttons {
            display: flex;
            width: 100%;
            gap: 12px;
          }

          /* Normal intermediate steps (Steps 1-6) */
          .order-nav-buttons.is-step-normal {
            flex-direction: row;
            align-items: center;
          }

          .order-nav-buttons.is-step-normal .order-btn-prev {
            flex: 0 0 38%;
            justify-content: center;
            padding: 12px 10px !important;
            font-size: 0.88rem !important;
          }

          .order-nav-buttons.is-step-normal .order-btn-next {
            flex: 1;
            justify-content: center;
            padding: 12px 14px !important;
            font-size: 0.88rem !important;
          }

          .order-nav-buttons.is-step-normal .order-btn-next.full-width {
            flex: 1 1 100% !important;
            width: 100% !important;
          }

          /* Final step (Step 7): Stack vertically */
          .order-nav-buttons.is-step-final {
            flex-direction: column-reverse !important;
            gap: 12px !important;
          }

          .order-nav-buttons.is-step-final .order-btn-submit {
            width: 100% !important;
            justify-content: center;
            padding: 15px 18px !important;
            font-size: 0.98rem !important;
            box-shadow: 3.5px 3.5px 0px #0F172A !important;
          }

          .order-nav-buttons.is-step-final .order-btn-prev {
            width: 100% !important;
            justify-content: center;
            padding: 12px 14px !important;
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </section>
  );
}
