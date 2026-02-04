"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShieldAlert, CheckCircle2, XCircle, FileText, 
  ExternalLink, Wallet, Activity, AlertTriangle, 
  ChevronRight, Lock, Unlock 
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"campaigns" | "disbursements">("campaigns");

  // --- DUMMY DATA (Simulasi Data Blockchain) ---
  const [pendingCampaigns, setPendingCampaigns] = useState([
    {
      id: 101,
      title: "Pembangunan Jembatan Desa Sukamaju",
      applicant: "0x71C...9A21",
      target: "5,000 USDC",
      date: "2026-02-04",
      image: "https://images.unsplash.com/photo-1513828583688-6330539f8d19?auto=format&fit=crop&q=80&w=200",
      description: "Jembatan penghubung antar desa putus akibat longsor..."
    },
    {
      id: 102,
      title: "Beasiswa Anak Yatim Cyber",
      applicant: "0x3dA...bB12",
      target: "2,000 USDC",
      date: "2026-02-05",
      image: "https://images.unsplash.com/photo-1427504746696-ea77b49e6589?auto=format&fit=crop&q=80&w=200",
      description: "Program pelatihan koding untuk anak panti asuhan..."
    }
  ]);

  const [payoutRequests, setPayoutRequests] = useState([
    {
      id: 55,
      campaignTitle: "Bantuan Banjir Demak",
      milestone: "Termin 1: Pembelian Logistik",
      amount: "1,000 USDC",
      proof: "https://via.placeholder.com/600x400?text=Bukti+Nota+Belanja",
      requester: "0xUserA..."
    },
    {
      id: 56,
      campaignTitle: "Renovasi Sekolah Dasar 01",
      milestone: "Termin 2: Upah Tukang",
      amount: "500 USDC",
      proof: "https://via.placeholder.com/600x400?text=Foto+Progress",
      requester: "0xUserB..."
    }
  ]);

  // --- ACTIONS ---
  const handleApprove = (id: number) => {
    if(confirm("Setujui kampanye ini masuk ke Smart Contract?")) {
      setPendingCampaigns(prev => prev.filter(c => c.id !== id));
      alert("Kampanye Disetujui! ✅");
    }
  };

  const handleReject = (id: number) => {
    if(confirm("Tolak kampanye ini? Gas fee user akan hangus.")) {
      setPendingCampaigns(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleReleaseFunds = (id: number) => {
    if(confirm("Bukti valid? Cairkan dana ke wallet user?")) {
      setPayoutRequests(prev => prev.filter(p => p.id !== id));
      alert("Dana Dicairkan (Disbursed)! 💸");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-black relative">
      
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      {/* === 1. HEADER (COMMAND CENTER) === */}
      <div className="relative z-10 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 pt-32 pb-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
               <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-[0.2em]">System Administrator</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white">
              Governance <span className="text-slate-500">Dashboard</span>
            </h1>
          </div>
          
          <div className="flex gap-4">
            <div className="text-right">
               <p className="text-xs text-slate-400 font-bold uppercase">Network Status</p>
               <p className="text-green-400 font-mono font-bold flex items-center justify-end gap-2">
                 <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online (Sepolia)
               </p>
            </div>
            <div className="h-10 w-px bg-slate-700"></div>
            <div className="text-right">
               <p className="text-xs text-slate-400 font-bold uppercase">Pending Actions</p>
               <p className="text-white font-mono font-bold">{pendingCampaigns.length + payoutRequests.length} Tasks</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* === 2. STATS OVERVIEW === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl -mr-6 -mt-6"></div>
              <Activity className="text-cyan-400 mb-4" size={28} />
              <h3 className="text-3xl font-black text-white">124</h3>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Total Campaigns</p>
           </div>
           
           <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -mr-6 -mt-6"></div>
              <Wallet className="text-purple-400 mb-4" size={28} />
              <h3 className="text-3xl font-black text-white">$45.2K</h3>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">TVL (Dana Terkunci)</p>
           </div>

           <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl -mr-6 -mt-6"></div>
              <AlertTriangle className="text-orange-400 mb-4" size={28} />
              <h3 className="text-3xl font-black text-white">{pendingCampaigns.length}</h3>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Pending Review</p>
           </div>
        </div>

        {/* === 3. TAB NAVIGATION === */}
        <div className="flex gap-4 mb-8 border-b border-slate-800 pb-1">
           <button 
             onClick={() => setActiveTab("campaigns")}
             className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === "campaigns" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-500 hover:text-slate-300"}`}
           >
             Campaign Approvals ({pendingCampaigns.length})
           </button>
           <button 
             onClick={() => setActiveTab("disbursements")}
             className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === "disbursements" ? "text-purple-400 border-b-2 border-purple-400" : "text-slate-500 hover:text-slate-300"}`}
           >
             Disbursement Requests ({payoutRequests.length})
           </button>
        </div>

        {/* === 4. LIST CONTENT === */}
        
        {/* TAB 1: CAMPAIGNS */}
        {activeTab === "campaigns" && (
          <div className="space-y-4">
             {pendingCampaigns.length > 0 ? pendingCampaigns.map((campaign) => (
                <div key={campaign.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 hover:border-cyan-500/30 transition shadow-lg">
                   {/* Image */}
                   <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-slate-800">
                      <img src={campaign.image} alt="Campaign" className="w-full h-full object-cover" />
                   </div>

                   {/* Info */}
                   <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                         <span className="px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase">Pending Review</span>
                         <span className="text-slate-500 text-xs font-mono">{campaign.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{campaign.title}</h3>
                      <p className="text-slate-400 text-sm line-clamp-2 mb-4">{campaign.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
                         <span className="flex items-center gap-1"><Wallet size={12}/> {campaign.applicant}</span>
                         <span className="flex items-center gap-1"><Activity size={12}/> Target: {campaign.target}</span>
                      </div>
                   </div>

                   {/* Actions */}
                   <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
                      <button 
                        onClick={() => handleApprove(campaign.id)}
                        className="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-sm transition flex items-center justify-center gap-2"
                      >
                         <CheckCircle2 size={16} /> Approve
                      </button>
                      <button 
                        onClick={() => handleReject(campaign.id)}
                        className="flex-1 px-6 py-3 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-300 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 border border-slate-700 hover:border-red-500/50"
                      >
                         <XCircle size={16} /> Reject
                      </button>
                   </div>
                </div>
             )) : (
                <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl text-slate-500">
                   <ShieldAlert size={40} className="mx-auto mb-4 opacity-50"/>
                   <p>No pending campaigns to review.</p>
                </div>
             )}
          </div>
        )}

        {/* TAB 2: DISBURSEMENTS */}
        {activeTab === "disbursements" && (
           <div className="space-y-4">
              {payoutRequests.length > 0 ? payoutRequests.map((request) => (
                 <div key={request.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 hover:border-purple-500/30 transition shadow-lg relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
                    
                    <div className="flex-1">
                       <h4 className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">{request.campaignTitle}</h4>
                       <h3 className="text-xl font-bold text-white mb-2">{request.milestone}</h3>
                       <div className="flex items-center gap-4 text-sm mb-4">
                          <span className="text-purple-400 font-mono font-bold bg-purple-500/10 px-2 py-1 rounded">Ask: {request.amount}</span>
                          <span className="text-slate-500 font-mono">by {request.requester}</span>
                       </div>
                       
                       {/* Proof Attachment */}
                       <a href={request.proof} target="_blank" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white underline decoration-slate-600 hover:decoration-white transition">
                          <FileText size={14} /> Lihat Bukti / Nota (Link) <ExternalLink size={12}/>
                       </a>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
                      <button 
                        onClick={() => handleReleaseFunds(request.id)}
                        className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
                      >
                         <Unlock size={16} /> Release Fund
                      </button>
                      <button 
                         className="flex-1 px-6 py-3 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-300 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 border border-slate-700 hover:border-red-500/50"
                      >
                         <Lock size={16} /> Reject & Hold
                      </button>
                   </div>
                 </div>
              )) : (
                 <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl text-slate-500">
                    <Wallet size={40} className="mx-auto mb-4 opacity-50"/>
                    <p>No disbursement requests pending.</p>
                 </div>
              )}
           </div>
        )}

      </main>
    </div>
  );
}