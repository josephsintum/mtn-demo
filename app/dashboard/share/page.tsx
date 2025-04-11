"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { ArrowLeft, Copy, Download, LinkIcon, Mail, QrCode } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { certificateService, type Certificate } from "@/lib/certificate-service"

export default function CertificateSharingPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [selectedCertificate, setSelectedCertificate] = useState<string>("")
  const [shareEmail, setShareEmail] = useState("")
  const [shareMessage, setShareMessage] = useState("")
  const [shareLink, setShareLink] = useState("")

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
          if (data.length > 0) {
            setSelectedCertificate(data[0].id)
            // Generate share link for the first certificate
            setShareLink(`https://mtncerts.com/verify/${data[0].id}`)
          }
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

  const handleCertificateChange = (value: string) => {
    setSelectedCertificate(value)
    setShareLink(`https://mtncerts.com/verify/${value}`)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    toast({
      title: "Link copied",
      description: "Certificate verification link has been copied to clipboard.",
      variant: "default",
    })
  }

  const handleEmailShare = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Email sent",
      description: `Certificate has been shared with ${shareEmail}.`,
      variant: "default",
    })

    setShareEmail("")
    setShareMessage("")
  }

  const handleDownloadQR = () => {
    toast({
      title: "QR Code downloaded",
      description: "Certificate QR code has been downloaded.",
      variant: "default",
    })
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  const selectedCertificateData = certificates.find((cert) => cert.id === selectedCertificate)

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
          <h1 className="text-3xl font-bold tracking-tighter">Share Your Certificate</h1>
          <p className="text-gray-400 mt-1">Share your certificates with employers or on social media</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-mtn-gray border-mtn-gray md:col-span-1">
            <CardHeader>
              <CardTitle>Select Certificate</CardTitle>
              <CardDescription>Choose which certificate to share</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="certificateSelect">Your Certificates</Label>
                <Select
                  value={selectedCertificate}
                  onValueChange={handleCertificateChange}
                  disabled={isLoading || certificates.length === 0}
                >
                  <SelectTrigger id="certificateSelect" className="bg-mtn-black border-mtn-gray">
                    <SelectValue placeholder="Select certificate" />
                  </SelectTrigger>
                  <SelectContent>
                    {certificates.map((cert) => (
                      <SelectItem key={cert.id} value={cert.id}>
                        {cert.program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCertificateData && (
                <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                  <h3 className="font-medium mb-2">Certificate Details</h3>
                  <dl className="space-y-1 text-sm">
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-gray-400">ID:</dt>
                      <dd className="col-span-2">{selectedCertificateData.id}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-gray-400">Program:</dt>
                      <dd className="col-span-2">{selectedCertificateData.program}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-gray-400">Issued:</dt>
                      <dd className="col-span-2">{selectedCertificateData.issueDate}</dd>
                    </div>
                    {selectedCertificateData.validUntil && (
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-gray-400">Valid Until:</dt>
                        <dd className="col-span-2">{selectedCertificateData.validUntil}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}

              <div className="aspect-[4/3] relative bg-mtn-black rounded-lg overflow-hidden">
                {selectedCertificateData ? (
                  <Image
                    src="/mtn-logo.png"
                    alt={`Certificate: ${selectedCertificateData.program}`}
                    width={400}
                    height={300}
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400">No certificate selected</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-mtn-gray border-mtn-gray md:col-span-2">
            <CardHeader>
              <CardTitle>Sharing Options</CardTitle>
              <CardDescription>Choose how you want to share your certificate</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="link" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-mtn-black mb-6">
                  <TabsTrigger
                    value="link"
                    className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
                  >
                    <LinkIcon className="h-4 w-4 mr-1" />
                    Share Link
                  </TabsTrigger>
                  <TabsTrigger
                    value="email"
                    className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger
                    value="qrcode"
                    className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
                  >
                    <QrCode className="h-4 w-4 mr-1" />
                    QR Code
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="link" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="shareLink">Certificate Verification Link</Label>
                    <div className="flex">
                      <Input
                        id="shareLink"
                        value={shareLink}
                        readOnly
                        className="bg-mtn-black border-mtn-gray rounded-r-none"
                      />
                      <Button
                        type="button"
                        onClick={handleCopyLink}
                        className="bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90 rounded-l-none"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-400">
                      Share this link with anyone who needs to verify your certificate
                    </p>
                  </div>

                  <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                    <h3 className="font-medium mb-2">Social Media Sharing</h3>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="border-mtn-gray text-white hover:bg-mtn-gray">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                        Twitter
                      </Button>
                      <Button variant="outline" className="border-mtn-gray text-white hover:bg-mtn-gray">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Facebook
                      </Button>
                      <Button variant="outline" className="border-mtn-gray text-white hover:bg-mtn-gray">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Instagram
                      </Button>
                      <Button variant="outline" className="border-mtn-gray text-white hover:bg-mtn-gray">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="email" className="space-y-6">
                  <form onSubmit={handleEmailShare} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="shareEmail">Recipient Email</Label>
                      <Input
                        id="shareEmail"
                        type="email"
                        placeholder="recipient@example.com"
                        className="bg-mtn-black border-mtn-gray"
                        value={shareEmail}
                        onChange={(e) => setShareEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shareMessage">Message (Optional)</Label>
                      <textarea
                        id="shareMessage"
                        placeholder="Add a personal message..."
                        className="w-full min-h-[100px] bg-mtn-black border-mtn-gray rounded-md p-2"
                        value={shareMessage}
                        onChange={(e) => setShareMessage(e.target.value)}
                      />
                    </div>

                    <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                      <h3 className="font-medium mb-2">Email Preview</h3>
                      <p className="text-sm text-gray-400">
                        The recipient will receive an email with a link to verify your certificate and your optional
                        message.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90"
                      disabled={!selectedCertificate || !shareEmail}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="qrcode" className="space-y-6">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <QrCode className="h-48 w-48 text-mtn-black" />
                    </div>
                    <p className="text-sm text-gray-400 text-center">
                      This QR code contains a link to verify your certificate. It can be scanned with any QR code
                      reader.
                    </p>
                    <Button
                      onClick={handleDownloadQR}
                      className="bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90"
                      disabled={!selectedCertificate}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download QR Code
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
