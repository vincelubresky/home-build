"use client";

import { useEffect, useState } from "react";

type Milestone = {
  id: number; phase: string; title: string; description: string | null;
  status: string; startDate: string | null; targetDate: string | null;
  completedDate: string | null; notes: string | null;
};

const STATUSES = ["upcoming", "in_progress", "completed", "delayed"];
const STATUS_COLORS: Record<string, string> = {
  upcoming: "bg-slate-100 text-slate-600",
  in_progress: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  delayed: "bg-red-100 text-red-700",
};
const STATUS_LABELS: Record<string, string> = {
  upcoming: "Upcoming",
  in_progress: "In Progress",
  completed: "Completed",
  delayed: "Delayed",
};

const blank = { phase: "", title: "", description: "", status: "upcoming", startDate: "", targetDate: "", completedDate: "", notes: "" };

export default function TimelinePage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(blank);
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await fetch("/api/timeline").then((r) => r.json());
    setMilestones(data);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/timeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(blank);
    setShowForm(false);
    load();
  }

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/timeline/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, completedDate: status === "completed" ? new Date().toISOString() : null }),
    });
    load();
  }

  // Group by phase
  const phases = Array.from(new Set(milestones.map((m) => m.phase)));

  if (loading) return <p className="text-slate-400">Loading…</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Timeline</h2>
          <p className="text-slate-500 text-sm mt-0.5">Build phases and milestones</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">+ Add Milestone</button>
      </div>

      {/* Add form */}
      {showForm && (
        <form onSubmit={save} className="bg-white rounded-xl border border-slate-200 p-5 mb-6 grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">New Milestone</h3>
          <div>
            <label className="label">Phase</label>
            <input className="input" required value={form.phase} onChange={(e) => setForm({ ...form, phase: e.target.value })} placeholder="e.g. Foundation, Framing, Roofing" />
          </div>
          <div>
            <label className="label">Title</label>
            <input className="input" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Pour footings" />
          </div>
          <div className="col-span-2">
            <label className="label">Description</label>
            <textarea className="input" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className="label">Status</label>
            <select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Start Date</label>
            <input className="input" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          </div>
          <div>
            <label className="label">Target Date</label>
            <input className="input" type="date" value={form.targetDate} onChange={(e) => setForm({ ...form, targetDate: e.target.value })} />
          </div>
          <div>
            <label className="label">Completed Date</label>
            <input className="input" type="date" value={form.completedDate} onChange={(e) => setForm({ ...form, completedDate: e.target.value })} />
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

      {milestones.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-12">No milestones yet — add your first one above.</p>
      ) : (
        phases.map((phase) => (
          <div key={phase} className="mb-8">
            <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <span className="text-base">{phase}</span>
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                {milestones.filter((m) => m.phase === phase && m.status === "completed").length} /
                {milestones.filter((m) => m.phase === phase).length} done
              </span>
            </h3>
            <div className="space-y-3">
              {milestones.filter((m) => m.phase === phase).map((m) => (
                <div key={m.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-4">
                  <div className={`mt-0.5 w-3 h-3 rounded-full flex-shrink-0 ${
                    m.status === "completed" ? "bg-green-500" :
                    m.status === "in_progress" ? "bg-blue-500" :
                    m.status === "delayed" ? "bg-red-500" : "bg-slate-300"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-medium ${m.status === "completed" ? "line-through text-slate-400" : ""}`}>{m.title}</p>
                      <select
                        value={m.status}
                        onChange={(e) => updateStatus(m.id, e.target.value)}
                        className={`text-xs font-medium px-2 py-0.5 rounded-full border-0 cursor-pointer ${STATUS_COLORS[m.status]}`}
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                      </select>
                    </div>
                    {m.description && <p className="text-sm text-slate-500 mt-0.5">{m.description}</p>}
                    <div className="flex gap-4 mt-1 text-xs text-slate-400">
                      {m.startDate && <span>Start: {new Date(m.startDate).toLocaleDateString()}</span>}
                      {m.targetDate && <span>Target: {new Date(m.targetDate).toLocaleDateString()}</span>}
                      {m.completedDate && <span className="text-green-600">Done: {new Date(m.completedDate).toLocaleDateString()}</span>}
                    </div>
                    {m.notes && <p className="text-xs text-slate-400 mt-1 italic">{m.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
