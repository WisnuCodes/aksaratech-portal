import React, { useState, useEffect } from 'react';
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
  Database,
  Code2,
  RefreshCw,
  History,
  FileText,
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import PageHeader from '../components/molecules/PageHeader';
import { formatRupiah } from '../utils/documentEngine';
import { findOrderByQuery, getAllOrders } from '../utils/orderStorage';

// Standard 5-Step SOP Pipeline definition
const SOP_STAGES = [
  {
    step: 1,
    title: 'Verifikasi Kebutuhan & Pembayaran DP 50%',
    description: 'Penyelarasan ruang lingkup fungsional, penerbitan Surat Penawaran resmi, dan pembayaran uang muka komitmen 50% untuk memulai antrean pengerjaan resmi.',
    badge: 'Administrasi Awal',
    output: 'Invoice DP 50% & Antrean Git'
  },
  {
    step: 2,
    title: 'Perancangan Basis Data Relasional & Skema Tabel',
    description: 'Pemodelan skema relasi tabel MySQL/PostgreSQL 3NF, ERD formal, dan penyiapan struktur arsitektur data tanpa dependensi sewa server pihak ketiga.',
    badge: 'Arsitektur Data',
    output: 'Skema Database (.sql) & ERD'
  },
  {
    step: 3,
    title: 'Pengembangan Kode Sumber & Integrasi Fitur',
    description: 'Penulisan logika bisnis modular yang bersih (clean code), komentar penjelas fungsi, serta integrasi antarmuka responsif sesuai spesifikasi paket.',
    badge: 'Rekayasa Software',
    output: 'Source Code Fungsional'
  },
  {
    step: 4,
    title: 'Pratinjau Pertama & Sesi Revisi (Maksimal 3x Mutlak)',
    description: 'Pemberian akses demo/pratinjau live kepada klien dan eksekusi perbaikan terstruktur sesuai kuota maksimal 3 sesi revisi SOP mutlak.',
    badge: 'Uji Coba & Revisi',
    output: 'Demo Live & Log Revisi'
  },
  {
    step: 5,
    title: 'Uji Fungsi Mandiri, Pelunasan 50%, & Serah Terima Master Code (.zip)',
    description: 'Pelunasan sisa 50% setelah kode lolos uji mandiri, penyerahan master file source code (.zip) seutuhnya, dan masa garansi bug 7 hari kalender resmi aktif.',
    badge: 'Serah Terima Akhir',
    output: 'Master Source Code (.zip)'
  }
];

