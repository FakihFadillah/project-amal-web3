"use client";

import Link from "next/link";
import { ShieldCheck, Globe, Zap, Heart, Code2, Cpu, ArrowRight, Github, Linkedin, Terminal } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-green-100 selection:text-green-900 relative overflow-hidden">
      
      {/* === BACKGROUND ELEMENTS === */}
      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {/* Animated Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-100/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">

        {/* === 1. HERO SECTION === */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             Our Mission
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-8 leading-[1.1]">
            We are rewriting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
              the Trust Protocol.
            </span>
          </h1>
          
          <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
            $AMAL bukan sekadar platform donasi. Ini adalah eksperimen sosial menggunakan teknologi Blockchain untuk menghapus keraguan dalam berbagi kebaikan.
          </p>
        </div>

        {/* === 2. THE PROBLEM vs SOLUTION (Glass Cards) === */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {/* Card 1 */}
          <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 text-2xl">❌</div>
            <h3 className="text-xl font-black text-gray-900 mb-3">Masalah Lama</h3>
            <p className="text-gray-500 leading-relaxed">
              "Uang donasi saya beneran sampai gak sih?" <br/>
              Potongan biaya admin yang besar, laporan keuangan yang tidak transparan, dan risiko penyelewengan dana.
            </p>
          </div>

          {/* Arrow Connector (Hidden on Mobile) */}
          <div className="hidden md:flex items-center justify-center text-gray-300">
             <ArrowRight size={40} className="animate-pulse" />
          </div>

          {/* Card 3 (Solution) */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-500 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-green-200 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
            {/* Hiasan */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            
            <div className="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-6 text-2xl backdrop-blur-md border border-white/20">✅</div>
            <h3 className="text-xl font-black text-white mb-3">Solusi $AMAL</h3>
            <p className="text-green-50 leading-relaxed opacity-90">
              Smart Contract menggantikan "orang tengah". Donasi terkunci di Blockchain dan hanya cair jika bukti penggunaan dana valid. 100% Transparan.
            </p>
          </div>
        </div>

        {/* === 3. CORE TECHNOLOGY (Bento Grid) === */}
        <div className="mb-32">
           <h2 className="text-3xl font-black text-center mb-12">Powered by Modern Web3 Stack</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Tech 1 */}
              <div className="md:col-span-2 bg-gray-900 text-white p-8 rounded-[2rem] relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-purple-500/30 transition"></div>
                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 text-purple-400 font-bold uppercase tracking-wider text-xs">
                       <Cpu size={16} /> Blockchain Layer
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Smart Contracts</h3>
                    <p className="text-gray-400">Logika pencairan dana diatur oleh kode otonom yang tidak bisa disuap atau dimanipulasi.</p>
                 </div>
              </div>

              {/* Tech 2 */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:border-green-300 transition group">
                 <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <ShieldCheck size={24} />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Privy Auth</h3>
                 <p className="text-sm text-gray-500">Login semudah email, seaman crypto wallet.</p>
              </div>

              {/* Tech 3 */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:border-blue-300 transition group">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Globe size={24} />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Global Payment</h3>
                 <p className="text-sm text-gray-500">Terima donasi USDC dari seluruh dunia tanpa batas.</p>
              </div>
           </div>
        </div>

        {/* === 4. MEET THE DEVELOPER (Dark Mode Card) === */}
        <div className="bg-[#0F172A] rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-gray-400/50">
           {/* Abstract Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none"></div>

           <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg shadow-green-500/20 border-4 border-white/10">
                 👨‍💻
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Fakih Shidqi Fadillah</h2>
              <p className="text-green-400 font-bold uppercase tracking-widest text-xs mb-8">Founder & Lead Blockchain Developer</p>
              
              <div className="relative">
                <span className="absolute -top-4 -left-2 text-6xl text-white/10 font-serif">“</span>
                <p className="text-xl text-gray-300 leading-relaxed italic mb-8">
                  Saya percaya teknologi bukan hanya untuk cari untung, tapi untuk memecahkan masalah kepercayaan di masyarakat. <span className="text-white font-bold">$AMAL</span> adalah bukti nyata bahwa koding bisa membawa dampak sosial.
                </p>
                <span className="absolute -bottom-8 -right-2 text-6xl text-white/10 font-serif">”</span>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4 mt-8">
                 <Link href="#" className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition border border-white/5">
                    <Github size={20} />
                 </Link>
                 <Link href="#" className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition border border-white/5">
                    <Linkedin size={20} />
                 </Link>
                 <Link href="#" className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition border border-white/5">
                    <Terminal size={20} />
                 </Link>
              </div>
           </div>
        </div>

        {/* === 5. CTA SECTION === */}
        <div className="text-center mt-32">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Siap menjadi bagian dari perubahan?</h2>
          <Link 
            href="/explore" 
            className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-700 transition shadow-xl shadow-green-200 hover:-translate-y-1"
          >
            <Heart size={20} fill="currentColor" /> Mulai Donasi Sekarang
          </Link>
        </div>

      </main>
    </div>
  );
}