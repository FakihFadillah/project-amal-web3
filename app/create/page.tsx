"use client";

import { useState } from "react";
import { useCampaigns } from "@/context/Campaigncontext"; 
import { useRouter } from "next/navigation";
import { UploadCloud, Calendar, DollarSign, Type, FileText, ImageIcon, ArrowRight, Sparkles, Eye, X } from "lucide-react";
import CampaignCard from "@/components/Campaigncard"; 

export default function CreateCampaign() {
  const { createCampaign, minBurnAmount } = useCampaigns();
  const router = useRouter();

  // State Form
  const [form, setForm] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "", // Nanti diisi URL sementara dari file
  });

  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false); // Untuk efek Drag & Drop

  // 1. HANDLE TEXT INPUT BIASA
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 2. HANDLE UPLOAD GAMBAR (FILE)
  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      // Membuat URL sementara agar bisa dipreview di browser
      const previewUrl = URL.createObjectURL(file);
      setForm({ ...form, image: previewUrl });
    }
  };

  // 3. HANDLE DRAG & DROP
  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const previewUrl = URL.createObjectURL(file);
      setForm({ ...form, image: previewUrl });
    }
  };

  // 4. HAPUS GAMBAR
  const removeImage = () => {
    setForm({ ...form, image: "" });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi Upload ke Blockchain/Server
    setTimeout(() => {
      createCampaign({
        ...form,
        deadline: new Date(form.deadline).getTime() / 1000, 
      });
      setIsLoading(false);
      router.push("/dashboard/my-campaigns");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-green-100 selection:text-green-900 relative">
      
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="mb-10 text-center md:text-left">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles size={12} /> Start Fundraising
           </div>
           <h1 className="text-4xl font-black text-gray-900 mb-2">Buat Kampanye Baru</h1>
           <p className="text-gray-500 max-w-xl">
             Ceritakan idemu, upload visual terbaik, dan galang dana secara transparan.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* === KOLOM KIRI: FORMULIR === */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>

             <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Input Title */}
                <div className="group">
                   <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <Type size={16} className="text-gray-400"/> Judul Kampanye
                   </label>
                   <input 
                     type="text" 
                     name="title"
                     value={form.title}
                     onChange={handleChange}
                     placeholder="Contoh: Bantuan Banjir Demak..." 
                     required
                     className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-gray-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all placeholder:font-normal placeholder:text-gray-400"
                   />
                </div>

                {/* --- AREA UPLOAD GAMBAR BARU (DRAG & DROP) --- */}
                <div className="group">
                   <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <ImageIcon size={16} className="text-gray-400"/> Banner Kampanye
                   </label>
                   
                   {/* Jika belum ada gambar, tampilkan area upload */}
                   {!form.image ? (
                     <div 
                        className={`relative w-full h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                     >
                        <input 
                          type="file" 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleImageUpload}
                          accept="image/*" // Hanya terima file gambar
                        />
                        <div className="p-4 bg-white rounded-full shadow-sm mb-3">
                           <UploadCloud size={24} className="text-blue-500" />
                        </div>
                        <p className="text-sm font-bold text-gray-700">Klik untuk upload</p>
                        <p className="text-xs text-gray-400 mt-1">atau drag & drop file ke sini (JPG, PNG)</p>
                     </div>
                   ) : (
                     // Jika sudah ada gambar, tampilkan preview + tombol hapus
                     <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-gray-200 group-image">
                        <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={removeImage}
                          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-red-500 hover:bg-red-50 transition shadow-md"
                          title="Hapus Gambar"
                        >
                           <X size={18} />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 text-center backdrop-blur-sm">
                           File Terpilih
                        </div>
                     </div>
                   )}
                </div>
                {/* ------------------------------------------- */}

                <div className="group">
                   <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <FileText size={16} className="text-gray-400"/> Cerita & Deskripsi
                   </label>
                   <textarea 
                     name="description"
                     value={form.description}
                     onChange={handleChange}
                     placeholder="Jelaskan secara detail kenapa penggalangan dana ini penting..." 
                     required
                     rows={5}
                     className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all placeholder:text-gray-400 resize-none"
                   ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                         <DollarSign size={16} className="text-gray-400"/> Target Dana (USDC)
                      </label>
                      <input 
                        type="number"
                        name="target"
                        value={form.target}
                        onChange={handleChange}
                        placeholder="1000" 
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-gray-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all"
                      />
                   </div>

                   <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                         <Calendar size={16} className="text-gray-400"/> Batas Waktu
                      </label>
                      <input 
                        type="date"
                        name="deadline"
                        value={form.deadline}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-gray-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all"
                      />
                   </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl flex gap-3 mb-6">
                     <div className="p-2 bg-yellow-100 rounded-full text-yellow-600 h-fit"><DollarSign size={16}/></div>
                     <p className="text-xs text-yellow-800 leading-relaxed">
                        Untuk mencegah spam, kamu akan membakar (burn) <strong>{minBurnAmount} $AMAL</strong> saat membuat kampanye ini.
                     </p>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl transition-all ${isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-green-600 hover:shadow-green-200 hover:-translate-y-1'}`}
                  >
                    {isLoading ? "Sedang Memproses..." : (
                      <>
                        Publish Campaign <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>

             </form>
          </div>

          {/* === KOLOM KANAN: LIVE PREVIEW === */}
          <div className="sticky top-32 hidden lg:block">
             <div className="flex items-center gap-2 mb-6 text-gray-400 font-bold text-sm uppercase tracking-wider px-2">
                <Eye size={16} /> Live Preview
             </div>
             
             <div className="relative group">
                <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-700"></div>
                <div className="pointer-events-none select-none transform scale-100 transition">
                  <CampaignCard 
                    id={999}
                    title={form.title || "Judul Kampanye Kamu"}
                    description={form.description || "Deskripsi kampanye akan muncul di sini..."}
                    target={form.target || "1000"}
                    deadline={(form.deadline ? new Date(form.deadline).getTime() : Date.now() + 86400000 * 30) / 1000 / 86400} 
                    amountCollected="0"
                    image={form.image || "https://via.placeholder.com/800x400?text=Preview+Image"}
                  />
                </div>
             </div>
             <div className="mt-8 text-center px-8">
                <p className="text-sm text-gray-400 italic">
                  "Ini adalah tampilan kartu kampanye Anda yang akan dilihat oleh donatur."
                </p>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}