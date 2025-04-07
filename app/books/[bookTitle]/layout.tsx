import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

// This would typically come from a database or API
const books = {
  "typescript-deep-dive": {
    title: "TypeScript Deep Dive",
    chapters: [
      { title: "Introduction to TypeScript", slug: "introduction" },
      { title: "Basic Types", slug: "basic-types" },
      { title: "Interfaces", slug: "interfaces" },
      { title: "Classes", slug: "classes" },
      { title: "Generics", slug: "generics" },
      { title: "Advanced Types", slug: "advanced-types" },
      { title: "Modules and Namespaces", slug: "modules" },
      { title: "TypeScript in Practice", slug: "in-practice" },
    ]
  },
  "the-complete-guide-to-modern-web-development": {
    title: "The Complete Guide to Modern Web Development",
    chapters: [
      { title: "Modern Web Development Overview", slug: "overview" },
      { title: "HTML5 and Semantic Markup", slug: "html5" },
      { title: "CSS3 and Modern Layouts", slug: "css3" },
      { title: "JavaScript Fundamentals", slug: "javascript" },
      { title: "React Essentials", slug: "react" },
      { title: "State Management", slug: "state-management" },
      { title: "Backend Integration", slug: "backend" },
      { title: "Testing and Deployment", slug: "testing" },
      { title: "Performance Optimization", slug: "performance" },
      { title: "Security Best Practices", slug: "security" },
      { title: "Accessibility", slug: "accessibility" },
      { title: "Future of Web Development", slug: "future" },
    ]
  }
};

export default function BookLayout({ children, params }: {
  children: React.ReactNode;
  params: { bookTitle: string };
}) {
  const book = books[params.bookTitle as keyof typeof books];
  
  if (!book) return children;

  return (
    <div className="grid lg:grid-cols-[300px_1fr] h-[calc(100vh-4rem)]">
      <div className="hidden lg:block border-r bg-muted/40">
        <ScrollArea className="h-full py-6 pl-8 pr-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <ChevronRight className="h-4 w-4" />
              <Link href="/books" className="hover:text-primary transition-colors">
                Books
              </Link>
            </div>
            <h2 className="font-semibold text-lg">{book.title}</h2>
            <div className="space-y-1">
              {book.chapters.map((chapter, index) => (
                <Link
                  key={chapter.slug}
                  href={`/books/${params.bookTitle}/${chapter.slug}`}
                  className={cn(
                    "block py-1.5 text-sm transition-colors hover:text-primary",
                    "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {index + 1}. {chapter.title}
                </Link>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
      <div className="h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}