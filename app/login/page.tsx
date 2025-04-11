"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const { t } = useLanguage()
  const { toast } = useToast()

  // Add this function to set a cookie for authentication
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  }

  // Update the handleSubmit function to set a cookie
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password)

      if (success) {
        // Set authentication cookie
        setCookie("mtn_auth", "authenticated", 7) // 7 days

        toast({
          title: "Login successful",
          description: "You have been logged in successfully.",
          variant: "default",
        })

        // Retrieve the user from localStorage to check role
        const storedUser = localStorage.getItem("mtn_user")
        if (storedUser) {
          const user = JSON.parse(storedUser)

          // Redirect based on role
          if (user.role === "admin") {
            router.push("/admin/dashboard")
          } else {
            router.push("/dashboard")
          }
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card className="bg-mtn-gray border-mtn-gray">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">{t("login.heading")}</CardTitle>
            <CardDescription>{t("login.subheading")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("login.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m.example@email.com"
                  required
                  className="bg-mtn-black border-mtn-gray"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t("login.password")}</Label>
                  <Link href="/forgot-password" className="text-sm text-mtn-yellow hover:underline">
                    {t("login.forgotPassword")}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-mtn-black border-mtn-gray"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={isLoading}
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  {t("login.rememberMe")}
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  t("button.login")
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-400">
                {t("login.noAccount")}{" "}
                <Link href="/register" className="text-mtn-yellow hover:underline">
                  {t("button.register")}
                </Link>
              </p>
            </div>
            <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4 text-center">
              <h3 className="font-semibold mb-2">Demo Instructions</h3>
              <p className="text-sm text-gray-400 mb-3">
                For demo purposes, enter any email and password. If the email contains "admin", you'll be logged in as
                an administrator.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
