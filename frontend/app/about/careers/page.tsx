import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, MapPin, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers | Standard Pensions Trust',
  description: 'Explore career opportunities and join the Standard Pensions Trust team.',
};

export default function CareersPage() {
  // Placeholder for job listings data - you can replace this with actual data from an API or a CMS
  const jobListings = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      location: 'Accra, Ghana',
      salary: 'Competitive',
      description: 'We are looking for a highly skilled Senior Frontend Developer to lead the development of our user-facing applications. You will be responsible for implementing visual and interactive elements that users interact with through their web browser.',
      link: '#',
    },
    {
      id: '2',
      title: 'Pension Administrator',
      location: 'Accra, Ghana',
      salary: 'Competitive',
      description: 'Join our operations team as a Pension Administrator. You will be responsible for managing client accounts, processing contributions, and handling pension benefit claims.',
      link: '#',
    },
    {
      id: '3',
      title: 'Investment Analyst',
      location: 'Accra, Ghana',
      salary: 'Competitive',
      description: 'We are seeking an Investment Analyst to support our investment team. You will be involved in market research, financial modeling, and portfolio performance analysis.',
      link: '#',
    },
    {
      id: '4',
      title: 'Customer Service Representative',
      location: 'Kumasi, Ghana',
      salary: 'Competitive',
      description: 'A dynamic individual to join our Customer Service team. You will be the first point of contact for our members, providing information and resolving inquiries.',
      link: '#',
    },
  ];

  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center bg-card rounded-lg p-8 sm:p-10 md:p-12 border border-border/40">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Join Our Team</h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          Become a part of Standard Pensions Trust and contribute to securing the financial future of Ghanaians. Explore our current career opportunities below.
        </p>
      </section>

      {/* Why Work With Us Section (Optional, can be expanded) */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">Why Work With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <CardHeader>
              <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Impactful Work</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Contribute to a mission that positively impacts thousands of lives across Ghana.</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardHeader>
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Growth Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Benefit from continuous learning, professional development, and clear career paths.</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardHeader>
              <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Competitive Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Enjoy attractive compensation packages, health benefits, and a supportive work environment.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">Current Opportunities</h2>
        <div className="space-y-6">
          {jobListings.map((job) => (
            <Card key={job.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center border-border/50 shadow-sm">
              <div>
                <CardTitle className="text-xl font-semibold text-foreground mb-2">{job.title}</CardTitle>
                <CardDescription className="text-muted-foreground flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4" /> {job.location}
                </CardDescription>
                <CardDescription className="text-muted-foreground flex items-center gap-2">
                  <DollarSign className="h-4 w-4" /> {job.salary}
                </CardDescription>
                <p className="text-muted-foreground text-sm mt-4 md:mt-2 text-justify max-w-2xl">{job.description}</p>
              </div>
              <Button asChild className="mt-4 md:mt-0 flex-shrink-0">
                <Link href={job.link}>Apply Now</Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* General Application Section (Optional) */}
      <section className="text-center mt-16 py-12 bg-primary rounded-lg text-primary-foreground">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Can't Find Your Role?</h2>
        <p className="text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
          Submit a general application, and we'll keep your profile in mind for future openings.
        </p>
        <Button asChild size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
          <Link href="/contact">Submit Application</Link>
        </Button>
      </section>
    </div>
  );
} 