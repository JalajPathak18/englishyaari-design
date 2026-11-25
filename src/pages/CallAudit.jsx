import { useMemo, useState } from 'react'
import {
  PhoneCall,
  ClipboardCheck,
  Gauge,
  Flag,
  Search,
  Download,
  Play,
  Check,
  X,
  Clock,
  AlertTriangle,
  Star,
  ChevronRight,
} from 'lucide-react'
import { calls, stats, AUDIT_CRITERIA } from '../data/mockCalls.js'

const STATUS = {
  passed: { label: 'Passed', cls: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
  flagged: { label: 'Flagged', cls: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
  failed: { label: 'Failed', cls: 'bg-rose-50 text-rose-700 ring-rose-600/20' },
  pending: { label: 'Pending', cls: 'bg-slate-100 text-slate-600 ring-slate-500/20' },
}

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'flagged', label: 'Flagged' },
  { id: 'failed', label: 'Failed' },
  { id: 'passed', label: 'Passed' },
]

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
}

function scoreColor(score) {
  if (score >= 80) return 'text-emerald-600'
  if (score >= 60) return 'text-amber-600'
  return 'text-rose-600'
}

function StatusBadge({ status }) {
  const s = STATUS[status]
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${s.cls}`}>
      {s.label}
    </span>
  )
}

function StatCard({ icon: Icon, label, value, hint, tone = 'brand' }) {
  const tones = {
    brand: 'bg-brand-50 text-brand',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    sky: 'bg-sky-50 text-sky-600',
  }
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`grid size-9 place-items-center rounded-xl ${tones[tone]}`}>
          <Icon className="size-[18px]" />
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
    </div>
  )
}

function ScoreRing({ score, pending }) {
  const r = 34
  const c = 2 * Math.PI * r
  const pct = pending ? 0 : score / 100
  const stroke = pending ? '#cbd5e1' : score >= 80 ? '#059669' : score >= 60 ? '#d97706' : '#e11d48'
  return (
    <div className="relative size-20">
      <svg viewBox="0 0 80 80" className="size-20 -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#f1f5f9" strokeWidth="8" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="text-lg font-bold text-slate-900">{pending ? '—' : score}</span>
      </div>
    </div>
  )
}

function CallDetail({ call }) {
  const pending = call.status === 'pending'
  return (
    <aside className="flex flex-col rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-brand">{call.id}</p>
            <h3 className="mt-0.5 text-lg font-bold text-slate-900">{call.topic}</h3>
            <p className="mt-1 text-xs text-slate-500">{call.date}</p>
          </div>
          <StatusBadge status={call.status} />
        </div>

        <div className="mt-5 flex items-center gap-5">
          <ScoreRing score={call.score} pending={pending} />
          <div className="grid flex-1 grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-slate-500">Learner</p>
              <p className="font-semibold text-slate-800">{call.learner.name}</p>
              <p className="text-xs text-slate-500">
                Level {call.learner.level} · {call.learner.city}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Tutor</p>
              <p className="font-semibold text-slate-800">{call.tutor.name}</p>
              <p className="flex items-center gap-1 text-xs text-slate-500">
                <Star className="size-3 fill-amber-400 text-amber-400" /> {call.tutor.rating}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recording */}
      <div className="border-b border-slate-100 p-5">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <button className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white shadow-md shadow-brand/30 hover:bg-brand-800">
            <Play className="size-4 fill-white" />
          </button>
          <div className="flex h-8 flex-1 items-center gap-[3px]">
            {Array.from({ length: 48 }).map((_, i) => (
              <span
                key={i}
                className={`w-full rounded-full ${i < 14 ? 'bg-brand' : 'bg-slate-300'}`}
                style={{ height: `${25 + Math.abs(Math.sin(i * 1.7)) * 75}%` }}
              />
            ))}
          </div>
          <span className="text-xs font-medium tabular-nums text-slate-500">{call.duration}</span>
        </div>
        <div className="mt-3">
          <div className="mb-1 flex justify-between text-xs text-slate-500">
            <span>Learner talk time</span>
            <span className="font-semibold text-slate-700">{call.talkRatio}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-brand" style={{ width: `${call.talkRatio}%` }} />
          </div>
        </div>
      </div>

      {/* Flags */}
      {call.flags.length > 0 && (
        <div className="border-b border-slate-100 p-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">AI flags</p>
          <div className="flex flex-wrap gap-2">
            {call.flags.map((f) => (
              <span key={f} className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                <AlertTriangle className="size-3" /> {f}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Checklist */}
      <div className="border-b border-slate-100 p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Audit checklist</p>
        <ul className="space-y-2">
          {AUDIT_CRITERIA.map((c) => {
            const v = call.checklist[c.id]
            return (
              <li key={c.id} className="flex items-center gap-2.5 text-sm">
                {v === undefined ? (
                  <span className="grid size-5 place-items-center rounded-md border border-slate-300" />
                ) : v ? (
                  <span className="grid size-5 place-items-center rounded-md bg-emerald-500 text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                ) : (
                  <span className="grid size-5 place-items-center rounded-md bg-rose-500 text-white">
                    <X className="size-3.5" strokeWidth={3} />
                  </span>
                )}
                <span className={v === false ? 'text-slate-500' : 'text-slate-700'}>{c.label}</span>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Transcript */}
      <div className="p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Transcript preview</p>
        <div className="space-y-3">
          {call.transcript.map((line, i) => (
            <div key={i} className={`flex gap-2 ${line.who === 'learner' ? 'flex-row-reverse' : ''}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  line.who === 'learner' ? 'rounded-tr-sm bg-brand text-white' : 'rounded-tl-sm bg-slate-100 text-slate-700'
                }`}
              >
                <p>{line.text}</p>
                <p className={`mt-1 text-[10px] ${line.who === 'learner' ? 'text-brand-200' : 'text-slate-400'}`}>
                  {line.who === 'learner' ? call.learner.name : call.tutor.name} · {line.t}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Flag for review
          </button>
          <button className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/30 hover:bg-brand-800">
            {pending ? 'Start audit' : 'Edit audit'}
          </button>
        </div>
      </div>
    </aside>
  )
}

export default function CallAudit() {
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(calls[1].id)

  const counts = useMemo(() => {
    const c = { all: calls.length }
    for (const call of calls) c[call.status] = (c[call.status] || 0) + 1
    return c
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return calls.filter((c) => {
      if (tab !== 'all' && c.status !== tab) return false
      if (!q) return true
      return [c.id, c.learner.name, c.tutor.name, c.topic].some((v) => v.toLowerCase().includes(q))
    })
  }, [tab, query])

  const selected = calls.find((c) => c.id === selectedId) ?? calls[0]

  return (
    <div className="mx-auto max-w-[1400px] p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-1 text-sm text-slate-500">
            Quality <ChevronRight className="size-3.5" /> <span className="text-slate-700">Call Audit</span>
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Call Audit</h1>
          <p className="mt-1 text-sm text-slate-500">Review tutor–learner calls and score them against the EnglishYaari quality rubric.</p>
        </div>
        <div className="flex gap-2">
          <select className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:ring-4 focus:ring-brand-100">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This quarter</option>
          </select>
          <button className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand/30 hover:bg-brand-800">
            <Download className="size-4" /> Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={PhoneCall} label="Total calls" value={stats.totalCalls.toLocaleString('en-IN')} hint="+8.2% vs last week" />
        <StatCard icon={ClipboardCheck} label="Audited" value={stats.audited.toLocaleString('en-IN')} hint={`${Math.round((stats.audited / stats.totalCalls) * 100)}% coverage`} tone="sky" />
        <StatCard icon={Gauge} label="Avg. quality score" value={`${stats.avgScore}`} hint="Target: 80" tone="emerald" />
        <StatCard icon={Flag} label="Flagged calls" value={stats.flagged} hint="Needs QA attention" tone="amber" />
      </div>

      {/* Content */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4">
            <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                    tab === t.id ? 'bg-white text-brand shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t.label}
                  <span className="ml-1.5 text-xs font-medium text-slate-400">{counts[t.id] ?? 0}</span>
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search calls…"
                className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Call</th>
                  <th className="px-4 py-3">Learner</th>
                  <th className="px-4 py-3">Tutor</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => {
                  const active = c.id === selected.id
                  return (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      className={`cursor-pointer transition-colors ${active ? 'bg-brand-50/70' : 'hover:bg-slate-50'}`}
                    >
                      <td className={`px-4 py-3 ${active ? 'border-l-[3px] border-brand' : 'border-l-[3px] border-transparent'}`}>
                        <p className="font-semibold text-slate-800">{c.topic}</p>
                        <p className="text-xs text-slate-500">
                          {c.id} · {c.date}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <span className="grid size-8 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand">
                            {initials(c.learner.name)}
                          </span>
                          <div>
                            <p className="font-medium text-slate-800">{c.learner.name}</p>
                            <p className="text-xs text-slate-500">Level {c.learner.level}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{c.tutor.name}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 tabular-nums text-slate-600">
                          <Clock className="size-3.5 text-slate-400" /> {c.duration}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {c.status === 'pending' ? (
                          <span className="text-slate-400">—</span>
                        ) : (
                          <span className={`font-bold tabular-nums ${scoreColor(c.score)}`}>{c.score}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={c.status} />
                      </td>
                    </tr>
                  )
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-sm text-slate-500">
                      No calls match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
            <span>
              Showing {filtered.length} of {calls.length} calls
            </span>
            <div className="flex gap-1">
              <button className="rounded-lg border border-slate-200 px-3 py-1.5 font-medium hover:bg-slate-50">Previous</button>
              <button className="rounded-lg border border-slate-200 px-3 py-1.5 font-medium hover:bg-slate-50">Next</button>
            </div>
          </div>
        </section>

        <CallDetail call={selected} />
      </div>
    </div>
  )
}
