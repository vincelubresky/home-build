"use client";

import { useEffect, useState } from "react";

type Draw = { id: number; drawNumber: number; amount: number; requestDate: string | null; approvedDate: string | null; fundedDate: string | null; status: string; notes: string | null };
type Loan = { id: number; lender: string; loanType: string; totalAmount: number; interestRate: number; closingDate: string | null; notes: string | null; drawSchedule: Draw[] };

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function toDateInput(val: string | null) {
  if (!val) return "";
  return val.split("T")[0];
}

const blankLoan = { lender: "", loanType: "Construction", totalAmount: "", interestRate: "", closingDate: "", notes: "" };
const blankDraw = { drawNumber: "", amount: "", requestDate: "", approvedDate: "", fundedDate: "", status: "pending", notes: "" };

export default function LoanPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [activeLoan, setActiveLoan] = useState<number | null>(null);
  const [showDrawForm, setShowDrawForm] = useState(false);
  const [loanForm, setLoanForm] = useState(blankLoan);
  const [drawForm, setDrawForm] = useState(blankDraw);
  const [editLoanId, setEditLoanId] = useState<number | null>(null);
  const [editLoanForm, setEditLoanForm] = useState(blankLoan);
  const [editDrawId, setEditDrawId] = useState<number | null>(null);
  const [editDrawForm, setEditDrawForm] = useState(blankDraw);
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await fetch("/api/loan").then((r) => r.json());
    setLoans(data);
    if (data.length > 0 && activeLoan === null) setActiveLoan(data[0].id);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function saveLoan(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/loan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...loanForm, totalAmount: parseFloat(loanForm.totalAmount), interestRate: parseFloat(loanForm.interestRate) }),
    });
    setLoanForm(blankLoan);
    setShowLoanForm(false);
    load();
  }

  async function saveDraw(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`/api/loan/${activeLoan}/draws`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...drawForm, drawNumber: parseInt(drawForm.drawNumber), amount: parseFloat(drawForm.amount) }),
    });
    setDrawForm(blankDraw);
    setShowDrawForm(false);
    load();
  }

  function startEditLoan(loan: Loan) {
    setEditLoanId(loan.id);
    setEditLoanForm({
      lender: loan.lender, loanType: loan.loanType,
      totalAmount: String(loan.totalAmount), interestRate: String(loan.interestRate),
      closingDate: toDateInput(loan.closingDate), notes: loan.notes ?? "",
    });
  }

  async function saveEditLoan(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`/api/loan/${editLoanId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editLoanForm,
        totalAmount: parseFloat(editLoanForm.totalAmount),
        interestRate: parseFloat(editLoanForm.interestRate),
      }),
    });
    setEditLoanId(null);
    load();
  }

  async function deleteLoan(id: number) {
    if (!confirm("Delete this loan and all its draws?")) return;
    await fetch(`/api/loan/${id}`, { method: "DELETE" });
    setActiveLoan(null);
    load();
  }

  function startEditDraw(d: Draw) {
    setEditDrawId(d.id);
    setEditDrawForm({
      drawNumber: String(d.drawNumber), amount: String(d.amount),
      requestDate: toDateInput(d.requestDate), approvedDate: toDateInput(d.approvedDate),
      fundedDate: toDateInput(d.fundedDate), status: d.status, notes: d.notes ?? "",
    });
  }

  async function saveEditDraw(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`/api/loan/${activeLoan}/draws/${editDrawId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editDrawForm,
        drawNumber: parseInt(editDrawForm.drawNumber),
        amount: parseFloat(editDrawForm.amount),
      }),
    });
    setEditDrawId(null);
    load();
  }

  async function deleteDraw(drawId: number) {
    if (!confirm("Delete this draw?")) return;
    await fetch(`/api/loan/${activeLoan}/draws/${drawId}`, { method: "DELETE" });
    load();
  }

  if (loading) return <p className="text-slate-400">Loading…</p>;

  const loan = loans.find((l) => l.id === activeLoan);
  const totalFunded = loan?.drawSchedule.filter((d) => d.status === "funded").reduce((s, d) => s + d.amount, 0) ?? 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Loan & Draws</h2>
          <p className="text-slate-500 text-sm mt-0.5">Construction financing and draw schedule</p>
        </div>
        <button onClick={() => setShowLoanForm(!showLoanForm)} className="btn-primary">+ Add Loan</button>
      </div>

      {showLoanForm && (
        <form onSubmit={saveLoan} className="bg-white rounded-xl border border-slate-200 p-5 mb-6 grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">New Loan</h3>
          <div>
            <label className="label">Lender</label>
            <input className="input" required value={loanForm.lender} onChange={(e) => setLoanForm({ ...loanForm, lender: e.target.value })} placeholder="Bank name" />
          </div>
          <div>
            <label className="label">Loan Type</label>
            <input className="input" value={loanForm.loanType} onChange={(e) => setLoanForm({ ...loanForm, loanType: e.target.value })} />
          </div>
          <div>
            <label className="label">Total Amount ($)</label>
            <input className="input" type="number" step="0.01" required value={loanForm.totalAmount} onChange={(e) => setLoanForm({ ...loanForm, totalAmount: e.target.value })} />
          </div>
          <div>
            <label className="label">Interest Rate (%)</label>
            <input className="input" type="number" step="0.01" required value={loanForm.interestRate} onChange={(e) => setLoanForm({ ...loanForm, interestRate: e.target.value })} />
          </div>
          <div>
            <label className="label">Closing Date</label>
            <input className="input" type="date" value={loanForm.closingDate} onChange={(e) => setLoanForm({ ...loanForm, closingDate: e.target.value })} />
          </div>
          <div className="col-span-2">
            <label className="label">Notes</label>
            <textarea className="input" rows={2} value={loanForm.notes} onChange={(e) => setLoanForm({ ...loanForm, notes: e.target.value })} />
          </div>
          <div className="col-span-2 flex gap-2 justify-end">
            <button type="button" onClick={() => setShowLoanForm(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      )}

      {loans.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-12">No loan information yet — add one above.</p>
      ) : (
        <>
          {loans.length > 1 && (
            <div className="flex gap-2 mb-4">
              {loans.map((l) => (
                <button key={l.id} onClick={() => setActiveLoan(l.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${activeLoan === l.id ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600"}`}>
                  {l.lender} — {l.loanType}
                </button>
              ))}
            </div>
          )}

          {loan && (
            <>
              {editLoanId === loan.id ? (
                <form onSubmit={saveEditLoan} className="bg-white rounded-xl border border-slate-200 p-5 mb-6 grid grid-cols-2 gap-4">
                  <h3 className="col-span-2 font-semibold">Edit Loan</h3>
                  <div>
                    <label className="label">Lender</label>
                    <input className="input" required value={editLoanForm.lender} onChange={(e) => setEditLoanForm({ ...editLoanForm, lender: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Loan Type</label>
                    <input className="input" value={editLoanForm.loanType} onChange={(e) => setEditLoanForm({ ...editLoanForm, loanType: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Total Amount ($)</label>
                    <input className="input" type="number" step="0.01" required value={editLoanForm.totalAmount} onChange={(e) => setEditLoanForm({ ...editLoanForm, totalAmount: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Interest Rate (%)</label>
                    <input className="input" type="number" step="0.01" required value={editLoanForm.interestRate} onChange={(e) => setEditLoanForm({ ...editLoanForm, interestRate: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Closing Date</label>
                    <input className="input" type="date" value={editLoanForm.closingDate} onChange={(e) => setEditLoanForm({ ...editLoanForm, closingDate: e.target.value })} />
                  </div>
                  <div className="col-span-2">
                    <label className="label">Notes</label>
                    <textarea className="input" rows={2} value={editLoanForm.notes} onChange={(e) => setEditLoanForm({ ...editLoanForm, notes: e.target.value })} />
                  </div>
                  <div className="col-span-2 flex gap-2 justify-end">
                    <button type="button" onClick={() => setEditLoanId(null)} className="btn-secondary">Cancel</button>
                    <button type="submit" className="btn-primary">Save</button>
                  </div>
                </form>
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6 group">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-500">Lender</p>
                      <p className="font-semibold">{loan.lender}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Total Amount</p>
                      <p className="font-semibold">{fmt(loan.totalAmount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Interest Rate</p>
                      <p className="font-semibold">{loan.interestRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Total Funded</p>
                      <p className="font-semibold text-green-600">{fmt(totalFunded)}</p>
                    </div>
                  </div>
                  {loan.totalAmount > 0 && (
                    <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Funds drawn</span>
                        <span>{((totalFunded / loan.totalAmount) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${Math.min((totalFunded / loan.totalAmount) * 100, 100)}%` }} />
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>{fmt(totalFunded)} drawn</span>
                        <span>{fmt(loan.totalAmount - totalFunded)} remaining</span>
                      </div>
                    </div>
                  )}
                  {loan.notes && <p className="text-sm text-slate-500 mt-3 italic">{loan.notes}</p>}
                  <div className="flex gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEditLoan(loan)} className="text-xs text-slate-400 hover:text-slate-700 underline">Edit loan details</button>
                    <button onClick={() => deleteLoan(loan.id)} className="text-xs text-red-400 hover:text-red-600 underline">Delete loan</button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Draw Schedule</h3>
                <button onClick={() => setShowDrawForm(!showDrawForm)} className="btn-secondary text-sm">+ Add Draw</button>
              </div>

              {showDrawForm && (
                <form onSubmit={saveDraw} className="bg-white rounded-xl border border-slate-200 p-5 mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Draw #</label>
                    <input className="input" type="number" required value={drawForm.drawNumber} onChange={(e) => setDrawForm({ ...drawForm, drawNumber: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Amount ($)</label>
                    <input className="input" type="number" step="0.01" required value={drawForm.amount} onChange={(e) => setDrawForm({ ...drawForm, amount: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Request Date</label>
                    <input className="input" type="date" value={drawForm.requestDate} onChange={(e) => setDrawForm({ ...drawForm, requestDate: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Status</label>
                    <select className="input" value={drawForm.status} onChange={(e) => setDrawForm({ ...drawForm, status: e.target.value })}>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="funded">Funded</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="label">Notes</label>
                    <textarea className="input" rows={2} value={drawForm.notes} onChange={(e) => setDrawForm({ ...drawForm, notes: e.target.value })} />
                  </div>
                  <div className="col-span-2 flex gap-2 justify-end">
                    <button type="button" onClick={() => setShowDrawForm(false)} className="btn-secondary">Cancel</button>
                    <button type="submit" className="btn-primary">Save</button>
                  </div>
                </form>
              )}

              {loan.drawSchedule.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-8">No draws recorded yet.</p>
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium text-slate-600">Draw #</th>
                        <th className="text-right px-4 py-3 font-medium text-slate-600">Amount</th>
                        <th className="text-left px-4 py-3 font-medium text-slate-600">Requested</th>
                        <th className="text-left px-4 py-3 font-medium text-slate-600">Funded</th>
                        <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                        <th className="px-4 py-3 w-20" />
                      </tr>
                    </thead>
                    <tbody>
                      {loan.drawSchedule.map((d) =>
                        editDrawId === d.id ? (
                          <tr key={d.id}>
                            <td colSpan={6} className="p-0">
                              <form onSubmit={saveEditDraw} className="grid grid-cols-3 gap-3 px-4 py-3 bg-slate-50 border-b border-slate-200">
                                <div>
                                  <label className="label">Draw #</label>
                                  <input className="input" type="number" required value={editDrawForm.drawNumber} onChange={(e) => setEditDrawForm({ ...editDrawForm, drawNumber: e.target.value })} />
                                </div>
                                <div>
                                  <label className="label">Amount ($)</label>
                                  <input className="input" type="number" step="0.01" required value={editDrawForm.amount} onChange={(e) => setEditDrawForm({ ...editDrawForm, amount: e.target.value })} />
                                </div>
                                <div>
                                  <label className="label">Status</label>
                                  <select className="input" value={editDrawForm.status} onChange={(e) => setEditDrawForm({ ...editDrawForm, status: e.target.value })}>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="funded">Funded</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="label">Request Date</label>
                                  <input className="input" type="date" value={editDrawForm.requestDate} onChange={(e) => setEditDrawForm({ ...editDrawForm, requestDate: e.target.value })} />
                                </div>
                                <div>
                                  <label className="label">Approved Date</label>
                                  <input className="input" type="date" value={editDrawForm.approvedDate} onChange={(e) => setEditDrawForm({ ...editDrawForm, approvedDate: e.target.value })} />
                                </div>
                                <div>
                                  <label className="label">Funded Date</label>
                                  <input className="input" type="date" value={editDrawForm.fundedDate} onChange={(e) => setEditDrawForm({ ...editDrawForm, fundedDate: e.target.value })} />
                                </div>
                                <div className="col-span-3">
                                  <label className="label">Notes</label>
                                  <input className="input" value={editDrawForm.notes} onChange={(e) => setEditDrawForm({ ...editDrawForm, notes: e.target.value })} />
                                </div>
                                <div className="col-span-3 flex gap-2 justify-end pt-1">
                                  <button type="button" onClick={() => setEditDrawId(null)} className="btn-secondary">Cancel</button>
                                  <button type="submit" className="btn-primary">Save</button>
                                </div>
                              </form>
                            </td>
                          </tr>
                        ) : (
                          <tr key={d.id} className="border-b border-slate-100 last:border-0 group hover:bg-slate-50">
                            <td className="px-4 py-3 font-medium">Draw {d.drawNumber}</td>
                            <td className="px-4 py-3 text-right">{fmt(d.amount)}</td>
                            <td className="px-4 py-3 text-slate-500">{d.requestDate ? new Date(d.requestDate).toLocaleDateString() : "—"}</td>
                            <td className="px-4 py-3 text-slate-500">{d.fundedDate ? new Date(d.fundedDate).toLocaleDateString() : "—"}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize
                                ${d.status === "funded" ? "bg-green-100 text-green-700" :
                                  d.status === "approved" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                                {d.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 justify-end">
                                <button onClick={() => startEditDraw(d)} className="text-xs text-slate-400 hover:text-slate-700 underline">Edit</button>
                                <button onClick={() => deleteDraw(d.id)} className="text-xs text-red-400 hover:text-red-600 underline">Del</button>
                              </span>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
