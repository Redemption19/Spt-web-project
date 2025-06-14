import React from 'react';
import Link from 'next/link';
import { ArrowLeft, DollarSign, Target, Star, Clock, Info, CheckCircle, Wallet, TrendingUp, FastForward, Globe, Building, RefreshCcw, Snowflake, Home, Truck, PhoneCall, User, ClipboardList, Scale, ShieldCheck, Settings } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata = {
  title: 'Provident Fund Scheme (Tier 3) | Standard Pensions Trust',
  description: 'Learn about the Provident Fund Scheme (Tier 3) offered by Standard Pensions Trust.',
};

export default function ProvidentFundPage() {
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
        <div className="max-w-5xl mx-auto">

          {/* Introduction */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">What is Tier 3 – Provident Fund Scheme?</h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Tier 3 is a voluntary, fully funded, and privately managed pension scheme established under Ghana's National Pensions Act, 2008 (Act 766). It serves as a supplementary retirement savings plan, allowing both employers and employees in the formal sector to contribute additional funds beyond the mandatory Tier 1 and Tier 2 schemes. The scheme is administered by licensed corporate trustees, such as Standard Pensions Trust, and is designed to enhance retirement benefits and provide financial flexibility.
            </p>
          </section>

          {/* Contribution Limits & Tax Benefits */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-8 text-foreground">Contribution Limits & Tax Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Tax Reliefs */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-3">
                  <Scale className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">Tax Reliefs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                    Contributions up to 16.5% of an employee's monthly basic salary are tax-deductible, offering significant tax savings for both employers and employees.
                  </p>
                </CardContent>
              </Card>

              {/* Card 2: Additional Contributions */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-3">
                  <Wallet className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">Additional Contributions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                    While contributions beyond 16.5% are permitted, they do not attract tax reliefs.
                  </p>
                </CardContent>
              </Card>

              {/* Card 3: Informal Sector */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-3">
                  <Home className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">Informal Sector</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                    For workers in the informal sector, contributions up to 35% of declared income are eligible for tax exemptions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Scheme Objectives & Benefits */}
          <section className="mb-10 sm:mb-12 md:mb-16 bg-card text-card-foreground p-8 sm:p-10 rounded-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-8 text-foreground">Scheme Objectives & Benefits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {/* Benefit 1: Enhanced Retirement Savings */}
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                   <CheckCircle className="h-5 w-5 flex-shrink-0 mt-1" />
                </div>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">Enhanced Retirement Savings: Augments retirement income by providing an additional savings avenue beyond mandatory schemes.</p>
              </div>

              {/* Benefit 2: Tax Efficiency */}
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                   <CheckCircle className="h-5 w-5 flex-shrink-0 mt-1" />
                </div>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">Tax Efficiency: Maximizes tax benefits through allowable deductions on contributions.</p>
              </div>

              {/* Benefit 3: Lump Sum Payout */}
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                   <CheckCircle className="h-5 w-5 flex-shrink-0 mt-1" />
                </div>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">Lump Sum Payout: Offers a guaranteed lump sum payment upon retirement or after meeting specific conditions.</p>
              </div>

               {/* Benefit 4: Financial Flexibility */}
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                   <CheckCircle className="h-5 w-5 flex-shrink-0 mt-1" />
                </div>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">Financial Flexibility: Allows for early withdrawals under certain conditions, such as medical emergencies or mortgage financing.</p>
              </div>

              {/* Benefit 5: Loan Accessibility */}
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                   <CheckCircle className="h-5 w-5 flex-shrink-0 mt-1" />
                </div>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">Loan Accessibility: Enables members to secure loans at competitive rates using their accumulated funds as collateral.</p>
              </div>

              {/* Empty cell to complete the 2x3 grid */}
              <div></div>
            </div>
          </section>

          {/* Why Provident Fund Scheme? - Redesigned */}
          <section className="mb-10 sm:mb-12 md:mb-16">
             <div className="flex flex-col md:flex-row gap-8 sm:gap-12 items-stretch">
               {/* Left Side (Image) */}
               <div className="w-full md:w-2/5 flex-shrink-0 rounded-lg overflow-hidden relative">
                  <Image
                    src="/images/schemes-images/provident-fund.png"
                    alt="Provident Fund Image"
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
                   WHY PROVIDENT FUND SCHEME?
                 </div>

                 {/* Main Heading */}
                 <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">Why Provident Fund Scheme?</h2>

                 {/* Subtext (Optional) */}
                 <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
                   {/* No subtext provided in the prompt for this section */}
                 </p>

                 {/* Benefits Grid (2x3) */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                   {/* Benefit 1: Expert Fund Management */}
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                        <TrendingUp className="h-5 w-5" />
                     </div>
                     <div className="flex-grow">
                       <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">Expert Fund Management</h3>
                       <p className="text-muted-foreground text-sm sm:text-base">Managed by experienced professionals ensuring optimal returns on investments.</p>
                     </div>
                   </div>

                   {/* Benefit 2: Regulatory Compliance */}
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                        <ShieldCheck className="h-5 w-5" />
                     </div>
                     <div className="flex-grow">
                       <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">Regulatory Compliance</h3>
                       <p className="text-muted-foreground text-sm sm:text-base">Fully licensed and regulated by the National Pensions Regulatory Authority (NPRA), ensuring transparency and security.</p>
                     </div>
                   </div>

                   {/* Benefit 3: Customized Solutions */}
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                        <Settings className="h-5 w-5" />
                     </div>
                     <div className="flex-grow">
                       <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">Customized Solutions</h3>
                       <p className="text-muted-foreground text-sm sm:text-base">Tailored pension solutions to meet the unique needs of both employers and employees.</p>
                     </div>
                   </div>

                   {/* Benefit 4: Digital Access */}
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                        <Globe className="h-5 w-5" />
                     </div>
                     <div className="flex-grow">
                       <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">Digital Access</h3>
                       <p className="text-muted-foreground text-sm sm:text-base">User-friendly online platforms for real-time access to account information and statements.</p>
                     </div>
                   </div>

                   {/* Benefit 5: Nationwide Presence */}
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                        <Building className="h-5 w-5" />
                     </div>
                     <div className="flex-grow">
                       <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">Nationwide Presence</h3>
                       <p className="text-muted-foreground text-sm sm:text-base">Extensive branch network providing accessible support across the country.</p>
                     </div>
                   </div>

                   {/* Empty cell to complete the 2x3 grid */}
                   <div></div>
                 </div>
               </div>
             </div>
           </section>

          {/* Feature Overview Table */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Feature Overview</h2>
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
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Voluntary Contributions</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Up to 16.5% of basic salary (tax-deductible); higher contributions allowed without tax reliefs</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Tax-Free Withdrawals</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">After a minimum of 10 years of continuous contribution</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Early Withdrawal Options</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Permitted under specific conditions, subject to applicable taxes</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Loan Facilities</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Access to secured loans at competitive interest rates</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Professional Management</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Funds managed by NPRA-licensed trustees and fund managers</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Digital Services</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Online portals and mobile access for account management</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Portability</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Funds are transferable when changing employment</td>
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
                <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">Eligibility & Access Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-muted-foreground mb-4 text-base sm:text-lg leading-relaxed">
                  Enrollment: Open to all employees in the formal sector. Enrollment can be initiated by either the employer or the employees through mutual agreement.
                </p>
                {/* The original prompt had nested list items under Eligibility & Access Conditions, but the new prompt has paragraphs. Using paragraphs here based on the new prompt structure. */}
                <p className="text-muted-foreground mt-4 mb-4 text-base sm:text-lg leading-relaxed">
                  Withdrawal Conditions:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 text-base sm:text-lg leading-relaxed ml-4">
                  <li>Standard Withdrawal: Tax-free withdrawals permitted after 10 years of continuous contribution.</li>
                  <li>Early Withdrawal: Allowed under certain conditions (e.g., medical emergencies, mortgage financing) but may be subject to a 15% tax on the withdrawn amount.</li>
                  <li>Retirement: Full access to accumulated funds upon reaching the retirement age as defined by the scheme.</li>
                  <li>Permanent Disability or Death: Immediate access to funds for the contributor or their beneficiaries.</li>
                </ul>
              </CardContent>
            </Card>
          </section>

           {/* Additional Notes */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <Card>
              <CardHeader className="flex flex-row items-center gap-3">
               <ClipboardList className="h-6 w-6 text-primary" />{/* Using ClipboardList icon */}
                <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-muted-foreground mb-4 text-base sm:text-lg leading-relaxed">
                  Regulatory Oversight: The scheme is governed by the NPRA, ensuring adherence to investment guidelines and protection of members' interests.
                </p>
                 <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                   Investment Strategy: Funds are invested in a diversified portfolio, including government securities, equities, and other approved instruments, aiming for long-term growth.
                 </p>
                 <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                   Member Education: Regular workshops and seminars are conducted to educate members on pension planning and scheme benefits.
                 </p>
              </CardContent>
            </Card>
          </section>

          {/* Call to Action */}
          <section className="bg-primary text-primary-foreground p-8 sm:p-10 rounded-lg">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to start saving for your future?</h2>
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
