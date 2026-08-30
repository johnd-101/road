'use client'
import { useState } from 'react'

export function TodosView({ todos, onAdd, onToggle, onUpdate, onDelete, todoFilter, setTodoFilter }: any) {
  const [title, setTitle] = useState(""); const [details, setDetails] = useState("")
  const [priority, setPriority] = useState('medium'); const [dueDate, setDueDate] = useState("")
  const [editingId, setEditingId] = useState<string|null>(null)

  const completedCount = todos.filter((t:any)=>t.completed).length
  const progress = todos.length? Math.round(completedCount / todos.length * 100) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text- font-black">Todos.</h2>
        <span className="text-sm text-zinc-400">{completedCount}/{todos.length} • {progress}%</span>
      </div>

      <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
        <div className="h-full bg-white transition-all" style={{width: `${progress}%`}} />
      </div>

      {/* Quick Add */}
      <div className="rounded- border border-zinc-800 bg-zinc-900 p-4 space-y-3">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New todo + #tag" className="w-full h-12 rounded-full border border-zinc-800 bg-zinc-950 px-6 text-sm outline-none" />
        <textarea value={details} onChange={e=>setDetails(e.target.value)} placeholder="Details (optional)" className="w-full min-h- rounded- border border-zinc-800 bg-zinc-950 px-6 py-3 text-sm outline-none" />
        <div className="flex gap-2">
          <select value={priority} onChange={e=>setPriority(e.target.value)} className="h-12 rounded-full border border-zinc-800 bg-zinc-950 px-4 text-sm">
            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
          </select>
          <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} className="h-12 rounded-full border border-zinc-800 bg-zinc-950 px-4 text-sm flex-1" />
          <button onClick={()=>{ if(!title.trim()) return; onAdd(title, details, priority, dueDate||null); setTitle(""); setDetails(""); setDueDate("")}} className="h-12 px-6 rounded-full bg-white text-black font-bold text-sm">Add</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all','active','completed'] as const).map(f=>(
          <button key={f} onClick={()=>setTodoFilter(f)} className={`h-10 px-5 rounded-full text-sm font-bold capitalize border ${todoFilter===f? 'bg-white text-black border-white':'border-zinc-800 text-zinc-400'}`}>{f}</button>
        ))}
      </div>

      <div className="grid gap-3">
        {todos.map((t:any)=>(
          <div key={t.id} className={`rounded- border border-zinc-800 bg-zinc-900 p-4 flex gap-3 ${t.completed?'opacity-60':''}`}>
            <button onClick={()=>onToggle(t.id,!t.completed)} className="h-11 w-11 shrink-0 rounded-full border border-zinc-700 grid place-items-center">
              {t.completed && <div className="h-5 w-5 rounded-full bg-white" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`font-bold ${t.completed?'line-through text-zinc-500':''}`}>{t.title}</p>
              {t.details && <p className="text-sm text-zinc-400 mt-1">{t.details}</p>}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`h-6 px-2 rounded-full text- grid place-items-center ${t.priority==='high'?'bg-red-500/20 text-red-400': t.priority==='low'?'bg-green-500/20 text-green-400':'bg-yellow-500/20 text-yellow-400'}`}>{t.priority}</span>
                {t.due_date && <span className="h-6 px-2 rounded-full bg-zinc-800 text- grid place-items-center">{new Date(t.due_date).toLocaleDateString()}</span>}
                {t.tags?.map((tag:string)=><span key={tag} className="h-6 px-2 rounded-full bg-zinc-800 text-">#{tag}</span>)}
              </div>
            </div>
            <button onClick={()=>onDelete(t.id)} className="h-11 w-11 shrink-0 rounded-full border border-zinc-800 text-zinc-500">✕</button>
          </div>
        ))}
        {todos.length===0 && <div className="rounded- border border-dashed border-zinc-800 p-10 text-center text-zinc-500 text-sm">No todos. Add your first one above.</div>}
      </div>
    </div>
  )
}