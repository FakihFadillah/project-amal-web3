"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";

export default function DonateButton() {
  const { login, authenticated } = usePrivy();
  
  // Hook dari Wagmi untuk kirim uang
  const { data: hash, sendTransaction, isPending } = useSendTransaction();
  
  // Hook untuk cek status transaksi (Sukses/Gagal)
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleDonate = async () => {
    if (!authenticated) {
      login(); // Kalau belum login, suruh login dulu
      return;
    }

    // KIRIM UANG DUMMY (0.0001 ETH)
    sendTransaction({
      to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // Alamat Vitalik (Contoh tujuan)
      value: parseEther('0.0001'), // Nominal donasi
    });
  };

  return (
    <div className="w-full">
      <button
        onClick={handleDonate}
        disabled={isPending || isConfirming}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Membuka Wallet..." : 
         isConfirming ? "Memproses Transaksi..." : 
         isSuccess ? "Donasi Berhasil! 🎉" : 
         "Donasi Sekarang (Test)"}
      </button>

      {/* Tampilkan Link Etherscan kalau sukses */}
      {hash && (
        <div className="mt-2 text-center text-xs text-gray-500">
          Tx Hash: <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank" className="text-blue-500 underline">Lihat di Blockchain</a>
        </div>
      )}
    </div>
  );
}