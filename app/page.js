'use client';

import Image from 'next/image';

export default function Home() {
  const waNumber = '6285199270197';
  const waLink = `https://wa.me/${waNumber}`;

  return (
    <main className="min-h-screen bg-white relative flex flex-col font-sans selection:bg-pink-100 selection:text-pink-900 overflow-hidden">
      
      {/* Mesh Gradient Background */}
      <div className="absolute top-[20%] inset-0 z-0 opacity-80 pointer-events-none bg-mesh-gradient blur-3xl scale-110 h-[120%] -translate-y-20"></div>

      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-20">
        <div className="font-bold text-xl tracking-tight flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 shadow-sm">
             <Image src="/logo.png" alt="Retro Paradox" fill className="object-cover" />
          </div>
          Retro Paradox
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-black transition-colors">Beranda</a>
          <a href="#" className="hover:text-black transition-colors">Layanan</a>
          <a href="#" className="hover:text-black transition-colors">Produk</a>
        </div>
        <a 
          href={waLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="border border-gray-300 rounded-full px-5 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          MINTA BANTUAN WA &rarr;
        </a>
      </nav>

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-20 pb-16 flex flex-col items-center text-center relative z-20">
        <p className="font-serif italic text-xl md:text-2xl text-gray-600 mb-6">Pusat Bantuan Anda, Siap Melayani.</p>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-gray-900 leading-[1.1] mb-6">
          Bantuan Cepat,<br />
          Tanpa Ribet
        </h1>
        
        <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg mb-10 leading-relaxed">
          Kendalikan alur kerja Anda dengan bantuan langsung dari tim ahli kami. 
          Selesaikan masalah konfigurasi produk digital Anda, tanpa pusing.
        </p>

        <a 
          href={waLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white border border-gray-200 shadow-sm rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wide hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          MINTA BANTUAN WA &rarr;
        </a>
      </section>

      {/* Image Showcase */}
      <section className="w-full flex justify-center relative z-20 mt-4 mb-24 animate-float">
        <div className="relative w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl rounded-3xl overflow-hidden bg-white/20 p-2 backdrop-blur-sm border border-white/40">
           <div className="w-full h-full relative rounded-2xl overflow-hidden bg-white shadow-inner flex items-center justify-center p-8">
              <Image 
                src="/logo.png" 
                alt="Retro Paradox Logo" 
                fill
                className="object-contain p-6"
                priority
              />
           </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24 relative z-20 bg-white/40 backdrop-blur-xl border-t border-white/50">
        <div className="flex flex-col md:flex-row gap-16 md:gap-8 items-start justify-between">
          
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              Didesain Untuk Membantu Anda Mengatasi Kendala <br/>
              <span className="font-serif italic font-normal text-5xl md:text-7xl">Dengan Mudah</span>
            </h2>
          </div>

          <div className="md:w-1/3 flex items-center">
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              Pusat bantuan kami dibangun untuk profesional modern yang ingin menghemat waktu. Dapatkan solusi instan langsung dari para pembuatnya.
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 border-t border-gray-200 pt-16">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Respons Cepat</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Kirimkan pertanyaan Anda melalui WhatsApp, dan tim kami akan segera membalasnya dengan solusi praktis yang bisa langsung Anda terapkan.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Panduan Langkah Demi Langkah</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Mulai dari sinkronisasi Google Sheet, pengaturan n8n, hingga koneksi Telegram Bot, kami siap memandu Anda setahap demi setahap.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Fokus Pada Pekerjaan</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Hilangkan gangguan teknis dengan bantuan profesional kami, sehingga Anda dapat kembali fokus pada hal yang paling penting: bisnis Anda.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
