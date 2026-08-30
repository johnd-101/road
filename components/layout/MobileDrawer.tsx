'use client'
export function MobileDrawer({ isOpen, onClose, search, setSearch, allTags, selectedTag, setSelectedTag, activeView, setActiveView, onSignOut }: any) {
  return (
    <>
      {isOpen && <div onClick={onClose} className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm" />}
      <aside className={`lg:hidden fixed inset-y-0 left-0 z-40 w-[84%] max-w- bg-zinc-900 border-r border-zinc-800 flex flex-col transition-transform duration-300 ${isOpen? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 flex items-center justify-between"><span className="font-black">my notes.</span><button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-full border border-zinc-800">✕</button></div>

        <div className="px-4 pb-4">
          <div className="flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-950 px-5 h-12">
            <span className="text-zinc-500">⌕</span>
            <input value={search} onChange={(e: any) => setSearch(e.target.value)} placeholder="Search..." className="w-full bg-transparent outline-none text-sm placeholder:text-zinc-500" />
          </div>
        </div>

        <div className="px-3 space-y-2">
          {[
            { id: 'home', label: 'Home', icon: '🏠' },
            { id: 'notes', label: 'My Notes', icon: '📝' },
            { id: 'todos', label: 'To-Do List', icon: '✓' },
            { id: 'customers', label: 'Customers', icon: '👥' },
            { id: 'info', label: 'App Info', icon: 'ℹ️' },
          ].map(item => (
            <button key={item.id} onClick={() => { setActiveView(item.id); onClose() }} className={`w-full flex items-center gap-3 px-5 h-12 rounded-full text-sm font-medium transition ${activeView === item.id? 'bg-white text-black shadow-lg' : 'text-zinc-400 hover:bg-zinc-800'}`}><span>{item.icon}</span>{item.label}</button>
          ))}
        </div>

        <div className="p-5 flex-1 overflow-auto">
          <p className="text- font-bold tracking-[0.2em] text-zinc-500 uppercase mb-3">Tags</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedTag(null)} className={`rounded-full px-4 h-8 text-xs border ${!selectedTag? 'bg-white text-black border-white' : 'border-zinc-700 text-zinc-400'}`}>All</button>
            {allTags.map((t: string) => (
              <button key={t} onClick={() => setSelectedTag(t === selectedTag? null : t)} className={`rounded-full px-4 h-8 text-xs border ${selectedTag === t? 'bg-white text-black border-white' : 'border-zinc-700 text-zinc-400'}`}>#{t}</button>
            ))}
          </div>
        </div>

        <div className="p-4 mt-auto border-t border-zinc-800"><button onClick={onSignOut} className="w-full rounded-full h-11 text-sm border border-zinc-800 hover:bg-zinc-800 transition">Sign out</button></div>
      </aside>
    </>
  )
}