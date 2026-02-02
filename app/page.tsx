"use client";
import CampaignCard from "@/components/Campaigncard"; 
import { ArrowRight, ShieldCheck, Zap, Lock, DollarSign, Target } from "lucide-react";
import Link from "next/link";

// --- DATA DUMMY (Foto Asli Unsplash) ---
const DATA_DUMMY = [
  { 
    id: 1, 
    judul: "Clean Water Initiative", 
    target: "60.000", 
    terkumpul: 75, 
    sisaHari: 12, 
    backer: 234, 
    image: "https://images.unsplash.com/photo-1594488518063-54949a74041b?auto=format&fit=crop&q=80&w=1000", 
    status: "ongoing" as const 
  },
  { 
    id: 2, 
    judul: "Solar School Project", 
    target: "40.000", 
    terkumpul: 71, 
    sisaHari: 8, 
    backer: 156, 
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000", 
    status: "ongoing" as const 
  },
  { 
    id: 3, 
    judul: "Community Health Center", 
    target: "80.000", 
    terkumpul: 84, 
    sisaHari: 21, 
    backer: 312, 
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000", 
    status: "ongoing" as const 
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      {/* PERBAIKAN: pt-40 diganti jadi pt-24 biar gak terlalu jauh dari navbar */}
      <section className="relative pt-24 pb-20 px-6">
        
        {/* Background Hiasan (Blob) */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-50 rounded-full blur-3xl opacity-60 -z-10 translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-40 -z-10 -translate-x-1/4 translate-y-1/4"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* --- KIRI: Headline & Call to Action --- */}
          <div className="space-y-8 animate-[fadeIn_0.8s_ease-out]">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-green-700 tracking-wide uppercase">Powered by Blockchain</span>
            </div>

            {/* Judul Besar */}
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-gray-900">
              Decentralized <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                Crowdfunding
              </span>
            </h1>

            <p className="text-lg text-gray-500 max-w-lg leading-relaxed font-medium">
              Transparan, aman, dan tanpa perantara. Danai proyek sosial impianmu langsung melalui Smart Contract.
            </p>

            {/* Tombol Aksi */}
            <div className="flex flex-wrap gap-4">
              <Link href="/explore">
                <button className="bg-green-500 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-green-200 hover:shadow-green-300 hover:bg-green-600 transition-all transform hover:-translate-y-1 flex items-center gap-2">
                  Explore Campaigns <ArrowRight size={20} />
                </button>
              </Link>
              
              <Link href="/create">
                <button className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full font-bold hover:border-green-500 hover:text-green-600 transition-all shadow-sm hover:shadow-md">
                  Start Fundraising
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex gap-6 text-xs font-bold text-gray-400 pt-2">
              <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-green-500" /> Escrow Protected</span>
              <span className="flex items-center gap-1"><Lock size={16} className="text-green-500" /> Transparent</span>
              <span className="flex items-center gap-1"><Zap size={16} className="text-green-500" /> Instant Settlement</span>
            </div>
          </div>

          {/* --- KANAN: "The Live Impact Card" (3D Visual) --- */}
          <div className="relative hidden lg:block [perspective:1000px] z-10">
              
             {/* 1. Aura Hijau Belakang */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-100/50 rounded-full blur-3xl -z-10 animate-pulse"></div>

             {/* 2. Kartu Utama (Miring 3D) */}
             <div className="relative bg-white rounded-3xl p-5 shadow-2xl border border-white/50 transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out cursor-default group">
                
                {/* Gambar Header */}
                <div className="h-56 w-full rounded-2xl overflow-hidden relative mb-5">
                   <img 
                     src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800" 
                     alt="Happy Kids" 
                     className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                   />
                   <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-700 flex items-center gap-1 shadow-sm">
                      <ShieldCheck size={12} /> Verified Campaign
                   </div>
                </div>

                {/* Konten Kartu */}
                <div className="space-y-4 px-2">
                   <div className="flex justify-between items-start">
                      <div>
                         <h3 className="font-bold text-gray-900 text-lg">Pendidikan Anak Pelosok</h3>
                         <p className="text-xs text-gray-500">Initiated by <span className="font-semibold text-green-600">Yayasan Harapan</span></p>
                      </div>
                      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 font-bold text-xs">
                        A+
                      </div>
                   </div>

                   {/* Progress Bar Hidup */}
                   <div>
                      <div className="flex justify-between text-sm font-bold mb-1">
                         <span className="text-gray-900">$12,450 <span className="text-gray-400 font-normal">raised</span></span>
                         <span className="text-green-600">85%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                         <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2.5 rounded-full w-[85%] shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></div>
                      </div>
                   </div>

                   {/* Fake Button */}
                   <div className="pt-2">
                      <div className="w-full py-3 bg-gray-900 text-white rounded-xl text-center font-bold text-sm shadow-lg">
                         Donate Now
                      </div>
                   </div>
                </div>
             </div>

             {/* 3. Floating Widgets (Melayang) */}
             
             {/* Widget A: Recent Donation */}
             <div className="absolute -bottom-6 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-3 animate-bounce">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                   👱‍♂️
                </div>
                <div>
                   <p className="text-xs font-bold text-gray-400">Baru saja donasi</p>
                   <p className="text-sm font-bold text-gray-900">Budi mendonasikan <span className="text-green-600">$50</span></p>
                </div>
             </div>

             {/* Widget B: Total Backers */}
             <div className="absolute top-10 -right-8 bg-white/80 backdrop-blur p-3 rounded-2xl shadow-lg border border-white flex flex-col items-center animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex -space-x-2 mb-1">
                   {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                         <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" className="w-full h-full object-cover"/>
                      </div>
                   ))}
                </div>
                <p className="text-xs font-bold text-green-600">+1,240 Backers</p>
             </div>

          </div>

        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Donations", value: "$2.4M", sub: "USDC", icon: <DollarSign size={24} />, color: "text-green-600", bg: "bg-green-50" },
            { label: "Campaigns Funded", value: "156", sub: "Projects", icon: <Target size={24} />, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Total Staked", value: "890K", sub: "$AMAL", icon: <Lock size={24} />, color: "text-teal-600", bg: "bg-teal-50" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition flex items-center gap-5 cursor-default">
               <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shrink-0`}>
                 {stat.icon}
               </div>
               <div>
                 <h3 className="text-3xl font-black text-gray-900 flex items-baseline gap-1">
                   {stat.value} <span className="text-xs font-bold text-gray-400 uppercase">{stat.sub}</span>
                 </h3>
                 <p className="text-sm font-bold text-gray-500">{stat.label}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CAMPAIGN LIST ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Featured Campaigns</h2>
            <p className="text-gray-500 max-w-xl">
              Dukung proyek yang telah diverifikasi. Dana aman di Smart Contract.
            </p>
          </div>
          <Link href="/explore" className="text-green-600 font-bold hover:underline flex items-center gap-1">
            Lihat Semua <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DATA_DUMMY.map((item) => (
            <CampaignCard 
              key={item.id}
              {...item} 
            />
          ))}
        </div>
      </section>
    </main>
  );
}