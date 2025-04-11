"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { ArrowLeft, Download, Eye, Loader2, Search, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { certificateService, type Certificate } from "@/lib/certificate-service"

export default function MyCertificatesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([])
  const [searchQuery, setSearchQuery] = useState("")

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

    // Fetch user's certificates
    const fetchCertificates = async () => {
      try {
        if (user.id) {
          const data = await certificateService.getCertificatesByRecipient(user.id)
          setCertificates(data)
          setFilteredCertificates(data)
        }
      } catch (error) {
        console.error("Error fetching certificates:", error)
        toast({
          title: "Error",
          description: "Failed to load your certificates. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCertificates()
  }, [user, router, toast])

  useEffect(() => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const filtered = certificates.filter(
        (cert) => cert.program.toLowerCase().includes(query) || cert.id.toLowerCase().includes(query),
      )
      setFilteredCertificates(filtered)
    } else {
      setFilteredCertificates(certificates)
    }
  }, [certificates, searchQuery])

  const handleDownload = (certificateId: string) => {
    toast({
      title: "Certificate downloaded",
      description: "Your certificate has been downloaded successfully.",
      variant: "default",
    })
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button variant="outline" className="border-mtn-gray text-white hover:bg-mtn-gray mb-4" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tighter">My Certificates</h1>
          <p className="text-gray-400 mt-1">View and manage all your certificates</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-auto md:flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search certificates..."
              className="bg-mtn-black border-mtn-gray pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-mtn-yellow" />
          </div>
        ) : filteredCertificates.length === 0 ? (
          <Card className="bg-mtn-gray border-mtn-gray">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-mtn-black p-4 mb-4">
                <Search className="h-8 w-8 text-mtn-yellow" />
              </div>
              <h3 className="text-xl font-medium mb-2">No certificates found</h3>
              <p className="text-gray-400 text-center max-w-md">
                {certificates.length === 0
                  ? "You don't have any certificates yet. They will appear here once they are issued to you."
                  : "No certificates match your search criteria. Try a different search term."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate) => (
              <Card key={certificate.id} className="bg-mtn-gray border-mtn-gray overflow-hidden">
                <div className="aspect-[4/3] relative bg-mtn-black">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt={`Certificate: ${certificate.program}`}
                    width={400}
                    height={300}
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        certificate.status === "issued"
                          ? "bg-green-100 text-green-800"
                          : certificate.status === "revoked"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                    </span>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{certificate.program}</CardTitle>
                  <CardDescription>Certificate ID: {certificate.id}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm text-gray-400">
                    <p>Issued: {certificate.issueDate}</p>
                    {certificate.validUntil && <p>Valid until: {certificate.validUntil}</p>}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="outline" size="sm" className="border-mtn-gray text-white hover:bg-mtn-gray">
                    <Link href={`/dashboard/certificates/${certificate.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-mtn-gray text-white hover:bg-mtn-gray"
                      onClick={() => handleDownload(certificate.id)}
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-mtn-gray text-white hover:bg-mtn-gray"
                    >
                      <Link href="/dashboard/share">
                        <Share2 className="h-4 w-4" />
                        <span className="sr-only">Share</span>
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
