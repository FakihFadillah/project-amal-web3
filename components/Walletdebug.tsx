"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount } from "wagmi";

export default function WalletDebug() {
  const { authenticated } = usePrivy();
  const { isConnected, address } = useAccount();

  // Kita hapus useEffect dan mounted check biar langsung render
  
  return (
    <div className="fixed bottom-5 left-5 z-[9999] bg-red-600 text-white p-4 rounded-xl shadow-2xl font-bold border-4 border-yellow-400">
      <p>TESTING DEBUGGER</p>
      <p>Login Privy: {authenticated ? "YES" : "NO"}</p>
      <p>Koneksi Wagmi: {isConnected ? "YES" : "NO"}</p>
      <p>Address: {address || "Kosong"}</p>
    </div>
  );
}