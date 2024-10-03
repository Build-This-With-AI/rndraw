import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return <Landing />;
}

function Landing() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary-foreground">
                Collaborate in Real-Time with rndraw
              </h1>
              <p className="mx-auto max-w-[700px] text-primary-foreground md:text-xl">
                Unleash your creativity together. Draw, sketch, and brainstorm
                with your team in real-time, no matter where you are.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/dashboard">
                <Button variant="secondary" size="lg">
                  Get Started
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-background"
      >
        <div className="px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Users className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">
                Real-Time Collaboration
              </h3>
              <p className="text-muted-foreground">
                Draw and edit together in real-time with your team members.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Zap className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Instant Sync</h3>
              <p className="text-muted-foreground">
                See changes instantly across all devices and platforms.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Globe className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Cross-Platform</h3>
              <p className="text-muted-foreground">
                Access your drawings from any device, anywhere in the world.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Start Collaborating Today
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of teams already using rndraw to bring their
                ideas to life.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit">Sign Up</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                By signing up, you agree to our{" "}
                <Link className="underline underline-offset-2" href="#">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
