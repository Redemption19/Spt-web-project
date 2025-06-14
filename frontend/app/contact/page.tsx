import { Metadata } from 'next'
import { Mail, Phone, Clock, MapPin, MessageSquare } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { contactInfo } from '@/lib/constants'
import NewsletterSignup from '@/components/ui/NewsletterSignup';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Standard Pensions Trust for inquiries about our pension schemes, retirement planning services, or to schedule a consultation.',
}

export default function ContactPage() {
  return (
    <div className="container-custom py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Have questions about our pension schemes or retirement planning? 
          Our team is here to provide the guidance you need.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Send Us a Message</h2>
            <p className="text-muted-foreground">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
          
          <ContactForm />
        </div>
        
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Head Office</h3>
                  <p className="text-muted-foreground">
                    {contactInfo.headquarters.address}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <p className="text-muted-foreground">
                    <a href={`tel:${contactInfo.headquarters.phone}`} className="hover:text-accent transition-colors">
                      {contactInfo.headquarters.phone}
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-muted-foreground">
                    <a href={`mailto:${contactInfo.headquarters.email}`} className="hover:text-accent transition-colors">
                      {contactInfo.headquarters.email}
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Business Hours</h3>
                  <p className="text-muted-foreground">
                    {contactInfo.headquarters.hours}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">WhatsApp</h3>
                  <p className="text-muted-foreground">
                    <a 
                      href={`https://wa.me/${contactInfo.headquarters.phone.replace(/\D/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      Message us on WhatsApp
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
            <h2 className="text-2xl font-semibold mb-6">Find Us</h2>
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe 
                src={contactInfo.headquarters.map}
                width="100%" 
                height="100%" 
                className="border-0" 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Standard Pensions Trust Office Location"
              />
            </div>
          </div>
          
          {/* Branch Offices */}
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
            <h2 className="text-2xl font-semibold mb-6">Our Branches</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contactInfo.branches.map((branch, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <h3 className="font-medium mb-2">{branch.city}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{branch.address}</p>
                  <p className="text-sm">
                    <a href={`tel:${branch.phone}`} className="text-accent hover:underline">
                      {branch.phone}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup Section */}
      <NewsletterSignup className="mt-16" />
    </div>
  )
}