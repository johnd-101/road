'use client'
import { useState, useMemo } from 'react'

export function TodosView({ todos, onAdd, onToggle, onDelete, todoFilter, setTodoFilter }: any) {
  const [task, setTask] = useState("")
  const [priority, setPriority] = useState("medium")
  const [dueDate, setDueDate] = useState("")
  const [localFilter, setLocalFilter] = useState<'all'|'active'|'done'>('all')

  // Use parent filter if provided, otherwise local
  const filter = todoFilter?? localFilter
  const setFilter = setTodoFilter?? setLocalFilter

  const filtered = useMemo(() => {
    return todos.filter((t: any) => {
      if (filter === 'active') return!t.completed
      if (filter === 'done' || filter === 'completed') return t.completed
      return true
    })
  }, [todos, filter])

  const remaining = todos.filter((t: any) =>!t.completed).length

  const handleAdd = () => {
    if (!task.trim()) return
    // FIX: pass strings, not an object - this fixes trim() error
    onAdd(task.trim(), "", priority, dueDate || null)
    setTask("")
    setDueDate("")
  }

  return (
    <div className="space-y-6">
      <h2 className="text- font-black">Todo List.</h2>

      <div className="rounded- border border-zinc-800 bg-zinc-900 p-4 flex gap-2 flex-wrap items-center">
        <input
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Add a todo... #tag"
          className="flex-1 min-w- h-12 rounded-full border border-zinc-800 bg-zinc-950 px-6 text-sm outline-none"
        />
        <select value={priority} onChange={e => setPriority(e.target.value)} className="h-12 rounded-full border border-zinc-800 bg-zinc-950 px-4 text-sm">
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="h-12 rounded-full border border-zinc-800 bg-zinc-950 px-4 text-sm [color-scheme:dark]" />
        <button type="button" onClick={handleAdd} className="h-12 px-6 rounded-full bg-white text-black font-bold text-sm">Add</button>
      </div>

      <div className="rounded- border border-zinc-800 bg-zinc-900 p-3 flex justify-between items-center">
        <span className="text-sm text-zinc-400">{remaining} remaining</span>
        <div className="flex gap-1">
          <button onClick={() => setFilter('all')} className={`px-3 h-7 rounded-full text-xs font-bold ${filter === 'all'? 'bg-white text-black' : 'bg-zinc-800 text-zinc-400'}`}>All</button>
          <button onClick={() => setFilter('active')} className={`px-3 h-7 rounded-full text-xs font-bold ${filter === 'active'? 'bg-white text-black' : 'bg-zinc-800 text-zinc-400'}`}>Active</button>
          <button onClick={() => setFilter('done')} className={`px-3 h-7 rounded-full text-xs font-bold ${filter === 'done' || filter === 'completed'? 'bg-white text-black' : 'bg-zinc-800 text-zinc-400'}`}>Done</button>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((t: any) => (
          <div key={t.id} className="rounded- border border-zinc-800 bg-zinc-900 p-3 flex items-center justify-between">
            <label className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer">
              <input type="checkbox" checked={!!t.completed} onChange={() => onToggle(t.id,!t.completed)} className="w-5 h-5 rounded-full accent-white" />
              <span className={`text-sm truncate ${t.completed? 'line-through text-zinc-500' : ''}`}>{t.title || t.task}</span>
              <span className="text- px-2 py-1 rounded-full bg-zinc-800 text-zinc-400 uppercase">{t.priority}</span>
              {t.due_date && <span className="text- text-zinc-500">{new Date(t.due_date).toLocaleDateString()}</span>}
            </label>
            <button onClick={() => onDelete(t.id)} className="h-8 w-8 grid place-items-center rounded-full hover:bg-zinc-800 text-xs text-zinc-500">✕</button>
          </div>
        ))}
        {filtered.length === 0 && <div className="rounded- border border-dashed border-zinc-800 p-8 text-center text-sm text-zinc-500">No todos</div>}
      </div>
    </div>
  )
}