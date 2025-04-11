"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { Loader2, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateUserPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "recipient",
    sendInvitation: true,
    generatePassword: true,
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    // Check if user is admin
    if (user && user.role !== "admin") {
      toast({
        title: "Access denied",
        description: "You do not have permission to access this page.",
        variant: "destructive",
      })
      router.push("/dashboard")
    }
  }, [user, router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.generatePassword && formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "The passwords you entered do not match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would create the user via API
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API delay

      toast({
        title: "User created",
        description: `User ${formData.name} has been created successfully.`,
        variant: "default",
      })

      router.push("/admin/users")
    } catch (error) {
      toast({
        title: "Error creating user",
        description: "There was an error creating the user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user || user.role !== "admin") {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Button variant="outline" className="border-mtn-gray text-white hover:bg-mtn-gray mb-4" asChild>
            <Link href="/admin/users">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Users
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tighter">Create New User</h1>
          <p className="text-gray-400 mt-1">Add a new user to the system</p>
        </div>

        <Card className="bg-mtn-gray border-mtn-gray">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Enter the details for the new user</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className="bg-mtn-black border-mtn-gray"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  className="bg-mtn-black border-mtn-gray"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">User Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleSelectChange("role", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="role" className="bg-mtn-black border-mtn-gray">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="recipient">Certificate Recipient</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-400 mt-1">
                  {formData.role === "admin"
                    ? "Administrators have full access to manage the system."
                    : "Recipients can view and share their certificates."}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sendInvitation">Send Invitation Email</Label>
                  <p className="text-sm text-gray-400">Send an email invitation to the user with login instructions</p>
                </div>
                <Switch
                  id="sendInvitation"
                  checked={formData.sendInvitation}
                  onCheckedChange={(checked) => handleSwitchChange("sendInvitation", checked)}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="generatePassword">Generate Random Password</Label>
                  <p className="text-sm text-gray-400">Automatically generate a secure password for the user</p>
                </div>
                <Switch
                  id="generatePassword"
                  checked={formData.generatePassword}
                  onCheckedChange={(checked) => handleSwitchChange("generatePassword", checked)}
                  disabled={isLoading}
                />
              </div>

              {!formData.generatePassword && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      className="bg-mtn-black border-mtn-gray"
                      value={formData.password}
                      onChange={handleInputChange}
                      required={!formData.generatePassword}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="bg-mtn-black border-mtn-gray"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required={!formData.generatePassword}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                className="border-mtn-gray text-white hover:bg-mtn-gray"
                onClick={() => router.push("/admin/users")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Create User
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
