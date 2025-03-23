// EmergencyContactButton.jsx
"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmergencyButtonProps {
  phone: string;
}

export function EmergencyButton({ phone }: EmergencyButtonProps) {
  const handleCallEmergencyContact = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <Button
      size="sm"
      className="gap-2 bg-rose-600 hover:bg-rose-700"
      onClick={handleCallEmergencyContact}
    >
      <Phone className="h-4 w-4" />
      Call Now
    </Button>
  );
}
