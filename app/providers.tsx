"use client";

import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './config/wagmi'; // Sesuaikan path config kamu
import { ReactNode } from 'react';
// IMPORT BARU
import { CampaignProvider } from '@/context/Campaigncontext'; // Sesuaikan path

const queryClient = new QueryClient();
const PRIVY_APP_ID = "cml0bnhs500c9l70chjnun2k7"; // ID Kamu

const privyConfig = {
    // ... config privy kamu yg lama ...
    loginMethods: ['email', 'wallet'] as const,
    appearance: {
      theme: 'light' as const,
      accentColor: '#16A34A',
    },
    embeddedWallets: {
        createOnLogin: 'users-without-wallets' as const,
    },
};

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider appId={PRIVY_APP_ID} config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          
          {/* PASANG CAMPAIGN PROVIDER DI SINI */}
          <CampaignProvider>
             <div className="min-h-screen flex flex-col">
                {children}
             </div>
          </CampaignProvider>

        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}