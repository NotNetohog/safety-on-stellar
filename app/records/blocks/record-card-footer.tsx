import { CardFooter } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const RecordCardFooter = () => {
  return (
    <CardFooter className="bg-neutral-50 border-t border-neutral-100 px-6 py-4">
      <div className="flex w-full justify-between items-center">
        <p className="text-xs text-neutral-500">
          Your SOS is sponsored by
          <Link href="https://communityfund.stellar.org/" target="_blank">
            <Image
              alt="sponsor logo"
              className="mt-2"
              width="100"
              height="33"
              src="/sponsor.png"
            />
          </Link>
        </p>
      </div>
    </CardFooter>
  );
};

export { RecordCardFooter };
