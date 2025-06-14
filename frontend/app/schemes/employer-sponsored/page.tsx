import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Key, Briefcase, DollarSign, ShieldCheck, Star, TrendingUp, Scale, FileText, CreditCard, BarChart, Layers, Settings, Globe, Building, RefreshCcw, BookOpen, Info, CheckCircle, Wallet } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata = {
  title: 'Employer Sponsored Pension Schemes | Standard Pensions Trust',
  description: 'Learn about the Employer Sponsored Pension Schemes offered by Standard Pensions Trust.',
};

export default function EmployerSponsoredPage() {
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">Employer Sponsored Pension Schemes</h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              An Employer-Sponsored Pension Scheme is a retirement savings plan established by an employer to provide pension benefits to its employees. In Ghana, under the National Pensions Act, 2008 (Act 766), employers are mandated to set up and manage pension schemes for their employees. These schemes typically include Tier 2 (Mandatory Occupational Pension Scheme) and Tier 3 (Voluntary Provident Fund) components, both of which can be administered by licensed corporate trustees like Standard Pensions Trust.
            </p>
          </section>

          {/* Key Features */}
          <section className="mb-10 sm:mb-12 md:mb-16">
             <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-8 text-foreground">Key Features</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Card 1: Full Scheme Ownership */}
               <Card>
                 <CardHeader className="flex flex-row items-center gap-3">
                   <Key className="h-6 w-6 text-primary" />
                   <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">Full Scheme Ownership</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                     Organizations retain complete control over their pension schemes, ensuring alignment with corporate objectives and employee needs.
                   </p>
                 </CardContent>
               </Card>

               {/* Card 2: Professional Trustee Services */}
               <Card>
                 <CardHeader className="flex flex-row items-center gap-3">
                   <Briefcase className="h-6 w-6 text-primary" />
                   <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">Professional Trustee Services</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                     As a licensed corporate trustee under the National Pensions Regulatory Authority (NPRA), Standard Pensions Trust provides expert management and oversight of pension funds.
                   </p>
                 </CardContent>
               </Card>

               {/* Card 3: Flexible Fee Structure */}
               <Card>
                 <CardHeader className="flex flex-row items-center gap-3">
                   <Wallet className="h-6 w-6 text-primary" />
                   <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">Flexible Fee Structure</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                     Fees are customized based on the specific requirements and scale of each organization, ensuring cost-effectiveness and transparency.
                   </p>
                 </CardContent>
               </Card>

               {/* Card 4: Comprehensive Scheme Management */}
               <Card>
                 <CardHeader className="flex flex-row items-center gap-3">
                   <ShieldCheck className="h-6 w-6 text-primary" />
                   <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">Comprehensive Scheme Management</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                     Expert administration of both Tier 2 (occupational pension) and Tier 3 (provident fund) schemes, including compliance with NPRA regulations and timely reporting.
                   </p>
                 </CardContent>
               </Card>
             </div>
          </section>

          {/* Scheme Options */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-8 text-foreground">Scheme Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Card 1: Tier 2 */}
               <Card>
                 <CardHeader className="flex flex-row items-center gap-3">
                   <Layers className="h-6 w-6 text-primary" />
                   <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">Tier 2 – Occupational Pension Scheme</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                     A mandatory, fully funded scheme where both employer and employee contribute to a retirement fund managed by a licensed corporate trustee.
                   </p>
                 </CardContent>
               </Card>

               {/* Card 2: Tier 3 */}
               <Card>
                 <CardHeader className="flex flex-row items-center gap-3">
                   <Layers className="h-6 w-6 text-primary" />
                   <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">Tier 3 – Provident Fund Scheme</CardTitle>
          </CardHeader>
          <CardContent>
                   <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                     A voluntary, fully funded scheme offering tax reliefs and serving as a financial vehicle for members seeking enhanced pension benefits.
            </p>
          </CardContent>
        </Card>
      </div>
          </section>

          {/* Contribution & Tax Benefits */}
          <section className="mb-10 sm:mb-12 md:mb-16 bg-card p-8 sm:p-10 rounded-lg">
             <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-8 text-foreground">Contribution & Tax Benefits</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Item 1: Tier 2 Contributions */}
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                     <Wallet className="h-5 w-5 flex-shrink-0 mt-1" />
                  </div>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">Tier 2 Contributions: Employers contribute 5% of an employee's basic salary, with the option for additional voluntary contributions.</p>
                </div>

               {/* Item 2: Tier 3 Contributions */}
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                     <Wallet className="h-5 w-5 flex-shrink-0 mt-1" />
                  </div>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">Tier 3 Contributions: Employers and employees can contribute a combined total of up to 16.5% of the employee's basic salary, with tax exemptions applicable to contributions up to this limit.</p>
                </div>
             </div>
          </section>

          {/* Benefits of Employer Sponsored Schemes - Similar to Objectives & Benefits */}
          <section className="mb-10 sm:mb-12 md:mb-16">
             <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-8 text-foreground">Benefits of Employer Sponsored Schemes</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
               {/* Benefit 1: Enhanced Employee Retention */}
               <Card>
                 <CardHeader className="flex flex-row items-start gap-2">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                       <CheckCircle className="h-5 w-5" />
                    </div>
                   <CardTitle className="text-base sm:text-lg font-semibold text-foreground leading-relaxed">Enhanced Employee Retention</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Offering robust pension schemes can improve employee satisfaction and retention rates.</p>
                 </CardContent>
               </Card>

               {/* Benefit 2: Tax Efficiency */}
               <Card>
                 <CardHeader className="flex flex-row items-start gap-2">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                       <CheckCircle className="h-5 w-5" />
                    </div>
                   <CardTitle className="text-base sm:text-lg font-semibold text-foreground leading-relaxed">Tax Efficiency</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Contributions to both Tier 2 and Tier 3 schemes are tax-deductible, providing financial benefits to both employers and employees.</p>
                 </CardContent>
               </Card>

               {/* Benefit 3: Financial Security for Employees */}
               <Card>
                 <CardHeader className="flex flex-row items-start gap-2">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                       <CheckCircle className="h-5 w-5" />
                    </div>
                   <CardTitle className="text-base sm:text-lg font-semibold text-foreground leading-relaxed">Financial Security for Employees</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Employees benefit from structured retirement savings, ensuring financial stability in their retirement years.</p>
                 </CardContent>
               </Card>

               {/* Benefit 4: Regulatory Compliance */}
               <Card>
                 <CardHeader className="flex flex-row items-start gap-2">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                       <CheckCircle className="h-5 w-5" />
                    </div>
                   <CardTitle className="text-base sm:text-lg font-semibold text-foreground leading-relaxed">Regulatory Compliance</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Standard Pensions Trust ensures all schemes comply with NPRA regulations, mitigating legal and financial risks for employers.</p>
                 </CardContent>
               </Card>
             </div>
          </section>

          {/* Why Choose an Employer-Sponsored Pension Scheme? - Redesigned */}
          <section className="mb-10 sm:mb-12 md:mb-16">
             <div className="flex flex-col md:flex-row gap-8 sm:gap-12 items-stretch">
               {/* Left Side (Image) */}
               <div className="w-full md:w-2/5 flex-shrink-0 rounded-lg overflow-hidden relative">
                  <Image
                    src="/images/schemes-images/employer-sponsered.png"
                    alt="Employer Sponsored Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>

               {/* Right Side (Content) */}
               <div className="w-full md:w-3/5">
                 {/* Top Label */}
                 <div className="text-primary text-sm font-semibold mb-2" style={{backgroundImage: 'linear-gradient(to right, var(--primary), var(--primary-foreground))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                   WHY CHOOSE?
                 </div>

                 {/* Main Heading */}
                 <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">Why Employer-Sponsored Pension Scheme?</h2>

                 {/* Subtext (Optional) */}
                 <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
                   {/* No subtext provided in the prompt for this section */}
                 </p>

                 {/* Benefits Grid (2x3) */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                   {/* Benefit 1: Enhanced Employee Retention */}
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                        <CheckCircle className="h-5 w-5" />
                     </div>
                     <div className="flex-grow">
                       <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">Enhanced Employee Retention</h3>
                       <p className="text-muted-foreground text-sm sm:text-base">Offering a robust pension scheme demonstrates a commitment to employee welfare, fostering loyalty and reducing turnover.</p>
                     </div>
                   </div>

                   {/* Benefit 2: Attractive Tax Benefits */}
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                        <Scale className="h-5 w-5" />
                     </div>
                     <div className="flex-grow">
                       <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">Attractive Tax Benefits</h3>
                       <p className="text-muted-foreground text-sm sm:text-base">Contributions to Tier 3 schemes up to 16.5% of an employee's basic salary are tax-deductible, providing significant tax savings for both employers and employees.</p>
                     </div>
                   </div>

                   {/* Benefit 3: Financial Security for Employees */}
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                        <CreditCard className="h-5 w-5" />
                     </div>
                     <div className="flex-grow">
                       <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">Financial Security for Employees</h3>
                       <p className="text-muted-foreground text-sm sm:text-base">Employees benefit from structured retirement savings, ensuring financial stability in their post-employment years.</p>
                     </div>
                   </div>

                   {/* Benefit 4: Regulatory Compliance */}
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                        <ShieldCheck className="h-5 w-5" />
                     </div>
                     <div className="flex-grow">
                       <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">Regulatory Compliance</h3>
                       <p className="text-muted-foreground text-sm sm:text-base">Employers ensure adherence to the National Pensions Act, mitigating legal risks and penalties.</p>
                     </div>
                   </div>

                   {/* Benefit 5: Customizable Plans */}
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                        <Settings className="h-5 w-5" />
                     </div>
                     <div className="flex-grow">
                       <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">Customizable Plans</h3>
                       <p className="text-muted-foreground text-sm sm:text-base">Schemes can be tailored to meet the unique needs of the organization and its workforce.</p>
                     </div>
                   </div>

                   {/* Empty cell to complete the 2x3 grid */}
                   <div></div>
                 </div>
               </div>
             </div>
           </section>

          {/* Scheme Overview Table */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Scheme Overview</h2>
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
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Contribution Rates</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Employer and employee contributions as agreed upon; Tier 2: 5% (employee), Tier 3: Up to 16.5% (voluntary)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Tax Reliefs</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Contributions up to 16.5% of basic salary are tax-deductible</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Withdrawal Conditions</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Tax-free withdrawals after 10 years for formal sector employees; early withdrawals permitted under specific conditions</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Loan Facilities</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Access to secured loans at competitive interest rates using accumulated funds as collateral</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Professional Management</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Managed by NPRA-licensed trustees and fund managers</td>
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

          {/* Call to Action */}
          <section className="bg-primary text-primary-foreground p-8 sm:p-10 rounded-lg">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to discuss an Employer Sponsored Scheme for your organization?</h2>
            <p className="text-base sm:text-lg mb-6">Contact us today to learn more about how we can tailor a pension solution to meet your company's needs.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* Assuming a contact form or direct contact link is appropriate */}
              <Button variant="outline" asChild size="lg">
                <Link href="/forms/employee-enrollment">Enroll Now</Link>{/* Using a placeholder link, adjust as needed */}
              </Button>
              <Button variant="default" asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
