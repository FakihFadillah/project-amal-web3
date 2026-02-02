"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
// Pastikan path import ini sesuai dengan struktur folder kamu
import { useCampaigns } from "@/context/Campaigncontext"; 
import { CheckCircle, XCircle, ShieldAlert, FileText, DollarSign, Users, Settings, Lock, Unlock, Search } from "lucide-react";

// PENTING: Untuk mengatasi error "prerender" di Vercel
export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const { user, authenticated } = usePrivy();
  
  // Ambil semua fungsi dari Context (Otak Global)
  // Pastikan nama-nama fungsi ini sesuai dengan yang ada di CampaignContext.tsx kamu
  const { 
    campaigns, 
    users, 
    minBurnAmount, 
    approveCampaign, 
    rejectCampaign, 
    suspendUser, 
    unsuspendUser, 
    updateBurnAmount 
  } = useCampaigns(); 
  
  const [activeTab, setActiveTab] = useState("campaigns");
  const [burnInput, setBurnInput] = useState(minBurnAmount ? minBurnAmount.toString() : "0");

  // Filter Data: Hanya ambil kampanye yang statusnya 'pending'
  const pendingCampaigns = campaigns ? campaigns.filter(c => c.status === 'pending') : [];
  
  // Dummy Milestones (Data sementara untuk demo Disbursement)
  const [pendingMilestones, setPendingMilestones] = useState([
    { id: 101, campaign: "Clean Water Village", step: "Termin 1", amount: "5,000 USDC", proof: "https://via.placeholder.com/150", status: "Waiting Admin" },
  ]);

  // --- HANDLERS (Fungsi Penanganan Tombol) ---

  const handleCampaignAction = (id: number, action: "approve" | "reject") => {
    if (confirm(`Yakin mau ${action} kampanye ini?`)) {
      action === "approve" ? approveCampaign(id) : rejectCampaign(id);
    }
  };

  const handleMilestoneAction = (id: number, action: "approve" | "reject") => {
    if (confirm(action === "approve" ? "Konfirmasi pencairan via Subaccount Wallet?" : "Tolak pencairan?")) {
      setPendingMilestones((prev) => prev.filter((m) => m.id !== id));
      alert(action === "approve" ? "Disbursement Executed via Smart Contract ✅" : "Rejected ❌");
    }
  };

  // Handler User Suspend (Wajib isi alasan sesuai kontrak)
  const handleSuspend = (wallet: string) => {
    const reason = prompt("Masukkan alasan suspend user ini (Wajib):");
    if (reason) {
      suspendUser(wallet, reason);
      alert("User berhasil di-suspend.");
    }
  };

  const handleSaveSettings = () => {
    updateBurnAmount(Number(burnInput));
    alert(`Setting disimpan! Minimum Burn sekarang: ${burnInput} $AMAL`);
  };

  // Proteksi Halaman: Jika belum login, tolak akses
  if (!authenticated) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <ShieldAlert size={64} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">AKSES DITOLAK</h1>
        <p className="text-gray-500">Silakan login terlebih dahulu untuk mengakses panel ini.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      
      {/* HEADER ADMIN */}
      <div className="bg-gray-900 text-white p-4 sticky top-0 z-50 shadow-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-black text-xl text-green-400">
            <ShieldAlert /> ADMIN PANEL
          </div>
          <div className="text-xs text-gray-400">
             Log: {user?.email?.address || user?.wallet?.address || "Admin"}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 mt-8">
        
        {/* STATS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 font-bold uppercase">Pending Campaign</p>
            <p className="text-2xl font-black text-yellow-500">{pendingCampaigns.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 font-bold uppercase">Payout Request</p>
            <p className="text-2xl font-black text-blue-500">{pendingMilestones.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 font-bold uppercase">Total Users</p>
            <p className="text-2xl font-black text-gray-900">{users ? users.length : 0}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 font-bold uppercase">Min. Burn Rate</p>
            <p className="text-2xl font-black text-green-600">{minBurnAmount} <span className="text-xs text-gray-400">$AMAL</span></p>
          </div>
        </div>

        {/* MENU TABS */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-300 pb-1">
          {[
            { id: "campaigns", icon: <FileText size={16}/>, label: "Campaigns" },
            { id: "milestones", icon: <DollarSign size={16}/>, label: "Disbursement" },
            { id: "users", icon: <Users size={16}/>, label: "User Mgmt" },
            { id: "settings", icon: <Settings size={16}/>, label: "Settings" },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-lg font-bold text-sm flex items-center gap-2 transition ${activeTab === tab.id ? "bg-white text-green-700 border border-gray-300 border-b-white -mb-[5px]" : "text-gray-500 hover:bg-gray-200"}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* KONTEN UTAMA */}
        <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
          
          {/* === TAB 1: REVIEW KAMPANYE === */}
          {activeTab === "campaigns" && (
            <div className="p-6">
              <h2 className="font-bold text-lg mb-4 text-gray-800">Review New Campaigns</h2>
              {pendingCampaigns.length === 0 ? <p className="text-gray-400 italic">No pending campaigns.</p> : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 uppercase text-xs text-gray-500">
                        <tr><th className="p-3">Title</th><th className="p-3">Applicant</th><th className="p-3">Target</th><th className="p-3">Action</th></tr>
                    </thead>
                    <tbody className="divide-y">
                        {pendingCampaigns.map(c => (
                        <tr key={c.id}>
                            <td className="p-3 font-bold">{c.title}</td>
                            <td className="p-3">{c.applicant}</td>
                            <td className="p-3 text-green-600">${c.target}</td>
                            <td className="p-3 flex gap-2">
                            <button onClick={()=>handleCampaignAction(c.id, 'approve')} className="bg-green-100 text-green-700 px-3 py-1 rounded font-bold text-xs hover:bg-green-200">Approve</button>
                            <button onClick={()=>handleCampaignAction(c.id, 'reject')} className="bg-red-100 text-red-700 px-3 py-1 rounded font-bold text-xs hover:bg-red-200">Reject</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
              )}
            </div>
          )}

          {/* === TAB 2: MILESTONE & DISBURSEMENT === */}
          {activeTab === "milestones" && (
            <div className="p-6">
              <h2 className="font-bold text-lg mb-4 text-gray-800">Disbursement Approval</h2>
              <div className="space-y-4">
                {pendingMilestones.map(m => (
                   <div key={m.id} className="border p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0"><img src={m.proof} className="w-full h-full object-cover"/></div>
                        <div>
                           <p className="font-bold text-gray-900">{m.campaign}</p>
                           <p className="text-sm text-gray-500">{m.step} • <span className="font-bold text-green-600">{m.amount}</span></p>
                           <p className="text-xs text-blue-500 mt-1">Wallet: Subaccount Exec.</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 w-full md:w-auto">
                         <button onClick={()=>handleMilestoneAction(m.id, 'approve')} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-md hover:bg-green-700 w-full md:w-auto">Execute Payout</button>
                         <button onClick={()=>handleMilestoneAction(m.id, 'reject')} className="text-red-500 text-xs font-bold hover:underline w-full md:w-auto text-center">Reject Request</button>
                      </div>
                   </div>
                ))}
              </div>
            </div>
          )}

          {/* === TAB 3: USER MANAGEMENT === */}
          {activeTab === "users" && (
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                 <h2 className="font-bold text-lg text-gray-800">User List</h2>
                 <div className="relative w-full md:w-auto"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input type="text" placeholder="Search wallet..." className="w-full md:w-64 pl-9 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-green-500"/></div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 uppercase text-xs text-gray-500">
                    <tr><th className="p-3">Wallet Address</th><th className="p-3">Email</th><th className="p-3">Status</th><th className="p-3">Action</th></tr>
                  </thead>
                  <tbody className="divide-y">
                    {users && users.map((u, idx) => (
                      <tr key={idx} className={u.status === 'suspended' ? 'bg-red-50' : ''}>
                        <td className="p-3 font-mono text-gray-600 text-xs">{u.wallet}</td>
                        <td className="p-3 text-xs">{u.email}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                             {u.status.toUpperCase()}
                          </span>
                          {u.status === 'suspended' && <p className="text-[10px] text-red-500 mt-1">Reason: {u.suspendReason}</p>}
                        </td>
                        <td className="p-3">
                          {u.status === 'active' ? (
                            <button onClick={()=>handleSuspend(u.wallet)} className="flex items-center gap-1 text-red-500 border border-red-200 px-3 py-1 rounded hover:bg-red-50 font-bold text-xs">
                               <Lock size={12} /> Suspend
                            </button>
                          ) : (
                            <button onClick={()=>unsuspendUser(u.wallet)} className="flex items-center gap-1 text-green-600 border border-green-200 px-3 py-1 rounded hover:bg-green-50 font-bold text-xs">
                               <Unlock size={12} /> Lift Ban
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* === TAB 4: SETTINGS === */}
          {activeTab === "settings" && (
             <div className="p-6 max-w-lg">
                <h2 className="font-bold text-lg mb-4 text-gray-800">Platform Settings</h2>
                
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                   <label className="block text-sm font-bold text-gray-700 mb-2">
                      Minimum $AMAL Burn to Create Campaign
                   </label>
                   <p className="text-xs text-gray-500 mb-4">
                      Sesuai kontrak C.1.d, user harus membakar sejumlah token untuk membuat kampanye (spam prevention).
                   </p>
                   <div className="flex gap-2">
                      <div className="relative flex-1">
                         <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400">$AMAL</span>
                         <input 
                            type="number" 
                            value={burnInput}
                            onChange={(e) => setBurnInput(e.target.value)}
                            className="w-full pl-16 pr-4 py-3 border rounded-lg font-bold text-gray-900 outline-none focus:ring-2 focus:ring-green-500"
                         />
                      </div>
                      <button onClick={handleSaveSettings} className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 shadow-lg">
                         Save
                      </button>
                   </div>
                </div>
             </div>
          )}

        </div>
      </main>
    </div>
  );
}