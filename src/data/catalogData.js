// Master Catalog Data & Business Rules for Aksara Tech
export const BUSINESS_INFO = {
  name: "AKSARA TECH",
  tagline: "Enterprise Digital Solutions & Software Engineering",
  phone: "085600386692",
  phoneDisplay: "0856-0038-6692",
  phoneInternational: "+6285600386692",
  waNumber: "6285600386692",
  revisionMax: 3,
  dpPercent: 50,
  maxPackagePrice: 650000,
  maintenanceDailyPrice: 50000,
};

export const PACKAGES = [
  {
    id: "landing-page",
    number: 1,
    name: "Landing Page Korporat",
    category: "High-Conversion Campaign",
    description: "1 Halaman web komersial eksklusif berstandar enterprise dengan tata letak responsif optimal, dirancang untuk konversi kampanye promosi bisnis.",
    minPrice: 120000,
    maxPrice: 250000,
    minDays: 3,
    maxDays: 5,
    systemType: "Statis (Tanpa Database/Login)",
    pages: "1 Halaman Panjang (Single Page Multi-Section)",
    sections: ["Hero Section", "Value Proposition", "Benefit & Solusi", "Testimoni / Portofolio", "CTA & Kontak"],
    features: ["Hero Section Responsif", "Value Proposition Bisnis", "Benefit & Solusi Layanan", "Testimoni / Portofolio", "Form Kontak & CTA"],
    deliverables: ["Master Source Code aplikasi web siap operasional", "Panduan lokal run / deployment lokal"],
    includeDocs: false,
    docsSummary: "Tanpa Dokumen Rekayasa (Opsional via Add-on)",
    includeRevision: "Fasilitas kuota revisi MAKSIMAL 3 KALI secara mutlak (minor/mayor)",
    badge: "Paling Cepat Selesai",
    recommendedFor: "Peluncuran produk baru, kampanye promosi, portofolio profesional tunggal."
  },
  {
    id: "umkm-katalog",
    number: 2,
    name: "Website UMKM & Katalog Produk Digital",
    category: "Sistem Dinamis Database",
    description: "3 hingga 5 Halaman web terstruktur elegan dilengkapi etalase produk interaktif, pencarian real-time, manajemen katalog produk, dan tombol checkout order WhatsApp.",
    minPrice: 200000,
    maxPrice: 380000,
    minDays: 4,
    maxDays: 7,
    systemType: "Dinamis dengan Database MySQL (CRUD & Manajemen Katalog)",
    pages: "3 - 5 Halaman Terstruktur (Beranda, Profil Usaha, Etalase Katalog, Kontak)",
    sections: ["Beranda Dinamis", "Profil Usaha", "Etalase Produk dengan Pencarian", "Manajemen Data Katalog (CRUD)", "Direct Order WhatsApp"],
    features: ["Katalog Produk Dinamis", "Pencarian Real-Time", "Manajemen CRUD Database MySQL", "Direct Checkout WhatsApp", "Profil Bisnis Terstruktur"],
    deliverables: ["Full Source Code lengkap", "Database Relasional (.sql)", "Ringkasan Dokumen SRS Fungsional", "ERD Database & Use Case Diagram"],
    includeDocs: true,
    docsSummary: "Termasuk Dokumen: Ringkasan SRS, ERD Database, & Use Case Diagram",
    includeRevision: "Fasilitas kuota revisi MAKSIMAL 3 KALI secara mutlak (minor/mayor)",
    badge: "Paling Populer UMKM",
    recommendedFor: "Usaha dagang, toko ritel, katalog jasa, dan UMKM yang butuh etalase digital."
  },
  {
    id: "company-profile",
    number: 3,
    name: "Company Profile Korporat",
    category: "Standard Enterprise",
    description: "5 hingga 8 Halaman korporat berkelas eksekutif dengan arsitektur sistem modern, navigasi mendalam profil perusahaan, visi-misi, serta formulir pesan interaktif.",
    minPrice: 280000,
    maxPrice: 480000,
    minDays: 5,
    maxDays: 8,
    systemType: "Semi-Dinamis (Informasi korporat & form pesan interaktif)",
    pages: "5 - 8 Halaman Korporat Eksekutif",
    sections: ["Beranda Eksekutif", "Visi, Misi & Nilai Perusahaan", "Layanan Korporat", "Portofolio Proyek", "Struktur Organisasi / Tim", "Hubungi Kami"],
    features: ["Navigasi Korporat Multi-Halaman", "Profil Visi & Misi Perusahaan", "Portofolio Proyek Interaktif", "Formulir Kontak Validasi", "Desain Responsif Eksekutif"],
    deliverables: ["Master Source Code korporat terstruktur", "Panduan Operasional & Dokumentasi Penggunaan"],
    includeDocs: false,
    docsSummary: "Panduan Operasional (SRS/SDD opsional via Add-on)",
    includeRevision: "Fasilitas kuota revisi MAKSIMAL 3 KALI secara mutlak (minor/mayor)",
    badge: "Standar Eksekutif",
    recommendedFor: "Perusahaan skala menengah, agensi, kantor konsultan, dan organisasi profesional."
  },
  {
    id: "e-commerce",
    number: 4,
    name: "E-Commerce / Toko Daring",
    category: "Standard Store",
    description: "Sistem keranjang belanja online interaktif dengan manajemen katalog produk komprehensif, multi-kategori, dan alur checkout otomatis terhubung ke WhatsApp bisnis.",
    minPrice: 350000,
    maxPrice: 580000,
    minDays: 6,
    maxDays: 9,
    systemType: "Dinamis Kompleks dengan Database MySQL (Produk, Keranjang, Transaksi)",
    pages: "Multi-Halaman Interaktif (Etalase, Detail Produk, Keranjang, Checkout)",
    sections: ["Katalog Produk Multi-Kategori", "Keranjang Belanja Interaktif", "Filter & Pencarian Lanjutan", "Checkout Form Terformat WA", "Panel Manajemen Data"],
    features: ["Katalog Produk Multi-Kategori", "Keranjang Belanja Real-Time", "Pencarian & Filter Cepat", "Sistem Checkout WhatsApp Otomatis", "Database Produk MySQL"],
    deliverables: ["Full Source Code E-Commerce Store", "Database Relasional (.sql)", "Dokumen SRS Fungsional", "ERD Database & Sequence Diagram"],
    includeDocs: true,
    docsSummary: "Termasuk Dokumen: Dokumen SRS Fungsional, ERD Database, & Sequence Diagram",
    includeRevision: "Fasilitas kuota revisi MAKSIMAL 3 KALI secara mutlak (minor/mayor)",
    badge: "Solusi Penjualan",
    recommendedFor: "Brand retail, toko pakaian, kuliner, dan pedagang daring yang ingin order WhatsApp instan."
  },
  {
    id: "skripsi-akademik",
    number: 5,
    name: "Tugas Akhir / Skripsi / Modul Akademik",
    category: "Mahasiswa & Akademisi",
    description: "Perancangan & pengembangan sistem berbasis web sesuai bab skripsi/tugas akhir, dibangun dengan arsitektur modern (MVC/PHP Native/TypeScript) lengkap dengan dokumen IEEE SRS/SDD & diagram UML.",
    minPrice: 350000,
    maxPrice: 650000,
    minDays: 5,
    maxDays: 10,
    systemType: "Full Dinamis dengan Arsitektur Database Kompleks & Multi-Role",
    pages: "Sesuai Rancangan Bab Skripsi & Kebutuhan Kasus",
    sections: ["Sistem Login Multi-Role / Hak Akses", "Pengolahan Data / Algoritma Kasus", "Laporan & Rekapitulasi Data", "Database Relasional Kompleks"],
    features: ["Sistem Autentikasi Multi-Role", "Pengolahan Data Algoritma Khusus", "Laporan & Rekapitulasi Data", "Database Relasional Kompleks", "Dokumen Lengkap Siap Sidang"],
    deliverables: [
      "Master Source Code sistem web lengkap",
      "Database Relasional (.sql) dengan data uji coba",
      "Dokumen SRS & SDD Lengkap (Standar IEEE)",
      "UML Diagrams Lengkap (Class, ERD, Use Case, Activity, Sequence)"
    ],
    includeDocs: true,
    docsSummary: "TERMASUK LENGKAP: Dokumen SRS & SDD (Standar IEEE) + UML Diagrams Lengkap",
    includeRevision: "Fasilitas kuota revisi MAKSIMAL 3 KALI secara mutlak (minor/mayor)",
    badge: "Paling Lengkap & Terjangkau",
    recommendedFor: "Mahasiswa Teknik Informatika, Sistem Informasi, Manajemen Informatika yang butuh sistem siap sidang."
  }
];

