// Master Catalog Data & Business Rules for Aksara Tech
export const BUSINESS_INFO = {
  name: "AKSARA TECH",
  tagline: "Digital Solutions & Software Engineering",
  phone: "085600386692",
  phoneDisplay: "0856-0038-6692",
  phoneInternational: "+6285600386692",
  waNumber: "6285600386692",
  revisionMax: 3,
  dpPercent: 50,
  maxPackagePrice: 500000,
  maintenanceDailyPrice: 50000,
  warrantyPeriod: "1 Minggu (7 Hari)",
  warrantyDescription: "Garansi Bug & Error Kode selama 1 Minggu (7 Hari Kalender) Pasca Serah Terima",
};

export const PACKAGES = [
  {
    id: "landing-page",
    number: 1,
    name: "Landing Page Korporat",
    shortName: "Landing Page",
    category: "High-Conversion Campaign",
    description: "1 Halaman web komersial eksklusif berstandar enterprise dengan tata letak responsif optimal, dirancang untuk konversi kampanye promosi bisnis.",
    minPrice: 200000,
    maxPrice: 200000,
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
    warranty: "Garansi Bug & Error Kode 1 Minggu (7 Hari)",
    badge: "Paling Cepat Selesai",
    recommendedFor: "Peluncuran produk baru, kampanye promosi, portofolio profesional tunggal."
  },
  {
    id: "umkm-katalog",
    number: 2,
    name: "Website UMKM & Katalog Produk Digital",
    shortName: "UMKM & Katalog",
    category: "Sistem Dinamis Database",
    description: "3 hingga 5 Halaman web terstruktur elegan dilengkapi etalase produk interaktif, pencarian real-time, manajemen katalog produk, dan tombol checkout order WhatsApp.",
    minPrice: 300000,
    maxPrice: 300000,
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
    warranty: "Garansi Bug & Error Kode 1 Minggu (7 Hari)",
    badge: "Paling Populer UMKM",
    recommendedFor: "Usaha dagang, toko ritel, katalog jasa, dan UMKM yang butuh etalase digital."
  },
  {
    id: "company-profile",
    number: 3,
    name: "Company Profile Korporat",
    shortName: "Company Profile",
    category: "Standard Enterprise",
    description: "5 hingga 8 Halaman korporat berkelas eksekutif dengan arsitektur sistem modern, navigasi mendalam profil perusahaan, visi-misi, serta formulir pesan interaktif.",
    minPrice: 400000,
    maxPrice: 400000,
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
    warranty: "Garansi Bug & Error Kode 1 Minggu (7 Hari)",
    badge: "Standar Eksekutif",
    recommendedFor: "Perusahaan skala menengah, agensi, kantor konsultan, dan organisasi profesional."
  },
  {
    id: "e-commerce",
    number: 4,
    name: "E-Commerce / Toko Daring",
    shortName: "E-Commerce Store",
    category: "Standard Store",
    description: "Sistem keranjang belanja online interaktif dengan manajemen katalog produk komprehensif, multi-kategori, dan alur checkout otomatis terhubung ke WhatsApp bisnis.",
    minPrice: 450000,
    maxPrice: 450000,
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
    warranty: "Garansi Bug & Error Kode 1 Minggu (7 Hari)",
    badge: "Solusi Penjualan",
    recommendedFor: "Brand retail, toko pakaian, kuliner, dan pedagang daring yang ingin order WhatsApp instan."
  },
  {
    id: "skripsi-akademik",
    number: 5,
    name: "Tugas Kuliah / Project Mahasiswa / Modul Akademik",
    shortName: "Modul Skripsi",
    category: "Mahasiswa & Akademisi",
    description: "Perancangan & pengembangan sistem berbasis web sesuai bab, rancangan sistem, & tugas kuliah, dibangun dengan arsitektur modern (MVC Framework / PHP Native / TypeScript) lengkap dokumen SRS & SDD formal dan diagram UML lengkap.",
    minPrice: 500000,
    maxPrice: 500000,
    minDays: 5,
    maxDays: 10,
    systemType: "Full Dinamis dengan Arsitektur Database Kompleks & Multi-Role",
    pages: "Sesuai Rancangan Bab Skripsi & Kebutuhan Kasus",
    sections: ["Sistem Login Multi-Role / Hak Akses", "Pengolahan Data / Algoritma Kasus", "Laporan & Rekapitulasi Data", "Database Relasional Kompleks"],
    features: ["Sistem Autentikasi Multi-Role", "Pengolahan Data Algoritma Khusus", "Laporan & Rekapitulasi Data", "Database Relasional Kompleks", "Dokumen Lengkap Siap Sidang"],
    deliverables: [
      "Master Source Code sistem web lengkap",
      "Database Relasional (.sql) dengan data uji coba",
      "Dokumen SRS & SDD Lengkap (Standar Rekayasa Formal)",
      "UML Diagrams Lengkap (Class, ERD, Use Case, Activity, Sequence)"
    ],
    includeDocs: true,
    docsSummary: "TERMASUK LENGKAP: Dokumen SRS & SDD Formal + UML Diagrams Lengkap",
    includeRevision: "Fasilitas kuota revisi MAKSIMAL 3 KALI secara mutlak (minor/mayor)",
    warranty: "Garansi Bug & Error Kode 1 Minggu (7 Hari)",
    badge: "Paling Lengkap & Siap Sidang",
    recommendedFor: "Mahasiswa Teknik Informatika, Sistem Informasi, Manajemen Informatika yang butuh sistem siap sidang."
  },
  {
    id: "tugas-kuliah-harian",
    number: 6,
    name: "Tugas Kuliah Sederhana (Modul Tugas Harian)",
    shortName: "Tugas Harian",
    category: "Praktikum & Modul Harian",
    description: "Pembuatan modul tugas harian, praktikum, atau mini-project kuliah (Front-End / Back-End / Full-Stack Sederhana) dengan clean code, sistem login (bisa multi-role), & komentar penjelas di setiap fungsi untuk memudahkan saat ditanya dosen.",
    minPrice: 100000,
    maxPrice: 100000,
    minDays: 1,
    maxDays: 3,
    systemType: "Dinamis Interaktif dengan Database MySQL / PostgreSQL (CRUD & Autentikasi Multi-Role)",
    pages: "3 - 5 Halaman (Fleksibel Sesuai Kebutuhan Tugas)",
    sections: ["Sistem Login & Autentikasi (Bisa Multi-Role)", "Modul Fungsional Tugas", "Formulir & Validasi Input", "CRUD Database Sederhana", "Komentar Penjelas Kode"],
    features: ["Pilihan Stack Bebas (PHP Native/Laravel/CI/React/Node)", "Sistem Login & Autentikasi (Bisa Multi-Role)", "Clean Code & Komentar Penjelas per Fungsi", "CRUD & Pengolahan Data Interaktif", "100% Responsif & Siap Run"],
    deliverables: ["Full Master Source Code (.zip)", "Skema Database (.sql)", "Catatan Ringkas Struktur Folder & Panduan Run Singkat"],
    includeDocs: false,
    docsSummary: "Termasuk Panduan Singkat Alur Kodingan & Komentar Kode Fungsi",
    includeRevision: "Fasilitas kuota revisi MAKSIMAL 3 KALI secara mutlak (minor/mayor)",
    warranty: "Garansi Bug & Error Kode 1 Minggu (7 Hari)",
    badge: "Paling Cepat & Hemat",
    recommendedFor: "Mahasiswa yang butuh tugas harian, praktikum koding, atau mini-project kuliah cepat selesai."
  }
];

