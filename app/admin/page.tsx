"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Shield,
  LayoutDashboard,
  CheckCircle2,
  XCircle,
  FileText,
  ExternalLink,
  Wallet,
  Activity,
  AlertTriangle,
  Users,
  Lock,
  Unlock,
  Search,
  Filter,
  ArrowUpRight,
  Clock,
  ClipboardList,
} from "lucide-react";

type TabKey = "overview" | "campaigns" | "milestones" | "users" | "audit";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [search, setSearch] = useState("");

  // -----------------------------
  // DUMMY DATA (Simulasi Blockchain / Indexer)
  // -----------------------------
  const [pendingCampaigns, setPendingCampaigns] = useState([
    {
      id: 101,
      title: "Pembangunan Jembatan Desa Sukamaju",
      applicant: "0x71C...9A21",
      target: "5,000 USDC",
      date: "2026-02-04",
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1513828583688-6330539f8d19?auto=format&fit=crop&q=80&w=400",
      description:
        "Jembatan penghubung antar desa putus akibat longsor. Dibutuhkan pembangunan ulang agar akses ekonomi kembali lancar.",
    },
    {
      id: 102,
      title: "Beasiswa Anak Yatim Cyber",
      applicant: "0x3dA...bB12",
      target: "2,000 USDC",
      date: "2026-02-05",
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1427504746696-ea77b49e6589?auto=format&fit=crop&q=80&w=400",
      description:
        "Program pelatihan coding dan digital literacy untuk anak panti asuhan agar punya skill masa depan.",
    },
  ]);

  const [milestoneRequests, setMilestoneRequests] = useState([
    {
      id: 55,
      campaignTitle: "Bantuan Banjir Demak",
      milestone: "Milestone #1 — Pembelian Logistik",
      amount: "1,000 USDC",
      requester: "0xUserA...91D",
      proof: "https://via.placeholder.com/900x600?text=Proof+Logistics+Receipt",
      submittedAt: "2026-02-05 13:10",
      risk: "Low",
    },
    {
      id: 56,
      campaignTitle: "Renovasi Sekolah Dasar 01",
      milestone: "Milestone #2 — Upah Tukang",
      amount: "500 USDC",
      requester: "0xUserB...44A",
      proof: "https://via.placeholder.com/900x600?text=Proof+Progress+Photo",
      submittedAt: "2026-02-05 18:40",
      risk: "Medium",
    },
  ]);

  const [auditLogs] = useState([
    {
      id: 1,
      action: "Campaign Approved",
      actor: "0xAdmin...001",
      ref: "Campaign #88",
      time: "2026-02-05 09:15",
      status: "Success",
    },
    {
      id: 2,
      action: "Milestone Released",
      actor: "0xAdmin...001",
      ref: "Milestone #12",
      time: "2026-02-05 10:20",
      status: "Success",
    },
    {
      id: 3,
      action: "User Suspended",
      actor: "0xAdmin...001",
      ref: "0xSuspicious...A1F",
      time: "2026-02-05 12:02",
      status: "Warning",
    },
  ]);

  const filteredCampaigns = useMemo(() => {
    return pendingCampaigns.filter((c) =>
      (c.title + c.applicant + c.description)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [pendingCampaigns, search]);

  const filteredMilestones = useMemo(() => {
    return milestoneRequests.filter((m) =>
      (m.campaignTitle + m.milestone + m.requester)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [milestoneRequests, search]);

  // -----------------------------
  // ACTIONS (Simulasi)
  // -----------------------------
  const approveCampaign = (id: number) => {
    if (confirm("Approve campaign ini ke Smart Contract?")) {
      setPendingCampaigns((prev) => prev.filter((c) => c.id !== id));
      alert("Campaign Approved ✅");
    }
  };

  const rejectCampaign = (id: number) => {
    if (confirm("Reject campaign ini?")) {
      setPendingCampaigns((prev) => prev.filter((c) => c.id !== id));
      alert("Campaign Rejected ❌");
    }
  };

  const approveMilestone = (id: number) => {
    if (confirm("Approve bukti milestone dan release fund?")) {
      setMilestoneRequests((prev) => prev.filter((m) => m.id !== id));
      alert("Funds Released 💸");
    }
  };

  const rejectMilestone = (id: number) => {
    if (confirm("Reject milestone request dan tahan dana?")) {
      setMilestoneRequests((prev) => prev.filter((m) => m.id !== id));
      alert("Milestone Rejected 🔒");
    }
  };

  // -----------------------------
  // UI Helpers
  // -----------------------------
  const TabButton = ({
    tab,
    icon,
    label,
    badge,
  }: {
    tab: TabKey;
    icon: React.ReactNode;
    label: string;
    badge?: number;
  }) => {
    const isActive = activeTab === tab;
    return (
      <button
        onClick={() => setActiveTab(tab)}
        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border transition text-sm font-semibold
        ${
          isActive
            ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
            : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
        }`}
      >
        <span className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </span>

        {typeof badge === "number" && (
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-bold
            ${
              isActive
                ? "bg-cyan-400 text-black"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            {badge}
          </span>
        )}
      </button>
    );
  };

  return (
    // ✅ FIX 1: Tambah 'pt-24 md:pt-28' supaya konten turun ke bawah (tidak ketabrak navbar)
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-400 selection:text-black pt-24 md:pt-28">
      {/* Subtle background grid (lebih halus biar gak berat) */}
      <div className="fixed inset-0 opacity-[0.12] pointer-events-none bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* HEADER */}
      {/* ✅ FIX 2: Ganti 'top-0' jadi 'top-20 md:top-24' supaya pas scroll dia nempel DI BAWAH navbar utama */}
      <header className="sticky top-20 md:top-24 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 transition-all">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center">
              <Shield className="text-cyan-300" size={20} />
            </div>

            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">
                $AMAL Governance Console
              </p>
              <h1 className="text-lg md:text-xl font-black tracking-tight">
                Admin Dashboard
              </h1>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 text-right">
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">
                Network
              </p>
              <p className="text-green-400 font-mono font-bold flex items-center gap-2 justify-end">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Online (Sepolia)
              </p>
            </div>

            <div className="h-10 w-px bg-slate-800" />

            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">
                Pending Tasks
              </p>
              <p className="text-white font-mono font-bold">
                {pendingCampaigns.length + milestoneRequests.length}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 py-10 relative z-10">
        {/* TOP STATS */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <StatCard
            icon={<Activity size={20} className="text-cyan-300" />}
            title="Total Campaigns"
            value="124"
            sub="All campaigns tracked"
          />
          <StatCard
            icon={<Wallet size={20} className="text-purple-300" />}
            title="TVL Locked"
            value="$45.2K"
            sub="Funds in escrow"
          />
          <StatCard
            icon={<AlertTriangle size={20} className="text-orange-300" />}
            title="Pending Review"
            value={pendingCampaigns.length.toString()}
            sub="Awaiting approval"
          />
          <StatCard
            icon={<ClipboardList size={20} className="text-green-300" />}
            title="Milestone Requests"
            value={milestoneRequests.length.toString()}
            sub="Awaiting release"
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* SIDEBAR */}
          <aside className="lg:col-span-3 space-y-3">
            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-4">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mb-3">
                Admin Menu
              </p>

              <div className="space-y-2">
                <TabButton
                  tab="overview"
                  icon={<LayoutDashboard size={16} />}
                  label="Overview"
                />
                <TabButton
                  tab="campaigns"
                  icon={<CheckCircle2 size={16} />}
                  label="Campaign Approvals"
                  badge={pendingCampaigns.length}
                />
                <TabButton
                  tab="milestones"
                  icon={<Unlock size={16} />}
                  label="Milestone Disbursement"
                  badge={milestoneRequests.length}
                />
                <TabButton
                  tab="users"
                  icon={<Users size={16} />}
                  label="User Control"
                />
                <TabButton
                  tab="audit"
                  icon={<FileText size={16} />}
                  label="Audit Logs"
                />
              </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mb-3">
                Quick Actions
              </p>

              <div className="space-y-3">
                <ActionButton
                  label="Open Smart Contract Explorer"
                  icon={<ArrowUpRight size={16} />}
                />
                <ActionButton
                  label="View Pending Escrow Balance"
                  icon={<Wallet size={16} />}
                />
                <ActionButton
                  label="Review Suspicious Wallets"
                  icon={<AlertTriangle size={16} />}
                />
              </div>
            </div>
          </aside>

          {/* CONTENT */}
          <section className="lg:col-span-9">
            {/* Search bar */}
            <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between mb-6">
              <div className="flex items-center gap-2 bg-slate-900/70 border border-slate-800 rounded-2xl px-4 py-3 w-full">
                <Search size={16} className="text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search campaigns, wallets, milestones..."
                  className="bg-transparent outline-none text-sm text-white w-full placeholder:text-slate-500"
                />
              </div>

              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-900/70 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition text-sm font-bold">
                <Filter size={16} />
                Filter
              </button>
            </div>

            {/* TABS CONTENT */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6">
                  <h2 className="text-xl font-black mb-2">
                    Governance Overview
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    This dashboard is designed to manage campaign approvals and
                    milestone-based disbursement based on smart contract escrow.
                    All approvals should be validated carefully to prevent fraud
                    and maintain trust.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <MiniInfo
                      title="Campaign Lifecycle"
                      value="Draft → Pending → Ongoing → Closed"
                      icon={<Clock size={16} className="text-cyan-300" />}
                    />
                    <MiniInfo
                      title="Escrow Mechanism"
                      value="Funds locked until milestone approved"
                      icon={<Lock size={16} className="text-purple-300" />}
                    />
                    <MiniInfo
                      title="Audit Logs"
                      value="All actions tracked & recorded"
                      icon={<FileText size={16} className="text-green-300" />}
                    />
                  </div>
                </div>

                <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6">
                  <h3 className="text-lg font-black mb-4">Recent Audit Logs</h3>

                  <div className="space-y-3">
                    {auditLogs.slice(0, 3).map((log) => (
                      <div
                        key={log.id}
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border border-slate-800 rounded-2xl p-4 bg-slate-950/40"
                      >
                        <div>
                          <p className="text-white font-bold">{log.action}</p>
                          <p className="text-xs text-slate-400 font-mono">
                            {log.ref} • by {log.actor}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-500 font-mono">
                            {log.time}
                          </span>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold border
                            ${
                              log.status === "Success"
                                ? "bg-green-500/10 border-green-500/20 text-green-300"
                                : "bg-orange-500/10 border-orange-500/20 text-orange-300"
                            }`}
                          >
                            {log.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CAMPAIGN APPROVAL */}
            {activeTab === "campaigns" && (
              <div className="space-y-4">
                <h2 className="text-xl font-black mb-1">Campaign Approvals</h2>
                <p className="text-slate-400 text-sm mb-6">
                  Review campaign details before allowing them into the smart
                  contract system.
                </p>

                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 flex flex-col md:flex-row gap-5 hover:border-cyan-500/30 transition"
                    >
                      <div className="w-full md:w-40 h-32 rounded-2xl bg-slate-800 shrink-0">
                        <img
                          src={campaign.image}
                          alt="Campaign"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 rounded-full text-[11px] font-bold bg-orange-500/10 border border-orange-500/20 text-orange-300">
                            Pending Review
                          </span>
                          <span className="text-xs text-slate-500 font-mono">
                            {campaign.date}
                          </span>
                        </div>

                        <h3 className="text-lg md:text-xl font-black mb-1">
                          {campaign.title}
                        </h3>

                        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                          {campaign.description}
                        </p>

                        <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-xs font-mono text-slate-300">
                          <span className="flex items-center gap-2">
                            <Wallet size={14} className="text-slate-400" />
                            {campaign.applicant}
                          </span>
                          <span className="flex items-center gap-2">
                            <Activity size={14} className="text-slate-400" />
                            Target: {campaign.target}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
                        <button
                          onClick={() => approveCampaign(campaign.id)}
                          className="flex-1 px-5 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 transition font-bold text-sm flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 size={16} />
                          Approve
                        </button>

                        <button
                          onClick={() => rejectCampaign(campaign.id)}
                          className="flex-1 px-5 py-3 rounded-2xl bg-slate-950 border border-slate-700 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-300 transition font-bold text-sm flex items-center justify-center gap-2 text-slate-300"
                        >
                          <XCircle size={16} />
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    title="No pending campaigns"
                    desc="All campaigns are already reviewed."
                    icon={<Shield size={38} className="opacity-60" />}
                  />
                )}
              </div>
            )}

            {/* MILESTONE DISBURSEMENT */}
            {activeTab === "milestones" && (
              <div className="space-y-4">
                <h2 className="text-xl font-black mb-1">
                  Milestone Disbursement
                </h2>
                <p className="text-slate-400 text-sm mb-6">
                  Approve milestone evidence before releasing escrow funds.
                </p>

                {filteredMilestones.length > 0 ? (
                  filteredMilestones.map((req) => (
                    <div
                      key={req.id}
                      className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 hover:border-purple-500/30 transition"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.15em]">
                            {req.campaignTitle}
                          </p>
                          <h3 className="text-lg font-black text-white">
                            {req.milestone}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-xs font-bold">
                            {req.amount}
                          </span>

                          <span
                            className={`px-3 py-1 rounded-full border text-xs font-bold
                            ${
                              req.risk === "Low"
                                ? "bg-green-500/10 border-green-500/20 text-green-300"
                                : "bg-orange-500/10 border-orange-500/20 text-orange-300"
                            }`}
                          >
                            Risk: {req.risk}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <p className="text-xs text-slate-400 font-mono">
                          Requested by:{" "}
                          <span className="text-slate-200 font-bold">
                            {req.requester}
                          </span>
                          <span className="text-slate-600"> • </span>
                          Submitted: {req.submittedAt}
                        </p>

                        <a
                          href={req.proof}
                          target="_blank"
                          className="inline-flex items-center gap-2 text-sm font-bold text-slate-200 hover:text-white transition underline decoration-slate-600 hover:decoration-white"
                        >
                          <FileText size={14} />
                          View Proof
                          <ExternalLink size={12} />
                        </a>
                      </div>

                      <div className="mt-5 flex flex-col md:flex-row gap-3">
                        <button
                          onClick={() => approveMilestone(req.id)}
                          className="flex-1 px-5 py-3 rounded-2xl bg-green-600 hover:bg-green-500 transition font-bold text-sm flex items-center justify-center gap-2"
                        >
                          <Unlock size={16} />
                          Approve & Release
                        </button>

                        <button
                          onClick={() => rejectMilestone(req.id)}
                          className="flex-1 px-5 py-3 rounded-2xl bg-slate-950 border border-slate-700 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-300 transition font-bold text-sm flex items-center justify-center gap-2 text-slate-300"
                        >
                          <Lock size={16} />
                          Reject & Hold
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    title="No milestone requests"
                    desc="No disbursement requests are waiting."
                    icon={<Wallet size={38} className="opacity-60" />}
                  />
                )}
              </div>
            )}

            {/* USERS */}
            {activeTab === "users" && (
              <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6">
                <h2 className="text-xl font-black mb-2">User Control</h2>
                <p className="text-slate-400 text-sm mb-6">
                  Admin can suspend suspicious wallets and monitor activities.
                </p>

                <div className="space-y-3">
                  <div className="border border-slate-800 rounded-2xl p-4 bg-slate-950/40 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="font-bold text-white">Suspicious Wallet</p>
                      <p className="text-xs text-slate-400 font-mono">
                        0xSuspicious...A1F
                      </p>
                    </div>

                    <button className="px-5 py-2 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 font-bold hover:bg-red-500/20 transition text-sm">
                      Suspend Wallet
                    </button>
                  </div>

                  <div className="border border-slate-800 rounded-2xl p-4 bg-slate-950/40 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="font-bold text-white">Verified Wallet</p>
                      <p className="text-xs text-slate-400 font-mono">
                        0xVerified...88C
                      </p>
                    </div>

                    <button className="px-5 py-2 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-300 font-bold hover:bg-green-500/20 transition text-sm">
                      Mark as Safe
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* AUDIT LOGS */}
            {activeTab === "audit" && (
              <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6">
                <h2 className="text-xl font-black mb-2">Audit Logs</h2>
                <p className="text-slate-400 text-sm mb-6">
                  Track all governance actions for transparency.
                </p>

                <div className="space-y-3">
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="border border-slate-800 rounded-2xl p-4 bg-slate-950/40 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                    >
                      <div>
                        <p className="font-bold text-white">{log.action}</p>
                        <p className="text-xs text-slate-400 font-mono">
                          {log.ref} • {log.actor}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 font-mono">
                          {log.time}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full border text-xs font-bold
                          ${
                            log.status === "Success"
                              ? "bg-green-500/10 border-green-500/20 text-green-300"
                              : "bg-orange-500/10 border-orange-500/20 text-orange-300"
                          }`}
                        >
                          {log.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}

/* -----------------------------
   Components (Lightweight)
------------------------------ */

function StatCard({
  icon,
  title,
  value,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 relative">
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5 blur-2xl pointer-events-none"
        aria-hidden="true"
      />
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
          {icon}
        </div>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">
          {title}
        </p>
      </div>
      <h3 className="text-3xl font-black">{value}</h3>
      <p className="text-sm text-slate-500 mt-1">{sub}</p>
    </div>
  );
}


function ActionButton({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition text-sm font-bold text-slate-200 hover:text-white">
      <span>{label}</span>
      <span className="text-slate-400">{icon}</span>
    </button>
  );
}

function MiniInfo({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-4">
      <div className="flex items-center gap-2 text-slate-300 mb-2">
        {icon}
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
          {title}
        </p>
      </div>
      <p className="text-sm font-semibold text-white leading-relaxed">
        {value}
      </p>
    </div>
  );
}

function EmptyState({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="border border-dashed border-slate-800 rounded-3xl p-12 text-center text-slate-500 bg-slate-900/30">
      <div className="mx-auto mb-4 w-16 h-16 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-black text-white mb-2">{title}</h3>
      <p className="text-sm">{desc}</p>
    </div>
  );
}