export const ADDONS = [
  {
    id: "addon-srs-sdd",
    number: 1,
    name: "Pembuatan Dokumen SRS & SDD Tambahan",
    description: "Penyusunan dokumen rekayasa perangkat lunak Software Requirements Specification (SRS) & Software Design Document (SDD) berstandar IEEE terperinci.",
    priceDisplay: "Rp 100.000 – Rp 150.000",
    minPrice: 100000,
    maxPrice: 150000,
    complexity: "Menengah / Standar",
    type: "Document"
  },
  {
    id: "addon-uml",
    number: 2,
    name: "Pembuatan UML & Diagram Sistem Lengkap",
    description: "Pemodelan lengkap: Class Diagram, ERD Database, Use Case, Activity Diagram, & Sequence Diagram sesuai sistem yang dirancang.",
    priceDisplay: "Rp 100.000 – Rp 150.000",
    minPrice: 100000,
    maxPrice: 150000,
    complexity: "Menengah / Standar",
    type: "Document"
  },
  {
    id: "addon-new-page",
    number: 3,
    name: "Penambahan Halaman Baru",
    description: "Pembuatan halaman web tambahan di luar paket standar utama berdasarkan permintaan khusus Klien.",
    priceDisplay: "Rp 50.000 / halaman",
    minPrice: 50000,
    maxPrice: 50000,
    complexity: "Sederhana / Mudah",
    type: "Feature"
  },
  {
    id: "addon-seo",
    number: 4,
    name: "Optimasi SEO On-Page Lanjutan",
    description: "Pengaturan meta tags korporat, OpenGraph social card, sitemap XML, robots.txt, serta heading semantic terstruktur.",
    priceDisplay: "Rp 75.000 – Rp 100.000",
    minPrice: 75000,
    maxPrice: 100000,
    complexity: "Sederhana / Mudah",
    type: "Feature"
  },
  {
    id: "addon-multilanguage",
    number: 5,
    name: "Fitur Multi-Bahasa (Localization)",
    description: "Penerjemahan dan konfigurasi antarmuka website ke dalam Bahasa Inggris atau bahasa asing lain.",
    priceDisplay: "Rp 100.000 – Rp 150.000",
    minPrice: 100000,
    maxPrice: 150000,
    complexity: "Menengah / Sedang",
    type: "Feature"
  },
  {
    id: "addon-mysql-crud",
    number: 6,
    name: "Integrasi Database MySQL & CRUD",
    description: "Perancangan dan pemodelan basis data relasional, tabel data, serta fitur CRUD lengkap pada sistem.",
    priceDisplay: "Rp 100.000 – Rp 150.000",
    minPrice: 100000,
    maxPrice: 150000,
    complexity: "Menengah / Sedang",
    type: "Feature"
  },
  {
    id: "addon-custom-module",
    number: 7,
    name: "Custom Request Modul Khusus",
    description: "Pengembangan modul fitur kustom spesifik di luar paket standar berdasarkan kebutuhan operasional sistem.",
    priceDisplay: "Rp 100.000 – Rp 150.000",
    minPrice: 100000,
    maxPrice: 150000,
    complexity: "Menengah / Custom",
    type: "Feature"
  },
  {
    id: "addon-auth-multi-role",
    number: 8,
    name: "Sistem Autentikasi Login & Multi-Role",
    description: "Penambahan fitur login/register aman & manajemen hak akses multi-level role (Admin, User, Manager, Supervisor).",
    priceDisplay: "Rp 100.000 – Rp 150.000",
    minPrice: 100000,
    maxPrice: 150000,
    complexity: "Kompleks / Rumit",
    type: "Feature"
  },
  {
    id: "addon-payment-gateway",
    number: 9,
    name: "Integrasi Payment Gateway Otomatis",
    description: "Penghubungan sistem pembayaran otomatis (Midtrans, Xendit, atau QRIS Instant) sesuai modul API.",
    priceDisplay: "Rp 100.000 – Rp 150.000",
    minPrice: 100000,
    maxPrice: 150000,
    complexity: "Sangat Rumit",
    type: "Feature"
  },
  {
    id: "addon-maintenance-daily",
    number: 10,
    name: "Software Maintenance & Code Enhancement (Harian)",
    description: "Layanan pemeliharaan sistem harian: perbaikan bug/error logika koding, pembaruan skrip/library, refactoring kode, dan optimasi performa software.",
    priceDisplay: "Rp 50.000 / hari kerja",
    minPrice: 50000,
    maxPrice: 50000,
    complexity: "Tarif Harian Terjangkau",
    type: "Maintenance"
  }
];

