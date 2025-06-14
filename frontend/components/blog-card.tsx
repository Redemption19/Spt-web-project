import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/schemas/blog-schema";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out group">
      <Link href={`/media/blog/${post.slug}`} className="block overflow-hidden">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <CardHeader className="flex-grow">
        <div className="mb-2">
          <Link href={`/media/blog/category/${post.category.toLowerCase()}`}>
            <Badge variant="outline" className="text-primary hover:bg-primary/10 transition-colors">
              {post.category}
            </Badge>
          </Link>
        </div>        <Link href={`/media/blog/${post.slug}`} className="block">
          <CardTitle className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </Link>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
      </CardHeader>
      <CardContent className="text-xs text-muted-foreground">
        <div className="flex items-center space-x-2 mb-1">
          <CalendarDays className="h-4 w-4" />
          <span>{formatDate(post.publishedAt.toISOString())}</span>
        </div>
        {post.readingTimeMinutes && (
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>{post.readingTimeMinutes} min read</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild variant="ghost" size="sm" className="group/button w-full justify-start p-0 text-white hover:text-white/90">
          <Link href={`/media/blog/${post.slug}`} className="flex items-center">
            Read More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
