"use client";

import { useEffect, useState } from "react";

type Note = { id: number; content: string; date: string };
type Contractor = {
  id: number; name: string; trade: string; company: string | null;
  phone: string | null; email: string | null; status: string; notes: Note[];
};

const blank = { name: "", trade: "", company: "", phone: "", email: "", status: "active" };

export default function ContractorsPage() {
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(blank);
  const [noteText, setNoteText] = useState<Record<number, string>>({});
  const [expanded, setExpanded] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await fetch("/api/contractors").then((r) => r.json());
    setContractors(data);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/contractors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(blank);
    setShowForm(false);
    load();
  }

  async function addNote(contractorId: number) {
    const content = noteText[contractorId];
    if (!content?.trim()) return;
    await fetch(`/api/contractors/${contractorId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    setNoteText({ ...noteText, [contractorId]: "" });
    load();
  }

  if (loading) return <p className="text-slate-400">Loading…</p>;

  const active = contractors.filter((c) => c.status === "active");
  const others = contractors.filter((c) => c.status !== "active");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Contractors</h2>
          <p className="text-slate-500 text-sm mt-0.5">Contacts and job notes</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">+ Add Contractor</button>
      </div>

      {showForm && (
        <form onSubmit={save} className="bg-white rounded-xl border border-slate-200 p-5 mb-6 grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">New Contractor</h3>
          <div>
            <label className="label">Name</label>
            <input className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="label">Trade</label>
            <input className="input" required value={form.trade} onChange={(e) => setForm({ ...form, trade: e.target.value })} placeholder="e.g. General, Plumbing, Electrical" />
          </div>
          <div>
            <label className="label">Company</label>
            <input className="input" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </div>
          <div>
            <label className="label">Phone</label>
            <input className="input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="label">Status</label>
            <select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
            </select>
          </div>
          <div className="col-span-2 flex gap-2 justify-end">
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      )}

      {contractors.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-12">No contractors yet — add one above.</p>
      ) : (
        <>
          {active.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold text-slate-600 mb-3 text-sm uppercase tracking-wide">Active ({active.length})</h3>
              <div className="space-y-3">
                {active.map((c) => <ContractorCard key={c.id} c={c} expanded={expanded} setExpanded={setExpanded} noteText={noteText} setNoteText={setNoteText} addNote={addNote} />)}
              </div>
            </div>
          )}
          {others.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-600 mb-3 text-sm uppercase tracking-wide">Others ({others.length})</h3>
              <div className="space-y-3">
                {others.map((c) => <ContractorCard key={c.id} c={c} expanded={expanded} setExpanded={setExpanded} noteText={noteText} setNoteText={setNoteText} addNote={addNote} />)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ContractorCard({ c, expanded, setExpanded, noteText, setNoteText, addNote }: {
  c: Contractor;
  expanded: number | null;
  setExpanded: (id: number | null) => void;
  noteText: Record<number, string>;
  setNoteText: (v: Record<number, string>) => void;
  addNote: (id: number) => void;
}) {
  const isOpen = expanded === c.id;
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div
        className="p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50"
        onClick={() => setExpanded(isOpen ? null : c.id)}
      >
        <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
          {c.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <p className="font-semibold">{c.name}</p>
          <p className="text-sm text-slate-500">{c.trade}{c.company ? ` · ${c.company}` : ""}</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          {c.phone && <span>{c.phone}</span>}
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.status === "active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{c.status}</span>
          <span className="text-slate-300">{isOpen ? "▲" : "▼"}</span>
        </div>
      </div>
      {isOpen && (
        <div className="border-t border-slate-100 px-4 py-4">
          {c.email && <p className="text-sm text-slate-500 mb-3">📧 {c.email}</p>}
          <h4 className="text-sm font-semibold mb-2">Notes ({c.notes.length})</h4>
          <div className="space-y-2 mb-3">
            {c.notes.length === 0 && <p className="text-sm text-slate-400">No notes yet.</p>}
            {c.notes.map((n) => (
              <div key={n.id} className="bg-slate-50 rounded-lg p-3">
                <p className="text-sm">{n.content}</p>
                <p className="text-xs text-slate-400 mt-1">{new Date(n.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className="input flex-1"
              placeholder="Add a note…"
              value={noteText[c.id] ?? ""}
              onChange={(e) => setNoteText({ ...noteText, [c.id]: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && addNote(c.id)}
            />
            <button onClick={() => addNote(c.id)} className="btn-primary">Add</button>
          </div>
        </div>
      )}
    </div>
  );
}
