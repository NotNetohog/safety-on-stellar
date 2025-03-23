import { CommaFieldProps } from "@/lib/types";
import { FormField } from "./form-field";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

const CommaField = ({
  label,
  value,
  onChange,
  placeholder,
}: CommaFieldProps) => {
  return (
    <FormField label={label}>
      <Input
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="h-10 bg-white"
      />
      <p className="text-xs text-muted-foreground mt-1">
        Separate multiple entries with commas
      </p>
    </FormField>
  );
};

export { CommaField };
