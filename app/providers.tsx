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

// PENTING: GANTI 'clz...' INI DENGAN APP ID ASLI KAMU DARI DASHBOARD PRIVY
// (Kalau kamu lupa, cek file lama kamu sebelum ditimpa, atau ambil dari dashboard privy.io)
const PRIVY_APP_ID = "cml0bnhs500c9l70chjnun2k7"; 

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        // Bagian ini yang tadi error, sekarang sudah diperbaiki
        appearance: {
          theme: "light",
          accentColor: "#16a34a" as const, // <-- Tambahan 'as const' biar Vercel ga marah
          logo: "https://via.placeholder.com/150",
        },
        loginMethods: ["email", "wallet"],
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
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