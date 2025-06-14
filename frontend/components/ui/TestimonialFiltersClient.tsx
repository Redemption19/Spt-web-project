"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation';
import type * as RadixSelect from "@radix-ui/react-select"
import type * as RadixRadioGroup from "@radix-ui/react-radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { testimonialCategories } from "@/lib/testimonials-data"

type Category = (typeof testimonialCategories)[number]["value"]
type Rating = "all" | "4" | "5"

interface TestimonialFiltersClientProps {
  initialCategory: Category;
  initialRating: Rating;
  categories: typeof testimonialCategories;
}

export default function TestimonialFiltersClient({
  initialCategory,
  initialRating,
  categories,
}: TestimonialFiltersClientProps): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value === 'all') {
      current.delete('category');
    } else {
      current.set('category', value);
    }
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${window.location.pathname}${query}`);
  };

  const handleRatingChange = (value: string) => {
     const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value === 'all') {
      current.delete('rating');
    } else {
      current.set('rating', value);
    }
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${window.location.pathname}${query}`);
  };

  return (
    <section className="py-8 bg-muted/50 border-b sticky top-0 z-10 backdrop-blur-sm">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Select value={initialCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <RadioGroup
            defaultValue="all"
            value={initialRating}
            onValueChange={handleRatingChange}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Ratings</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5" id="five" />
              <Label htmlFor="five">5 Stars</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4" id="four" />
              <Label htmlFor="four">4 Stars</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </section>
  );
} 