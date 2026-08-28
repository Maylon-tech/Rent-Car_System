import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSidebar } from '../context/SidebarContext'

import { FaBars, FaTools } from 'react-icons/fa'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import { FaCarSide, FaPeopleGroup } from 'react-icons/fa6'
import { IoHome } from 'react-icons/io5'
import { IoMdSettings } from 'react-icons/io'
import { MdCarRental } from 'react-icons/md'
import { MdLogout } from 'react-icons/md'

const navItems = [
  {
    name: 'Pagina Inicial',
    path: '/',
    icon: <IoHome />,
  },
  {
    name: 'Alugar Carros',
    path: '/rentCar',
    icon: <MdCarRental />,
  },
  {
    name: 'Carros',
    path: '/carsList',
    icon: <FaCarSide />,
  },
  {
    name: 'Clientes',
    path: '/clientList',
    icon: <FaPeopleGroup />,
  },
  {
    name: 'Servicos',
    path: '/services',
    icon: <FaTools />,
  },
  {
    name: 'Configuracao',
    path: '/settings',
    icon: <IoMdSettings />,
  },
  {
    name: 'Sair',
    path: '/logout',
    icon: <MdLogout />,
  },
]

const Sidebar = () => {
  const { logout } = useAuth()
  const { isOpen, toggleSidebar } = useSidebar()

  const handleLogout = async () => {
    await logout()
    window.location.href = '/login'
  }

  return (
    <aside
      className={`fixed left-0 top-[80px] z-10 h-[calc(100vh-89px)] transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-24'
      } px-4 py-6 shadow-xl`}
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <button
        type="button"
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        onClick={toggleSidebar}
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 focus:outline-none focus:ring-2"
        style={{ color: 'var(--color-gold)', backgroundColor: 'transparent' }}
      >
        {isOpen ? <FaArrowCircleLeft size={22} /> : <FaArrowCircleRight size={22} />}
      </button>

      <nav className="mt-14 flex flex-col gap-3">
        {navItems.map((item) =>
          item.name === 'Sair' ? (
            <button
              key={item.path}
              type="button"
              onClick={handleLogout}
              title={!isOpen ? item.name : ''}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold transition-colors duration-200"
              style={{ color: 'var(--color-gold)', backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {isOpen && <span>{item.name}</span>}
            </button>
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              title={!isOpen ? item.name : ''}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                  isActive ? 'bg-[var(--color-darkblue)]' : 'bg-white/5'
                }`
              }
              style={{ color: 'var(--color-gold)' }}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          ),
        )}
      </nav>
    </aside>
  )
}

export default Sidebar
