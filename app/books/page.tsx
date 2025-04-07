"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";
import Link from "next/link";

export default function BooksPage() {
  const books = [
    {
      title: "The Complete Guide to Modern Web Development",
      description: "A comprehensive guide covering everything from basic HTML to advanced React patterns and modern backend architectures.",
      chapters: 12,
      level: "Intermediate to Advanced",
      category: "Web Development"
    },
    {
      title: "TypeScript Deep Dive",
      description: "Master TypeScript from the ground up. Learn about types, interfaces, generics, and advanced patterns for building type-safe applications.",
      chapters: 8,
      level: "Intermediate",
      category: "Programming Languages"
    },
    {
      title: "Building Scalable Applications with Next.js",
      description: "Learn how to build production-ready applications using Next.js, including routing, data fetching, and deployment strategies.",
      chapters: 10,
      level: "Advanced",
      category: "Framework"
    }
  ];

  return (
    <main className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Technical Books</h1>
          <p className="text-muted-foreground">
            In-depth guides and documentation for modern web development.
          </p>
        </div>

        <div className="grid gap-6">
          {books.map((book, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Book className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl hover:text-primary cursor-pointer">
                      <Link href={`/books/${book.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        {book.title}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span>{book.category}</span>
                      <span>•</span>
                      <span>{book.level}</span>
                      <span>•</span>
                      <span>{book.chapters} chapters</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {book.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}