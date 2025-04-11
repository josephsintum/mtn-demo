"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { certificateService, type Certificate } from "@/lib/certificate-service"
import { Download, Edit, Eye, Loader2, Plus, Search, Trash2, Upload } from "lucide-react"
import Link from "next/link"

export default function CertificatesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCertificates, setSelectedCertificates] = useState<string[]>([])
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

    // Fetch certificates
    const fetchCertificates = async () => {
      try {
        const data = await certificateService.getAllCertificates()
        setCertificates(data)
        setFilteredCertificates(data)
      } catch (error) {
        console.error("Error fetching certificates:", error)
        toast({
          title: "Error",
          description: "Failed to load certificates. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCertificates()
  }, [user, router, toast])

  useEffect(() => {
    // Apply filters
    let filtered = [...certificates]

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((cert) => cert.status === statusFilter)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (cert) =>
          cert.id.toLowerCase().includes(query) ||
          cert.recipientName.toLowerCase().includes(query) ||
          cert.program.toLowerCase().includes(query),
      )
    }

    setFilteredCertificates(filtered)
  }, [certificates, statusFilter, searchQuery])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCertificates(filteredCertificates.map((cert) => cert.id))
    } else {
      setSelectedCertificates([])
    }
  }

  const handleSelectCertificate = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCertificates((prev) => [...prev, id])
    } else {
      setSelectedCertificates((prev) => prev.filter((certId) => certId !== id))
    }
  }

  const handleBulkAction = async () => {
    if (!bulkAction || selectedCertificates.length === 0) return

    setIsLoading(true)

    try {
      // In a real app, this would perform the bulk action via API
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API delay

      let actionText = ""
      switch (bulkAction) {
        case "issue":
          actionText = "issued"
          break
        case "revoke":
          actionText = "revoked"
          break
        case "delete":
          actionText = "deleted"
          break
      }

      toast({
        title: "Bulk action completed",
        description: `${selectedCertificates.length} certificates have been ${actionText}.`,
        variant: "default",
      })

      // Reset selection
      setSelectedCertificates([])
      setBulkAction("")

      // Refresh certificates (in a real app, this would fetch updated data)
      // For demo, we'll simulate the changes
      if (bulkAction === "delete") {
        setCertificates((prev) => prev.filter((cert) => !selectedCertificates.includes(cert.id)))
      } else {
        setCertificates((prev) =>
          prev.map((cert) => {
            if (selectedCertificates.includes(cert.id)) {
              return { ...cert, status: bulkAction === "issue" ? "issued" : "revoked" }
            }
            return cert
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

  if (!user || user.role !== "admin") {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Certificate Management</h1>
            <p className="text-gray-400 mt-1">Issue, view, and manage all certificates</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="border-mtn-gray text-white hover:bg-mtn-gray">
              <Link href="/admin/certificates/generate">
                <Plus className="mr-2 h-4 w-4" />
                Generate New
              </Link>
            </Button>
            <Button asChild className="bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90">
              <Link href="/admin/certificates/upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload Certificates
              </Link>
            </Button>
          </div>
        </div>

        <Card className="bg-mtn-gray border-mtn-gray">
          <CardHeader>
            <CardTitle>Certificate Management</CardTitle>
            <CardDescription>View and manage all certificates in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full" onValueChange={setStatusFilter}>
              <TabsList className="grid w-full grid-cols-4 bg-mtn-black mb-6">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
                >
                  All Certificates
                </TabsTrigger>
                <TabsTrigger
                  value="issued"
                  className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
                >
                  Issued
                </TabsTrigger>
                <TabsTrigger
                  value="draft"
                  className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
                >
                  Draft
                </TabsTrigger>
                <TabsTrigger
                  value="revoked"
                  className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
                >
                  Revoked
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search certificates..."
                    className="bg-mtn-black border-mtn-gray pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="flex gap-2">
                  <Select
                    value={bulkAction}
                    onValueChange={setBulkAction}
                    disabled={selectedCertificates.length === 0 || isLoading}
                  >
                    <SelectTrigger className="w-[180px] bg-mtn-black border-mtn-gray">
                      <SelectValue placeholder="Bulk Actions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="issue">Issue</SelectItem>
                      <SelectItem value="revoke">Revoke</SelectItem>
                      <SelectItem value="delete">Delete</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    className="border-mtn-gray text-white hover:bg-mtn-gray"
                    onClick={handleBulkAction}
                    disabled={!bulkAction || selectedCertificates.length === 0 || isLoading}
                  >
                    Apply
                  </Button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-mtn-yellow" />
                </div>
              ) : filteredCertificates.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">No certificates found matching your criteria.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-mtn-gray">
                        <th className="text-left py-3 px-4">
                          <div className="flex items-center">
                            <Checkbox
                              checked={
                                selectedCertificates.length === filteredCertificates.length &&
                                filteredCertificates.length > 0
                              }
                              onCheckedChange={handleSelectAll}
                              disabled={filteredCertificates.length === 0}
                            />
                          </div>
                        </th>
                        <th className="text-left py-3 px-4">Certificate ID</th>
                        <th className="text-left py-3 px-4">Recipient</th>
                        <th className="text-left py-3 px-4">Program</th>
                        <th className="text-left py-3 px-4">Issue Date</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Verifications</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCertificates.map((cert) => (
                        <tr key={cert.id} className="border-b border-mtn-gray">
                          <td className="py-3 px-4">
                            <Checkbox
                              checked={selectedCertificates.includes(cert.id)}
                              onCheckedChange={(checked) => handleSelectCertificate(cert.id, checked as boolean)}
                            />
                          </td>
                          <td className="py-3 px-4">{cert.id}</td>
                          <td className="py-3 px-4">{cert.recipientName}</td>
                          <td className="py-3 px-4">{cert.program}</td>
                          <td className="py-3 px-4">{cert.issueDate}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                cert.status === "issued"
                                  ? "bg-green-100 text-green-800"
                                  : cert.status === "revoked"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4">{cert.verificationCount}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button asChild size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Link href={`/admin/certificates/${cert.id}`}>
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Link>
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
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
                  {selectedCertificates.length > 0 ? (
                    <span>{selectedCertificates.length} certificates selected</span>
                  ) : (
                    <span>
                      Showing {filteredCertificates.length} of {certificates.length} certificates
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
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
