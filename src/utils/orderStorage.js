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
    clientName: 'Budi Santoso',
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
    clientName: 'Hendrawan Pratama',
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
    developerNotes: 'Formulir brief telah diterima via WhatsApp. Menunggu konfirmasi bukti transfer uang muka termin 1 (DP 50%) dari calon klien untuk memasukkan proyek ke dalam antrean pengerjaan.',
    deliverablesPreview: [
      'Master Source Code Toko Daring',
      'Database Relasional (.sql)'
    ]
  },
  {
    id: 'ORD-AT-2026-0018',
    orderNumber: 'ORD-AT-2026-0018',
    statusType: 'FIX_ORDER',
    clientName: 'PT Samudera Logistik Nusantara',
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
    statusType: 'FIX_ORDER',
    clientName: 'Rian Prawira',
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
 * Update an existing order
 */
export function updateOrder(updatedOrder) {
  const orders = getAllOrders();
  const index = orders.findIndex(o => o.id === updatedOrder.id);
  if (index >= 0) {
    orders[index] = { ...orders[index], ...updatedOrder };
    saveAllOrders(orders);
    return true;
  }
  return false;
}

/**
 * Add a new order
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
  return newOrder;
}

/**
 * Delete an order by ID completely across all storage
 */
export function deleteOrder(id) {
  const orders = getAllOrders();
  const filtered = orders.filter(o => o.id !== id);
  saveAllOrders(filtered);

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
}

/**
 * Clear all orders completely
 */
export function clearAllOrders() {
  saveAllOrders([]);
  try {
    localStorage.removeItem('aksara_order_brief_v1');
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
    return raw ? JSON.parse(raw) : { webhookUrl: '', sheetName: 'Orders' };
  } catch (e) {
    return { webhookUrl: '', sheetName: 'Orders' };
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
 * Opens with clean separate columns, styled navy header, zebra rows, and preserved phone numbers
 */
export function exportOrdersToExcel() {
  const orders = getAllOrders();
  const dateStr = new Date().toISOString().slice(0, 10);

  const headers = [
    'ID Tiket',
    'Nomor Order',
    'Tipe Status',
    'Nama Klien',
    'Nomor WhatsApp',
    'Email',
    'Nama Proyek',
    'Kategori',
    'Paket Layanan',
    'Total Investasi (Rp)',
    'Uang Muka DP 50% (Rp)',
    'Status Pembayaran',
    'Tahap SOP',
    'Kuota Revisi',
    'Tanggal Pesan',
    'Estimasi Selesai',
    'Catatan Pengembang'
  ];

  const rowsHtml = orders.map((o, idx) => {
    const isEven = idx % 2 === 0;
    const bgRow = isEven ? '#FFFFFF' : '#F8FAFC';
    const statusBg = o.statusType === 'FIX_ORDER' ? '#EFF6FF' : '#FEF3C7';
    const statusColor = o.statusType === 'FIX_ORDER' ? '#1D63FF' : '#B45309';

    return `
      <tr style="background-color: ${bgRow};">
        <td style="mso-number-format:'\\@'; font-weight: bold; padding: 10px 12px; border: 1px solid #CBD5E1;">${o.id}</td>
        <td style="mso-number-format:'\\@'; padding: 10px 12px; border: 1px solid #CBD5E1;">${o.orderNumber || '-'}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1; background-color: ${statusBg}; color: ${statusColor}; font-weight: bold;">${o.statusType === 'FIX_ORDER' ? 'FIX ORDER' : 'INQUIRY'}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1; font-weight: bold;">${escapeHtml(o.clientName)}</td>
        <td style="mso-number-format:'\\@'; padding: 10px 12px; border: 1px solid #CBD5E1;">${o.clientPhone}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1;">${o.clientEmail || '-'}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1;">${escapeHtml(o.projectTitle)}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1;">${escapeHtml(o.category)}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1;">${escapeHtml(o.packageName)}</td>
        <td style="mso-number-format:'\\#\\,\\#\\#0'; text-align: right; padding: 10px 12px; border: 1px solid #CBD5E1; font-weight: bold;">${o.totalInvestment}</td>
        <td style="mso-number-format:'\\#\\,\\#\\#0'; text-align: right; padding: 10px 12px; border: 1px solid #CBD5E1;">${o.dpAmount}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1; font-weight: bold;">${escapeHtml(o.dpStatus)}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1; text-align: center;">Tahap ${o.currentStageNumber} dari 5</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1; text-align: center;">${o.revisionQuotaUsed} / ${o.revisionQuotaTotal}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1;">${o.orderDate}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1;">${o.estimatedCompletion}</td>
        <td style="padding: 10px 12px; border: 1px solid #CBD5E1;">${escapeHtml(o.developerNotes || '')}</td>
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
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"/>
      <style>
        body { font-family: 'Segoe UI', Calibri, Arial, sans-serif; font-size: 10pt; }
        table { border-collapse: collapse; width: 100%; }
        th { background-color: #0F172A; color: #FFFFFF; font-weight: bold; font-size: 11pt; padding: 12px 10px; border: 1px solid #0F172A; text-align: left; }
      </style>
    </head>
    <body>
      <table>
        <thead>
          <tr>
            ${headers.map(h => `<th style="background-color: #0F172A; color: #FFFFFF; font-weight: bold; padding: 12px 10px; border: 1px solid #0F172A;">${h}</th>`).join('')}
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
    'Nama Klien',
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
    'Tanggal Pesan',
    'Estimasi Selesai',
    'Catatan Pengembang'
  ];

  const rows = orders.map(o => [
    `"${o.id}"`,
    `"${o.orderNumber || '-'}"`,
    `"${o.statusType}"`,
    `"${(o.clientName || '').replace(/"/g, '""')}"`,
    `"=""${o.clientPhone}"""`,
    `"${o.clientEmail || '-'}"`,
    `"${(o.projectTitle || '').replace(/"/g, '""')}"`,
    `"${(o.category || '').replace(/"/g, '""')}"`,
    `"${(o.packageName || '').replace(/"/g, '""')}"`,
    o.totalInvestment,
    o.dpAmount,
    `"${(o.dpStatus || '').replace(/"/g, '""')}"`,
    o.currentStageNumber,
    `"${o.revisionQuotaUsed}/${o.revisionQuotaTotal}"`,
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

