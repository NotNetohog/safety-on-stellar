import { Label } from "@/components/ui/label";
import { FormFieldProps } from "@/lib/types";

const FormField = ({ label, children }: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-neutral-700">{label}</Label>
      {children}
    </div>
  );
};

export { FormField };
