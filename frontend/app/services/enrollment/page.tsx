import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, Download, Building, User } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Enroll in a Pension Plan',
  description: 'Secure your future in just a few steps. Learn how to enroll in our pension schemes as an individual or employer.',
}

export default function EnrollmentPage() {
  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Enroll in a Pension Plan</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Secure your future in just a few steps. Choose the right pension scheme and start your journey to a comfortable retirement.
        </p>
      </div>

      {/* Intro Section */}
      <div className="bg-card border border-border/50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Standard Pensions Trust?</h2>
        <p className="text-muted-foreground mb-6">
          We offer comprehensive pension solutions tailored to both individuals and employers. Our schemes are designed to provide security, flexibility, and excellent returns for your retirement savings.
        </p>
      </div>

      {/* Enrollment Options */}
      <Tabs defaultValue="individual" className="mb-12">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto mb-8">
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <User className="h-4 w-4" /> For Individuals
          </TabsTrigger>
          <TabsTrigger value="employer" className="flex items-center gap-2">
            <Building className="h-4 w-4" /> For Employers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="individual">
          <Card>
            <CardHeader>
              <CardTitle>Individual Enrollment Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">1</div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Choose Your Scheme</h3>
                    <p className="text-muted-foreground">Select between Tier 3 or Personal Pension schemes based on your needs and employment status.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">2</div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Complete Enrollment Form</h3>
                    <p className="text-muted-foreground">Download and fill out the Employee Enrollment Form with your personal details.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">3</div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Submit Required Documents</h3>
                    <p className="text-muted-foreground">Provide necessary identification documents and submit your application.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">4</div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Receive Your PAN</h3>
                    <p className="text-muted-foreground">Get your Pensions Account Number (PAN) and start your retirement savings journey.</p>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link href="/services/self-service-center" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Employee Form
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employer">
          <Card>
            <CardHeader>
              <CardTitle>Employer Enrollment Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">1</div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Choose a Scheme</h3>
                    <p className="text-muted-foreground">Select the appropriate pension scheme for your employees.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">2</div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Complete Registration</h3>
                    <p className="text-muted-foreground">Fill out the Employer Enrollment Form with your company details.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">3</div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">NPRA Registration</h3>
                    <p className="text-muted-foreground">Submit employer registration details to the National Pensions Regulatory Authority.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">4</div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Setup Contributions</h3>
                    <p className="text-muted-foreground">Begin payroll deductions and establish monthly reporting procedures.</p>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link href="/services/self-service-center" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Employer Form
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* FAQs Section */}
      <div className="bg-card border border-border/50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4">Common Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">What&apos;s the difference between Tier 2 and Tier 3?</h3>
            <p className="text-muted-foreground">Tier 2 is the mandatory occupational pension scheme, while Tier 3 is a voluntary scheme offering additional benefits and flexibility.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How long does the enrollment process take?</h3>
            <p className="text-muted-foreground">The enrollment process typically takes 3-5 business days once all required documents are submitted.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Button asChild size="lg" variant="outline">
          <Link href="/contact" className="flex items-center">
            Speak to a Pension Advisor
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}