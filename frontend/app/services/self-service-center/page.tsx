import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { FileText, Download, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Self-Service Centre',
  description: 'Submit requests, download forms, and manage your pension information easily and securely.',
}

const forms = [
  {
    name: 'Employer Enrolment Form',
    description: 'For employers registering their company pension scheme',
    type: 'PDF',
    category: 'Employer',
    downloadUrl: '/forms/employer-enrollment.pdf',
    onlineFormUrl: '/forms/employer-enrollment'
  },
  {
    name: 'Employee Enrolment Form',
    description: 'For individual employees joining a pension scheme',
    type: 'PDF',
    category: 'Employee',
    downloadUrl: '/forms/employee-enrollment.pdf',
    onlineFormUrl: '/forms/employee-enrollment'
  },
  {
    name: 'Tier 2 Benefit Claim Form',
    description: 'For claiming Tier 2 pension benefits',
    type: 'PDF',
    category: 'Claims',
    downloadUrl: '/forms/tier-2-claim.pdf',
    onlineFormUrl: '/forms/tier-2-benefit-claim'
  },
  {
    name: 'Tier 2 Beneficiary Claim Form',
    description: 'For beneficiaries claiming Tier 2 benefits',
    type: 'PDF',
    category: 'Claims',
    downloadUrl: '/forms/tier-2-beneficiary-claim.pdf',
    onlineFormUrl: '/forms/tier-2-beneficiary-claim'
  },
  {
    name: 'Tier 3 Benefit Claim Form',
    description: 'For claiming Tier 3 pension benefits',
    type: 'PDF',
    category: 'Claims',
    downloadUrl: '/forms/tier-3-claim.pdf',
    onlineFormUrl: '/forms/tier-3-benefit-claim'
  },
  {
    name: 'Tier 3 Beneficiary Claim Form',
    description: 'For beneficiaries claiming Tier 3 benefits',
    type: 'PDF',
    category: 'Claims',
    downloadUrl: '/forms/tier-3-beneficiary-claim.pdf',
    onlineFormUrl: '/forms/tier-3-beneficiary-claim'
  },
  {
    name: 'Personal Pension Claim Form',
    description: 'For claiming personal pension benefits',
    type: 'PDF',
    category: 'Claims',
    downloadUrl: '/forms/personal-pension-claim.pdf',
    onlineFormUrl: '/forms/personal-pension-claim'
  },
]

type Form = {
  name: string
  description: string
  type: string
  category: string
  downloadUrl: string
  onlineFormUrl: string
}

export default function SelfServiceCenterPage() {
  return (
    <div className="container-custom py-12">
      {/* Hero/Intro Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Self-Service Centre</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Easy access to our forms and services. Submit requests, download forms, and manage your pension information easily and securely.
        </p>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {forms.map((form: Form, index) => (
          <Card key={index} className="border-border/50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{form.name}</CardTitle>
                  <CardDescription>{form.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                    {form.type}
                  </span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {form.category}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href={form.downloadUrl} className="flex items-center justify-center">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href={form.onlineFormUrl} className="flex items-center justify-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Fill Online
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submission Instructions */}
      <div className="bg-card border border-border/50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4">How to Submit Forms</h2>
        <p className="text-muted-foreground mb-6">
          Submit forms via email, in person, or upload through the portal. Our team will process your request and get back to you within 2-3 business days.
        </p>
        <Button asChild variant="outline">
          <Link href="/contact" className="flex items-center">
            Need Help? Contact Our Office
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}