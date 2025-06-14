"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

const formSchema = z.object({
  // Scheme Details
  schemeName: z.string().min(1, "Scheme name is required"),
  schemeType: z.string().min(1, "Scheme type is required"),
  
  // Personal Particulars
  title: z.string().min(1, "Title is required"),
  surname: z.string().min(2, "Surname must be at least 2 characters"),
  otherNames: z.string().min(2, "Other name(s) must be at least 2 characters"),
  ghanaCardNo: z.string().min(1, "Ghana Card number is required"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  ssnitNo: z.string().min(1, "SSNIT number is required"),
  telNo: z.string().min(10, "Please enter a valid telephone number"),
  email: z.string().email("Please enter a valid email address"),
  gender: z.string().min(1, "Gender is required"),
  employerName: z.string().min(2, "Employer name must be at least 2 characters"),
  dateOfEmployment: z.date({
    required_error: "Date of employment is required",
  }),
  postalAddress: z.string().min(1, "Postal address is required"),
  residenceAddress: z.string().min(1, "Residence address is required"),
  nationality: z.string().min(1, "Nationality is required"),
  hometown: z.string().min(1, "Hometown is required"),
  region: z.string().min(1, "Region is required"),
  gpsAddress: z.string().min(1, "GPS address is required"),
  otherIdCard: z.string().optional(),
  idCardNo: z.string().optional(),
  occupation: z.string().min(1, "Occupation is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  salary: z.string().min(1, "Salary is required"),

  // Next of Kin Details
  kinName: z.string().min(1, "Next of kin name is required"),
  kinRelationship: z.string().min(1, "Relationship is required"),
  kinPhone: z.string().min(10, "Please enter a valid phone number"),
  kinEmail: z.string().email("Invalid email address").optional(),
  kinAddress: z.string().min(10, "Please enter a complete address"),

  // Beneficiary Details
  beneficiaries: z.array(
    z.object({
      name: z.string().min(1, "Beneficiary name is required"),
      relationship: z.string().min(1, "Relationship is required"),
      dateOfBirth: z.date({
        required_error: "Date of birth is required",
      }),
      nationalId: z.string().min(6, "National ID must be at least 6 characters"),
      phone: z.string().min(10, "Please enter a valid phone number"),
      email: z.string().email("Invalid email address").optional(),
      address: z.string().min(10, "Please enter a complete address"),
      sharePercentage: z.number().min(0).max(100, "Share percentage must be between 0 and 100"),
    })
  ).min(1, "At least one beneficiary is required"),

  // Member's Declaration
  declaration: z.boolean().refine(val => val === true, {
    message: "You must accept the declaration",
  }),
  declarationName: z.string().min(1, "Declaration name is required"),
  declarationDate: z.date({
    required_error: "Declaration date is required",
  }),

  // Office Use Section
  officeComments: z.string().optional(),
  processingDate: z.date().optional(),
  approvalStatus: z.enum(["pending", "approved", "rejected"]).optional(),
})

export default function EmployeeEnrollmentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schemeName: "",
      schemeType: "",
      title: "",
      surname: "",
      otherNames: "",
      ghanaCardNo: "",
      ssnitNo: "",
      telNo: "",
      email: "",
      gender: "",
      employerName: "",
      postalAddress: "",
      residenceAddress: "",
      nationality: "",
      hometown: "",
      region: "",
      gpsAddress: "",
      otherIdCard: "",
      idCardNo: "",
      occupation: "",
      maritalStatus: "",
      salary: "",
      beneficiaries: [
        {
          name: "",
          relationship: "",
          dateOfBirth: undefined,
          nationalId: "",
          phone: "",
          email: "",
          address: "",
          sharePercentage: 100,
        },
      ],
      declaration: false,
      declarationName: "",
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "beneficiaries",
    control: form.control,
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="container-custom py-12">
      <Card>
        <CardHeader>
          <CardTitle>Employee Enrollment Form</CardTitle>
          <CardDescription>
            Please fill out all required information to enroll in the pension scheme.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Scheme Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">Scheme Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="schemeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Scheme Name</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a scheme" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="best-master">Best Master Trust</SelectItem>
                            <SelectItem value="best-provident">Best Provident Fund</SelectItem>
                            <SelectItem value="best-pension">Best Pension Scheme</SelectItem>
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
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select scheme type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="tier-2">Tier 2</SelectItem>
                            <SelectItem value="tier-3">Tier 3</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">Personal Particulars</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select title" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="mr">Mr.</SelectItem>
                              <SelectItem value="mrs">Mrs.</SelectItem>
                              <SelectItem value="miss">Miss</SelectItem>
                              <SelectItem value="dr">Dr.</SelectItem>
                              <SelectItem value="prof">Prof.</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="surname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Surname</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter surname" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="otherNames"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Other Name(s)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter other names" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ghanaCardNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ghana Card No.</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Ghana Card number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Birth</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                >
                                  {field.value ? format(field.value, "dd/MM/yyyy") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ssnitNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SSNIT No.</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter SSNIT number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tel No.</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Enter telephone number" {...field} />
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
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
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
                      name="dateOfEmployment"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Employment</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                >
                                  {field.value ? format(field.value, "dd/MM/yyyy") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="postalAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter postal address" {...field} rows={3} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="residenceAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Residence Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter residence address" {...field} rows={3} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nationality</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter nationality" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="hometown"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hometown</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter hometown" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Region</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select region" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="greater-accra">Greater Accra</SelectItem>
                              <SelectItem value="ashanti">Ashanti</SelectItem>
                              <SelectItem value="western">Western</SelectItem>
                              <SelectItem value="eastern">Eastern</SelectItem>
                              <SelectItem value="central">Central</SelectItem>
                              <SelectItem value="northern">Northern</SelectItem>
                              <SelectItem value="upper-east">Upper East</SelectItem>
                              <SelectItem value="upper-west">Upper West</SelectItem>
                              <SelectItem value="volta">Volta</SelectItem>
                              <SelectItem value="bono">Bono</SelectItem>
                              <SelectItem value="bono-east">Bono East</SelectItem>
                              <SelectItem value="ahafo">Ahafo</SelectItem>
                              <SelectItem value="savannah">Savannah</SelectItem>
                              <SelectItem value="north-east">North East</SelectItem>
                              <SelectItem value="oti">Oti</SelectItem>
                              <SelectItem value="western-north">Western North</SelectItem>
                            </SelectContent>
                          </Select>
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
                    <FormField
                      control={form.control}
                      name="otherIdCard"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Other ID Card</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select ID type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="passport">Passport</SelectItem>
                              <SelectItem value="drivers-license">Driver&apos;s License</SelectItem>
                              <SelectItem value="voters-id">Voter&apos;s ID</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="idCardNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID Card No.</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter ID card number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occupation</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter occupation" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="maritalStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marital Status</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select marital status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="single">Single</SelectItem>
                              <SelectItem value="married">Married</SelectItem>
                              <SelectItem value="divorced">Divorced</SelectItem>
                              <SelectItem value="widowed">Widowed</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="salary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary (GH₵)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Enter salary" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Next of Kin Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">Next of Kin Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="kinName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter next of kin's name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="kinRelationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter relationship" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="kinPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="kinEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (Optional)</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="kinAddress"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Beneficiary Details Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="text-lg font-medium">Beneficiary Details</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({
                      name: "",
                      relationship: "",
                      dateOfBirth: new Date(),
                      nationalId: "",
                      phone: "",
                      email: "",
                      address: "",
                      sharePercentage: 0,
                    })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Beneficiary
                  </Button>
                </div>
                {fields.map((field, index) => (
                  <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-medium">Beneficiary {index + 1}</h4>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`beneficiaries.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter beneficiary's name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`beneficiaries.${index}.relationship`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relationship</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter relationship" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`beneficiaries.${index}.dateOfBirth`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date of Birth</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                  >
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`beneficiaries.${index}.nationalId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>National ID</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter national ID" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`beneficiaries.${index}.phone`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="Enter phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`beneficiaries.${index}.email`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email (Optional)</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`beneficiaries.${index}.sharePercentage`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Share Percentage</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter share percentage"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`beneficiaries.${index}.address`}
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Enter address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Member's Declaration Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">Member&apos;s Declaration</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="declaration"
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
                            Declaration
                          </FormLabel>
                          <FormDescription>
                            I declare that the information provided in this form is true and correct. I understand that any false information may result in the rejection of my application or termination of my membership.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="declarationName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="declarationDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                >
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Office Use Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">For Office Use Only</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="officeComments"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Comments</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Official comments" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="processingDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Processing Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="approvalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Approval Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">Submit Enrollment Form</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}