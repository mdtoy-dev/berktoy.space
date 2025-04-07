"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function BlogPage() {
  const blogPosts = [
    {
      title: "Getting Started with Web Development",
      date: "March 15, 2024",
      description: "Learn the fundamentals of modern web development and best practices for building responsive websites.",
      readTime: "5 min read"
    },
    {
      title: "Understanding React Hooks",
      date: "March 12, 2024",
      description: "Deep dive into React's hooks system and how to effectively manage state in your applications.",
      readTime: "8 min read"
    },
    {
      title: "The Power of TypeScript",
      date: "March 10, 2024",
      description: "Discover how TypeScript can improve your development workflow and catch errors before they reach production.",
      readTime: "6 min read"
    }
  ];

  return (
    <main className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Blog</h1>
        <p className="text-muted-foreground mb-8">Insights and articles about web development, design, and technology.</p>
        
        <ScrollArea className="h-[800px] pr-4">
          <div className="space-y-6">
            {blogPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl hover:text-primary cursor-pointer">
                        {post.title}
                      </CardTitle>
                      <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {post.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}