"use client";
import CampaignCard from "@/components/Campaigncard";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

// Data Dummy dengan Status Campur-campur (Sesuai Kontrak)
const MY_CAMPAIGNS = [
  { id: 1, judul: "Bantu Renovasi Sekolah", target: "5,000", terkumpul: 0, sisaHari: 30, backer: 0, image: "bg-yellow-50", status: "pending" as const },
  { id: 2, judul: "Sumur Air Bersih Desa", target: "2,000", terkumpul: 45, sisaHari: 12, backer: 24, image: "bg-blue-100", status: "ongoing" as const },
  { id: 3, judul: "Kampanye Ditolak", target: "10,000", terkumpul: 0, sisaHari: 0, backer: 0, image: "bg-red-50", status: "rejected" as const },
];

export default function MyCampaignsPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Dashboard */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Kampanye Saya</h1>
            <p className="text-gray-500">Kelola status dan perkembangan proyekmu.</p>
          </div>
          <Link href="/create">
            <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition">
              <PlusCircle size={20} /> Buat Baru
            </button>
          </Link>
        </div>

        {/* List Kampanye */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MY_CAMPAIGNS.map((item) => (
            <CampaignCard key={item.id} {...item} />
          ))}
        </div>

        {/* Info Kontrak */}
        <div className="mt-12 bg-blue-50 border border-blue-100 p-6 rounded-xl text-sm text-blue-800">
          <strong>Catatan Sesuai Smart Contract:</strong>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Status <strong>Pending</strong> sedang direview oleh Admin Dashboard.</li>
            <li>Kampanye <strong>Rejected</strong> tidak dapat diedit kembali (harus buat baru).</li>
            <li>Pastikan kamu memiliki saldo <strong>$AMAL</strong> untuk staking sebelum membuat kampanye baru.</li>
          </ul>
        </div>

      </div>
    </main>
  );
}