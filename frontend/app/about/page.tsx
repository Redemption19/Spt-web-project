import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Eye, BarChart, Users } from 'lucide-react'
import { companyStats } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Company Overview',
  description: 'Learn about Standard Pensions Trust, our mission, vision, and values that drive our commitment to securing your financial future.',
}

export default function CompanyOverviewPage() {
  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-6">Company Overview</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Empowering Ghanaians with confidence and peace of mind for their retirement.
            </p>
            <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                At Standard Pensions Trust, our mission is to empower individuals to embrace their retirement years with financial confidence and peace of mind. We are committed to safeguarding their lifelong dedication to work by providing reliable and transparent pension solutions. Our vision is to foster a thriving community of members who support each other on the path to secure and fulfilling retirements. Through expertise, transparency, and trust, we aim to be the unwavering partner in our members&apos; retirement journey, ensuring they enjoy the retirement they&apos;ve always dreamed of.
              </p>
            </div>
          </div>
          <div className="relative">
            <Image 
              src="images/company-overview.png"
              alt="Happy retirees"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="mb-16">
        <div className="bg-card border border-border/50 rounded-lg p-8 shadow-sm">
          <h2 className="text-3xl font-semibold mb-6">Who We Are</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Standard Pensions Trust was founded in 2008 with a vision to transform retirement planning in Ghana. Licensed and regulated by the National Pensions Regulatory Authority (NPRA), we&apos;ve grown to become one of Ghana&apos;s most trusted pension administrators. Our team of financial experts is dedicated to helping individuals and organizations navigate the complexities of pension planning and management.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-10">
            {companyStats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </span>
                <span className="text-muted-foreground mt-2">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-medium mb-4">Retirement Planning & Pension Fund Management</h3>
            <p className="text-muted-foreground">
              We provide comprehensive retirement planning services and expert management of pension funds to ensure optimal growth and security for your future.
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-medium mb-4">Tier 2 & Tier 3 Pensions</h3>
            <p className="text-muted-foreground">
              As a licensed pension trustee, we administer both mandatory Tier 2 occupational pension schemes and voluntary Tier 3 personal pension plans.
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-medium mb-4">Self-Service Solutions</h3>
            <p className="text-muted-foreground">
              Our digital platforms provide easy access for both employees and employers to manage contributions, track performance, and plan for retirement.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <div className="bg-primary/10 p-3 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Trust</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We earn and maintain the confidence of our members through consistent reliability and integrity in all our operations.
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <div className="bg-primary/10 p-3 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We operate with complete openness, ensuring our members understand their pension plans and our investment strategies.
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <div className="bg-primary/10 p-3 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Integrity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We adhere to the highest ethical standards in all our business practices and decision-making processes.
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <div className="bg-primary/10 p-3 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We are committed to continuous improvement and innovation to better serve our members&apos; evolving needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-medium mb-4">17,710+ Members</h3>
            <p className="text-muted-foreground">
              Join our growing community of members who trust us with their retirement planning and pension management.
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-medium mb-4">8 Branch Offices</h3>
            <p className="text-muted-foreground">
              With locations across Ghana, we provide accessible service and support wherever you are.
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-medium mb-4">Dedicated Account Managers</h3>
            <p className="text-muted-foreground">
              Every client is assigned a personal account manager to provide tailored guidance and support.
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-medium mb-4">Fast Claim Processing</h3>
            <p className="text-muted-foreground">
              Our streamlined processes ensure quick and efficient handling of all benefit claims.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
            <Link href="/services">Explore Our Services</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/about/leadership">Meet Our Team</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
