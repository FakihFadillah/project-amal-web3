"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Key, ChevronRight, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState(""); // Bisa Username / Email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- KREDENSIAL RAHASIA (HARDCODED SEMENTARA) ---
  const MOCK_ADMIN = {
    username: "admin",
    email: "admin@amal.com",
    password: "admin" // Password sederhana buat testing
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulasi loading network
    setTimeout(() => {
      // LOGIKA PENGECEKAN:
      // Cek apakah input = username ATAU input = email, DAN password benar
      const isValidUser = identifier === MOCK_ADMIN.username || identifier === MOCK_ADMIN.email;
      const isValidPass = password === MOCK_ADMIN.password;

      if (isValidUser && isValidPass) {
        // Simpan "Kunci" di Session Storage (Hilang kalau browser ditutup)
        sessionStorage.setItem("admin_token", "rahasia_negara_123");
        router.push("/admin"); // Redirect ke Dashboard
      } else {
        setError("Username atau Password salah!");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full p-8 rounded-3xl shadow-xl border border-gray-100 animate-[fadeIn_0.5s_ease-out]">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-black text-gray-900">$AMAL ADMIN</h1>
          <p className="text-gray-500 text-sm">Masuk untuk mengelola platform.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 flex items-center gap-2 text-sm font-bold border border-red-100 animate-pulse">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Username / Email</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input 
                type="text" 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none font-bold text-gray-700 transition"
                placeholder="admin@amal.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Password</label>
            <div className="relative">
              <Key className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none font-bold text-gray-700 transition"
                placeholder="••••••"
                required
              />
            </div>
          </div>

          <button 
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-green-200 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? "Memeriksa..." : (
              <>Masuk Dashboard <ChevronRight size={18} /></>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-xs font-bold text-gray-400 hover:text-green-600 transition">
            &larr; Kembali ke Website Utama
          </Link>
        </div>

      </div>
    </main>
  );
}