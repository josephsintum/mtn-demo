"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!loading) {
      console.log("Protected route check - User:", user)
      console.log("Protected route check - Admin only:", adminOnly)

      if (!user) {
        console.log("No user found, redirecting to login")
        toast({
          title: "Authentication required",
          description: "Please log in to access this page.",
          variant: "destructive",
        })
        router.push("/login")
      } else if (adminOnly && user.role !== "admin") {
        console.log("User is not admin, redirecting")
        toast({
          title: "Access denied",
          description: "You do not have permission to access this page.",
          variant: "destructive",
        })
        router.push("/dashboard")
      } else {
        console.log("User is authenticated and has proper permissions")
      }
    }
  }, [user, loading, router, toast, adminOnly])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-mtn-yellow mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-400">Please wait while we verify your credentials.</p>
        </div>
      </div>
    )
  }

  if (!user || (adminOnly && user.role !== "admin")) {
    return null
  }

  return <>{children}</>
}
