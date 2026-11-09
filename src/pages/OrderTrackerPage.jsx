import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileCode2, 
  Layers, 
  AlertCircle, 
  MessageCircle, 
  ExternalLink, 
  Copy, 
  Check, 
  HelpCircle,
  FolderArchive,
  ArrowRight,
  Database,
  Code2,
  RefreshCw
} from 'lucide-react';
import PageHeader from '../components/molecules/PageHeader';
import { formatRupiah } from '../utils/documentEngine';
import { BUSINESS_INFO, PACKAGES } from '../data/catalogData';

// Standard 5-Step SOP Pipeline
const SOP_STAGES = [
  {
    step: 1,
    title: 'Verifikasi Kebutuhan & Pembayaran DP 50%',
    description: 'Penyelarasan ruang lingkup fungsional, penerbitan Surat Penawaran resmi, dan pembayaran uang muka komitmen 50% untuk memulai antrean pengerjaan.',
    badge: 'Administrasi Awal'
  },
  {
    step: 2,
    title: 'Perancangan Basis Data Relasional & Skema Tabel',
    description: 'Pemodelan skema relasi tabel MySQL/PostgreSQL, ERD, dan struktur arsitektur sistem sesuai spesifikasi paket.',
    badge: 'Arsitektur Data'
  },
  {
    step: 3,
    title: 'Pengembangan Kode Sumber & Integrasi Fitur',
    description: 'Penulisan logika bisnis backend yang bersih (clean code), komentar penjelas fungsi, dan integrasi tampilan antarmuka responsif.',
    badge: 'Rekayasa Software'
  },
  {
    step: 4,
    title: 'Pratinjau Pertama & Sesi Revisi (Maks 3x)',
    description: 'Pemberian akses pratinjau live kepada Klien dan eksekusi perbaikan sesuai kuota maksimal 3 kali sesi revisi mutlak.',
    badge: 'Uji Coba & Revisi'
  },
  {
    step: 5,
    title: 'Uji Fungsi Mandiri, Pelunasan 50%, & Serah Terima Master Code (.zip)',
    description: 'Pelunasan sisa 50% setelah kode lolos uji, penyerahan master source code (.zip) seutuhnya, database .sql, dan masa garansi bug 1 minggu dimulai.',
    badge: 'Serah Terima Akhir'
  }
];

