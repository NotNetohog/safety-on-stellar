"use client";

import { useState, useEffect, useRef } from "react";
import {
  Download,
  Share2,
  Loader2,
  Stethoscope,
  Smartphone,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRCodeGenerator } from "@/components/qr-code-generator";
import html2canvas from "html2canvas";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useParams } from "next/navigation";

export default function QRCodePage() {
  const params = useParams();
  const accountId = params.id as string;

  const [stellarAccountId, setStellarAccountId] = useState("");
  const [medicalRecordUrl, setMedicalRecordUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const qrCodeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStellarAccountId(accountId);

    // Create a URL that points directly to the medical record
    const baseUrl = window.location.origin;
    setMedicalRecordUrl(`${baseUrl}/records/${accountId}`);

    setIsLoading(false);
  }, []);

  const handleDownload = async () => {
    await new Promise((resolve) => setTimeout(resolve, 50)); // Allow state update

    if (!qrCodeContainerRef.current) return;

    try {
      setIsDownloading(true);
      const scale = 10;

      // Use html2canvas to capture the entire QR code container as an image
      const canvas = await html2canvas(qrCodeContainerRef.current, {
        scale,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
      });

      // Convert the canvas to a data URL
      const imageData = canvas.toDataURL("image/png");

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = imageData;
      link.download = "sos-emergency-qrcode.png";

      // Append to the document, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to download QR code. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    // Check if the Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title: "SOS Emergency QR Code",
          text: "Scan this QR code to access my emergency medical information.",
          url: medicalRecordUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      // Create a temporary input to copy the URL
      const input = document.createElement("input");
      input.value = medicalRecordUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);

      alert("Link copied to clipboard: " + medicalRecordUrl);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container max-w-5xl py-8">
        <div className="grid gap-6">
          <div className="flex flex-col items-center gap-8">
            {/* Dynamic QR Container */}
            <div
              ref={qrCodeContainerRef}
              className="bg-white rounded-2xl p-2
              transition-all duration-200 relative shadow-md"
            >
              <div className="mb-2">
                <QRCodeGenerator
                  value={medicalRecordUrl}
                  size={256}
                  level="H"
                  includeMargin={true}
                />

                {/* Enhanced Logo Badge */}
                {!isLoading && (
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 pt-2">
                    <div className="bg-white p-1 rounded-full shadow-lg border-2 border-black">
                      <img
                        src="/logo.png"
                        alt="SOS Logo"
                        className="w-12 h-7 object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center mb-2">
                <div className="text-center">
                  <span className=" text-2xl font-bold uppercase tracking-widest text-red-600">
                    MEDICAL ID
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Action Section */}
            <div className="w-full max-w-md space-y-4">
              <Button
                onClick={() => handleDownload()}
                className="w-full"
                disabled={isLoading || isDownloading}
              >
                {isDownloading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <Download className="h-5 w-5 mr-2" />
                )}
                Download
              </Button>

              <div className="w-full max-w-md space-y-4">
                <Button
                  onClick={handleShare}
                  variant="secondary"
                  className="w-full"
                  disabled={isLoading}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Link
                </Button>
              </div>
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
            <div className="text-center p-6 border rounded-lg">
              <Stethoscope className="h-8 w-8 mx-auto mb-4 text-red-600" />
              <h1 className="font-medium mb-2">For Medical Professionals</h1>
              <p className="text-sm text-muted-foreground">
                Scan QR code to access patient's emergency profile including
                medical history, allergies, and emergency contacts.
              </p>
            </div>

            <div className="text-center p-6 border rounded-lg">
              <Smartphone className="h-8 w-8 mx-auto mb-4 text-red-600" />
              <h1 className="font-medium mb-2">Digital Backup</h1>
              <p className="text-sm text-muted-foreground">
                Save the digital version in your phone's wallet app or email it
                to trusted contacts.
              </p>
            </div>

            <div className="text-center p-6 border rounded-lg">
              <Printer className="h-8 w-8 mx-auto mb-4 text-red-600" />
              <h1 className="font-medium mb-2">Print Recommendations</h1>
              <p className="text-sm text-muted-foreground">
                Use waterproof paper for physical copies. Ideal for wallets,
                gear bags, and medical alert bracelets.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
