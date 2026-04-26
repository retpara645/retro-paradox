export default function AdPlaceholder() {
  return (
    <div className="w-[300px] h-[250px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center relative overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjZWVlIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')]">
      <div className="absolute top-2 left-2 bg-yellow-400 border-2 border-black px-2 py-1 text-xs font-bold font-space">ADVERTISEMENT</div>
      <span className="text-white font-bangers text-3xl bg-blue-900 px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-10deg]">SPONSORED</span>
    </div>
  );
}
