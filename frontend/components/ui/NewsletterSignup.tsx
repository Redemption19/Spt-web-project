"use client"
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface NewsletterSignupProps {
  className?: string;
}

export default function NewsletterSignup({ className }: NewsletterSignupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    // Simulate an async action, like sending data to a server
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate 1.5 second delay
    setIsLoading(false);
    setIsSubscribed(true);
    // In a real application, you would handle the actual subscription logic here
    // Instead of alert, we will now show a message in the UI
  };

  return (
    <section className={`py-12 sm:py-16 md:py-20 bg-card rounded-lg ${className}`}>
      <div className="container-custom text-center">
        {!isSubscribed ? (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-foreground">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Stay updated with our latest news, articles, and insights on pension schemes and financial planning.
            </p>
            <div className="flex w-full max-w-sm mx-auto items-center space-x-2">
              <Input type="email" placeholder="Enter your email" aria-label="Email address for newsletter signup" className="dark:bg-background dark:text-foreground dark:placeholder:text-muted-foreground" disabled={isLoading} />
              <Button type="submit" onClick={handleSubscribe} disabled={isLoading} className="bg-rose-700 text-white hover:bg-rose-800 dark:bg-rose-800 dark:hover:bg-rose-900">
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-foreground">Thank You for Subscribing!</h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              You&apos;ve been successfully added to our newsletter list. Look out for our first email in your inbox soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
} 