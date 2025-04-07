import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// This would typically come from a database or API
const chapters = {
  "typescript-deep-dive": {
    "introduction": {
      title: "Introduction to TypeScript",
      content: `
TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open source.

## Why TypeScript?

TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript.

## Getting Started

To get started with TypeScript, you'll need to:
1. Install Node.js
2. Install TypeScript via npm
3. Create your first TypeScript file
4. Compile and run your code

## Key Benefits

- Static typing
- Object-oriented features
- IDE support
- ECMAScript compatibility
- Cross-platform
- Cross-browser compatibility
      `
    }
  },
  "the-complete-guide-to-modern-web-development": {
    "overview": {
      title: "Modern Web Development Overview",
      content: `
Welcome to Modern Web Development! This chapter provides a comprehensive overview of the current web development landscape.

## The Modern Web Platform

The web platform has evolved significantly over the past decade. Today's web applications are:
- More interactive
- Faster and more responsive
- More secure
- More accessible
- Cross-platform compatible

## Key Technologies

Modern web development relies on several core technologies:
1. HTML5 for structure
2. CSS3 for styling
3. JavaScript (ES6+) for functionality
4. Web APIs for browser features
5. Modern build tools and bundlers

## Development Workflow

A typical modern web development workflow includes:
- Version control with Git
- Package management with npm or yarn
- Automated testing
- Continuous Integration/Deployment
- Performance monitoring
      `
    }
  }
};

interface ChapterPageProps {
  params: {
    bookTitle: string;
    chapter: string;
  };
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const bookChapters = chapters[params.bookTitle as keyof typeof chapters];
  if (!bookChapters) notFound();

  const chapter = bookChapters[params.chapter as keyof typeof bookChapters];
  if (!chapter) notFound();

  return (
    <div className="container max-w-4xl mx-auto py-10 px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{chapter.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            {chapter.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph.startsWith('##') ? (
                  <h2 className="text-2xl font-bold mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                ) : paragraph.startsWith('-') ? (
                  <ul className="list-disc list-inside">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i} className="mb-2">{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                ) : paragraph.match(/^\d\./) ? (
                  <ol className="list-decimal list-inside">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i} className="mb-2">{item.replace(/^\d\.\s/, '')}</li>
                    ))}
                  </ol>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}