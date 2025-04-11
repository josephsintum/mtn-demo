import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle, Search, Shield, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-pattern py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Verify MTN Cameroon Professional Certificates
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                The official platform for authenticating certificates awarded to young professionals by MTN Cameroon.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button asChild size="lg" className="bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90">
                <Link href="/verify">
                  Verify a Certificate
                  <Search className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-mtn-gray text-white hover:bg-mtn-gray">
                <Link href="/login">
                  Login to Your Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-mtn-black py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-mtn-yellow/10 px-3 py-1 text-sm text-mtn-yellow">
                About the Program
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Empowering the future workforce of Cameroon
              </h2>
              <p className="text-gray-400 md:text-lg">
                MTN Cameroon is committed to developing the next generation of professionals through our training and
                certification programs. This platform ensures the authenticity of all certificates issued by our
                programs.
              </p>
              <Button asChild variant="link" className="text-mtn-yellow p-0 h-auto font-semibold">
                <Link href="/about">
                  Learn more about our program
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-mtn-gray rounded-lg p-6 card-hover">
                <Shield className="h-10 w-10 text-mtn-yellow mb-4" />
                <h3 className="text-xl font-bold">Secure & Reliable Authentication</h3>
                <p className="text-gray-400 mt-2">
                  Our platform uses advanced security measures to ensure certificate verification is accurate and
                  tamper-proof.
                </p>
              </div>
              <div className="bg-mtn-gray rounded-lg p-6 card-hover">
                <Zap className="h-10 w-10 text-mtn-yellow mb-4" />
                <h3 className="text-xl font-bold">Instant Certificate Verification</h3>
                <p className="text-gray-400 mt-2">
                  Verify certificates in seconds with our streamlined verification process.
                </p>
              </div>
              <div className="bg-mtn-gray rounded-lg p-6 card-hover col-span-2">
                <CheckCircle className="h-10 w-10 text-mtn-yellow mb-4" />
                <h3 className="text-xl font-bold">Official MTN Cameroon Platform</h3>
                <p className="text-gray-400 mt-2">
                  This is the only authorized platform for verifying certificates issued by MTN Cameroon's professional
                  development programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-mtn-gray py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to verify a certificate?</h2>
              <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                Use our simple verification tool to check the authenticity of any MTN Cameroon professional certificate.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild size="lg" className="bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90">
                <Link href="/verify">
                  Verify Now
                  <Search className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
