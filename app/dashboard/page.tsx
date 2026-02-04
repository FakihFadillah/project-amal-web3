"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useCampaigns } from "@/context/Campaigncontext"; 
import Link from "next/link";
import { PlusCircle, Wallet, LayoutDashboard, ArrowRight, Copy, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import CampaignCard from "@/components/Campaigncard"; 
import { useState } from "react";

export default function Dashboard() {
  const { user } = usePrivy();
  const { campaigns } = useCampaigns();
  const [copied, setCopied] = useState(false);

  // Ambil 2 kampanye terbaru untuk preview
  const myCampaigns = campaigns.slice(0, 2); 

  const copyAddress = () => {
    const addr = user?.wallet?.address || user?.email?.address || "";
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 selection:bg-green-100 selection:text-green-900 font-sans relative">
       
       <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none mt-[300px]"></div>

      {/* HEADER DARK MODE */}
      <div className="bg-[#0F172A] pt-32 pb-32 px-6 relative overflow-hidden rounded-b-[3rem] shadow-2xl">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none -mr-32 -mt-48"></div>
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -ml-20 -mb-20"></div>

         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
            <div>
               <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-green-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                     Fundraiser Dashboard
                  </span>
               </div>
               <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                  Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Captain!</span> 👋
               </h1>
               
               <div onClick={copyAddress} className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 pr-4 pl-2 py-2 rounded-full cursor-pointer transition-all w-fit backdrop-blur-sm">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                     {user?.wallet?.address?.slice(0, 2) || "0x"}
                  </div>
                  <span className="text-gray-300 font-mono text-sm group-hover:text-white transition">
                     {user?.wallet?.address ? `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}` : "Not Connected"}
                  </span>
                  {copied ? <CheckCircle2 size={14} className="text-green-400"/> : <Copy size={14} className="text-gray-500 group-hover:text-white"/>}
               </div>
            </div>

            <Link href="/create">
               <button className="group relative px-8 py-4 bg-white text-[#0F172A] rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all overflow-hidden flex items-center gap-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-200 via-white to-green-200 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <PlusCircle size={20} className="text-green-600 group-hover:rotate-90 transition-transform duration-300"/>
                  <span>Buat Kampanye</span>
               </button>
            </Link>
         </div>
      </div>

      <main className="px-6 max-w-6xl mx-auto relative z-20 -mt-20 mb-20">
        
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 hover:-translate-y-1 transition duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-2xl -mr-10 -mt-10 transition group-hover:bg-green-100/50"></div>
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-green-100 text-green-600 rounded-2xl"><Wallet size={24} /></div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full"><TrendingUp size={12}/> +12%</span>
               </div>
               <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Raised</p>
               <h3 className="text-3xl font-black text-gray-900">$0.00</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 hover:-translate-y-1 transition duration-300 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -mr-10 -mt-10 transition group-hover:bg-blue-100/50"></div>
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl"><LayoutDashboard size={24} /></div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Active</span>
               </div>
               <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Campaigns</p>
               <h3 className="text-3xl font-black text-gray-900">{campaigns.length}</h3>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-[2rem] shadow-xl shadow-green-300/50 hover:-translate-y-1 transition duration-300 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
             <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mb-10"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white/20 text-white rounded-2xl backdrop-blur-md"><Sparkles size={24} fill="currentColor" /></div>
               </div>
               <div>
                  <p className="text-green-100 text-xs font-bold uppercase tracking-widest mb-1">Impact Score</p>
                  <h3 className="text-3xl font-black text-white">Level 1</h3>
                  <p className="text-xs text-green-100 mt-1 opacity-80">Rookie Fundraiser</p>
               </div>
            </div>
          </div>
        </div>

        {/* RECENT CAMPAIGNS */}
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">Recent Activity</h2>
           {/* 👇 INI LINK YANG SUDAH DIPERBAIKI */}
           <Link href="/dashboard/my-campaigns" className="group flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-green-600 transition">
             View All <ArrowRight size={16} className="group-hover:translate-x-1 transition"/>
           </Link>
        </div>

        {myCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myCampaigns.map((c) => (
              <CampaignCard 
                key={c.id} 
                {...c} 
                image={c.image || "https://via.placeholder.com/400x300"}
                isEditable={true} // ✅ Pastikan ini ada biar tombol edit muncul
              />
            ))}
            
            <Link href="/create" className="group flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-gray-200 rounded-[2rem] hover:border-green-300 hover:bg-green-50/50 transition cursor-pointer">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition border border-gray-100">
                  <PlusCircle size={32} className="text-gray-300 group-hover:text-green-500 transition"/>
               </div>
               <p className="font-bold text-gray-400 group-hover:text-green-600 transition">Tambah Kampanye Baru</p>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] p-12 text-center border border-dashed border-gray-300">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Belum ada aktivitas</h3>
            <Link href="/create" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-green-600 transition">
               <PlusCircle size={18}/> Buat Kampanye Pertama
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}