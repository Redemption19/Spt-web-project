"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  // 1. Contributor Details
  contributorName: z.string().min(2, "Contributor name is required"),
  ssnitNumber: z.string().min(5, "SSNIT number is required"),
  gender: z.enum(["male", "female"]),
  schemeMemberId: z.string().min(2, "Scheme member ID is required"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date"),
  ghanaCardId: z.string().min(2, "Ghana Card ID is required"),
  telNumber: z.string().min(10, "Please enter a valid phone number"),
  emailAddress: z.string().email("Please enter a valid email address"),
  gpsAddress: z.string().min(2, "GPS address is required"),
  
  // 2. Withdrawal Details
  schemeType: z.enum(["best-master-trust", "best-provident-fund", "best-pension-fund"]),
  withdrawalType: z.enum(["full", "partial"]),
  partialAmount: z.string().optional(),
  withdrawalReason: z.enum(["retirement-60", "resignation", "early-retirement", "total-incapacity", "permanent", "other"]),
  otherReason: z.string().optional(),
  
  // 3. Payment Details
  nameOnAccount: z.string().min(2, "Name on account is required"),
  bankName: z.string().min(2, "Bank name is required"),
  accountNumber: z.string().min(5, "Account number is required"),
  branch: z.string().min(2, "Branch name is required"),
  
  // 4. Member Declaration
  memberDeclaration: z.boolean().refine((val) => val === true, "Declaration is required"),
  
  // 5. Employer Section
  employerName: z.string().optional(),
  employerTel: z.string().optional(),
  employerEmail: z.string().email("Please enter a valid email address").optional(),
  employerGpsAddress: z.string().optional(),
  isVested: z.enum(["yes", "no"]).optional(),
  vestingReason: z.string().optional(),
  
  // For Death Claim
  isDeathClaim: z.boolean().default(false),
  beneficiaryName: z.string().optional(),
  relationshipWithDeceased: z.string().optional(),
  beneficiaryGender: z.enum(["male", "female"]).optional(),
  beneficiaryGhanaCardId: z.string().optional(),
  beneficiaryDateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date").optional(),
  beneficiaryGpsAddress: z.string().optional(),
  beneficiaryTelNumber: z.string().optional(),
  beneficiaryEmailAddress: z.string().email("Please enter a valid email address").optional(),
  claimantCapacity: z.string().optional(),
  claimantDeclaration: z.boolean().optional()
})

