import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';

export default function ProdukKatalog() {
  const waNumber = '6285199270197';
  const waLink = `https://wa.me/${waNumber}`;

  return (
    <main className="min-h-screen bg-white relative flex flex-col font-sans overflow-hidden">
      
      {/* Mesh Gradient Background */}
      <div className="absolute top-[10%] inset-0 z-0 opacity-60 pointer-events-none bg-mesh-gradient blur-3xl scale-110 h-[150%] -translate-y-20"></div>

      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-20">
        <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 shadow-sm">
             <Image src="/logo.png" alt="Retro Paradox" fill className="object-cover" />
          </div>
          Retro Paradox
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-black transition-colors">Beranda</Link>
          <a href="#" className="hover:text-black transition-colors">Layanan</a>
          <Link href="/produk" className="text-black font-semibold">Produk</Link>
        </div>
        <a 
          href={waLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="border border-gray-300 rounded-full px-5 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          Hubungi Kami
        </a>
      </nav>

      {/* Header Section */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-16 pb-12 relative z-20 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 leading-tight mb-4">
          Otomatisasi Tanpa Batas.
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Koleksi template workflow n8n premium untuk mengotomatisasi bisnis, sosial media, dan pekerjaan harian Anda. Tinggal import, jalankan, dan rasakan keajaibannya.
        </p>
      </section>

      {/* Product Grid */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link href={`/produk/${product.id}`} key={product.id} className="group flex flex-col bg-white/40 backdrop-blur-xl border border-gray-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-3xl overflow-hidden">
              <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                  {product.category}
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-lg font-black text-gray-900">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center">
                    Detail &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
