"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  BookOpen,
  Settings,
  ClipboardList,
  Search,
  PlusCircle,
  Download,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for candidates with the requested fields
const mockCandidates = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    age: 28,
    profession: "Software Engineer",
    registrationDate: "2025-01-15",
    certificatesCount: 3,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 32,
    profession: "Marketing Specialist",
    registrationDate: "2025-01-20",
    certificatesCount: 2,
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    age: 24,
    profession: "Data Analyst",
    registrationDate: "2025-02-05",
    certificatesCount: 1,
  },
  {
    id: "4",
    name: "Bob Williams",
    email: "bob.williams@example.com",
    age: 35,
    profession: "Network Administrator",
    registrationDate: "2025-02-10",
    certificatesCount: 4,
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    age: 29,
    profession: "Project Manager",
    registrationDate: "2025-02-15",
    certificatesCount: 0,
  },
]

// Mock data for courses with the requested fields
const mockCourses = [
  {
    id: "1",
    title: "Digital Marketing Fundamentals",
    code: "DMF-101",
    level: "Beginner",
    price: {
      type: "paid",
      amount: 25000,
    },
    description: "Learn the basics of digital marketing",
    duration: "4 weeks",
    enrolledCount: 25,
  },
  {
    id: "2",
    title: "Project Management Essentials",
    code: "PME-201",
    level: "Intermediate",
    price: {
      type: "paid",
      amount: 35000,
    },
    description: "Master project management techniques",
    duration: "6 weeks",
    enrolledCount: 18,
  },
  {
    id: "3",
    title: "Telecommunications Basics",
    code: "TLB-101",
    level: "Beginner",
    price: {
      type: "free",
      amount: 0,
    },
    description: "Introduction to telecommunications",
    duration: "8 weeks",
    enrolledCount: 30,
  },
  {
    id: "4",
    title: "Network Security",
    code: "NSC-301",
    level: "Advanced",
    price: {
      type: "paid",
      amount: 45000,
    },
    description: "Learn network security principles",
    duration: "10 weeks",
    enrolledCount: 15,
  },
  {
    id: "5",
    title: "Cloud Computing",
    code: "CLC-201",
    level: "Intermediate",
    price: {
      type: "free",
      amount: 0,
    },
    description: "Introduction to cloud computing concepts",
    duration: "6 weeks",
    enrolledCount: 22,
  },
]

// Mock data for verification logs
const mockVerificationLogs = [
  {
    id: "1",
    certificateId: "MTN-CERT-1234",
    verifiedBy: "employer@company.com",
    verificationDate: "2025-03-30T10:45:00Z",
    status: "success",
  },
  {
    id: "2",
    certificateId: "MTN-CERT-1235",
    verifiedBy: "recruiter@agency.com",
    verificationDate: "2025-03-29T14:20:00Z",
    status: "success",
  },
  {
    id: "3",
    certificateId: "MTN-CERT-1236",
    verifiedBy: "hr@corporation.com",
    verificationDate: "2025-03-28T11:30:00Z",
    status: "success",
  },
  {
    id: "4",
    certificateId: "MTN-CERT-1240",
    verifiedBy: "unknown@example.com",
    verificationDate: "2025-03-27T09:15:00Z",
    status: "failed",
  },
  {
    id: "5",
    certificateId: "MTN-CERT-1238",
    verifiedBy: "manager@business.com",
    verificationDate: "2025-03-26T16:45:00Z",
    status: "success",
  },
]

