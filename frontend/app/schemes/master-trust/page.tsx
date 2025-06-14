import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Target, Clock, Info, CheckCircle, Wallet, TrendingUp, FastForward, Globe, Building, RefreshCcw, Snowflake, Home, Truck, PhoneCall, DollarSign as DollarSignIcon, User } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata = {
  title: 'Tier 2 – Master Trust Pension | Standard Pensions Trust',
  description: 'Learn about the Tier 2 Master Trust Pension scheme offered by Standard Pensions Trust.',
};

export default function MasterTrustPage() {
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">What is Tier 2 – Master Trust Pension?</h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Tier 2 is a mandatory occupational pension scheme established under Ghana's 2008 Pension Act—part of a three-tier system aimed at enhancing retirement security. It targets formal-sector employees, requiring contributions from both employee and employer, and is administered by licensed commercial trustees, such as Standard Pensions Trust.
            </p>
          </section>

          {/* Contribution Structure */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <Card>
              <CardHeader className="flex flex-row items-center gap-3">
                <Wallet className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">Contribution Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 text-base sm:text-lg leading-relaxed">
                  <li>5% of your basic salary is deducted monthly and allocated to Tier 2.</li>
                  <li>This is in addition to your employer's contributions to Tier 1 (SSNIT).</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Scheme Objectives & Benefits */}
          <section className="mb-10 sm:mb-12 md:mb-16 bg-card text-card-foreground p-8 sm:p-10 rounded-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-center mb-8 text-foreground">Scheme Objectives & Benefits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">Provides a lump‑sum payout at retirement (or earlier upon meeting conditions).</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">Ensures financial security during retirement through professionally-managed funds.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">Allows major capital for primary residence—the assignment of Tier 2 benefits supports mortgage financing.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">Features strong investor protections: governed by NPRA, with strict caps on fees, fiduciary duty, and regulated investment vehicles.</p>
              </div>
            </div>
          </section>

          {/* Why Choose Standard Pensions Trust? - Redesigned */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <div className="flex flex-col md:flex-row gap-8 sm:gap-12 items-stretch">
              {/* Left Side (Image) */}
              <div className="w-full md:w-2/5 flex-shrink-0 rounded-lg overflow-hidden relative">
                <Image
                  src="/images/schemes-images/master-trust-img.jpg"
                  alt="Professional portrait"
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
                  WHY CHOOSE STANDARD PENSIONS TRUST
                </div>

                {/* Main Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">Why Choose Best Pensions Master Trust Scheme?</h2>

                {/* Subtext (Optional) */}
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
                  Trusted by employers nationwide for secure and rewarding pension investments.
                </p>

                {/* Benefits Grid (2x3) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Benefit 1: Superior Investment Performance */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-base sm:text-lg">Superior Investment Performance</h3>
                      <p className="text-muted-foreground text-sm sm:text-base">Their Tier 2 Master Trust promises above-average returns on contributions.</p>
                    </div>
                  </div>

                  {/* Benefit 2: Rapid Access to Funds */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                       <FastForward className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-base sm:text-lg">Rapid Access to Funds</h3>
                      <p className="text-muted-foreground text-sm sm:text-base">Efficient claims processing post-retirement means minimal delays.</p>
                    </div>
                  </div>

                  {/* Benefit 3: Digital Convenience */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-base sm:text-lg">Digital Convenience</h3>
                      <p className="text-muted-foreground text-sm sm:text-base">Online access to contributions and statements anytime, anywhere.</p>
                    </div>
                  </div>

                  {/* Benefit 4: Nationwide Presence */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                      <Building className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-base sm:text-lg">Nationwide Presence</h3>
                      <p className="text-muted-foreground text-sm sm:text-base">With 8 branches and 894 registered employers, we offer accessible local support.</p>
                    </div>
                  </div>

                  {/* Benefit 5: Seamless Transitioning */}
                  <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-card border text-primary">
                       <RefreshCcw className="h-5 w-5" />
                     </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-base sm:text-lg">Seamless Transitioning</h3>
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
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Key Features at a Glance</h2>
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
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Mandatory 5% contribution</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Deducted monthly from your basic salary</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Lump-sum payout</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Available upon retirement or other life events</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Primary residence support</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Enables use of pension as security for mortgage facilities</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Professional management</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Licensed trustee with NPRA oversight; regulated investments & fees</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">User-friendly services</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Online portal, SMS updates, branch network, rapid claim settlement</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-foreground sm:px-6">Portability</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">Benefits are fully transferable when changing jobs</td>
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
                  You're automatically enrolled by your employer if they've contracted Standard Pensions Trust.
                </p>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3">Withdrawals allowed after meeting retirement conditions:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 text-base sm:text-lg leading-relaxed ml-4">
                  <li>Retirement age (55–60)</li>
                  <li>Unemployment (50+)</li>
                  <li>Permanent disability</li>
                  <li>Emigration or death</li>
                </ul>
                <p className="text-muted-foreground mt-4 text-base sm:text-lg leading-relaxed">
                  Benefit transfers: You can choose to keep your funds with Standard Pensions Trust or transfer them to your new employer's trustee.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Call to Action */}
          <section className="bg-primary text-primary-foreground p-8 sm:p-10 rounded-lg text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to secure your retirement?</h2>
            <p className="text-base sm:text-lg mb-6">Join the Standard Pensions Trust Master Trust Scheme today and take control of your financial future.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="ghost" asChild size="lg">
                <Link href="/forms/employee-enrollment">Enroll Now</Link>
              </Button>
              <Button variant="secondary" asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
