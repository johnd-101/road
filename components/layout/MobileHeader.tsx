'use client'
export function MobileHeader({ onMenu, email }: { onMenu: () => void, email: string }) {
  return (
    <header className="lg:hidden sticky top-0 z-20 flex items-center justify-between px-4 h-14 bg-zinc-900/90 backdrop-blur border-b border-zinc-800">
      <button onClick={onMenu} className="h-10 w-10 grid place-items-center rounded-full bg-zinc-800">☰</button>
      <span className="font-black tracking-tight">My Notes.</span>
      <div className="h-8 w-8 rounded-full bg-white text-black grid place-items-center font-bold text-xs">{email?.[0]?.toUpperCase()}</div>
    </header>
  )
}
