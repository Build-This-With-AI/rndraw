import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { PenLine } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "../ui/button";

export function SiteHeader() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link className="flex items-center justify-center" href="/">
        <PenLine className="h-6 w-6 text-primary" />
        <span className="ml-2 text-2xl font-bold text-primary">rndraw</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Suspense>
          <Nav />
        </Suspense>
      </nav>
    </header>
  );
}

async function Nav() {
  const user = await currentUser();
  if (!user) {
    return (
      <Link href="/sign-in">
        <Button>Sign In</Button>
      </Link>
    );
  }
  return (
    <Button asChild>
      <SignOutButton />
    </Button>
  );
}
