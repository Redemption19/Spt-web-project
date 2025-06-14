import React from 'react';
import Link from 'next/link';
import { ArrowLeft, DollarSign, Target, Star, Clock, Info, CheckCircle, Wallet, TrendingUp, FastForward, Globe, Building, RefreshCcw, Snowflake, Home, Truck, PhoneCall, User, ClipboardList } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata = {
  title: 'Personal Pension Scheme (Tier 3) | Standard Pensions Trust',
  description: 'Learn about the Personal Pension Scheme (Tier 3) offered by Standard Pensions Trust.',
};

export default function PersonalPensionPage() {
  return (
    <div className="py-12 sm:py-16 md:py-20">
      <div className="container-custom">

        {/* Back Button */}
        <div className="flex justify-start mb-6 sm:mb-8">
          <Button variant="ghost" asChild className="flex items-center gap-1 sm:gap-2 text-muted-foreground text-sm sm:text-base">
            <Link href="/schemes">
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Back to Schemes</span>
            </Link>
          </Button>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto text-left">

          {/* Introduction */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">What is Tier 3 Personal Pension?</h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Tier 3 is a voluntary, tax-advantaged personal pension (or provident fund) designed to help individuals save beyond SSNIT (Tier 1) and Tier 2. It caters to both formal and informal sector workers—including self-employed individuals and business owners—and is administered by NPRA-licensed trustees and fund managers.
            </p>
          </section>

          {/* Contribution Limits & Tax Benefits */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <Card>
              <CardHeader className="flex flex-row items-center gap-3">
                <DollarSign className="h-6 w-6 text-primary" />{/* Using DollarSign as a generic money icon */}
                <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">Contributions & Tax</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 text-base sm:text-lg leading-relaxed">
                  <li>Employees and employers can contribute a combined total of up to 16.5% of the employee's basic salary, and these contributions are tax-exempt.</li>
                  <li>Contributions toward Tier 3 qualify for tax-free withdrawals after a minimum of 10 years.</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Objectives & Benefits */}
          <section className="mb-10 sm:mb-12 md:mb-16 bg-card text-card-foreground p-8 sm:p-10 rounded-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-center mb-8 text-foreground">Objectives & Benefits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {/* Benefit 1 */}
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                   <CheckCircle className="h-5 w-5 flex-shrink-0 mt-1" />
                </div>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">Encourages long-term saving to augment retirement income.</p>
              </div>

              {/* Benefit 2 */}
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                   <CheckCircle className="h-5 w-5 flex-shrink-0 mt-1" />
                </div>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">Invests in a diversified portfolio: government bonds, mutual funds, equities—structured for long-term growth.</p>
              </div>

              {/* Benefit 3 */}
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                   <CheckCircle className="h-5 w-5 flex-shrink-0 mt-1" />
                </div>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">Offers flexibility: early withdrawals for critical needs (e.g., home purchase, medical emergencies) or after 5 years for informal sector workers.</p>
              </div>

              {/* Add an empty div if you want to force a 2x2 grid even with 3 items */}
              {/* <div></div> */}
            </div>
          </section>

          {/* Why Choose a Best-in-Class Tier 3 Scheme? - Redesigned */}
          <section className="mb-10 sm:mb-12 md:mb-16">
             <div className="flex flex-col md:flex-row gap-8 sm:gap-12 items-stretch">
               {/* Left Side (Image) */}
               <div className="w-full md:w-2/5 flex-shrink-0 rounded-lg overflow-hidden relative">
                  {/* Replace with your image */}
                  <Image
                    src="/images/schemes-images/pensional-pension.png"
                    alt="Personal Pension Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>

               {/* Right Side (Content) */}
               <div className="w-full md:w-3/5">
                 {/* Top Label */}
                 {/* Using arbitrary gradient classes, adjust as needed based on your theme */}
                 <div className="text-primary text-sm font-semibold mb-2" style={{backgroundImage: 'linear-gradient(to right, var(--primary), var(--primary-foreground))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                   WHY CHOOSE TIER 3?
                 </div>

                 {/* Main Heading */}
                 <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">Why Choose Tier 3?</h2>

                 {/* Subtext (Optional) */}
                 <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
                   {/* No subtext provided in the prompt for this section */}
                 </p>

                 {/* Benefits Grid (2x3) */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                   {/* Benefit 1: NPRA-approved providers */}
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                        <CheckCircle className="h-5 w-5" />{/* Using CheckCircle icon */}
                     </div>
                     <div className="flex-grow">
                       <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">Approved Providers</h3>
                       <p className="text-muted-foreground text-sm sm:text-base">NPRA-approved providers with strong historical investment performance.</p>
                     </div>
                   </div>

                   {/* Benefit 2: Transparent and competitive fee structure */}
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                        <DollarSign className="h-5 w-5" />{/* Using DollarSign icon */}
                     </div>
                     <div className="flex-grow">
                       <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">Transparent Fees</h3>
                       <p className="text-muted-foreground text-sm sm:text-base">Transparent and competitive fee structure.</p>
                     </div>
                   </div>

                   {/* Benefit 3: Withdrawal flexibility */}
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                        <FastForward className="h-5 w-5" />{/* Using FastForward icon */}
                     </div>
                     <div className="flex-grow">
                       <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">Flexible Withdrawals</h3>
                       <p className="text-muted-foreground text-sm sm:text-base">Withdrawal flexibility—lock-in period followed by access for life events.</p>
                     </div>
                   </div>

                   {/* Benefit 4: Robust fund management */}
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                        <Building className="h-5 w-5" />{/* Using Building icon */}
                     </div>
                     <div className="flex-grow">
                       <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">Robust Fund Management</h3>
                       <p className="text-muted-foreground text-sm sm:text-base">Robust fund management by licensed trustees, backed by regulated investment vehicles and compliance with NPRA guidelines.</p>
                     </div>
                   </div>

                   {/* Benefit 5: Seamless Transitioning */}
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                        <RefreshCcw className="h-5 w-5" />{/* Using RefreshCcw icon */}
                     </div>
                     <div className="flex-grow">
                       <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">Seamless Transition</h3>
                       <p className="text-muted-foreground text-sm sm:text-base">Facilitates easy transfer of accrued benefits when changing employment.</p>
                     </div>
                   </div>

                   {/* Empty cell to complete the 2x3 grid */}
                   <div></div>
                 </div>
               </div>
             </div>
           </section>

          {/* Features Table */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Key Features</h2>
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/30">
                  <tr>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-foreground sm:px-6">Feature</th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-foreground sm:px-6">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Voluntary contributions up to 16.5%</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Combined employees and employers; tax-exempt</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Tax-free withdrawals</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">After minimum 10 years continuous contribution</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Diversified investments</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Government bonds, equities, mutual funds</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Critical-need access</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Withdrawals allowed early for emergencies or after 5 years (informal sector)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Licensed fund management</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">NPRA-approved trustees, fund managers, custodians</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Eligibility & Access Conditions */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <Card>
              <CardHeader className="flex flex-row items-center gap-3">
               <Info className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">Eligibility & Access</CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-muted-foreground mb-4 text-base sm:text-lg leading-relaxed">
                  Open to both formal and informal workers, including self-employed and business owners.
                </p>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3">Account Model</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 text-base sm:text-lg leading-relaxed ml-4">
                  <li>(1) Retirement, (2) Personal savings—especially for informal sector participants.</li>
                </ul>
                <p className="text-muted-foreground mt-4 mb-4 text-base sm:text-lg leading-relaxed">
                  Partial withdrawals allowed after 5 years (especially for informal contributors); full withdrawals after 10 years with tax-free status.
                </p>
              </CardContent>
            </Card>
          </section>

           {/* Additional Notes */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <Card>
              <CardHeader className="flex flex-row items-center gap-3">
               <ClipboardList className="h-6 w-6 text-primary" />{/* Using ClipboardList icon */}
                <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">Important Notes</CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-muted-foreground mb-4 text-base sm:text-lg leading-relaxed">
                  NPRA regularly conducts outreach and education on Tier 3 penetration across Ghana.
                </p>
                 <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                   Regulations (NPRA‑investment guidelines) ensure Tier 2 and 3 funds adhere to prudent, regulated investment frameworks
                 </p>
              </CardContent>
            </Card>
          </section>

          {/* Call to Action */}
          <section className="bg-primary text-primary-foreground p-8 sm:p-10 rounded-lg text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Start Saving Today</h2>
            <p className="text-base sm:text-lg mb-6">Enroll in the Personal Pension Scheme (Tier 3) today and take advantage of tax benefits and flexible savings options.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline" asChild size="lg">
                <Link href="/forms/employee-enrollment">Enroll Now</Link>{/* Assuming similar enrollment form */}
              </Button>
              <Button variant="default" asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
