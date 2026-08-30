'use client'
export function BottomNav({ activeView, setActiveView }: any) {
  const items = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'notes', label: 'Notes', icon: '📝' },
    { id: 'todos', label: 'Todos', icon: '✓' },
    { id: 'customers', label: 'Cust.', icon: '👥' },
    { id: 'info', label: 'Info', icon: 'ℹ️' },
  ]
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-20 bg-zinc-900/90 backdrop-blur border-t border-zinc-800 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 h-16">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex flex-col items-center justify-center gap-1 text- font-bold min-h- ${activeView === item.id ? 'text-white' : 'text-zinc-500'}`}
          >
            <span className={`h-7 w-12 grid place-items-center rounded-full transition-colors ${activeView === item.id ? 'bg-white text-black' : ''}`}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}