export const TECH_STACKS = {
  backend: [
    { name: "PHP Native & Laravel Framework", desc: "Arsitektur MVC tangguh, routing modular, dan pemrosesan logika backend bersih." },
    { name: "Node.js & NestJS Framework", desc: "Enterprise TypeScript, arsitektur modular, and performa asynchronous tinggi." },
    { name: "Express.js REST API", desc: "Layanan endpoint API fleksibel, cepat, dan ringan." }
  ],
  frontend: [
    { name: "JavaScript (ES6+) & TypeScript", desc: "Type-safe frontend logic, pencegahan runtime bug, dan stabilitas tinggi." },
    { name: "React.js & Next.js Framework", desc: "Komponen modern, rendering cepat (SSR/SPA), dan performa interaktif." },
    { name: "Angular Framework", desc: "Struktur enterprise SPA berkala besar berbasis TypeScript." },
    { name: "Vue.js / Vite & Modern CSS", desc: "Bundling kilat, tampilan responsif, dan animasi visual halus." }
  ],
  database: [
    { name: "MySQL / MariaDB & PostgreSQL", desc: "Database relasional ACID-compliant, perancangan skema terstandarisasi." },
    { name: "MongoDB / Mongoose", desc: "Penyimpanan dokumen NoSQL yang dinamis dan fleksibel." },
    { name: "Redis Caching & Session Store", desc: "Optimasi kecepatan akses data dan pengelolaan sesi pengguna." }
  ],
  modeling: [
    { name: "Draw.io & Lucidchart", desc: "Pemodelan visual Class Diagram, ERD, Use Case, Activity, & Sequence Diagram." },
    { name: "IEEE Standard Specification", desc: "Penyusunan dokumen Software Requirements (SRS) & Software Design (SDD)." },
    { name: "Git Version Control", desc: "Manajemen repositori kode sumber kolaboratif, aman, dan terlacak." }
  ]
};

