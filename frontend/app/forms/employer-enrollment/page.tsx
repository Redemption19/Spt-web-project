"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { employerEnrollmentSchema } from "@/lib/schemas/employer-enrollment-schema"

type FormValues = z.infer<typeof employerEnrollmentSchema>;

export default function EmployerEnrollmentForm() {  const [isSubmitting, setIsSubmitting] = useState(false)
    const form = useForm<FormValues>({
    resolver: zodResolver(employerEnrollmentSchema),
    defaultValues: {
      tier2: false,
      tier3: false,
      declaration: false,
      employeeCount: 0,
      totalContribution: 0,
      dateOfSignature: "",
      dateOfEntry: "",
      dateOfApproval: "",
    },
  })
  
  function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      alert("Form submitted successfully!")
    }, 2000)
  }
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Employer Enrollment Form</h1>
        <p className="text-muted-foreground mt-2">
          Please complete all the required fields to enroll your company.
        </p>
      </div>
      
      <Card className="border-t-4 border-t-primary">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              
              {/* 1. Employer Particulars */}
              <div className="space-y-6">
                <div className="relative flex flex-col sm:flex-row items-center gap-4 w-full max-w-full overflow-hidden px-4">
                  <h3 className="text-xl font-semibold whitespace-nowrap text-center sm:text-left">1. Employer Particulars</h3>
                  <Separator className="hidden sm:block flex-1 max-w-full" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <FormField
                    control={form.control}
                    name="schemeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Scheme Name</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select scheme name" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Best Master Trust Scheme">Best Master Trust Scheme</SelectItem>
                            <SelectItem value="Best Provident Fund">Best Provident Fund</SelectItem>
                            <SelectItem value="Best Personal Pension">Best Personal Pension</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="schemeType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Scheme Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select scheme type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Tier 2">Tier 2</SelectItem>
                            <SelectItem value="Tier 3">Tier 3</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="employerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name of Employer</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter employer name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="businessRegistrationNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Registration No.</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter registration number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="ssnitEmployerNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SSNIT Employer No.</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter SSNIT employer number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="businessLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter business location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="industryCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter industry category" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TIN</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter TIN" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fixedLines"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fixed Lines</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter fixed lines" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-y-4">
                  <FormField
                    control={form.control}
                    name="mailingAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mailing Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter mailing address" 
                            className="resize-none min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gpsAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GPS Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter GPS address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* 2. Contact Person section with grouped subsections */}
              <div className="space-y-8">                <div className="relative flex flex-col sm:flex-row items-center gap-4 w-full max-w-full overflow-hidden px-4">
                  <h3 className="text-xl font-semibold whitespace-nowrap text-center sm:text-left">2. Contact Person</h3>
                  <Separator className="hidden sm:block flex-1 max-w-full" />
                </div>
                
                {/* Director subsection */}
                <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-lg">Director</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <FormField
                      control={form.control}
                      name="directorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter director name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="directorPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter director phone" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="directorEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter director email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="directorPosition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter director position" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Contact Person 1 subsection */}
                <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-lg">Other 1</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <FormField
                      control={form.control}
                      name="contact1Name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contact1Position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter position" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contact1Mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter mobile number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contact1Email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Contact Person 2 subsection */}
                <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-lg">Other 2</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <FormField
                      control={form.control}
                      name="contact2Name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contact2Position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter position" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contact2Mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter mobile number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contact2Email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* 3. Contribution Details */}              
              <div className="space-y-6">
                <div className="relative flex flex-col sm:flex-row items-center gap-4 w-full max-w-full overflow-hidden px-4">
                  <h3 className="text-xl font-semibold whitespace-nowrap text-center sm:text-left">3. Contribution Details</h3>
                  <Separator className="hidden sm:block flex-1 max-w-full" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">                  <FormField
                    control={form.control}
                    name="employeeCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Employees</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter number of employees" 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    <FormField
                    control={form.control}
                    name="totalContribution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total 5% Contribution at registration</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <span>GH₵</span>
                            <Input 
                              type="number" 
                              placeholder="Enter total contribution amount" 
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              value={field.value}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
                  <FormLabel className="text-base">Select Contribution Tiers</FormLabel>
                  <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-3 sm:space-y-0">
                    <FormField
                      control={form.control}
                      name="tier2"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Tier 2
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="tier3"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Tier 3
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* 4. Declaration */}
              <div className="space-y-6">
                <div className="relative flex flex-col sm:flex-row items-center gap-4 w-full max-w-full overflow-hidden px-4">
                  <h3 className="text-xl font-semibold whitespace-nowrap text-center sm:text-left">4. Declaration</h3>
                  <Separator className="hidden sm:block flex-1 max-w-full" />
                </div>                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="declaration"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I declare that the information provided in this form is true and correct to the best of my knowledge
                          </FormLabel>
                          <FormDescription>
                            By checking this box, you agree to the terms and conditions
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="declarantName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="declarantPosition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter position" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />                      <FormField
                        control={form.control}
                        name="dateOfSignature"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                placeholder="Select date"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex flex-col justify-end space-y-2">
                      <div className="border-b border-dashed border-gray-300 pb-2">
                        <span className="text-sm text-gray-500">Signature</span>
                      </div>
                      <div className="border-b border-dashed border-gray-300 pb-2">
                        <span className="text-sm text-gray-500">Company Stamp</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. For Office Use Only */}
              <div className="space-y-6">
                <div className="relative flex flex-col sm:flex-row items-center gap-4 w-full max-w-full overflow-hidden px-4">
                  <h3 className="text-xl font-semibold whitespace-nowrap text-center sm:text-left">5. For Office Use Only</h3>
                  <Separator className="hidden sm:block flex-1 max-w-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <FormField
                    control={form.control}
                    name="inputOfficer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Input Officer</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter officer name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="approvedBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Approved By</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter approver name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border-b border-dashed border-gray-300 pb-2">
                    <span className="text-sm text-gray-500">Input Officer&apos;s Signature</span>
                  </div>

                  <div className="border-b border-dashed border-gray-300 pb-2">
                    <span className="text-sm text-gray-500">Approving Officer&apos;s Signature</span>
                  </div>                  <FormField
                    control={form.control}
                    name="dateOfEntry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Entry</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            placeholder="Select date"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfApproval"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Approval</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            placeholder="Select date"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submit button section with improved spacing */}
              <div className="pt-8 border-t space-y-4">
                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg font-semibold" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Enrollment Application"}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Our team will review your application and contact you within 2-3 business days
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
