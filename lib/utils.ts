import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DataParsingError } from "./stellar";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to decode a base64 string to utf-8.
export const decodeData = (encodedValue?: string): string | undefined => {
  return encodedValue
    ? Buffer.from(encodedValue, "base64").toString("utf-8")
    : undefined;
};

// Parse JSON fields with error handling
export const parseJsonField = (
  fieldName: string,
  encodedValue?: string,
): any => {
  if (!encodedValue) return undefined;

  const decodedValue = decodeData(encodedValue);
  if (!decodedValue) return undefined;

  try {
    return JSON.parse(decodedValue);
  } catch (error) {
    throw new DataParsingError(fieldName, error as Error);
  }
};
