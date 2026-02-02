"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { sepolia } from "viem/chains";
import { http } from "wagmi";

// Konfigurasi Chain (Sepolia Testnet)
const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

// ⚠️ PENTING: PASTIKAN APP ID INI SUDAH BENAR (clz...)
const PRIVY_APP_ID = "cml0bnhs500c9l70chjnun2k7"; 

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        appearance: {
          theme: "light",
          accentColor: "#16a34a" as const, // Kode warna hijau
          logo: "https://via.placeholder.com/150",
        },
        loginMethods: ["email", "wallet"],
        // Bagian 'embeddedWallets' yang error tadi SUDAH DIHAPUS.
        // Biar Privy pakai settingan bawaan saja (Lebih aman).
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}