export const WORKFLOW_STEPS = [
  {
    step: 1,
    title: "Meninjau Katalog Layanan & Plafon Tarif",
    desc: "Customer mempelajari paket deliverables, spesifikasi fungsional, estimasi durasi (3–10 hari kerja), dan plafon tarif resmi (maks Rp 650.000) tanpa biaya tersembunyi."
  },
  {
    step: 2,
    title: "Pengisian Lembar Kebutuhan Proyek (Brief Teknis)",
    desc: "Customer mengisi formulir kebutuhan secara terstruktur di website: spesifikasi sistem, UI/UX, database, modul kustom, dan petunjuk teknis sebagai acuan mutlak koding."
  },
  {
    step: 3,
    title: "Analisis Teknis & Penerbitan Penawaran Harga",
    desc: "Tim pengembang Aksara Tech memetakan modul dan menerbitkan Surat Penawaran Harga resmi (nomor OFFER-AT-2026-____) dengan rincian deliverables, jadwal, dan biaya transparan."
  },
  {
    step: 4,
    title: "Pembayaran DP 50% & Pemrosesan Kode Program",
    desc: "Penulisan source code, database (.sql), dan dokumen IEEE (SRS/SDD/UML) resmi dimulai setelah penerimaan Uang Muka (DP) minimum 50% dari total nilai penawaran."
  }
];

