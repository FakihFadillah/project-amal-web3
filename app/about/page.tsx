"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Globe,
  Cpu,
  ArrowRight,
  Terminal,
  Heart,
  Coins,
  Layers,
  Lock,
  Users,
  BadgeCheck,
  CheckCircle2,
  FileText,
  Wallet,
} from "lucide-react";

const features = {
  donor: [
    "Browse all fundraising campaigns",
    "View campaign details & milestones",
    "Donate using USDC",
    "View donation history",
    "View transaction receipts (timestamp + amount)",
    "Claim refund if campaign is canceled",
  ],
  fundraiser: [
    "Create fundraising campaigns",
    "Upload project details, story, and target funding",
    "Define milestone disbursement plan",
    "Submit milestone evidence (photo/documents)",
    "Track fundraising performance",
    "Request disbursement transparently",
    "Campaign lifecycle status: Draft, Pending, Ongoing, Closed, Rejected, Canceled",
  ],
  admin: [
    "Approve / reject fundraising campaigns",
    "Review milestone submissions",
    "Approve milestone-based fund release",
    "Manage users and campaign activities",
    "Suspend suspicious users/wallets",
    "Maintain audit logs and history",
  ],
};

const steps = [
  {
    title: "Browse Campaigns",
    desc: "Users can explore verified fundraising campaigns.",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    title: "Donate Using USDC",
    desc: "Donations use USDC for stable value and no crypto volatility.",
    icon: <Wallet className="w-6 h-6" />,
  },
  {
    title: "Funds Locked in Escrow",
    desc: "Funds are stored safely in escrow smart contracts.",
    icon: <Lock className="w-6 h-6" />,
  },
  {
    title: "Milestone Disbursement",
    desc: "Fundraisers receive funds gradually after milestone approval.",
    icon: <BadgeCheck className="w-6 h-6" />,
  },
];

