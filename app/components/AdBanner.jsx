'use client';
import { useEffect, useRef } from 'react';

export default function AdBanner() {
    const banner = useRef();

    useEffect(() => {
        if (!banner.current) return;
        if (banner.current.children.length > 0) return; // Prevent multiple loads

        const conf = document.createElement('script');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.highperformanceformat.com/97b6743535424e9a4053c23bbfe18b92/invoke.js`;
        script.async = true;

        conf.innerHTML = `atOptions = {
            'key' : '97b6743535424e9a4053c23bbfe18b92',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
        };`;

        banner.current.append(conf);
        banner.current.append(script);
    }, []);

    return (
        <div className="my-2 border-4 border-black p-2 bg-white shadow-[8px_8px_0_rgba(0,0,0,1)] flex flex-col items-center relative overflow-hidden rounded-xl">
            <span className="absolute top-0 left-4 bg-[#FFFF00] text-black font-black text-[10px] px-3 py-1 border-x-2 border-b-2 border-black z-10 uppercase tracking-widest">
                Advertisement
            </span>
            <div className="mt-6 w-[300px] h-[250px] bg-gray-50 flex items-center justify-center relative z-0" ref={banner}>
               {/* Script injected here */}
            </div>
        </div>
    );
}
