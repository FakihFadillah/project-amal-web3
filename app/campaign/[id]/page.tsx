"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; 
import { ShieldCheck, Clock, Users, Share2, ChevronLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import DonateButton from "@/components/Donatebutton";
import { useCampaigns } from "@/context/Campaigncontext"; // 1. Import Context

export default function CampaignDetail() {
  const params = useParams(); 
  const { campaigns } = useCampaigns(); // 2. Ambil semua data kampanye
  const [donateAmount, setDonateAmount] = useState("");
  const [activeTab, setActiveTab] = useState("story");
  
  // 3. CARI KAMPANYE YANG ID-NYA COCOK
  // params.id itu string, sedangkan id di data kita number. Jadi perlu convert `Number()`.
  const campaignData = campaigns.find(c => c.id === Number(params.id));

  // Kalau kampanye tidak ditemukan (misal user asal ketik URL)
  if (!campaignData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center flex-col gap-4">
        <AlertTriangle size={48} className="text-red-500"/>
        <h1 className="text-2xl font-bold">Kampanye Tidak Ditemukan</h1>
        <Link href="/explore" className="text-blue-500 hover:underline">Kembali ke Explore</Link>
      </div>
    );
  }

  // --- HITUNG-HITUNGAN DUMMY (Biar tampilan tetap cantik) ---
  // Karena data simple kita gak punya list donatur detail, kita simulasi saja
  const progress = (campaignData.collected / Number(campaignData.target)) * 100;
  const daysLeft = Math.floor(Math.random() * 30) + 1; // Random sisa hari
  const backersCount = Math.floor(campaignData.collected / 50) + 5; // Simulasi jumlah donatur

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* 1. HEADER IMAGE & NAV */}
      <div className="relative h-[400px] w-full bg-gray-900">
        <img 
            src={campaignData.image} 
            alt={campaignData.title} 
            className="w-full h-full object-cover opacity-60" 
            onError={(e) => e.currentTarget.src = "https://via.placeholder.com/800x400?text=No+Image"}
        />
        <div className="absolute top-24 left-0 w-full px-6">
          <div className="max-w-7xl mx-auto">
            <Link href="/explore" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold bg-black/20 backdrop-blur px-4 py-2 rounded-full transition">
              <ChevronLeft size={20} /> Kembali
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-50 to-transparent h-24"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* --- KOLOM KIRI (Konten Utama) --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Judul & Organizer */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                   <ShieldCheck size={14} /> Escrow Verified
                </span>
                <span className="text-gray-500 text-sm font-bold">• {campaignData.applicant}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
                {campaignData.title}
              </h1>
            </div>

            {/* Tab Menu */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-100">
                <button 
                  onClick={() => setActiveTab("story")}
                  className={`flex-1 py-4 font-bold text-sm transition ${activeTab === "story" ? "text-green-600 border-b-2 border-green-500 bg-green-50/50" : "text-gray-500 hover:bg-gray-50"}`}
                >
                  Cerita & Detail
                </button>
                <button 
                  onClick={() => setActiveTab("donors")}
                  className={`flex-1 py-4 font-bold text-sm transition ${activeTab === "donors" ? "text-green-600 border-b-2 border-green-500 bg-green-50/50" : "text-gray-500 hover:bg-gray-50"}`}
                >
                  Donatur ({backersCount})
                </button>
              </div>

              <div className="p-8">
                {activeTab === "story" && (
                  <div>
                    {/* Render deskripsi. Kalau ada newline (\n) ganti jadi <br> */}
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {campaignData.description}
                    </p>
                    
                    {/* Bagian Statis (Tetap ada biar kelihatan pro) */}
                    <h3 className="text-lg font-bold mt-6 mb-2">Transparansi Dana:</h3>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Dana tersimpan aman di Smart Contract.</li>
                        <li>Pencairan dilakukan bertahap (Milestone).</li>
                        <li>Bukti penggunaan dana akan diupload oleh {campaignData.applicant}.</li>
                    </ul>
                  </div>
                )}
                
                {activeTab === "donors" && (
                  <div className="space-y-4">
                     {/* Donatur Dummy biar gak kosong */}
                     <div className="p-4 bg-gray-50 rounded-xl text-center text-gray-500 text-sm">
                        Belum ada data donatur realtime dari Smart Contract.
                     </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* --- KOLOM KANAN (Sticky Donation Card) --- */}
          <div className="relative">
            <div className="sticky top-28 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 space-y-6">
              
              {/* Progress */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-3xl font-black text-gray-900">${campaignData.collected.toLocaleString()}</span>
                  <span className="text-sm font-bold text-gray-400">dari ${Number(campaignData.target).toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                </div>
                <div className="flex justify-between mt-4 text-sm font-bold text-gray-500">
                  <div className="flex items-center gap-1"><Users size={16}/> {backersCount} Donatur</div>
                  <div className="flex items-center gap-1"><Clock size={16}/> {daysLeft} Hari lagi</div>
                </div>
              </div>

              {/* Input Donasi */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Masukkan Nominal (USDC)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">$</span>
                  <input 
                    type="number" 
                    value={donateAmount}
                    onChange={(e) => setDonateAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none font-bold text-xl text-gray-900"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="space-y-3">
                <DonateButton />
                
                <button className="w-full bg-white border border-gray-200 hover:border-green-500 text-gray-600 hover:text-green-600 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
                  <Share2 size={18} /> Bagikan
                </button>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-400">Pembayaran aman & transparan via Smart Contract.</p>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}