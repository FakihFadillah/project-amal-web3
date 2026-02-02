import { createConfig } from '@privy-io/wagmi';
import { http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

// Kita setting jaringannya di sini
export const config = createConfig({
  // Kamu bisa nambahin chain lain nanti (misal: Base, Polygon)
  chains: [sepolia, mainnet], 
  transports: {
    [sepolia.id]: http(), // Jalur HTTP buat Sepolia (Testnet)
    [mainnet.id]: http(), // Jalur HTTP buat Mainnet (Asli)
  },
});