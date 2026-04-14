"use client";

import { useEffect, useState } from "react";

type Document = {
  id: number; type: string; title: string; description: string | null;
  fileUrl: string | null; status: string; submittedDate: string | null;
  approvedDate: string | null; expiryDate: string | null; notes: string | null;
};

const TYPES = ["plan", "permit", "inspection", "certificate", "other"];
const STATUSES = ["pending", "submitted", "approved", "rejected", "expired"];
const STATUS_COLORS: Record<string, string> = {
  pending: "bg-slate-100 text-slate-600",
  submitted: "bg-blue-100 text-blue-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  expired: "bg-orange-100 text-orange-700",
};

const blank = { type: "plan", title: "", description: "", fileUrl: "", status: "pending", submittedDate: "", approvedDate: "", expiryDate: "", notes: "" };

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState(blank);
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await fetch("/api/documents").then((r) => r.json());
    setDocs(data);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(blank);
    setShowForm(false);
    load();
  }

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/documents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  const filtered = filter === "all" ? docs : docs.filter((d) => d.type === filter);

  if (loading) return <p className="text-slate-400">Loading…</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Plans & Permits</h2>
          <p className="text-slate-500 text-sm mt-0.5">Home plans, permits, inspections, and certificates</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">+ Add Document</button>
      </div>

      {/* Type filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", ...TYPES].map((t) => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors
              ${filter === t ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
            {t} {t !== "all" && `(${docs.filter((d) => d.type === t).length})`}
          </button>
        ))}
      </div>

      {showForm && (
        <form onSubmit={save} className="bg-white rounded-xl border border-slate-200 p-5 mb-6 grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">New Document</h3>
          <div>
            <label className="label">Type</label>
            <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Title</label>
            <input className="input" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Building Permit, Floor Plan Set A" />
          </div>
          <div className="col-span-2">
            <label className="label">Description</label>
            <textarea className="input" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="col-span-2">
            <label className="label">File URL (optional)</label>
            <input className="input" type="url" value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} placeholder="Link to Google Drive, Dropbox, etc." />
          </div>
          <div>
            <label className="label">Status</label>
            <select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Submitted Date</label>
            <input className="input" type="date" value={form.submittedDate} onChange={(e) => setForm({ ...form, submittedDate: e.target.value })} />
          </div>
          <div>
            <label className="label">Approved Date</label>
            <input className="input" type="date" value={form.approvedDate} onChange={(e) => setForm({ ...form, approvedDate: e.target.value })} />
          </div>
          <div>
            <label className="label">Expiry Date</label>
            <input className="input" type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} />
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

      {filtered.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-12">No documents yet — add one above.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((d) => (
            <div key={d.id} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded capitalize">{d.type}</span>
                    <p className="font-medium">{d.title}</p>
                  </div>
                  {d.description && <p className="text-sm text-slate-500">{d.description}</p>}
                  <div className="flex gap-4 mt-1 text-xs text-slate-400 flex-wrap">
                    {d.submittedDate && <span>Submitted: {new Date(d.submittedDate).toLocaleDateString()}</span>}
                    {d.approvedDate && <span className="text-green-600">Approved: {new Date(d.approvedDate).toLocaleDateString()}</span>}
                    {d.expiryDate && <span className="text-orange-600">Expires: {new Date(d.expiryDate).toLocaleDateString()}</span>}
                  </div>
                  {d.notes && <p className="text-xs text-slate-400 italic mt-1">{d.notes}</p>}
                  {d.fileUrl && (
                    <a href={d.fileUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-1 inline-block">
                      📎 View file
                    </a>
                  )}
                </div>
                <select
                  value={d.status}
                  onChange={(e) => updateStatus(d.id, e.target.value)}
                  className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer flex-shrink-0 ${STATUS_COLORS[d.status]}`}
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
