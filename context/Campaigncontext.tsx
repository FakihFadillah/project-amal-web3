"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipe Data Kampanye
export type Campaign = {
  id: number;
  title: string;
  target: string;
  image: string;
  description: string;
  applicant: string;
  status: 'pending' | 'approved' | 'rejected';
  collected: number; 
  createdAt: string;
};

// Tipe Data User
export type UserData = {
  wallet: string;
  email: string;
  status: 'active' | 'suspended';
  suspendReason?: string; 
  joinedAt: string;
};

interface CampaignContextType {
  campaigns: Campaign[];
  users: UserData[]; 
  minBurnAmount: number; 
  
  addCampaign: (data: Omit<Campaign, 'id' | 'status' | 'createdAt' | 'collected'>) => void;
  approveCampaign: (id: number) => void;
  rejectCampaign: (id: number) => void;
  suspendUser: (wallet: string, reason: string) => void;
  unsuspendUser: (wallet: string) => void;
  updateBurnAmount: (amount: number) => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

// ... imports ...

// --- DATA DUMMY AWAL (Disamakan dengan Home) ---
const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    title: "Clean Water Initiative", // Judul disamakan
    target: "60000",
    // Gambar disamakan dengan Beranda (Gadis Kecil)
    image: "https://images.unsplash.com/photo-1594488518063-54949a74041b?auto=format&fit=crop&q=80&w=1000",
    description: "Masyarakat di Desa Sukamaju kesulitan air bersih. Proyek ini membangun sumur bor untuk 500 KK.",
    applicant: "Yayasan Air",
    status: 'approved',
    collected: 45000,
    createdAt: "01/02/2026"
  },
  {
    id: 2,
    title: "Solar School Project", // Judul disamakan
    target: "40000",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000",
    description: "Membantu sekolah di pelosok mendapatkan listrik mandiri untuk kegiatan belajar mengajar.",
    applicant: "Green Energy ID",
    status: 'approved',
    collected: 12000,
    createdAt: "02/02/2026"
  },
  {
    id: 3,
    title: "Community Health Center", // Judul disamakan
    target: "80000",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000",
    description: "Mobil ambulans dan obat-obatan gratis untuk daerah terpencil yang jauh dari Rumah Sakit.",
    applicant: "Dr. Peduli",
    status: 'approved',
    collected: 78000,
    createdAt: "03/02/2026"
  }
];

// ... sisa kode ke bawah TETAP SAMA ...

export function CampaignProvider({ children }: { children: ReactNode }) {
  // Set default state pakai data dummy di atas
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [minBurnAmount, setMinBurnAmount] = useState(100); 

  const [users, setUsers] = useState<UserData[]>([
    { wallet: "0x123...abc", email: "user@example.com", status: 'active', joinedAt: "2026-01-01" },
  ]);

  // Load data dari LocalStorage saat aplikasi dibuka
  useEffect(() => {
    const savedCamp = localStorage.getItem('my_campaigns');
    const savedUsers = localStorage.getItem('my_users');
    
    if (savedCamp) {
        try {
            const parsed = JSON.parse(savedCamp);
            
            // LOGIKA PENGGABUNGAN:
            // 1. Ambil kampanye buatan User (ID-nya > 100)
            const userCampaigns = parsed.filter((c: Campaign) => c.id > 100);
            
            // 2. Gabungkan: Dummy Bawaan + Kampanye User
            setCampaigns([...INITIAL_CAMPAIGNS, ...userCampaigns]);
        } catch (e) {
            console.error("Gagal load campaign", e);
        }
    }

    if (savedUsers) {
        try {
            setUsers(JSON.parse(savedUsers));
        } catch (e) {
            console.error("Gagal load user", e);
        }
    }
  }, []);

  // Simpan ke LocalStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem('my_campaigns', JSON.stringify(campaigns));
    localStorage.setItem('my_users', JSON.stringify(users));
  }, [campaigns, users]);

  const addCampaign = (data: any) => {
    const newCampaign: Campaign = {
      ...data,
      id: Date.now(), // ID pakai Timestamp (Angkanya miliaran)
      status: 'pending',
      collected: 0,
      createdAt: new Date().toLocaleDateString(),
    };
    setCampaigns((prev) => [newCampaign, ...prev]);
  };

  const approveCampaign = (id: number) => {
    setCampaigns((prev) => prev.map(c => c.id === id ? { ...c, status: 'approved' } : c));
  };

  const rejectCampaign = (id: number) => {
    setCampaigns((prev) => prev.map(c => c.id === id ? { ...c, status: 'rejected' } : c));
  };

  const suspendUser = (wallet: string, reason: string) => {
    setUsers((prev) => prev.map(u => u.wallet === wallet ? { ...u, status: 'suspended', suspendReason: reason } : u));
  };

  const unsuspendUser = (wallet: string) => {
    setUsers((prev) => prev.map(u => u.wallet === wallet ? { ...u, status: 'active', suspendReason: undefined } : u));
  };

  const updateBurnAmount = (amount: number) => {
    setMinBurnAmount(amount);
  };

  return (
    <CampaignContext.Provider value={{ 
      campaigns, users, minBurnAmount, 
      addCampaign, approveCampaign, rejectCampaign, 
      suspendUser, unsuspendUser, updateBurnAmount 
    }}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaigns() {
  const context = useContext(CampaignContext);
  if (!context) throw new Error("useCampaigns must be used within a CampaignProvider");
  return context;
}