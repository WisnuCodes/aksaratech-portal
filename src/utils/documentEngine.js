// Utility for Indonesian currency formatting, numbers-to-words (Terbilang), and ID generators

export const PRODUCTION_PORTAL_URL = 'https://aksaratech-portal.vercel.app';

export function getPortalBaseUrl() {
  if (typeof window !== 'undefined' && window.location) {
    const origin = window.location.origin;
    if (origin && !origin.includes('localhost') && !origin.includes('127.0.0.1')) {
      return origin;
    }
  }
  return PRODUCTION_PORTAL_URL;
}

export function formatRupiah(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount).replace(/\u00a0/g, ' ');
}

// Convert numbers to Indonesian words (Terbilang)
export function angkaTerbilang(nilai) {
  const angka = Math.floor(Math.abs(Number(nilai) || 0));
  const bilangan = [
    "", "Satu", "Dua", "Tiga", "Empat", "Lima",
    "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"
  ];

  if (angka < 12) {
    return bilangan[angka];
  } else if (angka < 20) {
    return angkaTerbilang(angka - 10) + " Belas";
  } else if (angka < 100) {
    return angkaTerbilang(Math.floor(angka / 10)) + " Puluh " + angkaTerbilang(angka % 10);
  } else if (angka < 200) {
    return "Seratus " + angkaTerbilang(angka - 100);
  } else if (angka < 1000) {
    return angkaTerbilang(Math.floor(angka / 100)) + " Ratus " + angkaTerbilang(angka % 100);
  } else if (angka < 2000) {
    return "Seribu " + angkaTerbilang(angka - 1000);
  } else if (angka < 1000000) {
    return angkaTerbilang(Math.floor(angka / 1000)) + " Ribu " + angkaTerbilang(angka % 1000);
  } else if (angka < 1000000000) {
    return angkaTerbilang(Math.floor(angka / 1000000)) + " Juta " + angkaTerbilang(angka % 1000000);
  } else if (angka < 1000000000000) {
    return angkaTerbilang(Math.floor(angka / 1000000000)) + " Miliar " + angkaTerbilang(angka % 1000000000);
  }
  return String(nilai);
}

export function terbilangRupiah(nilai) {
  const hasil = angkaTerbilang(nilai).trim();
  if (!hasil) return "Nol Rupiah";
  return (hasil + " Rupiah").replace(/\s+/g, " ");
}

export function generateInquiryId() {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `INQ-AT-${dateStr}-${randomStr}`;
}

