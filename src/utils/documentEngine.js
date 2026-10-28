// Utility for Indonesian currency formatting, numbers-to-words (Terbilang), and ID generators

export function formatRupiah(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);
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

// Generate structured WhatsApp message
export function createWhatsAppPayload(formData, selectedPackage, selectedAddons) {
  const phone = "6285600386692";
  const inquiryId = formData.inquiryId || generateInquiryId();
  
  let addonText = "-";
  if (selectedAddons && selectedAddons.length > 0) {
    addonText = selectedAddons.map(a => `  • ${a.name} (${a.priceDisplay})`).join("\n");
  }

  // Functional features list
  let featuresText = "-";
  if (formData.functionalFeatures && formData.functionalFeatures.length > 0) {
    featuresText = formData.functionalFeatures.map(f => `  • ${f}`).join("\n");
  }

  const message = 
`*PENGESAHAN BRIEF & PERMINTAAN KEBUTUHAN WEBSITE*
*AKSARA TECH – Enterprise Digital Solutions*
----------------------------------------
*ID Permintaan:* ${inquiryId}
*Tanggal:* ${new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}

*I. DATA KLIEN & ENTITAS:*
• Nama Klien/Instansi: ${formData.clientName || "-"}
• WhatsApp: ${formData.clientPhone || "-"}
• Email: ${formData.clientEmail || "-"}
• Nama Proyek: ${formData.projectTitle || "-"}
• Kategori Proyek: ${formData.projectCategory || "-"}

*II. PAKET LAYANAN TERPILIH:*
• Paket: ${selectedPackage ? selectedPackage.name : "-"}
• Karakteristik: ${selectedPackage ? selectedPackage.systemType : "-"}
• Estimasi Waktu: ${selectedPackage ? `${selectedPackage.minDays} – ${selectedPackage.maxDays} Hari Kerja` : "-"}
• Kisaran Tarif Referensi: ${selectedPackage ? `${formatRupiah(selectedPackage.minPrice)} – ${formatRupiah(selectedPackage.maxPrice)}` : "-"}

*III. SPESIFIKASI FITUR TERPILIH:*
${featuresText}
${formData.customFeatures ? `\n*FITUR KUSTOM (DIKETIK SENDIRI):*\n💬 "${formData.customFeatures}"` : ""}

*IV. KESIAPAN DESAIN & ASET VISUAL:*
• Status Kesiapan Konten: ${formData.designReadiness || "-"}
${formData.assetDriveUrl ? `• Tautan Berkas Cloud (Drive/Dropbox/dll): ${formData.assetDriveUrl}` : "• Tautan Berkas: Belum dilampirkan"}
${formData.designReference ? `• Referensi Desain / Gaya: ${formData.designReference}` : ""}

*V. LAYANAN TAMBAHAN (ADD-ON) DIMINTA:*
${addonText}
${formData.customModuleRequest ? `\n*RINCIAN PERMINTAAN MODUL KHUSUS (CHAT REQUEST):*\n💬 "${formData.customModuleRequest}"` : ""}

*VI. CATATAN & KEBUTUHAN KHUSUS:*
${formData.specialNotes ? formData.specialNotes : "Mengikuti spesifikasi standar paket."}

*VII. PERNYATAAN PERSETUJUAN AWAL:*
[x] Saya telah membaca dan memahami Ketentuan Layanan Aksara Tech.
[x] Saya memahami BATASAN EKSKLUSI SERVER (Aksara Tech murni rekayasa software, tidak melayani pembelian domain, sewa hosting, atau maintenance server).
[x] Saya memahami ketentuan Kuota Revisi Maksimal 3 Kali Mutlak dan DP min 50% non-refundable.

----------------------------------------
Mohon ditindaklanjuti untuk analisis teknis dan penerbitan Surat Penawaran Harga resmi. Terima kasih.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}