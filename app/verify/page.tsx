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
import { certificateService } from "@/lib/certificate-service"
import { useLanguage } from "@/lib/language-context"
import { Loader2 } from "lucide-react"
import { QrScanner } from "@/components/qr-scanner"

export default function VerifyPage() {
  const [certificateId, setCertificateId] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const { t } = useLanguage()

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!certificateId) return

    setIsVerifying(true)

    try {
      const result = await certificateService.verifyCertificate(certificateId, recipientName)

      setVerificationResult({
        isValid: result.isValid,
        ...result.certificate,
      })

      setIsModalOpen(true)
    } catch (error) {
      console.error("Verification error:", error)
      setVerificationResult({
        isValid: false,
      })
      setIsModalOpen(true)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleQrCodeScanned = (data: string) => {
    setIsScanning(false)

    // Extract certificate ID from QR code data
    // Assuming QR code contains data in format "MTN-CERT-XXXX" or similar
    if (data && data.includes("MTN-CERT-")) {
      setCertificateId(data)
      handleVerify({ preventDefault: () => {} } as React.FormEvent)
    } else {
      setVerificationResult({
        isValid: false,
        error: "Invalid QR code format",
      })
      setIsModalOpen(true)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("verify.heading")}</h1>
          <p className="mt-4 text-gray-400 md:text-lg">{t("verify.subheading")}</p>
        </div>

        <Card className="bg-mtn-gray border-mtn-gray">
          <CardHeader>
            <CardTitle>Verification Options</CardTitle>
            <CardDescription>Choose your preferred method to verify a certificate</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-mtn-black">
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center gap-2 py-3"
                >
                  <Search className="h-4 w-4" />
                  {t("verify.option1")}
                </TabsTrigger>
                <TabsTrigger
                  value="qrcode"
                  className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center gap-2 py-3"
                >
                  <QrCode className="h-4 w-4" />
                  {t("verify.option2")}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-6">
                <form onSubmit={handleVerify} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="certificate-id" className="text-sm font-medium">
                      {t("verify.certificateId")}
                    </label>
                    <Input
                      id="certificate-id"
                      placeholder="Enter certificate ID"
                      className="bg-mtn-black border-mtn-gray"
                      value={certificateId}
                      onChange={(e) => setCertificateId(e.target.value)}
                      disabled={isVerifying}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="recipient-name" className="text-sm font-medium">
                      {t("verify.recipientName")}
                    </label>
                    <Input
                      id="recipient-name"
                      placeholder="Enter recipient name"
                      className="bg-mtn-black border-mtn-gray"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      disabled={isVerifying}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90"
                    disabled={isVerifying || !certificateId}
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        {t("button.verify")}
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="qrcode" className="mt-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                  {isScanning ? (
                    <div className="w-full max-w-sm mx-auto">
                      <QrScanner onScan={handleQrCodeScanned} onCancel={() => setIsScanning(false)} />
                    </div>
                  ) : (
                    <>
                      <div className="bg-mtn-black border border-mtn-gray rounded-lg p-8 w-full max-w-sm mx-auto aspect-square flex items-center justify-center">
                        <QrCode className="h-32 w-32 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-400 text-center">{t("verify.scanInstructions")}</p>
                      <Button
                        className="bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90"
                        onClick={() => setIsScanning(true)}
                      >
                        <QrCode className="mr-2 h-4 w-4" />
                        {t("verify.option2")}
                      </Button>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">{t("verify.helpText")}</p>
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
