import {
  LayoutDashboard,
  Users,
  GraduationCap,
  PhoneCall,
  ShieldCheck,
  CreditCard,
  BarChart3,
  Settings,
  LifeBuoy,
} from 'lucide-react'

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'learners', label: 'Learners', icon: Users },
  { id: 'tutors', label: 'Tutors', icon: GraduationCap },
  { id: 'calls', label: 'Calls', icon: PhoneCall },
  { id: 'call-audit', label: 'Call Audit', icon: ShieldCheck, badge: 12 },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
]

const FOOTER = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'support', label: 'Help & Support', icon: LifeBuoy },
]

function NavItem({ item, active }) {
  const Icon = item.icon
  const isActive = item.id === active
  return (
    <a
      href="#"
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
        isActive
          ? 'bg-brand text-white shadow-lg shadow-brand/30'
          : 'text-sidebar-muted hover:bg-sidebar-hover hover:text-white'
      }`}
    >
      <Icon className="size-[18px] shrink-0" strokeWidth={2} />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            isActive ? 'bg-white/20 text-white' : 'bg-brand/20 text-brand-300'
          }`}
        >
          {item.badge}
        </span>
      )}
    </a>
  )
}

export default function Sidebar({ active }) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-sidebar px-4 py-6 md:flex">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="grid size-9 place-items-center rounded-xl bg-brand text-sm font-bold text-white">
          EY
        </div>
        <div>
          <p className="text-base font-bold leading-tight text-white">EnglishYaari</p>
          <p className="text-xs text-sidebar-muted">Admin Console</p>
        </div>
      </div>

      <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-muted/70">
        Menu
      </p>
      <nav className="flex flex-1 flex-col gap-1">
        {NAV.map((item) => (
          <NavItem key={item.id} item={item} active={active} />
        ))}
      </nav>

      <div className="mt-6 flex flex-col gap-1 border-t border-white/10 pt-6">
        {FOOTER.map((item) => (
          <NavItem key={item.id} item={item} active={active} />
        ))}
      </div>
    </aside>
  )
}
