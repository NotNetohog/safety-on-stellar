"use client";

import { useState, FormEvent, ChangeEvent, ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { HeartPulse, QrCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createStellarAccount, storeMedicalData } from "@/lib/stellar";
import { FormData, BlockchainData, StellarAccount } from "@/lib/types";
import { FormField } from "./form-field";
import { CommaField } from "./comma-field";
import { redirect, useRouter } from "next/navigation";

// Reusable component for comma-separated fields

export default function MedicalProfilePage() {
  // Simplified flat form state with TypeScript
  const [formData, setFormData] = useState<FormData>({
    bloodType: "",
    identification: "",
    allergies: "",
    medications: "",
    conditions: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Generic handler for updating any form field
  const updateField = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Validate only essential fields
  const validateForm = (): string => {
    if (!formData.bloodType) return "Blood type is required";
    return "";
  };

  // Form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Convert comma-separated strings to arrays for blockchain storage
      const dataForBlockchain: BlockchainData = {
        bloodType: formData.bloodType,
        identification: formData.identification,
        allergies: formData.allergies
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        medications: formData.medications
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        conditions: formData.conditions
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        emergencyContact: {
          name: formData.emergencyContactName,
          phone: formData.emergencyContactPhone,
        },
      };

      // Create account and store data
      const account = (await createStellarAccount()) as StellarAccount;
      await storeMedicalData(account.secretKey, dataForBlockchain);

      router.push(`/qr-code/${account.publicKey}`);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save medical data";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header hideButton={true} />

      <main className="flex-1">
        <div className="container py-6 md:py-8 lg:py-12">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold">Medical Profile</h1>
                <p className="text-sm text-muted-foreground">
                  Complete your emergency health information
                </p>
              </div>
            </div>

            <Alert className="bg-muted">
              <AlertDescription className="text-muted-foreground">
                This information will be securely stored and accessible to
                medical professionals during emergencies.
              </AlertDescription>
            </Alert>

            <Card className="border-neutral-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <HeartPulse className="size-6 text-rose-500" />
                  Essential Medical Information
                </CardTitle>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {/* Basic Info Section */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField label="Blood Type">
                      <Select
                        value={formData.bloodType}
                        onValueChange={(value) =>
                          updateField("bloodType", value)
                        }
                      >
                        <SelectTrigger className="h-10 bg-white">
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>

                    <FormField label="Identification">
                      <Input
                        value={formData.identification}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          updateField("identification", e.target.value)
                        }
                        placeholder="Please identify me as..."
                        className="h-10 bg-white"
                      />
                    </FormField>
                  </div>

                  <Separator className="my-1" />

                  {/* Medical Information - Simplified with comma separation */}
                  <CommaField
                    label="Allergies"
                    value={formData.allergies}
                    onChange={(value) => updateField("allergies", value)}
                    placeholder="e.g., Penicillin, Peanuts, Latex"
                  />

                  <CommaField
                    label="Current Medications"
                    value={formData.medications}
                    onChange={(value) => updateField("medications", value)}
                    placeholder="e.g., Lisinopril 10mg, Metformin 500mg"
                  />

                  <CommaField
                    label="Medical Conditions"
                    value={formData.conditions}
                    onChange={(value) => updateField("conditions", value)}
                    placeholder="e.g., Hypertension, Diabetes Type 2"
                  />

                  {/* Emergency Contact */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-neutral-700">
                      Emergency Contact
                    </Label>
                    <div className="grid gap-2 grid-cols-2">
                      <Input
                        placeholder="Contact Name"
                        value={formData.emergencyContactName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          updateField("emergencyContactName", e.target.value)
                        }
                        className="h-10 bg-white"
                      />
                      <Input
                        placeholder="Phone Number"
                        value={formData.emergencyContactPhone}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          updateField("emergencyContactPhone", e.target.value)
                        }
                        className="h-10 bg-white"
                      />
                    </div>
                  </div>

                  {/* Error and success messages */}
                  {error && (
                    <Alert className="bg-red-50 border-red-200">
                      <AlertDescription className="text-red-700">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="bg-green-50 border-green-200">
                      <AlertDescription className="text-green-700">
                        Medical data saved successfully!
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
                <CardFooter className="bg-neutral-50 border-t border-neutral-100 px-6 py-4">
                  <div className="flex w-full justify-between items-center">
                    <p className="text-xs text-neutral-500">
                      Your SOS is sponsored by
                      <Link
                        href="https://communityfund.stellar.org/"
                        target="_blank"
                      >
                        <Image
                          alt="sponsor logo"
                          className="mt-2"
                          width="100"
                          height="200"
                          src="/sponsor.png"
                        />
                      </Link>
                    </p>

                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <QrCode className="h-4 w-4 animate-pulse mr-2" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <QrCode className="h-4 w-4 mr-2" />
                          Generate SOS
                        </>
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
