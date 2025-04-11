"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { Globe, Menu, X, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const { user, logout } = useAuth()
  const router = useRouter()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="bg-mtn-black border-b border-mtn-gray py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/mtn-logo.png?height=60&width=180"
            alt="MTN Certificates"
            width={180}
            height={60}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-mtn-yellow">
            Home
          </Link>
          <Link href="/verify" className="text-white hover:text-mtn-yellow">
            Verify Certificate
          </Link>
          <Link href="/about" className="text-white hover:text-mtn-yellow">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-mtn-yellow">
            Contact
          </Link>

          {/* Show dashboard link when logged in */}
          {user && (
            <Link
              href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
              className="text-white hover:text-mtn-yellow"
            >
              Dashboard
            </Link>
          )}

          {/* Show logout button when logged in */}
          {user && (
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:text-mtn-yellow">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          )}

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:text-mtn-yellow">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-mtn-gray border-mtn-gray">
              <DropdownMenuItem
                className={`${language === "en" ? "bg-mtn-yellow text-mtn-black" : ""} cursor-pointer`}
                onClick={() => setLanguage("en")}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`${language === "fr" ? "bg-mtn-yellow text-mtn-black" : ""} cursor-pointer`}
                onClick={() => setLanguage("fr")}
              >
                Français
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Show dashboard and logout buttons on mobile when logged in */}
          {user && (
            <>
              <Button variant="ghost" size="sm" asChild className="text-white hover:text-mtn-yellow">
                <Link href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}>
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:text-mtn-yellow">
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Language Switcher for Mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:text-mtn-yellow">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-mtn-gray border-mtn-gray">
              <DropdownMenuItem
                className={`${language === "en" ? "bg-mtn-yellow text-mtn-black" : ""} cursor-pointer`}
                onClick={() => setLanguage("en")}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`${language === "fr" ? "bg-mtn-yellow text-mtn-black" : ""} cursor-pointer`}
                onClick={() => setLanguage("fr")}
              >
                Français
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={toggleMobileMenu} variant="ghost" size="icon" className="text-white">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu (Hidden by default) */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} bg-mtn-black py-2 px-4`}>
        <div className="flex flex-col items-center mb-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/mtn-logo.png?height=60&width=180"
              alt="MTN Certificates"
              width={150}
              height={50}
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <Link href="/" className="block text-white hover:text-mtn-yellow py-2">
          Home
        </Link>
        <Link href="/verify" className="block text-white hover:text-mtn-yellow py-2">
          Verify Certificate
        </Link>
        <Link href="/about" className="block text-white hover:text-mtn-yellow py-2">
          About
        </Link>
        <Link href="/contact" className="block text-white hover:text-mtn-yellow py-2">
          Contact
        </Link>
        {user && (
          <Link
            href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
            className="block text-white hover:text-mtn-yellow py-2"
          >
            Dashboard
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
