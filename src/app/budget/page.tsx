"use client";

import { useEffect, useState } from "react";

type LineItem = { id: number; description: string; amount: number; notes: string | null };
type Category = {
  id: number; name: string; allocated: number; spent: number; notes: string | null;
  lineItems: LineItem[];
};
type Expense = { id: number; description: string; amount: number; date: string; vendor: string | null; categoryId: number };

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function LineItemsPanel({ cat, onRefresh }: { cat: Category; onRefresh: () => void }) {
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ description: "", amount: "", notes: "" });
  const [editForm, setEditForm] = useState({ description: "", amount: "", notes: "" });

  const lineTotal = cat.lineItems.reduce((s, l) => s + l.amount, 0);
  const diff = cat.allocated - lineTotal;

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/budget/line-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryId: cat.id, description: form.description, amount: parseFloat(form.amount), notes: form.notes || null }),
    });
    setForm({ description: "", amount: "", notes: "" });
    setAdding(false);
    onRefresh();
  }

  async function saveEdit(id: number) {
    await fetch(`/api/budget/line-items/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: editForm.description, amount: parseFloat(editForm.amount), notes: editForm.notes || null }),
    });
    setEditId(null);
    onRefresh();
  }

  async function deleteItem(id: number) {
    await fetch(`/api/budget/line-items/${id}`, { method: "DELETE" });
    onRefresh();
  }

  function startEdit(item: LineItem) {
    setEditId(item.id);
    setEditForm({ description: item.description, amount: String(item.amount), notes: item.notes ?? "" });
  }

  return (
    <tr>
      <td colSpan={5} className="px-0 pb-2">
        <div className="mx-4 mb-2 bg-slate-50 rounded-lg border border-slate-200 text-sm">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Cost Breakdown</span>
            <div className="flex items-center gap-3">
              {cat.lineItems.length > 0 && (
                <span className={`text-xs font-medium ${Math.abs(diff) < 100 ? "text-green-600" : diff > 0 ? "text-amber-600" : "text-red-600"}`}>
                  {Math.abs(diff) < 100
                    ? "Breakdown matches budget"
                    : diff > 0
                    ? `${fmt(diff)} unaccounted in breakdown`
                    : `Breakdown exceeds budget by ${fmt(-diff)}`}
                </span>
              )}
              <button onClick={() => setAdding(!adding)} className="text-xs text-slate-500 hover:text-slate-800 underline">
                + Add item
              </button>
            </div>
          </div>

          {/* Add form */}
          {adding && (
            <form onSubmit={addItem} className="flex items-end gap-2 px-4 py-3 border-b border-slate-200 bg-white">
              <div className="flex-1">
                <label className="text-xs text-slate-500 block mb-1">Description</label>
                <input className="input text-sm" required placeholder="e.g. Excavation" value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="w-32">
                <label className="text-xs text-slate-500 block mb-1">Amount ($)</label>
                <input className="input text-sm" type="number" step="1" required placeholder="0"
                  value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
              </div>
              <div className="flex-1">
                <label className="text-xs text-slate-500 block mb-1">Note (optional)</label>
                <input className="input text-sm" placeholder="e.g. 250 ft depth estimate"
                  value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
              <button type="submit" className="btn-primary text-sm py-2">Save</button>
              <button type="button" onClick={() => setAdding(false)} className="btn-secondary text-sm py-2">Cancel</button>
            </form>
          )}

          {/* Line items */}
          {cat.lineItems.length === 0 && !adding ? (
            <p className="text-xs text-slate-400 italic px-4 py-3">No breakdown items yet — click "+ Add item" to explain this estimate.</p>
          ) : (
            <table className="w-full text-sm">
              <tbody>
                {cat.lineItems.map((item) => (
                  editId === item.id ? (
                    <tr key={item.id} className="border-b border-slate-100 bg-white">
                      <td className="px-4 py-2 w-full" colSpan={3}>
                        <div className="flex items-center gap-2">
                          <input className="input text-sm flex-1" value={editForm.description}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                          <input className="input text-sm w-28" type="number" step="1" value={editForm.amount}
                            onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })} />
                          <input className="input text-sm flex-1" placeholder="Note" value={editForm.notes}
                            onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} />
                          <button onClick={() => saveEdit(item.id)} className="btn-primary text-xs py-1.5">Save</button>
                          <button onClick={() => setEditId(null)} className="btn-secondary text-xs py-1.5">Cancel</button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={item.id} className="border-b border-slate-100 last:border-0 hover:bg-white group">
                      <td className="px-4 py-2.5">
                        <span className="font-medium text-slate-700">{item.description}</span>
                        {item.notes && <span className="text-xs text-slate-400 ml-2 italic">{item.notes}</span>}
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium text-slate-700 whitespace-nowrap">{fmt(item.amount)}</td>
                      <td className="px-4 py-2.5 text-right whitespace-nowrap">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 justify-end">
                          <button onClick={() => startEdit(item)} className="text-xs text-slate-400 hover:text-slate-700 underline">edit</button>
                          <button onClick={() => deleteItem(item.id)} className="text-xs text-red-400 hover:text-red-600 underline">delete</button>
                        </span>
                      </td>
                    </tr>
                  )
                ))}
                {cat.lineItems.length > 0 && (
                  <tr className="bg-slate-100">
                    <td className="px-4 py-2 font-semibold text-slate-600 text-xs uppercase tracking-wide">Breakdown total</td>
                    <td className="px-4 py-2 text-right font-bold text-slate-800">{fmt(lineTotal)}</td>
                    <td />
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function BudgetPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showCatForm, setShowCatForm] = useState(false);
  const [showExpForm, setShowExpForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [editCatId, setEditCatId] = useState<number | null>(null);
  const [editCatForm, setEditCatForm] = useState({ name: "", allocated: "", notes: "" });

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

  function toggleExpand(id: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

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

  function startEditCat(c: Category) {
    setEditCatId(c.id);
    setEditCatForm({ name: c.name, allocated: String(c.allocated), notes: c.notes ?? "" });
  }

  async function saveEditCat(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`/api/budget/categories/${editCatId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editCatForm.name, allocated: parseFloat(editCatForm.allocated), notes: editCatForm.notes || null }),
    });
    setEditCatId(null);
    load();
  }

  async function deleteCategory(id: number) {
    if (!confirm("Delete this budget category and all its line items?")) return;
    await fetch(`/api/budget/categories/${id}`, { method: "DELETE" });
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
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Budget</h2>
          <p className="text-slate-500 text-sm mt-0.5">Click any category to see the cost breakdown</p>
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
            <input className="input" required value={catForm.name} onChange={(e) => setCatForm({ ...catForm, name: e.target.value })} />
          </div>
          <div>
            <label className="label">Allocated ($)</label>
            <input className="input" type="number" step="1" required value={catForm.allocated}
              onChange={(e) => setCatForm({ ...catForm, allocated: e.target.value })} />
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
            <input className="input" required value={expForm.description} onChange={(e) => setExpForm({ ...expForm, description: e.target.value })} />
          </div>
          <div>
            <label className="label">Amount ($)</label>
            <input className="input" type="number" step="0.01" required value={expForm.amount}
              onChange={(e) => setExpForm({ ...expForm, amount: e.target.value })} />
          </div>
          <div>
            <label className="label">Date</label>
            <input className="input" type="date" required value={expForm.date} onChange={(e) => setExpForm({ ...expForm, date: e.target.value })} />
          </div>
          <div>
            <label className="label">Vendor</label>
            <input className="input" value={expForm.vendor} onChange={(e) => setExpForm({ ...expForm, vendor: e.target.value })} />
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
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Category</th>
              <th className="text-right px-4 py-3 font-medium text-slate-600">Budgeted</th>
              <th className="text-right px-4 py-3 font-medium text-slate-600">Spent</th>
              <th className="text-right px-4 py-3 font-medium text-slate-600">Remaining</th>
              <th className="px-4 py-3 w-28" />
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => {
              const remaining = c.allocated - c.spent;
              const isOpen = expanded.has(c.id);
              const hasItems = c.lineItems.length > 0;
              return (
                <>
                  {editCatId === c.id ? (
                    <tr key={c.id}>
                      <td colSpan={5} className="p-0">
                        <form onSubmit={saveEditCat} className="flex items-end gap-3 px-4 py-3 bg-slate-50 border-b border-slate-200">
                          <div className="flex-1">
                            <label className="label">Category Name</label>
                            <input className="input" required value={editCatForm.name}
                              onChange={(e) => setEditCatForm({ ...editCatForm, name: e.target.value })} />
                          </div>
                          <div className="w-36">
                            <label className="label">Allocated ($)</label>
                            <input className="input" type="number" step="1" required value={editCatForm.allocated}
                              onChange={(e) => setEditCatForm({ ...editCatForm, allocated: e.target.value })} />
                          </div>
                          <div className="flex-1">
                            <label className="label">Notes</label>
                            <input className="input" value={editCatForm.notes}
                              onChange={(e) => setEditCatForm({ ...editCatForm, notes: e.target.value })} />
                          </div>
                          <button type="submit" className="btn-primary py-2">Save</button>
                          <button type="button" onClick={() => setEditCatId(null)} className="btn-secondary py-2">Cancel</button>
                        </form>
                      </td>
                    </tr>
                  ) : (
                    <tr
                      key={c.id}
                      onClick={() => toggleExpand(c.id)}
                      className="border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors group"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-slate-400 text-xs transition-transform ${isOpen ? "rotate-90" : ""}`}>▶</span>
                          <div className="flex-1">
                            <span className="font-medium">{c.name}</span>
                            {hasItems && (
                              <span className="ml-2 text-xs text-slate-400">{c.lineItems.length} items</span>
                            )}
                            {c.notes && <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{c.notes}</p>}
                          </div>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 ml-2" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => startEditCat(c)} className="text-xs text-slate-400 hover:text-slate-700 underline">Edit</button>
                            <button onClick={() => deleteCategory(c.id)} className="text-xs text-red-400 hover:text-red-600 underline">Del</button>
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">{fmt(c.allocated)}</td>
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
                  )}
                  {isOpen && editCatId !== c.id && <LineItemsPanel key={`panel-${c.id}`} cat={c} onRefresh={load} />}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

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
