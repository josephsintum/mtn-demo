"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { ArrowLeft, FileText, Loader2, Save } from "lucide-react"
import Link from "next/link"

export default function GenerateCertificatePage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    program: "",
    issueDate: new Date().toISOString().split("T")[0],
    expiryDate: "",
    hasExpiry: false,
    certificateTemplate: "standard",
    notifyRecipient: true,
    additionalNotes: "",
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
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      // In a real app, this would generate the certificate via API
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API delay

      toast({
        title: "Certificate generated",
        description: `Certificate for ${formData.recipientName} has been generated successfully.`,
        variant: "default",
      })

      router.push("/admin/certificates")
    } catch (error) {
      toast({
        title: "Error generating certificate",
        description: "There was an error generating the certificate. Please try again.",
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
            <Link href="/admin/certificates">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Certificates
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tighter">Generate Certificate</h1>
          <p className="text-gray-400 mt-1">Create a new certificate for a recipient</p>
        </div>

        <Card className="bg-mtn-gray border-mtn-gray">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Certificate Information</CardTitle>
              <CardDescription>Enter the details for the new certificate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Full Name</Label>
                <Input
                  id="recipientName"
                  name="recipientName"
                  placeholder="John Doe"
                  className="bg-mtn-black border-mtn-gray"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipientEmail">Recipient Email</Label>
                <Input
                  id="recipientEmail"
                  name="recipientEmail"
                  type="email"
                  placeholder="john.doe@example.com"
                  className="bg-mtn-black border-mtn-gray"
                  value={formData.recipientEmail}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="program">Program/Course Name</Label>
                <Input
                  id="program"
                  name="program"
                  placeholder="Digital Marketing Fundamentals"
                  className="bg-mtn-black border-mtn-gray"
                  value={formData.program}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input
                    id="issueDate"
                    name="issueDate"
                    type="date"
                    className="bg-mtn-black border-mtn-gray"
                    value={formData.issueDate}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasExpiry"
                        checked={formData.hasExpiry}
                        onCheckedChange={(checked) => handleCheckboxChange("hasExpiry", checked as boolean)}
                        disabled={isLoading}
                      />
                      <Label htmlFor="hasExpiry" className="text-sm font-normal">
                        Has expiry
                      </Label>
                    </div>
                  </div>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    className="bg-mtn-black border-mtn-gray"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    disabled={!formData.hasExpiry || isLoading}
                    required={formData.hasExpiry}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="certificateTemplate">Certificate Template</Label>
                <Select
                  value={formData.certificateTemplate}
                  onValueChange={(value) => handleSelectChange("certificateTemplate", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="certificateTemplate" className="bg-mtn-black border-mtn-gray">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notifyRecipient"
                  checked={formData.notifyRecipient}
                  onCheckedChange={(checked) => handleCheckboxChange("notifyRecipient", checked as boolean)}
                  disabled={isLoading}
                />
                <Label htmlFor="notifyRecipient">Notify recipient by email when certificate is issued</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  placeholder="Enter any additional information to include on the certificate"
                  className="w-full min-h-[100px] bg-mtn-black border-mtn-gray rounded-md p-2"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-mtn-yellow mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Certificate Preview</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      A certificate ID will be automatically generated upon creation. The certificate will be available
                      for verification immediately after generation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                className="border-mtn-gray text-white hover:bg-mtn-gray"
                onClick={() => router.push("/admin/certificates")}
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
                    Generating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Generate Certificate
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