export default function Tier2BenefitClaimForm() {  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contributorName: "",
      ssnitNumber: "",
      gender: "male",
      schemeMemberId: "",
      dateOfBirth: "",
      ghanaCardId: "",
      telNumber: "",
      emailAddress: "",
      gpsAddress: "",
      
      schemeType: "best-master-trust",
      withdrawalType: "full",
      partialAmount: "",
      withdrawalReason: "retirement-60",
      otherReason: "",
      
      nameOnAccount: "",
      bankName: "",
      accountNumber: "",
      branch: "",
      
      memberDeclaration: false,
      
      employerName: "",
      employerTel: "",
      employerEmail: "",
      employerGpsAddress: "",
      isVested: "no",
      vestingReason: "",
      
      isDeathClaim: false,
      beneficiaryName: "",
      relationshipWithDeceased: "",
      beneficiaryGender: "male",
      beneficiaryGhanaCardId: "",
      beneficiaryDateOfBirth: "",
      beneficiaryGpsAddress: "",
      beneficiaryTelNumber: "",
      beneficiaryEmailAddress: "",
      claimantCapacity: "",
      claimantDeclaration: false
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  const [isDeathClaimMode, setIsDeathClaimMode] = useState(false);  return (
    <div className="container mx-auto py-8 px-4 md:px-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Benefit Withdrawal Form</h1>
        <p className="text-muted-foreground mt-2">
          Please complete all the required fields to process your benefit claim.
        </p>
      </div>
      
      <Card className="border-t-4 border-t-primary bg-transparent">
        <CardHeader className="space-y-2 border-b pb-4">
          <CardTitle className="text-2xl font-bold">Tier 2 Benefit Claim</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <div className="space-y-8">                <div className="mb-8">
                  <div className="flex items-center space-x-2 bg-muted/50 p-4 rounded-md">
                    <Checkbox 
                      id="isDeathClaim" 
                      checked={isDeathClaimMode} 
                      onCheckedChange={(checked) => setIsDeathClaimMode(!!checked)}
                    />
                    <label htmlFor="isDeathClaim" className="text-sm font-medium leading-none cursor-pointer">
                      This is a Death Claim (For Death Claim kindly provide death certificate and letters of administration where needed)
                    </label>
                  </div>
                </div>{/* 1. Contributor Details */}
                <div className="space-y-6">
                  <div className="relative flex flex-col sm:flex-row items-center gap-4 w-full max-w-full overflow-hidden px-4">
                    <h3 className="text-xl font-semibold whitespace-nowrap text-center sm:text-left">1. Contributor Details</h3>
                    <Separator className="hidden sm:block flex-1 max-w-full" />                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                    <FormField
                      control={form.control}
                      name="contributorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name of Contributor</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ssnitNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SSNIT Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter SSNIT number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="schemeMemberId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Scheme Member ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter member ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ghanaCardId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ghana Card ID No</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Ghana Card ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tel Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="emailAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter email address" {...field} />
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
                </div>                {/* 2. Withdrawal Details */}
                <div className="space-y-6">
                  <div className="relative flex flex-col sm:flex-row items-center gap-4 w-full max-w-full overflow-hidden px-4">
                    <h3 className="text-xl font-semibold whitespace-nowrap text-center sm:text-left">2. Withdrawal Details</h3>
                    <Separator className="hidden sm:block flex-1 max-w-full" />
                  </div>
                    <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                      <FormField
                        control={form.control}
                        name="schemeType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Choose Scheme</FormLabel>
                            <FormControl>
                              <div className="flex flex-col space-y-2">
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    checked={field.value === "best-master-trust"}
                                    onChange={() => field.onChange("best-master-trust")}
                                    className="rounded-full"
                                  />
                                  <span>Best Master Trust</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    checked={field.value === "best-provident-fund"}
                                    onChange={() => field.onChange("best-provident-fund")}
                                    className="rounded-full"
                                  />
                                  <span>Best Provident Fund</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    checked={field.value === "best-pension-fund"}
                                    onChange={() => field.onChange("best-pension-fund")}
                                    className="rounded-full"
                                  />
                                  <span>Best Pension Fund</span>
                                </label>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="withdrawalType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Type of Withdrawal</FormLabel>
                            <FormControl>
                              <div className="flex flex-col space-y-2">
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    checked={field.value === "full"}
                                    onChange={() => field.onChange("full")}
                                    className="rounded-full"
                                  />
                                  <span>Full Withdrawal</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    checked={field.value === "partial"}
                                    onChange={() => field.onChange("partial")}
                                    className="rounded-full"
                                  />
                                  <span>Partial Withdrawal</span>
                                </label>
                                {field.value === "partial" && (
                                  <div className="flex items-center space-x-2 pl-6">
                                    <span>GHS</span>
                                    <FormField
                                      control={form.control}
                                      name="partialAmount"
                                      render={({ field }) => (
                                        <Input placeholder="Enter amount" {...field} className="w-32" />
                                      )}
                                    />
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="withdrawalReason"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Reason for the Withdrawal</FormLabel>
                            <FormControl>
                              <div className="flex flex-col space-y-2">
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    checked={field.value === "retirement-60"}
                                    onChange={() => field.onChange("retirement-60")}
                                    className="rounded-full"
                                  />
                                  <span>a. Retirement @60</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    checked={field.value === "resignation"}
                                    onChange={() => field.onChange("resignation")}
                                    className="rounded-full"
                                  />
                                  <span>b. Resignation</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    checked={field.value === "early-retirement"}
                                    onChange={() => field.onChange("early-retirement")}
                                    className="rounded-full"
                                  />
                                  <span>c. Early Retirement</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    checked={field.value === "total-incapacity"}
                                    onChange={() => field.onChange("total-incapacity")}
                                    className="rounded-full"
                                  />
                                  <span>d. Total Incapacity</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    checked={field.value === "permanent"}
                                    onChange={() => field.onChange("permanent")}
                                    className="rounded-full"
                                  />
                                  <span>e. Permanent</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    checked={field.value === "other"}
                                    onChange={() => field.onChange("other")}
                                    className="rounded-full"
                                  />
                                  <span>Other</span>
                                </label>
                                {field.value === "other" && (
                                  <FormField
                                    control={form.control}
                                    name="otherReason"
                                    render={({ field }) => (
                                      <Input placeholder="Specify other reason" {...field} className="ml-6" />
                                    )}
                                  />
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                  {/* 3. Payment Details */}
                <div className="space-y-6">
                  <div className="relative flex flex-col sm:flex-row items-center gap-4 w-full max-w-full overflow-hidden px-4">
                    <h3 className="text-xl font-semibold whitespace-nowrap text-center sm:text-left">3. Payment Details</h3>
                    <Separator className="hidden sm:block flex-1 max-w-full" />
                  </div>                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <FormField
                      control={form.control}
                      name="nameOnAccount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name on Account</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter name on account" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter bank name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter account number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="branch"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Branch</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter branch name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>                {/* 4. Member Declaration */}
                <div className="space-y-6">
                  <div className="relative flex flex-col sm:flex-row items-center gap-4 w-full max-w-full overflow-hidden px-4">
                    <h3 className="text-xl font-semibold whitespace-nowrap text-center sm:text-left">4. Member Declaration</h3>
                    <Separator className="hidden sm:block flex-1 max-w-full" />
                  </div>                  <div className="p-6 border rounded-md bg-muted/20">
                    <FormField
                      control={form.control}
                      name="memberDeclaration"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <div className="space-y-1">
                            <p>
                              I <span className="border-b border-dashed px-3">____________________</span> certify that the information provided on this form is correct and complete.
                              I further authorize the Trustee of the scheme to process and pay my benefits to the bank account details I have indicated above.
                              I understand that I will be liable to prosecution for any false declarations.
                            </p>
                          </div>
                          <div className="flex items-center space-x-2 mt-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              I confirm the above declaration
                            </FormLabel>
                          </div>
                          <div className="flex justify-between mt-4">
                            <div className="border-t border-dashed pt-1 w-32">
                              <span className="text-sm text-muted-foreground">Signature</span>
                            </div>
                            <div className="border-t border-dashed pt-1 w-32">
                              <span className="text-sm text-muted-foreground">Date</span>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Death Claim Section - Only shows if death claim checkbox is checked */}                {isDeathClaimMode && (
                  <div className="space-y-6 border rounded-md p-6 bg-muted/20">
                    <div className="relative flex flex-col sm:flex-row items-center gap-4 w-full max-w-full overflow-hidden">
                      <h3 className="text-xl font-semibold whitespace-nowrap text-center sm:text-left">Claimant Details</h3>
                      <Separator className="hidden sm:block flex-1 max-w-full" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                      <FormField
                        control={form.control}
                        name="beneficiaryName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name of Beneficiary</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter beneficiary name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="relationshipWithDeceased"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relationship with deceased</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter relationship" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="beneficiaryGender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="beneficiaryGhanaCardId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ghana Card ID No</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter Ghana Card ID" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="beneficiaryDateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="beneficiaryGpsAddress"
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
                      <FormField
                        control={form.control}
                        name="beneficiaryTelNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tel Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="beneficiaryEmailAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Claimant Declaration */}
                    <div className="space-y-6 mt-6">
                      <div className="relative flex flex-col sm:flex-row items-center gap-4 w-full max-w-full overflow-hidden">
                        <h3 className="text-xl font-semibold whitespace-nowrap text-center sm:text-left">Claimant Declaration</h3>
                        <Separator className="hidden sm:block flex-1 max-w-full" />
                      </div>                      <div className="p-6 border rounded-md bg-muted/20">
                        <FormField
                          control={form.control}
                          name="claimantCapacity"
                          render={({ field }) => (
                            <FormItem className="mb-4">
                              <FormLabel>In the capacity as</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your capacity" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      
                        <FormField
                          control={form.control}
                          name="claimantDeclaration"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <div className="space-y-1">
                                <p>
                                  I <span className="border-b border-dashed px-3">____________________</span> certify that the information provided on this form is correct and complete.
                                  I further authorize the Trustee of the scheme to process and pay any benefits assigned to me by the deceased to the bank account details I have indicated above.
                                  I understand that I will be liable to prosecution for any false declarations.
                                </p>
                              </div>
                              <div className="flex items-center space-x-2 mt-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  I confirm the above declaration
                                </FormLabel>
                              </div>
                              <div className="flex justify-between mt-4">
                                <div className="border-t border-dashed pt-1 w-32">
                                  <span className="text-sm text-muted-foreground">Signature</span>
                                </div>
                                <div className="border-t border-dashed pt-1 w-32">
                                  <span className="text-sm text-muted-foreground">Date</span>
                                </div>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}                {/* 5. Employer Section */}
                <div className="space-y-6">
                  <div className="relative flex flex-col sm:flex-row items-center gap-4 w-full max-w-full overflow-hidden px-4">
                    <h3 className="text-xl font-semibold whitespace-nowrap text-center sm:text-left">5. Employer Section</h3>
                    <Separator className="hidden sm:block flex-1 max-w-full" />
                  </div>
                  <p className="text-muted-foreground text-sm px-4">(For employer&apos;s official use only)</p>                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
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
                      name="employerTel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tel. Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="employerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="employerGpsAddress"
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
                    <div className="p-6 border rounded-md bg-muted/20">
                    <h4 className="font-medium mb-4">Vesting Provision (Provident Fund Withdrawals)</h4>
                    <FormField
                      control={form.control}
                      name="isVested"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Is the Employee vested in the Employer Contributions</FormLabel>
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                checked={field.value === "yes"}
                                onChange={() => field.onChange("yes")}
                                className="rounded-full"
                              />
                              <span>YES</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                checked={field.value === "no"}
                                onChange={() => field.onChange("no")}
                                className="rounded-full"
                              />
                              <span>NO</span>
                            </label>
                          </div>
                          {field.value === "yes" && (
                            <FormField
                              control={form.control}
                              name="vestingReason"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>If Yes kindly give reasons:</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="Enter reasons" {...field} className="min-h-[80px]" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div className="space-y-2">
                        <div className="border-t border-dashed pt-1">
                          <span className="text-sm text-muted-foreground">Human Resource Officer</span>
                        </div>
                        <div className="flex justify-between">
                          <div className="border-t border-dashed pt-1 w-32">
                            <span className="text-sm text-muted-foreground">Signature</span>
                          </div>
                          <div className="border-t border-dashed pt-1 w-32">
                            <span className="text-sm text-muted-foreground">Date</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="border-t border-dashed pt-1">
                          <span className="text-sm text-muted-foreground">Finance Officer</span>
                        </div>
                        <div className="flex justify-between">
                          <div className="border-t border-dashed pt-1 w-32">
                            <span className="text-sm text-muted-foreground">Signature</span>
                          </div>
                          <div className="border-t border-dashed pt-1 w-32">
                            <span className="text-sm text-muted-foreground">Date</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mt-4">
                      <p>NB: Please return this form signed by either one of the signatories above.</p>
                    </div>
                  </div>
                </div>
                  {/* Official Use Only Section */}
                <div className="space-y-6">
                  <div className="relative flex flex-col sm:flex-row items-center gap-4 w-full max-w-full overflow-hidden px-4">
                    <h3 className="text-xl font-semibold whitespace-nowrap text-center sm:text-left">Official Use Only</h3>
                    <Separator className="hidden sm:block flex-1 max-w-full" />
                  </div>                  <div className="p-6 border rounded-md bg-muted/20">
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">Verified By</p>
                        <div className="border-t border-dashed pt-1 mt-2">
                          <span className="text-sm text-muted-foreground">Client Service Executive</span>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <div className="border-t border-dashed pt-1 w-32">
                          <span className="text-sm text-muted-foreground">Signature</span>
                        </div>
                        <div className="border-t border-dashed pt-1 w-32">
                          <span className="text-sm text-muted-foreground">Date</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>              <div className="flex justify-center pt-8">
                <Button type="submit" size="lg" className="px-10 py-6 text-base font-semibold">
                  Submit Withdrawal Form
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}