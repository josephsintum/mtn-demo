"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "recipient" | null
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: any) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("mtn_user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        console.log("Found stored user:", parsedUser)
        setUser(parsedUser)
      } catch (e) {
        console.error("Error parsing stored user:", e)
      }
    } else {
      console.log("No stored user found")
    }
    setLoading(false)
  }, [])

  // Update the login function to only accept the specific admin credentials
  // Replace the current login function with this implementation:

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

      // Only allow the specific admin credentials
      if (email === "admin@mtncerts.com" && password === "Admin1234") {
        // Create admin user object
        const loggedInUser = {
          id: "admin-001",
          name: "Admin User",
          email: email,
          role: "admin" as const,
        }

        console.log("Admin login successful:", loggedInUser)
        setUser(loggedInUser)
        localStorage.setItem("mtn_user", JSON.stringify(loggedInUser))
        setCookie("mtn_auth", "authenticated", 30)
        return true
      }

      // For regular users (if needed)
      else if (!email.includes("admin")) {
        const loggedInUser = {
          id: Math.random().toString(36).substring(2, 9),
          name: email
            .split("@")[0]
            .replace(/[.+_-]/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          email: email,
          role: "recipient" as const,
        }

        console.log("Recipient login successful:", loggedInUser)
        setUser(loggedInUser)
        localStorage.setItem("mtn_user", JSON.stringify(loggedInUser))
        setCookie("mtn_auth", "authenticated", 30)
        return true
      }

      // Invalid credentials
      console.error("Login failed: Invalid credentials")
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Helper function to set cookie
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  }

  // Register function
  const register = async (userData: any) => {
    setLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

      // Create a new recipient user
      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        name: userData.fullName,
        email: userData.email,
        role: "recipient" as const,
      }

      setUser(newUser)
      localStorage.setItem("mtn_user", JSON.stringify(newUser))

      // Set auth cookie
      setCookie("mtn_auth", "authenticated", 7)

      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Add this function to delete a cookie
  const deleteCookie = (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
  }

  // Update the logout function to clear the cookie
  const logout = () => {
    setUser(null)
    localStorage.removeItem("mtn_user")
    deleteCookie("mtn_auth")
  }

  return <AuthContext.Provider value={{ user, loading, login, logout, register }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