export const ADDONS = [
  {
    id: "addon-srs-sdd",
    number: 1,
    name: "Pembuatan Dokumen SRS & SDD Tambahan",
    description: "Penyusunan dokumen rekayasa perangkat lunak Software Requirements Specification (SRS) & Software Design Document (SDD) terperinci.",
    priceDisplay: "Rp 50.000",
    minPrice: 50000,
    maxPrice: 50000,
    complexity: "Menengah / Standar",
    type: "Document"
  },
  {
    id: "addon-uml",
    number: 2,
    name: "Pembuatan UML & Diagram Sistem Lengkap",
    description: "Pemodelan lengkap: Class Diagram, ERD Database, Use Case, Activity, & Sequence Diagram sesuai sistem.",
    priceDisplay: "Rp 50.000",
    minPrice: 50000,
    maxPrice: 50000,
    complexity: "Menengah / Standar",
    type: "Document"
  },
  {
    id: "addon-new-page",
    number: 3,
    name: "Penambahan Halaman Baru",
    description: "Pembuatan halaman web tambahan di luar paket standar utama berdasarkan permintaan khusus Klien.",
    priceDisplay: "Rp 35.000 / hal",
    minPrice: 35000,
    maxPrice: 35000,
    complexity: "Sederhana / Mudah",
    type: "Feature"
  },
  {
    id: "addon-seo",
    number: 4,
    name: "Optimasi SEO On-Page Lanjutan",
    description: "Pengaturan meta tags korporat, OpenGraph social card, sitemap XML, robots.txt, serta heading.",
    priceDisplay: "Rp 40.000",
    minPrice: 40000,
    maxPrice: 40000,
    complexity: "Sederhana / Mudah",
    type: "Feature"
  },
  {
    id: "addon-multilanguage",
    number: 5,
    name: "Fitur Multi-Bahasa (Localization)",
    description: "Penerjemahan dan konfigurasi antarmuka website ke dalam Bahasa Inggris atau bahasa asing lain.",
    priceDisplay: "Rp 45.000",
    minPrice: 45000,
    maxPrice: 45000,
    complexity: "Menengah / Sedang",
    type: "Feature"
  },
  {
    id: "addon-mysql-crud",
    number: 6,
    name: "Integrasi Database MySQL & CRUD",
    description: "Perancangan dan pemodelan basis data relasional, tabel data, serta fitur CRUD pada sistem.",
    priceDisplay: "Rp 60.000",
    minPrice: 60000,
    maxPrice: 60000,
    complexity: "Menengah / Sedang",
    type: "Feature"
  },
  {
    id: "addon-custom-module",
    number: 7,
    name: "Custom Request Modul Khusus",
    description: "Pengembangan modul fitur kustom spesifik di luar paket standar berdasarkan kebutuhan operasional.",
    priceDisplay: "Rp 50.000",
    minPrice: 50000,
    maxPrice: 50000,
    complexity: "Menengah / Custom",
    type: "Feature"
  },
  {
    id: "addon-auth-multi-role",
    number: 8,
    name: "Sistem Autentikasi Login & Multi-Role",
    description: "Penambahan fitur login/register & manajemen multi-level role (Admin, User, Manager, Supervisor).",
    priceDisplay: "Rp 65.000",
    minPrice: 65000,
    maxPrice: 65000,
    complexity: "Kompleks / Rumit",
    type: "Feature"
  },
  {
    id: "addon-payment-gateway",
    number: 9,
    name: "Integrasi Payment Gateway Otomatis",
    description: "Penghubungan sistem pembayaran otomatis (Midtrans, Xendit, atau QRIS Instant) sesuai modul API.",
    priceDisplay: "Rp 75.000",
    minPrice: 75000,
    maxPrice: 75000,
    complexity: "Sangat Rumit",
    type: "Feature"
  },
  {
    id: "addon-maintenance-daily",
    number: 10,
    name: "Software Maintenance & Code Enhancement (Harian)",
    description: "Layanan pemeliharaan sistem harian, perbaikan bug/error kode, pembaruan skrip, dan code enhancement.",
    priceDisplay: "Rp 50.000 / hari",
    minPrice: 50000,
    maxPrice: 50000,
    complexity: "Tarif Harian",
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
    { name: "Standar Dokumen Rekayasa Formal", desc: "Penyusunan dokumen Software Requirements (SRS) & Software Design (SDD) terstruktur." },
    { name: "Git Version Control", desc: "Manajemen repositori kode sumber kolaboratif, aman, dan terlacak." }
  ]
};

