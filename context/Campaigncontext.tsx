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
      title: "Bantu Anak Sekolah Kembali Belajar",
      description: "Masih banyak anak-anak yang ingin sekolah, tapi terkendala biaya perlengkapan seperti buku, seragam, dan alat tulis. Melalui program ini, donasi yang terkumpul akan digunakan untuk: Paket alat tulis & buku, Seragam sekolah, Biaya SPP, dan Bantuan transportasi.",
      target: "1000", 
      deadline: Date.now() + 86400000 * 30,
      amountCollected: "0",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop",
      donators: [],
      status: "approved",
      applicant: "0x71C...9A21"
    },
    {
      id: 2,
      title: "Darurat Bencana: Bantu Korban Mengungsi",
      description: "Bencana alam datang tanpa peringatan. Banyak keluarga kehilangan rumah, makanan, dan kebutuhan dasar. Donasi digunakan untuk: Paket makanan siap saji, Selimut & pakaian hangat, Obat-obatan, Air bersih & tenda darurat.",
      target: "3500", 
      deadline: Date.now() + 86400000 * 14,
      amountCollected: "500000000000000000000", 
      // 👇 INI LINK GAMBAR BARUNYA (Suasana Banjir & Evakuasi)
      image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg",
      donators: ["0x123..."],
      status: "approved",
      applicant: "0x3dA...bB12"
    },
    {
      id: 3,
      title: "Selamatkan Kucing & Anjing Jalanan",
      description: "Hewan terlantar di jalanan sering kelaparan, sakit, bahkan mengalami kekerasan. Dana akan digunakan untuk: Makanan kucing & anjing, Sterilisasi & vaksin, Biaya pengobatan, serta Rescue dan shelter sementara.",
      target: "700", 
      deadline: Date.now() + 86400000 * 30,
      amountCollected: "350000000000000000000", 
      image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1000&auto=format&fit=crop",
      donators: ["0xUserC..."],
      status: "approved",
      applicant: "0xAnimalRescuer"
    }
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