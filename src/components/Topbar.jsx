import { Bell, Search } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-6">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search learners, tutors, call IDs…"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications">
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand">
            JP
          </div>
          <div className="hidden text-sm leading-tight sm:block">
            <p className="font-semibold text-slate-800">Jalaj Pathak</p>
            <p className="text-xs text-slate-500">QA Lead</p>
          </div>
        </div>
      </div>
    </header>
  )
}
