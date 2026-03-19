import { z } from "zod";

export const registrationSchema = z.object({
  // 1. Basic Personal Information
  full_name: z.string().min(2, "Full name is required"),
  email: z.email("Valid email address is required"),
  phone: z.string().min(7, "Phone number is required"),
  city_state: z.string().min(2, "City / State is required"),
  linkedin: z.url("Must be a valid URL").optional().or(z.literal("")),
  organization: z.string().min(1, "Organization / Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  industry_other: z.string().optional(),

  // 2. Registration Category
  registration_type: z.enum(["individual", "business", "corporate"], {
    error: "Please select a registration category",
  }),

  // 3. Individual Professional
  job_title: z.string().optional(),
  department: z.string().optional(),
  years_experience: z
    .enum(["3-5", "6-10", "11-15", "15+"])
    .optional(),
  career_level: z
    .enum([
      "Senior Associate",
      "Team Lead",
      "Manager",
      "Senior Manager",
      "Director",
      "Executive Leadership",
    ])
    .optional(),
  salary_bracket: z
    .enum(["3M-7M", "7M-15M", "15M-30M", "30M+"])
    .optional(),
  career_challenge: z.string().optional(),
  individual_convergence_goal: z.string().optional(),

  // 4. Business Owner
  business_name: z.string().optional(),
  business_stage: z
    .enum(["Early Growth (1-3 years)", "Growth Stage (3-7 years)", "Expansion Stage (7+ years)"])
    .optional(),
  employee_count: z.enum(["1-5", "6-20", "21-50", "50+"]).optional(),
  annual_revenue: z
    .enum(["Under 10M", "10M-50M", "50M-200M", "200M+"])
    .optional(),
  primary_market: z
    .enum(["Local", "Regional", "National", "International"])
    .optional(),
  scaling_challenge: z
    .enum([
      "Sales growth",
      "Funding",
      "Systems & structure",
      "Hiring talent",
      "Market expansion",
      "Leadership capacity",
    ])
    .optional(),
  business_convergence_goal: z.string().optional(),

  // 5. Corporate Team
  company_size: z
    .enum(["10-50", "50-200", "200-500", "500+"])
    .optional(),
  corporate_revenue: z
    .enum(["50M-200M", "200M-1B", "1B+"])
    .optional(),
  staff_count: z.string().optional(),
  staff_list: z
    .array(
      z.object({
        name: z.string(),
        job_title: z.string(),
        department: z.string(),
        email: z.string(),
      })
    )
    .optional(),
  corporate_reason: z.string().optional(),

  // 6. Strategic Screening
  current_focus: z
    .enum([
      "Scaling my career influence",
      "Growing my company revenue",
      "Expanding leadership capacity",
      "Building systems for growth",
      "Exploring partnerships",
    ])
    .optional(),
  attended_conference: z.enum(["Yes", "No"]).optional(),
  decision_authority: z
    .enum([
      "I influence decisions",
      "I lead a team",
      "I manage budgets",
      "I make executive decisions",
    ])
    .optional(),

  // 7. Commitment
  willing_to_network: z.enum(["Yes", "No"]).optional(),
  heard_from: z
    .enum([
      "LinkedIn",
      "Instagram",
      "Church / Faith community",
      "Friend or colleague",
      "Email invitation",
      "Corporate referral",
    ])
    .optional(),

  // 8. Declaration
  declaration: z.literal(true, {
    error: "You must confirm the declaration to submit",
  }),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export type RegistrationStatus =
  | "pending"
  | "approved"
  | "paid"
  | "invite_sent";
