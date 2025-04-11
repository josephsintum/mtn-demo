"use client"

import { useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function AdminLoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Add this function to set a cookie for authentication
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  }

  // Use the specific admin credentials
  const adminEmail = "admin@mtncerts.com"
  const password = "Admin1234"

  // Add more debugging
  useEffect(() => {
    const autoLogin = async () => {
      try {
        console.log("Starting auto-login with admin credentials")

        // Auto-login with admin credentials
        const success = await login(adminEmail, password)

        if (success) {
          console.log("Auto-login successful, setting cookie")
          // Set authentication cookie with longer expiration
          setCookie("mtn_auth", "authenticated", 30) // 30 days

          toast({
            title: "Auto-login successful",
            description: "Welcome to the admin portal.",
            variant: "default",
          })

          // Redirect to the new adminPanel page
          router.push("/admin/adminPanel")
        } else {
          console.error("Auto-login failed")
          toast({
            title: "Auto-login failed",
            description: "There was an error with automatic login.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Login error:", error)
        toast({
          title: "Login error",
          description: "An error occurred during login. Please try again.",
          variant: "destructive",
        })
      }
    }

    autoLogin()
  }, [login, router, toast])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-mtn-yellow mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Logging in automatically...</h2>
        <p className="text-gray-400">You will be redirected to the admin dashboard.</p>
      </div>
    </div>
  )
}
