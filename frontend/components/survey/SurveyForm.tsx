"use client";

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Loader2, HelpCircle, AlertCircle, ThumbsUp, ThumbsDown, Clock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Define rating options
const RATING_OPTIONS = [
  { value: "5", label: "Excellent" },
  { value: "4", label: "Good" },
  { value: "3", label: "Average" },
  { value: "2", label: "Poor" },
  { value: "1", label: "Very Poor" },
];

// Define NPS options
const NPS_VALUES = Array.from({ length: 11 }, (_, i) => i.toString());

// Enhanced General Survey Schema
const generalSurveySchema = z.object({
  overallRating: z.string().min(1, "Please select a rating"),
  specificAreas: z.array(z.string()).optional(),
  feedback: z.string().min(10, "Please provide feedback with at least 10 characters").max(1000, "Please keep your feedback under 1000 characters"),
  npsScore: z.string().min(1, "Please select a recommendation score"),
  improvementArea: z.string().optional(),
  hasIssue: z.boolean().default(false),
  issueDescription: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  contactConsent: z.boolean().default(false),
  department: z.string().optional(),
});

// Enhanced Portal Survey Schema
const portalSurveySchema = z.object({
  overallRating: z.string().min(1, "Please select a rating"),
  usabilityRating: z.string().min(1, "Please rate the usability"),
  navigationRating: z.string().min(1, "Please rate the navigation"),
  featuresSatisfaction: z.string().min(1, "Please rate your satisfaction with the features"),
  performanceRating: z.string().min(1, "Please rate the performance"),
  mostUsedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  missingFeatures: z.string().optional(),
  technicalIssues: z.string().optional(),
  deviceType: z.enum(["desktop", "mobile", "tablet"]).optional(),
  browserType: z.string().optional(),
  feedback: z.string().min(10, "Please provide feedback with at least 10 characters").max(1000, "Please keep your feedback under 1000 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  contactConsent: z.boolean().default(false),
});

// Enhanced Customer Service Survey Schema
const serviceSurveySchema = z.object({
  overallRating: z.string().min(1, "Please select a rating"),
  responseTime: z.string().min(1, "Please rate our response time"),
  staffKnowledge: z.string().min(1, "Please rate our staff's knowledge"),
  staffPoliteness: z.string().min(1, "Please rate our staff's politeness"),
  problemResolution: z.string().min(1, "Please rate how well we resolved your issue"),
  contactMethod: z.enum(["phone", "email", "chat", "in-person", "other"]).optional(),
  queryType: z.string().optional(),
  feedback: z.string().min(10, "Please provide feedback with at least 10 characters").max(1000, "Please keep your feedback under 1000 characters"),
  wasResolved: z.boolean().default(false),
  callbackRequested: z.boolean().default(false),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  contactConsent: z.boolean().default(false),
});

// Enhanced Suggestions Schema
const suggestionSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  suggestion: z.string().min(10, "Please provide your suggestion with at least 10 characters").max(1000, "Please keep your suggestion under 1000 characters"),
  potentialBenefits: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  timeframe: z.enum(["short-term", "mid-term", "long-term"]).optional(),
  willingness: z.enum(["yes", "maybe", "no"]).default("no"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  contactConsent: z.boolean().default(false),
});

// Use the appropriate schema based on survey type
const getSurveySchema = (type: string) => {
  switch(type) {
    case "portal": return portalSurveySchema;
    case "service": return serviceSurveySchema;
    case "suggestions": return suggestionSchema;
    default: return generalSurveySchema;
  }
};

interface SurveyFormProps {
  surveyType: "general" | "portal" | "service" | "suggestions";
  description: string;
}

