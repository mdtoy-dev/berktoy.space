import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data - in a real app, this would come from an API or database
const books = [
  {
    title: "TypeScript Deep Dive",
    author: "Basarat Ali Syed",
    description: "An open source book that dives deep into TypeScript",
    publishedYear: 2018,
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "The Complete Guide to Modern Web Development",
    author: "John Smith",
    description: "A comprehensive guide covering all aspects of modern web development",
    publishedYear: 2023,
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
  }
];

export async function generateStaticParams() {
  return books.map((book) => ({
    bookTitle: book.title.toLowerCase().replace(/\s+/g, "-"),
  }));
}

interface BookPageProps {
  params: {
    bookTitle: string;
  };
}

export default function BookPage({ params }: BookPageProps) {
  const book = books.find(
    (book) => book.title.toLowerCase().replace(/\s+/g, "-") === params.bookTitle
  );

  if (!book) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{book.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img
              src={book.coverImage}
              alt={book.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              By {book.author} • Published {book.publishedYear}
            </p>
            <p className="text-lg leading-relaxed">{book.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}