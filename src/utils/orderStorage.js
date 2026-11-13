/**
 * Aksara Tech - Centralized Order & Project Storage Engine
 * Handles dual-storage: LocalStorage cache + Google Sheets Webhook Sync + CSV Exporter
 */

import { PACKAGES } from '../data/catalogData';

const STORAGE_KEY = 'aksara_orders_db_v1';
const SHEET_CONFIG_KEY = 'aksara_sheet_config_v1';

// Seed Initial Orders (used if storage is empty)
export const INITIAL_ORDERS = [
  {
    id: 'INQ-AT-20261109-8F2A',
    orderNumber: 'ORD-AT-2026-0042',
    statusType: 'FIX_ORDER', // 'INQUIRY' (hanya tanya/belum DP) vs 'FIX_ORDER' (DP lunas & jalan)
    clientName: '-',
    clientPhone: '081234567890',
    clientEmail: 'budi.santoso@example.com',
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
    revisionHistory: [],
    developerNotes: 'Basis data MySQL dan 4 tabel relasional katalog produk telah siap. Tim saat ini sedang menghubungkan endpoint filter pencarian real-time dan format checkout WhatsApp. Pratinjau pertama dijadwalkan tayang pada Rabu, 12 November.',
    deliverablesPreview: [
      'Master Source Code (.zip) Full Stack',
      'Skema Database MySQL (.sql) dengan data uji produk kopi',
      'Ringkasan SRS Fungsional & ERD Diagram'
    ]
  },
  {
    id: 'INQ-AT-20261108-4C91',
    orderNumber: 'MENUNGGU-DP',
    statusType: 'INQUIRY',
    clientName: '-',
    clientPhone: '082199881122',
    clientEmail: 'hendra.pratama@gmail.com',
    projectTitle: 'Toko Ritel Sepatu Olahraga Online',
    category: 'UMKM & Bisnis',
    packageId: 'e-commerce',
    packageName: 'E-Commerce / Toko Daring',
    packagePrice: 450000,
    addons: [
      { name: 'Optimasi SEO On-Page Lanjutan', price: 40000 }
    ],
    totalInvestment: 490000,
    dpAmount: 245000,
    dpStatus: 'MENUNGGU TRANSFER DP 50%',
    orderDate: '08 November 2026',
    estimatedCompletion: 'Menunggu Verifikasi DP',
    currentStageNumber: 1,
    revisionQuotaTotal: 3,
    revisionQuotaUsed: 0,
    revisionHistory: [],
    developerNotes: 'Formulir brief telah diterima via WhatsApp. Menunggu konfirmasi bukti transfer uang muka termin 1 (DP 50%) dari calon pemesan untuk memasukkan proyek ke dalam antrean pengerjaan.',
    deliverablesPreview: [
      'Master Source Code Toko Daring',
      'Database Relasional (.sql)'
    ]
  },
  {
    id: 'ORD-AT-2026-0018',
    orderNumber: 'ORD-AT-2026-0018',
    statusType: 'FIX_ORDER',
    clientName: '-',
    clientPhone: '085711223344',
    clientEmail: 'corporate@samuderalogistik.id',
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
    revisionHistory: [
      {
        sessionNumber: 1,
        date: '06 November 2026',
        note: 'Penyesuaian tata letak grid foto direksi pada section About Us dan pembaharuan nomor kontak kantor cabang Surabaya.',
        timestamp: '2026-11-06T10:30:00.000Z'
      }
    ],
    developerNotes: 'Pratinjau pertama telah disampaikan. Sesi revisi ke-1 (penyesuaian tata letak profil direksi dan kontak cabang) selesai diimplementasikan. Menunggu konfirmasi final.',
    deliverablesPreview: [
      'Master Source Code Company Profile Korporat 6 Halaman',
      'Panduan Operasional & Dokumentasi Struktur Kode',
      'Konfigurasi Meta Tags SEO On-Page'
    ]
  },
  {
    id: 'ORD-AT-2026-0005',
    orderNumber: 'ORD-AT-2026-0005',
    statusType: 'FIX_ORDER',
    clientName: '-',
    clientPhone: '089699887766',
    clientEmail: 'rian.prawira@student.univ.ac.id',
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
    revisionHistory: [
      {
        sessionNumber: 1,
        date: '01 November 2026',
        note: 'Penambahan field catatan alergi obat pada form rekam medis dan relasi foreign key tabel pasien.',
        timestamp: '2026-11-01T14:15:00.000Z'
      },
      {
        sessionNumber: 2,
        date: '03 November 2026',
        note: 'Penyesuaian format cetak PDF resep dokter dan perapihan layout login form peran dokter.',
        timestamp: '2026-11-03T09:45:00.000Z'
      }
    ],
    developerNotes: 'Seluruh tahapan rekayasa telah rampung 100%. Master Source Code (.zip), database .sql dengan dummy data, serta dokumen SRS/SDD dan UML diagram lengkap telah diserahterimakan. Masa garansi bug 1 minggu aktif hingga 12 November 2026.',
    deliverablesPreview: [
      'Master Source Code Sistem Web Rekam Medis Siap Run',
      'Database Relasional (.sql) dengan 60+ data rekam medis dummy',
      'Dokumen SRS & SDD Standar IEEE Formal Lengkap',
      'Paket UML Diagrams (Use Case, Activity, Sequence, Class, ERD)'
    ]
  }
];

