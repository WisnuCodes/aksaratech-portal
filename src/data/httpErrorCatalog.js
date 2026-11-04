// Master Catalog of HTTP Status Codes (4xx Client Errors & 5xx Server Errors)
// Aksara Tech Enterprise Incident & Diagnostic Console

export const HTTP_ERRORS = {
  // ==========================================
  // 4xx CLIENT ERRORS (29 CODES)
  // ==========================================
  400: {
    code: 400,
    name: "Bad Request",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Permintaan tidak valid, sintaks keliru, atau format payload data salah.",
    technicalDetail: "Server tidak dapat atau menolak memproses permintaan karena kesalahan pada sisi klien (misalnya sintaks payload JSON cacat, routing framing tidak valid, atau de-routing permintaan tipu daya).",
    possibleCauses: [
      "Payload JSON pada body permintaan memiliki kesalahan sintaks atau karakter ilegal.",
      "Parameter query URL tidak sesuai tipe data yang diwajibkan oleh skema validasi backend.",
      "Ukuran header permintaan melebihi batas buffer parser web server.",
      "Karakter khusus pada URL tidak di-escape (URL encoding) dengan benar."
    ],
    recommendedActions: [
      "Periksa kembali struktur data JSON atau formulir yang dikirimkan.",
      "Pastikan semua field wajib (mandatory fields) telah terisi dengan tipe data valid.",
      "Gunakan alat seperti Postman atau cURL untuk memvalidasi header Content-Type: application/json.",
      "Bersihkan cache peramban dan cookie sesi lokal."
    ],
    rfcSpec: "RFC 9110 Section 15.5.1",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  401: {
    code: 401,
    name: "Unauthorized",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Belum login, sesi kredensial kedaluwarsa, atau autentikasi gagal.",
    technicalDetail: "Permintaan memerlukan autentikasi identitas pengguna. Respons harus menyertakan header WWW-Authenticate yang memuat tantangan (challenge) yang berlaku bagi resource yang diminta.",
    possibleCauses: [
      "Token akses (Bearer JWT) tidak disertakan pada header Authorization.",
      "Masa berlaku token JWT atau cookie session login telah berakhir (expired).",
      "Kombinasi API Key, username, atau kata sandi tidak cocok dengan basis data.",
      "Tanda tangan kriptografi (cryptographic signature) token tidak valid atau telah dirusak."
    ],
    recommendedActions: [
      "Lakukan login ulang untuk memperbarui token autentikasi sesi Anda.",
      "Periksa header 'Authorization: Bearer <token>' pada permintaan API klien.",
      "Pastikan waktu jam sistem lokal perangkat sinkron dengan server NTP.",
      "Hubungi administrator jika hak akses akun Anda ditangguhkan."
    ],
    rfcSpec: "RFC 9110 Section 15.5.2",
    severity: "error",
    badgeColor: "#DC2626",
    badgeBg: "#FEF2F2"
  },
  402: {
    code: 402,
    name: "Payment Required",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Perlu pembayaran digital atau kuota langganan berbayar habis.",
    technicalDetail: "Status kode non-standar awal yang dicadangkan untuk skema pembayaran digital berbasis web di masa depan, saat ini kerap digunakan oleh layanan SaaS atau API berbayar saat kuota pemakaian/saldo habis.",
    possibleCauses: [
      "Saldo kuota langganan API berbayar atau token pemrosesan telah mencapai batas nol.",
      "Pembayaran invoice tagihan layanan belum terkonfirmasi oleh sistem payment gateway.",
      "Akun terdeteksi melampaui batas tier gratis (free tier quota exhaustion).",
      "Sistem pemrosesan langganan mikro mendeteksi status settlement pending."
    ],
    recommendedActions: [
      "Verifikasi status pembayaran invoice proyek atau tagihan add-on Anda.",
      "Top-up kuota atau tingkatkan (upgrade) paket layanan yang digunakan.",
      "Periksa dashboard billing payment gateway (Midtrans / Xendit / QRIS).",
      "Hubungi tim finansial Aksara Tech via WhatsApp resmi untuk konfirmasi pembayaran DP/pelunasan."
    ],
    rfcSpec: "RFC 9110 Section 15.5.3 (Reserved)",
    severity: "info",
    badgeColor: "#2563EB",
    badgeBg: "#EFF6FF"
  },
  403: {
    code: 403,
    name: "Forbidden",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Identitas dikenali, namun Anda tidak memiliki izin akses (hak akses ditolak).",
    technicalDetail: "Server memahami permintaan klien tetapi secara mutlak menolak untuk mengotorisasinya. Berbeda dengan 401, autentikasi ulang tidak akan mengubah hasil karena akun tidak memiliki hak istimewa (privilege) yang cukup.",
    possibleCauses: [
      "Role pengguna Anda (misal: 'User' biasa) tidak memiliki hak akses ke panel '/admin'.",
      "Alamat IP Anda diblokir oleh daftar kontrol akses (IP Whitelist/Blacklist) firewall server.",
      "Akses langsung ke direktori file (.env, skrip internal, file .git) dilarang secara ketat.",
      "Token CSRF (Cross-Site Request Forgery) hilang atau tidak cocok dengan sesi aktif."
    ],
    recommendedActions: [
      "Pastikan Anda login menggunakan akun dengan peran (role) yang memiliki wewenang memadai.",
      "Jangan mencoba mengakses direktori sensitif atau berkas terproteksi sistem.",
      "Periksa konfigurasi izin akses Role-Based Access Control (RBAC) pada controller.",
      "Jika Anda merasa ini kekeliruan, mintalah eskalasi hak izin ke superadmin sistem."
    ],
    rfcSpec: "RFC 9110 Section 15.5.4",
    severity: "error",
    badgeColor: "#DC2626",
    badgeBg: "#FEF2F2"
  },
  404: {
    code: 404,
    name: "Not Found",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Halaman, endpoint API, atau berkas yang Anda cari tidak ditemukan di server.",
    technicalDetail: "Server asal (origin server) tidak menemukan representasi terkini untuk target resource yang diminta, atau tidak bersedia mengungkap keberadaannya. Tautan mungkin rusak, salah ketik, atau telah dipindahkan.",
    possibleCauses: [
      "Penulisan alamat URL pada address bar peramban salah ketik atau terdapat karakter usang.",
      "Rute (route) halaman belum didaftarkan pada routing table aplikasi web.",
      "Berkas statis (gambar, dokumen PDF, arsip .zip) telah dipindahkan atau dihapus.",
      "Tautan dari situs eksternal mengarah ke URL usang yang tidak lagi aktif."
    ],
    recommendedActions: [
      "Periksa kembali ejaan URL pada address bar peramban Anda.",
      "Gunakan menu navigasi resmi atau tombol navigasi Beranda di bawah.",
      "Gunakan fitur pencarian katalog atau hubungi customer service kami.",
      "Jika mengakses API, periksa dokumentasi rute REST endpoint yang valid."
    ],
    rfcSpec: "RFC 9110 Section 15.5.5",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  405: {
    code: 405,
    name: "Method Not Allowed",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Metode HTTP (GET/POST/PUT/DELETE) tidak diizinkan untuk endpoint URL ini.",
    technicalDetail: "Metode permintaan yang diterima oleh server dikenali oleh origin server namun tidak didukung oleh target resource. Server wajib menyertakan header 'Allow' berisi daftar metode yang valid.",
    possibleCauses: [
      "Mengirim permintaan POST form ke rute yang hanya didefinisikan untuk metode GET.",
      "Mencoba memanggil DELETE atau PUT langsung pada halaman statis HTML.",
      "Konfigurasi route controller backend belum mendaftarkan verb HTTP yang dikirimkan klien.",
      "CORS Preflight OPTIONS request tidak dikonfigurasi dengan benar di server API."
    ],
    recommendedActions: [
      "Periksa metode HTTP yang digunakan (GET, POST, PUT, PATCH, atau DELETE).",
      "Lihat header respons 'Allow' untuk melihat metode apa saja yang diterima endpoint.",
      "Pastikan form HTML menggunakan method='POST' atau fetch API dengan method yang sesuai.",
      "Perbarui definisi rute API di backend (Express/NestJS/Laravel)."
    ],
    rfcSpec: "RFC 9110 Section 15.5.6",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  406: {
    code: 406,
    name: "Not Acceptable",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Server tidak dapat menyediakan format respons sesuai header Accept klien.",
    technicalDetail: "Target resource tidak memiliki representasi terkini yang dapat diterima oleh agen pengguna (user agent) berdasarkan header negosiasi konten proaktif yang diterima dalam permintaan (seperti Accept, Accept-Charset, Accept-Encoding, Accept-Language).",
    possibleCauses: [
      "Klien meminta respons dalam format XML ('Accept: application/xml') sementara server hanya mendukung JSON.",
      "Header Accept-Language meminta bahasa yang sama sekali tidak tersedia pada sistem lokalisasi.",
      "Header Accept-Encoding meminta algoritma kompresi yang tidak didukung backend."
    ],
    recommendedActions: [
      "Hapus atau sesuaikan header 'Accept' pada request header klien menjadi '*/*' atau 'application/json'.",
      "Pastikan klien meminta format data yang didukung oleh endpoint API.",
      "Uji coba endpoint tanpa header negosiasi ketat."
    ],
    rfcSpec: "RFC 9110 Section 15.5.7",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  407: {
    code: 407,
    name: "Proxy Authentication Required",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Klien wajib melakukan autentikasi identitas ke server proxy perantara.",
    technicalDetail: "Mirip dengan 401 (Unauthorized), namun autentikasi harus diselesaikan melalui proxy server perantara terlebih dahulu. Proxy harus mengirim header Proxy-Authenticate berisi tantangan kredensial.",
    possibleCauses: [
      "Perangkat klien berada di jaringan korporat atau kampus yang mewajibkan autentikasi proxy.",
      "Kredensial pada header Proxy-Authorization salah, kedaluwarsa, atau tidak dikirim.",
      "VPN korporat atau gateway gateway keamanan gateway memblokir lalu lintas tanpa tiket login."
    ],
    recommendedActions: [
      "Periksa konfigurasi proxy pada pengaturan jaringan sistem operasi atau peramban.",
      "Masukkan username dan password proxy jaringan lokal Anda.",
      "Hubungi administrator jaringan IT perusahaan atau kampus Anda."
    ],
    rfcSpec: "RFC 9110 Section 15.5.8",
    severity: "info",
    badgeColor: "#2563EB",
    badgeBg: "#EFF6FF"
  },
  408: {
    code: 408,
    name: "Request Timeout",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Server menunggu terlalu lama untuk menerima permintaan lengkap dari klien.",
    technicalDetail: "Server tidak menerima permintaan lengkap dalam batas waktu (timeout window) yang dipersiapkan untuk menunggu. Klien dapat mengulang permintaan yang sama tanpa modifikasi sewaktu-waktu.",
    possibleCauses: [
      "Koneksi internet klien mengalami packet loss tinggi atau latensi sangat lambat saat mengunggah payload.",
      "Proses upload berkas berukuran besar terhenti di tengah jalan karena sinyal seluler terputus.",
      "Klien membuka koneksi soket TCP tetapi menunda pengiriman baris request HTTP."
    ],
    recommendedActions: [
      "Periksa kestabilan koneksi internet seluler atau Wi-Fi Anda.",
      "Ulangi kembali pengiriman permintaan (tombol Muat Ulang di bawah).",
      "Kompres berkas atau data yang dikirim jika koneksi sedang terbatas."
    ],
    rfcSpec: "RFC 9110 Section 15.5.9",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  409: {
    code: 409,
    name: "Conflict",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Permintaan bentrok dengan kondisi state resource saat ini di server.",
    technicalDetail: "Permintaan tidak dapat diselesaikan karena adanya konflik status terkini pada resource. Paling sering terjadi pada operasi PUT, penulisan konkuren (concurrency collision), atau pelanggaran constraint unik basis data.",
    possibleCauses: [
      "Mencoba mendaftarkan akun baru dengan nomor WhatsApp atau email yang sudah terdaftar.",
      "Dua pengguna mengedit data yang sama secara bersamaan (optimistic locking collision).",
      "Mencoba membuat folder atau berkas yang namanya sudah ada pada path penyimpanan."
    ],
    recommendedActions: [
      "Periksa data input Anda, pastikan identifier unik (email/no WA/kode) belum digunakan.",
      "Muat ulang data terbaru sebelum melakukan modifikasi (merge state).",
      "Gunakan versi data atau etag terkini untuk menghindari tabrakan konkurensi."
    ],
    rfcSpec: "RFC 9110 Section 15.5.10",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  410: {
    code: 410,
    name: "Gone",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Resource telah dihapus permanen dan tidak akan tersedia kembali.",
    technicalDetail: "Target resource pernah ada di server origin, namun akses telah dinonaktifkan secara permanen dan tidak ada alamat forwarding/redirect yang diketahui. Mesin pencari wajib menghapus URL ini dari indeks.",
    possibleCauses: [
      "Paket promo lawas atau rilis sistem versi terdahulu telah dipensiunkan secara permanen.",
      "Data proyek sementara telah dihapus sesuai protokol pembersihan berkas (Data Cleansing Policy).",
      "Akun atau konten telah di-purge secara mutlak dari basis data."
    ],
    recommendedActions: [
      "Hapus bookmark atau tautan lama yang mengarah ke URL ini.",
      "Jelajahi katalog paket aktif terbaru Aksara Tech melalui menu navigasi.",
      "Hubungi kami jika Anda memerlukan arsip data proyek lama yang telah lewat masa simpan."
    ],
    rfcSpec: "RFC 9110 Section 15.5.11",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  411: {
    code: 411,
    name: "Length Required",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Header 'Content-Length' wajib disertakan pada permintaan.",
    technicalDetail: "Server menolak menerima permintaan tanpa menyertakan Content-Length yang terdefinisi. Klien dapat mengulang permintaan setelah menambahkan header panjang konten yang valid.",
    possibleCauses: [
      "Klien mengirim permintaan POST/PUT dengan payload body tanpa header 'Content-Length'.",
      "Chunked transfer encoding tidak diizinkan oleh konfigurasi web server gateway.",
      "Penggunaan skrip HTTP custom raw socket yang tidak menghitung ukuran byte payload."
    ],
    recommendedActions: [
      "Sertakan header 'Content-Length: <jumlah_byte>' pada permintaan klien Anda.",
      "Gunakan HTTP client standar (seperti axios, fetch, atau cURL) yang menghitung panjang otomatis.",
      "Pastikan body request tidak kosong jika menggunakan metode POST/PUT."
    ],
    rfcSpec: "RFC 9110 Section 15.5.12",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  412: {
    code: 412,
    name: "Precondition Failed",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Syarat prasyarat pada header permintaan (If-Match/If-None-Match) tidak terpenuhi.",
    technicalDetail: "Satu atau lebih kondisi yang diberikan dalam field header permintaan dievaluasi menjadi false ketika diuji di server origin. Digunakan untuk mencegah overwrite data usang (conditional requests).",
    possibleCauses: [
      "Nilai ETag pada header 'If-Match' tidak cocok dengan versi data saat ini di server.",
      "Resource telah diubah oleh klien lain sejak terakhir kali diambil oleh klien ini.",
      "Pemeriksaan timestamp 'If-Unmodified-Since' mendeteksi pembaruan data yang lebih baru."
    ],
    recommendedActions: [
      "Lakukan permintaan GET terbaru untuk mengambil ETag dan versi data terkini.",
      "Perbarui payload permintaan Anda dengan ETag yang cocok sebelum menyimpan perubahan.",
      "Hindari pengiriman header conditional jika modifikasi bersifat overwrite mutlak."
    ],
    rfcSpec: "RFC 9110 Section 15.5.13",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  413: {
    code: 413,
    name: "Content Too Large",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Ukuran data atau berkas yang dikirim terlalu besar melebihi batas server.",
    technicalDetail: "Server menolak memproses permintaan karena muatan muatan permintaan (payload body) lebih besar dari kapasitas yang bersedia atau mampu diproses oleh server origin (misal batas client_max_body_size Nginx).",
    possibleCauses: [
      "Mengunggah berkas lampiran zip/gambar yang melebihi batas kuota formulir (misal > 25MB).",
      "Data formulir atau payload JSON base64 terlalu besar untuk diproses memory parser backend.",
      "Konfigurasi proxy reverse memiliki batas upload yang lebih ketat dari aplikasi."
    ],
    recommendedActions: [
      "Kompres berkas (zip / gambar) menjadi ukuran yang lebih kecil sebelum mengunggah.",
      "Bagi pengunggahan data besar menjadi beberapa bagian (chunked file upload).",
      "Gunakan tautan penyimpanan cloud (Google Drive / OneDrive) untuk berkas dokumen berukuran masif."
    ],
    rfcSpec: "RFC 9110 Section 15.5.14",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  414: {
    code: 414,
    name: "URI Too Long",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Alamat URL yang diminta terlalu panjang untuk diinterpretasikan server.",
    technicalDetail: "Server menolak melayani permintaan karena target URI lebih panjang dari batas yang dapat diinterpretasikan server origin (biasanya terjadi saat form GET menyertakan data teks panjang).",
    possibleCauses: [
      "Formulir pencarian atau data besar dikirimkan via metode HTTP GET bukan POST.",
      "Perulangan tak terbatas (redirect loop) yang terus menambahkan parameter query pada URL.",
      "Klien menyematkan data biner atau token yang sangat panjang di dalam URL query string."
    ],
    recommendedActions: [
      "Ubah metode pengiriman data dari HTTP GET menjadi HTTP POST dengan body JSON.",
      "Gunakan parameter query ringkas yang hanya memuat ID atau referensi data.",
      "Periksa kode frontend apakah ada perulangan penambahan query string."
    ],
    rfcSpec: "RFC 9110 Section 15.5.15",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  415: {
    code: 415,
    name: "Unsupported Media Type",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Format media atau tipe file (MIME type) konten tidak didukung server.",
    technicalDetail: "Origin server menolak melayani permintaan karena format muatan data dalam format yang tidak didukung untuk metode yang diminta pada target resource. Header Content-Type atau Content-Encoding tidak dikenali.",
    possibleCauses: [
      "Mengirim payload dengan header 'Content-Type: text/plain' ke endpoint yang mewajibkan 'application/json'.",
      "Mengunggah file dengan ekstensi biner terlarang (misal .exe, .sh) saat server hanya menerima .zip, .sql, .pdf.",
      "Encoding kompresi bodi permintaan tidak didukung oleh dekompresor server."
    ],
    recommendedActions: [
      "Pastikan header 'Content-Type: application/json' disertakan saat mengirim JSON.",
      "Pastikan file yang diunggah sesuai format yang diizinkan (.pdf, .docx, .zip, .sql, .png, .jpg).",
      "Periksa skema multer / body-parser pada kode backend."
    ],
    rfcSpec: "RFC 9110 Section 15.5.16",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  416: {
    code: 416,
    name: "Range Not Satisfiable",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Rentang byte data yang diminta pada header Range berada di luar ukuran berkas.",
    technicalDetail: "Tidak ada rentang nilai dalam field header Range permintaan yang tumpang tindih dengan luasan target resource saat ini, atau himpunan rentang ditolak karena rentang yang diminta tidak valid.",
    possibleCauses: [
      "Aplikasi unduhan meminta byte mulai dari posisi yang melebihi ukuran total berkas di server.",
      "Berkas di server telah diperbarui atau dipotong ukurannya saat proses unduhan resume berjalan.",
      "Format sintaks header Range: bytes=... tidak valid."
    ],
    recommendedActions: [
      "Mulai unduhan berkas dari awal (byte 0) tanpa menggunakan fitur resume potongan lama.",
      "Periksa ukuran aktual berkas melalui permintaan HTTP HEAD sebelum meminta rentang byte.",
      "Hapus header 'Range' jika Anda ingin mengunduh seluruh isi berkas secara utuh."
    ],
    rfcSpec: "RFC 9110 Section 15.5.17",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  417: {
    code: 417,
    name: "Expectation Failed",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Ekspektasi yang ditentukan dalam header 'Expect' tidak dapat dipenuhi server.",
    technicalDetail: "Ekspektasi yang diberikan dalam field header Expect permintaan tidak dapat dipenuhi oleh setidaknya salah satu server masuk (inbound servers).",
    possibleCauses: [
      "Klien mengirim 'Expect: 100-continue' tetapi server origin atau proxy perantara tidak mendukungnya.",
      "Protokol komunikasi proxy perantara mematikan negosiasi pre-flight header."
    ],
    recommendedActions: [
      "Hapus header 'Expect' dari konfigurasi HTTP client Anda jika tidak esensial.",
      "Periksa apakah proxy reverse jaringan Anda mendukung fitur HTTP 100-continue.",
      "Kirim payload bodi secara langsung tanpa menantikan konfirmasi pre-flight."
    ],
    rfcSpec: "RFC 9110 Section 15.5.18",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  418: {
    code: 418,
    name: "I’m a teapot",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Lelucon Standar RFC)",
    shortDesc: "Server menolak menyeduh kopi karena server ini adalah teko teh (RFC 2324).",
    technicalDetail: "Didefinisikan dalam RFC 2324 (Hyper Text Coffee Pot Control Protocol / HTCPCP) sebagai lelucon April Mop 1998. Menunjukkan bahwa server menolak membuat kopi karena secara fisik ia adalah poci teko teh.",
    possibleCauses: [
      "Easter egg sistem yang sengaja dipicu untuk pengujian diagnostik antarmuka web.",
      "Permintaan diarahkan ke endpoint lelucon / simulasi pengujian HTTP client.",
      "Sistem pembuat kopi berbasis web mendeteksi perangkat adalah teko teh!"
    ],
    recommendedActions: [
      "Nikmati secangkir teh hangat sambil meninjau katalog rekayasa web Aksara Tech!",
      "Gunakan endpoint resmi untuk pemesanan aplikasi atau konsultasi proyek.",
      "Kembali ke Beranda atau pilih kode HTTP lain pada panel inspeksi di bawah."
    ],
    rfcSpec: "RFC 2324 Section 2.3.2 (April Fools' RFC)",
    severity: "info",
    badgeColor: "#059669",
    badgeBg: "#ECFDF5"
  },
  421: {
    code: 421,
    name: "Misdirected Request",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Permintaan diarahkan ke server yang tidak mampu memproduksi respons.",
    technicalDetail: "Permintaan dialihkan ke server yang tidak dikonfigurasi untuk menghasilkan respons untuk kombinasi skema dan otoritas yang disertakan dalam URI permintaan (misal penggunaan kembali koneksi TLS pada sertifikat multi-domain).",
    possibleCauses: [
      "Koneksi HTTP/2 multiplexing menggunakan kembali soket TCP untuk domain yang tidak memiliki sertifikat SSL yang cocok.",
      "Konfigurasi DNS mengarahkan domain klien ke IP virtual host server yang salah.",
      "Routing gateway proxy salah memetakan hostname SNI (Server Name Indication)."
    ],
    recommendedActions: [
      "Tutup dan buka kembali koneksi browser untuk memicu jabat tangan SSL/TLS baru.",
      "Periksa konfigurasi DNS A Record dan sertifikat SSL multi-domain server.",
      "Nonaktifkan connection reuse HTTP/2 jika virtual host berada di server terpisah."
    ],
    rfcSpec: "RFC 9110 Section 15.5.19",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  422: {
    code: 422,
    name: "Unprocessable Content",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Format data benar, namun terdapat kesalahan semantik validasi logika bisnis.",
    technicalDetail: "Server memahami tipe konten entitas permintaan dan sintaksnya valid, namun server tidak dapat memproses instruksi yang terkandung di dalamnya karena kegagalan aturan validasi bisnis aplikasi.",
    possibleCauses: [
      "Formulir order memiliki nilai yang gagal validasi (misal: nomor WhatsApp kurang digit, atau DP < 50%).",
      "Tanggal yang dipilih berada di masa lalu atau durasi pengerjaan tidak realistis.",
      "File database yang dikirim bukan format SQL yang valid atau tabel referensi foreign key hilang."
    ],
    recommendedActions: [
      "Periksa pesan error validasi spesifik pada setiap field formulir yang Anda kirimkan.",
      "Pastikan nomor telepon WhatsApp mengikuti format angka Indonesia yang valid (08xxx / 628xxx).",
      "Perbaiki data yang tidak memenuhi aturan bisnis sistem dan kirim ulang."
    ],
    rfcSpec: "RFC 9110 Section 15.5.20 (WebDAV RFC 4918)",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  423: {
    code: 423,
    name: "Locked",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Resource atau berkas yang diakses sedang dalam status terkunci.",
    technicalDetail: "Resource sumber atau tujuan dari metode saat ini sedang terkunci untuk mencegah modifikasi simultan (protokol WebDAV RFC 4918).",
    possibleCauses: [
      "File kode sumber atau database sedang dalam proses backup atau migrasi eksklusif.",
      "Data proyek sedang diedit oleh pengembang lain dengan status exclusive lock aktif.",
      "Akun terkunci sementara karena terdeteksi aktivitas anomali atau percobaan brute force."
    ],
    recommendedActions: [
      "Tunggu beberapa saat hingga proses penguncian (lock lease) berakhir.",
      "Hubungi administrator jika berkas terkunci tanpa pemilik sesi yang jelas.",
      "Lakukan enable eksplisit jika Anda memiliki token lock WebDAV yang sah."
    ],
    rfcSpec: "RFC 4918 Section 11.3 (WebDAV)",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  424: {
    code: 424,
    name: "Failed Dependency",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Permintaan gagal karena permintaan dependen sebelumnya mengalami kegagalan.",
    technicalDetail: "Metode tidak dapat dieksekusi pada resource karena aksi yang diminta bergantung pada aksi lain yang telah gagal dijalankan sebelumnya (biasa terjadi pada operasi batch multi-request).",
    possibleCauses: [
      "Transaksi berantai (chained request) gagal pada langkah pembuatan master data relasional.",
      "Operasi batch database dibatalkan secara keseluruhan (rollback) karena satu item gagal.",
      "Layanan webhook pihak ketiga gagal merespons dependensi verifikasi transaksi."
    ],
    recommendedActions: [
      "Periksa log kegagalan pada langkah pertama transaksi berantai Anda.",
      "Pastikan semua resource prasyarat telah berhasil dibuat sebelum memicu aksi lanjutan.",
      "Jalankan operasi per item secara individual untuk mengisolasi kegagalan dependensi."
    ],
    rfcSpec: "RFC 4918 Section 11.4 (WebDAV)",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  425: {
    code: 425,
    name: "Too Early",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Server menolak memproses permintaan berisiko diulang (Replay Attack).",
    technicalDetail: "Server tidak bersedia mengambil risiko memproses permintaan yang mungkin diulang kembali (replay attack), seperti pada data awal TLS 1.3 0-RTT (Early Data) yang belum terautentikasi penuh.",
    possibleCauses: [
      "Klien mengirim permintaan non-idempotent (seperti POST pembayaran) pada fase TLS 0-RTT.",
      "Jaringan perantara mencoba memutar ulang paket data awal sebelum sesi TLS matang."
    ],
    recommendedActions: [
      "Kirimkan permintaan setelah jabat tangan TLS 1.3 selesai secara penuh (1-RTT).",
      "Pastikan peramban atau HTTP client tidak mengaktifkan early data untuk metode mutasi state.",
      "Muat ulang halaman secara normal."
    ],
    rfcSpec: "RFC 8470 Section 5.2",
    severity: "info",
    badgeColor: "#2563EB",
    badgeBg: "#EFF6FF"
  },
  426: {
    code: 426,
    name: "Upgrade Required",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Klien wajib melakukan upgrade protokol komunikasi (misal ke TLS/HTTP 2.0).",
    technicalDetail: "Server menolak melakukan permintaan menggunakan protokol saat ini, namun bersedia melakukannya setelah klien melakukan upgrade ke protokol yang lebih baru. Server menyertakan header 'Upgrade'.",
    possibleCauses: [
      "Klien menggunakan koneksi HTTP/1.0 atau HTTP/1.1 biasa saat server mewajibkan koneksi WebSocket.",
      "Server menuntut klien beralih ke enkripsi TLS 1.3 tingkat tinggi.",
      "Peramban lawas yang tidak mendukung fitur protokol komunikasi modern."
    ],
    recommendedActions: [
      "Perbarui peramban web (browser) Anda ke versi terbaru yang mendukung standar web modern.",
      "Pastikan klien WebSocket mengirim header 'Upgrade: websocket' dan 'Connection: Upgrade'.",
      "Gunakan koneksi terenkripsi HTTPS / WSS."
    ],
    rfcSpec: "RFC 9110 Section 15.5.21",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  428: {
    code: 428,
    name: "Precondition Required",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Permintaan harus bersyarat (memerlukan header kondisi seperti If-Match).",
    technicalDetail: "Server asal mewajibkan permintaan bersifat kondisional (conditional request). Bertujuan untuk mencegah 'lost update problem', di mana klien mengambil data, memodifikasi, dan mengunggahnya saat pihak lain telah mengubahnya.",
    possibleCauses: [
      "Mencoba melakukan PUT atau PATCH data sensitif tanpa menyertakan header 'If-Match' atau ETag.",
      "Kebijakan API backend mewajibkan optimistic concurrency control untuk mencegah data tertimpa."
    ],
    recommendedActions: [
      "Lakukan request GET terlebih dahulu untuk mendapatkan ETag dari resource tersebut.",
      "Sertakan header 'If-Match: \"<etag>\"' pada permintaan PUT/PATCH Anda.",
      "Periksa dokumentasi API mengenai header kondisional yang diwajibkan."
    ],
    rfcSpec: "RFC 6585 Section 3",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  429: {
    code: 429,
    name: "Too Many Requests",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Rate Limit)",
    shortDesc: "Terlalu banyak permintaan dalam waktu singkat (melebihi batas Rate Limit).",
    technicalDetail: "Pengguna telah mengirim terlalu banyak permintaan dalam periode waktu tertentu (rate limiting). Respons dapat memuat header 'Retry-After' yang memberitahukan berapa detik klien harus menunggu.",
    possibleCauses: [
      "Mengirim formulir atau memuat ulang halaman secara berulang-ulang dalam hitungan detik.",
      "Bot scraper atau pengujian loop otomatis memicu mekanisme proteksi anti-DDoS / rate limit.",
      "Batas kuota akses API per jam atau per menit untuk IP Anda telah tercapai."
    ],
    recommendedActions: [
      "Istirahatkan sejenak dan tunggu 30–60 detik sebelum mencoba kembali.",
      "Jangan menekan tombol submit formulir secara berulang-ulang (spam click).",
      "Lihat nilai header 'Retry-After' untuk mengetahui waktu cooldown yang tepat.",
      "Hubungi administrator jika IP jaringan kantor/kampus Anda terkena pembatasan bersama."
    ],
    rfcSpec: "RFC 6585 Section 4",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  431: {
    code: 431,
    name: "Request Header Fields Too Large",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Permintaan)",
    shortDesc: "Ukuran baris header individual atau seluruh field header terlalu besar.",
    technicalDetail: "Server menolak memproses permintaan karena field header individual atau seluruh field header secara kolektif terlalu besar. Klien dapat mengulang permintaan setelah mengurangi ukuran header.",
    possibleCauses: [
      "Cookie sesi pada peramban telah menumpuk terlalu banyak data token usang.",
      "Header otorisasi menyertakan token JWT kustom yang sangat panjang dan memuat banyak klaim.",
      "Header referer atau header pelacakan analitik menyertakan data URL berukuran raksasa."
    ],
    recommendedActions: [
      "Hapus cookie dan data situs (clear cookies & storage) pada peramban Anda untuk domain ini.",
      "Periksa ukuran token otorisasi atau pangkas data cookie yang tidak diperlukan.",
      "Muat ulang peramban dalam mode Penyamaran (Incognito / Private Window)."
    ],
    rfcSpec: "RFC 6585 Section 5",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  451: {
    code: 451,
    name: "Unavailable For Legal Reasons",
    category: "4xx Client Error",
    categoryLabel: "Kesalahan Sisi Klien (Regulasi Hukum)",
    shortDesc: "Akses ke konten ini diblokir atau disensor karena tuntutan regulasi hukum.",
    technicalDetail: "Server menolak akses ke resource sebagai konsekuensi dari tuntutan hukum resmi, regulasi pemerintah, atau perintah pengadilan (dinamai dari novel fiksi ilmiah Ray Bradbury 'Fahrenheit 451').",
    possibleCauses: [
      "Konten atau domain diblokir oleh otoritas regulasi telekomunikasi setempat.",
      "Perintah pengadilan atau pelanggaran hak kekayaan intelektual (DMCA take-down notice).",
      "Pembatasan wilayah geografis (geo-blocking) berdasarkan kepatuhan hukum regional."
    ],
    recommendedActions: [
      "Periksa informasi transparansi hukum yang disertakan pada badan respons.",
      "Jika Anda mengakses dari jaringan regional yang dibatasi, periksa kepatuhan perundang-undangan.",
      "Hubungi tim hukum atau kepatuhan resmi jika Anda memiliki hak akses legal."
    ],
    rfcSpec: "RFC 7725 Section 3",
    severity: "error",
    badgeColor: "#DC2626",
    badgeBg: "#FEF2F2"
  },

  // ==========================================
  // 5xx SERVER ERRORS (11 CODES)
  // ==========================================
  500: {
    code: 500,
    name: "Internal Server Error",
    category: "5xx Server Error",
    categoryLabel: "Kesalahan Sisi Server (Internal)",
    shortDesc: "Terjadi kesalahan fatal tak terduga pada pemrosesan server backend.",
    technicalDetail: "Server mengalami kondisi tidak terduga yang mencegahnya memenuhi permintaan. Kode kesalahan server generik ini menandakan kegagalan unhandled exception, syntax error backend, atau crash proses aplikasi server.",
    possibleCauses: [
      "Unhandled exception atau runtime crash pada kode backend (Node.js/PHP/NestJS/Laravel).",
      "Koneksi ke basis data MySQL/PostgreSQL gagal atau kredensial database salah.",
      "Berkas konfigurasi environment (.env) hilang atau variabel esensial bernilai null.",
      "Kegagalan alokasi memori internal server (Out of Memory / OOM kill)."
    ],
    recommendedActions: [
      "Muat ulang halaman setelah beberapa saat (klik tombol Muat Ulang di bawah).",
      "Periksa log terminal server (error_log / pm2 logs / laravel.log) untuk melihat stack trace.",
      "Pastikan basis data MySQL aktif dan dapat menerima koneksi soket.",
      "Laporkan kode error ini beserta Incident ID ke pengembang Aksara Tech via WhatsApp."
    ],
    rfcSpec: "RFC 9110 Section 15.6.1",
    severity: "error",
    badgeColor: "#DC2626",
    badgeBg: "#FEF2F2"
  },
  501: {
    code: 501,
    name: "Not Implemented",
    category: "5xx Server Error",
    categoryLabel: "Kesalahan Sisi Server (Fitur Belum Siap)",
    shortDesc: "Server tidak mendukung fungsionalitas atau metode yang diminta.",
    technicalDetail: "Server tidak mendukung fungsi yang diperlukan untuk memenuhi permintaan. Ini adalah respons yang sesuai ketika server tidak mengenali metode permintaan dan tidak mampu mendukungnya untuk resource apa pun.",
    possibleCauses: [
      "Klien mengirim metode HTTP yang tidak lazim (misal: TRACE, CONNECT, PATCH pada server lama).",
      "Endpoint API masih berupa placeholder / sketsa kode yang belum diimplementasikan logikanya.",
      "Modul add-on khusus belum diaktifkan pada lisensi sistem web Anda."
    ],
    recommendedActions: [
      "Gunakan metode HTTP standar (GET, POST, PUT, DELETE) yang didukung server.",
      "Periksa status roadmap rilis fitur pada katalog layanan Aksara Tech.",
      "Hubungi tim teknis Aksara Tech untuk mengaktifkan modul custom yang diperlukan."
    ],
    rfcSpec: "RFC 9110 Section 15.6.2",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  502: {
    code: 502,
    name: "Bad Gateway",
    category: "5xx Server Error",
    categoryLabel: "Kesalahan Sisi Server (Proxy Gateway)",
    shortDesc: "Gateway/proxy menerima respons tidak valid dari server backend upstream.",
    technicalDetail: "Server, saat bertindak sebagai gateway atau proxy, menerima respons yang tidak valid dari server masuk (upstream server) yang dikonsultasikannya dalam upaya memenuhi permintaan.",
    possibleCauses: [
      "Aplikasi backend (Node.js/PHP-FPM/NestJS) mati (crashed) atau tidak berjalan di port target.",
      "Nginx atau Apache gagal berkomunikasi dengan socket backend upstream 127.0.0.1:3000.",
      "Server upstream menutup koneksi TCP secara mendadak (connection reset by peer).",
      "Firewall memblokir port komunikasi internal antar kontainer Docker."
    ],
    recommendedActions: [
      "Periksa apakah proses aplikasi backend utama (Node.js / PHP-FPM) sedang berjalan aktif.",
      "Periksa konfigurasi proxy_pass Nginx dan pastikan port target sesuai.",
      "Muat ulang layanan backend menggunakan process manager (misal: 'pm2 restart all').",
      "Tunggu 1–2 menit lalu muat ulang halaman."
    ],
    rfcSpec: "RFC 9110 Section 15.6.3",
    severity: "error",
    badgeColor: "#DC2626",
    badgeBg: "#FEF2F2"
  },
  503: {
    code: 503,
    name: "Service Unavailable",
    category: "5xx Server Error",
    categoryLabel: "Kesalahan Sisi Server (Overload / Maintenance)",
    shortDesc: "Server sedang kelebihan beban (overload) atau dalam masa pemeliharaan.",
    technicalDetail: "Server saat ini tidak dapat menangani permintaan karena kelebihan beban sementara atau pemeliharaan terjadwal server. Implikasinya adalah ini kondisi sementara yang akan pulih setelah beberapa waktu penundaan.",
    possibleCauses: [
      "Server web sedang dalam proses maintenance atau pembaruan kode versi terbaru.",
      "Terjadi lonjakan lalu lintas pengunjung mendadak (traffic spike) yang melebihi batas CPU/RAM.",
      "Basis data mencapai batas koneksi maksimum (max_connections reached).",
      "DDoS protection / Cloudflare mitigasi mendeteksi beban abnormal pada infrastruktur."
    ],
    recommendedActions: [
      "Tunggu beberapa menit hingga proses pemeliharaan selesai dan muat ulang halaman.",
      "Periksa pengumuman status pemeliharaan resmi dari pengelola server.",
      "Jika Anda adalah pemilik server, pantau beban CPU, RAM, dan koneksi database MySQL.",
      "Hubungi administrator hosting untuk eskalasi kapasitas spesifikasi server."
    ],
    rfcSpec: "RFC 9110 Section 15.6.4",
    severity: "error",
    badgeColor: "#DC2626",
    badgeBg: "#FEF2F2"
  },
  504: {
    code: 504,
    name: "Gateway Timeout",
    category: "5xx Server Error",
    categoryLabel: "Kesalahan Sisi Server (Batas Waktu Gateway)",
    shortDesc: "Server gateway tidak menerima respons tepat waktu dari server upstream.",
    technicalDetail: "Server, saat bertindak sebagai gateway atau proxy, tidak menerima respons tepat waktu dari server origin upstream yang diperlukan untuk melengkapi permintaan.",
    possibleCauses: [
      "Query basis data MySQL berjalan terlalu lambat (slow query / table scan tanpa indeks).",
      "Eksekusi skrip backend memakan waktu lebih lama dari batas proxy_read_timeout Nginx (misal > 60s).",
      "Panggilan API ke layanan pihak ketiga (seperti payment gateway atau email) mengalami hang.",
      "Koneksi jaringan privat antara reverse proxy dan server database terputus."
    ],
    recommendedActions: [
      "Optimalkan query database dengan menambahkan indeks pada kolom pencarian.",
      "Tingkatkan nilai 'fastcgi_read_timeout' atau 'proxy_read_timeout' di konfigurasi server.",
      "Gunakan sistem antrean (asynchronous queue / Redis job) untuk pemrosesan data masif.",
      "Muat ulang halaman setelah beberapa saat."
    ],
    rfcSpec: "RFC 9110 Section 15.6.5",
    severity: "error",
    badgeColor: "#DC2626",
    badgeBg: "#FEF2F2"
  },
  505: {
    code: 505,
    name: "HTTP Version Not Supported",
    category: "5xx Server Error",
    categoryLabel: "Kesalahan Sisi Server (Versi Protokol)",
    shortDesc: "Versi protokol HTTP yang digunakan permintaan tidak didukung server.",
    technicalDetail: "Server tidak mendukung, atau menolak untuk mendukung, versi utama HTTP yang digunakan dalam pesan permintaan. Server mengindikasikan bahwa ia tidak mampu melayani versi protokol tersebut.",
    possibleCauses: [
      "Klien menggunakan versi HTTP kuno (HTTP/0.9 atau HTTP/1.0 usang) yang dinonaktifkan.",
      "Klien mencoba memaksa HTTP/3 (QUIC) pada web server yang hanya dikonfigurasi untuk HTTP/1.1 dan HTTP/2.",
      "Kesalahan sintaksis pada baris awal HTTP protocol string permintaan mentah."
    ],
    recommendedActions: [
      "Gunakan peramban modern yang menggunakan standar HTTP/1.1 atau HTTP/2.",
      "Pastikan HTTP client Anda dikonfigurasi untuk protokol HTTP yang didukung server.",
      "Perbarui konfigurasi web server (Nginx/Apache) untuk mengaktifkan dukungan HTTP/2."
    ],
    rfcSpec: "RFC 9110 Section 15.6.6",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  506: {
    code: 506,
    name: "Variant Also Negotiates",
    category: "5xx Server Error",
    categoryLabel: "Kesalahan Sisi Server (Konfigurasi Negosiasi)",
    shortDesc: "Kesalahan konfigurasi internal negosiasi konten sirkular di server.",
    technicalDetail: "Server memiliki kesalahan konfigurasi internal: varian resource yang dipilih dikonfigurasi untuk terlibat dalam negosiasi konten transparan itu sendiri, sehingga bukan merupakan titik akhir yang tepat dalam proses negosiasi (circular reference loop).",
    possibleCauses: [
      "Modul negosiasi konten server web (mod_negotiation di Apache) terjebak dalam perulangan varian.",
      "Dua file representasi saling mereferensikan satu sama lain sebagai varian negosiasi.",
      "Kesalahan sintaksis pada file konfigurasi pemetaan MIME varian."
    ],
    recommendedActions: [
      "Periksa konfigurasi negosiasi konten pada file konfigurasi web server (.htaccess / nginx.conf).",
      "Pastikan setiap resource varian mengarah ke berkas statis akhir yang pasti.",
      "Nonaktifkan negosiasi konten transparan jika tidak secara eksplisit dibutuhkan."
    ],
    rfcSpec: "RFC 2295 Section 8.1",
    severity: "error",
    badgeColor: "#DC2626",
    badgeBg: "#FEF2F2"
  },
  507: {
    code: 507,
    name: "Insufficient Storage",
    category: "5xx Server Error",
    categoryLabel: "Kesalahan Sisi Server (Kapasitas Penuh)",
    shortDesc: "Ruang penyimpanan (disk / storage) pada server telah penuh 100%.",
    technicalDetail: "Metode tidak dapat dilakukan pada resource karena server tidak dapat menyimpan representasi yang diperlukan untuk berhasil menyelesaikan permintaan (WebDAV RFC 4918). Disk server kehabisan ruang kosong.",
    possibleCauses: [
      "Kapasitas hard drive / SSD hosting (disk quota) telah mencapai batas 100% penuh.",
      "File log aplikasi (access.log / error.log) membengkak puluhan gigabyte tanpa log rotation.",
      "Folder upload sementara atau direktori cache sesi memenuhi partisi /tmp server.",
      "Kapasitas tabel database MySQL melampaui sisa kuota storage server hosting."
    ],
    recommendedActions: [
      "Bersihkan berkas log lama, cache temporary, dan file sampah di server hosting Anda.",
      "Tingkatkan kapasitas storage (disk space) pada paket hosting atau VPS Anda.",
      "Konfigurasi logrotate otomatis untuk mencegah file log membengkak tanpa kendali.",
      "Periksa penggunaan disk melalui command terminal 'df -h' di server."
    ],
    rfcSpec: "RFC 4918 Section 11.5 (WebDAV)",
    severity: "error",
    badgeColor: "#DC2626",
    badgeBg: "#FEF2F2"
  },
  508: {
    code: 508,
    name: "Loop Detected",
    category: "5xx Server Error",
    categoryLabel: "Kesalahan Sisi Server (Perulangan Tak Terbatas)",
    shortDesc: "Server mendeteksi perulangan tak terbatas (infinite loop) saat memproses data.",
    technicalDetail: "Server menghentikan operasi karena mendeteksi perulangan tak terbatas (infinite loop) saat memproses permintaan dengan 'Depth: infinity'. Mengindikasikan kegagalan pemetaan relasional melingkar.",
    possibleCauses: [
      "Relasi data direktori atau relasi hierarki tabel database membentuk circular reference (A menunjuk B, B menunjuk A).",
      "Aturan rewrite URL pada .htaccess atau Nginx saling mengarahkan satu sama lain secara tiada akhir.",
      "Fungsi rekursif pada kode backend tidak memiliki kondisi pemberhentian (base case missing)."
    ],
    recommendedActions: [
      "Periksa kode backend apakah ada fungsi rekursif yang tidak memiliki batas terminasi.",
      "Audit aturan rewrite URL pada .htaccess atau konfigurasi rute server.",
      "Pastikan pohon hierarki data (parent-child relationship) di database memiliki struktur yang valid."
    ],
    rfcSpec: "RFC 5842 Section 7.2 (WebDAV Binding Extensions)",
    severity: "error",
    badgeColor: "#DC2626",
    badgeBg: "#FEF2F2"
  },
  510: {
    code: 510,
    name: "Not Extended",
    category: "5xx Server Error",
    categoryLabel: "Kesalahan Sisi Server (Ekstensi Eksternal)",
    shortDesc: "Ekstensi kebijakan lebih lanjut wajib disertakan untuk melayani permintaan.",
    technicalDetail: "Kebijakan untuk mengakses resource belum terpenuhi. Server dapat mengirim kembali informasi yang diperlukan klien untuk mengeluarkan permintaan yang diperluas (RFC 2774 HTTP Extension Framework).",
    possibleCauses: [
      "Permintaan memerlukan modul ekstensi HTTP khusus yang belum didefinisikan klien.",
      "Sistem proxy korporat mewajibkan deklarasi ekstensi keamanan header mandatori.",
      "Ekstensi otorisasi protokol kustom tidak didukung oleh gateway server."
    ],
    recommendedActions: [
      "Sertakan ekstensi header yang disyaratkan oleh kebijakan server pada dokumentasi API.",
      "Gunakan endpoint standar tanpa kewajiban kerangka kerja ekstensi khusus.",
      "Hubungi administrator sistem untuk rincian ekstensi kebijakan yang diwajibkan."
    ],
    rfcSpec: "RFC 2774 Section 7 (HTTP Extension Framework)",
    severity: "warning",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB"
  },
  511: {
    code: 511,
    name: "Network Authentication Required",
    category: "5xx Server Error",
    categoryLabel: "Kesalahan Sisi Server (Autentikasi Jaringan)",
    shortDesc: "Klien wajib login ke jaringan lokal (seperti Wi-Fi publik / Captive Portal).",
    technicalDetail: "Klien perlu mengautentikasi untuk mendapatkan akses jaringan. Ditujukan untuk membatasi akses oleh proxy pengendali lalu lintas (misalnya captive portal pada Wi-Fi hotel atau bandara) sebelum memberikan akses internet publik.",
    possibleCauses: [
      "Perangkat Anda terhubung ke jaringan Wi-Fi publik / kafe / kampus yang mewajibkan login Captive Portal.",
      "Masa sewa sesi akses internet pada router jaringan lokal telah kedaluwarsa.",
      "Firewall jaringan lokal mencegat semua lalu lintas HTTPS sebelum autentikasi selesai."
    ],
    recommendedActions: [
      "Buka tab baru di peramban dan kunjungi sembarang halaman HTTP (misal: http://neverssl.com) untuk membuka form login captive portal.",
      "Masukkan kredensial username/voucher Wi-Fi yang disediakan pengelola tempat.",
      "Pastikan perangkat telah terhubung penuh ke internet sebelum mengakses website ini kembali."
    ],
    rfcSpec: "RFC 6585 Section 6",
    severity: "info",
    badgeColor: "#2563EB",
    badgeBg: "#EFF6FF"
  }
};

// Helper utilities
export function getHttpError(code) {
  const numericCode = parseInt(code, 10);
  if (HTTP_ERRORS[numericCode]) {
    return HTTP_ERRORS[numericCode];
  }
  // Default fallback if unknown code requested
  return HTTP_ERRORS[404];
}

export function getAll4xxErrors() {
  return Object.values(HTTP_ERRORS).filter(err => err.code >= 400 && err.code < 500);
}

export function getAll5xxErrors() {
  return Object.values(HTTP_ERRORS).filter(err => err.code >= 500 && err.code < 600);
}

export function getAllHttpErrors() {
  return Object.values(HTTP_ERRORS);
}