export default function SurveyForm({ surveyType, description }: SurveyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasIssue, setHasIssue] = useState(false);
  
  // Get the appropriate schema based on survey type
  const schema = getSurveySchema(surveyType);
  
  // Define default values based on survey type
  const getDefaultValues = () => {
    switch(surveyType) {
      case "portal":
        return {
          overallRating: "",
          usabilityRating: "",
          navigationRating: "",
          featuresSatisfaction: "",
          performanceRating: "",
          mostUsedFeatures: [],
          missingFeatures: "",
          technicalIssues: "",
          deviceType: undefined,
          browserType: "",
          feedback: "",
          email: "",
          contactConsent: false,
        };
      case "service":
        return {
          overallRating: "",
          responseTime: "",
          staffKnowledge: "",
          staffPoliteness: "",
          problemResolution: "",
          contactMethod: undefined,
          queryType: "",
          feedback: "",
          wasResolved: false,
          callbackRequested: false,
          email: "",
          contactConsent: false,
        };
      case "suggestions":
        return {
          category: "",
          suggestion: "",
          potentialBenefits: "",
          priority: undefined,
          timeframe: undefined,
          willingness: "no",
          email: "",
          contactConsent: false,
        };
      default:
        return {
          overallRating: "",
          specificAreas: [],
          feedback: "",
          npsScore: "",
          improvementArea: "",
          hasIssue: false,
          issueDescription: "",
          email: "",
          contactConsent: false,
          department: "",
        };
    }
  };
  // Create form with dynamic schema and default values
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
    mode: "onBlur",
  });

  // Watch for values that might need to show/hide conditional fields
  const watchHasIssue = form.watch("hasIssue");
  const watchWasResolved = form.watch("wasResolved");
  const watchCategory = form.watch("category");
  // Update local state when the form value changes
  React.useEffect(() => {
    if (surveyType === "general") {
      setHasIssue(!!watchHasIssue);
    }
  }, [watchHasIssue, surveyType]);

  async function onSubmit(data: any) {
    setIsSubmitting(true);
    
    // Add metadata to the submission
    const enhancedData = {
      type: surveyType,
      submittedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ...data,
    };
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Survey data:", enhancedData);
      
      // In a real implementation, you would send the data to your API
      // const response = await fetch('/api/survey-feedback', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(enhancedData),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to submit survey');
      // }
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting survey:", error);
      setIsSubmitting(false);
      // You could add error state handling here
    }
  }  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-6 text-center">
        <div className="mx-auto w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-green-100 mb-2.5 sm:mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-8 sm:w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-base sm:text-xl font-semibold text-green-800 mb-1.5 sm:mb-3">Thank You for Your Feedback!</h3>
        <p className="text-sm sm:text-base text-green-700 mb-3 sm:mb-5 max-w-md mx-auto">
          Your input is valuable to us and will help improve our services.
        </p>
        <Button 
          variant="outline" 
          onClick={() => {
            form.reset();
            setIsSubmitted(false);
          }} 
          className="text-sm sm:text-base border-green-200 hover:bg-green-100 hover:text-green-800 h-9 sm:h-10 px-3 sm:px-4"
        >
          Submit Another Response
        </Button>
      </div>
    );
  }// Helper function to render rating as radio group
  const renderRatingField = (name: string, label: string, tooltip?: string) => (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem className="space-y-2 sm:space-y-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <FormLabel className="text-sm sm:text-base text-wrap">{label}</FormLabel>
            {tooltip && (
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground cursor-help flex-shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[200px] xs:max-w-[250px] text-xs sm:text-sm p-2 sm:p-3">
                    <p>{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-2 sm:flex sm:flex-row flex-wrap gap-1.5 sm:gap-4"
            >
              {RATING_OPTIONS.map((option) => (
                <FormItem key={option.value} className="flex items-center space-x-2 sm:space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={option.value} className="h-4 w-4 sm:h-5 sm:w-5" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer text-sm sm:text-base text-wrap">
                    {option.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage className="text-xs sm:text-sm" />
        </FormItem>
      )}
    />
  );  // Helper function to render rating as slider
  const renderSliderField = (name: string, label: string, tooltip?: string) => (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem className="space-y-3 sm:space-y-5">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <FormLabel className="text-sm sm:text-base text-wrap">{label}</FormLabel>
            {tooltip && (
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground cursor-help flex-shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[200px] xs:max-w-[250px] text-xs sm:text-sm p-2 sm:p-3">
                    <p>{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <FormControl>
            <div className="space-y-2 sm:space-y-4 px-1 sm:px-2 mt-1 sm:mt-2">
              <Slider
                min={1}
                max={5}
                step={1}
                value={field.value ? [parseInt(field.value)] : [3]}
                onValueChange={(value) => field.onChange(value[0].toString())}
                className="mt-4 sm:mt-6"
              />
              <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground font-medium">
                <span>Very Poor</span>
                <span className="hidden xs:inline">Poor</span>
                <span>Average</span>
                <span className="hidden xs:inline">Good</span>
                <span>Excellent</span>
              </div>
            </div>
          </FormControl>
          <FormMessage className="text-xs sm:text-sm" />
        </FormItem>
      )}
    />
  );  // Helper function to render NPS component
  const renderNPSField = (name: string, label: string) => (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem className="space-y-3 sm:space-y-5">
          <FormLabel className="text-sm sm:text-base text-wrap">{label}</FormLabel>          <FormControl>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap gap-1.5 sm:gap-2 max-w-full pb-1 justify-center sm:justify-between">
                {NPS_VALUES.map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant={field.value === value ? "default" : "outline"}
                    className={`h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 rounded-full text-xs xs:text-sm sm:text-base p-0 ${
                      parseInt(value) <= 6
                        ? "hover:bg-red-100"
                        : parseInt(value) <= 8
                        ? "hover:bg-amber-100"
                        : "hover:bg-green-100"
                    }`}
                    onClick={() => field.onChange(value)}
                  >
                    {value}
                  </Button>
                ))}
              </div>              <div className="flex justify-between text-xs sm:text-sm">
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <ThumbsDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 flex-shrink-0" />
                  <span className="text-wrap">Not likely</span>
                </span>
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                  <span className="text-wrap">Very likely</span>
                </span>
              </div>
            </div>
          </FormControl>          <FormDescription className="text-xs sm:text-sm">
            How likely are you to recommend our services to friends, family or colleagues?
          </FormDescription>
          <FormMessage className="text-xs sm:text-sm" />
        </FormItem>
      )}
    />
  );  // Helper function to render text field
  const renderTextField = (name: string, label: string, placeholder: string, rows: number = 3, tooltip?: string) => (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem className="space-y-1.5 sm:space-y-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <FormLabel className="text-sm sm:text-base text-wrap">{label}</FormLabel>
            {tooltip && (
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground cursor-help flex-shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[200px] xs:max-w-[250px] text-xs sm:text-sm p-2 sm:p-3">
                    <p>{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="resize-y min-h-[80px] text-sm sm:text-base p-2 sm:p-3 rounded-md"
              rows={rows}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-xs sm:text-sm mt-1" />
        </FormItem>
      )}
    />
  );    // Helper function to render select field
  const renderSelectField = (name: string, label: string, options: {value: string, label: string}[], tooltip?: string) => (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem className="space-y-1.5 sm:space-y-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <FormLabel className="text-sm sm:text-base text-wrap">{label}</FormLabel>
            {tooltip && (
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground cursor-help flex-shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[200px] xs:max-w-[250px] text-xs sm:text-sm p-2 sm:p-3">
                    <p>{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="text-sm sm:text-base h-9 sm:h-10 min-w-[200px] w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="text-sm sm:text-base max-h-[300px]">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="text-xs sm:text-sm mt-1" />
        </FormItem>
      )}
    />
  );    // Helper function to render switch field
  const renderSwitchField = (name: string, label: string, description?: string) => (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-2 sm:space-x-3 space-y-0 rounded-md border p-2.5 sm:p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5"
            />
          </FormControl>
          <div className="space-y-1 leading-tight sm:leading-none">
            <FormLabel className="text-sm sm:text-base text-wrap">
              {label}
            </FormLabel>
            {description && (
              <FormDescription className="text-xs sm:text-sm">
                {description}
              </FormDescription>
            )}
          </div>
        </FormItem>
      )}
    />
  );  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
        <FormDescription className="text-sm sm:text-base">{description}</FormDescription>
        
        {/* Common overall rating field for all survey types except suggestions */}
        {surveyType !== "suggestions" && renderSliderField(
          "overallRating", 
          "How would you rate your overall experience?", 
          "Rate your overall satisfaction with our services"
        )}
        
        {/* General survey specific fields */}
        {surveyType === "general" && (
          <>            <FormField
              control={form.control}
              name="specificAreas"
              render={({ field }) => (
                <FormItem className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <FormLabel className="text-sm sm:text-base text-wrap">Which aspects of our service would you like to highlight?</FormLabel>
                    <TooltipProvider>
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground cursor-help flex-shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[200px] xs:max-w-xs text-xs sm:text-sm p-2 sm:p-3">
                          <p>Select all areas that apply to your feedback</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>                  
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-1.5 sm:gap-2 mt-1 sm:mt-2">                    
                    {[
                      "Customer Service",
                      "Website Usability",
                      "Investment Performance",
                      "Communication",
                      "Educational Resources",
                      "Mobile App",
                      "Pension Statements",
                      "Online Account"
                    ].map((area) => (
                      <FormItem key={area} className="flex items-start sm:items-center space-x-2 sm:space-x-3 space-y-0 rounded-sm p-1.5">
                        <FormControl>
                          <Checkbox 
                            checked={field.value?.includes(area)} 
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...(field.value || []), area]);
                              } else {
                                field.onChange(field.value?.filter((val: string) => val !== area));
                              }
                            }}
                            className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 sm:mt-0"
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer text-sm sm:text-base text-wrap">{area}</FormLabel>
                      </FormItem>
                    ))}
                  </div>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            
            {renderNPSField("npsScore", "How likely are you to recommend us?")}

            {renderSelectField("department", "Which department are you providing feedback about?", [
              { value: "administration", label: "Administration" },
              { value: "investments", label: "Investments" },
              { value: "customerService", label: "Customer Service" },
              { value: "digitalServices", label: "Digital Services" },
              { value: "paymentProcessing", label: "Payment Processing" },
              { value: "other", label: "Other" },
            ])}
            
            {renderSelectField("improvementArea", "What area needs the most improvement?", [
              { value: "speed", label: "Speed of Service" },
              { value: "communication", label: "Communication" },
              { value: "easeOfUse", label: "Ease of Use" },
              { value: "accuracy", label: "Accuracy" },
              { value: "customerSupport", label: "Customer Support" },
              { value: "onlineTools", label: "Online Tools" },
              { value: "other", label: "Other" },
            ])}
              <div className="bg-muted/30 p-2.5 sm:p-4 rounded-lg">
              {renderSwitchField(
                "hasIssue", 
                "Do you have a specific issue you'd like to report?", 
                "Select this if you encountered a specific problem"
              )}
              
              {hasIssue && (
                <div className="mt-2.5 sm:mt-4">
                  {renderTextField(
                    "issueDescription", 
                    "Please describe the issue", 
                    "Provide details about the issue you experienced...", 
                    3,
                    "Be as specific as possible including dates, times, and steps to reproduce"
                  )}
                </div>
              )}
            </div>
          </>
        )}
        
        {/* Member Portal specific fields */}
        {surveyType === "portal" && (
          <>
            {renderSliderField(
              "usabilityRating", 
              "How would you rate the ease of use of our member portal?",
              "Consider how easy it is to find information and complete tasks"
            )}
            
            {renderSliderField(
              "navigationRating", 
              "How would you rate the navigation and menu structure?",
              "Consider how intuitive the site organization is"
            )}
            
            {renderSliderField(
              "featuresSatisfaction", 
              "How satisfied are you with the available features?",
              "Consider whether the portal has all the functionality you need"
            )}
            
            {renderSliderField(
              "performanceRating", 
              "How would you rate the portal's performance and reliability?",
              "Consider loading times, errors, and crashes"
            )}            <FormField
              control={form.control}
              name="mostUsedFeatures"
              render={({ field }) => (
                <FormItem className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <FormLabel className="text-sm sm:text-base text-wrap">Which features do you use the most?</FormLabel>
                    <TooltipProvider>
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground cursor-help flex-shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[200px] xs:max-w-xs text-xs sm:text-sm p-2 sm:p-3">
                          <p>Select all features that you use regularly</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>                  
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-1.5 sm:gap-2 mt-1 sm:mt-2">
                    {[
                      "Account Balance",
                      "Transaction History",
                      "Document Downloads",
                      "Personal Details Update",
                      "Beneficiary Management",
                      "Investment Options",
                      "Retirement Projections",
                      "Contact Forms",
                      "Contribution History",
                      "Fund Performance"
                    ].map((feature) => (
                      <FormItem key={feature} className="flex items-start sm:items-center space-x-2 sm:space-x-3 space-y-0 rounded-sm p-1.5">
                        <FormControl>
                          <Checkbox 
                            checked={field.value?.includes(feature)} 
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...(field.value || []), feature]);
                              } else {
                                field.onChange(field.value?.filter((val: string) => val !== feature));
                              }
                            }}
                            className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 sm:mt-0"
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer text-sm sm:text-base text-wrap">{feature}</FormLabel>
                      </FormItem>
                    ))}
                  </div>
                  <FormMessage className="text-xs sm:text-sm mt-1" />
                </FormItem>
              )}
            />
            
            {renderSelectField("deviceType", "What type of device do you usually use to access the portal?", [
              { value: "desktop", label: "Desktop/Laptop" },
              { value: "tablet", label: "Tablet" },
              { value: "mobile", label: "Mobile Phone" },
            ])}
            
            {renderSelectField("browserType", "Which browser do you typically use?", [
              { value: "chrome", label: "Google Chrome" },
              { value: "safari", label: "Safari" },
              { value: "firefox", label: "Firefox" },
              { value: "edge", label: "Microsoft Edge" },
              { value: "ie", label: "Internet Explorer" },
              { value: "other", label: "Other" },
            ])}
            
            {renderTextField(
              "missingFeatures", 
              "Are there any features you'd like to see added?", 
              "Please describe any features you think would improve our member portal...",
              3,
              "Tell us what new capabilities would make the portal more useful"
            )}
            
            {renderTextField(
              "technicalIssues", 
              "Have you experienced any technical issues?", 
              "Please describe any technical problems you've encountered...",
              3,
              "Include details like error messages, pages affected, and steps to reproduce"
            )}
          </>
        )}
        
        {/* Customer Service specific fields */}
        {surveyType === "service" && (
          <>
            {renderSliderField("responseTime", "How would you rate our response time?", "Consider how quickly we addressed your inquiry")}
            {renderSliderField("staffKnowledge", "How would you rate our staff's knowledge?", "Consider how well our staff understood and addressed your question")}
            {renderSliderField("staffPoliteness", "How would you rate our staff's courtesy?", "Consider the professionalism and politeness of our staff")}
            {renderSliderField("problemResolution", "How satisfied were you with the resolution?", "Consider whether your issue was completely resolved")}

            {renderSelectField("contactMethod", "How did you contact customer service?", [
              { value: "phone", label: "Phone" },
              { value: "email", label: "Email" },
              { value: "chat", label: "Live Chat" },
              { value: "in-person", label: "In Person" },
              { value: "other", label: "Other" },
            ])}
            
            {renderSelectField("queryType", "What was the nature of your inquiry?", [
              { value: "account", label: "Account Information" },
              { value: "transaction", label: "Transaction Query" },
              { value: "complaint", label: "Complaint" },
              { value: "technical", label: "Technical Issue" },
              { value: "document", label: "Document Request" },
              { value: "other", label: "Other" },
            ])}
            
            {renderSwitchField("wasResolved", "Was your issue completely resolved?", "Let us know if your issue was satisfactorily resolved")}
              {!watchWasResolved && surveyType === 'service' && (
              <div className="bg-amber-50 border border-amber-200 p-2.5 sm:p-4 rounded-lg">
                <div className="flex items-start gap-1.5 sm:gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="font-medium text-amber-800 text-sm sm:text-base text-wrap">We&apos;re sorry your issue wasn&apos;t resolved.</p>
                </div>
                <p className="text-amber-700 mb-2.5 sm:mb-3 text-xs sm:text-sm text-wrap">Please provide additional details so we can follow up and get your issue resolved.</p>
                
                {/* Explicitly style checkbox and label for readability in the amber box */}
                <FormField
                  control={form.control}
                  name="callbackRequested"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 sm:space-x-3 space-y-0 rounded-md p-2.5 sm:p-4 border border-amber-300 bg-amber-100">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="callbackRequested"
                          className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 border-amber-600 data-[state=checked]:bg-amber-600 data-[state=checked]:text-amber-50"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-tight sm:leading-none text-amber-950 dark:text-amber-950">
                        <FormLabel htmlFor="callbackRequested" className="text-sm sm:text-base text-wrap">
                          Would you like us to contact you about this issue?
                        </FormLabel>
                        <FormDescription className="text-xs sm:text-sm text-amber-900 dark:text-amber-900">
                          We&apos;ll reach out using the email provided below
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </>
        )}
        
        {/* Suggestions specific fields */}
        {surveyType === "suggestions" && (
          <>            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <FormLabel className="text-sm sm:text-base text-wrap">Which area does your suggestion relate to?</FormLabel>
                    <TooltipProvider>
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground cursor-help flex-shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[200px] xs:max-w-xs text-xs sm:text-sm p-2 sm:p-3">
                          <p>Select the most relevant area for your suggestion</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 xs:grid-cols-2 gap-1.5 sm:gap-2"
                    >
                      {["Member Portal", "Mobile App", "Customer Service", "Investment Options", "Education & Resources", "Forms & Documents", "Communication", "Reporting", "Other"].map((category) => (
                        <FormItem key={category} className="flex items-start sm:items-center space-x-2 sm:space-x-3 space-y-0 rounded-sm p-1">
                          <FormControl>
                            <RadioGroupItem value={category.toLowerCase().replace(/\s+/g, '-')} className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 sm:mt-0" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer text-sm sm:text-base text-wrap">{category}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm mt-1" />
                </FormItem>
              )}
            />
            
            {renderSelectField("priority", "How would you prioritize this suggestion?", [
              { value: "high", label: "High - Critical improvement" },
              { value: "medium", label: "Medium - Important improvement" },
              { value: "low", label: "Low - Nice to have" },
            ], "Help us understand the importance of this suggestion")}
            
            {renderSelectField("timeframe", "What timeframe would you expect for implementation?", [
              { value: "short-term", label: "Short-term (1-3 months)" },
              { value: "mid-term", label: "Mid-term (3-6 months)" },
              { value: "long-term", label: "Long-term (6+ months)" },
            ])}
            
            {renderTextField("suggestion", "Your Suggestion", "Please describe your suggestion in detail...", 5, "Be as specific as possible about what you'd like to see implemented")}
            
            {renderTextField("potentialBenefits", "Potential Benefits", "Please describe how this suggestion could improve our services...", 3, "Explain the value this would bring to you and other members")}              <FormField
              control={form.control}
              name="willingness"
              render={({ field }) => (
                <FormItem className="space-y-2 sm:space-y-3">
                  <FormLabel className="text-sm sm:text-base text-wrap">Would you be willing to participate in a follow-up discussion about your suggestion?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col xs:flex-row flex-wrap gap-1.5 xs:gap-4"
                    >
                      <FormItem className="flex items-center space-x-2 sm:space-x-3 space-y-0 w-full xs:w-auto">
                        <FormControl>
                          <RadioGroupItem value="yes" className="h-4 w-4 sm:h-5 sm:w-5" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer text-sm sm:text-base">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 sm:space-x-3 space-y-0 w-full xs:w-auto">
                        <FormControl>
                          <RadioGroupItem value="maybe" className="h-4 w-4 sm:h-5 sm:w-5" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer text-sm sm:text-base">Maybe</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 sm:space-x-3 space-y-0 w-full xs:w-auto">
                        <FormControl>
                          <RadioGroupItem value="no" className="h-4 w-4 sm:h-5 sm:w-5" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer text-sm sm:text-base">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm mt-1" />
                </FormItem>
              )}
            />
          </>
        )}
        
        {/* Common feedback field for all except suggestions */}
        {surveyType !== "suggestions" && (
          renderTextField(
            "feedback", 
            "Additional Comments", 
            "Please share any other thoughts or suggestions with us...", 
            5,
            "Your detailed feedback helps us improve our services"
          )
        )}        <div className="border-t pt-4 sm:pt-6">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-4">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            <p className="text-xs sm:text-sm text-muted-foreground">This survey takes approximately 3-5 minutes to complete</p>
          </div>
          
          <div className="bg-muted/30 p-2.5 sm:p-4 rounded-lg mb-4 sm:mb-6">
            <h4 className="text-sm font-medium mb-2 sm:mb-3">Optional Contact Information</h4>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm sm:text-base">Email Address (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="your.email@example.com" 
                      type="email"
                      className="text-sm sm:text-base h-9 sm:h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs sm:text-sm">
                    If you&apos;d like us to follow up on your feedback
                  </FormDescription>
                  <FormMessage className="text-xs sm:text-sm mt-1" />
                </FormItem>
              )}
            />            <FormField
              control={form.control}
              name="contactConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 sm:space-x-3 space-y-0 mt-3 sm:mt-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="contactConsent"
                      className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5"
                    />
                  </FormControl>
                  <div className="space-y-0.5 sm:space-y-1 leading-tight sm:leading-none">
                    <FormLabel htmlFor="contactConsent" className="text-sm sm:text-base text-wrap">
                      I consent to be contacted about my feedback
                    </FormLabel>
                    <FormDescription className="text-xs sm:text-sm">
                      We&apos;ll only use your email for this specific purpose
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>        <div className="flex justify-center sm:justify-start mt-2 sm:mt-0">
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full xs:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5 h-auto min-h-[2.5rem] rounded-md sm:rounded-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              "Submit Feedback"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
