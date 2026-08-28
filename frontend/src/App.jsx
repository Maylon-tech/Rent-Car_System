
import './App.css'
import { Route, Routes } from 'react-router-dom'
import CarsList from './pages/CarsList'
import ClientList from './pages/ClientList'
import Home from './pages/Home'
import RentCar from './pages/RentCar'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import MainLayout from './components/MainLayout'
import AuthLayout from './components/AuthLayout'
import Services from './pages/Services'
import Settings from './pages/Settings'
import DarkMode from './pages/DarkMode'
import { AppDataProvider } from './context/AppDataContext'
import { AuthProvider, ProtectedRoute } from './context/AuthContext'
import { SidebarProvider } from './context/SidebarContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SidebarProvider>
          <AppDataProvider>
            <Routes>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/rentCar" element={<RentCar />} />
                  <Route path="/carsList" element={<CarsList />} />
                  <Route path="/clientList" element={<ClientList />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/dark" element={<DarkMode />} />
                </Route>
              </Route>
            </Routes>
          </AppDataProvider>
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

// Encapsular a Rota 'Home - /' == Dashboard em abstraction para outras PiMagnifyingGlass.
