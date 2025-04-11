"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface QrScannerProps {
  onScan: (data: string) => void
  onCancel: () => void
}

export function QrScanner({ onScan, onCancel }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [scanning, setScanning] = useState(true)

  useEffect(() => {
    let stream: MediaStream | null = null
    let animationFrameId: number
    let scanInterval: NodeJS.Timeout

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }

        // Start scanning for QR codes
        scanInterval = setInterval(scanQRCode, 500)
      } catch (err) {
        console.error("Error accessing camera:", err)
        setError("Could not access camera. Please ensure you have granted camera permissions.")
      }
    }

    const scanQRCode = () => {
      if (!scanning) return

      const video = videoRef.current
      const canvas = canvasRef.current

      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        const context = canvas.getContext("2d")
        if (!context) return

        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // In a real implementation, you would use a QR code scanning library here
        // For this demo, we'll simulate finding a QR code after a few seconds
        setTimeout(() => {
          if (scanning) {
            onScan("MTN-CERT-1234") // Simulated QR code data
            stopScanning()
          }
        }, 3000)
      }
    }

    const stopScanning = () => {
      setScanning(false)
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      if (scanInterval) {
        clearInterval(scanInterval)
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }

    startCamera()

    return () => {
      stopScanning()
    }
  }, [onScan, scanning])

  return (
    <div className="relative">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-mtn-black">
        <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" playsInline muted />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover opacity-0" />

        {/* Scanning overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-48 w-48 border-2 border-mtn-yellow rounded-lg"></div>
        </div>

        {/* Scanning animation */}
        {scanning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-1 w-48 bg-mtn-yellow animate-pulse"></div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="text-center p-4">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={onCancel}>Close</Button>
            </div>
          </div>
        )}
      </div>

      <div className="absolute top-2 right-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          onClick={onCancel}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="mt-4 flex justify-center">
        <Button variant="outline" className="border-mtn-gray text-white hover:bg-mtn-gray" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
