"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";
import { useCampaigns } from "@/context/Campaigncontext"; 
import { Search, Filter, ArrowUpRight, Heart, Target, MapPin } from "lucide-react";

export default function Explore() {
  const { campaigns } = useCampaigns();
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Ambil yang APPROVED saja
  const approvedCampaigns = campaigns.filter(c => c.status === 'approved');

  // 2. Filter berdasarkan Search Term (Nama Kampanye)
  const filteredCampaigns = approvedCampaigns.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* === HEADER SECTION === */}
      <div className="bg-gray-900 text-white pt-16 pb-24 px-6 relative overflow-hidden">
        {/* Hiasan Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
           <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
             Temukan Proyek <span className="text-green-400">Kebaikan</span>
           </h1>
           <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-10">
             Jelajahi ratusan kampanye terverifikasi yang membutuhkan bantuanmu. 
             Transparansi dijamin oleh Blockchain.
           </p>

           {/* SEARCH BAR (Melayang) */}
           <div className="max-w-2xl mx-auto bg-white rounded-2xl p-2 flex shadow-2xl shadow-green-900/20 transform translate-y-12">
              <div className="flex-1 flex items-center px-4 gap-3">
                 <Search className="text-gray-400" size={24} />
                 <input 
                    type="text" 
                    placeholder="Cari kampanye (misal: Sekolah, Banjir)..." 
                    className="w-full py-3 text-gray-900 outline-none font-medium placeholder:text-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition flex items-center gap-2">
                 <Filter size={18} /> <span className="hidden sm:inline">Filter</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition ml-2">
                 Cari
              </button>
           </div>
        </div>
      </div>

      {/* === CAMPAIGN GRID === */}
      <main className="max-w-7xl mx-auto px-6 pt-24">
        
        {/* Info Hasil Pencarian */}
        <div className="flex justify-between items-center mb-8">
           <h2 className="font-bold text-gray-500 text-sm uppercase tracking-wider">
             Menampilkan {filteredCampaigns.length} Kampanye Aktif
           </h2>
        </div>

        {filteredCampaigns.length === 0 ? (
           // TAMPILAN KOSONG (Empty State)
           <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                 🔍
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Tidak ada kampanye ditemukan</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                 Coba kata kunci lain atau jadilah yang pertama membuat perubahan.
              </p>
              <Link href="/create">
                 <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition">
                    + Buat Kampanye Baru
                 </button>
              </Link>
           </div>
        ) : (
           // GRID KARTU
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {filteredCampaigns.map((camp) => {
               // Simulasi Progress Bar (Karena data collected masih 0)
               // Nanti bisa diganti dengan (camp.collected / camp.target) * 100
               const mockProgress = Math.floor(Math.random() * 80) + 10; 
               
               return (
                <div key={camp.id} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                   
                   {/* Bagian Gambar */}
                   <div className="h-56 relative overflow-hidden bg-gray-200">
                      <img 
                          src={camp.image} 
                          alt={camp.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                          onError={(e) => {
                             // Fallback Image Cantik (Bukan abu-abu polos)
                             e.currentTarget.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000"
                          }}
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-700 flex items-center gap-1">
                         <MapPin size={12}/> Global
                      </div>
                      <button className="absolute top-4 right-4 bg-white/50 backdrop-blur p-2 rounded-full text-white hover:bg-red-500 hover:text-white transition">
                         <Heart size={18} />
                      </button>
                   </div>

                   {/* Bagian Konten */}
                   <div className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                         <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition">
                            {camp.title}
                         </h3>
                         <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                            {camp.description}
                         </p>
                      </div>

                      {/* Progress Bar & Statistik */}
                      <div className="mt-4 pt-4 border-t border-gray-50">
                         <div className="flex justify-between text-sm font-bold mb-2">
                            <span className="text-gray-900 flex items-center gap-1">
                               <Target size={16} className="text-green-500"/> ${camp.target}
                            </span>
                            <span className="text-green-600">{mockProgress}%</span>
                         </div>
                         <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-4">
                            <div 
                               className="bg-green-500 h-full rounded-full" 
                               style={{ width: `${mockProgress}%` }}
                            ></div>
                         </div>

                         {/* Tombol Aksi */}
                         <Link href={`/campaign/${camp.id}`} className="block">
                            <button className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-green-600 transition flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-green-200">
                               Lihat Detail <ArrowUpRight size={18} />
                            </button>
                         </Link>
                      </div>
                   </div>
                </div>
               );
             })}
           </div>
        )}
      </main>
    </div>
  );
}