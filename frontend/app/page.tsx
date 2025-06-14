import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowRight, 
  Building, 
  Calculator,
  User,
  Landmark,
  Briefcase,
  BarChart,
  PieChart,
  Clock,
  Shield,
  TrendingUp,
  Laptop,
  Users,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { pensionSchemes, companyStats, blogPosts } from '@/lib/constants'
import { formatDate } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TestimonialSection } from '@/components/testimonial-section'
import { BlogCard } from '@/components/blog-card'
import NewsletterSignup from '@/components/ui/NewsletterSignup';
import { HomeSlider } from '@/components/home-slider'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HomeSlider />

      {/* Stats Section */}
      <section className="py-16 gradient-bg text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {companyStats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-white mt-2">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Schemes Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="section-title">Our Pension Schemes</h2>
            <p className="section-subtitle mx-auto">
              Tailored retirement solutions to meet the needs of individuals and organizations throughout Ghana.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pensionSchemes.map((scheme) => {
              const Icon = scheme.icon === 'Building' ? Building : 
                          scheme.icon === 'User' ? User :
                          scheme.icon === 'Landmark' ? Landmark : Briefcase
              
              return (
                <Card key={scheme.id} className="card-hover border-border/50">
                  <CardHeader>
                    <div className="bg-primary/10 p-3 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{scheme.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{scheme.description}</p>
                    <ul className="space-y-2">
                      {scheme.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full group">
                      <Link href={`/schemes/${scheme.id}`} className="flex items-center justify-center">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            <div className="flex flex-col justify-between">                <div className="relative h-full">
                <div className="h-full rounded-3xl shadow-xl overflow-hidden">
                  <Image 
                    src="/images/pension-cal.jpeg"
                    alt="Planning for retirement"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105 rounded-2xl"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="section-title">Secure Retirement Planning Made Simple</h2>
              <p className="text-muted-foreground">
                At Standard Pensions Trust, we provide comprehensive tools and expert guidance to help you plan and secure your financial future.
              </p>
              
              <div className="grid grid-cols-1 gap-6 mt-8">
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 h-12 w-12 flex items-center justify-center rounded-lg shrink-0">
                    <Calculator className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Pension Calculator</h3>
                    <p className="text-muted-foreground text-sm">
                      Plan your retirement with our interactive calculator tool that provides realistic projections.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 h-12 w-12 flex items-center justify-center rounded-lg shrink-0">
                    <PieChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Investment Strategies</h3>
                    <p className="text-muted-foreground text-sm">
                      Diverse investment options tailored to your risk profile and retirement timeline.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 h-12 w-12 flex items-center justify-center rounded-lg shrink-0">
                    <BarChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Fund Performance</h3>
                    <p className="text-muted-foreground text-sm">
                      Transparent reporting and real-time access to your pension fund performance.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 h-12 w-12 flex items-center justify-center rounded-lg shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Self-Service Portal</h3>
                    <p className="text-muted-foreground text-sm">
                      24/7 access to your pension information through our secure member portal.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button asChild className="mt-4">
                <Link href="/pension-calculator">Try Our Pension Calculator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Secure Your Financial Future?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of Ghanaians who trust Standard Pensions Trust for their retirement planning.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="outline" className="border-white gradient-bg hover:bg-white/20 hover:text-white">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/schemes">Explore Our Schemes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <TestimonialSection />
      
      {/* Blog Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="section-title">Our Blog</h2>
            <p className="section-subtitle mx-auto">Discover insights, news, and updates from our team.</p>
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Tailored Pension Solutions Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tailored to meet your pension needs</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We believe everyone deserves a retirement plan as unique as they are. Let us customize a solution for you.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
          </div>
      
      
          <Tabs defaultValue="individual" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="individual" className="flex items-center gap-2">
                <User className="h-5 w-5" /> Pensions for Individuals
              </TabsTrigger>
              <TabsTrigger value="organization" className="flex items-center gap-2">
                <Building className="h-5 w-5" /> Pensions With Organizations
              </TabsTrigger>
            </TabsList>
      
            <TabsContent value="individual">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <Landmark className="h-8 w-8 text-primary" />
                    <h3 className="text-2xl font-semibold">Your Retirement Plan</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Take control of your financial future. Our structured approach helps you build the cushion you need for a comfortable and secure retirement.
                  </p>
                  <Button asChild>
                    <Link href="/schemes/individual">Start Your Retirement Journey</Link>
                  </Button>
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image 
                    src="images/pension-types.png" 
                    alt="Individual retirement planning"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
      
            <TabsContent value="organization">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Briefcase className="h-8 w-8 text-primary" />
                    <h3 className="text-2xl font-semibold">Comprehensive Employee Benefits</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Attract and retain top talent with valuable benefits that extend beyond salary, like essential retirement plan contributions and healthcare coverage.
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <BarChart className="h-8 w-8 text-primary" />
                    <h3 className="text-2xl font-semibold">Optimized Employer Pensions</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Focus on your core business while we handle your pension scheme. Benefit from professional management, reduced fees, and other advantages that support your organization.
                  </p>
                  <Button asChild>
                    <Link href="/schemes/organization">Explore Organizational Solutions</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Why Standard Pensions Trust Section - REDESIGNED */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              WHY CHOOSE US
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Standard Pensions Trust</span> is The Right Choice for You
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Left side - 3 cards in grid */}
            <div className="grid gap-6">
              {/* Control Systems */}
              <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">Control Systems</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We have in place rigorous internal control systems as we recognize this as vital for our survival in the fiduciary services business
                  </p>
                </CardContent>
              </Card>

              {/* Good Investments */}
              <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">Good Investments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Our investment team has extensive experience and analytical methodologies to actively identify and exploit investment opportunities as they arise.
                  </p>
                </CardContent>
              </Card>

              {/* IT Platform */}
              <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Laptop className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">IT Platform</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We have a top-of-the-range IT platform to improve the efficiency with which we deliver our services, with the use of Web and Mobile Technology as well as USSD.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right side - Large card */}
            <div className="flex">
              <Card className="gradient-bg text-white flex-1 flex flex-col justify-between min-h-[400px] lg:min-h-[500px]">
                <div>
                  <CardHeader className="pb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-4">
                      Client Involvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <p className="text-white/90 text-base leading-relaxed mb-8">
                      Our customer-centered approach to service provision enables us to achieve our client&apos;s objectives, as we are able to understand the needs of our clients better.
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed">
                      We believe in building lasting relationships through transparency, dedication, and personalized service that puts your financial goals at the center of everything we do.
                    </p>
                  </CardContent>
                </div>
                <CardFooter className="pt-0">
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-white text-primary hover:bg-white/90 font-semibold group w-full sm:w-auto"
                  >
                    <Link href="/contact" className="flex items-center justify-center">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Corporate Partners Section */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              OUR PARTNERS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Leading <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Corporate Partners</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We collaborate with industry leaders to provide comprehensive pension solutions and enhance value for our members.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="relative group">
                <div className="bg-background rounded-lg p-6 transition-all duration-300 hover:shadow-lg flex items-center justify-center h-[120px]">
                  <Image
                    src={`/images/partners-images/brand-1-${index + 1}.png`}
                    alt={`Corporate Partner ${index + 1}`}
                    width={150}
                    height={80}
                    className="object-contain filter transition-all duration-300 group-hover:scale-105"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Signup Section Container */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <NewsletterSignup />
        </div>
      </section>
      
    </div>
  )
}