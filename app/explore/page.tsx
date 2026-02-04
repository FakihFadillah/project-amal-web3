"use client";

import { useState } from "react";
import { useCampaigns } from "@/context/Campaigncontext"; 
import CampaignCard from "@/components/Campaigncard"; 
import { Search, SlidersHorizontal, Loader2, Sparkles } from "lucide-react";

export default function ExplorePage() {
  const { campaigns, isLoading } = useCampaigns();
  const [search, setSearch] = useState("");

  const filteredCampaigns = campaigns.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-green-100 selection:text-green-900">
      
      {/* Background Grid Halus (Untuk seluruh halaman) */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <main className="relative z-10 pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* === 1. HEADER BAR DARK MODE (Style "Meet the Developer") === */}
        {/* Kita bungkus judul & search dalam box hitam rounded */}
        <div className="bg-[#0F172A] rounded-[2.5rem] p-8 md:p-12 mb-12 text-white relative overflow-hidden shadow-2xl shadow-gray-200">
           
           {/* Hiasan Background (Abstrak) */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none -mr-32 -mt-32"></div>
           <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none -ml-20 -mb-20"></div>

           <div className="relative z-10 flex flex-col lg:flex-row items-end justify-between gap-8">
              
              {/* Bagian Teks Kiri */}
              <div className="max-w-2xl">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-green-400 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
                   <Sparkles size={12} /> Discover Projects
                 </div>
                 <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight">
                   Explore <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                     Impactful Campaigns
                   </span>
                 </h1>
                 <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                   Temukan dan dukung proyek sosial terverifikasi. Transparansi data dijamin oleh teknologi Blockchain.
                 </p>
              </div>

              {/* Bagian Search Bar Kanan */}
              <div className="w-full lg:w-auto min-w-[350px]">
                 <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                       <Search className="text-gray-500 group-focus-within:text-green-400 transition" size={20} />
                    </div>
                    <input 
                       type="text" 
                       placeholder="Cari kampanye..." 
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                       className="w-full py-4 pl-12 pr-12 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:bg-white/10 focus:border-green-500/50 focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all font-medium backdrop-blur-sm"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                      <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition border border-white/5">
                          <SlidersHorizontal size={18} />
                      </button>
                    </div>
                 </div>
              </div>

           </div>
        </div>

        {/* === 2. CONTENT GRID === */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={40} className="text-green-600 animate-spin mb-4" />
            <p className="text-gray-500 font-medium animate-pulse">Sinkronisasi data Blockchain...</p>
          </div>
        ) : filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                {...campaign}
                image={campaign.image || "https://via.placeholder.com/400x300"}
              />
            ))}
          </div>
        ) : (
          // Empty State Modern
          <div className="text-center py-24 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
              <Search size={32} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ditemukan</h3>
            <p className="text-gray-500 max-w-xs mx-auto mb-8">
              Kami tidak menemukan kampanye dengan kata kunci "{search}".
            </p>
            <button 
              onClick={() => setSearch("")} 
              className="px-6 py-2 bg-white border border-gray-200 text-gray-900 rounded-full font-bold text-sm hover:bg-gray-50 transition shadow-sm"
            >
              Reset Pencarian
            </button>
          </div>
        )}

      </main>
    </div>
  );
}