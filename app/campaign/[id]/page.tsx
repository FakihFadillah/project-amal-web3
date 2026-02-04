"use client";

import { useCampaigns } from "@/context/Campaigncontext"; 
import { usePrivy } from "@privy-io/react-auth";
import { useParams } from "next/navigation"; 
import Link from "next/link";
import { formatEther } from "viem";
import { ArrowLeft, Timer, Users, ShieldCheck, Wallet, Share2, FileText, CheckCircle2, Lock } from "lucide-react";
import { useState } from "react";

export default function CampaignDetail() {
  const { id } = useParams();
  const { campaigns, isLoading } = useCampaigns();
  const { login, authenticated } = usePrivy();
  const [donateAmount, setDonateAmount] = useState("");

  const campaign = campaigns.find((c) => c.id === Number(id));

  // --- DUMMY DATA MILESTONES (Sesuai Kontrak C.1.b) ---
  // Di real app, data ini diambil dari Smart Contract / Backend
  const milestones = [
    { step: 1, title: "Pembelian Material Bangunan", amount: "1,000 USDC", status: "released", proof: "Link Bukti" },
    { step: 2, title: "Biaya Tukang & Konstruksi", amount: "1,000 USDC", status: "locked", proof: "" },
    { step: 3, title: "Finishing & Pengecatan", amount: "500 USDC", status: "locked", proof: "" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
         <p className="animate-pulse text-green-600 font-bold">Memuat Detail Kampanye...</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6">
        <h1 className="text-4xl font-black text-gray-900 mb-4">404</h1>
        <p className="text-gray-500 mb-8">Kampanye tidak ditemukan.</p>
        <Link href="/explore" className="bg-green-600 text-white px-6 py-3 rounded-full font-bold">
          Kembali ke Explore
        </Link>
      </div>
    );
  }

  const collectedNum = Number(formatEther(BigInt(campaign.amountCollected)));
  const targetNum = Number(campaign.target);
  const percentage = Math.min(100, (collectedNum / targetNum) * 100);
  const daysLeft = Math.max(0, Math.floor((Number(campaign.deadline) * 1000 - Date.now()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20 selection:bg-green-100 font-sans">
      
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <main className="relative z-10 pt-32 px-6 max-w-6xl mx-auto">
        
        {/* Navigasi */}
        <div className="flex justify-between items-center mb-8">
           <Link 
             href="/explore" 
             className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-green-600 transition bg-white/80 px-4 py-2 rounded-full border border-gray-200 shadow-sm hover:shadow-md"
           >
             <ArrowLeft size={16} /> Kembali ke Explore
           </Link>
           <button className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-green-600 transition bg-white/80 px-4 py-2 rounded-full border border-gray-200 shadow-sm hover:shadow-md">
             <Share2 size={16} /> Bagikan
           </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
           
           {/* === KOLOM KIRI (KONTEN UTAMA) === */}
           <div className="md:col-span-2">
              {/* Gambar */}
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 mb-10 aspect-video relative group border border-gray-100">
                <img src={campaign.image || "https://via.placeholder.com/800x400"} alt={campaign.title} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"/>
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider text-green-700 flex items-center gap-2 shadow-sm border border-white/50">
                   <ShieldCheck size={14} /> Verified Project
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">{campaign.title}</h1>
              
              <div className="flex items-center gap-4 mb-10 p-4 bg-gray-50 rounded-2xl border border-gray-100 max-w-md">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">{campaign.applicant.slice(0, 1)}</div>
                <div>
                   <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Campaign Organizer</p>
                   <p className="text-base font-bold text-gray-900 font-mono truncate w-48">{campaign.applicant}</p>
                </div>
              </div>

              {/* TABS INFORMASI */}
              <div className="mb-8 border-b border-gray-200">
                <div className="flex gap-8">
                  <button className="pb-4 border-b-2 border-green-600 font-bold text-green-700">Cerita</button>
                  <button className="pb-4 border-b-2 border-transparent text-gray-400 font-bold hover:text-gray-600">Update</button>
                  <button className="pb-4 border-b-2 border-transparent text-gray-400 font-bold hover:text-gray-600">Doa Donatur</button>
                </div>
              </div>

              <div className="prose prose-lg text-gray-600 max-w-none mb-12">
                <p className="whitespace-pre-line leading-relaxed text-lg">{campaign.description}</p>
              </div>

              {/* === FITUR BARU: MILESTONE & TRANSPARANSI (Sesuai Kontrak) === */}
              <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><FileText size={24} /></div>
                   <div>
                      <h3 className="text-xl font-black text-gray-900">Rencana Penggunaan Dana</h3>
                      <p className="text-sm text-gray-500">Dana dicairkan bertahap sesuai bukti (Smart Contract Escrow).</p>
                   </div>
                </div>

                <div className="space-y-4">
                  {milestones.map((m, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
                       <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${m.status === 'released' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-400 border-gray-200'}`}>
                             {idx + 1}
                          </div>
                          <div>
                             <p className="font-bold text-gray-900">{m.title}</p>
                             <p className="text-xs text-gray-500 font-mono">Alokasi: {m.amount}</p>
                          </div>
                       </div>
                       <div>
                          {m.status === 'released' ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                               <CheckCircle2 size={12} /> Cair
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-bold border border-gray-200">
                               <Lock size={12} /> Terkunci
                            </span>
                          )}
                       </div>
                    </div>
                  ))}
                </div>
              </div>

           </div>

           {/* === KOLOM KANAN (DONATION BOX) === */}
           <div className="md:col-span-1 relative">
              <div className="sticky top-28 bg-white rounded-[2.5rem] border border-gray-200 p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                 
                 <div className="mb-8 text-center">
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Terkumpul</p>
                    <div className="flex justify-center items-baseline gap-1 mb-4">
                       <span className="text-4xl font-black text-green-600">${collectedNum.toLocaleString()}</span>
                       <span className="text-gray-400 font-bold">/ ${targetNum.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden mb-3 p-1 border border-gray-100">
                       <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full shadow-sm relative" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-400 font-bold">{Math.round(percentage)}% dari target tercapai</p>
                 </div>

                 <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="bg-blue-50 p-4 rounded-2xl text-center border border-blue-100">
                       <Users size={24} className="text-blue-500 mx-auto mb-2" />
                       <p className="text-2xl font-black text-gray-900">{campaign.donators.length}</p>
                       <p className="text-xs text-blue-600 font-bold uppercase">Donatur</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-2xl text-center border border-orange-100">
                       <Timer size={24} className="text-orange-500 mx-auto mb-2" />
                       <p className="text-2xl font-black text-gray-900">{daysLeft}</p>
                       <p className="text-xs text-orange-600 font-bold uppercase">Hari Lagi</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="relative group">
                       <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">$</span>
                       <input 
                         type="number" 
                         placeholder="0"
                         value={donateAmount}
                         onChange={(e) => setDonateAmount(e.target.value)}
                         className="w-full py-5 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-2xl text-gray-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all text-center"
                       />
                    </div>

                    {authenticated ? (
                      <button className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold text-lg hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2">
                         <Wallet size={20} /> Donasi Sekarang
                      </button>
                    ) : (
                      <button onClick={login} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg">
                         Login untuk Donasi
                      </button>
                    )}
                 </div>

                 {/* Disclaimer Smart Contract */}
                 <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                       <ShieldCheck size={10} /> Smart Contract Verified
                    </p>
                    <p className="text-[10px] text-gray-300 font-mono mt-1">0x8f...a2b1</p>
                 </div>

              </div>
           </div>

        </div>
      </main>
    </div>
  );
}