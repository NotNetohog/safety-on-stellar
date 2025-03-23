import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

interface HeaderProps {
  hideButton?: boolean;
}

const Header = ({ hideButton = false }: HeaderProps) => {
  return (
    <header className="px-2 lg:px-6 h-16 flex items-center border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/logo.png" width="70" height="30" alt="SOS logo" />
          <span className="sr-only">safety on stellar</span>
        </Link>
        {!hideButton && (
          <nav className="flex gap-6">
            <Button asChild variant="ghost">
              <Link href="/medical-form">Create SOS</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export { Header };
