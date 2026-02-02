"use client";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { LayoutDashboard, LogIn, PlusCircle, Search } from "lucide-react";

export default function Navbar() {
  const { login, authenticated } = usePrivy();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* 1. LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-200">
            $
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight">$AMAL</span>
        </Link>

        {/* 2. MENU TENGAH (Desktop) */}
        <div className="hidden md:flex items-center gap-8 font-bold text-gray-500 text-sm">
          <Link href="/" className="hover:text-green-600 transition">Beranda</Link>
          <Link href="/explore" className="hover:text-green-600 transition flex items-center gap-2">
             Explore
          </Link>
        </div>

        {/* 3. TOMBOL AKSI (Kanan) */}
        <div className="flex items-center gap-4">
          
          {/* Kalau SUDAH Login -> Tampilkan Tombol Dashboard */}
          {authenticated ? (
            <>
              <Link 
                href="/create" 
                className="hidden md:flex items-center gap-2 text-gray-500 hover:text-green-600 font-bold text-sm transition mr-2"
              >
                <PlusCircle size={18} /> Buat Kampanye
              </Link>
              
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 bg-green-50 text-green-700 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-green-100 transition border border-green-200"
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            </>
          ) : (
            // Kalau BELUM Login -> Tampilkan Tombol Login
            <button 
              onClick={login}
              className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-800 transition shadow-lg"
            >
              <LogIn size={18} /> Masuk
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}