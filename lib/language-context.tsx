"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define available languages
export type Language = "en" | "fr"

// Define translations
const translations = {
  en: {
    // Common
    "app.name": "MTN Certificate Authentication System",
    "button.verify": "Verify a Certificate",
    "button.login": "Login to Your Account",
    "button.register": "Register",
    "button.close": "Close",
    "button.submit": "Submit",
    "button.download": "Download",
    "button.share": "Share",

    // Home page
    "home.heading": "Verify MTN Cameroon Professional Certificates",
    "home.subheading":
      "The official platform for authenticating certificates awarded to young professionals by MTN Cameroon.",
    "home.about":
      "MTN Cameroon is committed to developing the next generation of professionals through our training and certification programs. This platform ensures the authenticity of all certificates issued by our programs.",

    // Verify page
    "verify.heading": "Verify Certificate Authenticity",
    "verify.subheading":
      "Enter the certificate details or scan the QR code to verify the authenticity of an MTN Cameroon certificate.",
    "verify.option1": "Enter Certificate Details",
    "verify.option2": "Scan QR Code",
    "verify.certificateId": "Certificate ID/Serial Number",
    "verify.recipientName": "Recipient Name (optional)",
    "verify.scanInstructions": "Position the QR code from the certificate within the scanner area",
    "verify.helpText":
      "Having trouble verifying a certificate? Check our FAQ section or contact our support team for assistance.",

    // Verification results
    "verify.valid": "Certificate Verified ✓",
    "verify.invalid": "Certificate Not Found ✗",
    "verify.validSubheading": "This certificate is authentic and has been issued by MTN Cameroon.",
    "verify.invalidSubheading": "We could not verify this certificate in our system.",

    // Login page
    "login.heading": "Recipient Portal Login",
    "login.subheading": "Access your MTN certificates and manage your profile",
    "login.email": "Email",
    "login.password": "Password",
    "login.forgotPassword": "Forgot Password?",
    "login.rememberMe": "Remember me",
    "login.noAccount": "Don't have an account?",
    "login.newRecipients": "New Recipients",
    "login.newRecipientsText":
      "If you have recently received an MTN certificate, you can create an account to access your digital certificate.",

    // Footer
    "footer.copyright": "© 2025 MTN Cameroon. All rights reserved.",
    "footer.languages": "LANGUAGES:",
  },
  fr: {
    // Common
    "app.name": "Système d'Authentification des Certificats MTN",
    "button.verify": "Vérifier un Certificat",
    "button.login": "Connexion à Votre Compte",
    "button.register": "S'inscrire",
    "button.close": "Fermer",
    "button.submit": "Soumettre",
    "button.download": "Télécharger",
    "button.share": "Partager",

    // Home page
    "home.heading": "Vérifiez les Certificats Professionnels MTN Cameroun",
    "home.subheading":
      "La plateforme officielle pour authentifier les certificats décernés aux jeunes professionnels par MTN Cameroun.",
    "home.about":
      "MTN Cameroun s'engage à développer la prochaine génération de professionnels grâce à nos programmes de formation et de certification. Cette plateforme garantit l'authenticité de tous les certificats délivrés par nos programmes.",

    // Verify page
    "verify.heading": "Vérifier l'Authenticité du Certificat",
    "verify.subheading":
      "Entrez les détails du certificat ou scannez le code QR pour vérifier l'authenticité d'un certificat MTN Cameroun.",
    "verify.option1": "Entrer les Détails du Certificat",
    "verify.option2": "Scanner le Code QR",
    "verify.certificateId": "ID/Numéro de Série du Certificat",
    "verify.recipientName": "Nom du Destinataire (facultatif)",
    "verify.scanInstructions": "Positionnez le code QR du certificat dans la zone de numérisation",
    "verify.helpText":
      "Vous avez des difficultés à vérifier un certificat? Consultez notre section FAQ ou contactez notre équipe d'assistance.",

    // Verification results
    "verify.valid": "Certificat Vérifié ✓",
    "verify.invalid": "Certificat Non Trouvé ✗",
    "verify.validSubheading": "Ce certificat est authentique et a été délivré par MTN Cameroun.",
    "verify.invalidSubheading": "Nous n'avons pas pu vérifier ce certificat dans notre système.",

    // Login page
    "login.heading": "Connexion au Portail des Destinataires",
    "login.subheading": "Accédez à vos certificats MTN et gérez votre profil",
    "login.email": "Email",
    "login.password": "Mot de passe",
    "login.forgotPassword": "Mot de passe oublié?",
    "login.rememberMe": "Se souvenir de moi",
    "login.noAccount": "Vous n'avez pas de compte?",
    "login.newRecipients": "Nouveaux Destinataires",
    "login.newRecipientsText":
      "Si vous avez récemment reçu un certificat MTN, vous pouvez créer un compte pour accéder à votre certificat numérique.",

    // Footer
    "footer.copyright": "© 2025 MTN Cameroun. Tous droits réservés.",
    "footer.languages": "LANGUES:",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on initial load
  useEffect(() => {
    const storedLanguage = localStorage.getItem("mtn_language") as Language
    if (storedLanguage && (storedLanguage === "en" || storedLanguage === "fr")) {
      setLanguage(storedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("mtn_language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
