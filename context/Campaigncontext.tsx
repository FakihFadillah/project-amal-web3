"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Tipe Data
interface Campaign {
  id: number;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
  donators: string[];
  status: "pending" | "approved" | "rejected";
  applicant: string;
}

interface CampaignContextType {
  campaigns: Campaign[];
  minBurnAmount: number;
  isLoading: boolean;
  createCampaign: (data: any) => void;
  updateCampaign: (id: number, data: any) => void; // <--- INI FUNGSI BARU
  deleteCampaign: (id: number) => void; // Bonus: Fungsi Hapus
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider = ({ children }: { children: ReactNode }) => {
  // Dummy Data Awal
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 1,
      title: "Bantuan Banjir Demak",
      description: "Donasi untuk korban banjir bandang di Demak, Jawa Tengah.",
      target: "5000",
      deadline: Date.now() + 86400000 * 10,
      amountCollected: "2500000000000000000000", 
      image: "https://images.unsplash.com/photo-1547625121-a3962b800e39?q=80&w=1000&auto=format&fit=crop",
      donators: ["0x123...", "0x456..."],
      status: "approved",
      applicant: "0xUserA..."
    },
    // ... data dummy lainnya
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [minBurnAmount] = useState(50);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // --- ACTIONS ---
  
  const createCampaign = (data: any) => {
    const newCampaign: Campaign = {
      id: Date.now(), // Pakai timestamp biar ID unik
      ...data,
      amountCollected: "0",
      donators: [],
      status: "pending",
      applicant: "0xUser..."
    };
    setCampaigns([newCampaign, ...campaigns]); // Tambah ke paling atas
  };

  // 👇 FUNGSI UPDATE (BARU)
  const updateCampaign = (id: number, data: any) => {
    setCampaigns((prev) => 
      prev.map((c) => c.id === id ? { ...c, ...data } : c)
    );
  };

  // 👇 FUNGSI DELETE (BARU - Bonus)
  const deleteCampaign = (id: number) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CampaignContext.Provider value={{ 
      campaigns, 
      minBurnAmount, 
      isLoading, 
      createCampaign, 
      updateCampaign, // Export fungsi baru
      deleteCampaign 
    }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaigns = () => {
  const context = useContext(CampaignContext);
  if (!context) throw new Error("useCampaigns error");
  return context;
};