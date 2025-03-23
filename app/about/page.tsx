"use client";

import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Shield,
  Globe,
  Heart,
  Lock,
  QrCode,
  ExternalLink,
  CheckCircle,
  Rocket,
  Blocks,
  Fingerprint,
  HeartPulse,
  Users,
  Zap,
  Map,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Technical features
const features = [
  {
    icon: <Blocks className="h-5 w-5 text-indigo-600" />,
    title: "Immutable Records",
    description: "Medical information cannot be altered without authorization",
  },
  {
    icon: <Globe className="h-5 w-5 text-indigo-600" />,
    title: "Global Accessibility",
    description: "Available anywhere with internet connectivity",
  },
  {
    icon: <Zap className="h-5 w-5 text-indigo-600" />,
    title: "Cost-Effective",
    description: "Minimal transaction fees make the solution viable at scale",
  },
  {
    icon: <Shield className="h-5 w-5 text-indigo-600" />,
    title: "Decentralized Security",
    description: "No single point of failure for critical medical data",
  },
];

// Real-world impact
const impacts = [
  {
    icon: <HeartPulse className="h-5 w-5 text-pink-600" />,
    title: "Emergency Preparedness",
    description:
      "Instant access to life-saving information when patients cannot communicate",
  },
  {
    icon: <Globe className="h-5 w-5 text-pink-600" />,
    title: "Global Accessibility",
    description: "Works seamlessly across healthcare systems worldwide",
  },
  {
    icon: <Map className="h-5 w-5 text-pink-600" />,
    title: "Traveler Security",
    description: "Peace of mind for international travelers and digital nomads",
  },
  {
    icon: <Users className="h-5 w-5 text-pink-600" />,
    title: "Digital Inclusion",
    description: "Solution accessible to anyone with a smartphone",
  },
  {
    icon: <Fingerprint className="h-5 w-5 text-pink-600" />,
    title: "Data Security",
    description:
      "Protects sensitive medical information through blockchain technology",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header hideButton={true} />

      <main className="flex-1">
        <div className="container py-6 md:py-8 lg:py-12">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold">About SOS</h1>
                <p className="text-sm text-muted-foreground">
                  Revolutionizing Emergency Medical Access Through Blockchain
                </p>
              </div>
            </div>

            <Alert className="bg-muted">
              <AlertDescription className="text-muted-foreground">
                Safety On Stellar (SOS) provides instant access to critical
                patient data during emergencies—regardless of location, language
                barriers, or healthcare system differences.
              </AlertDescription>
            </Alert>

            <Card className="border-neutral-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="h-5 w-5 text-rose-500" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-700">
                  At Safety On Stellar, we believe that access to critical
                  medical information should be universal and immediate when
                  seconds count. Our mission is to save lives by creating a
                  secure, global system that ensures healthcare providers can
                  access essential medical data during emergencies, anywhere in
                  the world.
                </p>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-amber-500" />
                  Why We Exist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-700 mb-4">
                  In emergency situations, healthcare providers often make
                  critical decisions with limited patient information. For
                  travelers, those with chronic conditions, or anyone
                  experiencing a medical emergency away from their regular
                  healthcare providers, this information gap can lead to delayed
                  treatment, medical errors, or worse outcomes.
                </p>
                <p className="text-neutral-700">
                  SOS bridges this critical gap using blockchain technology.
                </p>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Rocket className="h-5 w-5 text-green-500" />
                  Our Solution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-neutral-700">
                  SOS leverages the Stellar blockchain to store and secure
                  essential emergency medical information:
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-white rounded-lg p-4 border border-neutral-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <h1 className="text-sm font-medium text-neutral-700">
                        Critical Data Focus
                      </h1>
                    </div>
                    <p className="text-sm text-neutral-600">
                      Blood type, allergies, medications, medical conditions,
                      and emergency contacts
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-neutral-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <h1 className="text-sm font-medium text-neutral-700">
                        Universal Access
                      </h1>
                    </div>
                    <p className="text-sm text-neutral-600">
                      Simple QR codes link to a patient's blockchain-secured
                      medical profile
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-neutral-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <h1 className="text-sm font-medium text-neutral-700">
                        Global Availability
                      </h1>
                    </div>
                    <p className="text-sm text-neutral-600">
                      Works across borders, languages, and healthcare systems
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-neutral-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <h1 className="text-sm font-medium text-neutral-700">
                        User Control
                      </h1>
                    </div>
                    <p className="text-sm text-neutral-600">
                      Individuals maintain complete ownership of their medical
                      information
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-neutral-200 md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <h1 className="text-sm font-medium text-neutral-700">
                        Healthcare Provider Simplicity
                      </h1>
                    </div>
                    <p className="text-sm text-neutral-600">
                      No specialized equipment or applications needed beyond a
                      web browser
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Blocks className="h-5 w-5 text-indigo-500" />
                  Why Blockchain?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-neutral-700">
                  Traditional medical record systems operate in isolated
                  environments, making cross-border or even cross-hospital
                  information sharing challenging. By utilizing Stellar's
                  blockchain technology, SOS creates:
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 border border-neutral-200"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {feature.icon}
                        <h1 className="text-sm font-medium text-neutral-700">
                          {feature.title}
                        </h1>
                      </div>
                      <p className="text-sm text-neutral-600">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-pink-500" />
                  Real-World Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-neutral-700">
                  SOS addresses several critical healthcare challenges:
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  {impacts.map((impact, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 border border-neutral-200"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {impact.icon}
                        <h1 className="text-sm font-medium text-neutral-700">
                          {impact.title}
                        </h1>
                      </div>
                      <p className="text-sm text-neutral-600">
                        {impact.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="h-5 w-5 text-rose-500" />
                  Join Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-700 mb-4">
                  Whether you're a healthcare provider, a frequent traveler,
                  someone with medical conditions, or simply someone who values
                  preparedness, SOS offers a solution that transcends borders
                  and systems to make critical medical information available
                  when it matters most.
                </p>
                <p className="text-neutral-700">
                  At Safety On Stellar, we're creating a safer world through
                  accessible healthcare information, one blockchain entry at a
                  time.
                </p>
              </CardContent>
              <CardFooter className="bg-neutral-50 border-t border-neutral-100 px-6 py-4">
                <div className="flex w-full justify-between items-center">
                  <p className="text-xs text-neutral-500">
                    Your SOS is sponsored by
                    <Link
                      href="https://communityfund.stellar.org/"
                      target="_blank"
                    >
                      <Image
                        alt="sponsor logo"
                        className="mt-2"
                        width="100"
                        height="200"
                        src="/sponsor.png"
                      />
                    </Link>
                  </p>
                  <Button asChild>
                    <Link href="/">
                      <QrCode className="h-4 w-4 mr-2" />
                      Create SOS
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <div className="text-xs text-neutral-500 text-center">
              <p>
                Built on the Stellar blockchain.
                <a
                  href="https://stellar.org"
                  className="text-blue-600 hover:underline ml-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                  <ExternalLink className="h-3 w-3 inline ml-1" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
