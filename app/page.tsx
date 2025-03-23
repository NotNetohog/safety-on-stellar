import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  QrCode,
  Stethoscope,
  ClipboardList,
  Shield,
  User,
  HeartPulse,
  Droplet,
  WheatOff,
  Pill,
  Phone,
  Lock,
  Globe,
  AlertCircle,
  Check,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-b from-rose-50 to-neutral-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-lg bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700">
                <HeartPulse className="mr-2 h-4 w-4 text-rose-500" />
                Safety On Stellar
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-neutral-900">
                Your Medical Profile,
                <span className="text-rose-600"> When Seconds Count</span>
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed">
                Secure, blockchain-powered emergency medical information that
                can be accessed instantly by healthcare professionals during
                critical situations.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2 bg-primary" asChild>
                  <Link href="/medical-form">
                    Create Your SOS
                    <QrCode className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/sosbanner.png"
                width={650}
                height={400}
                alt="Emergency QR code access demonstration"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="w-full py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-900">
              How Safety On Stellar Works
            </h2>
            <p className="text-xl text-neutral-600">
              Three simple steps to ensure your medical safety in emergencies
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <StepCard
              number="01"
              icon={<ClipboardList className="h-8 w-8" />}
              title="Create Your Profile"
              description="Enter your essential medical information through our secure, encrypted portal in just minutes."
            />
            <StepCard
              number="02"
              icon={<QrCode className="h-8 w-8" />}
              title="Generate Your QR Code"
              description="Your unique Medical SOS QR code is created and linked to your blockchain-protected medical profile."
            />
            <StepCard
              number="03"
              icon={<Stethoscope className="h-8 w-8" />}
              title="Emergency Access"
              description="Healthcare professionals scan your QR code to instantly access your vital medical information."
            />
          </div>
          <div className="mt-16 flex justify-center">
            <Button size="lg" className="gap-2 bg-primary" asChild>
              <Link href="/medical-form">
                Create Your SOS Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Medical Information Section */}
      <section className="w-full py-16 md:py-24 bg-neutral-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-900">
                Critical Information When Every Second Counts
              </h2>
              <p className="text-lg text-neutral-600">
                During medical emergencies, immediate access to your health
                information can be life-saving. Safety On Stellar provides
                healthcare professionals with your essential medical details:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <MedicalInfoItem
                  icon={<Droplet className="h-5 w-5 text-rose-500" />}
                  title="Blood Type"
                  description="Crucial for emergency transfusions and procedures"
                />
                <MedicalInfoItem
                  icon={<WheatOff className="h-5 w-5 text-rose-500" />}
                  title="Allergies"
                  description="Prevents potentially fatal allergic reactions"
                />
                <MedicalInfoItem
                  icon={<Pill className="h-5 w-5 text-rose-500" />}
                  title="Medications"
                  description="Prevents harmful drug interactions in treatment"
                />
                <MedicalInfoItem
                  icon={<HeartPulse className="h-5 w-5 text-rose-500" />}
                  title="Medical Conditions"
                  description="Informs appropriate emergency treatment protocols"
                />
                <MedicalInfoItem
                  icon={<Phone className="h-5 w-5 text-rose-500" />}
                  title="Emergency Contact"
                  description="Notifies your loved ones during emergencies"
                />
                <MedicalInfoItem
                  icon={<User className="h-5 w-5 text-rose-500" />}
                  title="Identification"
                  description="Ensures you receive personalized care"
                />
              </div>
            </div>
            <div className="relative p-6 order-1 lg:order-2">
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-rose-400 to-rose-600">
                  <CardContent className="bg-white p-6 rounded-sm">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <HeartPulse className="h-6 w-6 text-rose-500" />
                        <h1 className="text-lg font-semibold text-neutral-900">
                          Medical SOS
                        </h1>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-neutral-50 p-3 rounded-lg">
                          <p className="text-xs text-neutral-500">Blood Type</p>
                          <p className="text-lg font-semibold text-neutral-900">
                            A+
                          </p>
                        </div>
                        <div className="bg-neutral-50 p-3 rounded-lg">
                          <p className="text-xs text-neutral-500">
                            Identification
                          </p>
                          <p className="text-lg font-semibold text-neutral-900">
                            John Smith
                          </p>
                        </div>
                      </div>

                      <div className="bg-neutral-50 p-3 rounded-lg">
                        <p className="text-xs text-neutral-500">Allergies</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
                            Penicillin
                          </span>
                          <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
                            Peanuts
                          </span>
                          <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
                            Latex
                          </span>
                        </div>
                      </div>

                      <div className="bg-neutral-50 p-3 rounded-lg">
                        <p className="text-xs text-neutral-500">Medications</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full">
                            Lisinopril 10mg
                          </span>
                          <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full">
                            Metformin 500mg
                          </span>
                        </div>
                      </div>

                      <div className="bg-neutral-50 p-3 rounded-lg">
                        <p className="text-xs text-neutral-500">
                          Emergency Contact
                        </p>
                        <p className="text-sm font-medium text-neutral-900">
                          Jane Smith · (555) 123-4567
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>

              <div className="absolute -top-6 -right-6 bg-rose-50 p-3 rounded-lg shadow-lg border border-rose-100 rotate-6">
                <QrCode className="h-16 w-16 text-rose-600" />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-neutral-100 p-3 rounded-full shadow-lg -rotate-12">
                <Stethoscope className="h-8 w-8 text-neutral-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-50">
              Your SOS profile is generously sponsored by
            </h2>

            <div className="mt-8 text-center">
              <div className="mt-4 inline-block bg-white/95 px-6 py-3 rounded-xl">
                <Image
                  src="/sponsor.png"
                  width={120}
                  height={40}
                  alt="Stellar Community Fund logo"
                  className="h-10 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="w-full py-16 md:py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-900">
              Life-Saving Information Secured by Stellar
            </h2>
            <p className="text-xl text-neutral-600">
              Your critical medical data, protected by Stellar blockchain
              technology
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-neutral-800" />}
              title="Military-Grade Security"
              description="Your medical data is encrypted and stored on the secure Stellar blockchain, ensuring your privacy while allowing authorized access."
            />
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-neutral-800" />}
              title="Universal Access"
              description="Your SOS profile is accessible worldwide, making it invaluable during emergencies while traveling or abroad."
            />
            <FeatureCard
              icon={<Lock className="h-10 w-10 text-neutral-800" />}
              title="You Control Your Data"
              description="You decide what to share and who can access your medical information through your unique QR code."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-neutral-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-neutral-100">
          {icon}
        </div>
        <h1 className="text-xl font-semibold text-neutral-900">{title}</h1>
        <p className="text-neutral-600">{description}</p>
      </div>
    </Card>
  );
}

function StepCard({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/80"></div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
              {icon}
            </div>
            <span className="text-4xl font-bold text-neutral-900">
              {number}
            </span>
          </div>
          <h1 className="text-xl font-semibold text-neutral-900">{title}</h1>
          <p className="text-neutral-600">{description}</p>
        </div>
      </div>
    </Card>
  );
}

function MedicalInfoItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-rose-100 rounded-lg shrink-0">{icon}</div>
      <div>
        <h1 className="font-medium text-neutral-900">{title}</h1>
        <p className="text-sm text-neutral-600">{description}</p>
      </div>
    </div>
  );
}
