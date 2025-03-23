import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="py-12 border-t bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                width="50"
                height="50"
                alt="Safety on Stellar logo"
              />
              <span className="font-semibold">Safety on Stellar</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Secure health solutions powered by Stellar
            </p>
          </div>
          <div className="space-y-2">
            <div className="font-semibold">Company</div>
            <Link
              href="/about"
              className="block text-sm text-muted-foreground hover:text-primary"
            >
              About
            </Link>
            <Link
              href="mailto:buenoneto@icloud.com"
              className="block text-sm text-muted-foreground hover:text-primary"
            >
              Contact
            </Link>
          </div>
          <div className="space-y-2">
            <div className="font-semibold">Resources</div>
            <Link
              href="/docs"
              className="block text-sm text-muted-foreground hover:text-primary"
            >
              Documentation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
