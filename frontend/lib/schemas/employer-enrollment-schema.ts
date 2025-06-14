import { z } from "zod";

export const employerEnrollmentSchema = z.object({
  // 1. Employer Particulars
  schemeName: z.enum(["Best Master Trust Scheme", "Best Provident Fund", "Best Personal Pension"], {
    required_error: "Please select a scheme name"
  }),
  schemeType: z.enum(["Tier 2", "Tier 3"], {
    required_error: "Please select a scheme type"
  }),
  employerName: z.string().min(2, "Employer name is required"),
  businessRegistrationNo: z.string().min(2, "Business registration number is required"),
  ssnitEmployerNo: z.string().min(2, "SSNIT employer number is required"),
  businessLocation: z.string().min(2, "Business location is required"),
  industryCategory: z.string().min(2, "Industry category is required"),
  tin: z.string().min(2, "TIN is required"),
  email: z.string().email("Please enter a valid email address"),
  fixedLines: z.string().min(10, "Please enter valid fixed line numbers"),
  mailingAddress: z.string().min(10, "Please enter complete mailing address"),
  gpsAddress: z.string().min(2, "GPS address is required"),

  // 2. Contact Details
  directorName: z.string().min(2, "Director name is required"),
  directorPhone: z.string().min(10, "Please enter valid phone number"),
  directorEmail: z.string().email("Please enter a valid email address"),
  directorPosition: z.string().min(2, "Director position is required"),

  contact1Name: z.string().min(2, "Contact person 1 name is required"),
  contact1Position: z.string().min(2, "Contact person 1 position is required"),
  contact1Mobile: z.string().min(10, "Please enter valid mobile number"),
  contact1Email: z.string().email("Please enter a valid email address"),

  contact2Name: z.string().optional(),
  contact2Position: z.string().optional(),
  contact2Mobile: z.string().optional(),
  contact2Email: z.string().email("Please enter a valid email address").optional(),

  // 3. Contribution Details
  employeeCount: z.coerce.number().min(1, "Number of employees is required"),
  totalContribution: z.coerce.number().min(0, "Total contribution amount is required"),
  tier2: z.boolean(),
  tier3: z.boolean(),

  // 4. Declaration
  declaration: z.boolean().refine(val => val === true, {
    message: "You must agree to the declaration"
  }),
  declarantName: z.string().min(2, "Declarant name is required"),
  declarantPosition: z.string().min(2, "Declarant position is required"),
  dateOfSignature: z.string().min(1, "Date of signature is required"),

  // 5. For Office Use Only
  inputOfficer: z.string().min(2, "Input officer name is required"),
  approvedBy: z.string().min(2, "Approver name is required"),
  dateOfEntry: z.string().min(1, "Date of entry is required"),
  dateOfApproval: z.string().min(1, "Date of approval is required")
});