export const SERVER_EXCLUSIONS = [
  "Pembelian, pendaftaran, perpanjangan, atau konfigurasi nama domain internet (.com, .id, .ac.id, dll).",
  "Penyewaan, konfigurasi server, instalasi environment, atau pembayaran tagihan hosting (cPanel, VPS, Cloud Server, Dedicated Server).",
  "Proses deployment, upload berkas, rilis, atau pengisian konfigurasi SSL/DNS ke server publik milik Customer / Pelanggan.",
  "Pemeliharaan server fisik/cloud (server maintenance), penanganan server down, serangan siber pada hosting, atau kendala infrastruktur pihak ketiga."
];

export const FAQS = [
  {
    q: "Apakah biaya pembuatan website sudah termasuk hosting dan domain?",
    a: "SAMA SEKALI TIDAK. Aksara Tech berfokus murni pada Software Engineering (rekayasa perangkat lunak, source code, database, dan dokumen rekayasa). Urusan sewa hosting, pembelian domain, dan penanganan server publik merupakan hak akses dan tanggung jawab penuh pihak Klien."
  },
  {
    q: "Bagaimana ketentuan kuota revisi di Aksara Tech?",
    a: "Setiap paket mendapatkan kuota revisi MAKSIMAL 3 KALI secara mutlak setelah preview pertama. Batasan ini berlaku menyeluruh tanpa membedakan minor maupun mayor. Jika kuota 3 kali habis, penyesuaian berikutnya diperlakukan sebagai Add-on berbayar (Rp 50rb – Rp 150rb)."
  },
  {
    q: "Berapa lama estimasi pengerjaan proyek?",
    a: "Estimasi waktu pengerjaan berkisar antara 3 hingga 10 hari kerja, tergantung paket yang dipilih (Landing Page: 3–5 hari, UMKM: 4–7 hari, Compro: 5–8 hari, E-Commerce: 6–9 hari, Skripsi/Akademik: 5–10 hari)."
  },
  {
    q: "Bagaimana skema pembayaran di Aksara Tech?",
    a: "Pembayaran dibagi 2 termin: Uang Muka (DP) minimum 50% di awal sebelum penulisan kode dimulai (bersifat non-refundable bila pembatalan sepihak setelah koding jalan), dan pelunasan 50% diselesaikan sebelum penyerahan master berkas final (.zip, .sql, PDF)."
  },
  {
    q: "Apakah data dan kode sumber proyek saya dijamin aman?",
    a: "Ya, 100% Confidentiality. Kami menjamin kerahasiaan penuh atas identitas, materi proyek, dan kode sumber Anda. Sesuai Data Cleansing Policy kami, seluruh berkas pendukung dan kredensial pengujian di sistem internal kami akan dibersihkan secara berkala pasca proyek dinyatakan lunas dan serah terima tuntas."
  },
  {
    q: "Apa saja berkas yang akan saya terima saat proyek selesai?",
    a: "Anda akan menerima master berkas arsip Source Code (.zip), Skema Database (.sql), serta Dokumen Rekayasa Sistem (SRS & SDD PDF berstandar IEEE dan Diagram UML Lengkap) sesuai paket yang disepakati."
  }
];

