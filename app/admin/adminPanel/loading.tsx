import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-mtn-black">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-mtn-yellow mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2 text-white">Loading admin panel...</h2>
        <p className="text-gray-400">Please wait while we prepare your dashboard.</p>
      </div>
    </div>
  )
}
