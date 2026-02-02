"use client";
import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useCampaigns } from "@/context/Campaigncontext"; 
import { CheckCircle, XCircle, ShieldAlert, FileText, DollarSign, Users, Settings, Lock, Unlock, Search } from "lucide-react";
export const dynamic = 'force-dynamic';
export default function AdminDashboard() {
  const { user, authenticated } = usePrivy();
  // Ambil semua fungsi baru dari Context
  const { campaigns, users, minBurnAmount, approveCampaign, rejectCampaign, suspendUser, unsuspendUser, updateBurnAmount } = useCampaigns(); 
  
  const [activeTab, setActiveTab] = useState("campaigns");
  const [burnInput, setBurnInput] = useState(minBurnAmount.toString());

  // Filter Data
  const pendingCampaigns = campaigns.filter(c => c.status === 'pending');
  
  // Dummy Milestones (Karena milestone biasanya data dinamis per kampanye, kita hardcode dulu utk demo)
  const [pendingMilestones, setPendingMilestones] = useState([
    { id: 101, campaign: "Clean Water Village", step: "Termin 1", amount: "5,000 USDC", proof: "https://via.placeholder.com/150", status: "Waiting Admin" },
  ]);

  // --- HANDLERS ---
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

  // Handler User Suspend (Sesuai Kontrak C.2.b - Harus ketik alasan)
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

  if (!authenticated) return <div className="p-10 text-center font-bold text-red-500">⛔ AKSES DITOLAK</div>;

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      
      {/* HEADER ADMIN */}
      <div className="bg-gray-900 text-white p-4 sticky top-0 z-50 shadow-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-black text-xl text-green-400">
            <ShieldAlert /> ADMIN PANEL
          </div>
          <div className="text-xs text-gray-400">
             Log: {user?.email?.address || "Admin"}
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
            <p className="text-2xl font-black text-gray-900">{users.length}</p>
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
          
          {/* === TAB 1: REVIEW KAMPANYE (Kontrak C.1.a) === */}
          {activeTab === "campaigns" && (
            <div className="p-6">
              <h2 className="font-bold text-lg mb-4 text-gray-800">Review New Campaigns</h2>
              {pendingCampaigns.length === 0 ? <p className="text-gray-400 italic">No pending campaigns.</p> : (
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
              )}
            </div>
          )}

          {/* === TAB 2: MILESTONE & DISBURSEMENT (Kontrak C.1.b & C.1.c) === */}
          {activeTab === "milestones" && (
            <div className="p-6">
              <h2 className="font-bold text-lg mb-4 text-gray-800">Disbursement Approval</h2>
              <div className="space-y-4">
                {pendingMilestones.map(m => (
                   <div key={m.id} className="border p-4 rounded-xl flex items-center justify-between">
                      <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden"><img src={m.proof} className="w-full h-full object-cover"/></div>
                        <div>
                           <p className="font-bold text-gray-900">{m.campaign}</p>
                           <p className="text-sm text-gray-500">{m.step} • <span className="font-bold text-green-600">{m.amount}</span></p>
                           <p className="text-xs text-blue-500 mt-1">Wallet: Subaccount Exec.</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                         <button onClick={()=>handleMilestoneAction(m.id, 'approve')} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-md hover:bg-green-700">Execute Payout</button>
                         <button onClick={()=>handleMilestoneAction(m.id, 'reject')} className="text-red-500 text-xs font-bold hover:underline">Reject Request</button>
                      </div>
                   </div>
                ))}
              </div>
            </div>
          )}

          {/* === TAB 3: USER MANAGEMENT (Kontrak C.2.a & C.2.b) === */}
          {activeTab === "users" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                 <h2 className="font-bold text-lg text-gray-800">User List</h2>
                 <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input type="text" placeholder="Search wallet..." className="pl-9 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-green-500"/></div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 uppercase text-xs text-gray-500">
                    <tr><th className="p-3">Wallet Address</th><th className="p-3">Email</th><th className="p-3">Status</th><th className="p-3">Action</th></tr>
                  </thead>
                  <tbody className="divide-y">
                    {users.map((u, idx) => (
                      <tr key={idx} className={u.status === 'suspended' ? 'bg-red-50' : ''}>
                        <td className="p-3 font-mono text-gray-600">{u.wallet}</td>
                        <td className="p-3">{u.email}</td>
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

          {/* === TAB 4: SETTINGS (Kontrak C.1.d) === */}
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