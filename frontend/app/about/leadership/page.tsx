"use client";

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Linkedin, PlusCircle, MinusCircle } from 'lucide-react'
import { leadershipTeam } from '@/lib/constants'
import React, { useState } from 'react';
import { Banknote, Scale, GraduationCap, Users } from 'lucide-react';
import { boardOfTrustees } from '@/lib/constants';

// Metadata is moved to a layout.tsx or root layout for Client Components.

export default function LeadershipPage() {
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedMember(expandedMember === index ? null : index);
  };

  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center bg-card rounded-lg p-8 sm:p-10 md:p-12 border border-border/40">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Board of Directors</h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          Team of diverse and exceptional leadership.
        </p>
      </section>
      
      {/* Board of Directors Section */}
      <section className="mb-16">
        <div className="space-y-16">
          {leadershipTeam.map((member, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 p-6 rounded-lg border border-border/40 shadow-sm ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="w-full md:w-1/2 relative h-80 md:h-96 rounded-lg overflow-hidden flex-shrink-0">
                <Image 
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-sm uppercase tracking-wider font-semibold text-muted-foreground mb-2">{member.position}</p>
                <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">{member.name}</h2>
                <p className="text-muted-foreground mb-4 text-justify">
                  {expandedMember === index ? member.bio : `${member.bio.substring(0, 250)}...`}
                </p>
                <Button 
                  variant="link" 
                  className="px-0 text-primary hover:text-primary/80 flex items-center gap-2"
                  onClick={() => toggleExpand(index)}
                >
                  {expandedMember === index ? <><MinusCircle className="h-4 w-4" /> Read Less</> : <><PlusCircle className="h-4 w-4" /> Read More</>}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Board of Trustees Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">Board of Trustees</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {boardOfTrustees.map((trustee, index) => {
            let IconComponent;
            switch (trustee.icon) {
              case 'Banknote':
                IconComponent = Banknote;
                break;
              case 'Scale':
                IconComponent = Scale;
                break;
              case 'GraduationCap':
                IconComponent = GraduationCap;
                break;
              case 'Users':
                IconComponent = Users;
                break;
              default:
                IconComponent = Banknote; // Default icon
            }

            return (
              <Card key={index} className="bg-card border border-border/50 p-6 shadow-md flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
            </div>
                <CardTitle className="text-xl font-medium mb-2 text-foreground">{trustee.name}</CardTitle>
                <p className="text-primary font-medium text-sm mb-4">{trustee.position}</p>
                <p className="text-muted-foreground text-sm text-justify">{trustee.bio}</p>
              </Card>
            );
          })}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="text-center mt-16 py-12 bg-primary rounded-lg text-primary-foreground">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Have Questions About Your Pension?</h2>
        <p className="text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
          Our team is ready to assist you. Reach out to us for personalized guidance and support.
        </p>
        <Button asChild size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
          <Link href="/contact">Contact Our Office</Link>
        </Button>
      </section>
    </div>
  )
}