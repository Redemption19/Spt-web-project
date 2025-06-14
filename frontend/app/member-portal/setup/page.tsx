"use client"

import { useState } from 'react'
import Link from 'next/link'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ChevronLeft, LineChart, UsersRound, Rocket, ShieldCheck, FileText, Loader2, ChevronRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const formSchema = z.object({
  ssnitNumber: z.string().min(1, "SSNIT number is required"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
})

export default function SetupAccountPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ssnitNumber: "",
      phoneNumber: "",
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // TODO: Implement setup account logic
    console.log(values)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setShowSuccessModal(true)
  }

  const benefits = [
    {
      icon: <LineChart className="h-6 w-6 text-accent" />,
      title: "Intuitive Dashboard",
      description: "Gain valuable insights into your account fund performance to support smarter retirement decisions."
    },
    {
      icon: <UsersRound className="h-6 w-6 text-accent" />,
      title: "Update Info",
      description: "Easily keep your details up to date through our streamlined portal."
    },
    {
      icon: <Rocket className="h-6 w-6 text-accent" />,
      title: "Supercharged Savings",
      description: "Create additional accounts for tax advantages and accelerate your savings."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-accent" />,
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security with optional two-factor authentication."
    },
    {
      icon: <FileText className="h-6 w-6 text-accent" />,
      title: "Instant Member Statement",
      description: "24/7 access to your statements—quick, easy, and reliable."
    },
  ]

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-8"
          asChild
        >
          <Link href="/member-portal">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Member Portal
          </Link>
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Setup SPT Online Account</h1>
          <p className="text-xl text-muted-foreground">
            Get started by verifying your information to unlock the full benefits of your member portal.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="pt-6">
                <div className="bg-accent/10 p-3 rounded-lg w-fit mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Setup Form */}
        <Card className="animate-fadeIn">
          <CardHeader>
            <CardTitle>Complete Your Setup</CardTitle>
            <CardDescription>
              Please provide your information to create your online account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="ssnitNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SSNIT Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your SSNIT number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Alert>
                  <AlertTitle>Please Note</AlertTitle>
                  <AlertDescription>
                    By submitting this form, you agree to receive important account notifications via SMS and email.
                  </AlertDescription>
                </Alert>

                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Success Modal */}
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>          <DialogContent className="max-w-[95%] p-4 sm:p-6 sm:max-w-md mx-auto rounded-lg !pt-6">
            <DialogHeader className="space-y-4">
              {/* Success Icon */}
              <div className="mx-auto bg-accent/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
              </div>
              
              {/* Title */}
              <div className="space-y-2 text-center">
                <DialogTitle className="text-lg sm:text-2xl font-semibold">
                  Application Submitted
                </DialogTitle>
                <p className="text-accent text-sm sm:text-base font-medium">
                  Your account setup request has been received!
                </p>
              </div>
            </DialogHeader>

            {/* Content */}
            <div className="space-y-4 py-2 sm:py-4">
              {/* Next Steps */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm sm:text-base">What&apos;s Next:</h4>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-3">
                    <div className="bg-accent/10 p-1 rounded-full mt-0.5 flex-shrink-0">
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Our team will validate your details and process your request
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-accent/10 p-1 rounded-full mt-0.5 flex-shrink-0">
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      You&apos;ll receive an <span className="font-medium text-foreground">SMS notification</span> once your account setup is complete
                    </p>
                  </li>
                </ul>
              </div>

              {/* Contact Box */}
              <div className="bg-muted/30 p-4 rounded-lg space-y-3 mt-2">
                <h4 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                  <UsersRound className="h-4 w-4 text-accent" />
                  Need Help?
                </h4>
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Contact our Digital Team:
                  </p>
                  <a 
                    href="tel:0302782686" 
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/90 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="text-base sm:text-lg font-semibold">0302 782 686</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center mt-2">
              <Button
                className="w-full sm:w-auto min-w-[140px] bg-accent hover:bg-accent/90"
                onClick={() => setShowSuccessModal(false)}
              >
                Done
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
