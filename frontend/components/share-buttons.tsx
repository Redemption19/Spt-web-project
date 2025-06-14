'use client';

import { Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const handleShare = (platform: string) => {
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <span className="flex items-center text-sm text-muted-foreground">
        <Share2 className="mr-2 h-4 w-4" /> Share this article:
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-primary/10 hover:text-primary transition-colors"
          onClick={() => handleShare('twitter')}
        >
          <Twitter className="h-4 w-4" />
          <span className="sr-only">Share on Twitter</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-primary/10 hover:text-primary transition-colors"
          onClick={() => handleShare('facebook')}
        >
          <Facebook className="h-4 w-4" />
          <span className="sr-only">Share on Facebook</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-primary/10 hover:text-primary transition-colors"
          onClick={() => handleShare('linkedin')}
        >
          <Linkedin className="h-4 w-4" />
          <span className="sr-only">Share on LinkedIn</span>
        </Button>
      </div>
    </div>
  );
}
