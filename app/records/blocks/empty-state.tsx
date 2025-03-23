import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, QrCode } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RecordCardFooter } from "./record-card-footer";

const EmptyState = () => {
  return (
    <Card className="border-neutral-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          No Medical Profile Found
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="bg-amber-50 border-amber-200">
          <AlertDescription className="text-amber-800">
            No health records found for this blockchain ID. Please verify the ID
            or create a new profile.
          </AlertDescription>
        </Alert>
      </CardContent>
      <RecordCardFooter />
    </Card>
  );
};

export { EmptyState };
