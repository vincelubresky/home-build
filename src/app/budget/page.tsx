"use client";

import { useEffect, useState } from "react";

type Category = { id: number; name: string; allocated: number; spent: number; notes: string | null };
type Expense = { id: number; description: string; amount: number; date: string; vendor: string | null; categoryId: number };

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function BudgetPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showCatForm, setShowCatForm] = useState(false);
  const [showExpForm, setShowExpForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [catForm, setCatForm] = useState({ name: "", allocated: "", notes: "" });
  const [expForm, setExpForm] = useState({ description: "", amount: "", date: "", vendor: "", categoryId: "" });

  async function load() {
    const [c, e] = await Promise.all([
      fetch("/api/budget/categories").then((r) => r.json()),
      fetch("/api/budget/expenses").then((r) => r.json()),
    ]);
    setCategories(c);
    setExpenses(e);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function addCategory(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/budget/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...catForm, allocated: parseFloat(catForm.allocated) }),
    });
    setCatForm({ name: "", allocated: "", notes: "" });
    setShowCatForm(false);
    load();
  }

  async function addExpense(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/budget/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...expForm, amount: parseFloat(expForm.amount), categoryId: parseInt(expForm.categoryId) }),
    });
    setExpForm({ description: "", amount: "", date: "", vendor: "", categoryId: "" });
    setShowExpForm(false);
    load();
  }

  const totalAllocated = categories.reduce((s, c) => s + c.allocated, 0);
  const totalSpent = categories.reduce((s, c) => s + c.spent, 0);

  if (loading) return <p className="text-slate-400">Loading…</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Budget</h2>
          <p className="text-slate-500 text-sm mt-0.5">Track spending by category</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowCatForm(!showCatForm)} className="btn-secondary">+ Category</button>
          <button onClick={() => setShowExpForm(!showExpForm)} className="btn-primary">+ Expense</button>
        </div>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Total Budget</p>
          <p className="text-xl font-bold text-slate-800">{fmt(totalAllocated)}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Total Spent</p>
          <p className="text-xl font-bold text-red-600">{fmt(totalSpent)}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Remaining</p>
          <p className={`text-xl font-bold ${totalAllocated - totalSpent < 0 ? "text-red-600" : "text-green-600"}`}>
            {fmt(totalAllocated - totalSpent)}
          </p>
        </div>
      </div>

      {/* Add Category form */}
      {showCatForm && (
        <form onSubmit={addCategory} className="bg-white rounded-xl border border-slate-200 p-5 mb-6 grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">New Budget Category</h3>
          <div>
            <label className="label">Category Name</label>
            <input className="input" required value={catForm.name} onChange={(e) => setCatForm({ ...catForm, name: e.target.value })} placeholder="e.g. Framing, Plumbing" />
          </div>
          <div>
            <label className="label">Allocated Amount ($)</label>
            <input className="input" type="number" step="0.01" required value={catForm.allocated} onChange={(e) => setCatForm({ ...catForm, allocated: e.target.value })} placeholder="0.00" />
          </div>
          <div className="col-span-2">
            <label className="label">Notes</label>
            <textarea className="input" rows={2} value={catForm.notes} onChange={(e) => setCatForm({ ...catForm, notes: e.target.value })} />
          </div>
          <div className="col-span-2 flex gap-2 justify-end">
            <button type="button" onClick={() => setShowCatForm(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      )}

      {/* Add Expense form */}
      {showExpForm && (
        <form onSubmit={addExpense} className="bg-white rounded-xl border border-slate-200 p-5 mb-6 grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">New Expense</h3>
          <div className="col-span-2">
            <label className="label">Description</label>
            <input className="input" required value={expForm.description} onChange={(e) => setExpForm({ ...expForm, description: e.target.value })} placeholder="What was purchased?" />
          </div>
          <div>
            <label className="label">Amount ($)</label>
            <input className="input" type="number" step="0.01" required value={expForm.amount} onChange={(e) => setExpForm({ ...expForm, amount: e.target.value })} />
          </div>
          <div>
            <label className="label">Date</label>
            <input className="input" type="date" required value={expForm.date} onChange={(e) => setExpForm({ ...expForm, date: e.target.value })} />
          </div>
          <div>
            <label className="label">Vendor</label>
            <input className="input" value={expForm.vendor} onChange={(e) => setExpForm({ ...expForm, vendor: e.target.value })} placeholder="Store or contractor name" />
          </div>
          <div>
            <label className="label">Category</label>
            <select className="input" required value={expForm.categoryId} onChange={(e) => setExpForm({ ...expForm, categoryId: e.target.value })}>
              <option value="">Select…</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="col-span-2 flex gap-2 justify-end">
            <button type="button" onClick={() => setShowExpForm(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      )}

      {/* Categories table */}
      {categories.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-12">No budget categories yet — add one above.</p>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Category</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Allocated</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Spent</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Remaining</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => {
                const remaining = c.allocated - c.spent;
                return (
                  <tr key={c.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 font-medium">{c.name}</td>
                    <td className="px-4 py-3 text-right">{fmt(c.allocated)}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{fmt(c.spent)}</td>
                    <td className={`px-4 py-3 text-right font-medium ${remaining < 0 ? "text-red-600" : "text-green-600"}`}>
                      {fmt(remaining)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden ml-auto">
                        <div
                          className={`h-full rounded-full ${c.allocated > 0 && c.spent / c.allocated > 0.9 ? "bg-red-400" : "bg-green-400"}`}
                          style={{ width: c.allocated > 0 ? `${Math.min((c.spent / c.allocated) * 100, 100)}%` : "0%" }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Recent expenses */}
      {expenses.length > 0 && (
        <>
          <h3 className="font-semibold mb-3">Recent Expenses</h3>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Description</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Vendor</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Date</th>
                  <th className="text-right px-4 py-3 font-medium text-slate-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.slice(0, 20).map((e) => (
                  <tr key={e.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3">{e.description}</td>
                    <td className="px-4 py-3 text-slate-500">{e.vendor ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-500">{new Date(e.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right font-medium">{fmt(e.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
