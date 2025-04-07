import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">About</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A modern platform for blogs and structured documentation, built with Next.js and TypeScript.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/blog">Blog</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/books">Books</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/newsletter">Newsletter</Link>
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Connect</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DevLibrary. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}