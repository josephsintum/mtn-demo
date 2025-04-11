"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { LockKeyhole } from "lucide-react"

export default function Footer() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <footer className="bg-mtn-black border-t border-mtn-gray">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">{t("footer.languages")}:</span>
            <Button
              variant="outline"
              size="sm"
              className={`h-8 border-mtn-gray ${language === "en" ? "text-white bg-mtn-gray" : "text-gray-400"}`}
              onClick={() => setLanguage("en")}
            >
              English
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`h-8 border-mtn-gray ${language === "fr" ? "text-white bg-mtn-gray" : "text-gray-400"}`}
              onClick={() => setLanguage("fr")}
            >
              Français
            </Button>
          </div>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-400">{t("footer.copyright")}</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-t border-mtn-gray px-6 py-6 md:flex md:items-center md:justify-center lg:px-8">
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-6">
          <Link href="/about" className="text-sm text-gray-400 hover:text-white">
            About
          </Link>
          <Link href="/faq" className="text-sm text-gray-400 hover:text-white">
            FAQ
          </Link>
          <Link href="/contact" className="text-sm text-gray-400 hover:text-white">
            Contact
          </Link>
          <Link href="/terms" className="text-sm text-gray-400 hover:text-white">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/admin/login" className="text-sm text-gray-400 hover:text-white flex items-center">
            <LockKeyhole className="h-3 w-3 mr-1" />
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  )
}
