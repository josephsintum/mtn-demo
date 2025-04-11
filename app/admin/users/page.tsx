"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { Edit, Eye, Loader2, Search, Trash2, UserPlus, Users } from "lucide-react"
import Link from "next/link"

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@mtncerts.com",
    role: "admin",
    status: "active",
    lastLogin: "2025-03-30T10:45:00Z",
    createdAt: "2025-01-15T08:30:00Z",
  },
  {
    id: "2",
    name: "John Doe",
    email: "recipient@myemail.com",
    role: "recipient",
    status: "active",
    lastLogin: "2025-03-29T14:20:00Z",
    createdAt: "2025-01-20T09:15:00Z",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "recipient",
    status: "active",
    lastLogin: "2025-03-28T11:30:00Z",
    createdAt: "2025-01-25T10:45:00Z",
  },
  {
    id: "4",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "recipient",
    status: "inactive",
    lastLogin: "2025-03-15T09:10:00Z",
    createdAt: "2025-02-05T14:20:00Z",
  },
  {
    id: "5",
    name: "Bob Williams",
    email: "bob.williams@example.com",
    role: "recipient",
    status: "active",
    lastLogin: "2025-03-27T16:45:00Z",
    createdAt: "2025-02-10T11:30:00Z",
  },
  {
    id: "6",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "recipient",
    status: "suspended",
    lastLogin: "2025-03-10T08:15:00Z",
    createdAt: "2025-02-15T13:45:00Z",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.miller@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2025-03-29T15:30:00Z",
    createdAt: "2025-02-20T09:00:00Z",
  },
]

export default function UserManagementPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<typeof mockUsers>([])
  const [filteredUsers, setFilteredUsers] = useState<typeof mockUsers>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [bulkAction, setBulkAction] = useState("")

  useEffect(() => {
    // Check if user is admin
    if (user && user.role !== "admin") {
      toast({
        title: "Access denied",
        description: "You do not have permission to access this page.",
        variant: "destructive",
      })
      router.push("/dashboard")
      return
    }

    // Fetch users (mock data for demo)
    const fetchUsers = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
        setUsers(mockUsers)
        setFilteredUsers(mockUsers)
      } catch (error) {
        console.error("Error fetching users:", error)
        toast({
          title: "Error",
          description: "Failed to load users. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [user, router, toast])

  useEffect(() => {
    // Apply filters
    let filtered = [...users]

    // Apply role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter)
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.status === statusFilter)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query),
      )
    }

    setFilteredUsers(filtered)
  }, [users, roleFilter, statusFilter, searchQuery])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectUser = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, id])
    } else {
      setSelectedUsers((prev) => prev.filter((userId) => userId !== id))
    }
  }

  const handleBulkAction = async () => {
    if (!bulkAction || selectedUsers.length === 0) return

    setIsLoading(true)

    try {
      // In a real app, this would perform the bulk action via API
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API delay

      let actionText = ""
      switch (bulkAction) {
        case "activate":
          actionText = "activated"
          break
        case "deactivate":
          actionText = "deactivated"
          break
        case "delete":
          actionText = "deleted"
          break
      }

      toast({
        title: "Bulk action completed",
        description: `${selectedUsers.length} users have been ${actionText}.`,
        variant: "default",
      })

      // Reset selection
      setSelectedUsers([])
      setBulkAction("")

      // Refresh users (in a real app, this would fetch updated data)
      // For demo, we'll simulate the changes
      if (bulkAction === "delete") {
        setUsers((prev) => prev.filter((user) => !selectedUsers.includes(user.id)))
      } else {
        setUsers((prev) =>
          prev.map((user) => {
            if (selectedUsers.includes(user.id)) {
              return { ...user, status: bulkAction === "activate" ? "active" : "inactive" }
            }
            return user
          }),
        )
      }
    } catch (error) {
      toast({
        title: "Action failed",
        description: "There was an error performing the bulk action. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (!user || user.role !== "admin") {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">User Management</h1>
            <p className="text-gray-400 mt-1">Manage system users and their permissions</p>
          </div>
          <Button asChild className="bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90">
            <Link href="/admin/users/create">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New User
            </Link>
          </Button>
        </div>

        <Card className="bg-mtn-gray border-mtn-gray">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View and manage all users in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  className="bg-mtn-black border-mtn-gray pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[140px] bg-mtn-black border-mtn-gray">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="recipient">Recipient</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px] bg-mtn-black border-mtn-gray">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Select
                  value={bulkAction}
                  onValueChange={setBulkAction}
                  disabled={selectedUsers.length === 0 || isLoading}
                >
                  <SelectTrigger className="w-[140px] bg-mtn-black border-mtn-gray">
                    <SelectValue placeholder="Bulk Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activate">Activate</SelectItem>
                    <SelectItem value="deactivate">Deactivate</SelectItem>
                    <SelectItem value="delete">Delete</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="border-mtn-gray text-white hover:bg-mtn-gray"
                  onClick={handleBulkAction}
                  disabled={!bulkAction || selectedUsers.length === 0 || isLoading}
                >
                  Apply
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-mtn-yellow" />
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-400">No users found matching your criteria.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-mtn-gray">
                      <th className="text-left py-3 px-4">
                        <div className="flex items-center">
                          <Checkbox
                            checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                            onCheckedChange={handleSelectAll}
                            disabled={filteredUsers.length === 0}
                          />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Last Login</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-mtn-gray">
                        <td className="py-3 px-4">
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                          />
                        </td>
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === "active"
                                ? "bg-green-100 text-green-800"
                                : user.status === "inactive"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">{formatDate(user.lastLogin)}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button asChild size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Link href={`/admin/users/${user.id}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Link>
                            </Button>
                            <Button asChild size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Link href={`/admin/users/${user.id}/edit`}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Link>
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-400">
                {selectedUsers.length > 0 ? (
                  <span>{selectedUsers.length} users selected</span>
                ) : (
                  <span>
                    Showing {filteredUsers.length} of {users.length} users
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-mtn-gray text-white hover:bg-mtn-gray" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="border-mtn-gray text-white hover:bg-mtn-gray" disabled>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
