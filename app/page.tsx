'use client'
import { useState, useEffect, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { DesktopSidebar } from '@/components/layout/DesktopSidebar'
import { MobileHeader } from '@/components/layout/MobileHeader'
import { MobileDrawer } from '@/components/layout/MobileDrawer'
import { BottomNav } from '@/components/layout/BottomNav'
import { DashboardView } from '@/components/dashboard/DashboardView'
import { NotesView } from '@/components/notes/NotesView'
import { CustomersView } from '@/components/customers/CustomersView'
import { TodosView } from '@/components/todos/todoview'

export const dynamic = 'force-dynamic'

export default function Page() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true); const [authError, setAuthError] = useState(""); const [authLoading, setAuthLoading] = useState(false)
  const [notes, setNotes] = useState<any[]>([]); const [customers, setCustomers] = useState<any[]>([]); const [todos, setTodos] = useState<any[]>([])
  const [search, setSearch] = useState(""); const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<'home'|'notes'|'todos'|'customers'|'info'>('home')
  const [todoFilter, setTodoFilter] = useState<'all'|'active'|'completed'>('all')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user?? null)
      setLoading(false)
    })
    const { data: l } = supabase.auth.onAuthStateChange((_e, s) => {
      setUser(s?.user?? null)
      if (!s?.user) {
        setNotes([]); setCustomers([]); setTodos([])
      }
    })
    return () => l.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!user) return
    const fetchAll = async () => {
      const [n, c, t] = await Promise.all([
        supabase.from('notes').select('*').order('created_at', { ascending: false }),
        supabase.from('customers').select('*').order('created_at', { ascending: false }),
        supabase.from('todos').select('*').order('created_at', { ascending: false })
      ])
      if (n.data) setNotes(n.data)
      if (c.data) setCustomers(c.data)
      if (t.data) setTodos(t.data)
    }
    fetchAll()
  }, [user])

  const parseTags = (input: string) => {
    const tagMatches = input.match(/#(\w+)/g) || []
    const tags = tagMatches.map(t => t.slice(1).toLowerCase())
    const cleanTitle = input.replace(/#\w+/g, '').trim()
    return { cleanTitle: cleanTitle || input.trim(), tags }
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true); setAuthError("")
    try {
      const { error } = isLogin
       ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password })
      if (error) setAuthError(error.message)
    } finally {
      setAuthLoading(false)
    }
  }

  const addNote = async (title: string, details: string) => {
    if (!title.trim() ||!user) return
    const { cleanTitle, tags } = parseTags(title)
    const { data, error } = await supabase.from('notes').insert({ title: cleanTitle, details: details.trim() || null, tags, user_id: user.id } as any).select().single()
    if (!error && data) setNotes(p => [data,...p])
  }
  const updateNote = async (id: string, title: string, details: string) => {
    const { data } = await supabase.from('notes').update({ title: title.trim(), details: details.trim() || null } as any).eq('id', id).select().single()
    if (data) setNotes(p => p.map(n => n.id === id? data : n))
  }
  const deleteNote = async (id: string) => {
    const prev = notes
    setNotes(p => p.filter(x => x.id!== id))
    const { error } = await supabase.from('notes').delete().eq('id', id)
    if (error) setNotes(prev)
  }

  const addCustomer = async (f: any) => {
    const { data, error } = await supabase.from('customers').insert({ name: f.name.trim(), email: f.email.trim() || null, phone: f.phone.trim() || null, company: f.company.trim() || null, details: f.details.trim() || null, user_id: user.id } as any).select().single()
    if (!error && data) setCustomers(p => [data,...p])
  }
  const updateCustomer = async (id: string, f: any) => {
    const { data } = await supabase.from('customers').update({ name: f.name.trim(), email: f.email.trim() || null, phone: f.phone.trim() || null, company: f.company.trim() || null, details: f.details.trim() || null } as any).eq('id', id).select().single()
    if (data) setCustomers(p => p.map(c => c.id === id? data : c))
  }
  const deleteCustomer = async (id: string) => {
    const prev = customers
    setCustomers(p => p.filter(x => x.id!== id))
    const { error } = await supabase.from('customers').delete().eq('id', id)
    if (error) setCustomers(prev)
  }

  const addTodo = async (title: string, details: string, priority: string, due_date: string | null) => {
    if (!title.trim() ||!user) return
    const { cleanTitle, tags } = parseTags(title)
    const { data, error } = await supabase.from('todos').insert({ title: cleanTitle, details: details.trim()||null, tags, priority, due_date, user_id: user.id, completed: false } as any).select().single()
    if (!error && data) setTodos(p => [data,...p])
  }
  const toggleTodo = async (id: string, completed: boolean) => {
    const prev = todos
    setTodos(p => p.map(t => t.id===id? {...t, completed}: t))
    const { error } = await supabase.from('todos').update({ completed } as any).eq('id', id)
    if (error) setTodos(prev)
  }
  const updateTodo = async (id: string, f: any) => {
    const { data } = await supabase.from('todos').update(f as any).eq('id', id).select().single()
    if (data) setTodos(p => p.map(t => t.id===id? data : t))
  }
  const deleteTodo = async (id: string) => {
    const prev = todos
    setTodos(p => p.filter(x => x.id!== id))
    const { error } = await supabase.from('todos').delete().eq('id', id)
    if (error) setTodos(prev)
  }

  const allTags = useMemo(() => {
    const s = new Set<string>()
    notes.forEach(n => n.tags?.forEach((t: string) => s.add(t)))
    todos.forEach((t:any)=> t.tags?.forEach((tag:string)=>s.add(tag)))
    return Array.from(s)
  }, [notes, todos])

  const filteredNotes = useMemo(()=> notes.filter(n =>
    (n.title.toLowerCase().includes(search.toLowerCase()) || (n.details || '').toLowerCase().includes(search.toLowerCase())) &&
    (selectedTag? n.tags?.includes(selectedTag) : true)
  ), [notes, search, selectedTag])

  const filteredCustomers = useMemo(()=> customers.filter(c =>
    `${c.name} ${c.email || ''} ${c.company || ''}`.toLowerCase().includes(search.toLowerCase())
  ), [customers, search])

  const filteredTodos = useMemo(()=> todos.filter((t:any)=>{
    const matchesSearch = `${t.title} ${t.details||''}`.toLowerCase().includes(search.toLowerCase())
    const matchesTag = selectedTag? t.tags?.includes(selectedTag) : true
    const matchesFilter = todoFilter==='all'? true : todoFilter==='active'?!t.completed : t.completed
    return matchesSearch && matchesTag && matchesFilter
  }), [todos, search, selectedTag, todoFilter])

  const todayCount = useMemo(() => notes.filter(n => new Date(n.created_at).toDateString() === new Date().toDateString()).length, [notes])
  const weekCount = useMemo(() => { const w = new Date(); w.setDate(w.getDate() - 7); return notes.filter(n => new Date(n.created_at) > w).length }, [notes])

  if (loading) return <main className="min-h-screen grid place-items-center bg-zinc-950"><div className="h-6 w-6 rounded-full border-2 border-zinc-700 border-t-white animate-spin" /></main>

  if (!user) {
    return (
      <main className="min-h-screen grid place-items-center p-4 bg-[#0a0a0b] text-white">
        <div className="w-full max-w-sm rounded- border border-zinc-800 p-6 bg-zinc-900">
          <h1 className="text- font-black">Webtech</h1>
          <p className="text-sm text-zinc-400 mt-1">Capeture • Notes + Todos + Customers</p>
          <form onSubmit={handleAuth} className="mt-8 space-y-3">
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full h-12 rounded-full border border-zinc-800 bg-zinc-950 px-6 text-sm outline-none" />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full h-12 rounded-full border border-zinc-800 bg-zinc-950 px-6 text-sm outline-none" />
            {authError && <p className="text-sm text-red-400">{authError}</p>}
            <button disabled={authLoading} className="w-full h-12 rounded-full bg-white text-black font-bold text-sm disabled:opacity-50">{authLoading? 'Loading...' : isLogin? 'Sign In' : 'Create Account'}</button>
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="w-full h-12 rounded-full border border-zinc-700 text-sm font-bold">{isLogin? 'Create Account' : 'Sign In'}</button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100">
      <MobileHeader onMenu={() => setIsDrawerOpen(true)} email={user.email} />
      <div className="flex">
        <DesktopSidebar search={search} setSearch={setSearch} allTags={allTags} selectedTag={selectedTag} setSelectedTag={setSelectedTag} activeView={activeView} setActiveView={setActiveView as any} userEmail={user.email} onSignOut={() => supabase.auth.signOut()} />
        <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} search={search} setSearch={setSearch} allTags={allTags} selectedTag={selectedTag} setSelectedTag={setSelectedTag} activeView={activeView} setActiveView={setActiveView as any} onSignOut={() => supabase.auth.signOut()} />
        <main className="flex-1 min-w-0">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-28 lg:pb-8">
            {activeView === 'home' && <DashboardView notes={notes} customers={customers} todos={todos} todayCount={todayCount} weekCount={weekCount} />}
            {activeView === 'notes' && <NotesView notes={filteredNotes} onAdd={addNote} onUpdate={updateNote} onDelete={deleteNote} />}
            {activeView === 'todos' && <TodosView todos={filteredTodos} onAdd={addTodo} onToggle={toggleTodo} onUpdate={updateTodo} onDelete={deleteTodo} todoFilter={todoFilter} setTodoFilter={setTodoFilter} />}
            {activeView === 'customers' && <CustomersView customers={filteredCustomers} onAdd={addCustomer} onUpdate={updateCustomer} onDelete={deleteCustomer} />}
            {activeView === 'info' && <div className="rounded- border border-zinc-800 bg-zinc-900 p-6"><h3 className="text-xl font-bold">my notes. v3.0</h3><p className="text-sm text-zinc-400 mt-2">Notes + Customers + Todos • mobile-first • Supabase RLS • #tag parsing</p></div>}
          </div>
        </main>
      </div>
      <BottomNav activeView={activeView} setActiveView={setActiveView as any} />
    </div>
  )
}