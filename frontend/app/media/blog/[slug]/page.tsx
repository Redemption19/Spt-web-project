import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { CalendarDays, Clock } from 'lucide-react';
import { ShareButtons } from '../../../../components/share-buttons';
import { blogPosts } from '../../../../lib/constants';
import NewsletterSignup from '../../../../components/ui/NewsletterSignup';
import { BlogCard } from '../../../../components/blog-card';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Avatar } from '../../../../components/ui/avatar';
import { BlogPost } from '../../../../lib/schemas/blog-schema';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter(
      (p) =>
        p.id !== post.id &&
        (p.category === post.category || (p.tags && post.tags && p.tags.some((tag) => post.tags?.includes(tag))))
    )
    .slice(0, 3);
  return (
    <article className="container-custom py-12">
      {/* Article Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <div className="mb-4">
          <Link href={`/media/blog/category/${post.category.toLowerCase()}`}>
            <Badge variant="outline" className="text-primary hover:bg-primary/10 transition-colors">
              {post.category}
            </Badge>
          </Link>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={post.publishedAt.toISOString()}>
              {format(post.publishedAt, 'MMMM d, yyyy')}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readingTimeMinutes} min read</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Author Info */}
      <Card className="mb-8 p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{post.author.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{post.author.bio}</p>
          </div>
        </div>
      </Card>

      {/* Article Content */}
      <div className="prose prose-lg dark:prose-invert prose:text-left text-left">
        {post.content}
      </div>

      {/* Tags */}      {post.tags && (
        <div className="my-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}      {/* Social Sharing */}
      <ShareButtons title={post.title} url={`${process.env.NEXT_PUBLIC_BASE_URL}/media/blog/${post.slug}`} />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Related Posts</h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter Signup Section */}
      <NewsletterSignup className="mt-16" />

    </article>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      ...(post.featuredImage && {
        images: [{ url: post.featuredImage.url, alt: post.featuredImage.alt }],
      }),
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}
