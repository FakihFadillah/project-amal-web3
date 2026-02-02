import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";

// Tipe data disesuaikan dengan DATA_DUMMY di Home
interface CampaignProps {
  id: number;
  judul: string;
  target: string;
  terkumpul: number;
  sisaHari: number;
  backer: number;
  image: string;
  status: string;
}

export default function CampaignCard({ id, judul, target, terkumpul, sisaHari, backer, image }: CampaignProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition group flex flex-col h-full">
      {/* Gambar */}
      <div className="h-56 overflow-hidden relative">
        <img 
          src={image} 
          alt={judul} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-green-700">
           Verified
        </div>
      </div>
      
      {/* Konten */}
      <div className="p-5 flex-1 flex flex-col space-y-4">
        <div className="flex-1">
           <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-tight mb-2">{judul}</h3>
           <p className="text-sm text-gray-500">Target: <span className="font-semibold text-green-600">${target}</span></p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-bold text-gray-500">
             <span>Terkumpul</span>
             <span className="text-green-600">{terkumpul}%</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
             <div className="bg-green-500 h-full rounded-full" style={{ width: `${terkumpul}%` }}></div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-center text-xs font-bold text-gray-400 border-t border-gray-100 pt-4">
           <div className="flex items-center gap-1"><Users size={14}/> {backer} Backers</div>
           <div className="flex items-center gap-1"><Clock size={14}/> {sisaHari} Hari</div>
        </div>

        {/* Tombol */}
        <Link href={`/campaign/${id}`} className="block mt-auto">
          <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-green-600 transition flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-green-200">
             Lihat Detail <ArrowRight size={16}/>
          </button>
        </Link>
      </div>
    </div>
  )
}