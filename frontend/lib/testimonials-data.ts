export type Testimonial = {
  id: number
  name: string
  role: string
  company?: string
  image: string
  message: string
  category: "corporate" | "business" | "individual"
  rating: 1 | 2 | 3 | 4 | 5
  videoUrl?: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Mensah",
    role: "CEO",
    company: "Accra Tech Solutions",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    message: "Standard Pensions Trust has been instrumental in helping us secure our employees' future. Their expertise in pension management and dedication to customer service is unmatched. The online portal makes everything seamless.",
    category: "corporate",
    rating: 5,
    videoUrl: "https://player.vimeo.com/video/824804225?background=1&autoplay=1&loop=1&byline=0&title=0"
  },
  {
    id: 2,
    name: "Sarah Addo",
    role: "Small Business Owner",
    company: "Addo's Fashion House",
    image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg",
    message: "As a small business owner, I needed a pension solution that was both flexible and secure. Standard Pensions Trust delivered exactly that, with exceptional customer service and transparent reporting.",
    category: "business",
    rating: 5
  },
  {
    id: 3,
    name: "Kwame Asante",
    role: "IT Professional",
    company: "Tech Ghana Ltd",
    image: "https://images.pexels.com/photos/3778212/pexels-photo-3778212.jpeg",
    message: "The online portal makes managing my pension incredibly easy. I can track my investments and make changes whenever I need to. Very impressed with the digital experience and customer support.",
    category: "individual",
    rating: 4
  },
  {
    id: 4,
    name: "Grace Owusu",
    role: "HR Director",
    company: "Global Ghana Ltd",
    image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg",
    message: "Managing pensions for our 200+ employees used to be a nightmare. Standard Pensions Trust's corporate solutions have streamlined everything. Their team is always responsive and professional.",
    category: "corporate",
    rating: 5
  },
  {
    id: 5,
    name: "Daniel Koffi",
    role: "Entrepreneur",
    company: "Koffi Ventures",
    image: "https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg",
    message: "The personal pension plan offered by Standard Pensions Trust has given me peace of mind about my retirement. The returns have been consistently good, and their investment strategy is sound.",
    category: "business",
    rating: 4
  },
  {
    id: 6,
    name: "Abena Sarpong",
    role: "Teacher",
    company: "Ghana International School",
    image: "https://images.pexels.com/photos/3812743/pexels-photo-3812743.jpeg",
    message: "I appreciate how Standard Pensions Trust makes pension planning accessible and understandable. Their educational resources have helped me make better financial decisions for my future.",
    category: "individual",
    rating: 5
  },
  {
    id: 7,
    name: "Michael Osei",
    role: "Finance Manager",
    company: "BuildRight Construction",
    image: "https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg",
    message: "The level of professionalism and attention to detail at Standard Pensions Trust is outstanding. They've helped us implement a comprehensive pension scheme that our employees love.",
    category: "corporate",
    rating: 5
  },
  {
    id: 8,
    name: "Fatima Ibrahim",
    role: "Restaurant Owner",
    company: "Tastes of Africa",
    image: "https://images.pexels.com/photos/3765175/pexels-photo-3765175.jpeg",
    message: "Starting a pension scheme for my small restaurant was daunting, but Standard Pensions Trust made it simple. Their flexible solutions work perfectly for small businesses like mine.",
    category: "business",
    rating: 4
  }
]

export const testimonialCategories = [
  { value: "all", label: "All Testimonials" },
  { value: "corporate", label: "Corporate Leaders" },
  { value: "business", label: "Business Owners" },
  { value: "individual", label: "Individual Clients" }
] as const
