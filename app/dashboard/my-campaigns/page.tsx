"use client";

import Link from "next/link";
import { useCampaigns } from "@/context/Campaigncontext"; 
import CampaignCard from "@/components/Campaigncard";
import { PlusCircle, ArrowLeft, LayoutDashboard } from "lucide-react";

export default function MyCampaignsPage() {
  const { campaigns } = useCampaigns();
  
  // Simulasi: Mengambil semua kampanye (Anggap ini milik user yang login)
  const myCampaigns = campaigns; 

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6 font-sans relative">
      
       {/* Background Grid */}
       <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Navigasi */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 font-bold text-sm mb-4 transition">
                <ArrowLeft size={16}/> Kembali ke Dashboard
            </Link>
            <h1 className="text-4xl font-black text-gray-900 mb-2">My Campaigns</h1>
            <p className="text-gray-500">Kelola semua proyek penggalangan danamu di sini.</p>
          </div>
          <Link href="/create">
            <button className="flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition shadow-lg hover:shadow-green-200 hover:-translate-y-1">
              <PlusCircle size={20} /> Buat Baru
            </button>
          </Link>
        </div>

        {/* List Kampanye */}
        {myCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myCampaigns.map((item) => (
              <CampaignCard 
                key={item.id} 
                {...item} 
                image={item.image || "https://via.placeholder.com/400x300"} 
                // 👇 INI KUNCINYA: Kita nyalakan Mode Edit di sini
                isEditable={true} 
              />
            ))}
          </div>
        ) : (
          // Tampilan kalau belum punya kampanye
          <div className="text-center py-24 bg-white rounded-[2.5rem] border border-dashed border-gray-300 shadow-sm">
             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <LayoutDashboard size={32} className="text-gray-400"/>
             </div>
             <p className="text-gray-900 font-bold text-xl mb-2">Kamu belum memiliki kampanye.</p>
             <p className="text-gray-500 mb-8">Mulai langkah pertamamu sekarang.</p>
             <Link href="/create" className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-green-600 transition shadow-lg">
                Mulai Buat Kampanye
             </Link>
          </div>
        )}

      </div>
    </div>
  );
}