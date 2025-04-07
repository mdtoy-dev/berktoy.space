"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { BookOpen, FileText, Home } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Blog', href: '/blog', icon: FileText },
  { name: 'Books', href: '/books', icon: BookOpen },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold">DevLibrary</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    isActive ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/newsletter">Newsletter</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}