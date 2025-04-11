"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle, XCircle, Download, AlertTriangle } from "lucide-react"

interface VerificationResultModalProps {
  isOpen: boolean
  onClose: () => void
  result: {
    isValid: boolean
    certificateId?: string
    recipientName?: string
    program?: string
    issueDate?: string
    validUntil?: string
    issuingAuthority?: string
  }
}

export function VerificationResultModal({ isOpen, onClose, result }: VerificationResultModalProps) {
  if (!result) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-mtn-gray border-mtn-gray">
        <DialogHeader>
          {result.isValid ? (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <DialogTitle className="text-center text-xl">Certificate Verified ✓</DialogTitle>
              <DialogDescription className="text-center">
                This certificate is authentic and has been issued by MTN Cameroon.
              </DialogDescription>
            </>
          ) : (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <DialogTitle className="text-center text-xl">Certificate Not Found ✗</DialogTitle>
              <DialogDescription className="text-center">
                We could not verify this certificate in our system.
              </DialogDescription>
            </>
          )}
        </DialogHeader>

        {result.isValid ? (
          <div className="space-y-4">
            <div className="rounded-md bg-mtn-black p-4 border border-mtn-gray">
              <h3 className="font-medium mb-2">Certificate Details:</h3>
              <dl className="space-y-2 text-sm">
                <div className="grid grid-cols-3 gap-1">
                  <dt className="text-gray-400">Certificate ID:</dt>
                  <dd className="col-span-2">{result.certificateId}</dd>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <dt className="text-gray-400">Recipient Name:</dt>
                  <dd className="col-span-2">{result.recipientName}</dd>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <dt className="text-gray-400">Program/Course:</dt>
                  <dd className="col-span-2">{result.program}</dd>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <dt className="text-gray-400">Issue Date:</dt>
                  <dd className="col-span-2">{result.issueDate}</dd>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <dt className="text-gray-400">Valid Until:</dt>
                  <dd className="col-span-2">{result.validUntil || "No Expiration"}</dd>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <dt className="text-gray-400">Issuing Authority:</dt>
                  <dd className="col-span-2">{result.issuingAuthority}</dd>
                </div>
              </dl>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-md bg-mtn-black p-4 border border-mtn-gray">
              <h3 className="font-medium mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 text-mtn-yellow mr-2" />
                Possible Reasons:
              </h3>
              <ul className="space-y-2 text-sm text-gray-400 list-disc pl-5">
                <li>The certificate ID may be incorrect</li>
                <li>The certificate has not been issued by MTN Cameroon</li>
                <li>There may be a technical issue with our system</li>
              </ul>
            </div>
          </div>
        )}

        <DialogFooter className="sm:justify-center gap-2 flex-wrap">
          {result.isValid ? (
            <>
              <Button variant="outline" className="border-mtn-gray text-white hover:bg-mtn-gray">
                <Download className="mr-2 h-4 w-4" />
                Download Verification Report
              </Button>
              <Button onClick={onClose}>Close</Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="border-mtn-gray text-white hover:bg-mtn-gray" onClick={onClose}>
                Try Again
              </Button>
              <Button asChild className="bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90">
                <a href="/contact">Contact Support</a>
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
