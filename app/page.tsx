"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Globe, Zap, PlayCircle, Box, Layers, Cpu } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-green-100 selection:text-green-900 relative overflow-hidden font-sans">
      
      {/* Background Grid & Blobs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-green-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      {/* PERUBAHAN DISINI: 
         - pt-32: Padding atas dikurangi (sebelumnya lebih besar) biar gak jenong.
         - gap-8: Jarak antara Teks Kiri dan Gambar Kanan dirapatkan.
      */}
      <main className="relative z-10 pt-32 pb-10 px-6 max-w-7xl mx-auto">
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-24">
          
          {/* === KIRI: TEXT === */}
          <div className="text-center lg:text-left pt-4"> {/* pt-4 added for slight visual alignment */}
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold uppercase tracking-wider mb-6 shadow-sm animate-pulse-slow">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Powered by Blokchain
            </div>

            {/* Judul lebih padat & line-height diperkecil */}
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-gray-900 mb-6 leading-[1.05]">
              Future of Giving <br className="hidden lg:block"/>
              <span className="transparent-text-effect bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent">
                is Decentralized.
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Donasi Web3 yang <span className="font-bold text-gray-900">100% transparan</span>. Dana tersimpan aman di Smart Contract, bukan di rekening pribadi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/explore" 
                className="group px-8 py-3.5 bg-green-600 text-white rounded-full font-bold text-base shadow-lg shadow-green-200 hover:shadow-green-300 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                Mulai Donasi
                <ArrowRight size={18} className="group-hover:translate-x-1 transition"/>
              </Link>
              <Link 
                href="/about" 
                className="px-8 py-3.5 bg-white text-gray-700 border border-gray-200 rounded-full font-bold text-base hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <PlayCircle size={18} />
                Cara Kerja
              </Link>
            </div>
          </div>

          {/* === KANAN: COMPACT VISUALIZATION === */}
          {/* Margin top minus di layar besar biar naik ke atas dikit (mengurangi kesan jenong) */}
          <div className="relative hidden lg:block h-[450px] w-full lg:-mt-10">
             {/* Block Utama */}
            <div className="absolute top-[50px] left-10 w-72 h-72 bg-gradient-to-br from-green-500 to-emerald-600 rounded-[3rem] shadow-[0_20px_50px_-12px_rgba(16,185,129,0.5)] flex flex-col justify-end p-8 animate-float-medium z-20">
               <div className="mb-auto bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md">
                 <Cpu className="text-white" size={24} />
               </div>
               <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Total Value Locked</p>
               <p className="text-4xl font-black text-white tracking-tighter">$2.4M+</p>
            </div>
             {/* Floating Badge 1 */}
            <div className="absolute top-0 right-10 w-48 h-48 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl flex flex-col justify-between p-5 animate-float-slow z-10">
               <Layers className="text-green-500" size={28} />
               <div>
                 <p className="font-bold text-lg text-gray-800">$AMAL</p>
                 <p className="text-xs text-gray-400">Governance Token</p>
               </div>
            </div>
             {/* Floating Badge 2 (Bawah) */}
             <div className="absolute bottom-10 right-20 w-44 h-24 bg-white shadow-lg rounded-2xl border border-gray-100 flex items-center gap-4 p-4 animate-float-fast z-30">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Globe size={20} />
                </div>
                <div>
                   <p className="text-xs text-gray-400 font-bold">Global Impact</p>
                   <p className="text-sm font-black text-gray-900">50+ Countries</p>
                </div>
             </div>
          </div>
        </div>

        {/* STATS SECTION (Lebih Rapat) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
           {/* Card 1 */}
           <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-3">
                 <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"><ShieldCheck size={20}/></div>
                 <h3 className="text-2xl font-black text-gray-800">100%</h3>
              </div>
              <p className="text-sm text-gray-500">Immutable Record. Data tidak bisa diubah.</p>
           </div>
           {/* Card 2 */}
           <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-3">
                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><Globe size={20}/></div>
                 <h3 className="text-2xl font-black text-gray-800">Global</h3>
              </div>
              <p className="text-sm text-gray-500">Donasi dari manapun tanpa batas negara.</p>
           </div>
           {/* Card 3 */}
           <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-3">
                 <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600"><Zap size={20}/></div>
                 <h3 className="text-2xl font-black text-gray-800">Instant</h3>
              </div>
              <p className="text-sm text-gray-500">Dana langsung diterima wallet penerima.</p>
           </div>
        </div>

      </main>
    </div>
  );
}