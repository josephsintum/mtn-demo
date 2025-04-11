// Mock certificate data
export type Certificate = {
  id: string
  recipientId: string
  recipientName: string
  program: string
  issueDate: string
  validUntil?: string
  issuingAuthority: string
  verificationCount: number
  status: "issued" | "revoked" | "draft"
}

// Mock certificates database
const certificates: Certificate[] = [
  {
    id: "MTN-CERT-1234",
    recipientId: "2",
    recipientName: "John Doe",
    program: "Digital Marketing Fundamentals",
    issueDate: "January 15, 2025",
    validUntil: "January 15, 2027",
    issuingAuthority: "MTN Cameroon Professional Development",
    verificationCount: 12,
    status: "issued",
  },
  {
    id: "MTN-CERT-1235",
    recipientId: "2",
    recipientName: "John Doe",
    program: "Project Management Essentials",
    issueDate: "February 20, 2025",
    issuingAuthority: "MTN Cameroon Professional Development",
    verificationCount: 5,
    status: "issued",
  },
  {
    id: "MTN-CERT-1236",
    recipientId: "2",
    recipientName: "John Doe",
    program: "Telecommunications Basics",
    issueDate: "March 10, 2025",
    validUntil: "March 10, 2027",
    issuingAuthority: "MTN Cameroon Professional Development",
    verificationCount: 2,
    status: "issued",
  },
  {
    id: "MTN-CERT-1237",
    recipientId: "3",
    recipientName: "Jane Smith",
    program: "Digital Marketing Fundamentals",
    issueDate: "January 15, 2025",
    validUntil: "January 15, 2027",
    issuingAuthority: "MTN Cameroon Professional Development",
    verificationCount: 8,
    status: "issued",
  },
  {
    id: "MTN-CERT-1238",
    recipientId: "4",
    recipientName: "Alice Johnson",
    program: "Network Security",
    issueDate: "March 5, 2025",
    issuingAuthority: "MTN Cameroon Professional Development",
    verificationCount: 3,
    status: "issued",
  },
  {
    id: "MTN-CERT-1239",
    recipientId: "5",
    recipientName: "Bob Williams",
    program: "Cloud Computing",
    issueDate: "February 28, 2025",
    validUntil: "February 28, 2027",
    issuingAuthority: "MTN Cameroon Professional Development",
    verificationCount: 1,
    status: "draft",
  },
  {
    id: "MTN-CERT-1240",
    recipientId: "6",
    recipientName: "Charlie Brown",
    program: "Data Analytics",
    issueDate: "January 20, 2025",
    issuingAuthority: "MTN Cameroon Professional Development",
    verificationCount: 0,
    status: "revoked",
  },
]

// Certificate service functions
export const certificateService = {
  // Get all certificates
  getAllCertificates: async (): Promise<Certificate[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay
    return [...certificates]
  },

  // Get certificates by recipient ID
  getCertificatesByRecipient: async (recipientId: string): Promise<Certificate[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay
    return certificates.filter((cert) => cert.recipientId === recipientId)
  },

  // Get certificate by ID
  getCertificateById: async (id: string): Promise<Certificate | null> => {
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay
    const certificate = certificates.find((cert) => cert.id === id)
    return certificate || null
  },

  // Verify certificate
  verifyCertificate: async (
    id: string,
    recipientName?: string,
  ): Promise<{ isValid: boolean; certificate: Certificate | null }> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

    const certificate = certificates.find(
      (cert) =>
        cert.id === id &&
        cert.status === "issued" &&
        (!recipientName || cert.recipientName.toLowerCase().includes(recipientName.toLowerCase())),
    )

    if (certificate) {
      // Update verification count
      certificate.verificationCount += 1
      return { isValid: true, certificate }
    }

    return { isValid: false, certificate: null }
  },

  // Create certificate
  createCertificate: async (certificateData: Omit<Certificate, "id" | "verificationCount">): Promise<Certificate> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

    const newCertificate: Certificate = {
      ...certificateData,
      id: `MTN-CERT-${Math.floor(1000 + Math.random() * 9000)}`,
      verificationCount: 0,
    }

    certificates.push(newCertificate)
    return newCertificate
  },

  // Update certificate
  updateCertificate: async (id: string, updates: Partial<Certificate>): Promise<Certificate | null> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

    const index = certificates.findIndex((cert) => cert.id === id)
    if (index === -1) return null

    certificates[index] = { ...certificates[index], ...updates }
    return certificates[index]
  },

  // Delete certificate
  deleteCertificate: async (id: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

    const index = certificates.findIndex((cert) => cert.id === id)
    if (index === -1) return false

    certificates.splice(index, 1)
    return true
  },
}
