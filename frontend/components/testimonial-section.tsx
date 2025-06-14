"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QuoteIcon, ArrowRight } from "lucide-react"
import Link from "next/link"

const testimonial = {
  videoUrl:
    "https://player.vimeo.com/video/824804225?background=1&autoplay=1&loop=1&byline=0&title=0",
  thumbnailUrl:
    "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg",
  name: "John Mensah",
  role: "CEO, Accra Tech Solutions",
  message:
    "Standard Pensions Trust has been instrumental in helping us secure our employees' future. Their expertise in pension management and dedication to customer service is unmatched. I highly recommend their services to any business looking for reliable pension solutions.",
}

export function TestimonialSection(): React.JSX.Element {
  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from businesses and individuals who have transformed their
            retirement planning with Standard Pensions Trust.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid gap-8 lg:grid-cols-2 items-center max-w-6xl mx-auto"
        >
          {/* Video Side */}
          <Card className="overflow-hidden border-none shadow-xl bg-black/5">
            <CardContent className="p-0">
              <div className="relative aspect-video w-full">
                <iframe
                  src={testimonial.videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  style={{ border: 0 }}
                  title="Customer Testimonial"
                />
              </div>
            </CardContent>
          </Card>

          {/* Content Side */}
          <div className="space-y-6">
            <Card className="relative border-none bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
              <CardContent className="pt-6">
                <QuoteIcon className="absolute top-6 left-6 h-8 w-8 text-primary/20" />
                <blockquote className="pl-12 relative">
                  <p className="text-lg text-muted-foreground italic leading-relaxed">
                    {testimonial.message}
                  </p>
                  <footer className="mt-4">
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-border/60" />
                      <div>
                        <cite className="not-italic">
                          <div className="font-semibold text-foreground">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </div>
                        </cite>
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="flex justify-center mt-12">
          <Button asChild size="lg" variant="outline" className="group">
            <Link
              href="/testimonials"
              className="flex items-center"
            >
              View More Testimonials
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
