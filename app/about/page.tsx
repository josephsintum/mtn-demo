import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Mail, Phone } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            About MTN Cameroon Professional Certification
          </h1>
          <p className="mt-4 text-xl text-mtn-yellow">Empowering the future workforce of Cameroon</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-gray-300 leading-relaxed">
            MTN Cameroon's Professional Certification Program is designed to equip young professionals with the skills
            and knowledge needed to excel in today's digital economy. Our certification program covers various
            disciplines including telecommunications, digital marketing, project management, and technical support.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed mt-6">
            Each certificate issued by MTN Cameroon represents a significant achievement and attests to the recipient's
            expertise in their field. Our certificates are recognized by employers across Cameroon and beyond.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed mt-6">
            The Certificate Authentication System ensures transparency and maintains the integrity of our certification
            program by allowing recipients and third parties to verify the authenticity of any certificate issued by MTN
            Cameroon.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6">Program Objectives</h2>

          <ul className="space-y-4 mt-6">
            <li className="flex items-start">
              <div className="bg-mtn-yellow rounded-full p-1 mr-3 mt-1">
                <ArrowRight className="h-4 w-4 text-mtn-black" />
              </div>
              <span className="text-gray-300">Develop critical skills in technology and telecommunications</span>
            </li>
            <li className="flex items-start">
              <div className="bg-mtn-yellow rounded-full p-1 mr-3 mt-1">
                <ArrowRight className="h-4 w-4 text-mtn-black" />
              </div>
              <span className="text-gray-300">Bridge the gap between academic learning and industry requirements</span>
            </li>
            <li className="flex items-start">
              <div className="bg-mtn-yellow rounded-full p-1 mr-3 mt-1">
                <ArrowRight className="h-4 w-4 text-mtn-black" />
              </div>
              <span className="text-gray-300">Provide practical, hands-on training for young professionals</span>
            </li>
            <li className="flex items-start">
              <div className="bg-mtn-yellow rounded-full p-1 mr-3 mt-1">
                <ArrowRight className="h-4 w-4 text-mtn-black" />
              </div>
              <span className="text-gray-300">Create a pathway to employment opportunities</span>
            </li>
          </ul>

          <div className="bg-mtn-gray rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold mb-6">Contact</h2>
            <p className="text-gray-300 mb-4">For more information about our professional certification programs:</p>
            <div className="flex items-center mt-4">
              <Mail className="h-5 w-5 text-mtn-yellow mr-3" />
              <a href="mailto:certification@mtn.cm" className="text-mtn-yellow hover:underline">
                certification@mtn.cm
              </a>
            </div>
            <div className="flex items-center mt-2">
              <Phone className="h-5 w-5 text-mtn-yellow mr-3" />
              <span className="text-gray-300">+237 233 50 50 50</span>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90">
              <Link href="/verify">
                Verify a Certificate
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
