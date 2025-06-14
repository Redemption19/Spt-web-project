"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  // Deceased Member Information
  memberNumber: z.string().min(5, "Member number must be at least 5 characters"),
  deceasedFirstName: z.string().min(2, "First name must be at least 2 characters"),
  deceasedLastName: z.string().min(2, "Last name must be at least 2 characters"),
  dateOfDeath: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date"),
  
  // Beneficiary Information
  relationship: z.string().min(2, "Please specify relationship to deceased"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date"),
  nationalId: z.string().min(6, "National ID must be at least 6 characters"),
  
  // Contact Information
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(10, "Please enter a complete address"),
  
  // Supporting Documents
  deathCertificate: z.boolean().refine((val) => val === true, "Death certificate must be attached"),
  proofOfRelationship: z.boolean().refine((val) => val === true, "Proof of relationship must be attached"),
  
  // Bank Details
  bankName: z.string().min(2, "Bank name must be at least 2 characters"),
  accountNumber: z.string().min(5, "Account number must be at least 5 characters"),
  branchCode: z.string().min(4, "Branch code must be at least 4 characters"),
  
  // Declaration
  declarationAccepted: z.boolean().refine((val) => val === true, "You must accept the declaration")
})

export default function Tier2BeneficiaryClaimForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberNumber: "",
      deceasedFirstName: "",
      deceasedLastName: "",
      dateOfDeath: "",
      relationship: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nationalId: "",
      email: "",
      phone: "",
      address: "",
      deathCertificate: false,
      proofOfRelationship: false,
      bankName: "",
      accountNumber: "",
      branchCode: "",
      declarationAccepted: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Add your form submission logic here
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <Card className="shadow-sm">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Tier 2 Beneficiary Claim Form</CardTitle>
          <CardDescription>
            Please fill out this form to claim benefits as a beneficiary of a deceased Tier 2 pension scheme member.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Deceased Member Information */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium border-b pb-2">Deceased Member Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="memberNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Member Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter member number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateOfDeath"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Death</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="deceasedFirstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter deceased member's first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="deceasedLastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter deceased member's last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Beneficiary Information */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium border-b pb-2">Beneficiary Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="relationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship to Deceased</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your relationship" {...field} />
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
                    name="nationalId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>National ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your national ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium border-b pb-2">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Bank Details */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium border-b pb-2">Bank Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                    name="branchCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter branch code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter account number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Supporting Documents */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium border-b pb-2">Supporting Documents</h3>
                <div className="grid grid-cols-1 gap-3">
                  <FormField
                    control={form.control}
                    name="deathCertificate"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Death Certificate</FormLabel>
                          <FormDescription>
                            Please attach a certified copy of the death certificate
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="proofOfRelationship"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Proof of Relationship</FormLabel>
                          <FormDescription>
                            Please attach documents proving your relationship to the deceased
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Declaration */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium border-b pb-2">Declaration</h3>
                <FormField
                  control={form.control}
                  name="declarationAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Declaration</FormLabel>
                        <FormDescription>
                          I declare that all information provided is true and accurate. I understand that providing false information may result in legal consequences.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full md:w-auto">Submit Claim</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}