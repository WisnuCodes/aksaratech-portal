// Utility for Indonesian currency formatting, numbers-to-words (Terbilang), and ID generators

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

  const baseUrl = (typeof window !== "undefined" && window.location && window.location.origin)
    ? window.location.origin
    : "https://aksaratech.id";
  const trackingUrl = `${baseUrl}/lacak?kode=${inquiryId}`;

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

════════════════════════════════════════
_Brief teknis ini dibuat secara otomatis melalui portal resmi Aksara Tech._
_Mohon konfirmasi ketersediaan antrean dan penerbitan invoice resmi untuk pembayaran Termin 1 (DP 50%). Terima kasih._`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
