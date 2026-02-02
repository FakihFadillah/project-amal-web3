"use client";
import Navbar from "@/components/Navbar";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount } from "wagmi";
import { Wallet, Heart, LayoutGrid, Clock, LogOut, PlusCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCampaigns } from "@/context/Campaigncontext"; // <--- IMPORT PENTING

export default function Dashboard() {
  const { user, logout, authenticated, ready } = usePrivy();
  const { address } = useAccount();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("campaigns");

  // AMBIL DATA DARI CONTEXT (OTAK GLOBAL)
  const { campaigns } = useCampaigns(); 

  // Di aplikasi asli, kita harus filter kampanye milik user saja. 
  // Tapi untuk demo ini, kita anggap semua yang ada di browser adalah milik user "You".
  const myCampaigns = campaigns;

  // Redirect kalau belum login
  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  if (!ready || !authenticated) return null;

  // Data Dummy Donasi (Ini biarin dulu dummy, soalnya fitur donasi belum simpan ke history)
  const MY_DONATIONS = [
    { campaign: "Clean Water Village", amount: "50 USDC", date: "2 Jan 2026" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      <main className="max-w-5xl mx-auto px-6 mt-10">
        
        {/* HEADER PROFIL */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-3xl shadow-inner">
            👽
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-2xl font-black text-gray-900">Halo, User!</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-2 border border-gray-200">
                <Wallet size={14} /> {address ? `${address.slice(0,6)}...${address.slice(-4)}` : "No Wallet"}
              </span>
              {user?.email && (
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs flex items-center gap-2 border border-gray-200">
                  📧 {user.email.address}
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition border border-transparent hover:border-red-100"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* TAB MENU & CONTENT */}
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR MENU */}
          <div className="space-y-2">
            <button 
              onClick={() => setActiveTab("campaigns")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === 'campaigns' ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              <LayoutGrid size={18} /> Kampanye Saya
            </button>
            <button 
              onClick={() => setActiveTab("donations")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === 'donations' ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              <Heart size={18} /> Riwayat Donasi
            </button>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-3">
            
            {/* TAB: KAMPANYE SAYA */}
            {activeTab === "campaigns" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Kampanye Aktif</h2>
                  <Link href="/create" className="text-sm text-green-600 font-bold hover:underline flex items-center gap-1">
                    <PlusCircle size={16}/> Buat Baru
                  </Link>
                </div>
                
                {myCampaigns.length === 0 ? (
                   <div className="bg-white p-10 rounded-2xl border border-gray-200 text-center">
                      <p className="text-gray-400 font-bold mb-2">Belum ada kampanye.</p>
                      <Link href="/create" className="text-green-600 hover:underline text-sm">Mulai buat sekarang &rarr;</Link>
                   </div>
                ) : (
                  myCampaigns.map((camp) => (
                    <div key={camp.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition">
                      {/* Gambar Kecil */}
                      <div className="w-full md:w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                         <img src={camp.image} className="w-full h-full object-cover" onError={(e)=>e.currentTarget.src="https://via.placeholder.com/150"} />
                      </div>

                      {/* Info Kampanye */}
                      <div className="flex-1 w-full text-center md:text-left">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{camp.title}</h3>
                        <div className="text-sm text-gray-500 space-y-1">
                           <p>Target: <span className="font-bold text-gray-900">${camp.target}</span></p>
                           <p className="text-xs">Dibuat: {camp.createdAt}</p>
                        </div>
                      </div>

                      {/* Status Badge (Dinamic) */}
                      <div className="shrink-0">
                        {camp.status === 'pending' && (
                           <span className="px-4 py-2 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 flex items-center gap-2 border border-yellow-200">
                              <Clock size={14}/> Menunggu Admin
                           </span>
                        )}
                        {camp.status === 'approved' && (
                           <span className="px-4 py-2 rounded-full text-xs font-bold bg-green-100 text-green-700 flex items-center gap-2 border border-green-200">
                              <AlertCircle size={14}/> Ongoing (Aktif)
                           </span>
                        )}
                        {camp.status === 'rejected' && (
                           <span className="px-4 py-2 rounded-full text-xs font-bold bg-red-100 text-red-700 flex items-center gap-2 border border-red-200">
                              <LogOut size={14}/> Ditolak
                           </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB: RIWAYAT DONASI */}
            {activeTab === "donations" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Kebaikan Kamu</h2>
                {MY_DONATIONS.map((don, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                        <Heart size={20} fill="currentColor" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{don.campaign}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock size={12} /> {don.date}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">-{don.amount}</span>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}