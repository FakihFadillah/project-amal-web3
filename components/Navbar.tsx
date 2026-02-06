"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { LayoutDashboard, LogIn, LogOut, Menu, X, AlertCircle } from "lucide-react"; // Nambah icon AlertCircle
import { useState, useEffect } from "react";

export default function Navbar() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State baru untuk popup konfirmasi logout
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Efek biar navbar mengecil/berubah warna pas di-scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi Logout Final
  const handleLogout = async () => {
    await logout();
    setShowLogoutConfirm(false); // Tutup modal setelah logout
  };

  const navLinks = [
    { name: "Explore", href: "/explore" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      {/* === NAVBAR UTAMA === */}
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled 
          ? "w-[90%] md:w-[70%] bg-white/80 backdrop-blur-md shadow-lg border border-white/40 py-3" 
          : "w-[95%] md:w-[85%] bg-white/40 backdrop-blur-sm border border-transparent py-4"
        } rounded-full px-6 flex items-center justify-between`}
      >
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-black text-sm group-hover:scale-110 transition shadow-green-200 shadow-lg">
            $
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-900 group-hover:text-green-700 transition">
            AMAL
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-1 bg-white/50 p-1 rounded-full border border-white/50 backdrop-blur-sm shadow-inner">
          <Link 
             href="/" 
             className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${pathname === "/" ? "bg-white text-green-700 shadow-sm font-bold" : "text-gray-500 hover:text-green-600"}`}
          >
            Beranda
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${pathname === link.href ? "bg-white text-green-700 shadow-sm font-bold" : "text-gray-500 hover:text-green-600"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          {ready && authenticated ? (
            <div className="flex items-center gap-2">
              <Link 
                href="/dashboard" 
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-xs font-bold hover:bg-gray-800 transition shadow-md"
              >
                <LayoutDashboard size={14} /> Dashboard
              </Link>
              
              {/* Tombol Logout (Memicu Modal Konfirmasi) */}
              <button 
                onClick={() => setShowLogoutConfirm(true)} // <--- UBAH DI SINI
                className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition border border-red-100 hover:scale-105 active:scale-95"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 transition-all transform hover:-translate-y-0.5"
            >
              Login <LogIn size={14} />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-600">
             {mobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
      </nav>

      {/* === MODAL KONFIRMASI LOGOUT (MODERN STYLE) === */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* 1. Backdrop Blur (Klik luar untuk batal) */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setShowLogoutConfirm(false)}
          />

          {/* 2. Modal Box */}
          <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm scale-100 animate-in fade-in zoom-in-95 duration-200 border border-white/20 ring-1 ring-black/5">
            <div className="flex flex-col items-center text-center gap-4">
              
              {/* Icon Peringatan */}
              <div className="p-4 bg-red-50 text-red-500 rounded-full border border-red-100 shadow-sm">
                <LogOut size={28} strokeWidth={2.5} />
              </div>

              {/* Teks */}
              <div className="space-y-2">
                <h3 className="text-xl font-black text-gray-900 tracking-tight">
                  Sign Out?
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed px-4">
                  Apakah Anda yakin ingin memutuskan koneksi dompet Anda dari sesi ini?
                </p>
              </div>

              {/* Tombol Aksi */}
              <div className="flex gap-3 w-full mt-4">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 px-4 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 shadow-lg shadow-red-200 transition-all hover:translate-y-[-1px]"
                >
                  Ya, Logout
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* === MOBILE MENU OVERLAY === */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in slide-in-from-bottom-10">
           {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-bold text-gray-800 hover:text-green-600"
            >
              {link.name}
            </Link>
           ))}
           <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800 hover:text-green-600">Dashboard</Link>
        </div>
      )}
    </>
  );
}