// Curated active mock database with varied stages for demonstration and instant lookup
const MOCK_ORDERS = [
  {
    id: 'INQ-AT-20261109-8F2A',
    orderNumber: 'ORD-AT-2026-0042',
    clientName: 'Budi Santoso',
    clientPhone: '081234567890',
    projectTitle: 'Website Katalog Kopi Nusantara & Direct WhatsApp Order',
    category: 'UMKM & Bisnis',
    packageId: 'umkm-katalog',
    packageName: 'Website UMKM & Katalog Produk Digital',
    packagePrice: 300000,
    addons: [
      { name: 'Integrasi Database MySQL & CRUD', price: 60000 },
      { name: 'Fitur Multi-Bahasa (Localization)', price: 45000 }
    ],
    totalInvestment: 405000,
    dpAmount: 202500,
    dpStatus: 'LUNAS (DP 50%)',
    orderDate: '09 November 2026',
    estimatedCompletion: '15 November 2026',
    currentStageNumber: 3,
    revisionQuotaTotal: 3,
    revisionQuotaUsed: 0,
    developerNotes: 'Basis data MySQL dan 4 tabel relasional katalog produk telah siap. Tim saat ini sedang menghubungkan endpoint filter pencarian real-time dan format checkout WhatsApp. Pratinjau pertama dijadwalkan tayang pada Rabu, 12 November.',
    deliverablesPreview: [
      'Master Source Code (.zip) Full Stack',
      'Skema Database MySQL (.sql) dengan data uji produk kopi',
      'Ringkasan SRS Fungsional & ERD Diagram'
    ]
  },
  {
    id: 'ORD-AT-2026-0018',
    orderNumber: 'ORD-AT-2026-0018',
    clientName: 'PT Samudera Logistik Nusantara',
    clientPhone: '085711223344',
    projectTitle: 'Portal Company Profile Eksekutif & Formulir Permintaan Penawaran',
    category: 'Standard Enterprise',
    packageId: 'company-profile',
    packageName: 'Company Profile Korporat',
    packagePrice: 400000,
    addons: [
      { name: 'Optimasi SEO On-Page Lanjutan', price: 40000 }
    ],
    totalInvestment: 440000,
    dpAmount: 220000,
    dpStatus: 'LUNAS (DP 50%)',
    orderDate: '04 November 2026',
    estimatedCompletion: '11 November 2026',
    currentStageNumber: 4,
    revisionQuotaTotal: 3,
    revisionQuotaUsed: 1,
    developerNotes: 'Pratinjau pertama telah disampaikan kepada PIC Klien. Sesi revisi ke-1 (penyesuaian tata letak profil direksi dan nomor kontak cabang) sedang dalam proses perbaikan. Sisa kuota revisi: 2 sesi.',
    deliverablesPreview: [
      'Master Source Code Company Profile Korporat 6 Halaman',
      'Panduan Operasional & Dokumentasi Struktur Kode',
      'Konfigurasi Meta Tags SEO On-Page'
    ]
  },
  {
    id: 'ORD-AT-2026-0005',
    orderNumber: 'ORD-AT-2026-0005',
    clientName: 'Rian Prawira',
    clientPhone: '089699887766',
    projectTitle: 'Sistem Informasi Rekam Medis Klinik berbasis Role Dokter & Pasien',
    category: 'Mahasiswa & Akademisi',
    packageId: 'skripsi-akademik',
    packageName: 'Tugas Kuliah / Project Mahasiswa / Modul Akademik',
    packagePrice: 500000,
    addons: [
      { name: 'Pembuatan Dokumen SRS & SDD Tambahan', price: 50000 },
      { name: 'Pembuatan UML & Diagram Sistem Lengkap', price: 50000 }
    ],
    totalInvestment: 600000,
    dpAmount: 300000,
    dpStatus: 'LUNAS 100% (SELESAI)',
    orderDate: '28 Oktober 2026',
    estimatedCompletion: '05 November 2026',
    currentStageNumber: 5,
    revisionQuotaTotal: 3,
    revisionQuotaUsed: 2,
    developerNotes: 'Seluruh tahapan rekayasa telah rampung 100%. Master Source Code (.zip), database .sql dengan dummy data, serta dokumen SRS/SDD dan UML diagram lengkap telah diserahterimakan. Masa garansi bug 1 minggu aktif hingga 12 November 2026.',
    deliverablesPreview: [
      'Master Source Code Sistem Web Rekam Medis Siap Run',
      'Database Relasional (.sql) dengan 60+ data rekam medis dummy',
      'Dokumen SRS & SDD Standar IEEE Formal Lengkap',
      'Paket UML Diagrams (Use Case, Activity, Sequence, Class, ERD)'
    ]
  }
];

