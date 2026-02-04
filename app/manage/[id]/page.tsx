"use client";

import { useState, useEffect } from "react";
import { useCampaigns } from "@/context/Campaigncontext"; 
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { formatEther } from "viem";
import { 
  ArrowLeft, Wallet, UploadCloud, FileText, 
  History, Clock, CheckCircle2, AlertCircle, DollarSign, Send
} from "lucide-react";

export default function ManageFunds() {
  const { id } = useParams();
  const { campaigns } = useCampaigns();
  const router = useRouter();
  
  const campaign = campaigns.find((c) => c.id === Number(id));
  
  // State Form Request
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [proof, setProof] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dummy Data Riwayat Request (Nanti dari Blockchain)
  const [requests, setRequests] = useState([
    { id: 1, desc: "Termin 1: Beli Semen", amount: "500", status: "approved", date: "2026-02-01" },
    { id: 2, desc: "Termin 2: Upah Tukang", amount: "300", status: "pending", date: "2026-02-04" },
  ]);

  if (!campaign) return null;

  const collectedNum = Number(formatEther(BigInt(campaign.amountCollected)));
  const balanceAvailable = collectedNum - 800; // Simulasi: 800 udah cair

  const handleFileChange = (e: any) => {
    if(e.target.files[0]) setProof(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulasi Kirim ke Blockchain
    setTimeout(() => {
      setRequests([{ id: Date.now(), desc: description, amount: amount, status: "pending", date: new Date().toISOString().split('T')[0] }, ...requests]);
      setIsSubmitting(false);
      setAmount("");
      setDescription("");
      setProof(null);
      alert("Permintaan pencairan dikirim! Menunggu persetujuan Admin.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <Link href="/dashboard/my-campaigns" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-green-600 mb-4 transition">
             <ArrowLeft size={16}/> Kembali ke My Campaigns
          </Link>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
             <span className="p-3 bg-green-100 text-green-600 rounded-2xl"><Wallet size={32}/></span>
             Kelola Dana Kampanye
          </h1>
          <p className="text-gray-500 ml-16">Ajukan pencairan dana bertahap sesuai progres proyek.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* KIRI: STATISTIK SALDO */}
           <div className="lg:col-span-1 space-y-6">
              {/* Card Saldo */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                 <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Sisa Saldo Tersedia</p>
                 <h2 className="text-4xl font-black mb-4">${balanceAvailable} <span className="text-sm font-normal text-gray-400">USDC</span></h2>
                 
                 <div className="pt-4 border-t border-gray-700 flex justify-between text-sm">
                    <span className="text-gray-400">Total Terkumpul:</span>
                    <span className="font-bold text-green-400">${collectedNum}</span>
                 </div>
                 <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-400">Sudah Cair:</span>
                    <span className="font-bold text-orange-400">$800</span>
                 </div>
              </div>

              {/* Info Penting */}
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl">
                 <div className="flex items-start gap-3">
                    <AlertCircle className="text-blue-600 shrink-0 mt-1" size={20} />
                    <div>
                       <h4 className="font-bold text-blue-900 text-sm mb-1">Aturan Pencairan</h4>
                       <p className="text-xs text-blue-700/80 leading-relaxed">
                          Dana hanya bisa dicairkan jika Admin menyetujui bukti penggunaan dana. Pastikan upload kuitansi/foto valid.
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           {/* KANAN: FORM & HISTORY */}
           <div className="lg:col-span-2 space-y-8">
              
              {/* 1. FORM PENGAJUAN */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                 <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FileText size={20} className="text-green-600"/> Ajukan Pencairan Baru
                 </h3>
                 
                 <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                       <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nominal (USDC)</label>
                          <div className="relative">
                             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                             <input 
                               type="number" 
                               value={amount}
                               onChange={(e) => setAmount(e.target.value)}
                               className="w-full py-3 pl-8 pr-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                               placeholder="0.00"
                               required
                             />
                          </div>
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Keterangan</label>
                          <input 
                             type="text" 
                             value={description}
                             onChange={(e) => setDescription(e.target.value)}
                             className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                             placeholder="Contoh: Beli 50 Sak Semen"
                             required
                          />
                       </div>
                    </div>

                    {/* Upload Bukti */}
                    <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Upload Bukti / RAB</label>
                       <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 transition bg-gray-50/50">
                          {proof ? (
                             <div className="flex items-center gap-2 text-green-600 font-bold">
                                <CheckCircle2 size={20}/> File Siap Upload
                             </div>
                          ) : (
                             <>
                                <UploadCloud size={24} className="text-gray-400 mb-2"/>
                                <p className="text-xs text-gray-500 font-bold">Klik untuk upload foto/PDF</p>
                             </>
                          )}
                          <input type="file" className="hidden" onChange={handleFileChange} required />
                       </label>
                    </div>

                    <button 
                       disabled={isSubmitting}
                       className="w-full py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-lg shadow-green-200"
                    >
                       {isSubmitting ? "Mengirim..." : <><Send size={18}/> Kirim Pengajuan</>}
                    </button>
                 </form>
              </div>

              {/* 2. RIWAYAT REQUEST */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                 <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <History size={20} className="text-blue-600"/> Riwayat Pengajuan
                 </h3>
                 
                 <div className="space-y-4">
                    {requests.map((req) => (
                       <div key={req.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="flex items-center gap-4">
                             <div className={`p-3 rounded-xl ${req.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                {req.status === 'approved' ? <DollarSign size={20}/> : <Clock size={20}/>}
                             </div>
                             <div>
                                <p className="font-bold text-gray-900">{req.desc}</p>
                                <p className="text-xs text-gray-500">{req.date}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="font-bold text-gray-900">${req.amount}</p>
                             <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${req.status === 'approved' ? 'bg-green-200 text-green-800' : 'bg-orange-200 text-orange-800'}`}>
                                {req.status}
                             </span>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

           </div>
        </div>
      </main>
    </div>
  );
}