const faq = [
  {
    q: "Is $AMAL safe?",
    a: "Yes. Donations are stored in escrow smart contracts and recorded on-chain.",
  },
  {
    q: "Can I track my donation?",
    a: "Absolutely. Users can view receipts, timestamps, and campaign progress.",
  },
  {
    q: "What happens if a campaign is canceled?",
    a: "Users can claim their contribution back directly to their wallet address.",
  },
  {
    q: "Why use USDC?",
    a: "USDC ensures stable donation value without price fluctuation.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-white text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Background Grid (lightweight) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[linear-gradient(to_right,#0000000d_1px,transparent_1px),linear-gradient(to_bottom,#0000000d_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Soft Glow (safe blur, still looks premium) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-80px] right-[-80px] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-emerald-200/70 to-transparent blur-[80px]" />
        <div className="absolute bottom-[-120px] left-[-120px] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-sky-200/60 to-transparent blur-[90px]" />
      </div>

      <main className="relative z-10 pt-28 md:pt-36 pb-24 px-6 max-w-7xl mx-auto">
        {/* HERO */}
        <section className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-200 bg-white/70 backdrop-blur-sm text-sm font-medium text-emerald-700 shadow-sm">
            <Heart className="w-4 h-4" />
            ABOUT $AMAL
          </div>

          <h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tight leading-tight text-gray-900">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-lime-500">
              $AMAL
            </span>
          </h1>

          <p className="mt-5 text-lg md:text-xl text-gray-600 leading-relaxed">
            A decentralized crowdfunding platform built for transparency, trust,
            and global impact.
          </p>

          <p className="mt-6 text-base md:text-lg text-gray-700 leading-relaxed">
            <span className="font-semibold">$AMAL</span> is a Web3-based donation
            platform inspired by Kitabisa, designed to make fundraising
            transparent, secure, and verifiable. Every donation is stored in
            smart contracts, ensuring funds are tracked and disbursed fairly
            based on approved milestones.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explore"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition"
            >
              Explore Campaigns <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-800 font-semibold hover:border-emerald-300 hover:text-emerald-700 transition"
            >
              How It Works
            </a>
          </div>
        </section>

        {/* OUR MISSION */}
        <section className="mt-28 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center">
            Our Mission
          </h2>

          <p className="mt-6 text-lg text-gray-700 leading-relaxed text-center">
            We believe that giving should not rely solely on trust — it should be
            supported by technology. <span className="font-semibold">$AMAL</span>{" "}
            exists to empower donors and fundraisers by providing a system where
            every transaction is auditable, transparent, and immutable.
          </p>
        </section>

        {/* WHY BUILT */}
        <section className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center">
            Why We Built <span className="text-emerald-600">$AMAL</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-md p-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100">
                  <FileText className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Problems in Traditional Donation
                </h3>
              </div>

              <ul className="mt-6 space-y-3 text-gray-700 text-base">
                <li>• Donasi tradisional sering kurang transparan</li>
                <li>• Donatur tidak bisa memantau dana dengan jelas</li>
                <li>• Dana kadang lama sampai ke penerima</li>
                <li>• Banyak kasus fraud atau campaign palsu</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-green-500 text-white shadow-xl p-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white/15 border border-white/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Solution with $AMAL</h3>
              </div>

              <p className="mt-6 text-base leading-relaxed text-white/90">
                Traditional fundraising platforms often depend on centralized
                trust. With <span className="font-semibold">$AMAL</span>, we
                introduce a decentralized escrow mechanism where donations are
                stored safely in smart contracts, not in personal bank accounts.
              </p>

              <p className="mt-4 font-semibold text-white">
                100% Transparent. 100% Trackable.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="mt-28 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center">
            How <span className="text-emerald-600">$AMAL</span> Works
          </h2>

          <p className="mt-5 text-lg text-gray-600 text-center max-w-3xl mx-auto">
            A milestone-based escrow system that ensures donations are used
            responsibly and released only when evidence is verified.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                    {step.icon}
                  </div>
                  <span className="text-sm font-bold text-gray-400">
                    Step {i + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TRANSPARENCY */}
        <section className="mt-28 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">
            Transparency You Can Verify
          </h2>

          <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Every donation is recorded on-chain. Users can verify campaign
            progress, milestone approvals, and transaction receipts directly
            through blockchain records.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "100% auditable fund flow",
              "Immutable record (cannot be edited)",
              "Trackable receipts & history",
              "Funds never stored in personal accounts",
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-md p-6 flex flex-col items-center text-center"
              >
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                <p className="mt-4 text-sm font-semibold text-gray-800">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="mt-28 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center">
            Platform Features
          </h2>

          <p className="mt-5 text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Built for donors, fundraisers, and admins with clear roles and
            secure workflows.
          </p>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* DONOR */}
            <div className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-md p-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100">
                  <Users className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900">
                  Donor Features
                </h3>
              </div>

              <ul className="mt-6 space-y-3 text-gray-700 text-sm leading-relaxed">
                {features.donor.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </div>

            {/* FUNDRAISER */}
            <div className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-md p-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <Heart className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900">
                  Fundraiser Features
                </h3>
              </div>

              <ul className="mt-6 space-y-3 text-gray-700 text-sm leading-relaxed">
                {features.fundraiser.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </div>

            {/* ADMIN */}
            <div className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-md p-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100">
                  <ShieldCheck className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900">
                  Admin Features
                </h3>
              </div>

              <ul className="mt-6 space-y-3 text-gray-700 text-sm leading-relaxed">
                {features.admin.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* TOKEN UTILITY */}
        <section className="mt-28 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">
            $AMAL Token Utility
          </h2>

          <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            The <span className="font-semibold">$AMAL</span> token powers the
            ecosystem and enables sustainable platform growth. Users may be
            required to burn or stake $AMAL to create fundraising campaigns,
            ensuring spam prevention and quality control.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Campaign Creation",
                desc: "Burn mechanism to prevent spam campaigns.",
                icon: <Coins className="w-6 h-6" />,
              },
              {
                title: "Staking",
                desc: "Stake $AMAL for platform participation.",
                icon: <Layers className="w-6 h-6" />,
              },
              {
                title: "Governance Utility",
                desc: "Supports future ecosystem governance.",
                icon: <Cpu className="w-6 h-6" />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-md p-7"
              >
                <div className="mx-auto w-fit p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                  {item.icon}
                </div>
                <h3 className="mt-5 text-lg font-black text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TECH STACK */}
        <section className="mt-28 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center">
            Technology Stack & Architecture
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Mobile App", value: "React Native (iOS & Android)" },
              { label: "Admin Dashboard", value: "Next.js" },
              { label: "Backend API", value: "ElysiaJS" },
              { label: "Smart Contracts", value: "Solidity (EVM compatible)" },
              { label: "Wallet & Auth", value: "Privy / Clerk (Embedded Wallet)" },
              { label: "Token Standard", value: "ERC-20" },
              { label: "Stablecoin", value: "USDC" },
              { label: "Storage", value: "IPFS / Cloud Storage" },
              { label: "Indexing", value: "Event Listener / The Graph" },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-md p-6 flex items-start gap-4"
              >
                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
                  <Terminal className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">
                    {item.label}
                  </p>
                  <p className="text-base font-bold text-gray-900">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COMMITMENT */}
        <section className="mt-28 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">
            Our Commitment
          </h2>

          <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            We are committed to building a fundraising platform that prioritizes
            transparency, accountability, and fairness. Every smart contract
            will be audited before deployment on mainnet to ensure maximum
            security for donors and fundraisers.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-28 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center">
            FAQ
          </h2>

          <div className="mt-12 space-y-4">
            {faq.map((item, i) => (
              <div
                key={i}
                className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-md p-6"
              >
                <h3 className="font-bold text-gray-900 text-lg">{item.q}</h3>
                <p className="mt-2 text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-28 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Be Part of the Future of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-lime-500">
              Giving
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            Join <span className="font-semibold">$AMAL</span> today and experience
            a new way of donating — transparent, secure, and borderless.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition"
            >
              Start Donating <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/create"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-900 font-semibold hover:border-emerald-300 hover:text-emerald-700 transition"
            >
              Create Campaign
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
