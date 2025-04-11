"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { VerificationResultModal } from "@/components/verification-result-modal"

export default function VerifyPage() {
  const [certificateId, setCertificateId] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()

    // Mock verification result - in a real app, this would be an API call
    const mockResult = {
      isValid: certificateId === "MTN-CERT-1234", // Just for demo purposes
      certificateId: certificateId,
      recipientName: recipientName || "John Doe",
      program: "Digital Marketing Fundamentals",
      issueDate: "January 15, 2025",
      validUntil: "January 15, 2027",
      issuingAuthority: "MTN Cameroon Professional Development",
    }

    setVerificationResult(mockResult)
    setIsModalOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Verify Certificate Authenticity
          </h1>
          <p className="mt-4 text-gray-400 md:text-lg">
            Enter the certificate details or scan the QR code to verify the authenticity of an MTN Cameroon certificate.
          </p>
        </div>

        <Card className="bg-mtn-gray border-mtn-gray">
          <CardHeader>
            <CardTitle>Verification Options</CardTitle>
            <CardDescription>Choose your preferred method to verify a certificate</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-mtn-black">
                <TabsTrigger value="details">Enter Certificate Details</TabsTrigger>
                <TabsTrigger value="qrcode">Scan QR Code</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-6">
                <form onSubmit={handleVerify} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="certificate-id" className="text-sm font-medium">
                      Certificate ID/Serial Number
                    </label>
                    <Input
                      id="certificate-id"
                      placeholder="Enter certificate ID"
                      className="bg-mtn-black border-mtn-gray"
                      value={certificateId}
                      onChange={(e) => setCertificateId(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="recipient-name" className="text-sm font-medium">
                      Recipient Name (optional)
                    </label>
                    <Input
                      id="recipient-name"
                      placeholder="Enter recipient name"
                      className="bg-mtn-black border-mtn-gray"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90">
                    <Search className="mr-2 h-4 w-4" />
                    Verify Certificate
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="qrcode" className="mt-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="bg-mtn-black border border-mtn-gray rounded-lg p-8 w-full max-w-sm mx-auto aspect-square flex items-center justify-center">
                    <QrCode className="h-32 w-32 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-400 text-center">
                    Position the QR code from the certificate within the scanner area
                  </p>
                  <Button className="bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90">
                    <QrCode className="mr-2 h-4 w-4" />
                    Scan QR Code
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                Having trouble verifying a certificate? Check our FAQ section or contact our support team for
                assistance.
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <Button asChild variant="outline" size="sm" className="border-mtn-gray text-white hover:bg-mtn-gray">
                  <Link href="/faq">FAQ</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="border-mtn-gray text-white hover:bg-mtn-gray">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Result Modal */}
        <VerificationResultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          result={verificationResult}
        />
      </div>
    </div>
  )
}
