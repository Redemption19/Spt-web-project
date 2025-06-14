import * as React from "react"
import type * as RadixSelect from "@radix-ui/react-select"
import type * as RadixRadioGroup from "@radix-ui/react-radio-group"
import { testimonials, testimonialCategories, type Testimonial } from "@/lib/testimonials-data"
import { TestimonialCard } from "@/components/testimonial-card"
import TestimonialFiltersClient from "../../components/ui/TestimonialFiltersClient"

type Category = (typeof testimonialCategories)[number]["value"]
type Rating = "all" | "4" | "5"

interface TestimonialsPageProps {
  searchParams: {
    category?: string;
    rating?: string;
  };
}

export default async function TestimonialsPage({ searchParams }: TestimonialsPageProps): Promise<React.JSX.Element> {
  const selectedCategory = (searchParams.category as Category) || "all"
  const selectedRating = (searchParams.rating as Rating) || "all"

  const filteredTestimonials = testimonials
    .filter((t: Testimonial) => selectedCategory === "all" || t.category === selectedCategory)
    .filter((t: Testimonial) => selectedRating === "all" || t.rating === parseInt(selectedRating))
    .sort((a: Testimonial, b: Testimonial) => b.rating - a.rating)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-background border-b">
        <div className="container-custom">
          <div
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Client Success Stories
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how Standard Pensions Trust has helped businesses and individuals 
              across Ghana secure their financial future through expert pension management 
              and dedicated customer service.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section - Use client component */}
      <TestimonialFiltersClient 
        initialCategory={selectedCategory} 
        initialRating={selectedRating}
        categories={testimonialCategories}
      />

      {/* Testimonials Grid */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((testimonial: Testimonial, index: number) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div
              className="text-center py-20"
            >
              <p className="text-xl text-muted-foreground">
                No testimonials found for the selected filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
