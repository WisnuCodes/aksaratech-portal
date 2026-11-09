import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  Plus, 
  FileSpreadsheet, 
  CheckCircle2, 
  Clock, 
  Edit3, 
  Trash2, 
  LogOut, 
  Lock, 
  Eye, 
  ExternalLink, 
  Check, 
  RotateCcw, 
  MessageCircle, 
  AlertCircle,
  FileText,
  Save,
  HelpCircle,
  Copy,
  ChevronRight,
  Database,
  X
} from 'lucide-react';
import { 
  getAllOrders, 
  saveAllOrders, 
  updateOrder, 
  createOrder, 
  deleteOrder, 
  clearAllOrders,
  resetToDefaultOrders,
  exportOrdersToExcel,
  exportOrdersToCSV, 
  getSheetConfig, 
  saveSheetConfig 
} from '../utils/orderStorage';
import { PACKAGES } from '../data/catalogData';
import { formatRupiah, generateInquiryId } from '../utils/documentEngine';

// Default Admin Security PIN
const DEFAULT_ADMIN_PIN = '2026';

export default function AdminDashboardPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('aksara_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Orders State
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ALL'); // ALL, INQUIRY, FIX_ORDER, COMPLETED, SPREADSHEET
  const [editingOrder, setEditingOrder] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  // Google Sheet Webhook Config State
  const [sheetConfig, setSheetConfig] = useState(getSheetConfig());
  const [copiedScript, setCopiedScript] = useState(false);

  // Load orders from storage on mount & sync across tabs
  useEffect(() => {
    if (isAuthenticated) {
      setOrders(getAllOrders());
    }

    const handleSync = () => {
      setOrders(getAllOrders());
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('aksara_orders_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('aksara_orders_updated', handleSync);
    };
  }, [isAuthenticated]);

  // Auth Handler
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem('aksara_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('PIN Akses Salah. Silakan coba kembali.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('aksara_admin_auth');
    setPinInput('');
  };

  // Show temporary success notification
  const triggerSuccess = (msg) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(''), 3500);
  };

  // 1-Click Convert Inquiry to Confirmed Fix Order
  const handleVerifyDP = (order) => {
    const nextOrderNumber = `ORD-AT-2026-${String(Math.floor(Math.random() * 900) + 100)}`;
    const updated = {
      ...order,
      statusType: 'FIX_ORDER',
      orderNumber: nextOrderNumber,
      dpStatus: 'LUNAS (DP 50%)',
      currentStageNumber: order.currentStageNumber === 1 ? 2 : order.currentStageNumber,
      developerNotes: `Pembayaran uang muka DP 50% telah diverifikasi secara resmi. Nomor order ${nextOrderNumber} diterbitkan. Perancangan basis data dan koding arsitektur sistem resmi dimulai.`
    };

    updateOrder(updated);
    setOrders(getAllOrders());
    triggerSuccess(`Inquiry ${order.id} berhasil diverifikasi menjadi Fix Order (${nextOrderNumber})!`);
  };

  // Increment Revision Quota Handler
  const handleIncrementRevision = (order) => {
    if (order.revisionQuotaUsed >= order.revisionQuotaTotal) {
      alert(`Kuota revisi standar maksimal (${order.revisionQuotaTotal}x) telah habis. Revisi tambahan wajib dikenakan add-on pemeliharaan.`);
      return;
    }

    const updated = {
      ...order,
      revisionQuotaUsed: order.revisionQuotaUsed + 1,
      developerNotes: `Sesi revisi ke-${order.revisionQuotaUsed + 1} sedang diproses oleh pengembang.`
    };

    updateOrder(updated);
    setOrders(getAllOrders());
    triggerSuccess(`Sesi revisi ke-${updated.revisionQuotaUsed} berhasil dicatat untuk ${order.clientName}.`);
  };

  // Update Stage Number Handler
  const handleStageChange = (order, newStage) => {
    const updated = {
      ...order,
      currentStageNumber: Number(newStage),
      dpStatus: Number(newStage) === 5 ? 'LUNAS 100% (SELESAI)' : order.dpStatus
    };
    updateOrder(updated);
    setOrders(getAllOrders());
    triggerSuccess(`Tahap SOP pesanan ${order.id} diperbarui ke Tahap ${newStage}.`);
  };

  // Delete Order Handler
  const handleDeleteOrder = (order) => {
    if (window.confirm(`Hapus catatan pesanan ${order.id} (${order.clientName})? Data akan dihapus secara permanen dari sistem dan pelacak.`)) {
      deleteOrder(order.id);
      setOrders(getAllOrders());
      triggerSuccess(`Pesanan ${order.id} berhasil dihapus permanen.`);
    }
  };

  // Clear All Orders Handler
  const handleClearAllOrders = () => {
    if (window.confirm('PERINGATAN: Apakah Anda yakin ingin MENGHAPUS SEMUA DATA PESANAN secara permanen?\n\nSemua data inquiry, pesanan fix, dan draf brief lokal di browser akan dibersihkan total. Tampilan pelacak (/lacak) akan bersih dan kosong.')) {
      clearAllOrders();
      setOrders([]);
      triggerSuccess('Seluruh database pesanan dan draf brief lokal berhasil dikosongkan.');
    }
  };

  // Reset Demo Orders Handler
  const handleResetDemoOrders = () => {
    if (window.confirm('Muat ulang 4 data contoh pesanan awal untuk pengujian sistem?')) {
      const restored = resetToDefaultOrders();
      setOrders(restored);
      triggerSuccess('Data contoh awal berhasil dimuat kembali ke sistem.');
    }
  };

  // Save Edit Order Form
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingOrder) return;

    updateOrder(editingOrder);
    setOrders(getAllOrders());
    setEditingOrder(null);
    triggerSuccess(`Perubahan pesanan ${editingOrder.id} berhasil disimpan.`);
  };

  // Save New Manual Order Form
  const handleCreateNewOrder = (e) => {
    e.preventDefault();
    const form = e.target;
    const selectedPkg = PACKAGES.find(p => p.id === form.packageId.value) || PACKAGES[1];

    const newOrder = {
      id: generateInquiryId(),
      orderNumber: form.statusType.value === 'FIX_ORDER' ? `ORD-AT-2026-${String(Math.floor(Math.random() * 900) + 100)}` : 'MENUNGGU-DP',
      statusType: form.statusType.value,
      clientName: form.clientName.value.trim(),
      clientPhone: form.clientPhone.value.trim(),
      clientEmail: form.clientEmail.value.trim(),
      projectTitle: form.projectTitle.value.trim(),
      category: form.category.value,
      packageId: selectedPkg.id,
      packageName: selectedPkg.name,
      packagePrice: selectedPkg.minPrice,
      addons: [],
      totalInvestment: Number(form.totalInvestment.value) || selectedPkg.minPrice,
      dpAmount: Math.round((Number(form.totalInvestment.value) || selectedPkg.minPrice) / 2),
      dpStatus: form.statusType.value === 'FIX_ORDER' ? 'LUNAS (DP 50%)' : 'MENUNGGU TRANSFER DP 50%',
      orderDate: new Date().toLocaleDateString('id-ID', { dateStyle: 'long' }),
      estimatedCompletion: form.estimatedCompletion.value || '7 Hari Kerja',
      currentStageNumber: form.statusType.value === 'FIX_ORDER' ? 2 : 1,
      revisionQuotaTotal: 3,
      revisionQuotaUsed: 0,
      developerNotes: form.developerNotes.value.trim() || 'Pesanan manual dimasukkan oleh tim admin Aksara Tech.',
      deliverablesPreview: selectedPkg.deliverables || ['Master Source Code (.zip)', 'Database Relasional (.sql)']
    };

    createOrder(newOrder);
    setOrders(getAllOrders());
    setIsCreatingNew(false);
    triggerSuccess(`Pesanan baru ${newOrder.id} (${newOrder.clientName}) berhasil ditambahkan!`);
  };

  // Save Sheet Config Handler
  const handleSaveSheetConfig = (e) => {
    e.preventDefault();
    saveSheetConfig(sheetConfig);
    triggerSuccess('Konfigurasi Webhook Google Spreadsheet berhasil disimpan.');
  };

  // Metrics calculation
  const metrics = useMemo(() => {
    const total = orders.length;
    const inquiries = orders.filter(o => o.statusType === 'INQUIRY').length;
    const activeFix = orders.filter(o => o.statusType === 'FIX_ORDER' && o.currentStageNumber < 5).length;
    const completed = orders.filter(o => o.currentStageNumber === 5).length;
    return { total, inquiries, activeFix, completed };
  }, [orders]);

  // Filtered orders list
  const filteredOrders = useMemo(() => {
    let result = orders;

    if (activeTab === 'INQUIRY') {
      result = result.filter(o => o.statusType === 'INQUIRY');
    } else if (activeTab === 'FIX_ORDER') {
      result = result.filter(o => o.statusType === 'FIX_ORDER' && o.currentStageNumber < 5);
    } else if (activeTab === 'COMPLETED') {
      result = result.filter(o => o.currentStageNumber === 5);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(o => 
        (o.id || '').toLowerCase().includes(q) ||
        (o.orderNumber || '').toLowerCase().includes(q) ||
        (o.clientName || '').toLowerCase().includes(q) ||
        (o.clientPhone || '').includes(q) ||
        (o.projectTitle || '').toLowerCase().includes(q)
      );
    }

    return result;
  }, [orders, activeTab, searchQuery]);

  // Google Apps Script template code
  const googleAppsScriptCode = `// KODE GOOGLE APPS SCRIPT AKSARA TECH
// Tempelkan di Google Spreadsheet: Menu Extensions > Apps Script
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.id,
    data.orderNumber,
    data.statusType,
    data.clientName,
    data.clientPhone,
    data.projectTitle,
    data.packageName,
    data.totalInvestment,
    data.dpStatus,
    data.currentStageNumber,
    new Date()
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({"result": "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}`;

  // ─────────────────────────────────────────────────────────────
  // RENDER PIN LOGIN GATE (IF NOT AUTHENTICATED)
  // ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '16px', maxWidth: '440px', width: '100%', padding: '36px 32px', textAlign: 'center' }}>
          
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#F1F5F9', border: '1.5px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <Lock size={24} color="#0F172A" />
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)', fontWeight: '900', color: '#0F172A', margin: '0 0 10px 0', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
            Panel Admin Aksara Tech
          </h1>
          <p style={{ fontSize: '1rem', color: '#334155', margin: '0 0 28px 0', lineHeight: '1.6' }}>
            Masukkan PIN Keamanan internal untuk mengelola draf inquiry, verifikasi pembayaran DP, dan tahapan koding klien.
          </p>

          <form onSubmit={handlePinSubmit}>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0F172A', display: 'block', marginBottom: '8px' }}>
                PIN Keamanan Admin:
              </label>
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan 4 digit PIN..."
                autoFocus
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '14px 16px',
                  fontSize: '1.2rem',
                  fontWeight: '800',
                  textAlign: 'center',
                  letterSpacing: '0.25em',
                  background: '#F8FAFC',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '8px',
                  outline: 'none'
                }}
              />
              {pinError && (
                <div style={{ fontSize: '0.84rem', color: '#DC2626', fontWeight: '800', marginTop: '6px' }}>
                  {pinError}
                </div>
              )}
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                background: 'var(--prussian-blue)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '14px',
                fontSize: '1rem',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              Masuk Dashboard Admin
            </button>
          </form>

          <div style={{ marginTop: '24px', background: '#F8FAFC', padding: '10px 14px', borderRadius: '6px', fontSize: '0.84rem', color: '#475569' }}>
            <span>PIN Standar Pengembang: </span>
            <code style={{ background: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', fontWeight: '900', color: '#0F172A', border: '1px solid #CBD5E1' }}>2026</code>
          </div>

        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER AUTHENTICATED ADMIN DASHBOARD
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="admin-page" style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '96px' }}>
      
      {/* Top Banner Bar */}
      <div style={{ background: '#0F172A', color: '#FFFFFF', padding: '16px 0', borderBottom: '1px solid #334155' }}>
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22C55E' }} />
            <div>
              <span style={{ fontSize: '1.05rem', fontWeight: '900', letterSpacing: '-0.01em' }}>AKSARA TECH &bull; Admin Workspace</span>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', marginLeft: '10px' }}>Mode Internal Terotentikasi</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <Link
              to="/lacak"
              target="_blank"
              style={{
                background: '#334155',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: '0.84rem',
                fontWeight: '700',
                padding: '7px 14px',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Eye size={15} />
              <span>Buka Tampilan Klien (/lacak)</span>
            </Link>

            <button
              type="button"
              onClick={exportOrdersToExcel}
              style={{
                background: '#16A34A',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '0.84rem',
                fontWeight: '800',
                padding: '7px 14px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Unduh format spreadsheet rapi dengan kolom terpisah, warna header, dan penataan nomor telepon"
            >
              <FileSpreadsheet size={15} />
              <span>Ekspor Excel Spreadsheet (.xls)</span>
            </button>

            <button
              type="button"
              onClick={exportOrdersToCSV}
              style={{
                background: '#1E293B',
                color: '#FFFFFF',
                border: '1px solid #475569',
                fontSize: '0.84rem',
                fontWeight: '700',
                padding: '7px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Unduh format CSV standar dengan pemisah titik koma (sep=;)"
            >
              <span>CSV (.csv)</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                background: '#475569',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '0.84rem',
                fontWeight: '700',
                padding: '7px 14px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <LogOut size={15} />
              <span>Keluar</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Container */}
      <div className="container" style={{ maxWidth: '1240px', margin: '36px auto 0 auto', padding: '0 24px', boxSizing: 'border-box' }}>
        
        {/* Success Alert Banner */}
        {actionSuccessMsg && (
          <div style={{ background: '#F0FDF4', border: '1.5px solid #22C55E', color: '#166534', padding: '12px 18px', borderRadius: '8px', marginBottom: '24px', fontWeight: '700', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} color="#16A34A" />
            <span>{actionSuccessMsg}</span>
          </div>
        )}

        {/* Dashboard Title & Quick Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.02em', margin: '0 0 6px 0', lineHeight: '1.2' }}>
              Pusat Kendali Pesanan &amp; Tahapan Koding
            </h1>
            <p style={{ fontSize: '0.98rem', color: '#475569', margin: 0, maxWidth: '780px', lineHeight: '1.5' }}>
              Verifikasi bukti transfer DP 50%, ubah draf inquiry menjadi pesanan fix, perbarui tahapan koding SOP, dan catat sisa kuota revisi.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleClearAllOrders}
              style={{
                background: '#FEE2E2',
                color: '#DC2626',
                border: '1px solid #FECACA',
                borderRadius: '8px',
                padding: '11px 16px',
                fontSize: '0.86rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Hapus seluruh data pesanan dari sistem dan kosongkan pelacak"
            >
              <Trash2 size={16} />
              <span>Kosongkan Semua Data</span>
            </button>

            <button
              type="button"
              onClick={handleResetDemoOrders}
              style={{
                background: '#F1F5F9',
                color: '#0F172A',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                padding: '11px 16px',
                fontSize: '0.86rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Muat ulang 4 data contoh awal untuk pengujian"
            >
              <RotateCcw size={16} />
              <span>Muat Ulang Contoh</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCreatingNew(true)}
              style={{
                background: 'var(--prussian-blue)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '11px 18px',
                fontSize: '0.88rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Plus size={18} />
              <span>Tambah Pesanan Manual</span>
            </button>
          </div>
        </div>

        {/* 4 Overview Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          
          <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '0.84rem', color: '#64748B', fontWeight: '700' }}>Total Seluruh Pesanan</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0F172A', marginTop: '4px' }}>{metrics.total}</div>
            <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '4px' }}>Tersimpan di database &amp; storage</div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1.5px solid #F59E0B', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '0.84rem', color: '#B45309', fontWeight: '700' }}>Inquiry Baru (Menunggu DP)</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#D97706', marginTop: '4px' }}>{metrics.inquiries}</div>
            <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '4px' }}>Calon klien konsultasi / belum bayar</div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1.5px solid var(--prussian-blue)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '0.84rem', color: 'var(--prussian-blue)', fontWeight: '700' }}>Fix Order Aktif (Sedang Dikoding)</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0F172A', marginTop: '4px' }}>{metrics.activeFix}</div>
            <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '4px' }}>DP 50% Lunas &amp; masuk antrean kerja</div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '0.84rem', color: '#16A34A', fontWeight: '700' }}>Selesai &amp; Lunas 100%</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#16A34A', marginTop: '4px' }}>{metrics.completed}</div>
            <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '4px' }}>Master Code diserahkan &amp; garansi jalan</div>
          </div>

        </div>

        {/* Navigation Tabs & Search Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
          
          {/* Filter Tabs */}
          <div style={{ display: 'inline-flex', background: '#E2E8F0', padding: '3px', borderRadius: '8px', gap: '3px', flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: `Semua (${metrics.total})` },
              { id: 'INQUIRY', label: `Inquiry / Tanya (${metrics.inquiries})` },
              { id: 'FIX_ORDER', label: `Fix Order Aktif (${metrics.activeFix})` },
              { id: 'COMPLETED', label: `Selesai (${metrics.completed})` },
              { id: 'SPREADSHEET', label: 'Sinkronisasi Spreadsheet' }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: isActive ? '#FFFFFF' : 'transparent',
                    color: isActive ? '#0F172A' : '#334155',
                    fontWeight: isActive ? '800' : '600',
                    fontSize: '0.86rem',
                    padding: '8px 14px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background 0.15s, color 0.15s'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          {activeTab !== 'SPREADSHEET' && (
            <div style={{ position: 'relative', width: '280px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari ID, klien, atau WA..."
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 12px 9px 34px',
                  fontSize: '0.88rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  outline: 'none'
                }}
              />
              <Search size={16} color="#64748B" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          )}

        </div>

        {/* ─────────────────────────────────────────────────────────────
            TAB CONTENT: SPREADSHEET INTEGRATION SETTINGS
            ───────────────────────────────────────────────────────────── */}
        {activeTab === 'SPREADSHEET' && (
          <div style={{ background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '12px', padding: '32px 28px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <FileSpreadsheet size={24} color="#16A34A" />
              <h2 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0F172A', margin: 0 }}>
                Koneksi Google Spreadsheet &amp; Ekspor Data
              </h2>
            </div>
            <p style={{ fontSize: '0.94rem', color: '#475569', margin: '0 0 24px 0', lineHeight: '1.5' }}>
              Hubungkan portal Aksara Tech dengan Google Spreadsheet Anda untuk pencatatan otomatis tanpa memerlukan biaya sewa server basis data bulanan.
            </p>

            <form onSubmit={handleSaveSheetConfig} style={{ marginBottom: '32px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.86rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                  Google Apps Script Webhook URL (Opsional):
                </label>
                <input
                  type="url"
                  value={sheetConfig.webhookUrl}
                  onChange={(e) => setSheetConfig({ ...sheetConfig, webhookUrl: e.target.value })}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '12px 14px',
                    fontSize: '0.92rem',
                    borderRadius: '6px',
                    border: '1.5px solid #CBD5E1',
                    background: '#F8FAFC',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  style={{
                    background: 'var(--prussian-blue)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px 18px',
                    fontSize: '0.88rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Save size={16} />
                  <span>Simpan Pengaturan Webhook</span>
                </button>

                <button
                  type="button"
                  onClick={exportOrdersToExcel}
                  style={{
                    background: '#16A34A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px 18px',
                    fontSize: '0.88rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  title="Unduh format spreadsheet rapi dengan kolom terpisah, warna header, dan penataan nomor telepon"
                >
                  <FileSpreadsheet size={16} />
                  <span>Unduh Excel Spreadsheet (.xls) Rapi</span>
                </button>

                <button
                  type="button"
                  onClick={exportOrdersToCSV}
                  style={{
                    background: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px 16px',
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  title="Unduh format CSV standar dengan pemisah titik koma (sep=;)"
                >
                  <span>Unduh CSV (.csv)</span>
                </button>
              </div>
            </form>

            {/* Step-by-step Guide */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '20px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A', margin: '0 0 12px 0' }}>
                Panduan Menghubungkan Google Sheet dalam 2 Menit:
              </h3>
              <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', color: '#334155', lineHeight: '1.7' }}>
                <li>Buka <strong>Google Sheets</strong> baru, beri nama (misal: <em>Aksara Tech Orders Database</em>).</li>
                <li>Klik menu <strong>Extensions &gt; Apps Script</strong>.</li>
                <li>Hapus kode bawaan, lalu salin dan tempelkan skrip di bawah ini:</li>
              </ol>

              <div style={{ position: 'relative', marginTop: '12px', marginBottom: '14px' }}>
                <pre style={{ background: '#0F172A', color: '#F8FAFC', padding: '16px', borderRadius: '8px', fontSize: '0.82rem', overflowX: 'auto', margin: 0 }}>
                  {googleAppsScriptCode}
                </pre>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(googleAppsScriptCode);
                    setCopiedScript(true);
                    setTimeout(() => setCopiedScript(false), 2000);
                  }}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '12px',
                    background: '#334155',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 10px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copiedScript ? <Check size={14} color="#22C55E" /> : <Copy size={14} />}
                  <span>{copiedScript ? 'Tersalin!' : 'Salin Skrip'}</span>
                </button>
              </div>

              <ol start={4} style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', color: '#334155', lineHeight: '1.7' }}>
                <li>Klik tombol <strong>Deploy &gt; New deployment</strong> &gt; Pilih tipe <em>Web app</em>.</li>
                <li>Atur <em>Who has access</em> ke <strong>Anyone</strong>, lalu klik <strong>Deploy</strong>.</li>
                <li>Salin <em>Web app URL</em> yang muncul dan tempelkan ke kolom URL Webhook di atas. Selesai!</li>
              </ol>
            </div>

          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB CONTENT: ORDERS LIST TABLE
            ───────────────────────────────────────────────────────────── */}
        {activeTab !== 'SPREADSHEET' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {filteredOrders.length === 0 ? (
              <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '12px', padding: '48px 24px', textAlign: 'center' }}>
                <AlertCircle size={32} color="#64748B" style={{ margin: '0 auto 12px auto' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', margin: '0 0 6px 0' }}>
                  {orders.length === 0 ? 'Seluruh Database Pesanan Sedang Kosong' : 'Tidak Ada Pesanan pada Kategori Ini'}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748B', margin: orders.length === 0 ? '0 0 18px 0' : 0 }}>
                  {orders.length === 0 
                    ? 'Semua pesanan telah dihapus. Halaman pelacak (/lacak) saat ini bersih dan tidak menampilkan order apa pun. Anda dapat menambah pesanan baru atau memuat ulang data contoh.'
                    : 'Gunakan tombol "Tambah Pesanan Manual" di kanan atas jika ada pesanan langsung dari WhatsApp.'}
                </p>
                {orders.length === 0 && (
                  <button
                    type="button"
                    onClick={handleResetDemoOrders}
                    style={{
                      background: '#F1F5F9',
                      color: '#0F172A',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      fontSize: '0.84rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <RotateCcw size={15} />
                    <span>Muat Ulang 4 Contoh Data Awal</span>
                  </button>
                )}
              </div>
            ) : (
              filteredOrders.map(ord => {
                const isInquiry = ord.statusType === 'INQUIRY';
                const isCompleted = ord.currentStageNumber === 5;

                return (
                  <div
                    key={ord.id}
                    style={{
                      background: '#FFFFFF',
                      border: isInquiry ? '1.5px solid #F59E0B' : isCompleted ? '1px solid #CBD5E1' : '1.5px solid var(--prussian-blue)',
                      borderRadius: '12px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      transition: 'border-color 0.15s'
                    }}
                  >
                    {/* Header Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span
                            style={{
                              fontSize: '0.78rem',
                              fontWeight: '900',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              background: isInquiry ? '#FEF3C7' : isCompleted ? '#F0FDF4' : '#EFF6FF',
                              color: isInquiry ? '#B45309' : isCompleted ? '#16A34A' : 'var(--prussian-blue)'
                            }}
                          >
                            {isInquiry ? 'INQUIRY (DRAF TANYA / BELUM DP)' : isCompleted ? 'PROYEK SELESAI & LUNAS' : 'FIX ORDER AKTIF (DP LUNAS)'}
                          </span>
                          <span style={{ fontSize: '0.84rem', fontWeight: '800', color: '#0F172A' }}>
                            {ord.id} {ord.orderNumber && ord.orderNumber !== 'MENUNGGU-DP' && `(${ord.orderNumber})`}
                          </span>
                        </div>

                        <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0F172A', margin: '0 0 4px 0' }}>
                          {ord.projectTitle}
                        </h3>

                        <div style={{ fontSize: '0.88rem', color: '#475569' }}>
                          Klien: <strong>{ord.clientName}</strong> &bull; WA: <strong>{ord.clientPhone}</strong> &bull; Paket: <strong>{ord.packageName}</strong>
                        </div>
                      </div>

                      {/* Right Quick Actions */}
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {isInquiry && (
                          <button
                            type="button"
                            onClick={() => handleVerifyDP(ord)}
                            style={{
                              background: '#16A34A',
                              color: '#FFFFFF',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '8px 14px',
                              fontSize: '0.84rem',
                              fontWeight: '800',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <CheckCircle2 size={16} />
                            <span>Verifikasi DP &amp; Jadikan Fix Order</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setEditingOrder(ord)}
                          style={{
                            background: '#F1F5F9',
                            color: '#0F172A',
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            padding: '8px 12px',
                            fontSize: '0.84rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          <Edit3 size={15} />
                          <span>Edit</span>
                        </button>

                        <Link
                          to={`/lacak?kode=${ord.id}`}
                          target="_blank"
                          style={{
                            background: '#F1F5F9',
                            color: '#0F172A',
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            padding: '8px 12px',
                            fontSize: '0.84rem',
                            fontWeight: '700',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          <ExternalLink size={15} />
                          <span>Lihat Pelacak</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDeleteOrder(ord)}
                          title="Hapus / Arsipkan"
                          style={{
                            background: '#FEE2E2',
                            color: '#DC2626',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px 10px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center'
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    {/* Operational Parameter Controls Row */}
                    <div style={{ background: '#F8FAFC', borderRadius: '8px', padding: '14px 18px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'center' }}>
                      
                      {/* Financial info */}
                      <div>
                        <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '700' }}>Investasi Total:</div>
                        <div style={{ fontSize: '1.05rem', fontWeight: '900', color: 'var(--prussian-blue)' }}>
                          {formatRupiah(ord.totalInvestment)}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: ord.dpStatus.includes('LUNAS') ? '#16A34A' : '#D97706', fontWeight: '700' }}>
                          {ord.dpStatus}
                        </div>
                      </div>

                      {/* Stage SOP Dropdown */}
                      <div>
                        <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '700', marginBottom: '4px' }}>Tahap SOP Terkini:</div>
                        <select
                          value={ord.currentStageNumber}
                          onChange={(e) => handleStageChange(ord, e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            background: '#FFFFFF',
                            fontSize: '0.86rem',
                            fontWeight: '700',
                            color: '#0F172A',
                            cursor: 'pointer'
                          }}
                        >
                          <option value={1}>Tahap 1: Verifikasi Brief &amp; DP 50%</option>
                          <option value={2}>Tahap 2: Setup Database &amp; Skema MySQL</option>
                          <option value={3}>Tahap 3: Koding Fitur &amp; Antarmuka</option>
                          <option value={4}>Tahap 4: Pratinjau Siap &amp; Sesi Revisi</option>
                          <option value={5}>Tahap 5: Selesai &amp; Serah Terima .zip</option>
                        </select>
                      </div>

                      {/* Revision Quota Tracker */}
                      <div>
                        <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '700', marginBottom: '4px' }}>
                          Kuota Revisi SOP (Maks 3x):
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.94rem', fontWeight: '800', color: ord.revisionQuotaUsed >= 3 ? '#DC2626' : '#0F172A' }}>
                            {ord.revisionQuotaUsed} / {ord.revisionQuotaTotal} Terpakai
                          </span>
                          <button
                            type="button"
                            onClick={() => handleIncrementRevision(ord)}
                            disabled={ord.revisionQuotaUsed >= 3}
                            style={{
                              background: '#FFFFFF',
                              border: '1px solid #CBD5E1',
                              borderRadius: '4px',
                              padding: '4px 8px',
                              fontSize: '0.78rem',
                              fontWeight: '700',
                              cursor: ord.revisionQuotaUsed >= 3 ? 'not-allowed' : 'pointer',
                              color: '#0F172A'
                            }}
                          >
                            + Catat Revisi
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Developer Log Snippet */}
                    <div style={{ fontSize: '0.86rem', color: '#334155', lineHeight: '1.5' }}>
                      <span style={{ fontWeight: '700', color: '#0F172A' }}>Catatan Pengembang untuk Klien: </span>
                      <span>"{ord.developerNotes}"</span>
                    </div>

                  </div>
                );
              })
            )}

          </div>
        )}

      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: EDIT ORDER DETAILS
          ───────────────────────────────────────────────────────────── */}
      {editingOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '14px', maxWidth: '640px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '32px 28px', boxSizing: 'border-box' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #F1F5F9', paddingBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0F172A', margin: 0 }}>
                  Edit Rincian Pesanan
                </h3>
                <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  ID: {editingOrder.id}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748B', display: 'flex', padding: 0 }}
                aria-label="Tutup"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Nama Klien:</label>
                  <input
                    type="text"
                    required
                    value={editingOrder.clientName}
                    onChange={(e) => setEditingOrder({ ...editingOrder, clientName: e.target.value })}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Nomor WhatsApp:</label>
                  <input
                    type="text"
                    required
                    value={editingOrder.clientPhone}
                    onChange={(e) => setEditingOrder({ ...editingOrder, clientPhone: e.target.value })}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Judul Proyek:</label>
                <input
                  type="text"
                  required
                  value={editingOrder.projectTitle}
                  onChange={(e) => setEditingOrder({ ...editingOrder, projectTitle: e.target.value })}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Status Order:</label>
                  <select
                    value={editingOrder.statusType}
                    onChange={(e) => setEditingOrder({ ...editingOrder, statusType: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF' }}
                  >
                    <option value="INQUIRY">INQUIRY (Draf Tanya / Belum DP)</option>
                    <option value="FIX_ORDER">FIX ORDER (DP Lunas &amp; Dikerjakan)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Nomor Order Resmi:</label>
                  <input
                    type="text"
                    value={editingOrder.orderNumber || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, orderNumber: e.target.value })}
                    placeholder="Contoh: ORD-AT-2026-0042"
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Total Biaya Investasi (Rp):</label>
                  <input
                    type="number"
                    value={editingOrder.totalInvestment}
                    onChange={(e) => setEditingOrder({ ...editingOrder, totalInvestment: Number(e.target.value) })}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Status Pembayaran DP:</label>
                  <select
                    value={editingOrder.dpStatus}
                    onChange={(e) => setEditingOrder({ ...editingOrder, dpStatus: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF' }}
                  >
                    <option value="MENUNGGU TRANSFER DP 50%">MENUNGGU TRANSFER DP 50%</option>
                    <option value="LUNAS (DP 50%)">LUNAS (DP 50%)</option>
                    <option value="LUNAS 100% (SELESAI)">LUNAS 100% (SELESAI)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Catatan Pengembang untuk Klien (Live Log):</label>
                <textarea
                  rows={3}
                  value={editingOrder.developerNotes || ''}
                  onChange={(e) => setEditingOrder({ ...editingOrder, developerNotes: e.target.value })}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '10px 18px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{ background: 'var(--prussian-blue)', color: '#FFFFFF', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: '800', cursor: 'pointer' }}
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: CREATE NEW MANUAL ORDER
          ───────────────────────────────────────────────────────────── */}
      {isCreatingNew && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '14px', maxWidth: '640px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '32px 28px', boxSizing: 'border-box' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #F1F5F9', paddingBottom: '14px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0F172A', margin: 0 }}>
                Tambah Pesanan Baru Manual
              </h3>
              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748B', display: 'flex', padding: 0 }}
                aria-label="Tutup"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateNewOrder}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Nama Klien:</label>
                  <input
                    type="text"
                    name="clientName"
                    required
                    placeholder="Contoh: Maya Anggraini"
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Nomor WhatsApp:</label>
                  <input
                    type="text"
                    name="clientPhone"
                    required
                    placeholder="Contoh: 081234567890"
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Email (Opsional):</label>
                  <input
                    type="email"
                    name="clientEmail"
                    placeholder="klien@email.com"
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Status Awal:</label>
                  <select
                    name="statusType"
                    defaultValue="FIX_ORDER"
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF' }}
                  >
                    <option value="FIX_ORDER">FIX ORDER (DP 50% Sudah Diterima)</option>
                    <option value="INQUIRY">INQUIRY (Hanya Nanya / Belum DP)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Judul / Kebutuhan Proyek:</label>
                <input
                  type="text"
                  name="projectTitle"
                  required
                  placeholder="Contoh: Website Profil Klinik Gigi & Form Reservasi"
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Paket Layanan:</label>
                  <select
                    name="packageId"
                    defaultValue="umkm-katalog"
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF' }}
                  >
                    {PACKAGES.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({formatRupiah(p.minPrice)})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Kategori Proyek:</label>
                  <select
                    name="category"
                    defaultValue="UMKM & Bisnis"
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF' }}
                  >
                    <option value="UMKM & Bisnis">UMKM &amp; Bisnis</option>
                    <option value="Standard Enterprise">Company Profile Korporat</option>
                    <option value="Mahasiswa & Akademisi">Tugas Kuliah / Skripsi</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Total Biaya Disepakati (Rp):</label>
                  <input
                    type="number"
                    name="totalInvestment"
                    defaultValue={300000}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Target Tanggal Selesai:</label>
                  <input
                    type="text"
                    name="estimatedCompletion"
                    placeholder="Contoh: 18 November 2026"
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Catatan Pengembang Awal:</label>
                <textarea
                  name="developerNotes"
                  rows={2}
                  defaultValue="Pesanan resmi terdaftar. Menyiapkan repositori kode sumber dan skema basis data."
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '10px 18px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{ background: 'var(--prussian-blue)', color: '#FFFFFF', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: '800', cursor: 'pointer' }}
                >
                  Tambahkan ke Sistem
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