/**
 * Get all orders from localStorage, fallback to INITIAL_ORDERS only on very first visit
 */
export function getAllOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // Only seed initial orders if key has never been set (null)
    if (raw === null) {
      saveAllOrders(INITIAL_ORDERS);
      return INITIAL_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

/**
 * Save array of orders to localStorage and notify all listeners
 */
export function saveAllOrders(orders) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders || []));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('aksara_orders_updated'));
    }
  } catch (e) {
    // LocalStorage quota error handling
  }
}

/**
 * Find order by Ticket ID or WhatsApp Phone Number strictly from database
 */
export function findOrderByQuery(rawQuery) {
  if (!rawQuery) return null;
  const orders = getAllOrders();
  const normalizedQuery = rawQuery.trim().toLowerCase().replace(/[\s-]/g, '');

  return orders.find(ord => {
    const ordIdNorm = (ord.id || '').toLowerCase().replace(/[\s-]/g, '');
    const ordNoNorm = (ord.orderNumber || '').toLowerCase().replace(/[\s-]/g, '');
    const ordPhoneNorm = (ord.clientPhone || '').replace(/[\s-+]/g, '').replace(/^62/, '0');
    const qPhoneNorm = normalizedQuery.replace(/[\s-+]/g, '').replace(/^62/, '0');

    return ordIdNorm === normalizedQuery ||
           ordNoNorm === normalizedQuery ||
           ordIdNorm.includes(normalizedQuery) ||
           ordNoNorm.includes(normalizedQuery) ||
           (qPhoneNorm.length >= 8 && ordPhoneNorm.includes(qPhoneNorm));
  }) || null;
}

/**
 * Update an existing order and sync to Google Spreadsheet Web App
 */
export function updateOrder(updatedOrder) {
  const orders = getAllOrders();
  const index = orders.findIndex(o => o.id === updatedOrder.id);
  if (index >= 0) {
    orders[index] = { ...orders[index], ...updatedOrder };
    saveAllOrders(orders);

    // Sync updated order to Google Sheet Webhook if configured
    try {
      syncOrderToSheet(orders[index], 'update');
    } catch (e) {}

    return true;
  }
  return false;
}

/**
 * Add a new order and sync to Google Spreadsheet Web App
 */
export function createOrder(newOrder) {
  const orders = getAllOrders();
  // Prevent duplicate insertion
  const existingIdx = orders.findIndex(o => o.id === newOrder.id);
  let updated;
  if (existingIdx >= 0) {
    orders[existingIdx] = { ...orders[existingIdx], ...newOrder };
    updated = [...orders];
  } else {
    updated = [newOrder, ...orders];
  }
  saveAllOrders(updated);

  // Background sync to Google Sheet Webhook if configured
  try {
    syncOrderToSheet(newOrder, 'append');
  } catch (e) {}

  return newOrder;
}

/**
 * Delete an order by ID or order object completely across local storage & Google Spreadsheet
 */
export function deleteOrder(orderOrId) {
  const id = typeof orderOrId === 'string' ? orderOrId : (orderOrId?.id || '');
  const orders = getAllOrders();
  const targetOrder = orders.find(o => o.id === id) || (typeof orderOrId === 'object' ? orderOrId : null);
  const filtered = orders.filter(o => o.id !== id);
  saveAllOrders(filtered);

  // Sync deletion directly to Google Sheet Webhook if configured
  try {
    syncDeleteOrderFromSheet(targetOrder || id);
  } catch (e) {}

  // Also purge from brief cache if matching or if database becomes empty
  try {
    const rawBrief = localStorage.getItem('aksara_order_brief_v1');
    if (rawBrief) {
      const parsed = JSON.parse(rawBrief);
      if (parsed && (parsed.inquiryId === id || parsed.id === id || filtered.length === 0)) {
        localStorage.removeItem('aksara_order_brief_v1');
      }
    }
  } catch (e) {}

  if (filtered.length === 0) {
    try {
      localStorage.removeItem('aksara_order_brief_v1');
    } catch (e) {}
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('aksara_orders_updated'));
  }

  return true;
}

