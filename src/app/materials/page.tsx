"use client";

import { useEffect, useState } from "react";

type Material = {
  id: number; name: string; category: string; quantity: number; unit: string;
  unitCost: number | null; totalCost: number | null; status: string;
  vendor: string | null; orderDate: string | null; deliveryDate: string | null; notes: string | null;
};

const STATUSES = ["needed", "ordered", "delivered", "installed"];
const STATUS_COLORS: Record<string, string> = {
  needed: "bg-slate-100 text-slate-600",
  ordered: "bg-blue-100 text-blue-700",
  delivered: "bg-amber-100 text-amber-700",
  installed: "bg-green-100 text-green-700",
};

const blank = { name: "", category: "", quantity: "1", unit: "each", unitCost: "", vendor: "", orderDate: "", deliveryDate: "", notes: "", status: "needed" };

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [form, setForm] = useState(blank);
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await fetch("/api/materials").then((r) => r.json());
    setMaterials(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const qty = parseFloat(form.quantity);
    const cost = form.unitCost ? parseFloat(form.unitCost) : null;
    await fetch("/api/materials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, quantity: qty, unitCost: cost, totalCost: cost != null ? qty * cost : null }),
    });
    setForm(blank);
    setShowForm(false);
    load();
  }

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/materials/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  const filtered = filterStatus === "all" ? materials : materials.filter((m) => m.status === filterStatus);

  if (loading) return <p className="text-slate-400">Loading…</p>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Materials</h2>
          <p className="text-slate-500 text-sm mt-0.5">Track what you need, ordered, and installed</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">+ Add Material</button>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-6">
        {["all", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize
              ${filterStatus === s ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            {s} {s !== "all" && `(${materials.filter((m) => m.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Add form */}
      {showForm && (
        <form onSubmit={save} className="bg-white rounded-xl border border-slate-200 p-5 mb-6 grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">New Material</h3>
          <div className="col-span-2">
            <label className="label">Name</label>
            <input className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. 2×4 Lumber, OSB Sheathing" />
          </div>
          <div>
            <label className="label">Category</label>
            <input className="input" required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Framing, Roofing, Plumbing" />
          </div>
          <div>
            <label className="label">Status</label>
            <select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Quantity</label>
            <input className="input" type="number" step="any" required value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
          </div>
          <div>
            <label className="label">Unit</label>
            <input className="input" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="e.g. each, board-ft, sq-ft" />
          </div>
          <div>
            <label className="label">Unit Cost ($)</label>
            <input className="input" type="number" step="0.01" value={form.unitCost} onChange={(e) => setForm({ ...form, unitCost: e.target.value })} />
          </div>
          <div>
            <label className="label">Vendor</label>
            <input className="input" value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} />
          </div>
          <div>
            <label className="label">Order Date</label>
            <input className="input" type="date" value={form.orderDate} onChange={(e) => setForm({ ...form, orderDate: e.target.value })} />
          </div>
          <div>
            <label className="label">Expected Delivery</label>
            <input className="input" type="date" value={form.deliveryDate} onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })} />
          </div>
          <div className="col-span-2">
            <label className="label">Notes</label>
            <textarea className="input" rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <div className="col-span-2 flex gap-2 justify-end">
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      )}

      {/* Materials list */}
      {filtered.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-12">No materials {filterStatus !== "all" && `with status "${filterStatus}"`} yet.</p>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Category</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Qty</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Cost</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Vendor</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 font-medium">{m.name}</td>
                  <td className="px-4 py-3 text-slate-500">{m.category}</td>
                  <td className="px-4 py-3 text-right">{m.quantity} {m.unit}</td>
                  <td className="px-4 py-3 text-right text-slate-600">
                    {m.totalCost != null ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(m.totalCost) : "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{m.vendor ?? "—"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={m.status}
                      onChange={(e) => updateStatus(m.id, e.target.value)}
                      className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[m.status]}`}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
