"use client";

import React from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { sepolia } from "viem/chains";
import { http } from "wagmi";

// Pastikan import ini sesuai nama file kamu (CampaignContext.tsx)
import { CampaignProvider } from "@/context/Campaigncontext"; 

// ==================
// WAGMI CONFIG
// ==================
const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});

// ==================
// REACT QUERY
// ==================
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// ==================
// PRIVY CONFIG
// ==================
const PRIVY_APP_ID = "cml0bnhs500c9l70chjnun2k7";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      // Kita sederhanakan config-nya biar gak ada yang merah
      config={{
        appearance: {
          theme: "light",
          accentColor: "#16a34a",
          logo: "https://via.placeholder.com/150",
        },
        // Pakai 'as const' biar TypeScript gak rewel
        loginMethods: ["email", "wallet"] as const, 
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <CampaignProvider>
            {children}
          </CampaignProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}