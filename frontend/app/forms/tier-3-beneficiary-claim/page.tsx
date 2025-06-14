'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  memberNumber: z.string().min(1, 'Required'),
  deceasedFirstName: z.string().min(1, 'Required'),
  deceasedLastName: z.string().min(1, 'Required'),
  dateOfDeath: z.date(),
  relationship: z.string().min(1, 'Required'),
  beneficiaryDetails: z.object({
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(10, 'Invalid phone number')
  }),
  bankDetails: z.object({
    bankName: z.string().min(1, 'Required'),
    accountNumber: z.string().min(1, 'Required'),
    branchCode: z.string().min(1, 'Required')
  }),
  declarationAccepted: z.boolean()
});

export default function Tier3BeneficiaryClaimForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberNumber: '',
      deceasedFirstName: '',
      deceasedLastName: '',
      dateOfDeath: new Date(),
      relationship: '',
      beneficiaryDetails: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      bankDetails: {
        bankName: '',
        accountNumber: '',
        branchCode: ''
      },
      declarationAccepted: false
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Tier 3 Beneficiary Claim Form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="deceasedFirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deceased First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter deceased first name" {...field} />
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
                  <FormLabel>Deceased Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter deceased last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="dateOfDeath"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Death</FormLabel>
                <FormControl>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
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
                  <Input placeholder="Enter relationship" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Beneficiary Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="beneficiaryDetails.firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter beneficiary first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="beneficiaryDetails.lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter beneficiary last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="beneficiaryDetails.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter beneficiary email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="beneficiaryDetails.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter beneficiary phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Bank Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="bankDetails.bankName"
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
                name="bankDetails.accountNumber"
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
                name="bankDetails.branchCode"render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter branch code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
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
                  <FormLabel>
                    I declare that the information provided is true and correct
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}