// Generate structured executive WhatsApp message with transparent calculations
export function createWhatsAppPayload(formData, selectedPackage, selectedAddons = [], customCalculations = null) {
  const phone = "6285600386692";
  const inquiryId = formData.inquiryId || generateInquiryId();

  const packagePrice = selectedPackage?.minPrice || 0;
  const addonsTotal = (selectedAddons || []).reduce((sum, a) => sum + (Number(a.minPrice) || 0), 0);
  const totalInvestment = customCalculations?.minPrice ?? (packagePrice + addonsTotal);
  const dpAmount = customCalculations?.dpMin ?? Math.round(totalInvestment * 0.5);
  const settlementAmount = totalInvestment - dpAmount;

  const rawPhone = (formData.clientPhone || '').replace(/[\s-]/g, '');
  const digitsOnly = rawPhone.replace(/^(?:\+62|62|0)/, '');
  const displayPhone = digitsOnly ? `+62 ${digitsOnly}` : "-";

  // Functional features list
  let featuresText = "  • Mengikuti konfigurasi bawaan paket";
  if (formData.functionalFeatures && formData.functionalFeatures.length > 0) {
    featuresText = formData.functionalFeatures.map(f => `  • ${f}`).join("\n");
  }

  // Add-on itemized list
  let addonLines = "  • Tidak ada layanan tambahan (Hanya paket dasar)";
  if (selectedAddons && selectedAddons.length > 0) {
    addonLines = selectedAddons.map(a => `  • ${a.name} : ${formatRupiah(a.minPrice)}`).join("\n");
  }

  // Deliverables
  let deliverablesText = "  • Master Source Code aplikasi web (.zip)\n  • Database Relasional / Panduan Run";
  if (selectedPackage?.deliverables && selectedPackage.deliverables.length > 0) {
    deliverablesText = selectedPackage.deliverables.map(d => `  • ${d}`).join("\n");
  }

  const submissionDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const baseUrl = getPortalBaseUrl();

  // Lightweight payload for cross-device sync (HP client -> Laptop admin)
  const payloadForSync = {
    id: inquiryId,
    orderNumber: 'MENUNGGU-DP',
    statusType: 'INQUIRY',
    clientName: formData.clientName || inquiryId,
    clientPhone: (formData.clientPhone || '').replace(/[\s-]/g, ''),
    clientEmail: formData.clientEmail || '-',
    projectTitle: formData.projectTitle || 'Proyek Website Kustom Aksara Tech',
    category: formData.projectCategory || 'UMKM & Bisnis',
    packageId: selectedPackage?.id || 'umkm-katalog',
    packageName: selectedPackage?.name || 'Website UMKM & Katalog Produk Digital',
    packagePrice: packagePrice,
    addons: (selectedAddons || []).map(a => ({ name: a.name, price: a.minPrice })),
    changeRequests: [],
    totalInvestment: totalInvestment,
    dpAmount: dpAmount,
    dpStatus: 'MENUNGGU VERIFIKASI DP 50%',
    orderDate: submissionDate,
    estimatedCompletion: `${selectedPackage?.minDays || 4}–${selectedPackage?.maxDays || 7} Hari Kerja`,
    currentStageNumber: 1,
    revisionQuotaTotal: 3,
    revisionQuotaUsed: 0,
    developerNotes: formData.specialNotes || 'Formulir brief teknis diajukan via website.',
    deliverablesPreview: selectedPackage?.deliverables || ['Master Source Code (.zip)', 'Database Relasional (.sql)']
  };

  const encodedSync = encodeOrderToUrlParam(payloadForSync);
  const trackingUrl = encodedSync 
    ? `${baseUrl}/lacak?kode=${inquiryId}&d=${encodedSync}`
    : `${baseUrl}/lacak?kode=${inquiryId}`;

  const adminImportUrl = encodedSync
    ? `${baseUrl}/admin?import=${encodedSync}`
    : `${baseUrl}/admin`;

  const message = 
`*SURAT BRIEF TEKNIS & PERMINTAAN PENAWARAN PROYEK*
*AKSARA TECH – Enterprise Digital Solutions*
════════════════════════════════════════
*ID Tiket Inquiry :* ${inquiryId}
*Waktu Pengajuan  :* ${submissionDate}

*I. DATA KLIEN & IDENTITAS PROYEK:*
• ID Klien / Pemesan : ${formData.clientName || inquiryId}
• Nomor WhatsApp     : ${displayPhone}
• Alamat Email       : ${formData.clientEmail || "-"}
• Nama Proyek        : ${formData.projectTitle || "-"}
• Kategori Proyek    : ${formData.projectCategory || "-"}

*II. SPESIFIKASI PAKET DASAR:*
• Paket Layanan      : ${selectedPackage ? selectedPackage.name : "-"}
• Arsitektur Sistem  : ${selectedPackage ? selectedPackage.systemType : "-"}
• Estimasi Waktu     : ${selectedPackage ? `${selectedPackage.minDays} – ${selectedPackage.maxDays} Hari Kerja` : "-"}
• Garansi Sistem     : 7 Hari Kalender Pasca Serah Terima (Bug/Error)
• Biaya Paket Dasar  : ${formatRupiah(packagePrice)}
• Serah Terima Berkas:
${deliverablesText}

*III. MODUL FITUR FUNGSIONAL SPESIFIK:*
${featuresText}
${formData.customFeatures ? `\n*FITUR KUSTOM (CATATAN KHUSUS KLIEN):*\n"${formData.customFeatures}"` : ""}

*IV. KESIAPAN MATERI, KONTEN & DESAIN:*
• Status Materi Konten: ${formData.designReadiness || "-"}
${formData.assetDriveUrl ? `• Tautan Berkas Cloud : ${formData.assetDriveUrl}` : "• Tautan Berkas Cloud : Belum dilampirkan"}
• Referensi Gaya/Desain: ${formData.designReference || "Standar Profesional Aksara Tech"}

*V. LAYANAN TAMBAHAN (ADD-ON) DIMINTA:*
${addonLines}
${formData.customModuleRequest ? `\n*PERMINTAAN MODUL KHUSUS (ANALISIS TEKNIS):*\n"${formData.customModuleRequest}"` : ""}

*VI. RINCIAN TOTAL KALKULASI INVESTASI:*
────────────────────────────────────────
1. Biaya Paket Dasar (${selectedPackage ? selectedPackage.name : "-"}):
   ${formatRupiah(packagePrice)}

2. Rincian Layanan Tambahan (Add-on):
${addonLines}
   Subtotal Add-on : ${formatRupiah(addonsTotal)}
────────────────────────────────────────
*TOTAL ESTIMASI INVESTASI : ${formatRupiah(totalInvestment)}*
_Terbilang : ${terbilangRupiah(totalInvestment)}_
────────────────────────────────────────

*STRUKTUR TERMIN PEMBAYARAN RESMI (SOP):*
• *Termin 1 (Uang Muka / DP 50%) :* ${formatRupiah(dpAmount)}
  _Fungsi: Aktivasi antrean pengerjaan resmi, inisialisasi repositori Git, dan arsitektur kode awal._
• *Termin 2 (Pelunasan 50%)      :* ${formatRupiah(settlementAmount)}
  _Fungsi: Ditransfer pasca peninjauan demo/pratinjau live serta sebelum serah terima master code (.zip)._

*VII. KETENTUAN SOP & ALOKASI REVISI:*
• Kuota Revisi SOP    : Maksimal 3x Sesi Perbaikan Terstruktur (SOP Mutlak)
• Garansi Kode        : 7 Hari Kalender Bebas Bug Pasca Serah Terima
• Eksklusi Server     : Murni Rekayasa Software (Tidak Melayani Sewa Hosting/Domain Fisik)
• Ketentuan Uang Muka : DP 50% bersifat non-refundable setelah pengerjaan koding dimulai
• Catatan Tambahan    : ${formData.specialNotes || "Standar spesifikasi paket tanpa catatan khusus."}

*VIII. TAUTAN LACAK STATUS PROYEK LANGSUNG:*
${trackingUrl}

*IX. TAUTAN VERIFIKASI ADMIN (1-KLIK MASUK SISTEM LAPTOP/HP):*
${adminImportUrl}

════════════════════════════════════════
_Brief teknis ini dibuat secara otomatis melalui portal resmi Aksara Tech._
_Mohon konfirmasi ketersediaan antrean dan penerbitan invoice resmi untuk pembayaran Termin 1 (DP 50%). Terima kasih._`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Safe cross-device base64 URL encoding for lightweight order sync
 */
export function encodeOrderToUrlParam(order) {
  try {
    const jsonStr = JSON.stringify(order);
    return encodeURIComponent(btoa(unescape(encodeURIComponent(jsonStr))));
  } catch (e) {
    return '';
  }
}

/**
 * Safe cross-device base64 URL decoding
 */
export function decodeOrderFromUrlParam(encodedStr) {
  try {
    if (!encodedStr) return null;
    const jsonStr = decodeURIComponent(escape(atob(decodeURIComponent(encodedStr))));
    return JSON.parse(jsonStr);
  } catch (e) {
    return null;
  }
}

/**
 * Intelligent WhatsApp message text parser
 * Allows Admin to paste any client brief WhatsApp message and automatically convert it into a database order
 */
export function parseWhatsAppBriefText(rawText) {
  if (!rawText || typeof rawText !== 'string') return null;

  // Extract Inquiry ID
  const idMatch = rawText.match(/ID Tiket(?:\s+Inquiry)?\s*:\s*(INQ-AT-[\w-]+)/i) ||
                  rawText.match(/(INQ-AT-\d{8}-[A-Za-z0-9]+)/i);
  const inquiryId = idMatch ? idMatch[1].trim() : generateInquiryId();

  // Extract Client Phone
  const phoneMatch = rawText.match(/Nomor WhatsApp\s*:\s*([+\d\s-]+)/i);
  const clientPhone = phoneMatch ? phoneMatch[1].trim() : '-';

  // Extract Client Email
  const emailMatch = rawText.match(/Alamat Email\s*:\s*([^\n\r]+)/i);
  const clientEmail = emailMatch ? emailMatch[1].trim() : '-';

  // Extract Project Title
  const titleMatch = rawText.match(/Nama Proyek\s*:\s*([^\n\r]+)/i);
  const projectTitle = titleMatch ? titleMatch[1].trim() : 'Proyek Website Klien Aksara Tech';

  // Extract Category
  const catMatch = rawText.match(/Kategori Proyek\s*:\s*([^\n\r]+)/i);
  const category = catMatch ? catMatch[1].trim() : 'UMKM & Bisnis';

  // Extract Package
  const pkgMatch = rawText.match(/Paket Layanan\s*:\s*([^\n\r]+)/i);
  const packageName = pkgMatch ? pkgMatch[1].trim() : 'Website UMKM & Katalog Produk Digital';

  // Extract Total Investment
  const totalMatch = rawText.match(/TOTAL (?:ESTIMASI )?INVESTASI\s*:\s*Rp\s*([\d.]+)/i) ||
                     rawText.match(/Total Biaya.*?Rp\s*([\d.]+)/i);
  const totalInvestment = totalMatch ? Number(totalMatch[1].replace(/\./g, '')) : 300000;

  // Extract DP Amount
  const dpMatch = rawText.match(/Termin 1 \(Uang Muka \/ DP 50%\)\s*:\s*Rp\s*([\d.]+)/i) ||
                  rawText.match(/DP 50%.*?Rp\s*([\d.]+)/i);
  const dpAmount = dpMatch ? Number(dpMatch[1].replace(/\./g, '')) : Math.round(totalInvestment * 0.5);

  // Extract Notes
  const notesMatch = rawText.match(/Catatan Tambahan\s*:\s*([^\n\r]+)/i);
  const developerNotes = notesMatch ? notesMatch[1].trim() : 'Formulir brief teknis diimpor dari chat WhatsApp Klien.';

  return {
    id: inquiryId,
    orderNumber: 'MENUNGGU-DP',
    statusType: 'INQUIRY',
    clientName: inquiryId,
    clientPhone: clientPhone,
    clientEmail: clientEmail,
    projectTitle: projectTitle,
    category: category,
    packageName: packageName,
    packagePrice: totalInvestment,
    addons: [],
    changeRequests: [],
    totalInvestment: totalInvestment,
    dpAmount: dpAmount,
    dpStatus: 'MENUNGGU VERIFIKASI DP 50%',
    orderDate: new Date().toLocaleDateString('id-ID', { dateStyle: 'long' }),
    estimatedCompletion: '5–7 Hari Kerja',
    currentStageNumber: 1,
    revisionQuotaTotal: 3,
    revisionQuotaUsed: 0,
    developerNotes: developerNotes,
    deliverablesPreview: ['Master Source Code (.zip)', 'Database Relasional (.sql)']
  };
}

// Generate structured Change Request Addendum message for WhatsApp
export function createChangeRequestWhatsAppPayload(order) {
  const rawPhone = (order.clientPhone || '').replace(/[\s-]/g, '');
  const digitsOnly = rawPhone.replace(/^(?:\+62|62|0)/, '');
  const targetPhone = digitsOnly ? `62${digitsOnly}` : '6285600386692';

  const basePrice = Number(order.packagePrice) || Number(order.totalInvestment) || 0;
  const initialAddons = order.addons || [];
  const initialAddonsTotal = initialAddons.reduce((sum, a) => sum + (Number(a.price || a.minPrice) || 0), 0);
  const changeRequests = order.changeRequests || [];
  const crTotal = changeRequests.reduce((sum, cr) => sum + (Number(cr.price) || 0), 0);
  const finalTotal = basePrice + initialAddonsTotal + crTotal;
  const dpPaid = order.dpStatus?.includes('LUNAS') ? (order.dpAmount || Math.round(basePrice * 0.5)) : 0;
  const remaining = Math.max(0, finalTotal - dpPaid);

  let crItemsText = '  • Tidak ada item tambahan berjalan';
  if (changeRequests.length > 0) {
    crItemsText = changeRequests.map(cr => `  • ${cr.name} (${cr.category || 'Fitur'}): ${formatRupiah(cr.price)}${cr.notes ? `\n    Catatan: ${cr.notes}` : ''}`).join('\n');
  }

  const baseUrl = getPortalBaseUrl();
  const trackingUrl = `${baseUrl}/lacak?kode=${order.id}`;

  const message = 
`*PEMBERITAHUAN PERUBAHAN FITUR (CHANGE REQUEST) - AKSARA TECH*
*Transparansi Biaya & Rekapitulasi Investasi Proyek*
════════════════════════════════════════
*ID Tiket Proyek :* ${order.id}
*Nomor Order     :* ${order.orderNumber || '-'}
*Nama Proyek     :* ${order.projectTitle}
*Paket Utama     :* ${order.packageName || 'Kustom'} (${formatRupiah(basePrice)})

*RINCIAN ITEM PERUBAHAN / ADD-ON TAMBAHAN:*
${crItemsText}

Subtotal Change Request : ${formatRupiah(crTotal)}
────────────────────────────────────────
*STRUKTUR TRANSPARANSI BIAYA AKHIR:*
• Biaya Paket Dasar      : ${formatRupiah(basePrice)}
${initialAddons.length > 0 ? `• Add-on Awal (Brief)     : ${formatRupiah(initialAddonsTotal)}\n` : ''}• Tambahan Change Request : ${formatRupiah(crTotal)}
────────────────────────────────────────
*TOTAL INVESTASI AKHIR   : ${formatRupiah(finalTotal)}*
_Terbilang : ${terbilangRupiah(finalTotal)}_

*STATUS TERMIN PEMBAYARAN:*
• Termin 1 (DP 50% Awal) : ${formatRupiah(dpPaid)} [${order.dpStatus || 'TERCATAT'}]
• *SISA PELUNASAN TAHAP 5 : ${formatRupiah(remaining)}*
────────────────────────────────────────

Seluruh catatan tahapan koding, repositori Git, dan rincian biaya dapat Anda pantau secara transparan melalui tautan resmi pelacak:
${trackingUrl}

_Aksara Tech berkomitmen menjunjung tinggi transparansi arsitektur dan akuntabilitas biaya tanpa biaya tersembunyi._`;

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
}

// Encode all orders into a compressed URL param for seamless 1-click cross-device transfer
export function encodeOrdersToUrlParam(orders) {
  try {
    if (!Array.isArray(orders)) return '';
    const compact = orders.map(o => ({
      id: o.id,
      orderNumber: o.orderNumber,
      statusType: o.statusType,
      clientPhone: o.clientPhone,
      clientEmail: o.clientEmail,
      projectTitle: o.projectTitle,
      category: o.category,
      packageName: o.packageName,
      packagePrice: o.packagePrice,
      addons: o.addons || [],
      changeRequests: o.changeRequests || [],
      totalInvestment: o.totalInvestment,
      dpAmount: o.dpAmount,
      dpStatus: o.dpStatus,
      orderDate: o.orderDate,
      estimatedCompletion: o.estimatedCompletion,
      currentStageNumber: o.currentStageNumber,
      revisionQuotaTotal: o.revisionQuotaTotal,
      revisionQuotaUsed: o.revisionQuotaUsed,
      developerNotes: o.developerNotes,
      deliverablesPreview: o.deliverablesPreview || []
    }));
    return encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(compact)))));
  } catch (e) {
    return '';
  }
}

