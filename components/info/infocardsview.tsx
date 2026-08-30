'use client'
export function InfoCardsView({ notes, customers, products, tasks, todos, inquiries, todayCount, weekCount }: any) {
  const totalValue = products.reduce((s:any,p:any)=>s+Number(p.price||0),0)
  const doneTasks = tasks.filter((t:any)=>t.is_completed).length
  const activeTodos = todos.filter((t:any)=>!t.is_done).length
  const cards = [
    { title: 'Notes Today', value: todayCount, sub: `${weekCount} this week`, gradient: 'from-white to-zinc-300 text-black' },
    { title: 'Customers', value: customers.length, sub: 'Total saved', gradient: 'from-zinc-800 to-zinc-900 border border-zinc-700' },
    { title: 'Products', value: products.length, sub: `$${totalValue} inventory value`, gradient: 'from-violet-500 to-indigo-600' },
    { title: 'Tasks', value: `${doneTasks}/${tasks.length}`, sub: `${tasks.length - doneTasks} active`, gradient: 'from-emerald-500 to-teal-600' },
    { title: 'To-Dos', value: activeTodos, sub: `${todos.length - activeTodos} completed`, gradient: 'from-orange-500 to-red-500' },
    { title: 'Inquiries', value: inquiries.length, sub: 'Contact messages', gradient: 'from-zinc-800 to-black border border-zinc-700' },
  ]
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black">Info Cards.</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(c=>(
          <div key={c.title} className={`rounded- p-6 bg-gradient-to-br ${c.gradient} min-h- flex flex-col justify-between`}>
            <div><p className="text-sm opacity-70 font-bold tracking-wide">{c.title}</p><p className="text-4xl font-black mt-2">{c.value}</p></div><p className="text-xs opacity-70 mt-4">{c.sub}</p>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded- border border-zinc-800 bg-zinc-900 p-6"><h3 className="font-bold">System Status</h3><div className="mt-4 space-y-2 text-sm text-zinc-400"><p>• Supabase Auth • RLS enabled</p><p>• Tables: notes, customers, products, tasks, todos, inquiries</p><p>• UI: Mobile drawer + Bottom nav + Desktop sidebar</p></div></div>
        <div className="rounded- border border-zinc-800 bg-zinc-900 p-6"><h3 className="font-bold">Pro Tips</h3><div className="mt-4 space-y-2 text-sm text-zinc-400"><p>Use #tags in notes for filtering</p><p>Use slider for quick priority & progress</p><p>Calendar picks due dates for tasks</p></div></div>
      </div>
    </div>
  )
}