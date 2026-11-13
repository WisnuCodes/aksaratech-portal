import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Card,
  Chip,
  Tabs,
  Tab,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  IconButton,
  Divider,
  Alert,
  InputAdornment,
  ThemeProvider,
  createTheme
} from '@mui/material';
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
  Eye, 
  ExternalLink, 
  Check, 
  RotateCcw, 
  AlertCircle,
  FileText,
  Save,
  Copy,
  Database,
  FolderPlus,
  Calendar,
  Layers,
  X,
  History,
  Phone,
  KeyRound
} from 'lucide-react';
import { 
  getAllOrders, 
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
  syncDeleteOrderFromSheet,
  syncAllOrdersToSheet 
} from '../utils/orderStorage';
import { PACKAGES } from '../data/catalogData';
import { formatRupiah, generateInquiryId } from '../utils/documentEngine';

// Default Admin Security PIN
const DEFAULT_ADMIN_PIN = '2026';

// Executive Material UI Theme (Taste Skill & Anti-Slop Compliant)
const adminTheme = createTheme({
  typography: {
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    button: {
      textTransform: 'none',
      fontWeight: 800
    }
  },
  palette: {
    primary: {
      main: '#0F172A',
      dark: '#020617',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#1D63FF',
      dark: '#144ECC',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569'
    },
    divider: '#CBD5E1'
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        }
      }
    },
    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1.5px solid #CBD5E1',
          borderRadius: 12
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          boxShadow: 'none'
        }
      }
    }
  }
});

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
  const handleVerifyDP = async (order) => {
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

    const config = getSheetConfig();
    const hasSheet = config?.webhookUrl && config.webhookUrl.trim().startsWith('http');
    if (hasSheet) {
      await syncOrderToSheet(updated, 'update');
      triggerSuccess(`Inquiry ${order.id} berhasil diverifikasi menjadi Fix Order (${nextOrderNumber}) dan otomatis disinkronkan ke Google Spreadsheet!`);
    } else {
      triggerSuccess(`Inquiry ${order.id} berhasil diverifikasi menjadi Fix Order (${nextOrderNumber})!`);
    }
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

  const handleSaveRevisionRecord = async (e) => {
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

    setRevisionModalOrder(null);
    setRevisionNoteInput('');
    updateOrder(updated);
    setOrders(getAllOrders());

    const config = getSheetConfig();
    const hasSheet = config?.webhookUrl && config.webhookUrl.trim().startsWith('http');
    if (hasSheet) {
      await syncOrderToSheet(updated, 'update');
      triggerSuccess(`Catatan Sesi Revisi ke-${nextSessionNum} untuk pesanan ${updated.id} berhasil disimpan dan disinkronkan ke Google Spreadsheet!`);
    } else {
      triggerSuccess(`Catatan Sesi Revisi ke-${nextSessionNum} untuk pesanan ${updated.id} berhasil disimpan!`);
    }
  };

  const handleDeleteLastRevision = async (order) => {
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

      const config = getSheetConfig();
      const hasSheet = config?.webhookUrl && config.webhookUrl.trim().startsWith('http');
      if (hasSheet) {
        await syncOrderToSheet(updated, 'update');
        triggerSuccess(`Catatan Sesi Revisi ke-${lastSession.sessionNumber} berhasil dibatalkan dan disinkronkan ke Google Spreadsheet.`);
      } else {
        triggerSuccess(`Catatan Sesi Revisi ke-${lastSession.sessionNumber} berhasil dibatalkan.`);
      }
    }
  };

  // Update Stage Number Handler
  const handleStageChange = async (order, newStage) => {
    const updated = {
      ...order,
      currentStageNumber: Number(newStage),
      dpStatus: Number(newStage) === 5 ? 'LUNAS 100% (SELESAI)' : order.dpStatus
    };
    updateOrder(updated);
    setOrders(getAllOrders());

    const config = getSheetConfig();
    const hasSheet = config?.webhookUrl && config.webhookUrl.trim().startsWith('http');
    if (hasSheet) {
      await syncOrderToSheet(updated, 'update');
      triggerSuccess(`Tahap SOP pesanan ${order.id} diperbarui ke Tahap ${newStage} dan otomatis disinkronkan ke Google Spreadsheet.`);
    } else {
      triggerSuccess(`Tahap SOP pesanan ${order.id} diperbarui ke Tahap ${newStage}.`);
    }
  };

  // Delete Order Handler (Auto-Delete across local storage and Google Spreadsheet)
  const handleDeleteOrder = async (order) => {
    const config = getSheetConfig();
    const hasSheet = config?.webhookUrl && config.webhookUrl.trim().startsWith('http');
    const confirmMsg = hasSheet
      ? `Hapus catatan pesanan ${order.id} (${order.projectTitle})?\n\n• Data akan dihapus dari sistem lokal.\n• Baris pesanan di Google Spreadsheet yang terhubung akan OTOMATIS DIHAPUS langsung melalui Web App tanpa perlu menghapus manual!`
      : `Hapus catatan pesanan ${order.id} (${order.projectTitle})?\n\nData akan dihapus secara permanen dari sistem dan pelacak.`;

    if (window.confirm(confirmMsg)) {
      triggerSuccess(`Sedang menghapus pesanan ${order.id}${hasSheet ? ' & menghapus baris di Google Spreadsheet...' : '...'}`);
      if (hasSheet) {
        await syncDeleteOrderFromSheet(order);
      }
      deleteOrder(order);
      setOrders(getAllOrders());
      if (hasSheet) {
        triggerSuccess(`Pesanan ${order.id} berhasil dihapus permanen dari sistem dan baris Google Spreadsheet telah dihapus otomatis!`);
      } else {
        triggerSuccess(`Pesanan ${order.id} berhasil dihapus permanen dari sistem lokal.`);
      }
    }
  };

  // Clear All Orders Handler
  const handleClearAllOrders = async () => {
    const config = getSheetConfig();
    const hasSheet = config?.webhookUrl && config.webhookUrl.trim().startsWith('http');
    const confirmMsg = hasSheet
      ? 'PERINGATAN: Apakah Anda yakin ingin MENGHAPUS SEMUA DATA PESANAN secara permanen?\n\n• Semua data di sistem lokal dan pelacak akan dibersihkan total.\n• Seluruh baris di Google Spreadsheet juga akan OTOMATIS DIHAPUS (header tabel tetap rapi).'
      : 'PERINGATAN: Apakah Anda yakin ingin MENGHAPUS SEMUA DATA PESANAN secara permanen?\n\nSemua data inquiry, pesanan fix, dan draf brief lokal di browser akan dibersihkan total. Tampilan pelacak (/lacak) akan bersih dan kosong.';

    if (window.confirm(confirmMsg)) {
      triggerSuccess(`Mengosongkan database pesanan${hasSheet ? ' & Google Spreadsheet...' : '...'}`);
      clearAllOrders();
      setOrders([]);
      if (hasSheet) {
        await syncAllOrdersToSheet();
        triggerSuccess('Seluruh database pesanan dan Google Spreadsheet berhasil dikosongkan total.');
      } else {
        triggerSuccess('Seluruh database pesanan dan draf brief lokal berhasil dikosongkan.');
      }
    }
  };

  // Reset Demo Orders Handler
  const handleResetDemoOrders = async () => {
    if (window.confirm('Muat ulang 4 data contoh pesanan awal untuk pengujian sistem?\n\nJika Google Spreadsheet terhubung, data contoh akan otomatis disinkronkan ke spreadsheet.')) {
      const restored = resetToDefaultOrders();
      setOrders(restored);
      const config = getSheetConfig();
      const hasSheet = config?.webhookUrl && config.webhookUrl.trim().startsWith('http');
      if (hasSheet) {
        await syncAllOrdersToSheet();
        triggerSuccess('Data contoh awal berhasil dimuat kembali dan disinkronkan ke Google Spreadsheet.');
      } else {
        triggerSuccess('Data contoh awal berhasil dimuat kembali ke sistem.');
      }
    }
  };

  // Save Edit Order Form (Auto-Update Google Spreadsheet)
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingOrder) return;

    const target = { ...editingOrder };
    setEditingOrder(null);
    triggerSuccess(`Menyimpan perubahan pesanan ${target.id} & menyinkronkan ke Google Spreadsheet...`);

    updateOrder(target);
    setOrders(getAllOrders());

    const config = getSheetConfig();
    const hasSheet = config?.webhookUrl && config.webhookUrl.trim().startsWith('http');
    if (hasSheet) {
      await syncOrderToSheet(target, 'update');
      triggerSuccess(`Perubahan pesanan ${target.id} berhasil disimpan dan otomatis diperbarui di Google Spreadsheet!`);
    } else {
      triggerSuccess(`Perubahan pesanan ${target.id} berhasil disimpan.`);
    }
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

  // Save New Manual Order Form (Auto-Append to Google Spreadsheet)
  const handleCreateNewOrder = async (e) => {
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

    const config = getSheetConfig();
    const hasSheet = config?.webhookUrl && config.webhookUrl.trim().startsWith('http');
    if (hasSheet) {
      await syncOrderToSheet(newOrder, 'append');
      triggerSuccess(`Pesanan baru ${newOrder.id} (${newOrder.projectTitle}) berhasil didaftarkan dan langsung masuk ke Google Spreadsheet!`);
    } else {
      triggerSuccess(`Pesanan baru ${newOrder.id} (${newOrder.projectTitle}) berhasil ditambahkan ke sistem!`);
    }
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
  const googleAppsScriptCode = `// KODE GOOGLE APPS SCRIPT EKSEKUTIF AKSARA TECH (LIVE AUTO-SYNC & AUTO-DELETE v2.2)
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
    "message": "Webhook Aksara Tech aktif, terhubung normal, dan siap menerima sinkronisasi otomatis (Tambah, Edit, Hapus, Kosongkan)."
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
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }
    
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
    
    // AKSI 3: HAPUS 1 PESANAN (Otomatis hapus baris saat Admin klik tombol Hapus di web)
    if (data.action === "delete") {
      ensureHeader(sheet);
      var lastRow = sheet.getLastRow();
      var targetId = String(data.id || data.orderId || "").trim();
      var targetOrderNo = String(data.orderNumber || "").trim();
      var deleted = false;
      var deletedCount = 0;

      if (lastRow > 1 && (targetId || targetOrderNo)) {
        var range = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
        for (var i = range.length - 1; i >= 0; i--) {
          var rowId = String(range[i][0] || "").trim();
          var rowOrderNo = String(range[i][1] || "").trim();

          var isMatch = false;
          if (targetId && (rowId === targetId || rowOrderNo === targetId)) {
            isMatch = true;
          } else if (targetOrderNo && targetOrderNo !== "-" && targetOrderNo !== "MENUNGGU-DP" && (rowOrderNo === targetOrderNo || rowId === targetOrderNo)) {
            isMatch = true;
          }

          if (isMatch) {
            sheet.deleteRow(i + 2);
            deleted = true;
            deletedCount++;
          }
        }
      }
      applySheetStyling(sheet);
      return ContentService.createTextOutput(JSON.stringify({
        "result": "success",
        "action": "delete",
        "deleted": deleted,
        "deletedCount": deletedCount,
        "id": targetId,
        "orderNumber": targetOrderNo
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // AKSI 4: UPDATE ATAU TAMBAH PESANAN TUNGGAL (Edit rincian, ubah status DP, atau ganti tahap)
    var targetOrder = data.order || data;
    ensureHeader(sheet);
    var lastRow = sheet.getLastRow();
    var updated = false;
    var targetId = String(targetOrder.id || "").trim();
    var targetOrderNo = String(targetOrder.orderNumber || "").trim();
    
    if (lastRow > 1 && (targetId || targetOrderNo)) {
      var idList = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
      for (var r = 0; r < idList.length; r++) {
        var rowId = String(idList[r][0] || "").trim();
        var rowOrderNo = String(idList[r][1] || "").trim();

        var isMatch = false;
        if (targetId && (rowId === targetId || rowOrderNo === targetId)) {
          isMatch = true;
        } else if (targetOrderNo && targetOrderNo !== "-" && targetOrderNo !== "MENUNGGU-DP" && (rowOrderNo === targetOrderNo || rowId === targetOrderNo)) {
          isMatch = true;
        }

        if (isMatch) {
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
      <ThemeProvider theme={adminTheme}>
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: '#F8FAFC',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 2.5, sm: 4 },
            boxSizing: 'border-box'
          }}
        >
          {/* Status Chip */}
          <Chip
            label="Aksara Tech • Restricted Internal Access"
            icon={<Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22C55E', ml: '4px !important' }} />}
            sx={{
              bgcolor: '#FFFFFF',
              border: '1.5px solid #CBD5E1',
              fontWeight: 800,
              fontSize: '0.8rem',
              color: '#0F172A',
              mb: 3,
              py: 0.5,
              px: 1,
              borderRadius: '999px',
              letterSpacing: '0.04em'
            }}
          />

          {/* Security Card Container */}
          <Card
            sx={{
              maxWidth: 460,
              width: '100%',
              p: { xs: 3.5, sm: 4.5 },
              border: '2px solid #0F172A',
              borderRadius: '16px',
              textAlign: 'center',
              bgcolor: '#FFFFFF',
              boxSizing: 'border-box'
            }}
          >
            {/* Security Icon Badge */}
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '12px',
                bgcolor: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2.5
              }}
            >
              <KeyRound size={26} color="#FFFFFF" />
            </Box>

            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 900,
                color: '#0F172A',
                mb: 1,
                letterSpacing: '-0.01em',
                lineHeight: 1.25
              }}
            >
              Pusat Otentikasi Workspace
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: '#334155',
                mb: 3.5,
                lineHeight: 1.55,
                fontSize: '0.92rem'
              }}
            >
              Akses verifikasi pembayaran DP 50%, pembaruan tahapan koding SOP, dan sinkronisasi repositori berkas proyek.
            </Typography>

            <Box component="form" onSubmit={handlePinSubmit}>
              <Box sx={{ mb: 3, textAlign: 'left' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography
                    variant="caption"
                    component="label"
                    sx={{ fontSize: '0.84rem', fontWeight: 800, color: '#0F172A' }}
                  >
                    PIN Keamanan Pengembang
                  </Typography>
                  <Button
                    type="button"
                    variant="text"
                    onClick={() => setPinInput(DEFAULT_ADMIN_PIN)}
                    sx={{
                      p: 0,
                      minWidth: 'auto',
                      color: '#1D63FF',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                    }}
                  >
                    Gunakan Default (2026)
                  </Button>
                </Box>

                <TextField
                  fullWidth
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError('');
                  }}
                  placeholder="••••"
                  autoFocus
                  error={Boolean(pinError)}
                  helperText={pinError}
                  slotProps={{
                    htmlInput: {
                      maxLength: 8,
                      style: {
                        textAlign: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 900,
                        letterSpacing: '0.4em',
                        padding: '14px 16px'
                      }
                    }
                  }}
                  sx={{
                    bgcolor: '#F8FAFC',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      '& fieldset': {
                        border: pinError ? '2px solid #DC2626' : '2px solid #0F172A'
                      },
                      '&:hover fieldset': {
                        borderColor: pinError ? '#DC2626' : '#0F172A'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: pinError ? '#DC2626' : '#1D63FF'
                      }
                    },
                    '& .MuiFormHelperText-root': {
                      textAlign: 'center',
                      fontWeight: 800,
                      fontSize: '0.84rem',
                      color: '#DC2626',
                      mt: 1
                    }
                  }}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                startIcon={<ShieldCheck size={18} />}
                sx={{
                  bgcolor: '#0F172A',
                  color: '#FFFFFF',
                  py: 1.75,
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  borderRadius: '10px',
                  '&:hover': { bgcolor: '#1E293B' }
                }}
              >
                Buka Akses Workspace
              </Button>
            </Box>

            {/* Discreet Meta Footnote */}
            <Divider sx={{ my: 3, borderColor: '#E2E8F0', borderWidth: '1.5px' }} />

            <Stack spacing={1} sx={{ fontSize: '0.82rem', color: '#64748B' }}>
              <Box>
                <span>PIN Standar Pengembang: </span>
                <Box
                  component="code"
                  sx={{
                    background: '#F1F5F9',
                    px: 1,
                    py: 0.25,
                    borderRadius: '4px',
                    fontWeight: 800,
                    color: '#0F172A',
                    border: '1.5px solid #CBD5E1'
                  }}
                >
                  2026
                </Box>
              </Box>
              <Button
                component={Link}
                to="/"
                variant="text"
                sx={{
                  color: '#475569',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                }}
              >
                &larr; Kembali ke Beranda Aksara Tech
              </Button>
            </Stack>

          </Card>
        </Box>
      </ThemeProvider>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER AUTHENTICATED ADMIN DASHBOARD
  // ─────────────────────────────────────────────────────────────
  return (
    <ThemeProvider theme={adminTheme}>
      <Box className="admin-page" sx={{ bgcolor: '#F8FAFC', minHeight: '100vh', pb: 12 }}>
        
        {/* Top Banner Bar */}
        <Box component="header" sx={{ bgcolor: '#0F172A', color: '#FFFFFF', py: 1.75, borderBottom: '1.5px solid #1E293B' }}>
          <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box component="span" sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: '#22C55E', display: 'inline-block' }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Typography variant="subtitle1" component="span" sx={{ fontWeight: 900, letterSpacing: '-0.01em', color: '#FFFFFF', fontSize: '1.02rem' }}>
                  AKSARA TECH
                </Typography>
                <Typography component="span" sx={{ color: '#475569', fontWeight: 400 }}>/</Typography>
                <Typography variant="body2" component="span" sx={{ color: '#CBD5E1', fontWeight: 700, fontSize: '0.86rem' }}>
                  Pusat Kendali Produksi
                </Typography>
                {sheetConfig.webhookUrl && sheetConfig.webhookUrl.trim().startsWith('http') ? (
                  <Chip
                    size="small"
                    label="Live Sheet: Terhubung Otomatis"
                    onClick={() => setActiveTab('SPREADSHEET')}
                    sx={{
                      ml: 1,
                      height: 22,
                      bgcolor: '#064E3B',
                      color: '#6EE7B7',
                      border: '1.5px solid #059669',
                      fontWeight: 800,
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#047857' }
                    }}
                  />
                ) : (
                  <Chip
                    size="small"
                    label="Live Sheet: Belum Terhubung"
                    onClick={() => setActiveTab('SPREADSHEET')}
                    sx={{
                      ml: 1,
                      height: 22,
                      bgcolor: '#78350F',
                      color: '#FDE68A',
                      border: '1.5px solid #D97706',
                      fontWeight: 800,
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#92400E' }
                    }}
                  />
                )}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/lacak"
                target="_blank"
                startIcon={<Eye size={14} />}
                sx={{
                  bgcolor: '#1E293B',
                  color: '#FFFFFF',
                  border: '1.5px solid #334155',
                  px: 1.75,
                  py: 0.9,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  borderRadius: '6px',
                  '&:hover': { bgcolor: '#334155' }
                }}
              >
                Tinjau Pelacak (/lacak)
              </Button>

              <Button
                onClick={exportOrdersToExcel}
                startIcon={<FileSpreadsheet size={14} />}
                sx={{
                  bgcolor: '#1E293B',
                  color: '#FFFFFF',
                  border: '1.5px solid #334155',
                  px: 1.75,
                  py: 0.9,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  borderRadius: '6px',
                  '&:hover': { bgcolor: '#334155' }
                }}
                title="Unduh format spreadsheet rapi dengan kolom terpisah, warna header, dan penataan nomor telepon"
              >
                Ekspor Excel (.xls)
              </Button>

              <Button
                onClick={exportOrdersToCSV}
                sx={{
                  bgcolor: '#1E293B',
                  color: '#CBD5E1',
                  border: '1.5px solid #334155',
                  px: 1.5,
                  py: 0.9,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  borderRadius: '6px',
                  '&:hover': { bgcolor: '#334155', color: '#FFFFFF' }
                }}
                title="Unduh format CSV standar dengan pemisah titik koma"
              >
                CSV (.csv)
              </Button>

              <Button
                onClick={handleLogout}
                startIcon={<LogOut size={14} />}
                sx={{
                  bgcolor: 'transparent',
                  color: '#CBD5E1',
                  border: '1.5px solid #475569',
                  px: 1.75,
                  py: 0.9,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  borderRadius: '6px',
                  '&:hover': { borderColor: '#EF4444', color: '#EF4444' }
                }}
              >
                Keluar
              </Button>
            </Box>

          </Container>
        </Box>

        {/* Main Container */}
        <Container maxWidth="lg" sx={{ mt: 4.5, px: { xs: 2.5, sm: 3 } }}>
          
          {/* Success Alert Banner */}
          {actionSuccessMsg && (
            <Alert
              icon={<CheckCircle2 size={18} color="#16A34A" />}
              sx={{
                bgcolor: '#F0FDF4',
                border: '1.5px solid #22C55E',
                color: '#166534',
                mb: 3,
                fontWeight: 700,
                fontSize: '0.92rem',
                borderRadius: '8px',
                '& .MuiAlert-message': { display: 'flex', alignItems: 'center' }
              }}
            >
              {actionSuccessMsg}
            </Alert>
          )}

          {/* Dashboard Title & Quick Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 3.5 }}>
            <Box>
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  fontSize: 'clamp(1.3rem, 2.2vw, 1.6rem)',
                  fontWeight: 900,
                  color: '#0F172A',
                  letterSpacing: '-0.01em',
                  mb: 0.75,
                  lineHeight: 1.25
                }}
              >
                Pusat Kendali Pesanan &amp; SOP Produksi
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569', maxWidth: 780, lineHeight: 1.5, fontSize: '0.94rem' }}>
                Verifikasi transfer DP 50%, kelola tahapan koding 5-langkah SOP, dan catat pemakaian kuota revisi proyek.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
              <Button
                variant="outlined"
                onClick={handleClearAllOrders}
                startIcon={<Trash2 size={15} />}
                sx={{
                  bgcolor: '#FFFFFF',
                  color: '#DC2626',
                  borderColor: '#CBD5E1',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '8px',
                  px: 1.75,
                  py: 1.25,
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  '&:hover': { bgcolor: '#FEE2E2', borderColor: '#DC2626' }
                }}
                title="Hapus seluruh data pesanan lokal dan kosongkan pelacak"
              >
                Kosongkan Data
              </Button>

              <Button
                variant="outlined"
                onClick={handleResetDemoOrders}
                startIcon={<RotateCcw size={15} />}
                sx={{
                  bgcolor: '#FFFFFF',
                  color: '#0F172A',
                  borderColor: '#CBD5E1',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '8px',
                  px: 1.75,
                  py: 1.25,
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  '&:hover': { bgcolor: '#F1F5F9', borderColor: '#0F172A' }
                }}
                title="Muat ulang 4 data contoh awal untuk pengujian"
              >
                Muat Ulang Contoh
              </Button>

              <Button
                variant="contained"
                onClick={handleOpenCreateModal}
                startIcon={<Plus size={17} />}
                sx={{
                  bgcolor: '#1D63FF',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  px: 2.25,
                  py: 1.25,
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  '&:hover': { bgcolor: '#144ECC' }
                }}
              >
                Tambah Pesanan Manual
              </Button>
            </Box>
          </Box>

          {/* 4 Overview Metric Cards */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
            
            <Card sx={{ border: '1.5px solid #CBD5E1', borderRadius: '12px', bgcolor: '#FFFFFF', p: 2.75 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" sx={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Total Seluruh Pesanan
                </Typography>
                <Database size={16} color="#0F172A" />
              </Box>
              <Typography variant="h4" sx={{ fontSize: '2.1rem', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>
                {metrics.total}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.78rem', color: '#64748B', mt: 1.25, display: 'block' }}>
                Tersimpan di database &amp; storage
              </Typography>
            </Card>

            <Card sx={{ border: '1.5px solid #CBD5E1', borderRadius: '12px', bgcolor: '#FFFFFF', p: 2.75 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" sx={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Inquiry Baru (Menunggu DP)
                </Typography>
                <Clock size={16} color="#D97706" />
              </Box>
              <Typography variant="h4" sx={{ fontSize: '2.1rem', fontWeight: 900, color: '#D97706', lineHeight: 1 }}>
                {metrics.inquiries}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.78rem', color: '#64748B', mt: 1.25, display: 'block' }}>
                Calon klien konsultasi / belum bayar
              </Typography>
            </Card>

            <Card sx={{ border: '1.5px solid #CBD5E1', borderRadius: '12px', bgcolor: '#FFFFFF', p: 2.75 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" sx={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Fix Order Aktif (Dikoding)
                </Typography>
                <Layers size={16} color="#1D63FF" />
              </Box>
              <Typography variant="h4" sx={{ fontSize: '2.1rem', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>
                {metrics.activeFix}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.78rem', color: '#64748B', mt: 1.25, display: 'block' }}>
                DP 50% lunas &amp; masuk antrean kerja
              </Typography>
            </Card>

            <Card sx={{ border: '1.5px solid #CBD5E1', borderRadius: '12px', bgcolor: '#FFFFFF', p: 2.75 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" sx={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Selesai &amp; Lunas 100%
                </Typography>
                <CheckCircle2 size={16} color="#16A34A" />
              </Box>
              <Typography variant="h4" sx={{ fontSize: '2.1rem', fontWeight: 900, color: '#16A34A', lineHeight: 1 }}>
                {metrics.completed}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.78rem', color: '#64748B', mt: 1.25, display: 'block' }}>
                Master Code diserahkan &amp; garansi jalan
              </Typography>
            </Card>

          </Box>

          {/* Navigation Tabs & Search Row */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            
            {/* Segmented Filter Tabs */}
            <Tabs
              value={activeTab}
              onChange={(e, val) => setActiveTab(val)}
              sx={{
                bgcolor: '#E2E8F0',
                p: '4px',
                borderRadius: '8px',
                minHeight: 'auto',
                '& .MuiTabs-indicator': { display: 'none' }
              }}
            >
              {[
                { id: 'ALL', label: `Semua Pesanan (${metrics.total})` },
                { id: 'INQUIRY', label: `Inquiry (${metrics.inquiries})` },
                { id: 'FIX_ORDER', label: `Fix Order (${metrics.activeFix})` },
                { id: 'COMPLETED', label: `Selesai (${metrics.completed})` },
                { id: 'SPREADSHEET', label: 'Sinkronisasi Spreadsheet' }
              ].map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <Tab
                    key={tab.id}
                    value={tab.id}
                    label={tab.label}
                    sx={{
                      minHeight: 36,
                      py: 1,
                      px: 1.75,
                      borderRadius: '6px',
                      fontWeight: isActive ? 800 : 600,
                      fontSize: '0.84rem',
                      color: isActive ? '#FFFFFF !important' : '#334155',
                      bgcolor: isActive ? '#0F172A' : 'transparent',
                      transition: 'background 0.15s, color 0.15s'
                    }}
                  />
                );
              })}
            </Tabs>

            {/* Search Box */}
            {activeTab !== 'SPREADSHEET' && (
              <TextField
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari ID tiket, judul, atau WhatsApp..."
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={16} color="#64748B" />
                      </InputAdornment>
                    )
                  }
                }}
                sx={{
                  width: { xs: '100%', sm: 300 },
                  bgcolor: '#FFFFFF',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    fontSize: '0.86rem',
                    color: '#0F172A',
                    '& fieldset': { border: '1.5px solid #CBD5E1' },
                    '&:hover fieldset': { borderColor: '#0F172A' },
                    '&.Mui-focused fieldset': { borderColor: '#1D63FF' }
                  }
                }}
              />
            )}

          </Box>

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
            <p style={{ fontSize: '0.94rem', color: '#475569', margin: '0 0 20px 0', lineHeight: '1.5' }}>
              Hubungkan portal Aksara Tech dengan Google Spreadsheet Anda untuk sinkronisasi otomatis dua arah tanpa memerlukan biaya sewa server bulanan.
            </p>

            {/* Live Auto-Sync & Auto-Delete Callout */}
            <div style={{ background: '#F0FDF4', border: '1.5px solid #86EFAC', borderRadius: '10px', padding: '16px 20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <CheckCircle2 size={18} color="#16A34A" />
                <span style={{ fontSize: '0.92rem', fontWeight: '800', color: '#166534' }}>
                  Fitur Live Auto-Sync, Auto-Edit &amp; Auto-Delete Aktif
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#166534', lineHeight: '1.6' }}>
                Setiap tindakan di dashboard admin (<strong>Hapus Pesanan</strong>, <strong>Edit Rincian</strong>, <strong>Verifikasi DP 50%</strong>, atau <strong>Ubah Tahap SOP</strong>) sekarang <strong>langsung terhubung dan otomatis memperbarui Google Spreadsheet</strong> secara instan. Anda tidak perlu lagi repot menghapus atau mengubah baris secara manual di Google Sheets.
              </p>
            </div>

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
          <Stack spacing={2.5}>
            
            {filteredOrders.length === 0 ? (
              <Card sx={{ border: '1.5px solid #CBD5E1', borderRadius: '12px', p: 6, textAlign: 'center', bgcolor: '#FFFFFF' }}>
                <AlertCircle size={32} color="#64748B" style={{ margin: '0 auto 12px auto' }} />
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                  {orders.length === 0 ? 'Seluruh Database Pesanan Sedang Kosong' : 'Tidak Ada Pesanan pada Kategori Ini'}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', mb: orders.length === 0 ? 2.5 : 0, maxWidth: 600, mx: 'auto' }}>
                  {orders.length === 0 
                    ? 'Semua pesanan telah dihapus. Halaman pelacak (/lacak) saat ini bersih dan tidak menampilkan order apa pun. Anda dapat menambah pesanan baru atau memuat ulang data contoh.'
                    : 'Gunakan tombol "Tambah Pesanan Manual" di kanan atas jika ada pesanan langsung dari WhatsApp.'}
                </Typography>
                {orders.length === 0 && (
                  <Button
                    variant="outlined"
                    onClick={handleResetDemoOrders}
                    startIcon={<RotateCcw size={15} />}
                    sx={{
                      bgcolor: '#F1F5F9',
                      color: '#0F172A',
                      borderColor: '#CBD5E1',
                      border: '1.5px solid #CBD5E1',
                      borderRadius: '6px',
                      px: 2,
                      py: 1,
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      '&:hover': { bgcolor: '#E2E8F0', borderColor: '#0F172A' }
                    }}
                  >
                    Muat Ulang 4 Contoh Data Awal
                  </Button>
                )}
              </Card>
            ) : (
              filteredOrders.map(ord => {
                const isInquiry = ord.statusType === 'INQUIRY';
                const isCompleted = ord.currentStageNumber === 5;

                return (
                  <Card
                    key={ord.id}
                    sx={{
                      border: '1.5px solid #CBD5E1',
                      borderRadius: '12px',
                      p: { xs: 2.5, sm: 3 },
                      bgcolor: '#FFFFFF',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2.25
                    }}
                  >
                    {/* Header Row */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1.75 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                          {/* Status Badge */}
                          {isInquiry ? (
                            <Chip
                              size="small"
                              icon={<Clock size={12} color="#92400E" />}
                              label="INQUIRY • MENUNGGU TRANSFER DP 50%"
                              sx={{
                                bgcolor: '#FEF3C7',
                                color: '#92400E',
                                border: '1.5px solid #FDE68A',
                                fontWeight: 800,
                                fontSize: '0.78rem',
                                borderRadius: '6px',
                                letterSpacing: '0.02em'
                              }}
                            />
                          ) : isCompleted ? (
                            <Chip
                              size="small"
                              icon={<CheckCircle2 size={12} color="#166534" />}
                              label="PROYEK SELESAI • MASTER CODE DISERAHKAN"
                              sx={{
                                bgcolor: '#F0FDF4',
                                color: '#166534',
                                border: '1.5px solid #BBF7D0',
                                fontWeight: 800,
                                fontSize: '0.78rem',
                                borderRadius: '6px',
                                letterSpacing: '0.02em'
                              }}
                            />
                          ) : (
                            <Chip
                              size="small"
                              icon={<Layers size={12} color="#1E40AF" />}
                              label="FIX ORDER AKTIF • PIPELINE KODING"
                              sx={{
                                bgcolor: '#EFF6FF',
                                color: '#1E40AF',
                                border: '1.5px solid #BFDBFE',
                                fontWeight: 800,
                                fontSize: '0.78rem',
                                borderRadius: '6px',
                                letterSpacing: '0.02em'
                              }}
                            />
                          )}

                          {/* Ticket ID & Order Number */}
                          <Box component="code" sx={{ bgcolor: '#F1F5F9', border: '1.5px solid #CBD5E1', px: 1, py: 0.35, borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800, color: '#0F172A' }}>
                            {ord.id}
                          </Box>
                          
                          {ord.orderNumber && ord.orderNumber !== 'MENUNGGU-DP' && (
                            <Box component="code" sx={{ bgcolor: '#0F172A', color: '#FFFFFF', px: 1, py: 0.35, borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800 }}>
                              {ord.orderNumber}
                            </Box>
                          )}

                          <Typography variant="caption" sx={{ fontSize: '0.8rem', color: '#64748B' }}>
                            Daftar: {ord.orderDate}
                          </Typography>
                        </Box>

                        {/* Project Title */}
                        <Typography variant="h6" component="h3" sx={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', mt: 0.5, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                          {ord.projectTitle}
                        </Typography>

                      </Box>

                      {/* Right Quick Actions Toolbar */}
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                        {isInquiry && (
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleVerifyDP(ord)}
                            startIcon={<CheckCircle2 size={14} color="#22C55E" />}
                            sx={{
                              bgcolor: '#0F172A',
                              color: '#FFFFFF',
                              px: 1.75,
                              py: 0.85,
                              fontSize: '0.82rem',
                              fontWeight: 800,
                              borderRadius: '6px',
                              '&:hover': { bgcolor: '#1E293B' }
                            }}
                          >
                            Verifikasi DP 50%
                          </Button>
                        )}

                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => setEditingOrder(ord)}
                          startIcon={<Edit3 size={14} />}
                          sx={{
                            bgcolor: '#FFFFFF',
                            color: '#0F172A',
                            borderColor: '#CBD5E1',
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            px: 1.5,
                            py: 0.85,
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            '&:hover': { bgcolor: '#F8FAFC', borderColor: '#0F172A' }
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          component={Link}
                          to={`/lacak?kode=${ord.id}`}
                          target="_blank"
                          variant="outlined"
                          size="small"
                          startIcon={<ExternalLink size={14} />}
                          sx={{
                            bgcolor: '#FFFFFF',
                            color: '#0F172A',
                            borderColor: '#CBD5E1',
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            px: 1.5,
                            py: 0.85,
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            '&:hover': { bgcolor: '#F8FAFC', borderColor: '#0F172A' }
                          }}
                        >
                          Lihat Pelacak
                        </Button>

                        <IconButton
                          size="small"
                          onClick={() => handleDeleteOrder(ord)}
                          title="Hapus / Arsipkan"
                          sx={{
                            bgcolor: '#FFFFFF',
                            color: '#DC2626',
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            p: 0.85,
                            '&:hover': { bgcolor: '#FEE2E2', borderColor: '#DC2626' }
                          }}
                        >
                          <Trash2 size={14} />
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Metadata Strip */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                      <Chip
                        component="a"
                        href={`https://wa.me/${(ord.clientPhone || '').replace(/^0/, '62')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        clickable
                        icon={<Phone size={13} color="#2563EB" />}
                        label={ord.clientPhone}
                        sx={{
                          bgcolor: '#F8FAFC',
                          border: '1.5px solid #CBD5E1',
                          fontWeight: 800,
                          fontSize: '0.82rem',
                          color: '#0F172A',
                          borderRadius: '6px'
                        }}
                      />

                      <Chip
                        label={<span>Paket: <strong style={{ color: '#0F172A' }}>{ord.packageName}</strong></span>}
                        sx={{ bgcolor: '#F8FAFC', border: '1.5px solid #CBD5E1', fontSize: '0.82rem', color: '#475569', borderRadius: '6px' }}
                      />

                      <Chip
                        label={<span>Kategori: <strong style={{ color: '#0F172A' }}>{ord.category}</strong></span>}
                        sx={{ bgcolor: '#F8FAFC', border: '1.5px solid #CBD5E1', fontSize: '0.82rem', color: '#475569', borderRadius: '6px' }}
                      />

                      <Chip
                        label={<span>Target Selesai: <strong style={{ color: '#0F172A' }}>{ord.estimatedCompletion || '7 Hari Kerja'}</strong></span>}
                        sx={{ bgcolor: '#F8FAFC', border: '1.5px solid #CBD5E1', fontSize: '0.82rem', color: '#475569', borderRadius: '6px' }}
                      />
                    </Box>

                    {/* Operational Parameter Controls Row */}
                    <Paper sx={{ bgcolor: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: '10px', p: { xs: 2, sm: 2.5 }, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2.5, alignItems: 'center' }}>
                      
                      {/* Financial info */}
                      <Box>
                        <Typography variant="caption" sx={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block' }}>
                          Nilai Investasi &amp; DP
                        </Typography>
                        <Typography variant="h6" sx={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', mt: 0.25 }}>
                          {formatRupiah(ord.totalInvestment)}
                        </Typography>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, fontSize: '0.78rem', color: ord.dpStatus.includes('LUNAS') ? '#16A34A' : '#D97706', fontWeight: 800, mt: 0.5 }}>
                          {ord.dpStatus.includes('LUNAS') ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                          <span>{ord.dpStatus}</span>
                        </Box>
                      </Box>

                      {/* Stage SOP Dropdown & Step Indicator */}
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                          <Typography variant="caption" sx={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Tahap SOP Terkini
                          </Typography>
                          <Typography variant="caption" sx={{ fontSize: '0.76rem', fontWeight: 800, color: '#0F172A' }}>
                            Tahap {ord.currentStageNumber || 1} / 5
                          </Typography>
                        </Box>

                        {/* Mini 5-stage dots */}
                        <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                          {[1, 2, 3, 4, 5].map((s) => {
                            const isDone = (ord.currentStageNumber || 1) >= s;
                            const isCurrent = (ord.currentStageNumber || 1) === s;
                            return (
                              <Box
                                key={s}
                                sx={{
                                  flex: 1,
                                  height: 6,
                                  borderRadius: 1.5,
                                  bgcolor: isCurrent ? '#1D63FF' : isDone ? '#0F172A' : '#E2E8F0',
                                  transition: 'background 0.2s'
                                }}
                              />
                            );
                          })}
                        </Box>

                        <FormControl size="small" fullWidth sx={{ bgcolor: '#FFFFFF', borderRadius: '6px' }}>
                          <Select
                            value={ord.currentStageNumber}
                            onChange={(e) => handleStageChange(ord, e.target.value)}
                            sx={{
                              borderRadius: '6px',
                              fontSize: '0.84rem',
                              fontWeight: 700,
                              color: '#0F172A',
                              '& fieldset': { border: '1.5px solid #CBD5E1' },
                              '&:hover fieldset': { borderColor: '#0F172A' },
                              '&.Mui-focused fieldset': { borderColor: '#1D63FF' }
                            }}
                          >
                            <MenuItem value={1}>Tahap 1: Verifikasi Brief &amp; DP 50%</MenuItem>
                            <MenuItem value={2}>Tahap 2: Setup Database &amp; Skema MySQL</MenuItem>
                            <MenuItem value={3}>Tahap 3: Koding Fitur &amp; Antarmuka</MenuItem>
                            <MenuItem value={4}>Tahap 4: Pratinjau Siap &amp; Sesi Revisi</MenuItem>
                            <MenuItem value={5}>Tahap 5: Selesai &amp; Serah Terima .zip</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      {/* Revision Quota Tracker */}
                      <Box>
                        <Typography variant="caption" sx={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', mb: 0.75, display: 'block' }}>
                          Kuota Revisi SOP (Maks 3x)
                        </Typography>
                        
                        {/* 3 slot badges */}
                        <Box sx={{ display: 'flex', gap: 0.75, mb: 1 }}>
                          {[1, 2, 3].map((slotNum) => {
                            const isUsed = (ord.revisionQuotaUsed || 0) >= slotNum;
                            return (
                              <Box
                                key={slotNum}
                                sx={{
                                  flex: 1,
                                  py: 0.5,
                                  px: 0.75,
                                  borderRadius: '4px',
                                  textAlign: 'center',
                                  fontSize: '0.74rem',
                                  fontWeight: 800,
                                  bgcolor: isUsed ? '#0F172A' : '#FFFFFF',
                                  color: isUsed ? '#FFFFFF' : '#64748B',
                                  border: isUsed ? '1.5px solid #0F172A' : '1.5px dashed #CBD5E1'
                                }}
                              >
                                Sesi {slotNum}
                              </Box>
                            );
                          })}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontSize: '0.84rem', fontWeight: 800, color: (ord.revisionQuotaUsed || 0) >= (ord.revisionQuotaTotal || 3) ? '#DC2626' : '#0F172A' }}>
                            {ord.revisionQuotaUsed || 0} / {ord.revisionQuotaTotal || 3} Terpakai
                          </Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleOpenRevisionModal(ord)}
                            disabled={(ord.revisionQuotaUsed || 0) >= (ord.revisionQuotaTotal || 3)}
                            sx={{
                              bgcolor: (ord.revisionQuotaUsed || 0) >= (ord.revisionQuotaTotal || 3) ? '#F1F5F9' : '#FFFFFF',
                              borderColor: '#CBD5E1',
                              border: '1.5px solid #CBD5E1',
                              borderRadius: '6px',
                              px: 1.25,
                              py: 0.5,
                              fontSize: '0.78rem',
                              fontWeight: 800,
                              color: (ord.revisionQuotaUsed || 0) >= (ord.revisionQuotaTotal || 3) ? '#94A3B8' : '#0F172A',
                              '&:hover': { bgcolor: '#F8FAFC', borderColor: '#0F172A' }
                            }}
                          >
                            + Catat Revisi
                          </Button>
                        </Box>
                      </Box>

                    </Paper>

                    {/* Riwayat Catatan Sesi Revisi Proyek */}
                    {ord.revisionHistory && ord.revisionHistory.length > 0 && (
                      <Paper sx={{ bgcolor: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: '8px', p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.25 }}>
                          <Box sx={{ fontSize: '0.82rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 0.75 }}>
                            <History size={14} color="#0F172A" />
                            <span>Riwayat Catatan Sesi Revisi ({ord.revisionHistory.length} dari {ord.revisionQuotaTotal || 3} Terpakai):</span>
                          </Box>
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => handleDeleteLastRevision(ord)}
                            title="Batalkan sesi revisi terakhir jika salah input"
                            sx={{
                              color: '#DC2626',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              p: 0,
                              minWidth: 'auto',
                              '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                            }}
                          >
                            Batalkan Sesi Terakhir
                          </Button>
                        </Box>
                        <Stack spacing={1}>
                          {ord.revisionHistory.map((rev) => (
                            <Box 
                              key={rev.sessionNumber} 
                              sx={{ 
                                bgcolor: '#FFFFFF', 
                                border: '1.5px solid #CBD5E1', 
                                borderRadius: '6px', 
                                p: 1.5,
                                fontSize: '0.84rem' 
                              }}
                            >
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                <Typography variant="caption" sx={{ fontWeight: 800, color: '#1D63FF' }}>
                                  Sesi {rev.sessionNumber}
                                </Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 600 }}>
                                  {rev.date}
                                </Typography>
                              </Box>
                              <Typography variant="body2" sx={{ color: '#0F172A', lineHeight: 1.45, fontSize: '0.86rem' }}>
                                "{rev.note}"
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                      </Paper>
                    )}

                    {/* Developer Log Snippet */}
                    <Box sx={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.55, bgcolor: '#FFFFFF', border: '1.5px solid #CBD5E1', borderLeft: '4px solid #1D63FF', p: 1.75, borderRadius: '6px' }}>
                      <Typography component="span" sx={{ fontWeight: 800, color: '#0F172A' }}>Catatan Pengembang Terakhir (Tampil Langsung di /lacak): </Typography>
                      <Typography component="span" sx={{ color: '#0F172A' }}>"{ord.developerNotes}"</Typography>
                    </Box>

                  </Card>
                );
              })
            )}

          </Stack>
        )}
      </Container>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: EDIT ORDER DETAILS (Material UI Executive Dialog)
          ───────────────────────────────────────────────────────────── */}
      {editingOrder && (
        <Dialog
          open={Boolean(editingOrder)}
          onClose={() => setEditingOrder(null)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '12px',
              border: '1.5px solid #CBD5E1',
              bgcolor: '#FFFFFF',
              boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.25)',
              m: 2
            }
          }}
        >
          <Box component="form" onSubmit={handleSaveEdit} sx={{ display: 'flex', flexDirection: 'column', m: 0 }}>
            {/* Dialog Header */}
            <DialogTitle
              sx={{
                p: '20px 24px',
                borderBottom: '1.5px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                    bgcolor: '#F1F5F9',
                    border: '1.5px solid #CBD5E1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Edit3 size={20} color="#0F172A" />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                    Edit Rincian Pesanan
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Box
                      component="code"
                      sx={{
                        bgcolor: '#F1F5F9',
                        border: '1.5px solid #CBD5E1',
                        px: 0.75,
                        py: 0.2,
                        borderRadius: '4px',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: '#0F172A',
                        fontFamily: 'monospace'
                      }}
                    >
                      {editingOrder.id}
                    </Box>
                    <Typography variant="caption" sx={{ fontSize: '0.78rem', color: '#64748B' }}>
                      • Terdaftar pada {editingOrder.orderDate}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <IconButton
                onClick={() => setEditingOrder(null)}
                size="small"
                aria-label="Tutup modal"
                sx={{
                  bgcolor: '#F8FAFC',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '6px',
                  color: '#64748B',
                  p: 0.75,
                  '&:hover': { bgcolor: '#F1F5F9', color: '#0F172A' }
                }}
              >
                <X size={16} />
              </IconButton>
            </DialogTitle>

            {/* Dialog Scrollable Content */}
            <DialogContent sx={{ p: '24px 28px', maxHeight: 'calc(90vh - 140px)' }}>
              <Stack spacing={3}>
                {/* SECTION 1: KONTAK & SALURAN KOMUNIKASI */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Phone size={15} color="#0F172A" />
                    <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      1. Kontak &amp; Saluran Komunikasi
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <Box>
                      <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.75 }}>
                        Nomor WhatsApp
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        required
                        value={editingOrder.clientPhone}
                        onChange={(e) => setEditingOrder({ ...editingOrder, clientPhone: e.target.value })}
                        inputProps={{
                          style: { fontSize: '0.88rem', color: '#0F172A', padding: '10px 12px' }
                        }}
                        sx={{
                          bgcolor: '#FFFFFF',
                          '& .MuiOutlinedInput-root': {
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#0F172A' },
                            '&.Mui-focused': { borderColor: '#1D63FF' }
                          }
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.75 }}>
                        Email Klien (Opsional)
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        type="email"
                        placeholder="klien@email.com"
                        value={editingOrder.clientEmail || ''}
                        onChange={(e) => setEditingOrder({ ...editingOrder, clientEmail: e.target.value })}
                        inputProps={{
                          style: { fontSize: '0.88rem', color: '#0F172A', padding: '10px 12px' }
                        }}
                        sx={{
                          bgcolor: '#FFFFFF',
                          '& .MuiOutlinedInput-root': {
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#0F172A' },
                            '&.Mui-focused': { borderColor: '#1D63FF' }
                          }
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: '#F1F5F9', borderBottomWidth: '1.5px' }} />

                {/* SECTION 2: RUANG LINGKUP & STATUS */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Layers size={15} color="#0F172A" />
                    <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      2. Ruang Lingkup Proyek &amp; Tipe Status
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.75 }}>
                      Judul Proyek
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      required
                      value={editingOrder.projectTitle}
                      onChange={(e) => setEditingOrder({ ...editingOrder, projectTitle: e.target.value })}
                      inputProps={{
                        style: { fontSize: '0.88rem', color: '#0F172A', padding: '10px 12px' }
                      }}
                      sx={{
                        bgcolor: '#FFFFFF',
                        '& .MuiOutlinedInput-root': {
                          border: '1.5px solid #CBD5E1',
                          borderRadius: '6px',
                          '& fieldset': { border: 'none' },
                          '&:hover': { borderColor: '#0F172A' },
                          '&.Mui-focused': { borderColor: '#1D63FF' }
                        }
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <Box>
                      <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.75 }}>
                        Tipe Status Proyek
                      </Typography>
                      <FormControl fullWidth size="small">
                        <Select
                          value={editingOrder.statusType}
                          onChange={(e) => setEditingOrder({ ...editingOrder, statusType: e.target.value })}
                          sx={{
                            bgcolor: '#FFFFFF',
                            fontSize: '0.88rem',
                            fontWeight: 700,
                            color: '#0F172A',
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                            '&:hover': { borderColor: '#0F172A' },
                            '&.Mui-focused': { borderColor: '#1D63FF' }
                          }}
                        >
                          <MenuItem value="INQUIRY" sx={{ fontSize: '0.88rem', fontWeight: 600 }}>INQUIRY (Draf Tanya / Belum DP)</MenuItem>
                          <MenuItem value="FIX_ORDER" sx={{ fontSize: '0.88rem', fontWeight: 600 }}>FIX ORDER (DP Lunas &amp; Dikerjakan)</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.75 }}>
                        Nomor Order Resmi
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Contoh: ORD-AT-2026-0042"
                        value={editingOrder.orderNumber || ''}
                        onChange={(e) => setEditingOrder({ ...editingOrder, orderNumber: e.target.value })}
                        inputProps={{
                          style: { fontSize: '0.88rem', color: '#0F172A', padding: '10px 12px' }
                        }}
                        sx={{
                          bgcolor: '#FFFFFF',
                          '& .MuiOutlinedInput-root': {
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#0F172A' },
                            '&.Mui-focused': { borderColor: '#1D63FF' }
                          }
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: '#F1F5F9', borderBottomWidth: '1.5px' }} />

                {/* SECTION 3: PARAMETER FINANSIAL */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Calendar size={15} color="#0F172A" />
                    <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      3. Nilai Investasi &amp; Status Pembayaran
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                    <Box>
                      <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.75 }}>
                        Total Biaya Investasi (Rp)
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        value={editingOrder.totalInvestment}
                        onChange={(e) => setEditingOrder({ ...editingOrder, totalInvestment: Number(e.target.value) })}
                        inputProps={{
                          style: { fontSize: '0.9rem', fontWeight: 800, color: '#1D63FF', padding: '10px 12px' }
                        }}
                        sx={{
                          bgcolor: '#FFFFFF',
                          '& .MuiOutlinedInput-root': {
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#0F172A' },
                            '&.Mui-focused': { borderColor: '#1D63FF' }
                          }
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.75 }}>
                        Status Pembayaran DP
                      </Typography>
                      <FormControl fullWidth size="small">
                        <Select
                          value={editingOrder.dpStatus}
                          onChange={(e) => setEditingOrder({ ...editingOrder, dpStatus: e.target.value })}
                          sx={{
                            bgcolor: '#FFFFFF',
                            fontSize: '0.88rem',
                            fontWeight: 700,
                            color: '#0F172A',
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                            '&:hover': { borderColor: '#0F172A' },
                            '&.Mui-focused': { borderColor: '#1D63FF' }
                          }}
                        >
                          <MenuItem value="MENUNGGU TRANSFER DP 50%" sx={{ fontSize: '0.88rem', fontWeight: 600 }}>MENUNGGU TRANSFER DP 50%</MenuItem>
                          <MenuItem value="LUNAS (DP 50%)" sx={{ fontSize: '0.88rem', fontWeight: 600 }}>LUNAS (DP 50%)</MenuItem>
                          <MenuItem value="LUNAS 100% (SELESAI)" sx={{ fontSize: '0.88rem', fontWeight: 600 }}>LUNAS 100% (SELESAI)</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.75 }}>
                      Target Tanggal Selesai
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Contoh: 15 November 2026"
                      value={editingOrder.estimatedCompletion || ''}
                      onChange={(e) => setEditingOrder({ ...editingOrder, estimatedCompletion: e.target.value })}
                      inputProps={{
                        style: { fontSize: '0.88rem', color: '#0F172A', padding: '10px 12px' }
                      }}
                      sx={{
                        bgcolor: '#FFFFFF',
                        '& .MuiOutlinedInput-root': {
                          border: '1.5px solid #CBD5E1',
                          borderRadius: '6px',
                          '& fieldset': { border: 'none' },
                          '&:hover': { borderColor: '#0F172A' },
                          '&.Mui-focused': { borderColor: '#1D63FF' }
                        }
                      }}
                    />
                  </Box>
                </Box>

                <Divider sx={{ borderColor: '#F1F5F9', borderBottomWidth: '1.5px' }} />

                {/* SECTION 4: LOG PENGEMBANG */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <FileText size={15} color="#0F172A" />
                    <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      4. Catatan Pengembang untuk Klien (Live Log di /lacak)
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={editingOrder.developerNotes || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, developerNotes: e.target.value })}
                    inputProps={{
                      style: { fontSize: '0.88rem', color: '#0F172A', lineHeight: 1.5 }
                    }}
                    sx={{
                      bgcolor: '#FFFFFF',
                      '& .MuiOutlinedInput-root': {
                        border: '1.5px solid #CBD5E1',
                        borderRadius: '6px',
                        '& fieldset': { border: 'none' },
                        '&:hover': { borderColor: '#0F172A' },
                        '&.Mui-focused': { borderColor: '#1D63FF' }
                      }
                    }}
                  />
                  <Typography variant="caption" sx={{ fontSize: '0.74rem', color: '#64748B', mt: 0.75, display: 'block' }}>
                    Catatan ini dibaca secara transparan oleh klien di pelacak status proyek.
                  </Typography>
                </Box>
              </Stack>
            </DialogContent>

            {/* Dialog Footer Actions */}
            <DialogActions
              sx={{
                bgcolor: '#F8FAFC',
                borderTop: '1.5px solid #E2E8F0',
                px: 3,
                py: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1.5,
                flexWrap: 'wrap'
              }}
            >
              <Typography variant="caption" sx={{ fontSize: '0.82rem', color: '#64748B' }}>
                ID: <Box component="strong" sx={{ color: '#0F172A' }}>{editingOrder.id}</Box> • Otomatis sinkron ke Spreadsheet
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  sx={{
                    bgcolor: '#FFFFFF',
                    color: '#475569',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: '6px',
                    px: 2,
                    py: 0.85,
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    '&:hover': { bgcolor: '#F1F5F9', color: '#0F172A' }
                  }}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  startIcon={<Save size={16} />}
                  sx={{
                    bgcolor: '#0F172A',
                    color: '#FFFFFF',
                    borderRadius: '6px',
                    px: 2.5,
                    py: 0.85,
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    '&:hover': { bgcolor: '#1E293B' }
                  }}
                >
                  Simpan Perubahan
                </Button>
              </Box>
            </DialogActions>
          </Box>
        </Dialog>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: CREATE NEW MANUAL ORDER (Material UI Executive Dialog)
          ───────────────────────────────────────────────────────────── */}
      {isCreatingNew && (
        <Dialog
          open={isCreatingNew}
          onClose={() => setIsCreatingNew(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '12px',
              border: '1.5px solid #CBD5E1',
              bgcolor: '#FFFFFF',
              boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.25)',
              m: 2
            }
          }}
        >
          <Box component="form" onSubmit={handleCreateNewOrder} sx={{ display: 'flex', flexDirection: 'column', m: 0 }}>
            {/* Dialog Header */}
            <DialogTitle
              sx={{
                p: '20px 24px',
                borderBottom: '1.5px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                    bgcolor: '#F1F5F9',
                    border: '1.5px solid #CBD5E1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <FolderPlus size={20} color="#0F172A" />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                    Tambah Pesanan Baru Manual
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.8rem', color: '#64748B', display: 'block', mt: 0.25 }}>
                    Registrasi proyek langsung dari kesepakatan WhatsApp atau offline ke antrean kerja sistem.
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={() => setIsCreatingNew(false)}
                size="small"
                aria-label="Tutup modal"
                sx={{
                  bgcolor: '#F8FAFC',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '6px',
                  color: '#64748B',
                  p: 0.75,
                  '&:hover': { bgcolor: '#F1F5F9', color: '#0F172A' }
                }}
              >
                <X size={16} />
              </IconButton>
            </DialogTitle>

            {/* Dialog Scrollable Content */}
            <DialogContent sx={{ p: '24px 28px', maxHeight: 'calc(90vh - 140px)' }}>
              <Stack spacing={3}>
                {/* SECTION 1: KONTAK & KOMUNIKASI */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Phone size={15} color="#0F172A" />
                    <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      1. Kontak &amp; Saluran Komunikasi Proyek
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                    <Box>
                      <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.75 }}>
                        Nomor WhatsApp Aktif (Wajib)
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="clientPhone"
                        required
                        placeholder="Contoh: 081234567890"
                        inputProps={{
                          style: { fontSize: '0.88rem', color: '#0F172A', padding: '10px 12px' }
                        }}
                        sx={{
                          bgcolor: '#FFFFFF',
                          '& .MuiOutlinedInput-root': {
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#0F172A' },
                            '&.Mui-focused': { borderColor: '#1D63FF' }
                          }
                        }}
                      />
                      <Typography variant="caption" sx={{ fontSize: '0.74rem', color: '#64748B', mt: 0.5, display: 'block' }}>
                        Kunci identifikasi utama untuk lacak pesanan di /lacak
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.75 }}>
                        Email Klien (Opsional)
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="clientEmail"
                        type="email"
                        placeholder="klien@email.com"
                        inputProps={{
                          style: { fontSize: '0.88rem', color: '#0F172A', padding: '10px 12px' }
                        }}
                        sx={{
                          bgcolor: '#FFFFFF',
                          '& .MuiOutlinedInput-root': {
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#0F172A' },
                            '&.Mui-focused': { borderColor: '#1D63FF' }
                          }
                        }}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.75 }}>
                      Status Awal Pesanan
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        name="statusType"
                        value={newOrderForm.statusType}
                        onChange={(e) => setNewOrderForm({ ...newOrderForm, statusType: e.target.value })}
                        sx={{
                          bgcolor: '#FFFFFF',
                          fontSize: '0.88rem',
                          fontWeight: 700,
                          color: '#0F172A',
                          border: '1.5px solid #CBD5E1',
                          borderRadius: '6px',
                          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                          '&:hover': { borderColor: '#0F172A' },
                          '&.Mui-focused': { borderColor: '#1D63FF' }
                        }}
                      >
                        <MenuItem value="FIX_ORDER" sx={{ fontSize: '0.88rem', fontWeight: 600 }}>FIX ORDER (DP 50% Sudah Diterima &amp; Antrean Kerja)</MenuItem>
                        <MenuItem value="INQUIRY" sx={{ fontSize: '0.88rem', fontWeight: 600 }}>INQUIRY (Draf Tanya / Menunggu Bukti Transfer DP)</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: '#F1F5F9', borderBottomWidth: '1.5px' }} />

                {/* SECTION 2: RUANG LINGKUP & PAKET LAYANAN */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Layers size={15} color="#0F172A" />
                    <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      2. Ruang Lingkup &amp; Paket Layanan
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.75 }}>
                      Judul / Kebutuhan Utama Proyek
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name="projectTitle"
                      required
                      placeholder="Contoh: Website Profil Klinik Gigi & Form Reservasi Direct WhatsApp"
                      inputProps={{
                        style: { fontSize: '0.88rem', color: '#0F172A', padding: '10px 12px' }
                      }}
                      sx={{
                        bgcolor: '#FFFFFF',
                        '& .MuiOutlinedInput-root': {
                          border: '1.5px solid #CBD5E1',
                          borderRadius: '6px',
                          '& fieldset': { border: 'none' },
                          '&:hover': { borderColor: '#0F172A' },
                          '&.Mui-focused': { borderColor: '#1D63FF' }
                        }
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <Box>
                      <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.75 }}>
                        Pilihan Paket Layanan
                      </Typography>
                      <FormControl fullWidth size="small">
                        <Select
                          name="packageId"
                          value={newOrderForm.packageId}
                          onChange={(e) => handleNewOrderPackageChange(e.target.value)}
                          sx={{
                            bgcolor: '#FFFFFF',
                            fontSize: '0.88rem',
                            fontWeight: 700,
                            color: '#0F172A',
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                            '&:hover': { borderColor: '#0F172A' },
                            '&.Mui-focused': { borderColor: '#1D63FF' }
                          }}
                        >
                          {PACKAGES.map(p => (
                            <MenuItem key={p.id} value={p.id} sx={{ fontSize: '0.88rem', fontWeight: 600 }}>
                              {p.name} — Rp {p.minPrice.toLocaleString('id-ID')}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.75 }}>
                        Kategori Segmentasi
                      </Typography>
                      <FormControl fullWidth size="small">
                        <Select
                          name="category"
                          value={newOrderForm.category}
                          onChange={(e) => setNewOrderForm({ ...newOrderForm, category: e.target.value })}
                          sx={{
                            bgcolor: '#FFFFFF',
                            fontSize: '0.88rem',
                            fontWeight: 700,
                            color: '#0F172A',
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                            '&:hover': { borderColor: '#0F172A' },
                            '&.Mui-focused': { borderColor: '#1D63FF' }
                          }}
                        >
                          <MenuItem value="UMKM & Bisnis" sx={{ fontSize: '0.88rem', fontWeight: 600 }}>UMKM &amp; Bisnis</MenuItem>
                          <MenuItem value="Standard Enterprise" sx={{ fontSize: '0.88rem', fontWeight: 600 }}>Company Profile Korporat</MenuItem>
                          <MenuItem value="Mahasiswa & Akademisi" sx={{ fontSize: '0.88rem', fontWeight: 600 }}>Tugas Kuliah / Modul Skripsi</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: '#F1F5F9', borderBottomWidth: '1.5px' }} />

                {/* SECTION 3: KEUANGAN & TARGET SELESAI */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Calendar size={15} color="#0F172A" />
                    <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      3. Nilai Investasi &amp; Target Pengerjaan
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <Box>
                      <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.75 }}>
                        Total Biaya Disepakati (Rp)
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="totalInvestment"
                        type="number"
                        value={newOrderForm.totalInvestment}
                        onChange={(e) => setNewOrderForm({ ...newOrderForm, totalInvestment: Number(e.target.value) })}
                        inputProps={{
                          style: { fontSize: '0.9rem', fontWeight: 800, color: '#1D63FF', padding: '10px 12px' }
                        }}
                        sx={{
                          bgcolor: '#FFFFFF',
                          '& .MuiOutlinedInput-root': {
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#0F172A' },
                            '&.Mui-focused': { borderColor: '#1D63FF' }
                          }
                        }}
                      />
                      <Typography variant="caption" sx={{ fontSize: '0.74rem', color: '#64748B', mt: 0.5, display: 'block' }}>
                        Uang Muka DP 50%: <Box component="strong" sx={{ color: '#0F172A' }}>{formatRupiah(Math.round((newOrderForm.totalInvestment || 0) / 2))}</Box>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.75 }}>
                        Target Tanggal Selesai
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="estimatedCompletion"
                        placeholder="Contoh: 18 November 2026 atau 7 Hari Kerja"
                        defaultValue="7 Hari Kerja"
                        inputProps={{
                          style: { fontSize: '0.88rem', color: '#0F172A', padding: '10px 12px' }
                        }}
                        sx={{
                          bgcolor: '#FFFFFF',
                          '& .MuiOutlinedInput-root': {
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#0F172A' },
                            '&.Mui-focused': { borderColor: '#1D63FF' }
                          }
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: '#F1F5F9', borderBottomWidth: '1.5px' }} />

                {/* SECTION 4: LOG PENGEMBANG AWAL */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <FileText size={15} color="#0F172A" />
                    <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      4. Catatan Pengembang Awal (Live Log di /lacak)
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    name="developerNotes"
                    defaultValue="Pesanan resmi terdaftar. Menyiapkan repositori kode sumber dan perancangan skema basis data."
                    inputProps={{
                      style: { fontSize: '0.88rem', color: '#0F172A', lineHeight: 1.5 }
                    }}
                    sx={{
                      bgcolor: '#FFFFFF',
                      '& .MuiOutlinedInput-root': {
                        border: '1.5px solid #CBD5E1',
                        borderRadius: '6px',
                        '& fieldset': { border: 'none' },
                        '&:hover': { borderColor: '#0F172A' },
                        '&.Mui-focused': { borderColor: '#1D63FF' }
                      }
                    }}
                  />
                  <Typography variant="caption" sx={{ fontSize: '0.74rem', color: '#64748B', mt: 0.75, display: 'block' }}>
                    Catatan ini akan langsung terlihat oleh klien saat memasukkan nomor tiket di halaman /lacak.
                  </Typography>
                </Box>
              </Stack>
            </DialogContent>

            {/* Dialog Footer Actions */}
            <DialogActions
              sx={{
                bgcolor: '#F8FAFC',
                borderTop: '1.5px solid #E2E8F0',
                px: 3,
                py: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1.5,
                flexWrap: 'wrap'
              }}
            >
              <Typography variant="caption" sx={{ fontSize: '0.82rem', color: '#64748B' }}>
                Tersinkronisasi ke <Box component="strong" sx={{ color: '#0F172A' }}>/lacak</Box> &amp; <Box component="strong" sx={{ color: '#0F172A' }}>Spreadsheet</Box>
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  sx={{
                    bgcolor: '#FFFFFF',
                    color: '#475569',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: '6px',
                    px: 2,
                    py: 0.85,
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    '&:hover': { bgcolor: '#F1F5F9', color: '#0F172A' }
                  }}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  startIcon={<Plus size={16} />}
                  sx={{
                    bgcolor: '#0F172A',
                    color: '#FFFFFF',
                    borderRadius: '6px',
                    px: 2.5,
                    py: 0.85,
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    '&:hover': { bgcolor: '#1E293B' }
                  }}
                >
                  Daftarkan ke Sistem
                </Button>
              </Box>
            </DialogActions>
          </Box>
        </Dialog>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: CATAT SESI REVISI PROYEK (Material UI Executive Dialog)
          ───────────────────────────────────────────────────────────── */}
      {revisionModalOrder && (
        <Dialog
          open={Boolean(revisionModalOrder)}
          onClose={() => setRevisionModalOrder(null)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '12px',
              border: '1.5px solid #CBD5E1',
              bgcolor: '#FFFFFF',
              boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.25)',
              m: 2
            }
          }}
        >
          <Box component="form" onSubmit={handleSaveRevisionRecord} sx={{ display: 'flex', flexDirection: 'column', m: 0 }}>
            {/* Dialog Header */}
            <DialogTitle
              sx={{
                p: '20px 24px',
                borderBottom: '1.5px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  Catat Sesi Revisi Proyek
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '0.8rem', color: '#64748B', display: 'block', mt: 0.5 }}>
                  Pesanan: <Box component="strong" sx={{ color: '#0F172A' }}>{revisionModalOrder.id}</Box> • Sesi ke-{(revisionModalOrder.revisionQuotaUsed || 0) + 1} dari {revisionModalOrder.revisionQuotaTotal || 3}
                </Typography>
              </Box>
              <IconButton
                onClick={() => setRevisionModalOrder(null)}
                size="small"
                aria-label="Tutup modal"
                sx={{
                  bgcolor: '#F8FAFC',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '6px',
                  color: '#64748B',
                  p: 0.75,
                  '&:hover': { bgcolor: '#F1F5F9', color: '#0F172A' }
                }}
              >
                <X size={16} />
              </IconButton>
            </DialogTitle>

            {/* Dialog Content */}
            <DialogContent sx={{ p: '24px 28px' }}>
              {/* Info Box */}
              <Box
                sx={{
                  bgcolor: '#F8FAFC',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '8px',
                  p: 2,
                  mb: 2.5,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box>
                  <Typography variant="subtitle2" sx={{ fontSize: '0.84rem', fontWeight: 800, color: '#1D63FF' }}>
                    Sesi yang akan dicatat: Sesi ke-{(revisionModalOrder.revisionQuotaUsed || 0) + 1}
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.78rem', color: '#475569', display: 'block', mt: 0.25 }}>
                    Sisa kuota revisi SOP setelah sesi ini: {(revisionModalOrder.revisionQuotaTotal || 3) - (revisionModalOrder.revisionQuotaUsed || 0) - 1} sesi
                  </Typography>
                </Box>
                <Box
                  sx={{
                    fontSize: '0.76rem',
                    bgcolor: '#FFFFFF',
                    px: 1.25,
                    py: 0.5,
                    borderRadius: '4px',
                    fontWeight: 700,
                    color: '#0F172A',
                    border: '1.5px solid #CBD5E1'
                  }}
                >
                  Hari ini
                </Box>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ fontSize: '0.84rem', fontWeight: 800, color: '#0F172A', display: 'block', mb: 1 }}>
                  Rincian Catatan Revisi dari Klien (Wajib):
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  autoFocus
                  value={revisionNoteInput}
                  onChange={(e) => {
                    setRevisionNoteInput(e.target.value);
                    if (revisionNoteError) setRevisionNoteError('');
                  }}
                  placeholder="Tuliskan secara spesifik apa saja yang direvisi (misal: penyesuaian susunan menu header mobile, revisi warna tombol checkout, perbaikan validasi nomor telepon di form pemesanan)..."
                  inputProps={{
                    style: { fontSize: '0.88rem', color: '#0F172A', lineHeight: 1.5 }
                  }}
                  sx={{
                    bgcolor: '#FFFFFF',
                    '& .MuiOutlinedInput-root': {
                      border: revisionNoteError ? '1.5px solid #DC2626' : '1.5px solid #CBD5E1',
                      borderRadius: '6px',
                      '& fieldset': { border: 'none' },
                      '&:hover': { borderColor: revisionNoteError ? '#DC2626' : '#0F172A' },
                      '&.Mui-focused': { borderColor: revisionNoteError ? '#DC2626' : '#1D63FF' }
                    }
                  }}
                />
                {revisionNoteError && (
                  <Typography variant="caption" sx={{ fontSize: '0.8rem', color: '#DC2626', fontWeight: 700, mt: 0.75, display: 'block' }}>
                    {revisionNoteError}
                  </Typography>
                )}
                <Typography variant="caption" sx={{ fontSize: '0.76rem', color: '#64748B', mt: 0.75, display: 'block' }}>
                  Catatan ini otomatis tampil di pelacak status /lacak klien, tersimpan ke basis data, dan terarsip ke spreadsheet.
                </Typography>
              </Box>
            </DialogContent>

            {/* Dialog Footer Actions */}
            <DialogActions
              sx={{
                bgcolor: '#F8FAFC',
                borderTop: '1.5px solid #E2E8F0',
                px: 3,
                py: 2,
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 1.5
              }}
            >
              <Button
                type="button"
                onClick={() => setRevisionModalOrder(null)}
                sx={{
                  bgcolor: '#FFFFFF',
                  color: '#475569',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '6px',
                  px: 2,
                  py: 0.85,
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  '&:hover': { bgcolor: '#F1F5F9', color: '#0F172A' }
                }}
              >
                Batal
              </Button>
              <Button
                type="submit"
                startIcon={<Save size={16} />}
                sx={{
                  bgcolor: '#0F172A',
                  color: '#FFFFFF',
                  borderRadius: '6px',
                  px: 2.5,
                  py: 0.85,
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  '&:hover': { bgcolor: '#1E293B' }
                }}
              >
                Simpan Catatan Revisi
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      )}

    </Box>
  </ThemeProvider>
);
}
