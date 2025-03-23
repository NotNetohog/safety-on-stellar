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

interface ErrorState {
  error: string;
}

const ErrorState = ({ error }: ErrorState) => {
  return (
    <Card className="border-neutral-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertCircle className="h-5 w-5 text-red-500" />
          Data Retrieval Error
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="bg-red-50 border-red-200">
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      </CardContent>
      <RecordCardFooter />
    </Card>
  );
};

export { ErrorState };