export default function OrderTrackerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const [activeOrder, setActiveOrder] = useState(null);
  const [searchStatus, setSearchStatus] = useState('idle'); // idle, found, not_found
  const [copiedId, setCopiedId] = useState(false);
  const [activeDbOrders, setActiveDbOrders] = useState([]);
  const [showGuide, setShowGuide] = useState(false);

  // Fetch available orders directly from central database
  const refreshDbOrders = () => {
    try {
      const all = getAllOrders();
      setActiveDbOrders(Array.isArray(all) ? all : []);
    } catch (e) {
      setActiveDbOrders([]);
    }
  };

  // Read URL query parameters on initial load & bind live cross-tab storage sync
  useEffect(() => {
    refreshDbOrders();

    const codeParam = searchParams.get('kode') || searchParams.get('id') || searchParams.get('no');
    if (codeParam) {
      setSearchInput(codeParam);
      executeSearch(codeParam);
    }

    const handleStorageSync = () => {
      refreshDbOrders();
      if (activeOrder) {
        const fresh = findOrderByQuery(activeOrder.id);
        if (fresh) {
          setActiveOrder(fresh);
        } else {
          setActiveOrder(null);
          setSearchStatus('not_found');
        }
      }
    };

    window.addEventListener('storage', handleStorageSync);
    window.addEventListener('aksara_orders_updated', handleStorageSync);
    return () => {
      window.removeEventListener('storage', handleStorageSync);
      window.removeEventListener('aksara_orders_updated', handleStorageSync);
    };
  }, [searchParams, activeOrder]);

  // Execute lookup logic strictly from unified central database
  const executeSearch = (rawQuery) => {
    const query = (rawQuery || searchInput || '').trim();
    if (!query) return;

    const storedMatch = findOrderByQuery(query);
    if (storedMatch) {
      setActiveOrder(storedMatch);
      setSearchStatus('found');
    } else {
      setActiveOrder(null);
      setSearchStatus('not_found');
    }
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

  // Calculate percentage of progress based on 5 stages
  const calculateProgress = (stageNumber) => {
    const safeStage = Math.max(1, Math.min(5, Number(stageNumber) || 1));
    return safeStage * 20;
  };

  return (
    <div className="order-tracker-page" style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '96px' }}>
      
      {/* Page Header */}
      <PageHeader
        breadcrumbs={[{ label: 'Lacak Status Proyek' }]}
        badge="Sistem Pemantauan Terbuka Aksara Tech"
        badgeIcon={Search}
        title="Pelacak Status Pengerjaan"
        highlightText="Proyek Mandiri"
        description="Pantau progres perancangan basis data, integrasi kode program, status pratinjau antarmuka, serta sisa kuota revisi proyek website Anda secara transparan."
      />

      <div className="container" style={{ maxWidth: '1080px', margin: '0 auto', marginInline: 'auto', padding: '0 24px', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Search Console Box */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid #CBD5E1',
          borderRadius: '12px',
          padding: '28px 24px',
          marginTop: '32px'
        }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '1.28rem', fontWeight: '900', color: '#0F172A', margin: 0 }}>
              Pencarian Status Tiket &amp; Nomor WhatsApp
            </h2>
            <button
              type="button"
              onClick={() => setShowGuide(!showGuide)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--prussian-blue)',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 0'
              }}
            >
              <HelpCircle size={15} />
              <span>{showGuide ? 'Tutup Panduan Tiket' : 'Di Mana Cari Nomor Tiket?'}</span>
              {showGuide ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          <p style={{ fontSize: '0.92rem', color: '#475569', margin: '0 0 18px 0', lineHeight: '1.6' }}>
            Masukkan ID Permintaan (<code style={{ background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px', color: '#0F172A', fontWeight: '700' }}>INQ-AT-...</code>), Nomor Order (<code style={{ background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px', color: '#0F172A', fontWeight: '700' }}>ORD-AT-...</code>), atau Nomor WhatsApp yang terdaftar pada lembar brief.
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
                  padding: '13px 16px 13px 44px',
                  fontSize: '0.96rem',
                  fontWeight: '600',
                  color: '#0F172A',
                  background: '#F8FAFC',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '6px',
                  outline: 'none',
                  transition: 'border-color 0.15s, background-color 0.15s'
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#0F172A'; e.currentTarget.style.background = '#FFFFFF'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.background = '#F8FAFC'; }}
              />
              <Search size={18} color="#64748B" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            <button
              type="submit"
              style={{
                background: 'var(--prussian-blue)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '13px 26px',
                fontSize: '0.94rem',
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

          {/* Collapsible Ticket Location Guide */}
          {showGuide && (
            <div style={{
              marginTop: '18px',
              background: '#F8FAFC',
              borderRadius: '8px',
              padding: '16px 18px',
              border: '1.5px solid #E2E8F0'
            }}>
              <div style={{ fontSize: '0.86rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
                Lokasi Menemukan Nomor Tiket Anda:
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.84rem', color: '#334155', lineHeight: '1.6' }}>
                <li>
                  <strong>Riwayat Chat WhatsApp:</strong> Nomor tertera di bagian atas format brief (<code style={{ color: '#0F172A', fontWeight: '700' }}>ID Tiket: INQ-AT-...</code>).
                </li>
                <li>
                  <strong>Halaman Konfirmasi Formulir:</strong> Kode tiket ditampilkan pada langkah ke-7 formulir <Link to="/pesan" style={{ color: 'var(--prussian-blue)', fontWeight: '700', textDecoration: 'underline' }}>/pesan</Link>.
                </li>
                <li>
                  <strong>Berkas Draf PDF Resmi:</strong> Nomor tercetak di pojok kanan atas kop dokumen Surat Penawaran (Quotation).
                </li>
                <li>
                  <strong>Gunakan Nomor WhatsApp:</strong> Jika lupa nomor tiket, cukup masukkan nomor WhatsApp aktif yang Anda isi saat pemesanan.
                </li>
              </ul>
            </div>
          )}

          {/* Quick Demo Selector Chips (Only when orders exist) */}
          {activeDbOrders.length > 0 && (
            <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1.5px solid #F1F5F9' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#64748B', marginBottom: '8px' }}>
                Uji Coba Cepat dengan Data Pesanan Database:
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {activeDbOrders.slice(0, 3).map((ord) => (
                  <button
                    key={ord.id}
                    type="button"
                    onClick={() => handleSelectDemo(ord.id)}
                    style={{
                      background: '#F8FAFC',
                      color: '#0F172A',
                      border: '1.5px solid #CBD5E1',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {ord.id} ({ord.statusType === 'FIX_ORDER' ? `Tahap ${ord.currentStageNumber} SOP` : 'Menunggu DP'})
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* IDLE STATE: When no search has been executed yet */}
        {searchStatus === 'idle' && !activeOrder && (
          <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid #CBD5E1',
              borderRadius: '12px',
              padding: '28px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.18rem', fontWeight: '900', color: '#0F172A', margin: '0 0 8px 0' }}>
                Transparansi Tahapan Rekayasa Software Aksara Tech
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', maxWidth: '640px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
                Setiap proyek website dikerjakan secara sistematis melalui 5 tahap SOP dengan catatan log pengembang terbuka, kuota revisi terjamin, dan garansi bug 7 hari kalender.
              </p>

              {/* 3 Pillars of Transparency */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', textAlign: 'left' }}>
                <div style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Layers size={18} style={{ color: 'var(--prussian-blue)' }} />
                    <strong style={{ fontSize: '0.9rem', color: '#0F172A' }}>5 Tahap Pengerjaan SOP</strong>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: '1.5' }}>
                    Alur pengerjaan berurutan mulai dari arsitektur skema database MySQL, koding modular, hingga serah terima master code (.zip).
                  </p>
                </div>

                <div style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <ShieldCheck size={18} style={{ color: 'var(--prussian-blue)' }} />
                    <strong style={{ fontSize: '0.9rem', color: '#0F172A' }}>Kuota Revisi Maksimal 3x</strong>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: '1.5' }}>
                    Setiap revisi dicatat tanggal dan ruang lingkupnya secara terstruktur agar jadwal peluncuran sistem tetap tepat waktu.
                  </p>
                </div>

                <div style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Clock size={18} style={{ color: 'var(--prussian-blue)' }} />
                    <strong style={{ fontSize: '0.9rem', color: '#0F172A' }}>Garansi Bebas Bug 7 Hari</strong>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: '1.5' }}>
                    Jaminan perbaikan bug dan error kode selama 7 hari kalender pasca master source code diserahkan kepada klien.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESULTS SECTION: When Found */}
        {searchStatus === 'found' && activeOrder && (
          <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Executive Project Dossier Summary Card */}
            <div style={{
              background: '#FFFFFF',
              border: '2px solid #0F172A',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              
              {/* Dossier Header Bar */}
              <div style={{
                background: '#0F172A',
                color: '#FFFFFF',
                padding: '14px 22px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Nomor Tiket Resmi:
                  </span>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1E293B', padding: '4px 10px', borderRadius: '4px', fontSize: '0.88rem', fontWeight: '800' }}>
                    <code style={{ color: '#F8FAFC' }}>{activeOrder.id}</code>
                    <button
                      type="button"
                      onClick={() => copyIdToClipboard(activeOrder.id)}
                      title="Salin nomor tiket"
                      style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, display: 'flex' }}
                    >
                      {copiedId ? <Check size={14} color="#34D399" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '0.76rem',
                    fontWeight: '800',
                    color: activeOrder.statusType === 'FIX_ORDER' ? '#34D399' : '#FBBF24',
                    background: '#1E293B',
                    padding: '4px 10px',
                    borderRadius: '4px'
                  }}>
                    {activeOrder.statusType === 'FIX_ORDER' ? '● FIX ORDER AKTIF' : '● INQUIRY BARU'}
                  </span>
                  <span style={{
                    fontSize: '0.76rem',
                    fontWeight: '800',
                    color: '#F8FAFC',
                    background: '#334155',
                    padding: '4px 10px',
                    borderRadius: '4px'
                  }}>
                    DP: {activeOrder.dpStatus}
                  </span>
                </div>
              </div>

              {/* Dossier Content Body */}
              <div style={{ padding: '24px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#0F172A', margin: '0 0 6px 0', lineHeight: '1.3' }}>
                      {activeOrder.projectTitle}
                    </h3>
                    <div style={{ fontSize: '0.88rem', color: '#475569' }}>
                      Paket: <strong style={{ color: '#0F172A' }}>{activeOrder.packageName}</strong> &bull; Kategori: <strong>{activeOrder.category}</strong> &bull; WhatsApp: <strong>{activeOrder.clientPhone}</strong>
                    </div>
                  </div>

                  {/* Progress Milestone Badge */}
                  <div style={{ textAlign: 'right', minWidth: '160px' }}>
                    <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase' }}>
                      Status Pengerjaan:
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--prussian-blue)', marginTop: '2px' }}>
                      Tahap {activeOrder.currentStageNumber} dari 5
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: '700' }}>
                      {calculateProgress(activeOrder.currentStageNumber)}% Selesai Sesuai SOP
                    </div>
                  </div>
                </div>

                {/* Progress Bar Track */}
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: '#E2E8F0',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginBottom: '22px'
                }}>
                  <div style={{
                    width: `${calculateProgress(activeOrder.currentStageNumber)}%`,
                    height: '100%',
                    background: 'var(--prussian-blue)',
                    borderRadius: '4px',
                    transition: 'width 0.4s ease'
                  }} />
                </div>

                {/* 4 Key Metrics Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px' }}>
                  <div style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', padding: '14px 16px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase' }}>Tanggal Pengajuan</div>
                    <div style={{ fontSize: '0.96rem', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>{activeOrder.orderDate}</div>
                    <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '2px' }}>Target: {activeOrder.estimatedCompletion}</div>
                  </div>

                  <div style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', padding: '14px 16px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase' }}>Total Investasi Resmi</div>
                    <div style={{ fontSize: '0.96rem', fontWeight: '900', color: 'var(--prussian-blue)', marginTop: '2px' }}>{formatRupiah(activeOrder.totalInvestment)}</div>
                    <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '2px' }}>Termin DP: {formatRupiah(activeOrder.dpAmount)}</div>
                  </div>

                  <div style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', padding: '14px 16px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase' }}>Kuota Revisi SOP</div>
                    <div style={{ fontSize: '0.96rem', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>
                      {activeOrder.revisionQuotaUsed} dari {activeOrder.revisionQuotaTotal} Sesi Terpakai
                    </div>
                    <div style={{ fontSize: '0.76rem', color: (activeOrder.revisionQuotaUsed || 0) >= 3 ? '#DC2626' : '#059669', fontWeight: '700', marginTop: '2px' }}>
                      {(activeOrder.revisionQuotaUsed || 0) >= 3 ? 'Kuota Revisi Penuh' : `Tersisa ${(activeOrder.revisionQuotaTotal || 3) - (activeOrder.revisionQuotaUsed || 0)} Sesi Perbaikan`}
                    </div>
                  </div>

                  <div style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', padding: '14px 16px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase' }}>Garansi &amp; Kepemilikan</div>
                    <div style={{ fontSize: '0.96rem', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>Garansi Bug 7 Hari</div>
                    <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '2px' }}>100% Master Code Milik Klien</div>
                  </div>
                </div>

              </div>

            </div>

            {/* Stepline 5-Stage SOP Milestone Pipeline */}
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid #CBD5E1',
              borderRadius: '12px',
              padding: '28px 24px'
            }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '22px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#0F172A', margin: '0 0 4px 0' }}>
                    Alur Tahapan Pengerjaan Sistem (SOP Aksara Tech)
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0 }}>
                    Tahapan pengerjaan software secara berurutan sesuai disiplin rekayasa enterprise.
                  </p>
                </div>
                <div style={{ fontSize: '0.84rem', fontWeight: '800', color: 'var(--prussian-blue)' }}>
                  Tahap Saat Ini: Tahap {activeOrder.currentStageNumber} dari 5
                </div>
              </div>

              {/* Milestone Pipeline Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                      {/* Step Indicator Marker & Line */}
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

                      {/* Step Details Box */}
                      <div
                        style={{
                          background: isCurrent ? '#F8FAFC' : '#FFFFFF',
                          border: isCurrent ? '2px solid var(--prussian-blue)' : '1.5px solid #CBD5E1',
                          borderRadius: '8px',
                          padding: '16px 18px',
                          marginBottom: stg.step < 5 ? '4px' : 0
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                          <div>
                            <span style={{ fontSize: '0.74rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', marginRight: '8px' }}>
                              Tahap {stg.step} &bull; {stg.badge}
                            </span>
                            <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: isPending ? '#64748B' : '#0F172A', margin: '2px 0 0 0' }}>
                              {stg.title}
                            </h4>
                          </div>

                          <span
                            style={{
                              fontSize: '0.74rem',
                              fontWeight: '800',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              background: isCompleted ? '#0F172A' : isCurrent ? '#EFF6FF' : '#F1F5F9',
                              color: isCompleted ? '#FFFFFF' : isCurrent ? 'var(--prussian-blue)' : '#64748B',
                              border: isCurrent ? '1.5px solid var(--prussian-blue)' : 'none'
                            }}
                          >
                            {isCompleted ? (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <Check size={11} strokeWidth={3} /> SELESAI
                              </span>
                            ) : isCurrent ? (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--prussian-blue)' }} /> SEDANG DIKERJAKAN
                              </span>
                            ) : (
                              'MENUNGGU GILIRAN'
                            )}
                          </span>
                        </div>

                        <p style={{ fontSize: '0.86rem', color: isPending ? '#94A3B8' : '#475569', margin: '0 0 8px 0', lineHeight: '1.5' }}>
                          {stg.description}
                        </p>

                        <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '700' }}>
                          Output Tahap: <span style={{ color: '#0F172A' }}>{stg.output}</span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* SOP Revision Governance Log & Quota Gauge */}
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid #CBD5E1',
              borderRadius: '12px',
              padding: '26px 22px'
            }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <History size={18} style={{ color: 'var(--prussian-blue)' }} />
                  <h4 style={{ fontSize: '1.12rem', fontWeight: '900', color: '#0F172A', margin: 0 }}>
                    Log Catatan Sesi Revisi SOP (Maksimal 3x Mutlak)
                  </h4>
                </div>

                <div style={{ fontSize: '0.84rem', fontWeight: '800', color: (activeOrder.revisionQuotaUsed || 0) >= 3 ? '#DC2626' : 'var(--prussian-blue)' }}>
                  {activeOrder.revisionQuotaUsed || 0} dari {activeOrder.revisionQuotaTotal || 3} Sesi Terpakai
                </div>
              </div>

              {/* Visual 3-Slot Quota Gauge */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                marginBottom: '18px'
              }}>
                {[1, 2, 3].map((slotNumber) => {
                  const isUsed = (activeOrder.revisionQuotaUsed || 0) >= slotNumber;
                  return (
                    <div
                      key={slotNumber}
                      style={{
                        background: isUsed ? '#F1F5F9' : '#FFFFFF',
                        border: isUsed ? '1.5px solid #0F172A' : '1.5px dashed #CBD5E1',
                        borderRadius: '6px',
                        padding: '10px 12px',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '0.74rem', fontWeight: '800', color: isUsed ? '#0F172A' : '#64748B', textTransform: 'uppercase' }}>
                        Sesi Revisi {slotNumber}
                      </div>
                      <div style={{ fontSize: '0.84rem', fontWeight: '800', color: isUsed ? '#DC2626' : '#059669', marginTop: '2px' }}>
                        {isUsed ? 'Terpakai' : 'Tersedia'}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Revision History Records */}
              {activeOrder.revisionHistory && activeOrder.revisionHistory.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {activeOrder.revisionHistory.map((rev) => (
                    <div 
                      key={rev.sessionNumber} 
                      style={{ 
                        background: '#F8FAFC', 
                        border: '1.5px solid #CBD5E1', 
                        borderRadius: '8px', 
                        padding: '14px 16px' 
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--prussian-blue)' }}>
                          Sesi Perbaikan ke-{rev.sessionNumber}
                        </span>
                        <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '700' }}>
                          Dicatat pada {rev.date}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.88rem', color: '#334155', margin: 0, lineHeight: '1.5' }}>
                        "{rev.note}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  background: '#F8FAFC',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '16px',
                  color: '#475569',
                  fontSize: '0.88rem',
                  lineHeight: '1.5'
                }}>
                  Belum ada sesi revisi yang diajukan untuk proyek ini. Kuota revisi Anda masih utuh <strong>{activeOrder.revisionQuotaTotal || 3} dari {activeOrder.revisionQuotaTotal || 3} sesi</strong>. Sesi revisi dibuka resmi saat pratinjau demo live ditayangkan (Tahap 4).
                </div>
              )}
            </div>

            {/* Developer Notes & Deliverables Vault (2 Columns) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
              
              {/* Developer Live Release Notes */}
              <div style={{
                background: '#FFFFFF',
                border: '1.5px solid #CBD5E1',
                borderRadius: '12px',
                padding: '22px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Code2 size={18} style={{ color: 'var(--prussian-blue)' }} />
                  <h4 style={{ fontSize: '1.02rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    Catatan Rilis Pengembang (Live Log)
                  </h4>
                </div>
                <div style={{
                  fontSize: '0.88rem',
                  color: '#334155',
                  lineHeight: '1.6',
                  background: '#F8FAFC',
                  padding: '14px',
                  borderRadius: '6px',
                  border: '1.5px solid #E2E8F0'
                }}>
                  "{activeOrder.developerNotes}"
                </div>
              </div>

              {/* Master Deliverables Vault */}
              <div style={{
                background: '#FFFFFF',
                border: '1.5px solid #CBD5E1',
                borderRadius: '12px',
                padding: '22px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <FolderArchive size={18} color="#0F172A" />
                  <h4 style={{ fontSize: '1.02rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    Deliverables Serah Terima Proyek
                  </h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeOrder.deliverablesPreview && activeOrder.deliverablesPreview.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#0F172A" style={{ flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Direct Official WhatsApp Coordination Action */}
            <div style={{
              background: '#0F172A',
              borderRadius: '12px',
              padding: '24px 26px',
              color: '#FFFFFF',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0 0 4px 0' }}>
                  Ada Pertanyaan atau Catatan Teknis untuk Pengembang?
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#94A3B8', margin: 0 }}>
                  Tim Aksara Tech siap merespons koordinasi pengerjaan Anda via saluran resmi WhatsApp korporat.
                </p>
              </div>

              <a
                href={`https://wa.me/6285600386692?text=${encodeURIComponent(`Halo Tim Aksara Tech, saya ingin menanyakan perkembangan proyek dengan ID Tiket: ${activeOrder.id} (${activeOrder.projectTitle}). Terima kasih!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#25D366',
                  color: '#FFFFFF',
                  padding: '11px 18px',
                  borderRadius: '6px',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <MessageCircle size={17} />
                <span>Hubungi PIC di WhatsApp</span>
              </a>
            </div>

          </div>
        )}

        {/* RESULTS SECTION: When Not Found */}
        {searchStatus === 'not_found' && (
          <div style={{
            marginTop: '28px',
            background: '#FFFFFF',
            border: '1.5px solid #CBD5E1',
            borderRadius: '12px',
            padding: '36px 24px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px auto'
            }}>
              <AlertCircle size={24} color="#0F172A" />
            </div>

            <h3 style={{ fontSize: '1.18rem', fontWeight: '900', color: '#0F172A', margin: '0 0 8px 0' }}>
              Nomor Tiket atau Nomor WhatsApp Tidak Ditemukan
            </h3>

            <p style={{ fontSize: '0.9rem', color: '#475569', maxWidth: '580px', margin: '0 auto 20px auto', lineHeight: '1.6' }}>
              Pastikan Anda mengetikkan format yang sesuai (contoh: <code style={{ fontWeight: '700', color: '#0F172A' }}>INQ-AT-20261109-8F2A</code>) atau gunakan nomor WhatsApp yang sama saat Anda mengisi form di halaman /pesan.
            </p>

            <div style={{ display: 'inline-flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {activeDbOrders.length > 0 && (
                <button
                  type="button"
                  onClick={() => handleSelectDemo(activeDbOrders[0].id)}
                  style={{
                    background: 'var(--prussian-blue)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px 16px',
                    fontWeight: '700',
                    fontSize: '0.86rem',
                    cursor: 'pointer'
                  }}
                >
                  Buka Contoh Proyek Aktif ({activeDbOrders[0].id})
                </button>
              )}

              <Link
                to="/pesan"
                style={{
                  background: '#F1F5F9',
                  color: '#0F172A',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '10px 16px',
                  fontWeight: '700',
                  fontSize: '0.86rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                Isi Brief Kebutuhan Baru
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
