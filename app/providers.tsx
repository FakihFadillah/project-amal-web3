"use client";

import React from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { sepolia } from "viem/chains";
import { http } from "wagmi";

// ✅ GLOBAL CONTEXT (WAJIB)
import { CampaignProvider } from "@/context/Campaigncontext";

// ==================
// WAGMI CONFIG
// ==================
const config = createConfig({
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
const PRIVY_APP_ID = "cml0bnhs500c9l70chjnun2k7"; // 🔒 punyamu

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        appearance: {
          theme: "light",
          accentColor: "#16a34a",
          logo: "https://via.placeholder.com/150",
        },
        loginMethods: ["email", "wallet"],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          {/* 🧠 GLOBAL STATE — AKTIF DI SELURUH APP */}
          <CampaignProvider>
            {children}
          </CampaignProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
