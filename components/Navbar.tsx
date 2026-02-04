"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { LayoutDashboard, LogIn, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Efek biar navbar mengecil/berubah warna pas di-scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Explore", href: "/explore" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      {/* NAVBAR UTAMA (FLOATING ISLAND STYLE) 
        - fixed top-6: Melayang 24px dari atas (biar modern)
        - rounded-full: Bentuk kapsul
      */}
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
              <button 
                onClick={logout}
                className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition border border-red-100"
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

      {/* MOBILE MENU OVERLAY */}
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