import { createContext, useState, useContext, useEffect } from 'react'
import { api } from '../api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])


  /*const login = (userData) => {
    setUser(userData)
  }*/

  const login = async (email, password) => {
    const data = await api('/auth/login', 'POST', { email, password })
    setUser(data.user)
    setToken(data.token)
    return data
  }

  const signup = async (name, email, password) => {
    const data = await api('/auth/signup', 'POST', { name, email, password })
    setUser(data.user)
    setToken(data.token)
    return data
  }

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}