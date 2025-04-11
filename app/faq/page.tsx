"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h1>
          <p className="mt-4 text-gray-400 md:text-lg">
            Find answers to common questions about the MTN Certificate Authentication System
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-mtn-gray">
            <AccordionTrigger className="text-left">How do I verify a certificate?</AccordionTrigger>
            <AccordionContent className="text-gray-400">
              You can verify a certificate by entering the certificate ID on the verification page or by scanning the QR
              code printed on the certificate.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-mtn-gray">
            <AccordionTrigger className="text-left">
              What information do I need to verify a certificate?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              You need the certificate ID/serial number, which is typically printed on the certificate. Optionally, you
              can also enter the recipient's name for additional verification.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-mtn-gray">
            <AccordionTrigger className="text-left">Why can't I find my certificate in the system?</AccordionTrigger>
            <AccordionContent className="text-gray-400">
              This could be because the certificate has not yet been uploaded to our system, the certificate ID was
              entered incorrectly, or the certificate is not issued by MTN Cameroon. Please contact our support team if
              you believe this is an error.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-mtn-gray">
            <AccordionTrigger className="text-left">
              How long does it take for a newly issued certificate to appear in the system?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              Newly issued certificates are typically uploaded within 48 hours of issuance.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-mtn-gray">
            <AccordionTrigger className="text-left">How can I access my certificates as a recipient?</AccordionTrigger>
            <AccordionContent className="text-gray-400">
              As a certificate recipient, you can create an account or log in to the recipient portal using your email
              address and password. All your certificates will be available in the "My Certificates" section.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-mtn-gray">
            <AccordionTrigger className="text-left">
              Can I share my certificate directly from this platform?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              Yes, after logging in to the recipient portal, you can share your certificates via email or generate a
              shareable link.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="border-mtn-gray">
            <AccordionTrigger className="text-left">
              Is there a mobile app for the Certificate Authentication System?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              Currently, we offer a mobile-responsive web platform that works well on smartphones and tablets. A
              dedicated mobile app is under development.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-12 bg-mtn-gray rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-gray-400 mb-6">
            If you couldn't find the answer to your question, please contact our support team.
          </p>
          <Button asChild className="bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
