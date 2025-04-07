import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
      <h2 className="text-3xl font-bold">Book Not Found</h2>
      <p className="text-muted-foreground">Could not find the requested book.</p>
      <Button asChild>
        <Link href="/books">Return to Books</Link>
      </Button>
    </div>
  );
}