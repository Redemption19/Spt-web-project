import { Metadata } from 'next'
import Image from 'next/image'
import { timelineEvents } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Our Timeline',
  description: 'Explore the history and growth of Standard Pensions Trust from our founding to the present day.',
}

export default function TimelinePage() {
  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <section className="mb-12 md:mb-16 text-center bg-card rounded-lg p-8 sm:p-10 md:p-12 border border-border/40">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Our Journey Through the Years</h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          Since our founding, Standard Pensions Trust has grown steadily, expanding our services and reach to better serve Ghanaians in their retirement planning journey.
        </p>
      </section>
      
      {/* Timeline Section */}
      <section className="mb-16 relative flex justify-center">
        {/* Vertical line */}
        <div className="absolute h-full w-0.5 bg-border z-0"></div>
        
        <div className="space-y-20 w-full relative z-10">
          {timelineEvents.map((event, index) => (
            <div key={index} className={`flex items-center w-full`}>
              <div className={`w-1/2 flex ${index % 2 === 0 ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
                <div className="w-full max-w-sm">
                <h3 className="text-2xl font-bold text-primary mb-2">{event.year}</h3>
                  <h4 className="text-xl font-semibold mb-2 text-foreground">{event.title}</h4>
                  <p className="text-muted-foreground text-sm">{event.description}</p>
                </div>
              </div>
              
              <div className="w-0 flex justify-center relative">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-4 border-background">
                  <div className="w-3 h-3 rounded-full bg-background"></div>
                </div>
              </div>
              
              <div className={`w-1/2`}></div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Looking Ahead Section */}
      <section className="bg-card border border-border/50 rounded-lg p-8 shadow-sm text-left">
        <h2 className="text-3xl font-semibold mb-6 text-foreground">Looking Ahead</h2>
        <p className="text-lg text-muted-foreground mb-6">
          As we continue to grow, Standard Pensions Trust remains committed to innovation and excellence in pension administration. Our future plans include:
        </p>
        <ul className="space-y-4 mx-0">
          <li className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1 flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
            <p className="text-muted-foreground">Expanding our digital services with AI-powered retirement planning tools</p>
          </li>
          <li className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1 flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
            <p className="text-muted-foreground">Opening additional branches in underserved regions to improve accessibility</p>
          </li>
          <li className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1 flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
            <p className="text-muted-foreground">Developing specialized pension products for informal sector workers</p>
          </li>
          <li className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1 flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
            <p className="text-muted-foreground">Enhancing our ESG (Environmental, Social, Governance) investment options</p>
          </li>
        </ul>
      </section>
    </div>
  )
}