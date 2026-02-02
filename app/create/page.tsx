"use client";
import { useState } from "react";
import { useCampaigns } from "@/context/Campaigncontext"; // Import Hook
import { useRouter } from "next/navigation";
import { Upload, DollarSign, Calendar, Type, Image as ImageIcon } from "lucide-react";
import Navbar from "@/components/Navbar"; // Pastikan Navbar diimport jika mau dipakai (opsional)

export default function CreateCampaign() {
  const { addCampaign } = useCampaigns();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "", 
    target: "", 
    duration: "", 
    image: "", 
    description: "", 
    applicant: "User (You)"
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Kirim data ke "Otak Global"
    addCampaign({
      title: formData.title,
      target: formData.target, 
      image: formData.image,
      description: formData.description,
      applicant: formData.applicant,
    });

    // Simulasi delay sedikit biar terasa "memproses"
    setTimeout(() => {
        setIsLoading(false);
        alert("Kampanye Dibuat! Status: PENDING (Menunggu Admin)");
        router.push("/dashboard"); 
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Navbar dihapus disini biar tidak double dengan layout, tapi kalau mau pasang manual boleh */}
      
      <main className="max-w-4xl mx-auto px-6 mt-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Header Form */}
          <div className="bg-green-600 p-8 text-white text-center">
            <h1 className="text-3xl font-black mb-2">Mulai Penggalangan Dana</h1>
            <p className="text-green-100">Ceritakan misimu dan ajak ribuan orang baik berdonasi.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* 1. INFORMASI UTAMA */}
            <section className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                <Type size={18} /> Detail Kampanye
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">Judul Kampanye</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Bantu Renovasi Sekolah..."
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">Durasi (Hari)</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="number" 
                      placeholder="30"
                      className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600">Cerita Lengkap (Deskripsi)</label>
                <textarea 
                  rows={5}
                  placeholder="Ceritakan latar belakang, tujuan, dan rincian penggunaan dana..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                ></textarea>
              </div>
            </section>

            {/* 2. TARGET DONASI */}
            <section className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                <DollarSign size={18} /> Target Donasi
              </h3>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600">Target (USDC)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">$</span>
                  <input 
                    type="number" 
                    placeholder="5000"
                    className="w-full pl-8 p-3 text-lg font-bold border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                    value={formData.target}
                    onChange={(e) => setFormData({...formData, target: e.target.value})}
                    required
                  />
                </div>
              </div>
            </section>

            {/* 3. MEDIA / GAMBAR */}
            <section className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                <ImageIcon size={18} /> Foto Cover
              </h3>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600">URL Gambar</label>
                <input 
                  type="url" 
                  placeholder="https://..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  required
                />
              </div>

              {/* Preview Gambar */}
              <div className="w-full h-64 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = "")} />
                ) : (
                  <div className="text-center text-gray-400">
                    <Upload className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Preview gambar akan muncul di sini</p>
                  </div>
                )}
              </div>
            </section>

            {/* TOMBOL SUBMIT */}
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? "Memproses..." : "🚀 Terbitkan Kampanye"}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}