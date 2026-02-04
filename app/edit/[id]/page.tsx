"use client";

import { useState, useEffect } from "react";
import { useCampaigns } from "@/context/Campaigncontext"; 
import { useRouter, useParams } from "next/navigation";
import { Type, FileText, ImageIcon, Save, Undo2, Trash2 } from "lucide-react";
import CampaignCard from "@/components/Campaigncard"; 

export default function EditCampaign() {
  const { id } = useParams();
  const { campaigns, updateCampaign, deleteCampaign } = useCampaigns(); // Ambil fungsi update & delete
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // State Form
  const [form, setForm] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  // 1. CARI DATA LAMA (Auto-Fill)
  useEffect(() => {
    // Cari kampanye yang ID-nya cocok
    const existingCampaign = campaigns.find((c) => c.id === Number(id));
    
    if (existingCampaign) {
      // Kalau ketemu, isi formulir dengan data lama
      setForm({
        title: existingCampaign.title,
        description: existingCampaign.description,
        target: existingCampaign.target,
        // Konversi tanggal dari timestamp ke format YYYY-MM-DD biar bisa dibaca input date
        deadline: new Date(Number(existingCampaign.deadline) * 1000).toISOString().split('T')[0],
        image: existingCampaign.image,
      });
    } else {
      // Kalau ID tidak ditemukan (ngawur), tendang balik ke dashboard
      router.push("/dashboard"); 
    }
  }, [id, campaigns, router]);

  // Handle Ketik
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Upload Gambar Baru
  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, image: URL.createObjectURL(file) });
    }
  };

  // Handle Simpan (Save)
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Panggil fungsi update di Context
      updateCampaign(Number(id), {
        ...form,
        deadline: new Date(form.deadline).getTime() / 1000, 
      });
      setIsLoading(false);
      router.push("/dashboard"); // Balik ke dashboard setelah simpan
    }, 1500);
  };

  // Handle Hapus (Delete)
  const handleDelete = () => {
    if(confirm("Yakin ingin menghapus kampanye ini selamanya?")) {
        deleteCampaign(Number(id));
        router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
           <div>
               <h1 className="text-4xl font-black text-gray-900 mb-2">Edit Kampanye</h1>
               <p className="text-gray-500">Perbarui informasi proyekmu agar donatur tetap percaya.</p>
           </div>
           <button onClick={() => router.back()} className="px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-600 font-bold text-sm hover:bg-gray-100 flex items-center gap-2 transition">
               <Undo2 size={16} /> Batal
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* === KOLOM KIRI: FORMULIR EDIT === */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-red-500"></div>

             <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="group">
                   <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <Type size={16} className="text-gray-400"/> Judul Kampanye
                   </label>
                   <input 
                     type="text" 
                     name="title"
                     value={form.title}
                     onChange={handleChange}
                     className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-gray-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                   />
                </div>

                <div className="group">
                   <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <ImageIcon size={16} className="text-gray-400"/> Ganti Banner (Opsional)
                   </label>
                   <input type="file" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"/>
                </div>

                <div className="group">
                   <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <FileText size={16} className="text-gray-400"/> Cerita & Deskripsi
                   </label>
                   <textarea 
                     name="description"
                     value={form.description}
                     onChange={handleChange}
                     rows={8}
                     className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all resize-none"
                   ></textarea>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-100 mt-6">
                  {/* Tombol Hapus */}
                  <button 
                    type="button"
                    onClick={handleDelete}
                    className="px-6 py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition flex items-center gap-2"
                  >
                     <Trash2 size={20} />
                  </button>

                  {/* Tombol Simpan */}
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className={`flex-1 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl transition-all ${isLoading ? 'bg-gray-300' : 'bg-gray-900 text-white hover:bg-orange-600 hover:shadow-orange-200 hover:-translate-y-1'}`}
                  >
                    {isLoading ? "Menyimpan..." : (
                      <>
                        Simpan Perubahan <Save size={20} />
                      </>
                    )}
                  </button>
                </div>
             </form>
          </div>

          {/* === KOLOM KANAN: PREVIEW PERUBAHAN === */}
          <div className="sticky top-32 hidden lg:block">
             <div className="flex items-center gap-2 mb-6 text-gray-400 font-bold text-sm uppercase tracking-wider px-2">
                Preview Perubahan
             </div>
             {/* Menampilkan kartu dengan data yang sedang diketik */}
             <CampaignCard 
                id={999}
                title={form.title}
                description={form.description}
                target={form.target}
                deadline={(form.deadline ? new Date(form.deadline).getTime() : Date.now()) / 1000 / 86400} 
                amountCollected="0"
                image={form.image || "https://via.placeholder.com/800x400"}
                isEditable={true} // Tampilkan badge 'Owner Mode'
             />
             <p className="text-center text-gray-400 text-xs mt-4">Tampilan Live Preview saat user melihat kampanye ini.</p>
          </div>

        </div>
      </main>
    </div>
  );
}