
import { Outlet } from 'react-router-dom'
import { useSidebar } from '../context/SidebarContext'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const MainLayout = () => {
  const { isOpen } = useSidebar()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <header className="fixed left-0 top-0 z-20 w-full">
        <Navbar />
      </header>

      <Sidebar />

      <main
        className={`fixed bottom-0 right-0 top-[50px] z-0 flex items-center justify-center overflow-auto p-6 transition-all duration-300 ease-in-out ${
          isOpen ? 'left-64' : 'left-24'
        }`}
      >
        <section className="flex h-full w-full max-w-6xl items-center justify-center">
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export default MainLayout
