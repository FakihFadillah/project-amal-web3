"use client";
import { Download, RefreshCcw } from "lucide-react";

// Data Dummy Transaksi
const HISTORY = [
  { id: "TX-001", campaign: "Clean Water Initiative", date: "2026-01-20 14:30", amount: "50 USDC", status: "Success", canRefund: false },
  { id: "TX-002", campaign: "Solar School Project", date: "2026-01-25 09:15", amount: "100 USDC", status: "Success", canRefund: false },
  { id: "TX-003", campaign: "Proyek Gagal Bangun", date: "2026-01-10 11:00", amount: "250 USDC", status: "Canceled", canRefund: true },
];

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="p-8 border-b border-gray-100">
          <h1 className="text-2xl font-black text-gray-900">Riwayat Donasi</h1>
          <p className="text-gray-500 text-sm">Transparansi data sesuai catatan Blockchain.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-8 py-4">Project Name</th>
                <th className="px-8 py-4">Date & Time</th>
                <th className="px-8 py-4">Amount (USDC)</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {HISTORY.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-8 py-6 font-bold text-gray-900">{item.campaign}</td>
                  <td className="px-8 py-6 text-sm text-gray-500">{item.date}</td>
                  <td className="px-8 py-6 font-mono font-bold text-green-600">{item.amount}</td>
                  
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === "Canceled" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="px-8 py-6">
                    {/* Fitur Refund Sesuai Kontrak */}
                    {item.canRefund ? (
                      <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-600 transition shadow-md shadow-red-200">
                        <RefreshCcw size={14} /> Claim Refund
                      </button>
                    ) : (
                      <button className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition text-xs font-bold">
                        <Download size={14} /> Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}