import { ReactNode } from "react";

interface FormData {
  bloodType: string;
  identification: string;
  allergies: string;
  medications: string;
  conditions: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

interface BlockchainData {
  bloodType?: string;
  identification?: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  emergencyContact: {
    name: string;
    phone: string;
  };
}

interface StellarAccount {
  secretKey: string;
  publicKey: string;
}

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

interface CommaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export type {
  FormData,
  BlockchainData,
  StellarAccount,
  FormFieldProps,
  CommaFieldProps,
};
