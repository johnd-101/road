'use client'
import { useState } from 'react'
import { formatDateTime } from '@/lib/format'

export function NotesView({ notes, onAdd, onUpdate, onDelete }: any) {
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDetails, setEditDetails] = useState("")

  return (
    <>
      <h1 className="text-[28px] sm:text-3xl font-extrabold">My Notes</h1>
      <form onSubmit={(e) => { e.preventDefault(); onAdd(title, details); setTitle(""); setDetails("") }} className="mt-6 rounded-[24px] border border-zinc-800 bg-zinc-900 p-4 sm:p-6 space-y-4">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title... add #tag" className="w-full h-12 rounded-full border border-zinc-800 bg-zinc-950 px-6 text-sm outline-none placeholder:text-zinc-500" />
        <textarea value={details} onChange={e => setDetails(e.target.value)} rows={4} placeholder="Details..." className="w-full rounded-[20px] border border-zinc-800 bg-zinc-950 px-6 py-4 text-sm outline-none resize-none placeholder:text-zinc-500" />
        <div className="flex justify-end"><button className="w-full sm:w-auto h-12 rounded-full bg-white text-black px-8 text-sm font-bold">+ Add Note</button></div>
      </form>

      <div className="mt-6 space-y-3">
        {notes.map((n: any) => (
          <div key={n.id} className="rounded-[20px] border border-zinc-800 bg-zinc-900 p-4 flex gap-3">
            {editingId === n.id? (
              <div className="flex-1 space-y-3">
                <input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="w-full h-11 rounded-full border border-zinc-700 bg-zinc-950 px-5 text-sm" />
                <textarea value={editDetails} onChange={e => setEditDetails(e.target.value)} rows={3} className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-3 text-sm" />
                <div className="flex gap-2"><button onClick={() => { onUpdate(n.id, editTitle, editDetails); setEditingId(null) }} className="h-10 rounded-full bg-blue-600 text-white px-6 text-sm font-bold">Save</button><button onClick={() => setEditingId(null)} className="h-10 rounded-full border border-zinc-700 px-6 text-sm">Cancel</button></div>
              </div>
            ) : (
              <>
                <div className="h-10 w-10 shrink-0 rounded-full bg-white text-black grid place-items-center">📝</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm leading-tight">{n.title}</p>
                  {n.details && <p className="text-[13px] text-zinc-400 mt-1 line-clamp-3">{n.details}</p>}
                  <p className="text-[11px] text-zinc-500 mt-2">{formatDateTime(n.created_at)}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                  <button onClick={() => { setEditingId(n.id); setEditTitle(n.title); setEditDetails(n.details || "") }} className="h-10 w-10 grid place-items-center rounded-full bg-zinc-800 border border-zinc-700">✎</button>
                  <button onClick={() => onDelete(n.id)} className="h-10 w-10 grid place-items-center rounded-full bg-red-950/40 border border-red-900 text-red-400">✕</button>
                </div>
              </>
            )}
          </div>
        ))}
        {notes.length===0 && <div className="rounded-[20px] border border-dashed border-zinc-800 p-10 text-center text-sm text-zinc-500">No notes found. Add one above.</div>}
      </div>
    </>
  )
}
