import axios from 'axios'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AuthContext = createContext(null)

const API_URL = 'http://localhost:7000'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser')

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('authUser')
      }
    }

    setLoading(false)
  }, [])

  const login = async (email, password) => {
    setError('')

    try {
      const response = await axios.post(`${API_URL}/api/auth/userLogin`, { email, password })
      const authUser = response.data?.user

      if (!response.data?.success || !authUser) {
        throw new Error(response.data?.message || 'Falha ao autenticar o usuário.')
      }

      setUser(authUser)
      localStorage.setItem('authUser', JSON.stringify(authUser))

      return response.data
    } catch (err) {
      const message = err.response?.data?.message || 'Falha ao autenticar o usuário.'
      setError(message)
      throw new Error(message)
    }
  }

  const register = async (name, email, password, confirmPassword) => {
    setError('')

    try {
      const response = await axios.post(`${API_URL}/api/auth/userRegister`, {
        name,
        email,
        password,
        confirmPassword,
      })

      if (!response.data?.user) {
        throw new Error(response.data?.message || 'Falha ao cadastrar o usuário.')
      }

      return response.data
    } catch (err) {
      const message = err.response?.data?.message || 'Falha ao cadastrar o usuário.'
      setError(message)
      throw new Error(message)
    }
  }

  const logout = async () => {
    setError('')

    try {
      await axios.post(`${API_URL}/api/auth/userLogout`)
    } catch {
      // keep logout flow even if the server request fails
    }

    setUser(null)
    localStorage.removeItem('authUser')
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, loading, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export const ProtectedRoute = () => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Verificando autenticação...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