// Decode compressed orders URL param
export function decodeOrdersFromUrlParam(param) {
  try {
    if (!param) return null;
    const jsonStr = decodeURIComponent(escape(atob(decodeURIComponent(param))));
    const parsed = JSON.parse(jsonStr);
    return Array.isArray(parsed) ? parsed : null;
  } catch (e) {
    return null;
  }
}

// Generate WhatsApp payload for 1-click device link & sync activation
export function createWhatsAppSyncWebhookPayload(webhookUrl, spreadsheetUrl) {
  const baseUrl = getPortalBaseUrl();
  const activationUrl = `${baseUrl}/admin?set_webhook=${encodeURIComponent(webhookUrl || '')}`;

  const message =
`*KUNCI TAUTAN SINKRONISASI CLOUD - AKSARA TECH*
════════════════════════════════════════
Buka tautan di bawah ini pada perangkat HP atau Laptop Anda untuk langsung menghubungkan dan menyamakan database secara otomatis:

${activationUrl}

${spreadsheetUrl ? `Google Spreadsheet Target:\n${spreadsheetUrl}\n` : ''}
_Dengan membuka tautan di atas, perangkat Anda akan langsung tersambung ke database Google Spreadsheet yang sama._`;

  return `https://wa.me/6285600386692?text=${encodeURIComponent(message)}`;
}

// Generate WhatsApp payload for transferring entire database between HP & Laptop
export function createWhatsAppDatabaseTransferPayload(orders, webhookUrl) {
  const baseUrl = getPortalBaseUrl();
  const encodedData = encodeOrdersToUrlParam(orders);
  let transferUrl = `${baseUrl}/admin?import_all=${encodedData}`;
  if (webhookUrl && webhookUrl.trim().startsWith('http')) {
    transferUrl += `&set_webhook=${encodeURIComponent(webhookUrl.trim())}`;
  }

  const message =
`*TRANSFER CADANGAN DATABASE LENGKAP - AKSARA TECH*
════════════════════════════════════════
Total Pesanan: ${orders.length} Pesanan Aktif
Waktu Ekspor: ${new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}

Klik tautan berikut pada Laptop atau HP Anda untuk langsung menyelaraskan seluruh data pesanan:
${transferUrl}

_Peringatan: Tautan ini berisi salinan instan seluruh database pesanan aktif Anda._`;

  return `https://wa.me/6285600386692?text=${encodeURIComponent(message)}`;
}