export default function AdminPanelPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("candidates")
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null)
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showAddCourseForm, setShowAddCourseForm] = useState(false)

  // Filter candidates based on search query
  const filteredCandidates = mockCandidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.profession.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter courses based on search query
  const filteredCourses = mockCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Format price for display
  const formatPrice = (price: { type: string; amount: number }) => {
    if (price.type === "free") {
      return "Free"
    }
    return `${price.amount.toLocaleString()} CFA`
  }

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <ProtectedRoute adminOnly>
      <div className="flex h-screen bg-black overflow-hidden">
        {/* Side Panel */}
        <div
          className={`${sidebarCollapsed ? "w-16" : "w-64"} bg-gray-800 border-r border-gray-700 flex flex-col transition-all duration-300`}
        >
          <div className={`p-4 border-b border-gray-700 flex ${sidebarCollapsed ? "justify-center" : "items-center"}`}>
            {!sidebarCollapsed && (
              <div className="h-8 flex items-center justify-center">
                <span className="text-yellow-400 font-bold text-lg">MTN Cert</span>
              </div>
            )}
            {sidebarCollapsed && (
              <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold">
                M
              </div>
            )}
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              <Button
                variant={activeTab === "candidates" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "candidates" ? "bg-yellow-400 text-black" : ""}`}
                onClick={() => {
                  setActiveTab("candidates")
                  setSelectedCandidateId(null)
                }}
              >
                <Users className="mr-2 h-5 w-5" />
                {!sidebarCollapsed && "Candidates"}
              </Button>
              <Button
                variant={activeTab === "courses" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "courses" ? "bg-yellow-400 text-black" : ""}`}
                onClick={() => {
                  setActiveTab("courses")
                  setSelectedCourseId(null)
                  setShowAddCourseForm(false)
                }}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                {!sidebarCollapsed && "Courses"}
              </Button>
              <Button
                variant={activeTab === "verification" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "verification" ? "bg-yellow-400 text-black" : ""}`}
                onClick={() => setActiveTab("verification")}
              >
                <ClipboardList className="mr-2 h-5 w-5" />
                {!sidebarCollapsed && "Verification Log"}
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "settings" ? "bg-yellow-400 text-black" : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-5 w-5" />
                {!sidebarCollapsed && "Settings"}
              </Button>
            </nav>
          </div>
          <div className={`p-4 border-t border-gray-700 ${sidebarCollapsed ? "flex justify-center" : ""}`}>
            {!sidebarCollapsed && (
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold">
                    {user?.name?.charAt(0) || "A"}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user?.name || "Admin User"}</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </div>
            )}
            {sidebarCollapsed && (
              <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold">
                {user?.name?.charAt(0) || "A"}
              </div>
            )}
          </div>
          {/* Sidebar toggle button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-1/2 -right-3 h-6 w-6 rounded-full bg-gray-700 border border-gray-700 p-0"
            onClick={toggleSidebar}
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-gray-800 border-b border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">
                {activeTab === "candidates" && "Candidate Management"}
                {activeTab === "courses" && "Course Management"}
                {activeTab === "verification" && "Verification Log"}
                {activeTab === "settings" && "System Settings"}
              </h1>
              <div className="flex items-center space-x-2">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    className="pl-8 bg-gray-900 border-gray-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                {activeTab === "courses" && !selectedCourseId && !showAddCourseForm && (
                  <Button
                    className="bg-yellow-400 text-black hover:bg-yellow-500"
                    onClick={() => setShowAddCourseForm(true)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Course
                  </Button>
                )}
                {activeTab === "candidates" && !selectedCandidateId && (
                  <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-700">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 bg-black">
            {/* Candidates Tab */}
            {activeTab === "candidates" && !selectedCandidateId && (
              <div>
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Age
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Profession
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Registration Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Certificates
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {filteredCandidates.map((candidate) => (
                        <tr key={candidate.id} className="hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{candidate.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{candidate.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{candidate.age}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{candidate.profession}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{formatDate(candidate.registrationDate)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{candidate.certificatesCount}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedCandidateId(candidate.id)}
                              className="text-yellow-400 hover:text-yellow-300"
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Candidate Details */}
            {activeTab === "candidates" && selectedCandidateId && (
              <div>
                <div className="mb-6 flex items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCandidateId(null)}
                    className="mr-4 border-gray-700 text-white hover:bg-gray-700"
                  >
                    Back to Candidates
                  </Button>
                  <h2 className="text-xl font-bold">
                    {mockCandidates.find((c) => c.id === selectedCandidateId)?.name} - Certificates
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Mock certificates for the selected candidate */}
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="bg-gray-800 border-gray-700 overflow-hidden">
                      <div className="p-4 border-b border-gray-700">
                        <h3 className="font-bold mb-1">Digital Marketing Fundamentals</h3>
                        <p className="text-sm text-gray-400 mb-2">Certificate ID: MTN-CERT-123{i}</p>
                        <p className="text-sm text-gray-400">Issued: Jan 15, 2025</p>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-end mt-4">
                          <Button size="sm" variant="outline" className="mr-2 border-gray-700">
                            <FileText className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-700">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === "courses" && !selectedCourseId && !showAddCourseForm && (
              <div>
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Course Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Course Code
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Level
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Enrolled
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {filteredCourses.map((course) => (
                        <tr key={course.id} className="hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{course.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{course.code}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{course.level}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{formatPrice(course.price)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{course.enrolledCount} candidates</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedCourseId(course.id)}
                              className="text-yellow-400 hover:text-yellow-300 mr-2"
                            >
                              View Details
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400">
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Add Course Form */}
            {activeTab === "courses" && showAddCourseForm && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Add New Course</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Course Title</Label>
                      <Input id="title" placeholder="Enter course title" className="bg-gray-900 border-gray-700" />
                    </div>
                    <div>
                      <Label htmlFor="code">Course Code</Label>
                      <Input id="code" placeholder="e.g. DMF-101" className="bg-gray-900 border-gray-700" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="level">Level</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-900 border-gray-700">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="price-type">Price Type</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-900 border-gray-700">
                          <SelectValue placeholder="Select price type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="price">Price (CFA)</Label>
                      <Input id="price" type="number" placeholder="0" className="bg-gray-900 border-gray-700" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter course description"
                      className="bg-gray-900 border-gray-700"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input id="duration" placeholder="e.g. 6 weeks" className="bg-gray-900 border-gray-700" />
                    </div>
                    <div>
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input id="start-date" type="date" className="bg-gray-900 border-gray-700" />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      variant="outline"
                      className="border-gray-700 text-white hover:bg-gray-700"
                      onClick={() => setShowAddCourseForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Add Course</Button>
                  </div>
                </form>
              </div>
            )}

            {/* Course Details */}
            {activeTab === "courses" && selectedCourseId && (
              <div>
                <div className="mb-6 flex items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCourseId(null)}
                    className="mr-4 border-gray-700 text-white hover:bg-gray-700"
                  >
                    Back to Courses
                  </Button>
                  <h2 className="text-xl font-bold">{mockCourses.find((c) => c.id === selectedCourseId)?.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">Course Details</h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-400">Course Code</p>
                          <p>{mockCourses.find((c) => c.id === selectedCourseId)?.code}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Level</p>
                          <p>{mockCourses.find((c) => c.id === selectedCourseId)?.level}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Price</p>
                          <p>
                            {formatPrice(
                              mockCourses.find((c) => c.id === selectedCourseId)?.price || { type: "free", amount: 0 },
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Description</p>
                          <p>{mockCourses.find((c) => c.id === selectedCourseId)?.description}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Duration</p>
                          <p>{mockCourses.find((c) => c.id === selectedCourseId)?.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Enrolled Candidates</p>
                          <p>{mockCourses.find((c) => c.id === selectedCourseId)?.enrolledCount}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Edit Course</Button>
                        <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-700">
                          Issue Certificates
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700 md:col-span-2">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-4">Enrolled Candidates</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                              >
                                Email
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                              >
                                Profession
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                              >
                                Enrollment Date
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                              >
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {/* Mock enrolled candidates */}
                            {mockCandidates.slice(0, 3).map((candidate) => (
                              <tr key={candidate.id}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm">{candidate.name}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm">{candidate.email}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm">{candidate.profession}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm">
                                  {formatDate(candidate.registrationDate)}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Completed
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Verification Log Tab */}
            {activeTab === "verification" && (
              <div>
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Certificate ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Verified By
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Date & Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {mockVerificationLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{log.certificateId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{log.verifiedBy}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">
                              {new Date(log.verificationDate).toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                log.status === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {log.status === "success" ? "Success" : "Failed"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="bg-gray-800 mb-6">
                    <TabsTrigger
                      value="general"
                      className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                    >
                      General
                    </TabsTrigger>
                    <TabsTrigger
                      value="email"
                      className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                    >
                      Email
                    </TabsTrigger>
                    <TabsTrigger
                      value="security"
                      className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                    >
                      Security
                    </TabsTrigger>
                    <TabsTrigger
                      value="appearance"
                      className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                    >
                      Appearance
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="general">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-4">General Settings</h3>
                        <p className="text-gray-400">General settings content would go here</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="email">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-4">Email Settings</h3>
                        <p className="text-gray-400">Email settings content would go here</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="security">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-4">Security Settings</h3>
                        <p className="text-gray-400">Security settings content would go here</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="appearance">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-4">Appearance Settings</h3>
                        <p className="text-gray-400">Appearance settings content would go here</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