export const TESTIMONIALS = [
  {
    id: "testi-1",
    name: "Rian Prawira",
    role: "Mahasiswa Teknik Informatika",
    organization: "Universitas Negeri di Yogyakarta",
    packageUsed: "Tugas Akhir / Skripsi Mahasiswa",
    rating: 5,
    tag: "Akademik & Skripsi",
    date: "Oktober 2026",
    quote: "Sistem web berbasis Laravel dan database MySQL yang dibangun Aksara Tech sangat rapi dan modular. Yang paling krusial, dokumen IEEE (SRS & SDD) dan diagram UML-nya (Use Case, Activity, Sequence, ERD) sangat presisi sehingga saya bisa menjawab semua pertanyaan dosen penguji saat sidang tanpa kendala!"
  },
  {
    id: "testi-2",
    name: "Dewi Anggraeni",
    role: "Owner & Founder",
    organization: "Zora Apparel (Brand Fashion)",
    packageUsed: "Website UMKM & Katalog Digital",
    rating: 5,
    tag: "UMKM & Ritel",
    date: "September 2026",
    quote: "Katalog produk interaktif dengan tombol checkout langsung ke WhatsApp sangat memudahkan pembeli kami. Pengerjaan cepat hanya 5 hari kerja, desain elegan di smartphone, dan transparansi harganya sangat jujur tanpa biaya siluman."
  },
  {
    id: "testi-3",
    name: "Hendro Kusuma, S.T.",
    role: "Direktur Operasional",
    organization: "CV Multi Sarana Rekayasa",
    packageUsed: "Company Profile Korporat",
    rating: 5,
    tag: "Korporat & B2B",
    date: "Agustus 2026",
    quote: "Company profile korporat kami sekarang terlihat sangat profesional dan bonafide untuk keperluan presentasi tender rekanan. Struktur kode rapi, alur SOP 4 tahap sangat disiplin, dan serah terima berkas master .zip sangat tertib."
  },
  {
    id: "testi-4",
    name: "Dimas Pratama",
    role: "Marketing Specialist",
    organization: "Kopi Nusantara Roastery",
    packageUsed: "Landing Page Korporat",
    rating: 5,
    tag: "High-Conversion",
    date: "Juli 2026",
    quote: "Landing page kampanye promosi kami menghasilkan tingkat klik dan konversi yang tinggi. Performa load halaman sangat gesit, tata letak visual elegan, dan proses revisinya terstruktur jelas."
  },
  {
    id: "testi-5",
    name: "Satria Ramadhan",
    role: "Pengelola Toko Online",
    organization: "Toko Perkakas Teknik Mandiri",
    packageUsed: "E-Commerce / Toko Daring",
    rating: 5,
    tag: "E-Commerce",
    date: "Juni 2026",
    quote: "Sistem keranjang belanja online yang terhubung langsung ke WhatsApp bisnis kami memangkas waktu input pesanan hingga 70%. Alur transaksi jadi serba otomatis dan rapi."
  },
  {
    id: "testi-6",
    name: "Teguh Wicaksono",
    role: "Software Lead",
    organization: "Digital Agency Partner",
    packageUsed: "Software Maintenance Harian",
    rating: 5,
    tag: "Maintenance Koding",
    date: "Mei 2026",
    quote: "Layanan maintenance koding Rp 50.000/hari sangat solutif untuk refactoring kode lama dan perbaikan bug sistem. Komunikasi via WhatsApp korporat sangat responsif dan solutif."
  }
];

export const TRUST_METRICS = [
  { value: "3 – 10 Hari", label: "Disiplin Timeline Pengerjaan", detail: "Jadwal terukur per paket" },
  { value: "Maks 3x", label: "Kuota Revisi Mutlak", detail: "Terstruktur tanpa ambigu" },
  { value: "Rp 650.000", label: "Plafon Maksimal Resmi", detail: "Tarif transparan & adil" },
  { value: "100%", label: "Jaminan Kerahasiaan", detail: "Data cleansing policy pasca lunas" }
];
