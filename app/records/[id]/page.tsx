import { HeartPulse } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EmergencyButton } from "../blocks/emergency-button";
import { ErrorState } from "../blocks/error-state";
import { EmptyState } from "../blocks/empty-state";
import { RecordCardFooter } from "../blocks/record-card-footer";
import {
  AccountLoadError,
  DataParsingError,
  retrieveMedicalData,
} from "@/lib/stellar";

export default async function MedicalRecordPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let medicalData = null;
  let error = null;

  try {
    medicalData = await retrieveMedicalData(id);
  } catch (err) {
    if (err instanceof AccountLoadError) {
      error =
        "Could not find a account with this ID. Please verify the ID is correct.";

      console.log(error);
    } else if (err instanceof DataParsingError) {
      error =
        "The medical data appears to be corrupted. Please recreate your profile.";
    } else {
      error = "Failed to retrieve medical data. Please try again later.";
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header hideButton={true} />
      <main className="flex-1">
        <div className="container py-6 md:py-8 lg:py-12">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold">Medical Information</h1>
                <p className="text-sm text-muted-foreground">
                  Emergency health data from Stellar blockchain
                </p>
              </div>
            </div>

            <Alert className="bg-muted">
              <AlertDescription className="text-muted-foreground">
                This information is securely stored on the Stellar blockchain
                and only accessible with the correct ID.
              </AlertDescription>
            </Alert>

            {error && <ErrorState error={error} />}
            {!medicalData && !error && <EmptyState />}

            {medicalData && (
              <Card className="border-neutral-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <HeartPulse className="size-6 text-rose-500" />
                    Medical SOS
                  </CardTitle>
                  <CardDescription>
                    ID: {id.slice(0, 4)}...{id.slice(-4)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Info Section */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-neutral-50 p-3 rounded-lg">
                      <p className="text-xs text-neutral-500">Blood Type</p>
                      <p className="text-lg font-semibold text-neutral-900">
                        {medicalData.bloodType}
                      </p>
                    </div>
                    <div className="bg-neutral-50 p-3 rounded-lg">
                      <p className="text-xs text-neutral-500">Identification</p>
                      <p className="text-lg font-semibold text-neutral-900">
                        {medicalData.identification || "Not provided"}
                      </p>
                    </div>
                  </div>

                  {/* Allergies */}
                  <div className="bg-neutral-50 p-3 rounded-lg">
                    <p className="text-xs text-neutral-500">Allergies</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {medicalData.allergies.length > 0 ? (
                        medicalData.allergies.map((allergy, index) => (
                          <span
                            key={index}
                            className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full"
                          >
                            {allergy}
                          </span>
                        ))
                      ) : (
                        <p className="text-neutral-600">No known allergies</p>
                      )}
                    </div>
                  </div>

                  {/* Medications */}
                  <div className="bg-neutral-50 p-3 rounded-lg">
                    <p className="text-xs text-neutral-500">Medications</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {medicalData.medications.length > 0 ? (
                        <div className="grid gap-2 md:grid-cols-2">
                          {medicalData.medications.map((medication, index) => (
                            <span
                              key={index}
                              className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full"
                            >
                              {medication}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-neutral-600">
                          No current medications
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="bg-neutral-50 p-3 rounded-lg">
                    <p className="text-xs text-neutral-500">Conditions</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {medicalData.conditions.length > 0 ? (
                        <div className="grid gap-2 md:grid-cols-2">
                          {medicalData.conditions.map((condition, index) => (
                            <span
                              key={index}
                              className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full"
                            >
                              {condition}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-neutral-600">
                          No current conditions
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="bg-neutral-50 p-3 rounded-lg">
                    <p className="text-xs text-neutral-500">
                      Emergency Contact
                    </p>
                    <p className="text-sm font-medium text-neutral-900 flex justify-between items-center ">
                      <span>
                        {medicalData.emergencyContact.name || "Not provided"} ·{" "}
                        {medicalData.emergencyContact.phone ||
                          "No phone number"}
                      </span>
                      {medicalData.emergencyContact.phone && (
                        <EmergencyButton
                          phone={medicalData.emergencyContact.phone}
                        />
                      )}
                    </p>
                  </div>
                </CardContent>
                <RecordCardFooter />
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
