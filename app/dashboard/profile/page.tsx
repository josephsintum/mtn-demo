"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { ArrowLeft, Bell, Key, Loader2, Save, User } from "lucide-react"
import Link from "next/link"

export default function ProfileSettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
  })

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    certificateUpdates: true,
    verificationAlerts: true,
    marketingEmails: false,
  })

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // Populate form with user data
    if (user) {
      setProfileForm({
        name: user.name || "",
        email: user.email || "",
        phone: "+237 6XX XXX XXX",
        company: "Acme Corp",
        jobTitle: "Marketing Specialist",
      })
    }
  }, [user, router, toast])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would update the profile via API
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API delay

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "The passwords you entered do not match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would update the password via API
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API delay

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
        variant: "default",
      })

      // Reset form
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast({
        title: "Error updating password",
        description: "There was an error updating your password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would update notification settings via API
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API delay

      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been updated successfully.",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error updating settings",
        description: "There was an error updating your notification settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="outline" className="border-mtn-gray text-white hover:bg-mtn-gray mb-4" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tighter">Profile Settings</h1>
          <p className="text-gray-400 mt-1">Manage your account information and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-mtn-black mb-8">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
            >
              <User className="h-4 w-4 mr-1" />
              Profile Information
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
            >
              <Key className="h-4 w-4 mr-1" />
              Password
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
            >
              <Bell className="h-4 w-4 mr-1" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-mtn-gray border-mtn-gray">
              <form onSubmit={handleProfileSubmit}>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      className="bg-mtn-black border-mtn-gray"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="bg-mtn-black border-mtn-gray"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      className="bg-mtn-black border-mtn-gray"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        name="company"
                        className="bg-mtn-black border-mtn-gray"
                        value={profileForm.company}
                        onChange={handleProfileChange}
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title (Optional)</Label>
                      <Input
                        id="jobTitle"
                        name="jobTitle"
                        className="bg-mtn-black border-mtn-gray"
                        value={profileForm.jobTitle}
                        onChange={handleProfileChange}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card className="bg-mtn-gray border-mtn-gray">
              <form onSubmit={handlePasswordSubmit}>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      className="bg-mtn-black border-mtn-gray"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      className="bg-mtn-black border-mtn-gray"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="bg-mtn-black border-mtn-gray"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                    <h3 className="font-medium mb-2">Password Requirements</h3>
                    <ul className="text-sm text-gray-400 list-disc pl-5 space-y-1">
                      <li>Minimum 8 characters</li>
                      <li>At least one uppercase letter</li>
                      <li>At least one lowercase letter</li>
                      <li>At least one number</li>
                      <li>At least one special character</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Key className="mr-2 h-4 w-4" />
                        Update Password
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-mtn-gray border-mtn-gray">
              <form onSubmit={handleNotificationSubmit}>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-gray-400">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      <p className="text-sm text-gray-400">Receive notifications via SMS</p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("smsNotifications", checked)}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="border-t border-mtn-gray pt-6">
                    <h3 className="font-medium mb-4">Notification Types</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="certificateUpdates">Certificate Updates</Label>
                          <p className="text-sm text-gray-400">
                            Notifications about new certificates or changes to existing ones
                          </p>
                        </div>
                        <Switch
                          id="certificateUpdates"
                          checked={notificationSettings.certificateUpdates}
                          onCheckedChange={(checked) => handleNotificationChange("certificateUpdates", checked)}
                          disabled={isLoading}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="verificationAlerts">Verification Alerts</Label>
                          <p className="text-sm text-gray-400">Notifications when someone verifies your certificate</p>
                        </div>
                        <Switch
                          id="verificationAlerts"
                          checked={notificationSettings.verificationAlerts}
                          onCheckedChange={(checked) => handleNotificationChange("verificationAlerts", checked)}
                          disabled={isLoading}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketingEmails">Marketing Emails</Label>
                          <p className="text-sm text-gray-400">Promotional emails about new features and services</p>
                        </div>
                        <Switch
                          id="marketingEmails"
                          checked={notificationSettings.marketingEmails}
                          onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Preferences
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
