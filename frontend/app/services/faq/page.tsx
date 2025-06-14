import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowRight, Search } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about pensions, claims, and more.',
}

const faqCategories = [
  {
    category: 'Claims',
    questions: [
      {
        question: 'How do I claim my Tier 2 benefits?',
        answer: 'To claim your Tier 2 benefits, download and complete the Tier 2 Benefit Claim Form from our Self-Service Centre. Submit the form along with required documents including proof of retirement age and employment history.'
      },
      {
        question: 'When will I receive my benefit after retirement?',
        answer: 'Once your claim is approved, benefits are typically processed within 10-15 working days. Payment will be made directly to your registered bank account.'
      }
    ]
  },
  {
    category: 'Contributions',
    questions: [
      {
        question: 'Can I contribute to both Tier 2 and Tier 3?',
        answer: 'Yes, you can contribute to both Tier 2 and Tier 3 schemes simultaneously. Tier 2 is mandatory through your employer, while Tier 3 offers additional voluntary contributions.'
      },
      {
        question: 'Who qualifies for the Account Booster program?',
        answer: 'The Account Booster program is available to all Tier 3 contributors who maintain regular monthly contributions for at least 6 months.'
      }
    ]
  },
  {
    category: 'Account Management',
    questions: [
      {
        question: 'How do I check my pension balance online?',
        answer: 'Log in to the Member Portal using your PAN and password. Your current balance and contribution history will be displayed on your dashboard.'
      },
      {
        question: 'How do I update my personal details?',
        answer: 'You can update your personal information through the Member Portal or by submitting a change request form at our office.'
      }
    ]
  }
]

export default function FAQPage() {
  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions about pensions, claims, and more.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search FAQs..."
            className="pl-10"
          />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="max-w-3xl mx-auto mb-12">
        {faqCategories.map((category, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((faq, faqIndex) => (
                <AccordionItem key={faqIndex} value={`${index}-${faqIndex}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      {/* Still Need Help Section */}
      <div className="bg-card border border-border/50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
        <p className="text-muted-foreground mb-6">
          Can&apos;t find what you&apos;re looking for? Our support team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/contact" className="flex items-center">
              Contact Support
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild>
            <Link href="/services/self-service-center" className="flex items-center">
              Visit Self-Service Centre
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}