export default function OrderTrackerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const [activeOrder, setActiveOrder] = useState(null);
  const [searchStatus, setSearchStatus] = useState('idle'); // idle, found, not_found
  const [copiedId, setCopiedId] = useState(false);

  // Read URL query parameters on initial load
  useEffect(() => {
    const codeParam = searchParams.get('kode') || searchParams.get('id') || searchParams.get('no');
    if (codeParam) {
      setSearchInput(codeParam);
      executeSearch(codeParam);
    } else {
      // Check localStorage for recent brief inquiry
      try {
        const stored = localStorage.getItem('aksara_order_brief_v1');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.inquiryId && !activeOrder) {
            // Found a local brief submission, keep query ready
            setSearchInput(parsed.inquiryId);
            executeSearch(parsed.inquiryId);
          }
        }
      } catch (e) {
        // Fallback silently
      }
    }
  }, [searchParams]);

  // Execute lookup logic across mock database & localStorage
  const executeSearch = (rawQuery) => {
    const query = (rawQuery || searchInput || '').trim();
    if (!query) return;

    const normalizedQuery = query.toLowerCase().replace(/[\s-]/g, '');

    // 1. Check in curated MOCK_ORDERS by ID, orderNumber, or clientPhone
    const matched = MOCK_ORDERS.find(ord => {
      const ordIdNorm = (ord.id || '').toLowerCase().replace(/[\s-]/g, '');
      const ordNoNorm = (ord.orderNumber || '').toLowerCase().replace(/[\s-]/g, '');
      const ordPhoneNorm = (ord.clientPhone || '').replace(/[\s-+]/g, '').replace(/^62/, '0');
      const qPhoneNorm = normalizedQuery.replace(/[\s-+]/g, '').replace(/^62/, '0');

      return ordIdNorm.includes(normalizedQuery) ||
             ordNoNorm.includes(normalizedQuery) ||
             (qPhoneNorm.length >= 8 && ordPhoneNorm.includes(qPhoneNorm));
    });

    if (matched) {
      setActiveOrder(matched);
      setSearchStatus('found');
      return;
    }

    // 2. Check in localStorage (Recent brief filled by the user on this browser)
    try {
      const stored = localStorage.getItem('aksara_order_brief_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        const storedIdNorm = (parsed.inquiryId || '').toLowerCase().replace(/[\s-]/g, '');
        const storedPhoneNorm = (parsed.clientPhone || '').replace(/[\s-+]/g, '').replace(/^62/, '0');
        const qPhoneNorm = normalizedQuery.replace(/[\s-+]/g, '').replace(/^62/, '0');

        if (storedIdNorm.includes(normalizedQuery) || (qPhoneNorm.length >= 8 && storedPhoneNorm.includes(qPhoneNorm))) {
          // Construct live order object from local brief
          const pkg = PACKAGES.find(p => p.id === parsed.selectedPackageId) || PACKAGES[1];
          const localOrder = {
            id: parsed.inquiryId || 'INQ-AT-LOCAL',
            orderNumber: 'INQ-MENUNGGU-DP',
            clientName: parsed.clientName || 'Calon Klien',
            clientPhone: parsed.clientPhone || '-',
            projectTitle: parsed.projectTitle || 'Proyek Website Kustom Aksara Tech',
            category: parsed.projectCategory || 'UMKM & Bisnis',
            packageId: pkg.id,
            packageName: pkg.name,
            packagePrice: pkg.minPrice,
            addons: (parsed.selectedAddonIds || []).map(aId => ({ name: aId, price: 50000 })),
            totalInvestment: pkg.minPrice,
            dpAmount: Math.round(pkg.minPrice / 2),
            dpStatus: 'MENUNGGU VERIFIKASI DP 50%',
            orderDate: new Date().toLocaleDateString('id-ID', { dateStyle: 'long' }),
            estimatedCompletion: 'Menunggu Konfirmasi DP',
            currentStageNumber: 1,
            revisionQuotaTotal: 3,
            revisionQuotaUsed: 0,
            developerNotes: 'Formulir brief teknis telah tersimpan di browser Anda. Segera kirimkan brief ke WhatsApp resmi Aksara Tech untuk verifikasi spesifikasi dan penerbitan draf penawaran resmi.',
            deliverablesPreview: pkg.deliverables || ['Full Source Code Lengkap', 'Database Relasional (.sql)']
          };

          setActiveOrder(localOrder);
          setSearchStatus('found');
          return;
        }
      }
    } catch (e) {
      // LocalStorage fallback handled silently
    }

    setActiveOrder(null);
    setSearchStatus('not_found');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ kode: searchInput.trim() });
      executeSearch(searchInput.trim());
    }
  };

  const handleSelectDemo = (demoId) => {
    setSearchInput(demoId);
    setSearchParams({ kode: demoId });
    executeSearch(demoId);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const copyIdToClipboard = (text) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="order-tracker-page" style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '96px' }}>
      
      {/* Header */}
      <PageHeader
        breadcrumbs={[{ label: 'Lacak Status Proyek' }]}
        badge="Sistem Pemantauan Terbuka Aksara Tech"
        badgeIcon={Search}
        title="Pelacak Status Pengerjaan"
        highlightText="Proyek Mandiri"
        description="Pantau progres perancangan basis data, integrasi kode program, status pratinjau antarmuka, serta sisa kuota revisi proyek website Anda secara transparan."
      />

      <div className="container" style={{ maxWidth: '1080px', margin: '0 auto', marginInline: 'auto', padding: '0 24px', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Search Box Card */}
        <div style={{ background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '14px', padding: '32px 28px', marginTop: '36px' }}>
          
          <h2 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#0F172A', margin: '0 0 8px 0', lineHeight: '1.3' }}>
            Masukkan Nomor Tiket atau Nomor WhatsApp
          </h2>
          <p style={{ fontSize: '1rem', color: '#334155', margin: '0 0 20px 0', lineHeight: '1.6' }}>
            Ketikkan ID Permintaan (<code style={{ background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px', color: '#0F172A', fontWeight: '700' }}>INQ-AT-...</code>), Nomor Order (<code style={{ background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px', color: '#0F172A', fontWeight: '700' }}>ORD-AT-...</code>), atau Nomor WhatsApp yang Anda daftarkan saat mengisi lembar brief.
          </p>

          {/* Form Search Bar */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 320px', position: 'relative' }}>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Contoh: INQ-AT-20261109-8F2A atau 081234567890"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '14px 16px 14px 44px',
                  fontSize: '0.98rem',
                  fontWeight: '600',
                  color: '#0F172A',
                  background: '#F8FAFC',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.15s, background-color 0.15s'
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--prussian-blue)'; e.currentTarget.style.background = '#FFFFFF'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.background = '#F8FAFC'; }}
              />
              <Search size={20} color="#64748B" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            <button
              type="submit"
              style={{
                background: 'var(--prussian-blue)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '14px 28px',
                fontSize: '0.95rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                flexShrink: 0
              }}
            >
              <span>Lacak Status</span>
            </button>
          </form>

          {/* Interactive Preset Demos */}
          <div style={{ marginTop: '24px', paddingTop: '8px' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#1E293B', marginBottom: '10px' }}>
              Uji Coba Langsung dengan Contoh Data Pesanan Aktif:
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => handleSelectDemo('INQ-AT-20261109-8F2A')}
                style={{
                  background: '#F1F5F9',
                  color: '#0F172A',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '7px 12px',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Demo 1: INQ-AT-20261109-8F2A (Tahap Koding Backend)
              </button>
              <button
                type="button"
                onClick={() => handleSelectDemo('ORD-AT-2026-0018')}
                style={{
                  background: '#F1F5F9',
                  color: '#0F172A',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '7px 12px',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Demo 2: ORD-AT-2026-0018 (Tahap Sesi Revisi)
              </button>
              <button
                type="button"
                onClick={() => handleSelectDemo('ORD-AT-2026-0005')}
                style={{
                  background: '#F1F5F9',
                  color: '#0F172A',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '7px 12px',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Demo 3: ORD-AT-2026-0005 (Tahap Selesai &amp; Serah Terima)
              </button>
            </div>
          </div>

          {/* Transparent Guide: Where to find the tracking number */}
          <div style={{ marginTop: '24px', background: '#F8FAFC', borderRadius: '10px', padding: '18px 20px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0F172A', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={17} color="#0F172A" />
              <span>Di Mana Saya Dapat Menemukan Nomor Tiket Ini?</span>
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.86rem', color: '#334155', lineHeight: '1.6' }}>
              <li>
                <strong>Di Riwayat Chat WhatsApp:</strong> Buka chat Anda dengan tim Aksara Tech. Nomor tertera pada baris pertama draf pemesanan (<code style={{ color: '#0F172A', fontWeight: '700' }}>ID Permintaan: INQ-AT-...</code>).
              </li>
              <li>
                <strong>Di Lembar Konfirmasi Formulir:</strong> Kode tiket ditampilkan pada langkah ke-7 saat Anda menekan tombol submit di halaman <Link to="/pesan" style={{ color: 'var(--prussian-blue)', fontWeight: '700' }}>/pesan</Link>.
              </li>
              <li>
                <strong>Di Berkas Dokumen PDF Resmi:</strong> Nomor tercetak di pojok kanan atas kop surat draf Surat Penawaran (Quotation) yang diunduh.
              </li>
              <li>
                <strong>Lupa Kode Tiket?</strong> Anda cukup memasukkan nomor WhatsApp aktif yang Anda isi pada formulir brief.
              </li>
            </ul>
          </div>

        </div>

        {/* RESULTS SECTION: When Found */}
        {searchStatus === 'found' && activeOrder && (
          <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* Overview Card */}
            <div style={{ background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '14px', padding: '30px 28px' }}>
              
              {/* Header Title Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', borderBottom: '1px solid #F1F5F9', paddingBottom: '20px' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.84rem', fontWeight: '800', color: 'var(--prussian-blue)', background: '#F1F5F9', padding: '4px 10px', borderRadius: '6px' }}>
                      {activeOrder.category}
                    </span>
                    <span style={{ fontSize: '0.84rem', fontWeight: '800', color: '#16A34A', background: '#F0FDF4', padding: '4px 10px', borderRadius: '6px' }}>
                      Status DP: {activeOrder.dpStatus}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0F172A', margin: '0 0 6px 0', lineHeight: '1.3' }}>
                    {activeOrder.projectTitle}
                  </h3>
                  <div style={{ fontSize: '0.9rem', color: '#475569' }}>
                    Pemesan: <strong>{activeOrder.clientName}</strong> &bull; Paket: <strong>{activeOrder.packageName}</strong>
                  </div>
                </div>

                {/* Tracking ID Badge with copy */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>
                    Nomor Tiket Resmi:
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#0F172A', color: '#FFFFFF', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem', fontWeight: '800' }}>
                    <code>{activeOrder.id}</code>
                    <button
                      type="button"
                      onClick={() => copyIdToClipboard(activeOrder.id)}
                      title="Salin nomor tiket"
                      style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, display: 'flex' }}
                    >
                      {copiedId ? <Check size={14} color="#22C55E" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', paddingTop: '20px' }}>
                <div style={{ background: '#F8FAFC', padding: '14px 16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700' }}>Tanggal Mulai</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>{activeOrder.orderDate}</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '14px 16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700' }}>Target Selesai</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>{activeOrder.estimatedCompletion}</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '14px 16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700' }}>Total Investasi Resmi</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--prussian-blue)', marginTop: '2px' }}>{formatRupiah(activeOrder.totalInvestment)}</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '14px 16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700' }}>Kuota Revisi Mutlak</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>
                    {activeOrder.revisionQuotaUsed} dari {activeOrder.revisionQuotaTotal} Sesi Terpakai
                  </div>
                </div>
              </div>

            </div>

            {/* Stepline Visual Progress Tracker */}
            <div style={{ background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '14px', padding: '32px 28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0F172A', margin: '0 0 4px 0' }}>
                    Alur Tahapan Pengerjaan Sistem (SOP Aksara Tech)
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>
                    Setiap tahapan dikerjakan secara berurutan sesuai disiplin rekayasa software enterprise.
                  </p>
                </div>
                <div style={{ fontSize: '0.86rem', fontWeight: '800', color: 'var(--prussian-blue)' }}>
                  Tahap Saat Ini: Tahap {activeOrder.currentStageNumber} dari 5
                </div>
              </div>

              {/* 5 Steps Vertical Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {SOP_STAGES.map((stg) => {
                  const isCompleted = activeOrder.currentStageNumber > stg.step;
                  const isCurrent = activeOrder.currentStageNumber === stg.step;
                  const isPending = activeOrder.currentStageNumber < stg.step;

                  return (
                    <div 
                      key={stg.step}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '40px 1fr',
                        gap: '16px',
                        position: 'relative'
                      }}
                    >
                      {/* Step Indicator Circle */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: isCompleted ? '#0F172A' : isCurrent ? 'var(--prussian-blue)' : '#FFFFFF',
                            border: isPending ? '2px solid #CBD5E1' : 'none',
                            color: isPending ? '#94A3B8' : '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '800',
                            fontSize: '0.92rem',
                            flexShrink: 0,
                            zIndex: 2
                          }}
                        >
                          {isCompleted ? <Check size={18} strokeWidth={3} /> : stg.step}
                        </div>
                        {/* Connecting Line */}
                        {stg.step < 5 && (
                          <div 
                            style={{ 
                              width: '2px', 
                              flex: 1, 
                              background: isCompleted ? '#0F172A' : '#E2E8F0', 
                              marginTop: '6px', 
                              marginBottom: '6px' 
                            }} 
                          />
                        )}
                      </div>

                      {/* Step Content Box */}
                      <div
                        style={{
                          background: isCurrent ? '#F8FAFC' : '#FFFFFF',
                          border: isCurrent ? '1.5px solid var(--prussian-blue)' : '1px solid #E2E8F0',
                          borderRadius: '10px',
                          padding: '18px 20px',
                          marginBottom: stg.step < 5 ? '8px' : 0
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: isPending ? '#64748B' : '#0F172A', margin: 0 }}>
                            {stg.title}
                          </h4>
                          <span
                            style={{
                              fontSize: '0.78rem',
                              fontWeight: '800',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              background: isCompleted ? '#F0FDF4' : isCurrent ? '#EFF6FF' : '#F1F5F9',
                              color: isCompleted ? '#16A34A' : isCurrent ? 'var(--prussian-blue)' : '#64748B'
                            }}
                          >
                            {isCompleted ? 'SELESAI' : isCurrent ? 'SEDANG BERJALAN' : 'MENUNGGU GILIRAN'}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.88rem', color: isPending ? '#94A3B8' : '#475569', margin: 0, lineHeight: '1.5' }}>
                          {stg.description}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* Developer Notes & Revision Quota Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              
              {/* Dev Notes Box */}
              <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Code2 size={18} color="var(--prussian-blue)" />
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    Catatan Rilis Pengembang (Live Log)
                  </h4>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6', margin: 0, background: '#F8FAFC', padding: '14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  "{activeOrder.developerNotes}"
                </p>
              </div>

              {/* Deliverables Checklist Box */}
              <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <FolderArchive size={18} color="#0F172A" />
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    Deliverables Proyek Ini
                  </h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeOrder.deliverablesPreview.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#0F172A" style={{ flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Help / WhatsApp Contact Banner */}
            <div style={{ background: '#0F172A', borderRadius: '12px', padding: '24px 28px', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: '800', margin: '0 0 4px 0' }}>
                  Ada Pertanyaan atau Catatan untuk Pengembang?
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: 0 }}>
                  Tim Aksara Tech siap merespons koordinasi teknis dan pertanyaan Anda via WhatsApp resmi.
                </p>
              </div>
              <a
                href={`https://wa.me/6285600386692?text=${encodeURIComponent(`Halo Tim Aksara Tech, saya ingin menanyakan perkembangan proyek dengan ID Permintaan: ${activeOrder.id} (${activeOrder.projectTitle}). Terima kasih!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#25D366',
                  color: '#FFFFFF',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontWeight: '800',
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <MessageCircle size={18} />
                <span>Hubungi PIC di WhatsApp</span>
              </a>
            </div>

          </div>
        )}

        {/* RESULTS SECTION: When Not Found */}
        {searchStatus === 'not_found' && (
          <div style={{ marginTop: '36px', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '14px', padding: '36px 28px', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <AlertCircle size={26} color="#0F172A" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', margin: '0 0 8px 0' }}>
              Nomor Tiket atau Nomor WhatsApp Tidak Ditemukan
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#475569', maxWidth: '620px', margin: '0 auto 24px auto', lineHeight: '1.5' }}>
              Pastikan Anda mengetikkan format yang sesuai (contoh: <code style={{ fontWeight: '700', color: '#0F172A' }}>INQ-AT-20261109-8F2A</code>) atau gunakan nomor WhatsApp yang sama saat Anda mengisi form di halaman /pesan.
            </p>
            <div style={{ display: 'inline-flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => handleSelectDemo('INQ-AT-20261109-8F2A')}
                style={{
                  background: 'var(--prussian-blue)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 18px',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                Buka Contoh Proyek Aktif
              </button>
              <Link
                to="/pesan"
                style={{
                  background: '#F1F5F9',
                  color: '#0F172A',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '10px 18px',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                Isi Lembar Kebutuhan Baru
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
