import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import CallAudit from './pages/CallAudit.jsx'

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar active="call-audit" />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <CallAudit />
        </main>
      </div>
    </div>
  )
}
