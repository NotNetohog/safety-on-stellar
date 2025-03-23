"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import QRCode component to avoid SSR issues
const QRCode = dynamic(
  () => import("qrcode.react").then((mod) => mod.QRCodeSVG),
  {
    ssr: false,
  },
);

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  level?: "L" | "M" | "Q" | "H";
  includeMargin?: boolean;
  className?: string;
  id?: string;
  logoWidth?: number;
  logoHeight?: number;
}

export function QRCodeGenerator({
  value,
  size = 200,
  level = "H", // Using H for higher error correction to accommodate logo
  className,
  id,
}: QRCodeGeneratorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !value) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 animate-pulse rounded-lg ${className}`}
        style={{ width: size, height: size }}
      >
        <p className="text-gray-400 text-sm">Generating QR Code...</p>
      </div>
    );
  }

  return (
    <div className={className} id={id}>
      <QRCode value={value} size={size} level={level} marginSize={3} />
    </div>
  );
}
