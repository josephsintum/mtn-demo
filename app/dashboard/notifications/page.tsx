"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { ArrowLeft, Bell, Check, Eye, Loader2 } from "lucide-react"
import Link from "next/link"

// Mock notification data
const mockNotifications = [
  {
    id: "1",
    title: "Certificate Verified",
    message: "Your Digital Marketing Fundamentals Certificate was verified by Acme Corp.",
    date: "2025-03-30T10:45:00Z",
    read: false,
    type: "verification",
  },
  {
    id: "2",
    title: "New Certificate Issued",
    message: "You have received a new certificate: Project Management Essentials.",
    date: "2025-03-28T14:20:00Z",
    read: true,
    type: "certificate",
  },
  {
    id: "3",
    title: "Account Login",
    message: "New login detected from Douala, Cameroon.",
    date: "2025-03-25T11:30:00Z",
    read: true,
    type: "security",
  },
  {
    id: "4",
    title: "Certificate Expiring Soon",
    message: "Your Telecommunications Basics certificate will expire in 30 days.",
    date: "2025-03-20T09:10:00Z",
    read: false,
    type: "certificate",
  },
  {
    id: "5",
    title: "Profile Updated",
    message: "Your profile information has been updated successfully.",
    date: "2025-03-15T16:45:00Z",
    read: true,
    type: "account",
  },
]

export default function NotificationCenterPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState<typeof mockNotifications>([])
  const [filter, setFilter] = useState("all")

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

    // Fetch notifications (mock data for demo)
    const fetchNotifications = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
        setNotifications(mockNotifications)
      } catch (error) {
        console.error("Error fetching notifications:", error)
        toast({
          title: "Error",
          description: "Failed to load notifications. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [user, router, toast])

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )

    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
      variant: "default",
    })
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))

    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
      variant: "default",
    })
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date)
    }
  }

  // Filter notifications
  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
        ? notifications.filter((notification) => !notification.read)
        : notifications.filter((notification) => notification.type === filter)

  // Count unread notifications
  const unreadCount = notifications.filter((notification) => !notification.read).length

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">Notification Center</h1>
              <p className="text-gray-400 mt-1">
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                  : "All caught up!"}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="outline"
                className="border-mtn-gray text-white hover:bg-mtn-gray"
                onClick={handleMarkAllAsRead}
              >
                <Check className="mr-2 h-4 w-4" />
                Mark All as Read
              </Button>
            )}
          </div>
        </div>

        <div className="flex overflow-x-auto pb-2 mb-6">
          <div className="flex space-x-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              className={
                filter === "all"
                  ? "bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90"
                  : "border-mtn-gray text-white hover:bg-mtn-gray"
              }
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              size="sm"
              className={
                filter === "unread"
                  ? "bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90"
                  : "border-mtn-gray text-white hover:bg-mtn-gray"
              }
              onClick={() => setFilter("unread")}
            >
              Unread
            </Button>
            <Button
              variant={filter === "certificate" ? "default" : "outline"}
              size="sm"
              className={
                filter === "certificate"
                  ? "bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90"
                  : "border-mtn-gray text-white hover:bg-mtn-gray"
              }
              onClick={() => setFilter("certificate")}
            >
              Certificates
            </Button>
            <Button
              variant={filter === "verification" ? "default" : "outline"}
              size="sm"
              className={
                filter === "verification"
                  ? "bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90"
                  : "border-mtn-gray text-white hover:bg-mtn-gray"
              }
              onClick={() => setFilter("verification")}
            >
              Verifications
            </Button>
            <Button
              variant={filter === "security" ? "default" : "outline"}
              size="sm"
              className={
                filter === "security"
                  ? "bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90"
                  : "border-mtn-gray text-white hover:bg-mtn-gray"
              }
              onClick={() => setFilter("security")}
            >
              Security
            </Button>
            <Button
              variant={filter === "account" ? "default" : "outline"}
              size="sm"
              className={
                filter === "account"
                  ? "bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90"
                  : "border-mtn-gray text-white hover:bg-mtn-gray"
              }
              onClick={() => setFilter("account")}
            >
              Account
            </Button>
          </div>
        </div>

        <Card className="bg-mtn-gray border-mtn-gray">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              {filter === "all"
                ? "All notifications"
                : filter === "unread"
                  ? "Unread notifications"
                  : `${filter.charAt(0).toUpperCase() + filter.slice(1)} notifications`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-mtn-yellow" />
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-mtn-black p-4 mb-4">
                  <Bell className="h-8 w-8 text-mtn-yellow" />
                </div>
                <h3 className="text-xl font-medium mb-2">No notifications</h3>
                <p className="text-gray-400 text-center max-w-md">
                  {filter === "all"
                    ? "You don't have any notifications yet."
                    : filter === "unread"
                      ? "You don't have any unread notifications."
                      : `You don't have any ${filter} notifications.`}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex gap-4 p-4 rounded-lg ${
                      notification.read ? "bg-mtn-black" : "bg-mtn-black/70 border-l-4 border-mtn-yellow"
                    }`}
                  >
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notification.type === "certificate"
                          ? "bg-blue-500/10"
                          : notification.type === "verification"
                            ? "bg-green-500/10"
                            : notification.type === "security"
                              ? "bg-red-500/10"
                              : "bg-purple-500/10"
                      }`}
                    >
                      <Bell
                        className={`h-5 w-5 ${
                          notification.type === "certificate"
                            ? "text-blue-500"
                            : notification.type === "verification"
                              ? "text-green-500"
                              : notification.type === "security"
                                ? "text-red-500"
                                : "text-purple-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{notification.title}</h3>
                        <span className="text-xs text-gray-400">{formatDate(notification.date)}</span>
                      </div>
                      <p className="text-sm text-gray-400">{notification.message}</p>
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex gap-2">
                          {notification.type === "certificate" && (
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="h-8 border-mtn-gray text-white hover:bg-mtn-gray"
                            >
                              <Link href="/dashboard/certificates">
                                <Eye className="mr-2 h-4 w-4" />
                                View Certificate
                              </Link>
                            </Button>
                          )}
                          {notification.type === "verification" && (
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="h-8 border-mtn-gray text-white hover:bg-mtn-gray"
                            >
                              <Link href="/dashboard/certificates">
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </Button>
                          )}
                        </div>
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 text-gray-400 hover:text-white"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-gray-400">
              Showing {filteredNotifications.length} of {notifications.length} notifications
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
