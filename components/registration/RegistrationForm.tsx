"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registrationSchema, RegistrationFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ─── Step indicator ──────────────────────────────────────────────────────────

const STEPS = [
  "Basic Info",
  "Category",
  "Your Profile",
  "Screening",
  "Commitment",
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((label, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                  ${done ? "bg-teal-500 text-white" : active ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-400"}`}
              >
                {done ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  idx
                )}
              </div>
              <span className={`text-[10px] font-medium hidden sm:block ${active ? "text-blue-700" : done ? "text-teal-500" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mb-4 mx-1 transition-colors ${done ? "bg-teal-400" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Field wrappers ──────────────────────────────────────────────────────────

function Field({ label, error, children, required }: { label: string; error?: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-gray-700 font-medium text-sm">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

// ─── Main form ───────────────────────────────────────────────────────────────

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const {
    register,
    control,
    watch,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      staff_list: [{ name: "", job_title: "", department: "", email: "" }],
    },
  });

  const { fields: staffFields, append: appendStaff, remove: removeStaff } = useFieldArray({
    control,
    name: "staff_list",
  });

  const registrationType = watch("registration_type");
  const industryValue = watch("industry");

  // Fields to validate per step
  const stepFields: Record<number, (keyof RegistrationFormData)[]> = {
    1: ["full_name", "email", "phone", "city_state", "organization", "industry"],
    2: ["registration_type"],
    3: [],
    4: [],
    5: ["declaration"],
  };

  const next = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => s + 1);
  };

  const back = () => setStep((s) => s - 1);

  const onSubmit = async (data: RegistrationFormData) => {
    setSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error || "Something went wrong. Please try again.");
        return;
      }
      router.push("/thank-you");
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <StepIndicator current={step} />

      {/* ── Step 1: Basic Info ─────────────────────────────────────────── */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Basic Information</h2>
            <p className="text-gray-500 text-sm mt-1">Tell us about yourself.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full Name" error={errors.full_name?.message} required>
              <Input placeholder="John Doe" {...register("full_name")} />
            </Field>
            <Field label="Email Address" error={errors.email?.message} required>
              <Input type="email" placeholder="you@company.com" {...register("email")} />
            </Field>
            <Field label="Phone Number" error={errors.phone?.message} required>
              <Input placeholder="+234 800 000 0000" {...register("phone")} />
            </Field>
            <Field label="City / State" error={errors.city_state?.message} required>
              <Input placeholder="Lagos, Lagos State" {...register("city_state")} />
            </Field>
            <Field label="LinkedIn Profile" error={errors.linkedin?.message}>
              <Input placeholder="https://linkedin.com/in/yourname" {...register("linkedin")} />
            </Field>
            <Field label="Organisation / Company Name" error={errors.organization?.message} required>
              <Input placeholder="Acme Corp Ltd" {...register("organization")} />
            </Field>
          </div>

          <Field label="Industry" error={errors.industry?.message} required>
            <Controller
              name="industry"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select your industry" /></SelectTrigger>
                  <SelectContent>
                    {["Finance", "Technology", "Consulting", "Manufacturing", "Media", "Education", "Healthcare", "Retail", "Government", "Non-profit", "Oil and Gas", "Marine", "Power", "Other"].map((i) => (
                      <SelectItem key={i} value={i}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          {industryValue === "Other" && (
            <Field label="Please specify your industry" error={errors.industry_other?.message} required>
              <Input placeholder="Your industry" {...register("industry_other")} />
            </Field>
          )}
        </div>
      )}

      {/* ── Step 2: Registration Category ──────────────────────────────── */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Registration Category</h2>
            <p className="text-gray-500 text-sm mt-1">How are you registering for Convergence?</p>
          </div>
          {errors.registration_type && (
            <p className="text-red-500 text-sm">{errors.registration_type.message}</p>
          )}
          <Controller
            name="registration_type"
            control={control}
            render={({ field }) => (
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { value: "individual", label: "Individual Professional", sub: "Salary Earner", icon: "👤" },
                  { value: "business", label: "Business Owner", sub: "Entrepreneur / Founder", icon: "🏢" },
                  { value: "corporate", label: "Corporate Team", sub: "Company registering staff", icon: "🏛️" },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => field.onChange(opt.value)}
                    className={`rounded-2xl p-6 text-left border-2 transition-all cursor-pointer
                      ${field.value === opt.value
                        ? "border-blue-700 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-blue-300"
                      }`}
                  >
                    <div className="text-3xl mb-3">{opt.icon}</div>
                    <p className="font-bold text-gray-900">{opt.label}</p>
                    <p className="text-gray-500 text-sm mt-1">{opt.sub}</p>
                  </button>
                ))}
              </div>
            )}
          />
        </div>
      )}

      {/* ── Step 3: Profile (conditional) ──────────────────────────────── */}
      {step === 3 && registrationType === "individual" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Individual Professional</h2>
            <p className="text-gray-500 text-sm mt-1">Tell us about your career.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Current Job Title" error={errors.job_title?.message}>
              <Input placeholder="e.g. Senior Manager" {...register("job_title")} />
            </Field>
            <Field label="Department" error={errors.department?.message}>
              <Input placeholder="e.g. Finance & Operations" {...register("department")} />
            </Field>

            <Field label="Years of Professional Experience" error={errors.years_experience?.message}>
              <Controller name="years_experience" control={control} render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                  <SelectContent>
                    {["3-5", "6-10", "11-15", "15+"].map((v) => (
                      <SelectItem key={v} value={v}>{v} years</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} />
            </Field>

            <Field label="Current Career Level" error={errors.career_level?.message}>
              <Controller name="career_level" control={control} render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                  <SelectContent>
                    {["Senior Associate", "Team Lead", "Manager", "Senior Manager", "Director", "Executive Leadership"].map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} />
            </Field>

            <Field label="Annual Salary Bracket (Confidential)" error={errors.salary_bracket?.message}>
              <Controller name="salary_bracket" control={control} render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select bracket" /></SelectTrigger>
                  <SelectContent>
                    {[
                      { value: "3M-7M", label: "₦3M – ₦7M" },
                      { value: "7M-15M", label: "₦7M – ₦15M" },
                      { value: "15M-30M", label: "₦15M – ₦30M" },
                      { value: "30M+", label: "₦30M+" },
                    ].map((v) => (
                      <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} />
            </Field>
          </div>

          <Field label="What scaling challenge are you currently facing in your career?" error={errors.career_challenge?.message}>
            <Textarea placeholder="Describe your current challenge..." rows={3} {...register("career_challenge")} />
          </Field>
          <Field label="What do you hope to gain from Convergence?" error={errors.individual_convergence_goal?.message}>
            <Textarea placeholder="Share your goals..." rows={3} {...register("individual_convergence_goal")} />
          </Field>
        </div>
      )}

      {step === 3 && registrationType === "business" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Business Owner / Entrepreneur</h2>
            <p className="text-gray-500 text-sm mt-1">Tell us about your business.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Business Name" error={errors.business_name?.message}>
              <Input placeholder="Your Business Name" {...register("business_name")} />
            </Field>

            <Field label="Business Stage" error={errors.business_stage?.message}>
              <Controller name="business_stage" control={control} render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select stage" /></SelectTrigger>
                  <SelectContent>
                    {["Early Growth (1-3 years)", "Growth Stage (3-7 years)", "Expansion Stage (7+ years)"].map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} />
            </Field>

            <Field label="Number of Employees" error={errors.employee_count?.message}>
              <Controller name="employee_count" control={control} render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                  <SelectContent>
                    {["1-5", "6-20", "21-50", "50+"].map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} />
            </Field>

            <Field label="Average Annual Revenue" error={errors.annual_revenue?.message}>
              <Controller name="annual_revenue" control={control} render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                  <SelectContent>
                    {[
                      { value: "Under 10M", label: "Under ₦10M" },
                      { value: "10M-50M", label: "₦10M – ₦50M" },
                      { value: "50M-200M", label: "₦50M – ₦200M" },
                      { value: "200M+", label: "₦200M+" },
                    ].map((v) => (
                      <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} />
            </Field>

            <Field label="Primary Market" error={errors.primary_market?.message}>
              <Controller name="primary_market" control={control} render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select market" /></SelectTrigger>
                  <SelectContent>
                    {["Local", "Regional", "National", "International"].map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} />
            </Field>

            <Field label="Biggest Business Scaling Challenge" error={errors.scaling_challenge?.message}>
              <Controller name="scaling_challenge" control={control} render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select challenge" /></SelectTrigger>
                  <SelectContent>
                    {["Sales growth", "Funding", "Systems & structure", "Hiring talent", "Market expansion", "Leadership capacity"].map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} />
            </Field>
          </div>

          <Field label="What do you hope to gain from Convergence?" error={errors.business_convergence_goal?.message}>
            <Textarea placeholder="Share your goals..." rows={3} {...register("business_convergence_goal")} />
          </Field>
        </div>
      )}

      {step === 3 && registrationType === "corporate" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Corporate Team Registration</h2>
            <p className="text-gray-500 text-sm mt-1">For companies registering multiple staff members.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Company Size" error={errors.company_size?.message}>
              <Controller name="company_size" control={control} render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                  <SelectContent>
                    {["10-50", "50-200", "200-500", "500+"].map((v) => (
                      <SelectItem key={v} value={v}>{v} employees</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} />
            </Field>

            <Field label="Average Annual Revenue" error={errors.corporate_revenue?.message}>
              <Controller name="corporate_revenue" control={control} render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                  <SelectContent>
                    {[
                      { value: "50M-200M", label: "₦50M – ₦200M" },
                      { value: "200M-1B", label: "₦200M – ₦1B" },
                      { value: "1B+", label: "₦1B+" },
                    ].map((v) => (
                      <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} />
            </Field>

            <Field label="Number of Staff Being Registered" error={errors.staff_count?.message}>
              <Input type="number" min="1" placeholder="e.g. 5" {...register("staff_count")} />
            </Field>
          </div>

          {/* Staff table */}
          <div>
            <Label className="text-gray-700 font-medium text-sm mb-3 block">Names and Positions of Staff Attending</Label>
            <div className="space-y-3">
              {staffFields.map((staffField, idx) => (
                <div key={staffField.id} className="grid sm:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <Input placeholder="Full Name" {...register(`staff_list.${idx}.name`)} />
                  <Input placeholder="Job Title" {...register(`staff_list.${idx}.job_title`)} />
                  <Input placeholder="Department" {...register(`staff_list.${idx}.department`)} />
                  <div className="flex gap-2">
                    <Input placeholder="Email" {...register(`staff_list.${idx}.email`)} />
                    {staffFields.length > 1 && (
                      <button type="button" onClick={() => removeStaff(idx)} className="text-red-400 hover:text-red-600 shrink-0 px-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => appendStaff({ name: "", job_title: "", department: "", email: "" })}
              className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Staff Member
            </button>
          </div>

          <Field label="Why is your organisation sending this team to Convergence?" error={errors.corporate_reason?.message}>
            <Textarea placeholder="Briefly describe your organisation's goals..." rows={3} {...register("corporate_reason")} />
          </Field>
        </div>
      )}

      {/* ── Step 4: Strategic Screening ────────────────────────────────── */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Strategic Screening</h2>
            <p className="text-gray-500 text-sm mt-1">These questions help us ensure the highest quality of conversations.</p>
          </div>

          <Field label="Which best describes your current focus?" error={errors.current_focus?.message}>
            <Controller name="current_focus" control={control} render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger><SelectValue placeholder="Select your focus" /></SelectTrigger>
                <SelectContent>
                  {["Scaling my career influence", "Growing my company revenue", "Expanding leadership capacity", "Building systems for growth", "Exploring partnerships"].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )} />
          </Field>

          <Field label="Have you attended a business leadership conference in the past 2 years?" error={errors.attended_conference?.message}>
            <Controller name="attended_conference" control={control} render={({ field }) => (
              <div className="flex gap-4">
                {["Yes", "No"].map((v) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => field.onChange(v)}
                    className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all
                      ${field.value === v ? "border-blue-700 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:border-blue-300"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )} />
          </Field>

          <Field label="Which best describes your decision-making authority?" error={errors.decision_authority?.message}>
            <Controller name="decision_authority" control={control} render={({ field }) => (
              <div className="grid sm:grid-cols-2 gap-3">
                {["I influence decisions", "I lead a team", "I manage budgets", "I make executive decisions"].map((v) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => field.onChange(v)}
                    className={`py-3 px-4 rounded-xl border-2 font-medium text-sm text-left transition-all
                      ${field.value === v ? "border-blue-700 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-blue-300"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )} />
          </Field>
        </div>
      )}

      {/* ── Step 5: Commitment & Declaration ───────────────────────────── */}
      {step === 5 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Commitment &amp; Declaration</h2>
            <p className="text-gray-500 text-sm mt-1">Final details before you submit your application.</p>
          </div>

          <Field label="Are you willing to participate in networking sessions and strategic conversations during the event?" error={errors.willing_to_network?.message}>
            <Controller name="willing_to_network" control={control} render={({ field }) => (
              <div className="flex gap-4">
                {["Yes", "No"].map((v) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => field.onChange(v)}
                    className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all
                      ${field.value === v ? "border-blue-700 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:border-blue-300"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )} />
          </Field>

          <Field label="How did you hear about Convergence?" error={errors.heard_from?.message}>
            <Controller name="heard_from" control={control} render={({ field }) => (
              <div className="grid sm:grid-cols-2 gap-3">
                {["LinkedIn", "Instagram", "Church / Faith community", "Friend or colleague", "Email invitation", "Corporate referral"].map((v) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => field.onChange(v)}
                    className={`py-3 px-4 rounded-xl border-2 font-medium text-sm text-left transition-all
                      ${field.value === v ? "border-blue-700 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-blue-300"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )} />
          </Field>

          {/* Declaration */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-4">
            <p className="text-gray-700 text-sm leading-relaxed">
              I confirm that the information provided is accurate and that I understand this event is curated
              for mid-level professionals and scaling business leaders.
            </p>
            <div className="flex items-start gap-3">
              <Controller
                name="declaration"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="declaration"
                    checked={field.value === true}
                    onCheckedChange={(checked) => field.onChange(checked === true ? true : false)}
                    className="mt-0.5"
                  />
                )}
              />
              <label htmlFor="declaration" className="text-sm text-gray-700 font-medium cursor-pointer leading-relaxed">
                I confirm the above statement
              </label>
            </div>
            {errors.declaration && (
              <p className="text-red-500 text-xs">{errors.declaration.message}</p>
            )}
          </div>

          {serverError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
              {serverError}
            </div>
          )}
        </div>
      )}

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={back} className="border-gray-300 text-gray-600">
            Back
          </Button>
        ) : (
          <div />
        )}

        {step < 5 ? (
          <Button type="button" onClick={next} className="bg-blue-700 hover:bg-blue-800 text-white px-8">
            Continue
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={submitting}
            className="bg-blue-700 hover:bg-blue-800 text-white px-8"
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </Button>
        )}
      </div>
    </form>
  );
}
