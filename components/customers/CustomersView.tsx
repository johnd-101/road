'use client'
import { useState } from 'react'
import { formatDateTime } from '@/lib/format'

export function CustomersView({ customers, onAdd, onUpdate, onDelete }: any) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", details: "" })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [edit, setEdit] = useState({ name: "", email: "", phone: "", company: "", details: "" })

  return (
    <>
      <h1 className="text-[28px] sm:text-3xl font-extrabold tracking-tight">Customers</h1>
      <p className="text-sm text-zinc-500 mt-1">{customers.length} customers</p>

      <form onSubmit={(e) => { e.preventDefault(); onAdd(form); setForm({ name: "", email: "", phone: "", company: "", details: "" }) }} className="mt-6 rounded-[24px] border border-zinc-800 bg-zinc-900 p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value })} placeholder="Full name *" required className="w-full h-12 rounded-full border border-zinc-800 bg-zinc-950 px-6 text-sm placeholder:text-zinc-500 outline-none" />
          <input value={form.email} onChange={e => setForm({...form, email: e.target.value })} placeholder="Email" className="w-full h-12 rounded-full border border-zinc-800 bg-zinc-950 px-6 text-sm outline-none" />
          <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value })} placeholder="Phone" className="w-full h-12 rounded-full border border-zinc-800 bg-zinc-950 px-6 text-sm outline-none" />
          <input value={form.company} onChange={e => setForm({...form, company: e.target.value })} placeholder="Company" className="w-full h-12 rounded-full border border-zinc-800 bg-zinc-950 px-6 text-sm outline-none" />
        </div>
        <textarea value={form.details} onChange={e => setForm({...form, details: e.target.value })} rows={3} placeholder="Notes..." className="w-full rounded-[20px] border border-zinc-800 bg-zinc-950 px-6 py-4 text-sm resize-none outline-none" />
        <div className="flex justify-end"><button className="w-full sm:w-auto h-12 rounded-full bg-emerald-500 text-black px-8 text-sm font-bold">+ Add Customer</button></div>
      </form>

      <div className="mt-6 space-y-3">
        {customers.map((c: any) => (
          <div key={c.id} className="rounded-[20px] border border-zinc-800 bg-zinc-900 p-4 flex gap-3">
            {editingId === c.id? (
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input value={edit.name} onChange={e => setEdit({...edit, name: e.target.value })} className="h-11 rounded-full border border-zinc-700 bg-zinc-950 px-5 text-sm" />
                  <input value={edit.email} onChange={e => setEdit({...edit, email: e.target.value })} className="h-11 rounded-full border border-zinc-700 bg-zinc-950 px-5 text-sm" placeholder="Email" />
                  <input value={edit.phone} onChange={e => setEdit({...edit, phone: e.target.value })} className="h-11 rounded-full border border-zinc-700 bg-zinc-950 px-5 text-sm" placeholder="Phone" />
                  <input value={edit.company} onChange={e => setEdit({...edit, company: e.target.value })} className="h-11 rounded-full border border-zinc-700 bg-zinc-950 px-5 text-sm" placeholder="Company" />
                </div>
                <div className="flex gap-2"><button onClick={() => { onUpdate(c.id, edit); setEditingId(null) }} className="h-10 rounded-full bg-emerald-600 text-white px-6 text-sm font-bold">Save</button><button onClick={() => setEditingId(null)} className="h-10 rounded-full border border-zinc-700 px-6 text-sm">Cancel</button></div>
              </div>
            ) : (
              <>
                <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 grid place-items-center font-bold text-sm">👤</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">{c.name}</p>
                  <p className="text-[12px] text-zinc-400 mt-1 truncate">{[c.company, c.email, c.phone].filter(Boolean).join(' • ')}</p>
                  <span className="inline-block mt-2 text-[11px] px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">{formatDateTime(c.created_at)}</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                  <button onClick={() => { setEditingId(c.id); setEdit({ name: c.name, email: c.email || '', phone: c.phone || '', company: c.company || '', details: c.details || '' }) }} className="h-10 w-10 grid place-items-center rounded-full bg-zinc-800 border border-zinc-700">✎</button>
                  <button onClick={() => onDelete(c.id)} className="h-10 w-10 grid place-items-center rounded-full bg-red-950/40 border border-red-900 text-red-400">✕</button>
                </div>
              </>
            )}
          </div>
        ))}
        {customers.length===0 && <div className="rounded-[20px] border border-dashed border-zinc-800 p-10 text-center text-sm text-zinc-500">No customers yet. Add one above 👥</div>}
      </div>
    </>
  )
}
