'use client'
type Props = {
  search: string
  setSearch: (v: string) => void
  allTags: string[]
  selectedTag: string | null
  setSelectedTag: (v: string | null) => void
  activeView: string
  setActiveView: (v: any) => void
  userEmail: string
  onSignOut: () => void
}

function NavBtn({ id, label, icon, activeView, setActiveView }: any) {
  const active = activeView === id
  return (
    <button onClick={() => setActiveView(id)}
      className={`w-full flex items-center gap-3 px-5 h-12 rounded-full text-sm font-medium transition ${active? 'bg-white text-black shadow-lg' : 'hover:bg-zinc-800 text-zinc-400'}`}>
      <span>{icon}</span>{label}
    </button>
  )
}

export function DesktopSidebar({ search, setSearch, allTags, selectedTag, setSelectedTag, activeView, setActiveView, userEmail, onSignOut }: Props) {
  return (
    <aside className="hidden lg:flex w-72 shrink-0 sticky top-0 h-screen flex-col bg-zinc-900 border-r border-zinc-800">
      <div className="p-5 font-black text-lg tracking-tight">Webtech</div>

      <div className="px-4 pb-4">
        <div className="flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-950 px-5 h-12">
          <span className="text-zinc-500">⌕</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-full bg-transparent outline-none text-sm placeholder:text-zinc-500" />
        </div>
      </div>

      <div className="px-3 space-y-2">
        <NavBtn id="home" icon="🏠" label="Home" activeView={activeView} setActiveView={setActiveView} />
        <NavBtn id="notes" icon="📝" label="My Notes" activeView={activeView} setActiveView={setActiveView} />
        <NavBtn id="todos" icon="✓" label="To-Do List" activeView={activeView} setActiveView={setActiveView} />
        <NavBtn id="customers" icon="👥" label="Customers" activeView={activeView} setActiveView={setActiveView} />
        <NavBtn id="info" icon="ℹ️" label="App Info" activeView={activeView} setActiveView={setActiveView} />
      </div>

      <div className="p-5 flex-1 overflow-auto">
        <p className="text- font-bold tracking-[0.2em] text-zinc-500 uppercase mb-3">Tags</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setSelectedTag(null)} className={`rounded-full px-4 h-8 text-xs border ${!selectedTag? 'bg-white text-black border-white' : 'border-zinc-700 text-zinc-400'}`}>All</button>
          {allTags.map(t => (
            <button key={t} onClick={() => setSelectedTag(t === selectedTag? null : t)} className={`rounded-full px-4 h-8 text-xs border ${selectedTag === t? 'bg-white text-black border-white' : 'border-zinc-700 text-zinc-400'}`}>#{t}</button>
          ))}
        </div>
      </div>

      <div className="p-4 mt-auto border-t border-zinc-800">
        <div className="rounded-full border border-zinc-800 bg-zinc-950 p-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white text-black grid place-items-center font-bold text-sm">{userEmail?.[0]?.toUpperCase()}</div>
          <div className="flex-1 min-w-0"><p className="text-xs font-medium truncate">{userEmail}</p><p className="text- flex items-center gap-1.5 text-zinc-500"><span className="h-1.5 w-1.5 rounded-full bg-green-500" />online</p></div>
        </div>
        <button onClick={onSignOut} className="w-full mt-3 rounded-full h-10 text-xs font-medium border border-zinc-800 hover:bg-zinc-800 transition">↪ Sign out</button>
      </div>
    </aside>
  )
}