/**
 * Clear all orders completely
 */
export function clearAllOrders() {
  saveAllOrders([]);
  try {
    localStorage.removeItem('aksara_order_brief_v1');
  } catch (e) {}

  // Sync clear_all to Google Sheet Webhook if configured
  try {
    const config = getSheetConfig();
    if (config?.webhookUrl && config.webhookUrl.trim().startsWith('http')) {
      fetch(config.webhookUrl.trim(), {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'clear_all',
          orders: []
        })
      }).catch(() => {});
    }
  } catch (e) {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('aksara_orders_updated'));
  }
}

/**
 * Reset orders to initial sample demos
 */
export function resetToDefaultOrders() {
  saveAllOrders(INITIAL_ORDERS);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('aksara_orders_updated'));
  }
  return INITIAL_ORDERS;
}

/**
 * Get Google Sheet Webhook Config
 */
export function getSheetConfig() {
  try {
    const raw = localStorage.getItem(SHEET_CONFIG_KEY);
    return raw ? JSON.parse(raw) : { webhookUrl: '', spreadsheetUrl: '', sheetName: 'Orders' };
  } catch (e) {
    return { webhookUrl: '', spreadsheetUrl: '', sheetName: 'Orders' };
  }
}

/**
 * Save Google Sheet Webhook Config
 */
export function saveSheetConfig(config) {
  try {
    localStorage.setItem(SHEET_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {}
}

/**
 * Send a single order to Google Spreadsheet via Webhook (Update or Append)
 */
export async function syncOrderToSheet(order, action = 'update') {
  const config = getSheetConfig();
  if (!config.webhookUrl || !config.webhookUrl.trim().startsWith('http')) {
    return { success: false, message: 'URL Webhook Google Apps Script belum diisi.' };
  }

  try {
    const payload = {
      action: action,
      id: order.id,
      orderNumber: order.orderNumber,
      clientPhone: order.clientPhone,
      order: order,
      ...order
    };

    await fetch(config.webhookUrl.trim(), {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return { success: true, message: 'Data berhasil disinkronkan ke Google Spreadsheet.' };
  } catch (err) {
    return { success: false, message: 'Gagal menghubungi server Webhook: ' + err.message };
  }
}

/**
 * Send a delete command for an order to Google Spreadsheet via Webhook
 */
export async function syncDeleteOrderFromSheet(orderOrId) {
  const config = getSheetConfig();
  if (!config.webhookUrl || !config.webhookUrl.trim().startsWith('http')) {
    return { success: false, message: 'URL Webhook Google Apps Script belum diisi.' };
  }

  const id = typeof orderOrId === 'string' ? orderOrId : (orderOrId?.id || '');
  const orderNumber = typeof orderOrId === 'object' ? (orderOrId?.orderNumber || '') : '';
  const clientPhone = typeof orderOrId === 'object' ? (orderOrId?.clientPhone || '') : '';

  try {
    await fetch(config.webhookUrl.trim(), {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'delete',
        id: id,
        orderNumber: orderNumber,
        clientPhone: clientPhone
      })
    });
    return { success: true, message: 'Perintah hapus berhasil dikirim ke Google Spreadsheet.' };
  } catch (err) {
    return { success: false, message: 'Gagal menghubungi server Webhook: ' + err.message };
  }
}

/**
 * Sync all active orders to Google Spreadsheet
 */
export async function syncAllOrdersToSheet() {
  const orders = getAllOrders();
  const config = getSheetConfig();
  if (!config.webhookUrl || !config.webhookUrl.trim().startsWith('http')) {
    return { success: false, message: 'URL Webhook Google Apps Script belum diisi.' };
  }

  try {
    await fetch(config.webhookUrl.trim(), {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'sync_all',
        orders: orders
      })
    });

    return { 
      success: true, 
      count: orders.length, 
      message: orders.length === 0
        ? 'Google Spreadsheet berhasil disinkronkan & dikosongkan (0 pesanan aktif).'
        : `Seluruh ${orders.length} pesanan berhasil disinkronkan & diperbarui rapi di Google Spreadsheet!` 
    };
  } catch (err) {
    return { success: false, message: 'Gagal menghubungi server Webhook: ' + err.message };
  }
}

