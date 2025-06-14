'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'

interface Slide {
  id: number
  image: string
  title: string
  subtitle: string
  buttons: { text: string; href: string }[]
  textPosition: 'left' | 'right'
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/images/slider/slider1.jpg',
    title: 'Secure Your\nFinancial Future',
    subtitle: 'Expert pension administration and retirement planning solutions for all Ghanaians.',
    buttons: [
      { text: 'Explore Our Schemes', href: '/schemes' },
      { text: 'Get a Quote', href: '/contact' },
    ],
    textPosition: 'left',
  },
  {
    id: 2,
    image: '/images/slider/slider2.jpg',
    title: 'Plan for\nRetirement with Confidence',
    subtitle: 'Use our calculator to estimate your pension and make informed decisions for your future.',
    buttons: [
      { text: 'Try Calculator', href: '/pension-calculator' },
      { text: 'Learn More', href: '/about' },
    ],
    textPosition: 'right',
  },
  {
    id: 3,
    image: '/images/slider/slider3.jpg',
    title: 'Join Thousands\nof Satisfied Members',
    subtitle: 'Over 17,000 Ghanaians trust us to manage their retirement savings and benefits.',
    buttons: [
      { text: 'Become a Member', href: '/forms/employee-enrollment' },
      { text: 'Contact Us', href: '/contact' },
    ],
    textPosition: 'left',
  },
]

export function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [prevSlideIndex, setPrevSlideIndex] = useState(0)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const sliderTimerRef = useRef<NodeJS.Timeout | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  
  // Handle slide changes with improved transitions
  const changeSlide = (newIndex: number) => {
    if (isAnimating) return
    
    // Immediately mark as animating to prevent multiple triggers
    setIsAnimating(true)
    
    // Update slide indices
    setPrevSlideIndex(currentSlide)
    setCurrentSlide(newIndex)
    
    // Reset timer when slide changes manually
    resetTimer()
  }

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % slides.length
    changeSlide(newIndex)
  }

  const prevSlide = () => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length
    changeSlide(newIndex)
  }

  const goToSlide = (index: number) => {
    if (index === currentSlide) return
    changeSlide(index)
  }
  
  // Clear existing timer and start a new one
  const resetTimer = () => {
    if (sliderTimerRef.current) {
      clearTimeout(sliderTimerRef.current)
    }
    startAutoSlideTimer()
  }
  
  // Start auto-slide timer
  const startAutoSlideTimer = () => {
    sliderTimerRef.current = setTimeout(() => {
      // Use functional update to ensure we're using the latest state
      setCurrentSlide(current => {
        const next = (current + 1) % slides.length
        setPrevSlideIndex(current)
        return next
      })
      setIsAnimating(true)
    }, 7000)
  }

  // Handle the animation sequence when slides change
  useEffect(() => {
    // Skip animation on initial render
    if (prevSlideIndex === currentSlide) return
    
    // Kill any running animation to prevent conflicts
    if (timelineRef.current) {
      timelineRef.current.kill()
    }
    
    // Create a new timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false)
        resetTimer()
      }
    })
    
    timelineRef.current = tl
    
    // Get the elements
    const prevImage = imageRefs.current[prevSlideIndex]
    const currentImage = imageRefs.current[currentSlide]
    
    // Fade out previous slide
    if (prevImage) {
      tl.to(prevImage, { 
        opacity: 0, 
        scale: 1.05,
        filter: 'blur(5px)',
        duration: 0.7,
        ease: 'power2.out' 
      })
    }
    
    // Fade in current slide
    if (currentImage) {
      tl.fromTo(
        currentImage,
        { 
          scale: 1.1, 
          opacity: 0, 
          filter: 'blur(10px)',
          zIndex: 1
        },
        { 
          scale: 1, 
          opacity: 1, 
          filter: 'blur(0px)',
          zIndex: 0,
          duration: 1,
          ease: 'power2.inOut' 
        },
        '-=0.4'
      )
    }
    
    // Animate text
    if (textRef.current) {
      tl.fromTo(
        textRef.current,
        { 
          opacity: 0, 
          y: 30, 
          filter: 'blur(8px)' 
        },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)', 
          duration: 0.8,
          ease: 'power3.out' 
        },
        '-=0.6'
      )
    }
    
    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [currentSlide, prevSlideIndex])

  // Initialize auto-play when component mounts
  useEffect(() => {
    startAutoSlideTimer()
    
    // Clear timer on unmount
    return () => {
      if (sliderTimerRef.current) {
        clearTimeout(sliderTimerRef.current)
      }
    }
  }, [])

  const slide = slides[currentSlide]
  
  // Updated positioning classes to match the design example
  const textAlign = slide.textPosition === 'left' ? 'text-left' : 'text-right'
  const textPosition = slide.textPosition === 'left' 
    ? '' // Align with the Standard text in header
    : 'mr-6 ml-auto md:mr-12 md:ml-auto'
  const maxWidth = "max-w-xl"

  return (
    <section className="relative w-full h-[520px] md:h-[600px] lg:h-[700px] flex items-center overflow-hidden bg-black">
      {/* Background Images */}
      {slides.map((s, idx) => (
        <div
          key={s.id}
          ref={el => imageRefs.current[idx] = el}
          className="absolute inset-0 w-full h-full"
          style={{ 
            opacity: idx === currentSlide ? 1 : 0,
            zIndex: idx === currentSlide ? 0 : -1,
            visibility: idx === currentSlide || idx === prevSlideIndex ? 'visible' : 'hidden'
          }}
        >
          <Image
            src={s.image}
            alt={s.title.replace(/\\n/g, ' ')}
            fill
            className="object-cover object-right md:object-center"
            priority={idx === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}
      
      {/* Text Content */}
      <div className="container-custom relative z-10 h-full flex items-center">
        <div
          ref={textRef}
          className={`${textAlign} ${textPosition} ${maxWidth}`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white">
            {slide.title.split('\n').map((line, i) => (
              <span key={i} className={i === 1 ? 'text-primary' : ''}>
                {line}
                {i < slide.title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8">
            {slide.subtitle}
          </p>
          <div className="flex gap-4 flex-wrap">
            {slide.buttons.map((btn, i) => (
              <Button
                asChild
                key={btn.text}
                size="lg"
                className={i === 0 ? 'bg-primary text-white hover:bg-primary/90' : 'bg-transparent border border-white text-white hover:bg-white hover:text-primary'}
              >
                <Link href={btn.href}>
                  {btn.text}
                  {i === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${idx === currentSlide ? 'bg-primary' : 'bg-white/50'}`}
            aria-label={`Go to slide ${idx + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
        disabled={isAnimating}
      >
        <span className="sr-only">Previous</span>
        <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
        aria-label="Next slide"
        disabled={isAnimating}
      >
        <span className="sr-only">Next</span>
        <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
      </button>
    </section>
  )
} 