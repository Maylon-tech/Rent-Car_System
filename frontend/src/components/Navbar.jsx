import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegMoon, FaRegSun } from 'react-icons/fa'
import { IoClose, IoPersonSharp } from 'react-icons/io5'
import { IoMdSettings } from 'react-icons/io'
import { MdLogout } from 'react-icons/md'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    setIsMenuOpen(false)
    navigate('/login')
  }

  return (
    <nav
      className="flex w-full items-center justify-between border-b border-[var(--color-darkblue)] px-6 py-4 shadow-sm"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--color-darkblue)' }}
    >
      <Link
        to="/"
        aria-label="Go to dashboard"
        className="flex items-center"
      >
        <img
          src="/Logo-01.jpg"
          alt="Rent Cars logo"
          className="h-14 w-14 rounded-full border-2 border-[var(--color-darkblue)] object-cover"
        />
      </Link>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          onClick={toggleTheme}
          className="flex h-11 w-11 items-center justify-center rounded-lg transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            backgroundColor: 'var(--btn-bg)',
            color: 'var(--btn-text)',
            borderColor: 'var(--btn-ring)',
          }}
        >
          {isDark ? <FaRegSun size={18} /> : <FaRegMoon size={18} />}
        </button>

        <div className="relative">
          <button
            type="button"
            aria-label="Open user profile"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-lg transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: 'var(--btn-bg)',
              color: 'var(--btn-text)',
              borderColor: 'var(--btn-ring)',
            }}
          >
            <IoPersonSharp size={20} />
          </button>

          <div
            className={`absolute right-0 top-14 z-20 w-56 overflow-hidden rounded-xl border border-white/10 shadow-2xl transition-all duration-300 ${
              isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'
            }`}
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Menu do usuário
              </p>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full p-1 transition hover:bg-white/10"
                style={{ color: 'var(--text-primary)' }}
              >
                <IoClose size={18} />
              </button>
            </div>

            <div className="flex flex-col p-2">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  navigate('/settings')
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-white/10"
                style={{ color: 'var(--text-primary)' }}
              >
                <IoMdSettings size={16} />
                Configurações
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-white/10"
                style={{ color: 'var(--text-primary)' }}
              >
                <MdLogout size={16} />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
