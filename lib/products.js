export const products = [
  {
    id: "wf1-tokopedia-notifier",
    title: "n8n Tokopedia Order Notifier — Auto Alert Telegram & Filter COD",
    price: 150000,
    category: "Workflow Template",
    image: "/products/wf1.png",
    shortDescription: "Jangan Sampai Orderan Lewat Tanpa Terpantau! Otomatiskan notifikasi orderan Tokopedia ke Telegram Anda.",
    description: `Pusing harus refresh aplikasi seller terus-terusan buat ngecek ada orderan masuk atau nggak? Telat ngerespon orderan karena notif aplikasi sering telat atau ketumpuk?

Dengan **n8n Tokopedia Order Notifier**, setiap kali ada email notifikasi "Pesanan Baru" dari Tokopedia yang masuk ke Gmail kamu, robot n8n akan langsung mendeteksinya detik itu juga dan mengirimkan peringatan (alert) super cepat ke Telegram kamu!

Tidak perlu lagi mantengin aplikasi seller seharian. Biarkan robot yang bekerja menjadi asisten notifikasi pribadimu. Cocok banget buat kamu yang jualan tanpa admin atau yang punya toko dengan pesanan super padat.`,
    features: [
      "Notifikasi Real-Time: Orderan masuk di Gmail, Telegram langsung bunyi.",
      "Filter Pintar COD vs Non-COD: Workflow otomatis memisahkan orderan reguler dan orderan COD.",
      "Pesan Telegram Rapi: Notifikasi lengkap dengan Nomor Invoice, Nama Pembeli, dan Total Harga.",
      "Tanpa Biaya Bulanan: Cukup jalankan di n8n milikmu sendiri tanpa perlu langganan tools pihak ketiga.",
      "Anti-Spam: Hanya memproses email orderan yang valid."
    ],
    prerequisites: [
      "Akun n8n (Cloud atau Self-Hosted)",
      "Akun Gmail yang terhubung dengan Tokopedia Seller",
      "Akun Telegram",
      "Bot Telegram (buat gratis via @BotFather)"
    ],
    setupGuide: `1. Import file workflow.json ke dalam n8n Anda.
2. Pada node "Gmail Trigger", masukkan Credential Gmail Anda.
3. Pada node "Telegram COD" dan "Telegram Reguler", masukkan Credential Bot Telegram Anda serta isi Chat ID tujuan.
4. Klik "Execute Workflow" dan kirim email percobaan untuk mengetes.
5. Jika sukses, klik "Publish" untuk mengaktifkan workflow 24/7.`
  },
  {
    id: "wf2-product-desc-generator",
    title: "n8n AI Product Description Generator — Sekali Klik Ratusan Deskripsi!",
    price: 200000,
    category: "Workflow Template",
    image: "/products/wf2.png",
    shortDescription: "Otomatis generate ratusan deskripsi produk SEO-friendly langsung ke Google Sheets dengan AI.",
    description: `Upload massal produk ke marketplace tapi pusing bikin deskripsi satu-satu? Nulis deskripsi manual itu buang-buang waktu dan rawan bikin calon pembeli kabur kalau kata-katanya kaku!

Dengan **n8n AI Product Description Generator**, kamu cukup siapkan daftar nama produk dan spesifikasi singkat di Google Sheets. Robot n8n akan otomatis membacanya, mengirimkannya ke ChatGPT, dan mengembalikan hasil deskripsi yang super persuasif, SEO-friendly, dan rapi langsung ke kolom Google Sheets kamu yang kosong.

Cocok untuk Dropshipper, Reseller, atau Brand Owner yang punya ratusan SKU dan ingin deskripsi produknya punya tingkat konversi tinggi!`,
    features: [
      "Otomatisasi Massal: Membaca puluhan/ratusan baris Google Sheets secara otomatis.",
      "Copywriting Persuasif: Menggunakan prompt ChatGPT khusus e-commerce (Hook, Benefit, Call-to-Action).",
      "SEO-Optimized: Menambahkan bullet points dan keyword secara natural.",
      "Anti-Macet: Dilengkapi fitur Split In Batches untuk menghindari limit API OpenAI.",
      "Auto-Save: Hasil deskripsi langsung ditulis kembali ke Google Sheets."
    ],
    prerequisites: [
      "Akun n8n (Cloud atau Self-Hosted)",
      "API Key OpenAI (ChatGPT)",
      "Akun Google (untuk Google Sheets)",
      "Daftar produk mentah di Google Sheets"
    ],
    setupGuide: `1. Buat Google Sheet dengan kolom: "Nama Produk", "Spek Singkat", dan "Deskripsi AI" (kosongkan).
2. Import file workflow.json ke n8n.
3. Hubungkan Google Sheets Credential pada node "Google Sheets Trigger" dan "Update Sheet".
4. Hubungkan OpenAI API Key pada node "OpenAI".
5. Test jalankan untuk 1 baris pertama.
6. Publish workflow untuk mengotomatisasi seluruh baris.`
  },
  {
    id: "wf3-review-monitor-alert",
    title: "n8n Review Monitor & Alert — Pantau Review Buruk Otomatis",
    price: 175000,
    category: "Workflow Template",
    image: "/products/wf3.png",
    shortDescription: "Sistem otomatis memantau review produk dan langsung mengirimkan peringatan ke Telegram ketika ada review bintang 1-3.",
    description: `Satu review buruk yang tidak dibalas bisa merusak reputasi toko Anda! Dengan **Review Monitor & Alert**, sistem akan secara otomatis memantau review produk Anda dan langsung mengirimkan peringatan ke Telegram ketika ada review dengan rating rendah (bintang 1–3) masuk.

Review dengan rating baik (4–5 bintang) otomatis dicatat ke Google Sheets untuk analitik bisnis Anda. Bangun strategi pemasaran berbasis data nyata dari pelanggan puas Anda!`,
    features: [
      "Monitoring Otomatis: Cek review secara berkala.",
      "Alert Telegram Instan: Notifikasi langsung saat review buruk tiba.",
      "Log Google Sheets: Simpan review positif sebagai database testimoni.",
      "Smart Filtering: Otomatis memisahkan review bagus dan buruk.",
      "Informasi Lengkap: Rating, nama pembeli, komentar, dan nama produk dikirim utuh."
    ],
    prerequisites: [
      "Akun n8n (Cloud atau Self-Hosted)",
      "Telegram Bot Token & Chat ID",
      "Google Account untuk Google Sheets",
      "Endpoint API sistem review Anda (Tokopedia/Shopee/Custom)"
    ],
    setupGuide: `1. Import workflow.json. Tersedia data Dummy untuk Testing awal.
2. Isi Credential Telegram dan Google Sheets Anda.
3. Ubah "Mapping Column Mode" di node Google Sheets menjadi "Auto-Map Input Data".
4. Uji coba dengan klik "Execute Workflow".
5. Setelah sukses, hapus kabel dari node "Code" dan sambungkan kabel baru dari "Fetch Reviews" untuk penggunaan di dunia nyata.`
  },
  {
    id: "wf4-social-media-autopost",
    title: "n8n Omnichannel Auto-Post — Jadwalin 100 Konten ke Multi Sosmed",
    price: 250000,
    category: "Workflow Template",
    image: "/products/wf4.png",
    shortDescription: "Ubah Google Sheets menjadi Dashboard Auto-Posting ke Twitter, Telegram, dan FB/IG.",
    description: `Punya banyak akun sosmed yang harus diurus? Capek copy-paste caption yang sama ke Twitter, Telegram, dan Facebook setiap hari?

**n8n Omnichannel Auto-Post** adalah asisten sosmed pintar yang mengubah Google Sheets kamu menjadi Dashboard Auto-Posting kelas atas (seperti Hootsuite atau Buffer, tapi TANPA BIAYA BULANAN!). Cukup ketik jadwal dan caption di Google Sheets, tutup laptopmu, dan biarkan robot n8n mempostingnya tepat waktu secara otomatis!`,
    features: [
      "Jadwal Super Presisi: Workflow mengecek jadwal di Google Sheets setiap jam.",
      "AI Caption Spinner: Opsi rewrite caption dengan AI agar tidak terdeteksi sebagai bot/spam.",
      "Sekali Klik, Nyebar ke 3 Platform: Twitter/X, Telegram, dan Meta.",
      "Auto-Update Status: Setelah sukses, kolom status di Google Sheets otomatis berubah jadi 'Posted'."
    ],
    prerequisites: [
      "Akun n8n",
      "Akun Google Sheets",
      "API Key Sosmed (Telegram Bot, Twitter Developer, Meta App)"
    ],
    setupGuide: `1. Siapkan kolom Google Sheets: caption, hashtags, platform, image_url, post_date, post_time, status.
2. Import workflow.json ke n8n.
3. Masukkan Credential untuk masing-masing platform (Telegram, Meta, Discord).
4. Untuk mengetes tanpa error Meta API, cukup isi kolom platform dengan "telegram".
5. Aktifkan workflow dan biarkan berjalan secara background.`
  },
  {
    id: "wf5-video-repurposer",
    title: "n8n AI Video Repurposer — Auto Transcribe & Rewrite Script",
    price: 225000,
    category: "Workflow Template",
    image: "/products/wf5.png",
    shortDescription: "Bikin puluhan script konten baru dari video viral lawan secara otomatis menggunakan OpenAI Whisper.",
    description: `Kehabisan ide ngonten? Males mikir script buat video affiliate Shopee/TikTok kamu? Jangan kerja keras, kerja cerdas pakai **AI Video Repurposer**!

Cukup kirim link video TikTok/Shopee yang lagi viral ke Telegram bot kamu. n8n akan men-download videonya tanpa watermark, mengekstrak audionya, menulis transkripnya dengan AI Whisper, lalu menyuruh ChatGPT menulis ulang script tersebut menjadi gaya bahasa yang baru, unik, dan anti-plagiat!`,
    features: [
      "Surganya Affiliate: Bikin ratusan konten video tiap hari cuma modal copas link video kompetitor.",
      "Auto-Download: Unduh video tanpa watermark.",
      "AI Transcription: Mengubah suara dari video menjadi teks.",
      "AI Copywriting: Menciptakan hook dan CTA baru dari script lawan."
    ],
    prerequisites: [
      "Akun n8n",
      "API Key OpenAI (ChatGPT & Whisper)",
      "Akun RapidAPI (untuk Downloader)",
      "Telegram Bot"
    ],
    setupGuide: `1. Import workflow.json ke n8n.
2. Masukkan API Key OpenAI dan API Key RapidAPI Anda.
3. Atur Telegram Trigger dengan Bot Token Anda.
4. Kirim link TikTok/Shopee ke Bot Telegram Anda.
5. Tunggu kurang dari 1 menit, dan script baru akan dikirim kembali ke Telegram Anda.`
  },
  {
    id: "wf6-viral-topic-tracker",
    title: "n8n AI Viral Topic Tracker — Auto Pantau Trend Google Tiap Pagi",
    price: 150000,
    category: "Workflow Template",
    image: "/products/wf6.png",
    shortDescription: "Workflow n8n pintar yang akan membangunkanmu setiap pagi dengan daftar topik paling viral + ide konten.",
    description: `Capek scrolling tiap hari cuma buat nyari tau "Hari ini yang lagi rame dibahas apa ya?"

Mulai sekarang, biar robot yang kerja! **AI Viral Topic Tracker** akan menyedot data pencarian paling trending di Indonesia dari Google Trends setiap jam 8 pagi. AI akan merangkum 5 topik paling panas dan menciptakan 3 ide hook konten dari topik tersebut untuk TikTok/Reels, dikirim langsung ke Telegram kamu!`,
    features: [
      "Curi Start Algoritma: Bikin konten saat topiknya baru mulai naik.",
      "Auto-Research: Tidak perlu lagi cari inspirasi manual tiap pagi.",
      "AI Content Ideation: Dapatkan 3 ide hook video yang siap dibuat.",
      "Set & Forget: Berjalan 100% otomatis di background."
    ],
    prerequisites: [
      "Akun n8n",
      "API Key OpenAI (ChatGPT)",
      "Telegram Bot Token & Chat ID"
    ],
    setupGuide: `1. Import workflow.json.
2. Masukkan API Key OpenAI.
3. Masukkan Credential Telegram Anda.
4. Anda bisa menyesuaikan jam trigger (default: 08:00 pagi).
5. Klik Activate untuk menyalakannya seumur hidup.`
  }
];