export const WORKFLOW_STEPS = [
  {
    step: 1,
    title: "Meninjau Katalog Layanan & Plafon Tarif",
    desc: "Customer mempelajari paket deliverables, spesifikasi fungsional, estimasi durasi (1–10 hari kerja), dan plafon tarif resmi (maks Rp 500.000) tanpa biaya tersembunyi."
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
    desc: "Penulisan source code, database (.sql), dan dokumen rekayasa formal (SRS/SDD/UML) resmi dimulai setelah penerimaan Uang Muka (DP) minimum 50% dari total nilai penawaran."
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
    id: "faq-hosting",
    category: "Infrastruktur",
    badge: "Hosting & Server",
    q: "Apakah biaya pembuatan website sudah termasuk hosting dan domain?",
    a: "SAMA SEKALI TIDAK. Aksara Tech berfokus murni pada Software Engineering (rekayasa perangkat lunak, source code, database, dan dokumen rekayasa). Urusan sewa hosting, pembelian domain, dan penanganan server publik merupakan hak akses dan tanggung jawab penuh pihak Klien.",
    highlight: "SAMA SEKALI TIDAK TERMASUK HOSTING & DOMAIN",
    takeaway: "Aksara Tech fokus pada rekayasa kode sumber & arsitektur sistem. Klien memiliki kontrol penuh atas akun hosting dan domain pribadi.",
    takeawayType: "warning"
  },
  {
    id: "faq-revisi",
    category: "Ketentuan",
    badge: "Kuota Revisi",
    q: "Bagaimana ketentuan kuota revisi di Aksara Tech?",
    a: "Setiap paket mendapatkan kuota revisi MAKSIMAL 3 KALI secara mutlak setelah preview pertama. Batasan ini berlaku menyeluruh tanpa membedakan minor maupun mayor. Jika kuota 3 kali habis, penyesuaian berikutnya diperlakukan sebagai Add-on berbayar (Rp 50rb – Rp 75rb).",
    highlight: "MAKSIMAL 3 KALI REVISI MUTLAK",
    takeaway: "Berlaku mutlak untuk seluruh jenis revisi tanpa pembedaan minor/mayor. Penyesuaian setelah kuota habis dihitung sebagai add-on.",
    takeawayType: "warning"
  },
  {
    id: "faq-garansi",
    category: "Garansi",
    badge: "Jaminan Kualitas",
    q: "Apakah ada garansi setelah proyek selesai diserahkan?",
    a: "YA, SELURUH PAKET BERGARANSI 1 MINGGU (7 HARI). Kami memberikan garansi pemeliharaan perbaikan bug kode dan error fungsi secara gratis selama 7 hari kalender pasca penyerahan master berkas final (.zip, .sql) agar Anda tenang dan sistem berjalan lancar sesuai brief awal.",
    highlight: "GARANSI 7 HARI KALENDER GRATIS",
    takeaway: "Perbaikan bug kode dan eror fungsional dijamin bebas biaya selama 7 hari kalender pasca serah terima berkas final.",
    takeawayType: "success"
  },
  {
    id: "faq-waktu",
    category: "Timeline",
    badge: "Estimasi Waktu",
    q: "Berapa lama estimasi pengerjaan proyek?",
    a: "Estimasi waktu pengerjaan berkisar antara 1 hingga 10 hari kerja, tergantung paket yang dipilih (Tugas Kuliah Harian: 1–3 hari, Landing Page: 3–5 hari, UMKM: 4–7 hari, Compro: 5–8 hari, E-Commerce: 6–9 hari, Skripsi/Akademik: 5–10 hari).",
    highlight: "1 HINGGA 10 HARI KERJA",
    takeaway: "Timeline transparan dan terpantau dengan tahapan terukur: Kick-off, Development, Preview, dan Final Delivery.",
    takeawayType: "primary"
  },
  {
    id: "faq-pembayaran",
    category: "Pembayaran",
    badge: "Skema DP & Termin",
    q: "Bagaimana skema pembayaran di Aksara Tech?",
    a: "Pembayaran dibagi 2 termin: Uang Muka (DP) minimum 50% di awal sebelum penulisan kode dimulai (bersifat non-refundable bila pembatalan sepihak setelah koding jalan), dan pelunasan 50% diselesaikan sebelum penyerahan master berkas final (.zip, .sql, PDF).",
    highlight: "TERMIN 50% DP & 50% PELUNASAN",
    takeaway: "Uang Muka 50% untuk memulai koding, pelunasan 50% dilakukan setelah preview disetujui sebelum pengiriman berkas final.",
    takeawayType: "primary"
  },
  {
    id: "faq-keamanan",
    category: "Keamanan",
    badge: "Kerahasiaan Data",
    q: "Apakah data dan kode sumber proyek saya dijamin aman?",
    a: "Ya, 100% Confidentiality. Kami menjamin kerahasiaan penuh atas identitas, materi proyek, dan kode sumber Anda. Sesuai Data Cleansing Policy kami, seluruh berkas pendukung dan kredensial pengujian di sistem internal kami akan dibersihkan secara berkala pasca proyek dinyatakan lunas dan serah terima tuntas.",
    highlight: "100% CONFIDENTIAL & DATA CLEANSING",
    takeaway: "Kerahasiaan identitas dan integritas kode terjamin mutlak. Berkas pengujian dibersihkan berkala pasca serah terima.",
    takeawayType: "success"
  },
  {
    id: "faq-deliverables",
    category: "Deliverables",
    badge: "Serah Terima Berkas",
    q: "Apa saja berkas yang akan saya terima saat proyek selesai?",
    a: "Anda akan menerima master berkas arsip Source Code (.zip), Skema Database (.sql), serta Dokumen Rekayasa Sistem (SRS & SDD PDF Terstruktur dan Diagram UML Lengkap) sesuai paket yang disepakati.",
    highlight: "MASTER .ZIP + .SQL + DOKUMEN REKAYASA",
    takeaway: "Source code lengkap, skema database teruji, dan berkas dokumentasi formal berstandar rekayasa perangkat lunak.",
    takeawayType: "primary"
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
    quote: "Sistem web berbasis Laravel dan database MySQL yang dibangun Aksara Tech sangat rapi dan modular. Yang paling krusial, dokumen formal SRS & SDD dan diagram UML-nya (Use Case, Activity, Sequence, ERD) sangat presisi sehingga saya bisa menjawab semua pertanyaan dosen penguji saat sidang tanpa kendala!"
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
  { value: "1 – 10 Hari", label: "Disiplin Timeline Pengerjaan", detail: "Jadwal terukur per paket" },
  { value: "Maks 3x", label: "Kuota Revisi Mutlak", detail: "Terstruktur tanpa ambigu" },
  { value: "Rp 500.000", label: "Plafon Maksimal Resmi", detail: "Tarif transparan & adil" },
  { value: "100%", label: "Jaminan Kerahasiaan", detail: "Data cleansing policy pasca lunas" }
];