export function formatPhoneNumber(phone) {
  if (!phone) return '-';
  const clean = String(phone).trim().replace(/[^\d+]/g, '');
  if (clean.startsWith('0' + '8') && clean.length >= 10) {
    return clean.slice(0, 4) + '-' + clean.slice(4, 8) + '-' + clean.slice(8);
  }
  if (clean.startsWith('628') && clean.length >= 11) {
    return '+62 ' + clean.slice(2, 5) + '-' + clean.slice(5, 9) + '-' + clean.slice(9);
  }
  return clean || phone;
}

export function formatRevisionHistoryString(history) {
  if (!Array.isArray(history) || history.length === 0) return 'Belum ada revisi';
  return history
    .map(r => `[Sesi ${r.sessionNumber} - ${r.date}]: ${r.note}`)
    .join(';\n');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Export all orders to native styled Microsoft Excel spreadsheet (.xls)
 * Professional executive styling, column widths, no warning flags, and complete revision history
 */
export function exportOrdersToExcel() {
  const orders = getAllOrders();
  const dateStr = new Date().toISOString().slice(0, 10);
  const printTimestamp = new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' });

  const headers = [
    { title: 'ID Tiket', width: 175 },
    { title: 'Nomor Order', width: 155 },
    { title: 'Tipe Status', width: 120 },
    { title: 'Nomor WhatsApp', width: 150 },
    { title: 'Email', width: 220 },
    { title: 'Nama Proyek', width: 290 },
    { title: 'Kategori', width: 160 },
    { title: 'Paket Layanan', width: 230 },
    { title: 'Total Investasi (Rp)', width: 150 },
    { title: 'Uang Muka DP 50% (Rp)', width: 150 },
    { title: 'Status Pembayaran', width: 180 },
    { title: 'Tahap SOP', width: 130 },
    { title: 'Kuota Revisi', width: 110 },
    { title: 'Riwayat Catatan Revisi', width: 330 },
    { title: 'Tanggal Pesan', width: 135 },
    { title: 'Estimasi Selesai', width: 145 },
    { title: 'Catatan Pengembang', width: 320 }
  ];

  const colgroupHtml = headers.map(h => `<col width="${h.width}" style="mso-width-source:userset;mso-width-alt:${h.width * 36};width:${h.width}pt">`).join('');

  const rowsHtml = orders.map((o, idx) => {
    const isEven = idx % 2 === 0;
    const bgRow = isEven ? '#FFFFFF' : '#F8FAFC';
    const isCompleted = o.currentStageNumber === 5;
    const isInquiry = o.statusType === 'INQUIRY';
    const statusBg = isInquiry ? '#FEF3C7' : isCompleted ? '#F0FDF4' : '#EFF6FF';
    const statusColor = isInquiry ? '#B45309' : isCompleted ? '#16A34A' : '#1D63FF';
    const statusLabel = isInquiry ? 'INQUIRY' : isCompleted ? 'SELESAI 100%' : 'FIX ORDER';

    const formattedWa = formatPhoneNumber(o.clientPhone);
    const revisionLogs = formatRevisionHistoryString(o.revisionHistory);

    return `
      <tr style="background-color: ${bgRow}; vertical-align: top;">
        <td style="mso-number-format:'\\@'; font-weight: bold; padding: 10px 12px; border: 1px solid #CBD5E1; color: #0F172A;">${o.id}</td>
        <td style="mso-number-format:'\\@'; padding: 10px 12px; border: 1px solid #CBD5E1; color: #334155;">${o.orderNumber || '-'}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1; background-color: ${statusBg}; color: ${statusColor}; font-weight: bold; text-align: center;">${statusLabel}</td>
        <td style="mso-number-format:'\\@'; padding: 10px 12px; border: 1px solid #CBD5E1; font-weight: 600; color: #0F172A; white-space: nowrap;">${formattedWa}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1; color: #475569;">${o.clientEmail || '-'}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1; font-weight: 600; color: #0F172A;">${escapeHtml(o.projectTitle)}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1; color: #334155;">${escapeHtml(o.category)}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1; color: #334155;">${escapeHtml(o.packageName)}</td>
        <td style="mso-number-format:'Rp\\ #\\,\\#\\#0'; text-align: right; padding: 10px 12px; border: 1px solid #CBD5E1; font-weight: bold; color: #0F172A;">${o.totalInvestment}</td>
        <td style="mso-number-format:'Rp\\ #\\,\\#\\#0'; text-align: right; padding: 10px 12px; border: 1px solid #CBD5E1; font-weight: bold; color: #0F172A;">${o.dpAmount}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1; font-weight: 600; color: ${o.dpStatus.includes('LUNAS') ? '#16A34A' : '#D97706'};">${escapeHtml(o.dpStatus)}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1; text-align: center; color: #334155;">Tahap ${o.currentStageNumber} dari 5</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1; text-align: center; font-weight: bold; color: ${o.revisionQuotaUsed >= 3 ? '#DC2626' : '#0F172A'};">${o.revisionQuotaUsed} / ${o.revisionQuotaTotal}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1; white-space: pre-line; font-size: 9pt; color: #334155; line-height: 1.4;">${escapeHtml(revisionLogs)}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1; color: #475569; white-space: nowrap;">${o.orderDate}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1; color: #475569; white-space: nowrap;">${o.estimatedCompletion}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1; color: #334155; font-size: 9pt; line-height: 1.4;">${escapeHtml(o.developerNotes || '-')}</td>
      </tr>
    `;
  }).join('');

  const tableHtml = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>Database Pesanan Aksara Tech</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
                <x:DoNotDisplayGridlines>False</x:DoNotDisplayGridlines>
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"/>
      <style>
        body { font-family: 'Segoe UI', Calibri, Arial, sans-serif; font-size: 10pt; color: #0F172A; }
        table { border-collapse: collapse; width: 100%; }
        th { background-color: #0F172A; color: #FFFFFF; font-weight: bold; font-size: 10.5pt; padding: 12px 10px; border: 1px solid #334155; text-align: left; vertical-align: middle; }
        td { border: 1px solid #CBD5E1; }
      </style>
    </head>
    <body>
      <table>
        <colgroup>
          ${colgroupHtml}
        </colgroup>
        <thead>
          <tr>
            <th colspan="${headers.length}" style="background-color: #0F172A; color: #FFFFFF; font-size: 13pt; font-weight: 900; padding: 14px 12px; border: 1px solid #0F172A; text-align: left;">
              DATABASE REKAPITULASI PESANAN &amp; STATUS PROYEK — AKSARA TECH DIGITAL SOLUTIONS
            </th>
          </tr>
          <tr>
            <th colspan="${headers.length}" style="background-color: #F1F5F9; color: #475569; font-size: 8.5pt; font-weight: 600; padding: 6px 12px; border: 1px solid #CBD5E1; text-align: left;">
              Dokumen Resmi Internal &bull; Tanggal Ekspor: ${printTimestamp} &bull; Total Terdaftar: ${orders.length} Pesanan Aktif
            </th>
          </tr>
          <tr>
            ${headers.map(h => `<th style="background-color: #0F172A; color: #FFFFFF; font-weight: bold; padding: 12px 10px; border: 1px solid #334155;">${h.title}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\uFEFF' + tableHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `AksaraTech_Orders_Database_${dateStr}.xls`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export all orders to CSV format with Excel regional separator compatibility (sep=;)
 */
export function exportOrdersToCSV() {
  const orders = getAllOrders();
  const headers = [
    'ID Tiket',
    'Nomor Order',
    'Tipe Status',
    'Nomor WhatsApp',
    'Email',
    'Nama Proyek',
    'Kategori',
    'Paket Layanan',
    'Total Investasi (Rp)',
    'Uang Muka DP 50% (Rp)',
    'Status Pembayaran',
    'Tahap SOP (1-5)',
    'Kuota Revisi Terpakai',
    'Riwayat Catatan Revisi',
    'Tanggal Pesan',
    'Estimasi Selesai',
    'Catatan Pengembang'
  ];

  const rows = orders.map(o => [
    `"${o.id}"`,
    `"${o.orderNumber || '-'}"`,
    `"${o.statusType}"`,
    `"${formatPhoneNumber(o.clientPhone)}"`,
    `"${o.clientEmail || '-'}"`,
    `"${(o.projectTitle || '').replace(/"/g, '""')}"`,
    `"${(o.category || '').replace(/"/g, '""')}"`,
    `"${(o.packageName || '').replace(/"/g, '""')}"`,
    o.totalInvestment,
    o.dpAmount,
    `"${(o.dpStatus || '').replace(/"/g, '""')}"`,
    o.currentStageNumber,
    `"${o.revisionQuotaUsed}/${o.revisionQuotaTotal}"`,
    `"${formatRevisionHistoryString(o.revisionHistory).replace(/"/g, '""')}"`,
    `"${o.orderDate}"`,
    `"${o.estimatedCompletion}"`,
    `"${(o.developerNotes || '').replace(/"/g, '""')}"`
  ]);

  // Use sep=;\r\n so Microsoft Excel in Indonesia/any locale splits into columns cleanly
  const csvContent = '\uFEFFsep=;\r\n' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `AksaraTech_Orders_Database_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
