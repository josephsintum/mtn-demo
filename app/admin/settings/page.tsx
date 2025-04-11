"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { Loader2, Save, Settings, Shield, Mail, Bell } from "lucide-react"

export default function SystemSettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // System settings state
  const [settings, setSettings] = useState({
    siteName: "MTN Certificate Authentication System",
    siteDescription: "Verify MTN Cameroon Professional Certificates",
    emailSender: "noreply@mtncerts.com",
    emailFooter: "© 2025 MTN Cameroon. All rights reserved.",
    defaultLanguage: "en",
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    maintenanceMode: false,
    verificationRequiresLogin: false,
    maxLoginAttempts: "5",
    sessionTimeout: "60",
    certificateExpiryNotification: "30",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    try {
      // In a real app, this would save settings to the backend
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API delay

      toast({
        title: "Settings saved",
        description: "System settings have been updated successfully.",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "There was an error saving the settings. Please try again.",
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
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">System Settings</h1>
            <p className="text-gray-400 mt-1">Configure and manage system-wide settings</p>
          </div>
          <Button
            onClick={handleSaveSettings}
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
                Save Settings
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-mtn-black mb-8">
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
            >
              <Settings className="h-4 w-4 mr-1" />
              General
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
            >
              <Bell className="h-4 w-4 mr-1" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="email"
              className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
            >
              <Mail className="h-4 w-4 mr-1" />
              Email
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
            >
              <Shield className="h-4 w-4 mr-1" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="bg-mtn-gray border-mtn-gray">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure basic system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      name="siteName"
                      className="bg-mtn-black border-mtn-gray"
                      value={settings.siteName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Input
                      id="siteDescription"
                      name="siteDescription"
                      className="bg-mtn-black border-mtn-gray"
                      value={settings.siteDescription}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <Select
                    value={settings.defaultLanguage}
                    onValueChange={(value) => handleSelectChange("defaultLanguage", value)}
                  >
                    <SelectTrigger className="bg-mtn-black border-mtn-gray">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-gray-400">
                      When enabled, the site will display a maintenance message to all users except administrators
                    </p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleSwitchChange("maintenanceMode", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-mtn-gray border-mtn-gray">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure system notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableEmailNotifications">Email Notifications</Label>
                    <p className="text-sm text-gray-400">
                      Send email notifications for certificate issuance, verification, and system events
                    </p>
                  </div>
                  <Switch
                    id="enableEmailNotifications"
                    checked={settings.enableEmailNotifications}
                    onCheckedChange={(checked) => handleSwitchChange("enableEmailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableSMSNotifications">SMS Notifications</Label>
                    <p className="text-sm text-gray-400">
                      Send SMS notifications for important events (requires SMS gateway configuration)
                    </p>
                  </div>
                  <Switch
                    id="enableSMSNotifications"
                    checked={settings.enableSMSNotifications}
                    onCheckedChange={(checked) => handleSwitchChange("enableSMSNotifications", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificateExpiryNotification">Certificate Expiry Notification (days)</Label>
                  <Input
                    id="certificateExpiryNotification"
                    name="certificateExpiryNotification"
                    type="number"
                    className="bg-mtn-black border-mtn-gray"
                    value={settings.certificateExpiryNotification}
                    onChange={handleInputChange}
                  />
                  <p className="text-sm text-gray-400">Number of days before certificate expiry to send notification</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <Card className="bg-mtn-gray border-mtn-gray">
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure email templates and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="emailSender">Email Sender Address</Label>
                  <Input
                    id="emailSender"
                    name="emailSender"
                    type="email"
                    className="bg-mtn-black border-mtn-gray"
                    value={settings.emailSender}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailFooter">Email Footer Text</Label>
                  <Textarea
                    id="emailFooter"
                    name="emailFooter"
                    className="bg-mtn-black border-mtn-gray min-h-[100px]"
                    value={settings.emailFooter}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                  <h3 className="font-medium mb-2">Email Template Variables</h3>
                  <p className="text-sm text-gray-400 mb-2">You can use the following variables in email templates:</p>
                  <ul className="text-sm text-gray-400 list-disc pl-5 space-y-1">
                    <li>{{ recipientName }} - The recipient's full name</li>
                    <li>{{ certificateId }} - The certificate ID</li>
                    <li>{{ issueDate }} - The certificate issue date</li>
                    <li>{{ expiryDate }} - The certificate expiry date</li>
                    <li>{{ verificationLink }} - Link to verify the certificate</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-mtn-gray border-mtn-gray">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure system security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Maximum Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    name="maxLoginAttempts"
                    type="number"
                    className="bg-mtn-black border-mtn-gray"
                    value={settings.maxLoginAttempts}
                    onChange={handleInputChange}
                  />
                  <p className="text-sm text-gray-400">
                    Number of failed login attempts before account is temporarily locked
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    name="sessionTimeout"
                    type="number"
                    className="bg-mtn-black border-mtn-gray"
                    value={settings.sessionTimeout}
                    onChange={handleInputChange}
                  />
                  <p className="text-sm text-gray-400">Time of inactivity before user is automatically logged out</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="verificationRequiresLogin">Verification Requires Login</Label>
                    <p className="text-sm text-gray-400">
                      When enabled, users must be logged in to verify certificates
                    </p>
                  </div>
                  <Switch
                    id="verificationRequiresLogin"
                    checked={settings.verificationRequiresLogin}
                    onCheckedChange={(checked) => handleSwitchChange("verificationRequiresLogin", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
