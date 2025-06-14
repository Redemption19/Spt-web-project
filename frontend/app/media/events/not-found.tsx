import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Calendar } from 'lucide-react'

export default function EventNotFound() {
  return (
    <section className="py-32">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-muted/30 p-4">
              <Calendar className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Event Not Found
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Sorry, we couldn&apos;t find the event you&apos;re looking for. It may have been removed or the URL might be incorrect.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" size="lg">
              <Link href="/media/events">
                View All Events
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                Return Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
