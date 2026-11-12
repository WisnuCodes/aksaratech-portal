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
  FolderPlus,
  User,
  Calendar,
  Layers,
  X,
  History,
  Phone,
  KeyRound
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
  saveSheetConfig,
  syncOrderToSheet,
  syncAllOrdersToSheet 
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
  const [newOrderForm, setNewOrderForm] = useState({
    packageId: 'umkm-katalog',
    totalInvestment: 300000,
    category: 'UMKM & Bisnis',
    statusType: 'FIX_ORDER'
  });
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  // Revision Note Modal State
  const [revisionModalOrder, setRevisionModalOrder] = useState(null);
  const [revisionNoteInput, setRevisionNoteInput] = useState('');
  const [revisionNoteError, setRevisionNoteError] = useState('');

  // Google Sheet Webhook Config State
  const [sheetConfig, setSheetConfig] = useState(getSheetConfig());
  const [copiedScript, setCopiedScript] = useState(false);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [testResult, setTestResult] = useState('');

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

  // Revision Quota & Notes Handlers
  const handleOpenRevisionModal = (order) => {
    if ((order.revisionQuotaUsed || 0) >= (order.revisionQuotaTotal || 3)) {
      alert(`Kuota revisi standar maksimal (${order.revisionQuotaTotal || 3}x) untuk pesanan ${order.id} telah habis. Silakan tawarkan paket add-on pemeliharaan untuk revisi tambahan.`);
      return;
    }
    setRevisionModalOrder(order);
    setRevisionNoteInput('');
    setRevisionNoteError('');
  };

  const handleSaveRevisionRecord = (e) => {
    e.preventDefault();
    if (!revisionModalOrder) return;
    if (!revisionNoteInput.trim()) {
      setRevisionNoteError('Silakan tuliskan rincian catatan revisi klien terlebih dahulu.');
      return;
    }

    const currentUsed = revisionModalOrder.revisionQuotaUsed || 0;
    const nextSessionNum = currentUsed + 1;
    const todayFormatted = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

    const newRecord = {
      sessionNumber: nextSessionNum,
      date: todayFormatted,
      note: revisionNoteInput.trim(),
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [...(revisionModalOrder.revisionHistory || []), newRecord];
    const updated = {
      ...revisionModalOrder,
      revisionQuotaUsed: nextSessionNum,
      revisionHistory: updatedHistory,
      developerNotes: `Sesi revisi ke-${nextSessionNum} (${todayFormatted}): ${revisionNoteInput.trim()}`
    };

    updateOrder(updated);
    setOrders(getAllOrders());
    setRevisionModalOrder(null);
    setRevisionNoteInput('');
    triggerSuccess(`Catatan Sesi Revisi ke-${nextSessionNum} untuk pesanan ${updated.id} berhasil disimpan!`);
  };

  const handleDeleteLastRevision = (order) => {
    if (!order.revisionHistory || order.revisionHistory.length === 0) return;
    const lastSession = order.revisionHistory[order.revisionHistory.length - 1];
    if (window.confirm(`Batalkan / hapus catatan Sesi Revisi ke-${lastSession.sessionNumber} ("${lastSession.note}")? Kuota terpakai akan berkurang 1.`)) {
      const updatedHistory = order.revisionHistory.slice(0, -1);
      const updatedUsed = Math.max(0, (order.revisionQuotaUsed || 1) - 1);
      const lastRemaining = updatedHistory[updatedHistory.length - 1];
      const updatedNotes = lastRemaining 
        ? `Sesi revisi ke-${lastRemaining.sessionNumber} (${lastRemaining.date}): ${lastRemaining.note}` 
        : 'Revisi dibatalkan. Menyiapkan repositori kode sumber dan antrean pengerjaan.';

      const updated = {
        ...order,
        revisionQuotaUsed: updatedUsed,
        revisionHistory: updatedHistory,
        developerNotes: updatedNotes
      };

      updateOrder(updated);
      setOrders(getAllOrders());
      triggerSuccess(`Catatan Sesi Revisi ke-${lastSession.sessionNumber} berhasil dibatalkan.`);
    }
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
    if (window.confirm(`Hapus catatan pesanan ${order.id} (${order.projectTitle})? Data akan dihapus secara permanen dari sistem dan pelacak.`)) {
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

  // Open Create Order Modal Helper
  const handleOpenCreateModal = () => {
    setNewOrderForm({
      packageId: 'umkm-katalog',
      totalInvestment: 300000,
      category: 'UMKM & Bisnis',
      statusType: 'FIX_ORDER'
    });
    setIsCreatingNew(true);
  };

  // Dynamic Package Selection Change
  const handleNewOrderPackageChange = (pkgId) => {
    const pkg = PACKAGES.find(p => p.id === pkgId);
    if (pkg) {
      setNewOrderForm(prev => ({
        ...prev,
        packageId: pkgId,
        totalInvestment: pkg.minPrice,
        category: pkg.categoryBadge || 'UMKM & Bisnis'
      }));
    }
  };

  // Save New Manual Order Form (Tanpa kolom Nama Klien)
  const handleCreateNewOrder = (e) => {
    e.preventDefault();
    const form = e.target;
    const selectedPkg = PACKAGES.find(p => p.id === form.packageId.value) || PACKAGES[1];
    const totalInvest = Number(form.totalInvestment.value) || selectedPkg.minPrice;

    const newOrder = {
      id: generateInquiryId(),
      orderNumber: form.statusType.value === 'FIX_ORDER' ? `ORD-AT-2026-${String(Math.floor(Math.random() * 900) + 100)}` : 'MENUNGGU-DP',
      statusType: form.statusType.value,
      clientName: '-',
      clientPhone: form.clientPhone.value.trim(),
      clientEmail: form.clientEmail?.value?.trim() || '-',
      projectTitle: form.projectTitle.value.trim(),
      category: form.category.value,
      packageId: selectedPkg.id,
      packageName: selectedPkg.name,
      packagePrice: selectedPkg.minPrice,
      addons: [],
      totalInvestment: totalInvest,
      dpAmount: Math.round(totalInvest / 2),
      dpStatus: form.statusType.value === 'FIX_ORDER' ? 'LUNAS (DP 50%)' : 'MENUNGGU TRANSFER DP 50%',
      orderDate: new Date().toLocaleDateString('id-ID', { dateStyle: 'long' }),
      estimatedCompletion: form.estimatedCompletion.value.trim() || '7 Hari Kerja',
      currentStageNumber: form.statusType.value === 'FIX_ORDER' ? 2 : 1,
      revisionQuotaTotal: 3,
      revisionQuotaUsed: 0,
      revisionHistory: [],
      developerNotes: form.developerNotes.value.trim() || 'Pesanan resmi terdaftar. Menyiapkan repositori kode sumber dan skema basis data.',
      deliverablesPreview: selectedPkg.deliverables || ['Master Source Code (.zip)', 'Database Relasional (.sql)']
    };

    createOrder(newOrder);
    setOrders(getAllOrders());
    setIsCreatingNew(false);
    triggerSuccess(`Pesanan baru ${newOrder.id} (${newOrder.projectTitle}) berhasil ditambahkan ke sistem!`);
  };

  // Save Sheet Config Handler
  const handleSaveSheetConfig = (e) => {
    e.preventDefault();
    saveSheetConfig(sheetConfig);
    triggerSuccess('Konfigurasi Webhook Google Spreadsheet berhasil disimpan.');
  };

  // Test Webhook Connection Handler
  const handleTestWebhook = async () => {
    if (!sheetConfig.webhookUrl || !sheetConfig.webhookUrl.trim().startsWith('http')) {
      alert('Silakan masukkan URL Webhook Google Apps Script terlebih dahulu lalu klik Simpan.');
      return;
    }

    setIsTestingWebhook(true);
    setTestResult('');
    const dummyTestOrder = {
      id: generateInquiryId(),
      orderNumber: 'TEST-ORD-001',
      statusType: 'FIX_ORDER',
      clientName: '-',
      clientPhone: '081234567890',
      clientEmail: 'test@aksaratech.com',
      projectTitle: 'Uji Konektivitas Google Spreadsheet Webhook',
      category: 'UMKM & Bisnis',
      packageName: 'Website UMKM & Katalog Produk Digital',
      totalInvestment: 300000,
      dpAmount: 150000,
      dpStatus: 'LUNAS (DP 50%)',
      currentStageNumber: 2,
      developerNotes: 'Pengujian koneksi otomatis antara portal Aksara Tech dan Google Sheets berhasil!',
      orderDate: new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })
    };

    const res = await syncOrderToSheet(dummyTestOrder);
    setIsTestingWebhook(false);
    if (res.success) {
      triggerSuccess('Data uji coba terkirim! Buka tab Google Spreadsheet Anda untuk melihat baris baru.');
      setTestResult('Terkoneksi! Buka Google Spreadsheet Anda, baris baru dengan nama "Uji Coba Sistem Aksara Tech" akan otomatis masuk.');
    } else {
      setTestResult('Perhatian: ' + res.message);
    }
  };

  // Sync All Orders to Google Sheet Handler
  const handleSyncAllOrders = async () => {
    if (!sheetConfig.webhookUrl || !sheetConfig.webhookUrl.trim().startsWith('http')) {
      alert('Silakan masukkan URL Webhook Google Apps Script terlebih dahulu.');
      return;
    }

    setIsTestingWebhook(true);
    setTestResult('');
    const res = await syncAllOrdersToSheet();
    setIsTestingWebhook(false);
    if (res.success) {
      triggerSuccess(res.message);
      setTestResult(res.message);
    } else {
      alert(res.message);
    }
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
  const googleAppsScriptCode = `// KODE GOOGLE APPS SCRIPT EKSEKUTIF AKSARA TECH (SINKRONISASI PENUH & AUTO-DELETE)
// Tempelkan di Google Spreadsheet: Menu Ekstensi > Apps Script

// 1. Endpoint status untuk pengujian browser langsung
function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var rowCount = Math.max(0, sheet.getLastRow() - 1);
  return ContentService.createTextOutput(JSON.stringify({
    "status": "connected",
    "spreadsheetName": ss.getName(),
    "spreadsheetUrl": ss.getUrl(),
    "sheetName": sheet.getName(),
    "totalOrdersInSheet": rowCount,
    "timestamp": new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
    "message": "Webhook Aksara Tech aktif, terhubung normal, dan siap menerima sinkronisasi."
  })).setMimeType(ContentService.MimeType.JSON);
}

// 2. Format baris data pesanan resmi (16 kolom standar)
function formatOrderRow(data) {
  var revLogs = "-";
  if (data.revisionHistory && Array.isArray(data.revisionHistory) && data.revisionHistory.length > 0) {
    revLogs = data.revisionHistory.map(function(r) {
      return "[Sesi " + r.sessionNumber + " - " + r.date + "]: " + r.note;
    }).join("; ");
  }
  return [
    data.id || "-",
    data.orderNumber || "-",
    data.statusType || "INQUIRY",
    "'" + (data.clientPhone || "-"), // Tanda petik agar angka 0 nomor WA tetap utuh
    data.clientEmail || "-",
    data.projectTitle || "-",
    data.category || "-",
    data.packageName || "-",
    data.totalInvestment || 0,
    data.dpAmount || 0,
    data.dpStatus || "-",
    "Tahap " + (data.currentStageNumber || 1) + " dari 5",
    "" + (data.revisionQuotaUsed || 0) + " / " + (data.revisionQuotaTotal || 3),
    revLogs,
    data.developerNotes || "-",
    new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
  ];
}

// 3. Pastikan Header Kolom tersedia dan diformat resmi
function ensureHeader(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "ID Tiket",
      "Nomor Order",
      "Tipe Status",
      "Nomor WhatsApp",
      "Email",
      "Judul Proyek",
      "Kategori",
      "Paket Layanan",
      "Total Investasi (Rp)",
      "Uang Muka DP 50% (Rp)",
      "Status Pembayaran",
      "Tahap SOP",
      "Kuota Revisi",
      "Riwayat Catatan Revisi",
      "Catatan Pengembang",
      "Waktu Pencatatan"
    ]);
  }
}

// 4. Otomatisasi Desain & Formatting Spreadsheet Profesional
function applySheetStyling(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = 16;
  
  // Bekukan baris 1 (Header tetap di atas saat di-scroll)
  sheet.setFrozenRows(1);
  
  // Format Header Baris 1
  var headerRange = sheet.getRange(1, 1, 1, lastCol);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#0F172A");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 38);
  
  // Atur lebar kolom optimal
  var colWidths = [175, 155, 120, 150, 220, 280, 160, 220, 140, 140, 160, 120, 110, 320, 300, 170];
  for (var c = 0; c < colWidths.length; c++) {
    sheet.setColumnWidth(c + 1, colWidths[c]);
  }
  
  // Format baris data
  if (lastRow > 1) {
    sheet.getRange(2, 9, lastRow - 1, 2).setNumberFormat('"Rp" #,##0');
    sheet.getRange(2, 4, lastRow - 1, 1).setNumberFormat("@");
    sheet.getRange(2, 1, lastRow - 1, lastCol).setVerticalAlignment("middle");
    
    for (var r = 2; r <= lastRow; r++) {
      sheet.setRowHeight(r, 30);
      var rowRange = sheet.getRange(r, 1, 1, lastCol);
      if (r % 2 === 0) {
        rowRange.setBackground("#FFFFFF");
      } else {
        rowRange.setBackground("#F8FAFC");
      }
    }
  }
}

// 5. Endpoint penerima data otomatis (Sinkronisasi Total, Hapus, Ubah, Tambah)
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // AKSI 1: SINKRONISASI PENUH / REWRITE (Menyesuaikan dengan database lokal, hapus data usang)
    if (data.action === "sync_all" || Array.isArray(data.orders)) {
      var orders = data.orders || [];
      sheet.clearContents();
      ensureHeader(sheet);
      
      orders.forEach(function(ord) {
        sheet.appendRow(formatOrderRow(ord));
      });
      applySheetStyling(sheet);
      
      return ContentService.createTextOutput(JSON.stringify({
        "result": "success",
        "action": "sync_all",
        "count": orders.length
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // AKSI 2: KOSONGKAN SEMUA DATA (Hapus semua baris pesanan, sisakan Header)
    if (data.action === "clear_all") {
      sheet.clearContents();
      ensureHeader(sheet);
      applySheetStyling(sheet);
      return ContentService.createTextOutput(JSON.stringify({
        "result": "success",
        "action": "clear_all"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // AKSI 3: HAPUS 1 PESANAN (Cari baris berdasarkan ID Tiket dan hapus baris tersebut)
    if (data.action === "delete" && data.id) {
      ensureHeader(sheet);
      var lastRow = sheet.getLastRow();
      var deleted = false;
      if (lastRow > 1) {
        var ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
        for (var i = ids.length - 1; i >= 0; i--) {
          if (ids[i][0] == data.id) {
            sheet.deleteRow(i + 2);
            deleted = true;
          }
        }
      }
      applySheetStyling(sheet);
      return ContentService.createTextOutput(JSON.stringify({
        "result": "success",
        "action": "delete",
        "deleted": deleted,
        "id": data.id
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // AKSI 4: UPDATE ATAU TAMBAH PESANAN TUNGGAL
    var targetOrder = data.order || data;
    ensureHeader(sheet);
    var lastRow = sheet.getLastRow();
    var updated = false;
    
    if (lastRow > 1 && targetOrder.id) {
      var idList = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
      for (var r = 0; r < idList.length; r++) {
        if (idList[r][0] == targetOrder.id) {
          var rowIdx = r + 2;
          sheet.getRange(rowIdx, 1, 1, 16).setValues([formatOrderRow(targetOrder)]);
          updated = true;
          break;
        }
      }
    }
    
    // Jika data baru belum ada di sheet, tambahkan sebagai baris baru
    if (!updated && targetOrder.id) {
      sheet.appendRow(formatOrderRow(targetOrder));
    }
    applySheetStyling(sheet);
    
    return ContentService.createTextOutput(JSON.stringify({
      "result": "success",
      "action": updated ? "updated" : "appended",
      "id": targetOrder.id
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error",
      "message": err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}`;

  // ─────────────────────────────────────────────────────────────
  // RENDER PIN LOGIN GATE (IF NOT AUTHENTICATED)
  // ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 20px', boxSizing: 'border-box' }}>
        
        {/* Status Chip */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: '#FFFFFF', border: '1.5px solid #CBD5E1', marginBottom: '24px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0F172A', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Aksara Tech &bull; Restricted Internal Access
          </span>
        </div>

        {/* Security Card Container */}
        <div style={{ background: '#FFFFFF', border: '2px solid #0F172A', borderRadius: '16px', maxWidth: '460px', width: '100%', padding: '40px 36px', boxSizing: 'border-box', textAlign: 'center' }}>
          
          {/* Security Icon Badge */}
          <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
            <KeyRound size={26} color="#FFFFFF" />
          </div>

          <h1 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0F172A', margin: '0 0 10px 0', letterSpacing: '-0.01em', lineHeight: '1.25' }}>
            Pusat Otentikasi Workspace
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#334155', margin: '0 0 28px 0', lineHeight: '1.55' }}>
            Akses verifikasi pembayaran DP 50%, pembaruan tahapan koding SOP, dan sinkronisasi repositori berkas proyek.
          </p>

          <form onSubmit={handlePinSubmit}>
            <div style={{ marginBottom: '24px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: '800', color: '#0F172A' }}>
                  PIN Keamanan Pengembang
                </label>
                <button
                  type="button"
                  onClick={() => setPinInput(DEFAULT_ADMIN_PIN)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#1D63FF',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Gunakan Default (2026)
                </button>
              </div>

              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  if (pinError) setPinError('');
                }}
                placeholder="••••"
                autoFocus
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '16px 20px',
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  textAlign: 'center',
                  letterSpacing: '0.4em',
                  background: '#F8FAFC',
                  border: pinError ? '2px solid #DC2626' : '2px solid #0F172A',
                  borderRadius: '10px',
                  outline: 'none',
                  color: '#0F172A'
                }}
              />
              
              {pinError && (
                <div style={{ fontSize: '0.84rem', color: '#DC2626', fontWeight: '800', marginTop: '8px', textAlign: 'center' }}>
                  {pinError}
                </div>
              )}
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                background: '#0F172A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                padding: '14px 20px',
                fontSize: '0.98rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background 0.15s, transform 0.1s'
              }}
            >
              <ShieldCheck size={18} />
              <span>Buka Akses Workspace</span>
            </button>
          </form>

          {/* Discreet Meta Footnote */}
          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1.5px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: '#64748B' }}>
            <div>
              <span>PIN Standar Pengembang: </span>
              <code style={{ background: '#F1F5F9', padding: '2px 8px', borderRadius: '4px', fontWeight: '800', color: '#0F172A', border: '1.5px solid #CBD5E1' }}>2026</code>
            </div>
            <Link
              to="/"
              style={{
                color: '#475569',
                textDecoration: 'none',
                fontWeight: '700',
                marginTop: '4px',
                display: 'inline-block'
              }}
            >
              &larr; Kembali ke Beranda Aksara Tech
            </Link>
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
      <style>{`
        @keyframes adminModalSlideUp {
          from {
            opacity: 0;
            transform: scale(0.97) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .admin-modal-input:focus, .admin-modal-select:focus, .admin-modal-textarea:focus {
          border-color: var(--prussian-blue) !important;
          outline: 2px solid var(--prussian-blue);
          outline-offset: -1px;
        }
      `}</style>
      
      {/* Top Banner Bar */}
      <header style={{ background: '#0F172A', color: '#FFFFFF', padding: '14px 0', borderBottom: '1.5px solid #1E293B' }}>
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.02rem', fontWeight: '900', letterSpacing: '-0.01em', color: '#FFFFFF' }}>
                AKSARA TECH
              </span>
              <span style={{ color: '#475569', fontWeight: '400' }}>/</span>
              <span style={{ fontSize: '0.86rem', color: '#CBD5E1', fontWeight: '700' }}>
                Pusat Kendali Produksi
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <Link
              to="/lacak"
              target="_blank"
              style={{
                background: '#1E293B',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontWeight: '700',
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1.5px solid #334155',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Eye size={14} />
              <span>Tinjau Pelacak (/lacak)</span>
            </Link>

            <button
              type="button"
              onClick={exportOrdersToExcel}
              style={{
                background: '#1E293B',
                color: '#FFFFFF',
                border: '1.5px solid #334155',
                fontSize: '0.82rem',
                fontWeight: '700',
                padding: '8px 14px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Unduh format spreadsheet rapi dengan kolom terpisah, warna header, dan penataan nomor telepon"
            >
              <FileSpreadsheet size={14} />
              <span>Ekspor Excel (.xls)</span>
            </button>

            <button
              type="button"
              onClick={exportOrdersToCSV}
              style={{
                background: '#1E293B',
                color: '#CBD5E1',
                border: '1.5px solid #334155',
                fontSize: '0.82rem',
                fontWeight: '700',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Unduh format CSV standar dengan pemisah titik koma"
            >
              <span>CSV (.csv)</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                background: 'transparent',
                color: '#CBD5E1',
                border: '1.5px solid #475569',
                fontSize: '0.82rem',
                fontWeight: '700',
                padding: '8px 14px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <LogOut size={14} />
              <span>Keluar</span>
            </button>
          </div>

        </div>
      </header>

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
            <h1 style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.6rem)', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.01em', margin: '0 0 6px 0', lineHeight: '1.25' }}>
              Pusat Kendali Pesanan &amp; SOP Produksi
            </h1>
            <p style={{ fontSize: '0.94rem', color: '#475569', margin: 0, maxWidth: '780px', lineHeight: '1.5' }}>
              Verifikasi transfer DP 50%, kelola tahapan koding 5-langkah SOP, dan catat pemakaian kuota revisi proyek.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleClearAllOrders}
              style={{
                background: '#FFFFFF',
                color: '#DC2626',
                border: '1.5px solid #CBD5E1',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '0.84rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Hapus seluruh data pesanan lokal dan kosongkan pelacak"
            >
              <Trash2 size={15} />
              <span>Kosongkan Data</span>
            </button>

            <button
              type="button"
              onClick={handleResetDemoOrders}
              style={{
                background: '#FFFFFF',
                color: '#0F172A',
                border: '1.5px solid #CBD5E1',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '0.84rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Muat ulang 4 data contoh awal untuk pengujian"
            >
              <RotateCcw size={15} />
              <span>Muat Ulang Contoh</span>
            </button>

            <button
              type="button"
              onClick={handleOpenCreateModal}
              style={{
                background: '#1D63FF',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 18px',
                fontSize: '0.88rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Plus size={17} />
              <span>Tambah Pesanan Manual</span>
            </button>
          </div>
        </div>

        {/* 4 Overview Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          
          <div style={{ background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '12px', padding: '20px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Total Seluruh Pesanan
              </span>
              <Database size={16} color="#0F172A" />
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: '900', color: '#0F172A', lineHeight: 1 }}>{metrics.total}</div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '10px' }}>Tersimpan di database &amp; storage</div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '12px', padding: '20px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Inquiry Baru (Menunggu DP)
              </span>
              <Clock size={16} color="#D97706" />
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: '900', color: '#D97706', lineHeight: 1 }}>{metrics.inquiries}</div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '10px' }}>Calon klien konsultasi / belum bayar</div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '12px', padding: '20px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Fix Order Aktif (Dikoding)
              </span>
              <Layers size={16} color="#1D63FF" />
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: '900', color: '#0F172A', lineHeight: 1 }}>{metrics.activeFix}</div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '10px' }}>DP 50% lunas &amp; masuk antrean kerja</div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '12px', padding: '20px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Selesai &amp; Lunas 100%
              </span>
              <CheckCircle2 size={16} color="#16A34A" />
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: '900', color: '#16A34A', lineHeight: 1 }}>{metrics.completed}</div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '10px' }}>Master Code diserahkan &amp; garansi jalan</div>
          </div>

        </div>

        {/* Navigation Tabs & Search Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '22px' }}>
          
          {/* Segmented Filter Tabs */}
          <div style={{ display: 'inline-flex', background: '#E2E8F0', padding: '4px', borderRadius: '8px', gap: '4px', flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: `Semua Pesanan (${metrics.total})` },
              { id: 'INQUIRY', label: `Inquiry (${metrics.inquiries})` },
              { id: 'FIX_ORDER', label: `Fix Order (${metrics.activeFix})` },
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
                    background: isActive ? '#0F172A' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#334155',
                    fontWeight: isActive ? '800' : '600',
                    fontSize: '0.84rem',
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
            <div style={{ position: 'relative', width: '300px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari ID tiket, judul, atau WhatsApp..."
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 12px 9px 36px',
                  fontSize: '0.86rem',
                  borderRadius: '8px',
                  border: '1.5px solid #CBD5E1',
                  background: '#FFFFFF',
                  outline: 'none',
                  color: '#0F172A'
                }}
              />
              <Search size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
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

            <form onSubmit={handleSaveSheetConfig} style={{ marginBottom: '28px' }}>
              {/* Field 1: Webhook URL */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.86rem', fontWeight: '800', color: '#0F172A' }}>
                    1. Google Apps Script Webhook URL (Aplikasi Web)
                  </label>
                  {sheetConfig.webhookUrl && sheetConfig.webhookUrl.trim().startsWith('http') && (
                    <a
                      href={sheetConfig.webhookUrl.trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.8rem', color: 'var(--prussian-blue)', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <ExternalLink size={13} />
                      <span>Uji Akses Web App di Tab Baru</span>
                    </a>
                  )}
                </div>
                <input
                  type="url"
                  value={sheetConfig.webhookUrl || ''}
                  onChange={(e) => setSheetConfig({ ...sheetConfig, webhookUrl: e.target.value })}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '12px 14px',
                    fontSize: '0.92rem',
                    borderRadius: '8px',
                    border: '1.5px solid #CBD5E1',
                    background: '#FFFFFF',
                    outline: 'none',
                    color: '#0F172A',
                    fontWeight: '600'
                  }}
                />
                <span style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
                  URL mesin webhook dari tombol <strong>Terapkan &gt; Deployment baru</strong> di Apps Script (berakhiran <code>/exec</code>).
                </span>
              </div>

              {/* Field 2: Direct Google Spreadsheet Document Link */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.86rem', fontWeight: '800', color: '#0F172A' }}>
                    2. Tautan Berkas Google Spreadsheet Anda (docs.google.com)
                  </label>
                  {sheetConfig.spreadsheetUrl && sheetConfig.spreadsheetUrl.trim().startsWith('http') && (
                    <a
                      href={sheetConfig.spreadsheetUrl.trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.8rem', color: '#16A34A', fontWeight: '800', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <ExternalLink size={13} />
                      <span>Buka File Spreadsheet Sekarang</span>
                    </a>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="url"
                    value={sheetConfig.spreadsheetUrl || ''}
                    onChange={(e) => setSheetConfig({ ...sheetConfig, spreadsheetUrl: e.target.value })}
                    placeholder="Contoh: https://docs.google.com/spreadsheets/d/.../edit"
                    style={{
                      flex: 1,
                      padding: '12px 14px',
                      fontSize: '0.92rem',
                      borderRadius: '8px',
                      border: '1.5px solid #CBD5E1',
                      background: '#FFFFFF',
                      outline: 'none',
                      color: '#0F172A',
                      fontWeight: '600'
                    }}
                  />
                  {sheetConfig.spreadsheetUrl && sheetConfig.spreadsheetUrl.trim().startsWith('http') && (
                    <a
                      href={sheetConfig.spreadsheetUrl.trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: '#16A34A',
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        padding: '12px 18px',
                        fontSize: '0.88rem',
                        fontWeight: '800',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <ExternalLink size={16} />
                      <span>Buka Sheet</span>
                    </a>
                  )}
                </div>
                <span style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
                  Buka tab spreadsheet Anda di browser, salin URL dari address bar, lalu tempelkan di sini agar bisa dibuka instan kapan saja.
                </span>
              </div>

              {testResult && (
                <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', color: '#166534', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.88rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color="#16A34A" />
                  <span>{testResult}</span>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="submit"
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
                    gap: '6px'
                  }}
                >
                  <Save size={16} />
                  <span>Simpan Pengaturan Webhook</span>
                </button>

                <button
                  type="button"
                  onClick={handleTestWebhook}
                  disabled={isTestingWebhook}
                  style={{
                    background: '#F1F5F9',
                    color: '#0F172A',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: '8px',
                    padding: '11px 18px',
                    fontSize: '0.88rem',
                    fontWeight: '800',
                    cursor: isTestingWebhook ? 'wait' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <CheckCircle2 size={16} color="var(--prussian-blue)" />
                  <span>{isTestingWebhook ? 'Mengirim data...' : 'Kirim 1 Data Uji Coba'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSyncAllOrders}
                  disabled={isTestingWebhook}
                  style={{
                    background: '#F1F5F9',
                    color: '#0F172A',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: '8px',
                    padding: '11px 18px',
                    fontSize: '0.88rem',
                    fontWeight: '800',
                    cursor: isTestingWebhook ? 'wait' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <RotateCcw size={16} />
                  <span>Sinkronkan Semua Pesanan ke Sheet</span>
                </button>

                <button
                  type="button"
                  onClick={exportOrdersToExcel}
                  style={{
                    background: '#16A34A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '11px 18px',
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
                  <span>Ekspor Excel (.xls) Rapi</span>
                </button>

                <button
                  type="button"
                  onClick={exportOrdersToCSV}
                  style={{
                    background: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '11px 16px',
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  title="Unduh format CSV standar dengan pemisah titik koma (sep=;)"
                >
                  <span>CSV (.csv)</span>
                </button>
              </div>
            </form>

            {/* Step-by-step Guide with Visual Clarity */}
            <div style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
              
              <div style={{ background: '#FEF3C7', border: '1.5px solid #FDE68A', color: '#92400E', padding: '12px 16px', borderRadius: '8px', marginBottom: '18px', fontSize: '0.88rem', lineHeight: '1.5' }}>
                <strong>PENTING (Jangan Tekan Tombol "Jalankan"):</strong> Tombol <em>"▶ Jalankan"</em> di editor Google Script hanya untuk skrip internal dan akan memunculkan pesan peringatan akses. Untuk mengaktifkan webhook, gunakan tombol biru <strong>"Terapkan"</strong> (Deploy) di pojok kanan atas!
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0F172A', margin: '0 0 14px 0' }}>
                Panduan Langkah demi Langkah Menghubungkan Google Sheet:
              </h3>

              <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#334155', lineHeight: '1.8' }}>
                <li>
                  Buka tab <strong>Google Spreadsheet</strong> Anda, klik menu atas: <strong>Ekstensi &gt; Apps Script</strong>.
                </li>
                <li>
                  Hapus seluruh kode bawaan yang ada di file <code>Kode.gs</code>, lalu salin dan tempelkan skrip di bawah ini:
                </li>
              </ol>

              <div style={{ position: 'relative', marginTop: '12px', marginBottom: '18px' }}>
                <pre style={{ background: '#0F172A', color: '#F8FAFC', padding: '18px', borderRadius: '8px', fontSize: '0.82rem', overflowX: 'auto', margin: 0, lineHeight: '1.5' }}>
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
                    borderRadius: '6px',
                    padding: '7px 12px',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {copiedScript ? <Check size={14} color="#22C55E" /> : <Copy size={14} />}
                  <span>{copiedScript ? 'Tersalin!' : 'Salin Skrip'}</span>
                </button>
              </div>

              <ol start={3} style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#334155', lineHeight: '1.8' }}>
                <li>
                  Tekan ikon <strong>Simpan (Disket)</strong> atau tekan <code>Ctrl + S</code>.
                </li>
                <li>
                  Di pojok kanan atas, klik tombol biru <strong>"Terapkan"</strong> (Deploy) &gt; pilih <strong>"Deployment baru"</strong>.
                </li>
                <li>
                  Di samping kiri tulisan <em>Pilih jenis</em>, klik ikon <strong>Roda Gigi (Gear)</strong> &gt; pilih <strong>"Aplikasi web"</strong>.
                </li>
                <li>
                  Pada opsi <strong>"Siapa yang memiliki akses"</strong> (Who has access), ubah dari <em>Hanya saya</em> menjadi <strong>"Siapa saja"</strong> (Anyone). <em>(Ini kunci agar website bisa mengirim data).</em>
                </li>
                <li>
                  Klik tombol biru <strong>"Terapkan"</strong>. Jika Google meminta izin akses:
                  <ul style={{ marginTop: '4px', paddingLeft: '18px' }}>
                    <li>Klik <strong>"Otorisasi akses"</strong> &gt; Pilih akun Google Anda.</li>
                    <li>Jika muncul peringatan <em>Google belum memverifikasi aplikasi ini</em>: klik teks <strong>"Lanjutan"</strong> (Advanced) di kiri bawah &gt; klik <strong>"Buka ... (tidak aman)"</strong> &gt; klik <strong>"Izinkan"</strong>.</li>
                  </ul>
                </li>
                <li>
                  Salin <strong>URL Aplikasi web</strong> (berakhiran <code>/exec</code>), tempelkan ke kolom URL Webhook di atas, lalu klik <strong>"Simpan Pengaturan Webhook"</strong>. Selesai!
                </li>
              </ol>

              {/* Guidance: Difference Between Web App & Google Sheet File */}
              <div style={{ marginTop: '24px', background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '10px', padding: '18px 20px' }}>
                <h4 style={{ fontSize: '0.98rem', fontWeight: '900', color: '#0F172A', margin: '0 0 10px 0' }}>
                  Panduan: Cara Membuka Berkas Google Sheet &amp; Memeriksa Web App
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', fontSize: '0.86rem', color: '#334155', lineHeight: '1.6' }}>
                  <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '8px', border: '1.5px solid #E2E8F0' }}>
                    <div style={{ fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
                      1. Membuka Berkas Google Spreadsheet
                    </div>
                    <div>
                      Buka tab browser di mana Anda pertama kali membuat spreadsheet (atau buka <a href="https://sheets.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--prussian-blue)', fontWeight: '700' }}>Google Sheets</a> / <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--prussian-blue)', fontWeight: '700' }}>Google Drive</a>). Salin alamat URL spreadsheet (berakhiran <code>/edit</code>) dan tempelkan ke kolom <strong>"Tautan Berkas Google Spreadsheet"</strong> di atas. Selanjutnya Anda cukup menekan tombol hijau <strong>"Buka Sheet"</strong> untuk langsung mengaksesnya.
                    </div>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '8px', border: '1.5px solid #E2E8F0' }}>
                    <div style={{ fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
                      2. Memeriksa Status Web App (API)
                    </div>
                    <div>
                      URL Web App yang berakhiran <code>/exec</code> adalah mesin API komunikasi data. Jika diklik, browser akan menampilkan teks kode: <code>{'{"status":"connected", "totalOrdersInSheet": ...}'}</code>. Tampilan ini menandakan webhook aktif dan siap menerima data.
                    </div>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '8px', border: '1.5px solid #E2E8F0' }}>
                    <div style={{ fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
                      3. Sinkronisasi Otomatis &amp; Auto-Delete
                    </div>
                    <div>
                      Dengan skrip terbaru di atas, setiap kali Anda menghapus pesanan di web portal, baris di spreadsheet otomatis terhapus. Jika Anda menekan tombol <strong>"Sinkronkan Semua Pesanan ke Sheet"</strong>, seluruh isi spreadsheet akan ditulis ulang sesuai database aktif saat ini tanpa ada data duplikat.
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB CONTENT: ORDERS LIST TABLE
            ───────────────────────────────────────────────────────────── */}
        {activeTab !== 'SPREADSHEET' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {filteredOrders.length === 0 ? (
              <div style={{ background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '12px', padding: '48px 24px', textAlign: 'center' }}>
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
                      border: '1.5px solid #CBD5E1',
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
                const isFixOrder = !isInquiry && !isCompleted;

                return (
                  <div
                    key={ord.id}
                    style={{
                      background: '#FFFFFF',
                      border: '1.5px solid #CBD5E1',
                      borderRadius: '12px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '18px'
                    }}
                  >
                    {/* Header Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          {/* Status Badge */}
                          {isInquiry ? (
                            <span
                              style={{
                                fontSize: '0.78rem',
                                fontWeight: '800',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                background: '#FEF3C7',
                                color: '#92400E',
                                border: '1.5px solid #FDE68A',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                letterSpacing: '0.02em'
                              }}
                            >
                              <Clock size={12} />
                              <span>INQUIRY &bull; MENUNGGU TRANSFER DP 50%</span>
                            </span>
                          ) : isCompleted ? (
                            <span
                              style={{
                                fontSize: '0.78rem',
                                fontWeight: '800',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                background: '#F0FDF4',
                                color: '#166534',
                                border: '1.5px solid #BBF7D0',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                letterSpacing: '0.02em'
                              }}
                            >
                              <CheckCircle2 size={12} />
                              <span>PROYEK SELESAI &bull; MASTER CODE DISERAHKAN</span>
                            </span>
                          ) : (
                            <span
                              style={{
                                fontSize: '0.78rem',
                                fontWeight: '800',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                background: '#EFF6FF',
                                color: '#1E40AF',
                                border: '1.5px solid #BFDBFE',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                letterSpacing: '0.02em'
                              }}
                            >
                              <Layers size={12} />
                              <span>FIX ORDER AKTIF &bull; PIPELINE KODING</span>
                            </span>
                          )}

                          {/* Ticket ID & Order Number */}
                          <code style={{ background: '#F1F5F9', border: '1.5px solid #CBD5E1', padding: '3px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '800', color: '#0F172A' }}>
                            {ord.id}
                          </code>
                          
                          {ord.orderNumber && ord.orderNumber !== 'MENUNGGU-DP' && (
                            <code style={{ background: '#0F172A', color: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '800' }}>
                              {ord.orderNumber}
                            </code>
                          )}

                          <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                            Daftar: {ord.orderDate}
                          </span>
                        </div>

                        {/* Project Title */}
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0F172A', margin: '4px 0 0 0', letterSpacing: '-0.01em', lineHeight: '1.3' }}>
                          {ord.projectTitle}
                        </h3>

                      </div>

                      {/* Right Quick Actions Toolbar */}
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                        {isInquiry && (
                          <button
                            type="button"
                            onClick={() => handleVerifyDP(ord)}
                            style={{
                              background: '#0F172A',
                              color: '#FFFFFF',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '8px 14px',
                              fontSize: '0.82rem',
                              fontWeight: '800',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <CheckCircle2 size={14} color="#22C55E" />
                            <span>Verifikasi DP 50%</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setEditingOrder(ord)}
                          style={{
                            background: '#FFFFFF',
                            color: '#0F172A',
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            padding: '8px 12px',
                            fontSize: '0.82rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          <Edit3 size={14} />
                          <span>Edit</span>
                        </button>

                        <Link
                          to={`/lacak?kode=${ord.id}`}
                          target="_blank"
                          style={{
                            background: '#FFFFFF',
                            color: '#0F172A',
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            padding: '8px 12px',
                            fontSize: '0.82rem',
                            fontWeight: '700',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          <ExternalLink size={14} />
                          <span>Lihat Pelacak</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDeleteOrder(ord)}
                          title="Hapus / Arsipkan"
                          style={{
                            background: '#FFFFFF',
                            color: '#DC2626',
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            padding: '8px 10px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Metadata Strip */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <a
                        href={`https://wa.me/${(ord.clientPhone || '').replace(/^0/, '62')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#F8FAFC',
                          border: '1.5px solid #CBD5E1',
                          padding: '5px 11px',
                          borderRadius: '6px',
                          fontSize: '0.82rem',
                          fontWeight: '800',
                          color: '#0F172A',
                          textDecoration: 'none'
                        }}
                      >
                        <Phone size={13} color="#2563EB" />
                        <span>{ord.clientPhone}</span>
                      </a>

                      <span style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', padding: '5px 11px', borderRadius: '6px', fontSize: '0.82rem', color: '#475569' }}>
                        Paket: <strong style={{ color: '#0F172A' }}>{ord.packageName}</strong>
                      </span>

                      <span style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', padding: '5px 11px', borderRadius: '6px', fontSize: '0.82rem', color: '#475569' }}>
                        Kategori: <strong style={{ color: '#0F172A' }}>{ord.category}</strong>
                      </span>

                      <span style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', padding: '5px 11px', borderRadius: '6px', fontSize: '0.82rem', color: '#475569' }}>
                        Target Selesai: <strong style={{ color: '#0F172A' }}>{ord.estimatedCompletion || '7 Hari Kerja'}</strong>
                      </span>
                    </div>

                    {/* Operational Parameter Controls Row */}
                    <div style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: '10px', padding: '16px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', alignItems: 'center' }}>
                      
                      {/* Financial info */}
                      <div>
                        <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Nilai Investasi &amp; DP
                        </div>
                        <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A', marginTop: '3px' }}>
                          {formatRupiah(ord.totalInvestment)}
                        </div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: ord.dpStatus.includes('LUNAS') ? '#16A34A' : '#D97706', fontWeight: '800', marginTop: '3px' }}>
                          {ord.dpStatus.includes('LUNAS') ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                          <span>{ord.dpStatus}</span>
                        </div>
                      </div>

                      {/* Stage SOP Dropdown & Step Indicator */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Tahap SOP Terkini
                          </span>
                          <span style={{ fontSize: '0.76rem', fontWeight: '800', color: '#0F172A' }}>
                            Tahap {ord.currentStageNumber || 1} / 5
                          </span>
                        </div>

                        {/* Mini 5-stage dots */}
                        <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                          {[1, 2, 3, 4, 5].map((s) => {
                            const isDone = (ord.currentStageNumber || 1) >= s;
                            const isCurrent = (ord.currentStageNumber || 1) === s;
                            return (
                              <div
                                key={s}
                                style={{
                                  flex: 1,
                                  height: '6px',
                                  borderRadius: '3px',
                                  background: isCurrent ? '#1D63FF' : isDone ? '#0F172A' : '#E2E8F0',
                                  transition: 'background 0.2s'
                                }}
                              />
                            );
                          })}
                        </div>

                        <select
                          value={ord.currentStageNumber}
                          onChange={(e) => handleStageChange(ord, e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            borderRadius: '6px',
                            border: '1.5px solid #CBD5E1',
                            background: '#FFFFFF',
                            fontSize: '0.84rem',
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
                        <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                          Kuota Revisi SOP (Maks 3x)
                        </div>
                        
                        {/* 3 slot badges */}
                        <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                          {[1, 2, 3].map((slotNum) => {
                            const isUsed = (ord.revisionQuotaUsed || 0) >= slotNum;
                            return (
                              <div
                                key={slotNum}
                                style={{
                                  flex: 1,
                                  padding: '4px 6px',
                                  borderRadius: '4px',
                                  textAlign: 'center',
                                  fontSize: '0.74rem',
                                  fontWeight: '800',
                                  background: isUsed ? '#0F172A' : '#FFFFFF',
                                  color: isUsed ? '#FFFFFF' : '#64748B',
                                  border: isUsed ? '1.5px solid #0F172A' : '1.5px dashed #CBD5E1'
                                }}
                              >
                                Sesi {slotNum}
                              </div>
                            );
                          })}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                          <span style={{ fontSize: '0.84rem', fontWeight: '800', color: (ord.revisionQuotaUsed || 0) >= (ord.revisionQuotaTotal || 3) ? '#DC2626' : '#0F172A' }}>
                            {ord.revisionQuotaUsed || 0} / {ord.revisionQuotaTotal || 3} Terpakai
                          </span>
                          <button
                            type="button"
                            onClick={() => handleOpenRevisionModal(ord)}
                            disabled={(ord.revisionQuotaUsed || 0) >= (ord.revisionQuotaTotal || 3)}
                            style={{
                              background: (ord.revisionQuotaUsed || 0) >= (ord.revisionQuotaTotal || 3) ? '#F1F5F9' : '#FFFFFF',
                              border: '1.5px solid #CBD5E1',
                              borderRadius: '6px',
                              padding: '5px 10px',
                              fontSize: '0.78rem',
                              fontWeight: '800',
                              cursor: (ord.revisionQuotaUsed || 0) >= (ord.revisionQuotaTotal || 3) ? 'not-allowed' : 'pointer',
                              color: (ord.revisionQuotaUsed || 0) >= (ord.revisionQuotaTotal || 3) ? '#94A3B8' : '#0F172A'
                            }}
                          >
                            + Catat Revisi
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Riwayat Catatan Sesi Revisi Proyek */}
                    {ord.revisionHistory && ord.revisionHistory.length > 0 && (
                      <div style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: '8px', padding: '14px 18px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <History size={14} color="#0F172A" />
                            <span>Riwayat Catatan Sesi Revisi ({ord.revisionHistory.length} dari {ord.revisionQuotaTotal || 3} Terpakai):</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteLastRevision(ord)}
                            title="Batalkan sesi revisi terakhir jika salah input"
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#DC2626',
                              fontSize: '0.76rem',
                              fontWeight: '700',
                              cursor: 'pointer',
                              padding: 0
                            }}
                          >
                            Batalkan Sesi Terakhir
                          </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {ord.revisionHistory.map((rev) => (
                            <div 
                              key={rev.sessionNumber} 
                              style={{ 
                                background: '#FFFFFF', 
                                border: '1.5px solid #CBD5E1', 
                                borderRadius: '6px', 
                                padding: '10px 14px',
                                fontSize: '0.84rem' 
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                                <span style={{ fontWeight: '800', color: '#1D63FF' }}>
                                  Sesi {rev.sessionNumber}
                                </span>
                                <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '600' }}>
                                  {rev.date}
                                </span>
                              </div>
                              <div style={{ color: '#0F172A', lineHeight: '1.45' }}>
                                "{rev.note}"
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Developer Log Snippet */}
                    <div style={{ fontSize: '0.86rem', color: '#334155', lineHeight: '1.55', background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderLeft: '4px solid #1D63FF', padding: '12px 16px', borderRadius: '6px' }}>
                      <span style={{ fontWeight: '800', color: '#0F172A' }}>Catatan Pengembang Terakhir (Tampil Langsung di /lacak): </span>
                      <span style={{ color: '#0F172A' }}>"{ord.developerNotes}"</span>
                    </div>

                  </div>
                );
              })
            )}

          </div>
        )}

      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: EDIT ORDER DETAILS (Executive Anti-Slop Design)
          ───────────────────────────────────────────────────────────── */}
      {editingOrder && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(15, 23, 42, 0.65)', 
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 9999, 
            padding: '20px' 
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingOrder(null);
          }}
        >
          <div 
            style={{ 
              background: '#FFFFFF', 
              borderRadius: '16px', 
              maxWidth: '720px', 
              width: '100%', 
              maxHeight: '90vh', 
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.25)',
              border: '1.5px solid #CBD5E1',
              boxSizing: 'border-box',
              animation: 'adminModalSlideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Modal Header */}
            <div style={{ padding: '22px 28px', borderBottom: '1.5px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Edit3 size={20} color="var(--prussian-blue)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0F172A', margin: 0, letterSpacing: '-0.01em' }}>
                    Edit Rincian Pesanan
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                    <code style={{ background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '800', color: '#0F172A' }}>
                      {editingOrder.id}
                    </code>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      &bull; Terdaftar pada {editingOrder.orderDate}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                style={{ 
                  background: '#F8FAFC', 
                  border: '1.5px solid #E2E8F0', 
                  borderRadius: '8px', 
                  width: '32px', 
                  height: '32px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: 'pointer', 
                  color: '#64748B' 
                }}
                aria-label="Tutup modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
              <div style={{ overflowY: 'auto', padding: '24px 28px', flex: 1 }}>
                
                {/* SECTION 1: KONTAK & KOMUNIKASI */}
                <div style={{ marginBottom: '22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Phone size={15} color="#0F172A" />
                    <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      1. Kontak &amp; Saluran Komunikasi
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                        Nomor WhatsApp
                      </label>
                      <input
                        type="text"
                        required
                        className="admin-modal-input"
                        value={editingOrder.clientPhone}
                        onChange={(e) => setEditingOrder({ ...editingOrder, clientPhone: e.target.value })}
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '11px 13px',
                          borderRadius: '7px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.9rem',
                          color: '#0F172A',
                          background: '#FFFFFF'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                        Email Klien (Opsional)
                      </label>
                      <input
                        type="email"
                        className="admin-modal-input"
                        value={editingOrder.clientEmail || ''}
                        onChange={(e) => setEditingOrder({ ...editingOrder, clientEmail: e.target.value })}
                        placeholder="klien@email.com"
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '11px 13px',
                          borderRadius: '7px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.9rem',
                          color: '#0F172A',
                          background: '#FFFFFF'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 2: RUANG LINGKUP & STATUS */}
                <div style={{ marginBottom: '22px', paddingTop: '16px', borderTop: '1.5px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Layers size={15} color="#0F172A" />
                    <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      2. Ruang Lingkup Proyek &amp; Tipe Status
                    </span>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                      Judul Proyek
                    </label>
                    <input
                      type="text"
                      required
                      className="admin-modal-input"
                      value={editingOrder.projectTitle}
                      onChange={(e) => setEditingOrder({ ...editingOrder, projectTitle: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '11px 13px',
                        borderRadius: '7px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.9rem',
                        color: '#0F172A',
                        background: '#FFFFFF'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                        Tipe Status Proyek
                      </label>
                      <select
                        className="admin-modal-select"
                        value={editingOrder.statusType}
                        onChange={(e) => setEditingOrder({ ...editingOrder, statusType: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 13px',
                          borderRadius: '7px',
                          border: '1.5px solid #CBD5E1',
                          background: '#FFFFFF',
                          fontSize: '0.88rem',
                          fontWeight: '700',
                          color: '#0F172A',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="INQUIRY">INQUIRY (Draf Tanya / Belum DP)</option>
                        <option value="FIX_ORDER">FIX ORDER (DP Lunas &amp; Dikerjakan)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                        Nomor Order Resmi
                      </label>
                      <input
                        type="text"
                        className="admin-modal-input"
                        value={editingOrder.orderNumber || ''}
                        onChange={(e) => setEditingOrder({ ...editingOrder, orderNumber: e.target.value })}
                        placeholder="Contoh: ORD-AT-2026-0042"
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '11px 13px',
                          borderRadius: '7px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.9rem',
                          color: '#0F172A',
                          background: '#FFFFFF'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: PARAMETER FINANSIAL */}
                <div style={{ marginBottom: '22px', paddingTop: '16px', borderTop: '1.5px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Calendar size={15} color="#0F172A" />
                    <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      3. Nilai Investasi &amp; Status Pembayaran
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                        Total Biaya Investasi (Rp)
                      </label>
                      <input
                        type="number"
                        className="admin-modal-input"
                        value={editingOrder.totalInvestment}
                        onChange={(e) => setEditingOrder({ ...editingOrder, totalInvestment: Number(e.target.value) })}
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '11px 13px',
                          borderRadius: '7px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.92rem',
                          fontWeight: '800',
                          color: 'var(--prussian-blue)',
                          background: '#FFFFFF'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                        Status Pembayaran DP
                      </label>
                      <select
                        className="admin-modal-select"
                        value={editingOrder.dpStatus}
                        onChange={(e) => setEditingOrder({ ...editingOrder, dpStatus: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 13px',
                          borderRadius: '7px',
                          border: '1.5px solid #CBD5E1',
                          background: '#FFFFFF',
                          fontSize: '0.88rem',
                          fontWeight: '700',
                          color: '#0F172A',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="MENUNGGU TRANSFER DP 50%">MENUNGGU TRANSFER DP 50%</option>
                        <option value="LUNAS (DP 50%)">LUNAS (DP 50%)</option>
                        <option value="LUNAS 100% (SELESAI)">LUNAS 100% (SELESAI)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                      Target Tanggal Selesai
                    </label>
                    <input
                      type="text"
                      className="admin-modal-input"
                      value={editingOrder.estimatedCompletion || ''}
                      onChange={(e) => setEditingOrder({ ...editingOrder, estimatedCompletion: e.target.value })}
                      placeholder="Contoh: 15 November 2026"
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '11px 13px',
                        borderRadius: '7px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.9rem',
                        color: '#0F172A',
                        background: '#FFFFFF'
                      }}
                    />
                  </div>
                </div>

                {/* SECTION 4: LOG PENGEMBANG */}
                <div style={{ paddingTop: '16px', borderTop: '1.5px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <FileText size={15} color="#0F172A" />
                    <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      4. Catatan Pengembang untuk Klien (Live Log di /lacak)
                    </span>
                  </div>

                  <textarea
                    rows={3}
                    className="admin-modal-textarea"
                    value={editingOrder.developerNotes || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, developerNotes: e.target.value })}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '11px 13px',
                      borderRadius: '7px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.88rem',
                      color: '#0F172A',
                      fontFamily: 'inherit',
                      lineHeight: '1.5'
                    }}
                  />
                  <span style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
                    Catatan ini dibaca secara transparan oleh klien di pelacak status proyek.
                  </span>
                </div>

              </div>

              {/* Modal Grounded Footer */}
              <div 
                style={{ 
                  background: '#F8FAFC', 
                  borderTop: '1.5px solid #E2E8F0', 
                  padding: '16px 28px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  borderRadius: '0 0 16px 16px',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  ID: <strong>{editingOrder.id}</strong>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setEditingOrder(null)}
                    style={{
                      background: '#FFFFFF',
                      color: '#475569',
                      border: '1.5px solid #CBD5E1',
                      borderRadius: '8px',
                      padding: '10px 18px',
                      fontSize: '0.88rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{
                      background: 'var(--prussian-blue)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 22px',
                      fontSize: '0.9rem',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Save size={16} />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: CREATE NEW MANUAL ORDER (Executive Anti-Slop Design)
          ───────────────────────────────────────────────────────────── */}
      {isCreatingNew && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(15, 23, 42, 0.65)', 
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 9999, 
            padding: '20px' 
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCreatingNew(false);
          }}
        >
          <div 
            style={{ 
              background: '#FFFFFF', 
              borderRadius: '16px', 
              maxWidth: '720px', 
              width: '100%', 
              maxHeight: '90vh', 
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.25)',
              border: '1.5px solid #CBD5E1',
              boxSizing: 'border-box',
              animation: 'adminModalSlideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Modal Header */}
            <div style={{ padding: '22px 28px', borderBottom: '1.5px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FolderPlus size={20} color="var(--prussian-blue)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0F172A', margin: 0, letterSpacing: '-0.01em' }}>
                    Tambah Pesanan Baru Manual
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#64748B', margin: '2px 0 0 0' }}>
                    Registrasi proyek langsung dari kesepakatan WhatsApp atau offline ke antrean kerja sistem.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                style={{ 
                  background: '#F8FAFC', 
                  border: '1.5px solid #E2E8F0', 
                  borderRadius: '8px', 
                  width: '32px', 
                  height: '32px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: 'pointer', 
                  color: '#64748B' 
                }}
                aria-label="Tutup modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleCreateNewOrder} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
              <div style={{ overflowY: 'auto', padding: '24px 28px', flex: 1 }}>
                
                {/* SECTION 1: KONTAK & SALURAN KOMUNIKASI */}
                <div style={{ marginBottom: '22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Phone size={15} color="#0F172A" />
                    <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      1. Kontak &amp; Saluran Komunikasi Proyek
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                        Nomor WhatsApp Aktif (Wajib)
                      </label>
                      <input
                        type="text"
                        name="clientPhone"
                        required
                        className="admin-modal-input"
                        placeholder="Contoh: 081234567890"
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '11px 13px',
                          borderRadius: '7px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.9rem',
                          color: '#0F172A',
                          background: '#FFFFFF'
                        }}
                      />
                      <span style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
                        Kunci identifikasi utama untuk lacak pesanan di /lacak
                      </span>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                        Email Klien (Opsional)
                      </label>
                      <input
                        type="email"
                        name="clientEmail"
                        className="admin-modal-input"
                        placeholder="klien@email.com"
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '11px 13px',
                          borderRadius: '7px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.9rem',
                          color: '#0F172A',
                          background: '#FFFFFF'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                      Status Awal Pesanan
                    </label>
                    <select
                      name="statusType"
                      className="admin-modal-select"
                      value={newOrderForm.statusType}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, statusType: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 13px',
                        borderRadius: '7px',
                        border: '1.5px solid #CBD5E1',
                        background: '#FFFFFF',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        color: '#0F172A',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="FIX_ORDER">FIX ORDER (DP 50% Sudah Diterima &amp; Antrean Kerja)</option>
                      <option value="INQUIRY">INQUIRY (Draf Tanya / Menunggu Bukti Transfer DP)</option>
                    </select>
                  </div>
                </div>

                {/* SECTION 2: SPESIFIKASI PROYEK */}
                <div style={{ marginBottom: '22px', paddingTop: '16px', borderTop: '1.5px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Layers size={15} color="#0F172A" />
                    <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      2. Ruang Lingkup &amp; Paket Layanan
                    </span>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                      Judul / Kebutuhan Utama Proyek
                    </label>
                    <input
                      type="text"
                      name="projectTitle"
                      required
                      className="admin-modal-input"
                      placeholder="Contoh: Website Profil Klinik Gigi &amp; Form Reservasi Direct WhatsApp"
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '11px 13px',
                        borderRadius: '7px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.9rem',
                        color: '#0F172A',
                        background: '#FFFFFF'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                        Pilihan Paket Layanan
                      </label>
                      <select
                        name="packageId"
                        className="admin-modal-select"
                        value={newOrderForm.packageId}
                        onChange={(e) => handleNewOrderPackageChange(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '11px 13px',
                          borderRadius: '7px',
                          border: '1.5px solid #CBD5E1',
                          background: '#FFFFFF',
                          fontSize: '0.88rem',
                          fontWeight: '700',
                          color: '#0F172A',
                          cursor: 'pointer'
                        }}
                      >
                        {PACKAGES.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.name} — Rp {p.minPrice.toLocaleString('id-ID')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                        Kategori Segmentasi
                      </label>
                      <select
                        name="category"
                        className="admin-modal-select"
                        value={newOrderForm.category}
                        onChange={(e) => setNewOrderForm({ ...newOrderForm, category: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 13px',
                          borderRadius: '7px',
                          border: '1.5px solid #CBD5E1',
                          background: '#FFFFFF',
                          fontSize: '0.88rem',
                          fontWeight: '700',
                          color: '#0F172A',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="UMKM & Bisnis">UMKM &amp; Bisnis</option>
                        <option value="Standard Enterprise">Company Profile Korporat</option>
                        <option value="Mahasiswa & Akademisi">Tugas Kuliah / Modul Skripsi</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: KEUANGAN & TARGET SELESAI */}
                <div style={{ marginBottom: '22px', paddingTop: '16px', borderTop: '1.5px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Calendar size={15} color="#0F172A" />
                    <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      3. Nilai Investasi &amp; Target Pengerjaan
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                        Total Biaya Disepakati (Rp)
                      </label>
                      <input
                        type="number"
                        name="totalInvestment"
                        className="admin-modal-input"
                        value={newOrderForm.totalInvestment}
                        onChange={(e) => setNewOrderForm({ ...newOrderForm, totalInvestment: Number(e.target.value) })}
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '11px 13px',
                          borderRadius: '7px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.92rem',
                          fontWeight: '800',
                          color: 'var(--prussian-blue)',
                          background: '#FFFFFF'
                        }}
                      />
                      <span style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
                        Uang Muka DP 50%: <strong>{formatRupiah(Math.round((newOrderForm.totalInvestment || 0) / 2))}</strong>
                      </span>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                        Target Tanggal Selesai
                      </label>
                      <input
                        type="text"
                        name="estimatedCompletion"
                        className="admin-modal-input"
                        placeholder="Contoh: 18 November 2026 atau 7 Hari Kerja"
                        defaultValue="7 Hari Kerja"
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '11px 13px',
                          borderRadius: '7px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.9rem',
                          color: '#0F172A',
                          background: '#FFFFFF'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 4: LOG PENGEMBANG AWAL */}
                <div style={{ paddingTop: '16px', borderTop: '1.5px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <FileText size={15} color="#0F172A" />
                    <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      4. Catatan Pengembang Awal (Live Log di /lacak)
                    </span>
                  </div>

                  <textarea
                    name="developerNotes"
                    rows={2}
                    className="admin-modal-textarea"
                    defaultValue="Pesanan resmi terdaftar. Menyiapkan repositori kode sumber dan perancangan skema basis data."
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '11px 13px',
                      borderRadius: '7px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.88rem',
                      color: '#0F172A',
                      fontFamily: 'inherit',
                      lineHeight: '1.5'
                    }}
                  />
                  <span style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
                    Catatan ini akan langsung terlihat oleh klien saat memasukkan nomor tiket di halaman /lacak.
                  </span>
                </div>

              </div>

              {/* Modal Grounded Footer */}
              <div 
                style={{ 
                  background: '#F8FAFC', 
                  borderTop: '1.5px solid #E2E8F0', 
                  padding: '16px 28px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  borderRadius: '0 0 16px 16px',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  Tersinkronisasi ke <strong>/lacak</strong> &amp; <strong>Spreadsheet</strong>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(false)}
                    style={{
                      background: '#FFFFFF',
                      color: '#475569',
                      border: '1.5px solid #CBD5E1',
                      borderRadius: '8px',
                      padding: '10px 18px',
                      fontSize: '0.88rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{
                      background: 'var(--prussian-blue)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 22px',
                      fontSize: '0.9rem',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Plus size={16} />
                    <span>Daftarkan ke Sistem</span>
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}


      {/* ─────────────────────────────────────────────────────────────
          MODAL: CATAT SESI REVISI PROYEK (Executive Anti-Slop Design)
          ───────────────────────────────────────────────────────────── */}
      {revisionModalOrder && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(15, 23, 42, 0.65)', 
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 9999, 
            padding: '20px' 
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setRevisionModalOrder(null);
          }}
        >
          <div 
            style={{ 
              background: '#FFFFFF', 
              borderRadius: '16px', 
              maxWidth: '580px', 
              width: '100%', 
              maxHeight: '90vh', 
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.25)',
              border: '1.5px solid #CBD5E1',
              boxSizing: 'border-box',
              animation: 'adminModalSlideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Modal Header */}
            <div style={{ padding: '22px 28px', borderBottom: '1.5px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0F172A', margin: 0, letterSpacing: '-0.01em' }}>
                  Catat Sesi Revisi Proyek
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748B', margin: '4px 0 0 0' }}>
                  Pesanan: <strong>{revisionModalOrder.id}</strong> &bull; Sesi ke-{(revisionModalOrder.revisionQuotaUsed || 0) + 1} dari {revisionModalOrder.revisionQuotaTotal || 3}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setRevisionModalOrder(null)}
                style={{ 
                  background: '#F8FAFC', 
                  border: '1.5px solid #E2E8F0', 
                  borderRadius: '8px', 
                  width: '32px', 
                  height: '32px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: 'pointer', 
                  color: '#64748B' 
                }}
                aria-label="Tutup modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSaveRevisionRecord} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ padding: '24px 28px', flex: 1 }}>
                
                {/* Info Pill */}
                <div style={{ background: '#EFF6FF', border: '1.5px solid #BFDBFE', borderRadius: '8px', padding: '12px 16px', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--prussian-blue)' }}>
                      Sesi yang akan dicatat: Sesi ke-{(revisionModalOrder.revisionQuotaUsed || 0) + 1}
                    </span>
                    <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '2px' }}>
                      Sisa kuota revisi SOP setelah sesi ini: {(revisionModalOrder.revisionQuotaTotal || 3) - (revisionModalOrder.revisionQuotaUsed || 0) - 1} sesi
                    </div>
                  </div>
                  <span style={{ fontSize: '0.78rem', background: '#FFFFFF', padding: '4px 8px', borderRadius: '4px', fontWeight: '700', color: '#0F172A', border: '1.5px solid #CBD5E1' }}>
                    Hari ini
                  </span>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.86rem', fontWeight: '800', color: '#0F172A', display: 'block', marginBottom: '8px' }}>
                    Rincian Catatan Revisi dari Klien (Wajib):
                  </label>
                  <textarea
                    rows={4}
                    value={revisionNoteInput}
                    onChange={(e) => {
                      setRevisionNoteInput(e.target.value);
                      if (revisionNoteError) setRevisionNoteError('');
                    }}
                    placeholder="Tuliskan secara spesifik apa saja yang direvisi (misal: penyesuaian susunan menu header mobile, revisi warna tombol checkout, perbaikan validasi nomor telepon di form pemesanan)..."
                    autoFocus
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: revisionNoteError ? '1.5px solid #DC2626' : '1.5px solid #CBD5E1',
                      fontSize: '0.9rem',
                      color: '#0F172A',
                      fontFamily: 'inherit',
                      lineHeight: '1.5',
                      outline: 'none'
                    }}
                  />
                  {revisionNoteError && (
                    <div style={{ fontSize: '0.82rem', color: '#DC2626', fontWeight: '700', marginTop: '6px' }}>
                      {revisionNoteError}
                    </div>
                  )}
                  <span style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '6px', display: 'block' }}>
                    Catatan ini otomatis tampil di pelacak status /lacak klien, tersimpan ke basis data, dan terarsip ke spreadsheet.
                  </span>
                </div>

              </div>

              {/* Footer */}
              <div 
                style={{ 
                  background: '#F8FAFC', 
                  borderTop: '1.5px solid #E2E8F0', 
                  padding: '16px 28px', 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: '10px',
                  borderRadius: '0 0 16px 16px'
                }}
              >
                <button
                  type="button"
                  onClick={() => setRevisionModalOrder(null)}
                  style={{
                    background: '#FFFFFF',
                    color: '#475569',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: '8px',
                    padding: '10px 18px',
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    background: 'var(--prussian-blue)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 22px',
                    fontSize: '0.9rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Save size={16} />
                  <span>Simpan Catatan Revisi</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
