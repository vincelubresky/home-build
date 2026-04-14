export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getStats() {
  const [
    totalExpenses,
    totalAllocated,
    materialCounts,
    milestoneCounts,
    contractorCount,
    loanTotal,
  ] = await Promise.all([
    prisma.expense.aggregate({ _sum: { amount: true } }),
    prisma.budgetCategory.aggregate({ _sum: { allocated: true } }),
    prisma.material.groupBy({ by: ["status"], _count: true }),
    prisma.milestone.groupBy({ by: ["status"], _count: true }),
    prisma.contractor.count({ where: { status: "active" } }),
    prisma.loan.aggregate({ _sum: { totalAmount: true } }),
  ]);

  return {
    spent: totalExpenses._sum.amount ?? 0,
    allocated: totalAllocated._sum.allocated ?? 0,
    materials: materialCounts,
    milestones: milestoneCounts,
    activeContractors: contractorCount,
    loanTotal: loanTotal._sum.totalAmount ?? 0,
  };
}

const sectionCards = [
  { href: "/budget", label: "Budget", icon: "💰", color: "bg-green-50 border-green-200" },
  { href: "/materials", label: "Materials", icon: "🧱", color: "bg-amber-50 border-amber-200" },
  { href: "/timeline", label: "Timeline", icon: "📅", color: "bg-blue-50 border-blue-200" },
  { href: "/contractors", label: "Contractors", icon: "👷", color: "bg-purple-50 border-purple-200" },
  { href: "/loan", label: "Loan & Draws", icon: "🏦", color: "bg-cyan-50 border-cyan-200" },
  { href: "/documents", label: "Plans & Permits", icon: "📄", color: "bg-rose-50 border-rose-200" },
];

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default async function OverviewPage() {
  const stats = await getStats();

  const completedMilestones = stats.milestones.find((m) => m.status === "completed")?._count ?? 0;
  const totalMilestones = stats.milestones.reduce((s, m) => s + m._count, 0);
  const totalMaterials = stats.materials.reduce((s, m) => s + m._count, 0);
  const budgetPct = stats.allocated > 0 ? Math.min((stats.spent / stats.allocated) * 100, 100) : 0;

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-1">Overview</h2>
      <p className="text-slate-500 mb-8">Your home build at a glance</p>

      {/* Key numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Spent" value={fmt(stats.spent)} sub={`of ${fmt(stats.allocated)} budgeted`} />
        <StatCard label="Loan Amount" value={fmt(stats.loanTotal)} sub="total financing" />
        <StatCard label="Active Contractors" value={String(stats.activeContractors)} sub="currently on site" />
        <StatCard label="Milestones" value={`${completedMilestones} / ${totalMilestones}`} sub="completed" />
      </div>

      {/* Budget bar */}
      {stats.allocated > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Budget used</span>
            <span className="text-slate-500">{budgetPct.toFixed(1)}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                budgetPct > 90 ? "bg-red-500" : budgetPct > 70 ? "bg-amber-400" : "bg-green-500"
              }`}
              style={{ width: `${budgetPct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1.5">
            <span>{fmt(stats.spent)} spent</span>
            <span>{fmt(stats.allocated - stats.spent)} remaining</span>
          </div>
        </div>
      )}

      {/* Materials summary */}
      {totalMaterials > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8">
          <p className="font-medium text-sm mb-3">Materials Status</p>
          <div className="flex gap-6 text-sm">
            {stats.materials.map((m) => (
              <div key={m.status} className="text-center">
                <div className="text-xl font-bold">{m._count}</div>
                <div className="text-slate-500 capitalize">{m.status}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section nav cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {sectionCards.map(({ href, label, icon, color }) => (
          <Link
            key={href}
            href={href}
            className={`rounded-xl border p-5 flex items-center gap-4 hover:shadow-md transition-shadow ${color}`}
          >
            <span className="text-3xl">{icon}</span>
            <span className="font-semibold">{label}</span>
          </Link>
        ))}
      </div>

      {totalMilestones === 0 && stats.spent === 0 && (
        <p className="text-center text-slate-400 text-sm mt-10">
          No data yet — click any section above to start adding your build details.
        </p>
      )}
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
    </div>
  );
}
