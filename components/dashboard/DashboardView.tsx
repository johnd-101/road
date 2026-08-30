'use client'
export function DashboardView({ notes, customers, todayCount, weekCount }: any) {
  return (
    <>
      <h1 className="text-[28px] sm:text-3xl font-extrabold tracking-tight">Dashboard</h1>
      <p className="text-sm text-zinc-500 mt-1">{notes.length} notes • {customers.length} customers</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="rounded-[24px] p-5 text-white bg-gradient-to-br from-blue-600 to-indigo-700"><p className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Total Notes</p><p className="text-4xl font-black mt-3">{notes.length}</p><p className="text-xs opacity-70 mt-2">{weekCount} this week</p></div>
        <div className="rounded-[24px] p-5 text-white bg-gradient-to-br from-violet-600 to-fuchsia-700"><p className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Customers</p><p className="text-4xl font-black mt-3">{customers.length}</p></div>
        <div className="rounded-[24px] p-5 text-white bg-gradient-to-br from-emerald-600 to-teal-700"><p className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Today</p><p className="text-4xl font-black mt-3">{todayCount}</p></div>
        <div className="rounded-[24px] p-5 border border-zinc-800 bg-zinc-900"><p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Status</p><div className="flex items-center gap-2 mt-4"><span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" /><p className="text-sm font-bold">Live</p></div></div>
      </div>
    </>
  )
}
