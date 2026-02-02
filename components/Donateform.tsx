"use client";

import { useState } from "react";
import { Wallet, ShieldCheck } from "lucide-react";

interface DonateFormProps {
  target: string;
}

export default function DonateForm({ target }: DonateFormProps) {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDonate = () => {
    if (!amount) return alert("Isi nominal dulu!");
    setIsLoading(true);
    setTimeout(() => {
      alert(`Berhasil donasi ${amount} USDC!`);
      setIsLoading(false);
      setAmount("");
    }, 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 sticky top-28">
      
      <div className="mb-6">
        <h3 className="text-gray-500 text-sm font-semibold mb-1">Target Dana</h3>
        <p className="text-3xl font-black text-gray-900">{target}</p>
      </div>

      {/* Progress Bar Hijau */}
      <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
        <div className="bg-green-500 h-3 rounded-full w-3/4 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
      </div>
      <p className="text-right text-sm font-bold text-gray-600 mb-8">75% Terkumpul</p>

      {/* Input Nominal */}
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-400 font-bold">$</span>
          </div>
          <input 
            type="number" 
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-8 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 font-bold focus:ring-2 focus:ring-green-500 focus:border-transparent transition outline-none"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-xs font-bold text-gray-400">USDC</span>
          </div>
        </div>

        {/* Tombol Hijau Neon */}
        <button 
          onClick={handleDonate}
          disabled={isLoading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-green-200 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? "Memproses..." : (
            <>
              <Wallet size={18} /> Donasi Sekarang
            </>
          )}
        </button>
        
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4 bg-gray-50 py-2 rounded-lg">
          <ShieldCheck size={14} className="text-green-600" />
          <span>Dana aman di Smart Contract</span>
        </div>
      </div>
    </div>
  );
}