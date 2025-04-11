"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { FileUp, Download, Plus, Trash2, Loader2, Edit } from "lucide-react"

export default function UploadCertificatesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [notifyRecipients, setNotifyRecipients] = useState(true)
  const [manualEntries, setManualEntries] = useState([
    { recipientName: "", email: "", phone: "", program: "", issueDate: "", expiryDate: "" },
  ])

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0])
    }
  }

  const handleManualEntryChange = (index: number, field: string, value: string) => {
    const updatedEntries = [...manualEntries]
    updatedEntries[index] = { ...updatedEntries[index], [field]: value }
    setManualEntries(updatedEntries)
  }

  const addManualEntry = () => {
    setManualEntries([
      ...manualEntries,
      { recipientName: "", email: "", phone: "", program: "", issueDate: "", expiryDate: "" },
    ])
  }

  const removeManualEntry = (index: number) => {
    if (manualEntries.length > 1) {
      const updatedEntries = manualEntries.filter((_, i) => i !== index)
      setManualEntries(updatedEntries)
    }
  }

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would process the CSV file
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API delay

      toast({
        title: "Upload successful",
        description: "Certificates have been uploaded successfully.",
        variant: "default",
      })

      router.push("/admin/certificates")
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading the certificates. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would process the manual entries
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API delay

      toast({
        title: "Certificates created",
        description: `${manualEntries.length} certificates have been created successfully.`,
        variant: "default",
      })

      router.push("/admin/certificates")
    } catch (error) {
      toast({
        title: "Creation failed",
        description: "There was an error creating the certificates. Please try again.",
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
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tighter">Upload Certificates</h1>
          <p className="text-gray-400 mt-1">Bulk upload certificate data or enter manually</p>
        </div>

        <Card className="bg-mtn-gray border-mtn-gray">
          <CardHeader>
            <CardTitle>Upload Options</CardTitle>
            <CardDescription>Choose how you want to add new certificates</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="csv" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-mtn-black mb-6">
                <TabsTrigger
                  value="csv"
                  className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center gap-2 py-3"
                >
                  <FileUp className="h-4 w-4" />
                  Upload CSV File
                </TabsTrigger>
                <TabsTrigger
                  value="manual"
                  className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center gap-2 py-3"
                >
                  <Edit className="h-4 w-4" />
                  Manual Entry
                </TabsTrigger>
              </TabsList>

              <TabsContent value="csv">
                <form onSubmit={handleUploadSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-mtn-gray rounded-lg p-6 text-center">
                      <FileUp className="h-10 w-10 text-mtn-yellow mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Drag and drop your CSV file here</h3>
                      <p className="text-sm text-gray-400 mb-4">or click to browse files</p>
                      <Input
                        id="csv-file"
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="border-mtn-gray text-white hover:bg-mtn-gray"
                        onClick={() => document.getElementById("csv-file")?.click()}
                        disabled={isLoading}
                      >
                        Browse Files
                      </Button>
                      {csvFile && <p className="mt-4 text-sm text-mtn-yellow">Selected file: {csvFile.name}</p>}
                    </div>

                    <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                      <h3 className="font-medium mb-2">CSV Format Requirements:</h3>
                      <p className="text-sm text-gray-400 mb-2">The CSV file should include the following columns:</p>
                      <ul className="text-sm text-gray-400 list-disc pl-5 space-y-1">
                        <li>Recipient Full Name (required)</li>
                        <li>Email Address (required)</li>
                        <li>Phone Number (optional)</li>
                        <li>Program/Course Name (required)</li>
                        <li>Issue Date (required, format: YYYY-MM-DD)</li>
                        <li>Expiry Date (optional, format: YYYY-MM-DD)</li>
                        <li>Additional Notes (optional)</li>
                      </ul>
                      <div className="mt-4">
                        <Button type="button" variant="link" className="text-mtn-yellow p-0 h-auto">
                          <Download className="h-4 w-4 mr-2" />
                          Download Template
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="notify-recipients"
                          checked={notifyRecipients}
                          onCheckedChange={(checked) => setNotifyRecipients(checked as boolean)}
                          disabled={isLoading}
                        />
                        <Label htmlFor="notify-recipients">
                          Notify recipients by email when certificates are issued
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-mtn-gray text-white hover:bg-mtn-gray"
                      onClick={() => router.push("/admin/dashboard")}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90"
                      disabled={!csvFile || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        "Upload Certificates"
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="manual">
                <form onSubmit={handleManualSubmit} className="space-y-6">
                  <div className="space-y-6">
                    {manualEntries.map((entry, index) => (
                      <div key={index} className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium">Certificate #{index + 1}</h3>
                          {manualEntries.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                              onClick={() => removeManualEntry(index)}
                              disabled={isLoading}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`recipient-name-${index}`}>Recipient Full Name</Label>
                            <Input
                              id={`recipient-name-${index}`}
                              value={entry.recipientName}
                              onChange={(e) => handleManualEntryChange(index, "recipientName", e.target.value)}
                              className="bg-mtn-gray border-mtn-gray"
                              required
                              disabled={isLoading}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`email-${index}`}>Email Address</Label>
                            <Input
                              id={`email-${index}`}
                              type="email"
                              value={entry.email}
                              onChange={(e) => handleManualEntryChange(index, "email", e.target.value)}
                              className="bg-mtn-gray border-mtn-gray"
                              required
                              disabled={isLoading}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`phone-${index}`}>Phone Number</Label>
                            <Input
                              id={`phone-${index}`}
                              value={entry.phone}
                              onChange={(e) => handleManualEntryChange(index, "phone", e.target.value)}
                              className="bg-mtn-gray border-mtn-gray"
                              disabled={isLoading}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`program-${index}`}>Program/Course Name</Label>
                            <Input
                              id={`program-${index}`}
                              value={entry.program}
                              onChange={(e) => handleManualEntryChange(index, "program", e.target.value)}
                              className="bg-mtn-gray border-mtn-gray"
                              required
                              disabled={isLoading}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`issue-date-${index}`}>Issue Date</Label>
                            <Input
                              id={`issue-date-${index}`}
                              type="date"
                              value={entry.issueDate}
                              onChange={(e) => handleManualEntryChange(index, "issueDate", e.target.value)}
                              className="bg-mtn-gray border-mtn-gray"
                              required
                              disabled={isLoading}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`expiry-date-${index}`}>Expiry Date (optional)</Label>
                            <Input
                              id={`expiry-date-${index}`}
                              type="date"
                              value={entry.expiryDate}
                              onChange={(e) => handleManualEntryChange(index, "expiryDate", e.target.value)}
                              className="bg-mtn-gray border-mtn-gray"
                              disabled={isLoading}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-mtn-gray text-white hover:bg-mtn-gray"
                      onClick={addManualEntry}
                      disabled={isLoading}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another Certificate
                    </Button>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="notify-recipients-manual"
                          checked={notifyRecipients}
                          onCheckedChange={(checked) => setNotifyRecipients(checked as boolean)}
                          disabled={isLoading}
                        />
                        <Label htmlFor="notify-recipients-manual">
                          Notify recipients by email when certificates are issued
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-mtn-gray text-white hover:bg-mtn-gray"
                      onClick={() => router.push("/admin/dashboard")}
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
                          Processing...
                        </>
                      ) : (
                        "Issue Certificates"
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
