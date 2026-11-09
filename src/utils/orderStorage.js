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
 * Get all orders from localStorage, fallback to INITIAL_ORDERS
 */
export function getAllOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveAllOrders(INITIAL_ORDERS);
      return INITIAL_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_ORDERS;
  } catch (e) {
    return INITIAL_ORDERS;
  }
}

/**
 * Save array of orders to localStorage
 */
export function saveAllOrders(orders) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    // LocalStorage quota error handling
  }
}

/**
 * Find order by Ticket ID or WhatsApp Phone Number
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

    return ordIdNorm.includes(normalizedQuery) ||
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
  const updated = [newOrder, ...orders];
  saveAllOrders(updated);
  return newOrder;
}

/**
 * Delete an order by ID
 */
export function deleteOrder(id) {
  const orders = getAllOrders();
  const filtered = orders.filter(o => o.id !== id);
  saveAllOrders(filtered);
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

/**
 * Export all orders to CSV format for Google Sheets / Excel
 */
export function exportOrdersToCSV() {
  const orders = getAllOrders();
  const headers = [
    'ID Tiket',
    'Nomor Order',
    'Tipe Status',
    'Nama Klien',
    'WhatsApp',
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
    `"${o.clientName}"`,
    `"${o.clientPhone}"`,
    `"${o.clientEmail || '-'}"`,
    `"${o.projectTitle.replace(/"/g, '""')}"`,
    `"${o.category}"`,
    `"${o.packageName}"`,
    o.totalInvestment,
    o.dpAmount,
    `"${o.dpStatus}"`,
    o.currentStageNumber,
    `${o.revisionQuotaUsed}/${o.revisionQuotaTotal}`,
    `"${o.orderDate}"`,
    `"${o.estimatedCompletion}"`,
    `"${(o.developerNotes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `AksaraTech_Orders_Database_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
