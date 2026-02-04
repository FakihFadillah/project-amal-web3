"use client";

import Link from "next/link";
import { formatEther } from "viem";
import { Timer, Users, ArrowUpRight, Edit3, Wallet } from "lucide-react";

interface CampaignProps {
  id: number;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
  donators?: string[];
  isEditable?: boolean; 
}

export default function CampaignCard({
  id,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  donators,
  isEditable = false 
}: CampaignProps) {
  
  const targetNum = Number(target);
  const collectedNum = Number(formatEther(BigInt(amountCollected || "0")));
  const percentage = targetNum > 0 ? Math.min(100, (collectedNum / targetNum) * 100) : 0;
  const daysLeft = Math.max(0, Math.floor((Number(deadline) * 1000 - Date.now()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300 overflow-hidden hover:-translate-y-1">
      
      {/* GAMBAR */}
      <div className="relative h-48 w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {isEditable && (
           <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-orange-600 shadow-sm flex items-center gap-1">
              <Edit3 size={12}/> Owner Mode
           </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">{title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{description}</p>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-1.5"><Timer size={14} className="text-green-600"/><span>{daysLeft} Days left</span></div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-1.5"><Users size={14} className="text-blue-500"/><span>{donators?.length || 0} Backers</span></div>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-bold text-gray-900">{collectedNum} <span className="text-xs font-normal text-gray-500">USDC</span></span>
            <span className="font-bold text-gray-500">{Math.round(percentage)}%</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-6">
            <div className={`h-full rounded-full transition-all duration-1000 ease-out ${isEditable ? 'bg-orange-500' : 'bg-gradient-to-r from-green-500 to-emerald-400'}`} style={{ width: `${percentage}%` }}></div>
          </div>
          
          {isEditable ? (
            <div className="flex gap-2">
                {/* TOMBOL EDIT */}
                <Link href={`/edit/${id}`} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all">
                    <Edit3 size={16} /> Edit
                </Link>
                {/* TOMBOL KELOLA DANA (NEW) */}
                <Link href={`/manage/${id}`} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-green-600 transition-all shadow-lg">
                    <Wallet size={16} /> Dana
                </Link>
            </div>
          ) : (
            <Link href={`/campaign/${id}`} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-900 text-white font-bold text-sm group-hover:bg-green-600 transition-all shadow-lg shadow-gray-200 group-hover:shadow-green-200">
                Donate Now <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}