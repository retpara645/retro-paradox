import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/lib/products';

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductDetail({ params }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const waNumber = '6285199270197';
  const waMessage = encodeURIComponent(`Halo Retro Paradox! Saya tertarik untuk membeli produk digital berikut:\n\n*${product.title}*\nHarga: Rp ${product.price.toLocaleString('id-ID')}\n\nBagaimana cara pembayarannya?`);
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <main className="min-h-screen bg-gray-50 relative flex flex-col font-sans overflow-hidden pb-24">
      
      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-20">
        <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-3 text-gray-900">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 shadow-sm">
             <Image src="/logo.png" alt="Retro Paradox" fill className="object-cover" />
          </div>
          Retro Paradox
        </Link>
        <Link 
          href="/produk" 
          className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2"
        >
          &larr; Kembali ke Katalog
        </Link>
      </nav>

      {/* Product Content */}
      <div className="w-full max-w-7xl mx-auto px-6 mt-8">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Column: Image */}
          <div className="w-full lg:w-1/2 sticky top-8">
            <div className="relative w-full aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              <Image 
                src={product.image} 
                alt={product.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">
              {product.category}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.15] mb-6 tracking-tight">
              {product.title}
            </h1>
            <div className="text-3xl font-black text-gray-900 mb-8 pb-8 border-b border-gray-200">
              Rp {product.price.toLocaleString('id-ID')}
            </div>

            <div className="prose prose-lg prose-blue text-gray-600 mb-10 max-w-none">
              {product.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
              ))}
            </div>

            <a 
              href={waLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-blue-600 text-white shadow-xl shadow-blue-600/20 rounded-2xl px-8 py-5 text-center text-lg font-bold hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 mb-12 flex items-center justify-center gap-3"
            >
              Beli Sekarang via WA &rarr;
            </a>

            {/* Features Accordion-style static list */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                ✨ Fitur Unggulan
              </h3>
              <ul className="space-y-4">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <span className="text-blue-500 font-bold mt-0.5">✓</span>
                    <span className="text-gray-700 font-medium leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prerequisites */}
            <div className="mb-10 bg-gray-900 text-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                📋 Prasyarat (Yang Dibutuhkan)
              </h3>
              <ul className="space-y-3">
                {product.prerequisites.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-blue-400 font-bold mt-0.5">•</span>
                    <span className="text-gray-300 font-medium">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Setup Guide */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                ⚙️ Panduan Setup Singkat
              </h3>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <ol className="list-decimal list-inside space-y-3 text-gray-600 font-medium leading-relaxed">
                  {product.setupGuide.split('\n').map((step, idx) => (
                    <li key={idx}>{step.replace(/^\d+\.\s/, '')}</li>
                  ))}
                </ol>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
