"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, BookOpen, BarChart, Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const allDocuments = [
  {
    type: 'form',
    title: 'Account Opening Form',
    description: 'Download our form to open a new pension account.',
    href: '#',
    icon: <FileText className="h-6 w-6 text-primary" />
  },
  {
    type: 'form',
    title: 'Withdrawal Request Form',
    description: 'Request a withdrawal from your pension scheme.',
    href: '#',
    icon: <FileText className="h-6 w-6 text-primary" />
  },
  {
    type: 'form',
    title: 'Beneficiary Nomination Form',
    description: 'Nominate or update your beneficiaries for your pension.',
    href: '#',
    icon: <FileText className="h-6 w-6 text-primary" />
  },
  {
    type: 'form',
    title: 'Change of Details Form',
    description: 'Update your personal details on file with us.',
    href: '#',
    icon: <FileText className="h-6 w-6 text-primary" />
  },
  {
    type: 'brochure',
    title: 'Tier 2 (Occupational Pension Scheme) Brochure',
    description: 'Detailed information about our mandatory occupational pension scheme.',
    href: '#',
    icon: <BookOpen className="h-6 w-6 text-primary" />
  },
  {
    type: 'brochure',
    title: 'Tier 3 (Personal Pension Scheme) Brochure',
    description: 'Explore the benefits and features of our voluntary personal pension scheme.',
    href: '#',
    icon: <BookOpen className="h-6 w-6 text-primary" />
  },
  {
    type: 'brochure',
    title: 'Voluntary Contributions Brochure',
    description: 'Learn about making additional voluntary contributions to your pension.',
    href: '#',
    icon: <BookOpen className="h-6 w-6 text-primary" />
  },
  {
    type: 'report',
    title: '2024 Annual Report',
    description: 'Review our financial statements and performance for 2024.',
    href: '#',
    icon: <BarChart className="h-6 w-6 text-primary" />
  },
  {
    type: 'report',
    title: '2023 Annual Report',
    description: 'Review our financial statements and performance for 2023.',
    href: '#',
    icon: <BarChart className="h-6 w-6 text-primary" />
  },
  {
    type: 'report',
    title: '2022 Annual Report',
    description: 'Review our financial statements and performance for 2022.',
    href: '#',
    icon: <BarChart className="h-6 w-6 text-primary" />
  },
];

export default function DownloadCentrePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocuments = allDocuments.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const forms = filteredDocuments.filter(doc => doc.type === 'form');
  const brochures = filteredDocuments.filter(doc => doc.type === 'brochure');
  const reports = filteredDocuments.filter(doc => doc.type === 'report');

  return (
    <div className="py-12 sm:py-16 md:py-20">
      <div className="container-custom">

        {/* Hero Section */}
        <section className="mb-10 sm:mb-12 md:mb-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Download Centre</h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Welcome to the Standard Pensions Trust Download Centre. Here, you can access and download essential documents related to our services.
          </p>
        </section>

        {/* Search & Filter Section */}
        <section className="mb-10 sm:mb-12 md:mb-16 p-8 bg-card rounded-lg text-center">
          <Search className="h-12 w-12 text-primary mb-4 mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-foreground">Search & Filter Documents</h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            Use the search bar below to quickly find the specific documents you need.
          </p>
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Search documents..." 
                className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button>Search</Button>
            </div>
          </div>
        </section>

        {/* Forms Section */}
        {forms.length > 0 && (
          <section className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-6 text-foreground">Forms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forms.map((doc, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-3">
                    {doc.icon}
                    <CardTitle>{doc.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{doc.description}</p>
                    <Button variant="link" asChild className="px-0 pt-2">
                      <a href={doc.href} target="_blank" rel="noopener noreferrer">Download PDF</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-6">
              Note: Ensure all forms are available in PDF format for easy download and printing.
            </p>
          </section>
        )}

        {/* Product Brochures Section */}
        {brochures.length > 0 && (
          <section className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-6 text-foreground">Product Brochures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brochures.map((doc, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-3">
                    {doc.icon}
                    <CardTitle>{doc.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{doc.description}</p>
                    <Button variant="link" asChild className="px-0 pt-2">
                      <a href={doc.href} target="_blank" rel="noopener noreferrer">Download PDF</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-6">
              These brochures provide detailed information about the features, benefits, and requirements of each scheme.
            </p>
          </section>
        )}

        {/* Scheme Annual Reports Section */}
        {reports.length > 0 && (
          <section className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-6 text-foreground">Scheme Annual Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((doc, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-3">
                    {doc.icon}
                    <CardTitle>{doc.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{doc.description}</p>
                    <Button variant="link" asChild className="px-0 pt-2">
                      <a href={doc.href} target="_blank" rel="noopener noreferrer">Download PDF</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-6">
              Each report includes financial statements, investment performance, and other relevant information.
            </p>
          </section>
        )}

        {/* Bulk Download Section */}
        <section className="mb-10 sm:mb-12 md:mb-16 p-8 bg-primary text-primary-foreground rounded-lg text-center">
          <Download className="h-12 w-12 text-primary-foreground mb-4 mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Bulk Download</h2>
          <p className="text-primary-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            Download multiple documents at once. Select individual documents or download all available documents in a zipped folder.
          </p>
          {/* Placeholder for bulk download options */}
          <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            Download All Documents
          </Button>
        </section>

      </div>
    </div>
  );
} 