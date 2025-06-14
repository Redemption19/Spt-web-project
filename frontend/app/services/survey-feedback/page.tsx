import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SurveyForm from '@/components/survey/SurveyForm';

export const metadata = {
  title: 'Survey Feedback | Standard Pensions Trust',
  description: 'Help us improve our services by providing your valuable feedback.',
};

export default function SurveyFeedbackPage() {
  return (
    <div className="py-12 sm:py-16 md:py-20">
      <div className="container-custom">
        <div className="flex justify-start mb-6 sm:mb-8">
          <Button variant="ghost" asChild className="flex items-center gap-1 sm:gap-2 text-muted-foreground text-sm sm:text-base">
            <Link href="/services">
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Back to Services</span>
            </Link>
          </Button>
        </div>
        
        <div className="max-w-4xl mx-auto px-2 sm:px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-14">
            <h1 className="section-title text-2xl sm:text-3xl md:text-4xl">Your Feedback Matters</h1>
            <p className="section-subtitle mx-auto text-sm sm:text-base mt-2 sm:mt-4">
              Help us improve our pension services by sharing your experience. 
              Your insights will help us better meet the needs of our members.
            </p>          </div>            <div className="relative">
              <Tabs defaultValue="general" className="mb-8 sm:mb-10 flex flex-col w-full">{/* Single TabsList that adjusts for mobile/desktop */}              <TabsList className="flex w-full gap-0 p-0 sticky top-0 z-10">
                <TabsTrigger 
                  value="general" 
                  className="flex-1 text-xs sm:text-sm py-3 sm:py-4 whitespace-nowrap rounded-none border-0 text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  General
                </TabsTrigger>
                <TabsTrigger 
                  value="member-portal" 
                  className="flex-1 text-xs sm:text-sm py-3 sm:py-4 whitespace-nowrap rounded-none border-0 text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Member Portal
                </TabsTrigger>
                <TabsTrigger 
                  value="customer-service" 
                  className="flex-1 text-xs sm:text-sm py-3 sm:py-4 whitespace-nowrap rounded-none border-0 text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Customer Service
                </TabsTrigger>
                <TabsTrigger 
                  value="suggestions" 
                  className="flex-1 text-xs sm:text-sm py-3 sm:py-4 whitespace-nowrap rounded-none border-0 text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Suggestions
                </TabsTrigger>
              </TabsList>              <TabsContent value="general" className="p-4 sm:p-6 border rounded-lg mt-10 sm:mt-6 bg-card">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">General Feedback</h2>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  Please share your overall experience with Standard Pensions Trust.
                </p>
                <SurveyForm 
                  surveyType="general"
                  description="This survey helps us understand your overall experience with our services."
                />
              </TabsContent>              <TabsContent value="member-portal" className="p-4 sm:p-6 border rounded-lg mt-10 sm:mt-6 bg-card">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Member Portal Feedback</h2>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  Help us improve your online experience with our member portal.
                </p>
                <SurveyForm 
                  surveyType="portal"
                  description="This survey focuses on your experience using our online member portal."
                />
              </TabsContent>              <TabsContent value="customer-service" className="p-4 sm:p-6 border rounded-lg mt-10 sm:mt-6 bg-card">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Customer Service Feedback</h2>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  Tell us about your interactions with our customer service team.
                </p>
                <SurveyForm 
                  surveyType="service"
                  description="This survey helps us improve our customer service quality."
                />
              </TabsContent>              <TabsContent value="suggestions" className="p-4 sm:p-6 border rounded-lg mt-10 sm:mt-6 bg-card">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Suggestions</h2>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  Share your ideas on how we can improve our products and services.
                </p>
                <SurveyForm 
                  surveyType="suggestions"
                  description="This open-ended survey allows you to share your ideas and suggestions."
                />
              </TabsContent>
          </Tabs>
          </div>
          
          <div className="bg-muted/30 p-4 sm:p-6 rounded-lg text-sm sm:text-base">
            <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Your Privacy Matters</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              All feedback is collected anonymously unless you choose to provide contact information. 
              Your responses help us improve our services. For more information, please read our 
              <Link href="/privacy-policy" className="text-primary hover:underline ml-1">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
