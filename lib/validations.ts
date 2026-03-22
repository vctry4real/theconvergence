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

  // 8. Ticket Type
  ticket_type: z.enum(["access", "executive", "premier"], {
    error: "Please select a ticket type",
  }),

  // 9. Declaration
  declaration: z.literal(true, {
    error: "You must confirm the declaration to submit",
  }),
}).superRefine((data, ctx) => {
  const req = (path: string, value: string | undefined | null, message: string) => {
    if (!value?.trim()) {
      ctx.addIssue({ code: "custom", path: [path], message });
    }
  };
  const reqEnum = (path: string, value: string | undefined, message: string) => {
    if (!value) {
      ctx.addIssue({ code: "custom", path: [path], message });
    }
  };

  if (data.registration_type === "individual") {
    req("job_title", data.job_title, "Job title is required");
    req("department", data.department, "Department is required");
    reqEnum("years_experience", data.years_experience, "Years of experience is required");
    reqEnum("career_level", data.career_level, "Career level is required");
    reqEnum("salary_bracket", data.salary_bracket, "Salary bracket is required");
    req("career_challenge", data.career_challenge, "Please describe your challenge");
    req("individual_convergence_goal", data.individual_convergence_goal, "Please share your goals");
  }

  if (data.registration_type === "business") {
    req("business_name", data.business_name, "Business name is required");
    reqEnum("business_stage", data.business_stage, "Business stage is required");
    reqEnum("employee_count", data.employee_count, "Employee count is required");
    reqEnum("annual_revenue", data.annual_revenue, "Annual revenue is required");
    reqEnum("primary_market", data.primary_market, "Primary market is required");
    reqEnum("scaling_challenge", data.scaling_challenge, "Scaling challenge is required");
    req("business_convergence_goal", data.business_convergence_goal, "Please share your goals");
  }

  if (data.registration_type === "corporate") {
    reqEnum("company_size", data.company_size, "Company size is required");
    reqEnum("corporate_revenue", data.corporate_revenue, "Revenue is required");
    req("staff_count", data.staff_count, "Staff count is required");
    req("corporate_reason", data.corporate_reason, "Please describe your reason");
  }

  // Step 4 — all types
  reqEnum("current_focus", data.current_focus, "Please select your current focus");
  reqEnum("attended_conference", data.attended_conference, "Please answer this question");
  reqEnum("decision_authority", data.decision_authority, "Please select your decision authority");

  // Step 5 — all types
  reqEnum("willing_to_network", data.willing_to_network, "Please answer this question");
  reqEnum("heard_from", data.heard_from, "Please tell us how you heard about Convergence");
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export type RegistrationStatus =
  | "pending"
  | "approved"
  | "paid"
  | "invite_sent";
