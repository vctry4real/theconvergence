"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registrationSchema, RegistrationFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STEPS = [
  { label: "Basic Info", desc: "Personal details" },
  { label: "Category", desc: "How you're registering" },
  { label: "Your Profile", desc: "Tell us more" },
  { label: "Screening", desc: "Strategic questions" },
  { label: "Commitment", desc: "Final confirmation" },
];

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({ step }: { step: number }) {
  return (
    <div className="hidden lg:flex flex-col justify-between bg-gray-950 p-10 w-80 shrink-0 min-h-full">
      <div>
        <Link href="/" className="flex flex-col mb-12">
          <span className="font-black text-white text-lg tracking-tight">
            The Convergence
          </span>
          <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mt-0.5">
            Faith · Business · Leadership
          </span>
        </Link>

        {/* Vertical steps */}
        <div className="space-y-0">
          {STEPS.map((s, i) => {
            const idx = i + 1;
            const done = idx < step;
            const active = idx === step;
            return (
              <div key={s.label} className="flex gap-4">
                {/* Line + circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-all
                    ${done ? "bg-teal-500 text-white" : active ? "bg-teal-600 text-white ring-4 ring-teal-600/20" : "bg-white/5 text-gray-600"}`}
                  >
                    {done ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      idx
                    )}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`w-px flex-1 my-1 min-h-[32px] transition-colors ${done ? "bg-teal-500/40" : "bg-white/5"}`}
                    />
                  )}
                </div>
                {/* Label */}
                <div className="pb-8">
                  <p
                    className={`text-sm font-bold leading-none mt-1.5 ${active ? "text-white" : done ? "text-teal-400" : "text-gray-400"}`}
                  >
                    {s.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event info at bottom */}
      <div className="border-t border-white/10 pt-6 space-y-2">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-600">
          Event
        </p>
        <p className="text-white font-semibold text-sm">
          Saturday, 18th April 2026
        </p>
        <p className="text-gray-500 text-xs">Heritage House, Port Harcourt</p>
        <div className="inline-block mt-2 text-[10px] font-bold tracking-widest uppercase text-teal-400 bg-teal-400/10 border border-teal-400/20 px-2 py-1 rounded-full">
          Screened Admission
        </div>
      </div>
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
  required,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold tracking-wider uppercase text-gray-500">
        {label}
        {required && <span className="text-teal-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Step heading ─────────────────────────────────────────────────────────────

function StepHeading({
  step,
  title,
  sub,
}: {
  step: number;
  title: string;
  sub: string;
}) {
  return (
    <div className="mb-8 pb-6 border-b border-gray-100">
      <p className="text-xs font-bold tracking-[0.2em] uppercase text-teal-500 mb-2">
        Step {step} of {STEPS.length}
      </p>
      <h2 className="text-2xl font-black text-gray-900">{title}</h2>
      <p className="text-gray-400 text-sm mt-1">{sub}</p>
    </div>
  );
}

// ─── Toggle button (Yes/No, option picker) ────────────────────────────────────

function ToggleBtn({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-2.5 px-4 rounded-xl border text-sm font-semibold transition-all text-left
        ${
          selected
            ? "border-teal-500 bg-teal-500/10 text-teal-700"
            : "border-gray-200 text-gray-500 hover:border-teal-300 hover:text-gray-700"
        }`}
    >
      {children}
    </button>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

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

  const {
    fields: staffFields,
    append: appendStaff,
    remove: removeStaff,
  } = useFieldArray({ control, name: "staff_list" });

  const registrationType = watch("registration_type");
  const industryValue = watch("industry");

  const stepFields: Record<number, (keyof RegistrationFormData)[]> = {
    1: [
      "full_name",
      "email",
      "phone",
      "city_state",
      "organization",
      "industry",
    ],
    2: ["registration_type"],
    3: [],
    4: [],
    5: ["declaration"],
  };

  const next = async () => {
    if (await trigger(stepFields[step])) setStep((s) => s + 1);
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
      setServerError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Mobile step bar
  const MobileSteps = () => (
    <div className="flex lg:hidden items-center gap-1 mb-8">
      {STEPS.map((_, i) => {
        const idx = i + 1;
        return (
          <div
            key={idx}
            className={`h-1 flex-1 rounded-full transition-all ${idx < step ? "bg-teal-500" : idx === step ? "bg-teal-400" : "bg-gray-200"}`}
          />
        );
      })}
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar step={step} />

      {/* Right panel */}
      <div className="flex-1 bg-white flex flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex-1 flex flex-col"
        >
          <div className="flex-1 px-4 sm:px-8 lg:px-12 py-6 sm:py-10 max-w-2xl w-full mx-auto">
            <MobileSteps />

            {/* ── Step 1 ── */}
            {step === 1 && (
              <div className="space-y-5">
                <StepHeading
                  step={1}
                  title="Basic Information"
                  sub="Let's start with who you are."
                />
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="Full Name"
                    error={errors.full_name?.message}
                    required
                  >
                    <Input
                      className="h-11 bg-gray-50 border-gray-200 focus:border-teal-400 focus:ring-teal-400/20"
                      placeholder="John Doe"
                      {...register("full_name")}
                    />
                  </Field>
                  <Field
                    label="Email Address"
                    error={errors.email?.message}
                    required
                  >
                    <Input
                      className="h-11 bg-gray-50 border-gray-200 focus:border-teal-400 focus:ring-teal-400/20"
                      type="email"
                      placeholder="you@company.com"
                      {...register("email")}
                    />
                  </Field>
                  <Field
                    label="Phone Number"
                    error={errors.phone?.message}
                    required
                  >
                    <Input
                      className="h-11 bg-gray-50 border-gray-200 focus:border-teal-400 focus:ring-teal-400/20"
                      placeholder="+234 800 000 0000"
                      {...register("phone")}
                    />
                  </Field>
                  <Field
                    label="City / State"
                    error={errors.city_state?.message}
                    required
                  >
                    <Input
                      className="h-11 bg-gray-50 border-gray-200 focus:border-teal-400 focus:ring-teal-400/20"
                      placeholder="Lagos, Lagos State"
                      {...register("city_state")}
                    />
                  </Field>
                  <Field
                    label="Organisation / Company"
                    error={errors.organization?.message}
                    required
                  >
                    <Input
                      className="h-11 bg-gray-50 border-gray-200 focus:border-teal-400 focus:ring-teal-400/20"
                      placeholder="Acme Corp Ltd"
                      {...register("organization")}
                    />
                  </Field>
                  <Field
                    label="LinkedIn Profile"
                    error={errors.linkedin?.message}
                  >
                    <Input
                      className="h-11 bg-gray-50 border-gray-200 focus:border-teal-400 focus:ring-teal-400/20"
                      placeholder="https://linkedin.com/in/you"
                      {...register("linkedin")}
                    />
                  </Field>
                </div>
                <Field
                  label="Industry"
                  error={errors.industry?.message}
                  required
                >
                  <Controller
                    name="industry"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <SelectTrigger className="h-11 bg-gray-50 border-gray-200">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Finance",
                            "Technology",
                            "Consulting",
                            "Manufacturing",
                            "Media",
                            "Education",
                            "Healthcare",
                            "Retail",
                            "Government",
                            "Non-profit",
                            "Oil and Gas",
                            "Marine",
                            "Power",
                            "Other",
                          ].map((i) => (
                            <SelectItem key={i} value={i}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
                {industryValue === "Other" && (
                  <Field
                    label="Please specify"
                    error={errors.industry_other?.message}
                    required
                  >
                    <Input
                      className="h-11 bg-gray-50 border-gray-200 focus:border-teal-400"
                      placeholder="Your industry"
                      {...register("industry_other")}
                    />
                  </Field>
                )}
              </div>
            )}

            {/* ── Step 2 ── */}
            {step === 2 && (
              <div className="space-y-5">
                <StepHeading
                  step={2}
                  title="Registration Category"
                  sub="How are you registering for Convergence?"
                />
                {errors.registration_type && (
                  <p className="text-red-400 text-sm">
                    ⚠ {errors.registration_type.message}
                  </p>
                )}
                <Controller
                  name="registration_type"
                  control={control}
                  render={({ field }) => (
                    <div className="grid gap-4">
                      {[
                        {
                          value: "individual",
                          label: "Individual Professional",
                          sub: "Salary earner attending independently",
                          icon: "👤",
                        },
                        {
                          value: "business",
                          label: "Business Owner / Entrepreneur",
                          sub: "Founder or business owner",
                          icon: "🏢",
                        },
                        {
                          value: "corporate",
                          label: "Corporate Team",
                          sub: "Company registering multiple staff",
                          icon: "🏛️",
                        },
                      ].map((opt) => (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => field.onChange(opt.value)}
                          className={`flex items-center gap-5 p-5 rounded-2xl border-2 text-left transition-all
                          ${
                            field.value === opt.value
                              ? "border-teal-500 bg-teal-50"
                              : "border-gray-100 bg-gray-50 hover:border-teal-200"
                          }`}
                        >
                          <div
                            className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center shrink-0
                          ${field.value === opt.value ? "bg-teal-500/10" : "bg-white border border-gray-200"}`}
                          >
                            {opt.icon}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">
                              {opt.label}
                            </p>
                            <p className="text-gray-400 text-sm mt-0.5">
                              {opt.sub}
                            </p>
                          </div>
                          <div
                            className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
                          ${field.value === opt.value ? "border-teal-500 bg-teal-500" : "border-gray-300"}`}
                          >
                            {field.value === opt.value && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                />
              </div>
            )}

            {/* ── Step 3: Individual ── */}
            {step === 3 && registrationType === "individual" && (
              <div className="space-y-5">
                <StepHeading
                  step={3}
                  title="Individual Professional"
                  sub="Tell us about your career journey."
                />
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="Current Job Title"
                    error={errors.job_title?.message}
                  >
                    <Input
                      className="h-11 bg-gray-50 border-gray-200 focus:border-teal-400"
                      placeholder="e.g. Senior Manager"
                      {...register("job_title")}
                    />
                  </Field>
                  <Field label="Department" error={errors.department?.message}>
                    <Input
                      className="h-11 bg-gray-50 border-gray-200 focus:border-teal-400"
                      placeholder="e.g. Finance & Operations"
                      {...register("department")}
                    />
                  </Field>
                  <Field
                    label="Years of Experience"
                    error={errors.years_experience?.message}
                  >
                    <Controller
                      name="years_experience"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger className="h-11 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            {["3-5", "6-10", "11-15", "15+"].map((v) => (
                              <SelectItem key={v} value={v}>
                                {v} years
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                  <Field
                    label="Career Level"
                    error={errors.career_level?.message}
                  >
                    <Controller
                      name="career_level"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger className="h-11 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Senior Associate",
                              "Team Lead",
                              "Manager",
                              "Senior Manager",
                              "Director",
                              "Executive Leadership",
                            ].map((v) => (
                              <SelectItem key={v} value={v}>
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                  <Field
                    label="Annual Salary Bracket (Confidential)"
                    error={errors.salary_bracket?.message}
                  >
                    <Controller
                      name="salary_bracket"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger className="h-11 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select bracket" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              { value: "3M-7M", label: "₦3M – ₦7M" },
                              { value: "7M-15M", label: "₦7M – ₦15M" },
                              { value: "15M-30M", label: "₦15M – ₦30M" },
                              { value: "30M+", label: "₦30M+" },
                            ].map((v) => (
                              <SelectItem key={v.value} value={v.value}>
                                {v.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                </div>
                <Field
                  label="What scaling challenge are you currently facing?"
                  error={errors.career_challenge?.message}
                >
                  <Textarea
                    className="bg-gray-50 border-gray-200 focus:border-teal-400 resize-none"
                    rows={3}
                    placeholder="Describe your current challenge..."
                    {...register("career_challenge")}
                  />
                </Field>
                <Field
                  label="What do you hope to gain from Convergence?"
                  error={errors.individual_convergence_goal?.message}
                >
                  <Textarea
                    className="bg-gray-50 border-gray-200 focus:border-teal-400 resize-none"
                    rows={3}
                    placeholder="Share your goals..."
                    {...register("individual_convergence_goal")}
                  />
                </Field>
              </div>
            )}

            {/* ── Step 3: Business ── */}
            {step === 3 && registrationType === "business" && (
              <div className="space-y-5">
                <StepHeading
                  step={3}
                  title="Business Owner / Entrepreneur"
                  sub="Tell us about your business."
                />
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="Business Name"
                    error={errors.business_name?.message}
                  >
                    <Input
                      className="h-11 bg-gray-50 border-gray-200 focus:border-teal-400"
                      placeholder="Your Business Name"
                      {...register("business_name")}
                    />
                  </Field>
                  <Field
                    label="Business Stage"
                    error={errors.business_stage?.message}
                  >
                    <Controller
                      name="business_stage"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger className="h-11 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select stage" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Early Growth (1-3 years)",
                              "Growth Stage (3-7 years)",
                              "Expansion Stage (7+ years)",
                            ].map((v) => (
                              <SelectItem key={v} value={v}>
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                  <Field
                    label="Number of Employees"
                    error={errors.employee_count?.message}
                  >
                    <Controller
                      name="employee_count"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger className="h-11 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            {["1-5", "6-20", "21-50", "50+"].map((v) => (
                              <SelectItem key={v} value={v}>
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                  <Field
                    label="Average Annual Revenue"
                    error={errors.annual_revenue?.message}
                  >
                    <Controller
                      name="annual_revenue"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger className="h-11 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              { value: "Under 10M", label: "Under ₦10M" },
                              { value: "10M-50M", label: "₦10M – ₦50M" },
                              { value: "50M-200M", label: "₦50M – ₦200M" },
                              { value: "200M+", label: "₦200M+" },
                            ].map((v) => (
                              <SelectItem key={v.value} value={v.value}>
                                {v.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                  <Field
                    label="Primary Market"
                    error={errors.primary_market?.message}
                  >
                    <Controller
                      name="primary_market"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger className="h-11 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select market" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Local",
                              "Regional",
                              "National",
                              "International",
                            ].map((v) => (
                              <SelectItem key={v} value={v}>
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                  <Field
                    label="Biggest Scaling Challenge"
                    error={errors.scaling_challenge?.message}
                  >
                    <Controller
                      name="scaling_challenge"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger className="h-11 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select challenge" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Sales growth",
                              "Funding",
                              "Systems & structure",
                              "Hiring talent",
                              "Market expansion",
                              "Leadership capacity",
                            ].map((v) => (
                              <SelectItem key={v} value={v}>
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                </div>
                <Field
                  label="What do you hope to gain from Convergence?"
                  error={errors.business_convergence_goal?.message}
                >
                  <Textarea
                    className="bg-gray-50 border-gray-200 focus:border-teal-400 resize-none"
                    rows={3}
                    placeholder="Share your goals..."
                    {...register("business_convergence_goal")}
                  />
                </Field>
              </div>
            )}

            {/* ── Step 3: Corporate ── */}
            {step === 3 && registrationType === "corporate" && (
              <div className="space-y-5">
                <StepHeading
                  step={3}
                  title="Corporate Team Registration"
                  sub="For companies registering multiple staff members."
                />
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="Company Size"
                    error={errors.company_size?.message}
                  >
                    <Controller
                      name="company_size"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger className="h-11 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {["10-50", "50-200", "200-500", "500+"].map((v) => (
                              <SelectItem key={v} value={v}>
                                {v} employees
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                  <Field
                    label="Average Annual Revenue"
                    error={errors.corporate_revenue?.message}
                  >
                    <Controller
                      name="corporate_revenue"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger className="h-11 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              { value: "50M-200M", label: "₦50M – ₦200M" },
                              { value: "200M-1B", label: "₦200M – ₦1B" },
                              { value: "1B+", label: "₦1B+" },
                            ].map((v) => (
                              <SelectItem key={v.value} value={v.value}>
                                {v.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                  <Field
                    label="Number of Staff Being Registered"
                    error={errors.staff_count?.message}
                  >
                    <Input
                      className="h-11 bg-gray-50 border-gray-200 focus:border-teal-400"
                      type="number"
                      min="1"
                      placeholder="e.g. 5"
                      {...register("staff_count")}
                    />
                  </Field>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider uppercase text-gray-500 mb-3">
                    Staff Attending
                  </p>
                  <div className="space-y-2">
                    {staffFields.map((f, idx) => (
                      <div
                        key={f.id}
                        className="grid sm:grid-cols-4 gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100"
                      >
                        <Input
                          className="h-10 bg-white border-gray-200 text-sm"
                          placeholder="Full Name"
                          {...register(`staff_list.${idx}.name`)}
                        />
                        <Input
                          className="h-10 bg-white border-gray-200 text-sm"
                          placeholder="Job Title"
                          {...register(`staff_list.${idx}.job_title`)}
                        />
                        <Input
                          className="h-10 bg-white border-gray-200 text-sm"
                          placeholder="Department"
                          {...register(`staff_list.${idx}.department`)}
                        />
                        <div className="flex gap-2">
                          <Input
                            className="h-10 bg-white border-gray-200 text-sm"
                            placeholder="Email"
                            {...register(`staff_list.${idx}.email`)}
                          />
                          {staffFields.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeStaff(idx)}
                              className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      appendStaff({
                        name: "",
                        job_title: "",
                        department: "",
                        email: "",
                      })
                    }
                    className="mt-3 text-xs font-bold tracking-wide text-teal-600 hover:text-teal-500 flex items-center gap-1.5 uppercase"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Staff Member
                  </button>
                </div>
                <Field
                  label="Why is your organisation sending this team?"
                  error={errors.corporate_reason?.message}
                >
                  <Textarea
                    className="bg-gray-50 border-gray-200 focus:border-teal-400 resize-none"
                    rows={3}
                    placeholder="Briefly describe your goals..."
                    {...register("corporate_reason")}
                  />
                </Field>
              </div>
            )}

            {/* ── Step 4 ── */}
            {step === 4 && (
              <div className="space-y-6">
                <StepHeading
                  step={4}
                  title="Strategic Screening"
                  sub="These questions help us curate the right conversations."
                />
                <Field
                  label="Which best describes your current focus?"
                  error={errors.current_focus?.message}
                >
                  <Controller
                    name="current_focus"
                    control={control}
                    render={({ field }) => (
                      <div className="grid gap-2">
                        {[
                          "Scaling my career influence",
                          "Growing my company revenue",
                          "Expanding leadership capacity",
                          "Building systems for growth",
                          "Exploring partnerships",
                        ].map((v) => (
                          <ToggleBtn
                            key={v}
                            selected={field.value === v}
                            onClick={() => field.onChange(v)}
                          >
                            {v}
                          </ToggleBtn>
                        ))}
                      </div>
                    )}
                  />
                </Field>
                <Field
                  label="Attended a business leadership conference in the past 2 years?"
                  error={errors.attended_conference?.message}
                >
                  <Controller
                    name="attended_conference"
                    control={control}
                    render={({ field }) => (
                      <div className="flex gap-3">
                        {["Yes", "No"].map((v) => (
                          <ToggleBtn
                            key={v}
                            selected={field.value === v}
                            onClick={() => field.onChange(v)}
                          >
                            {v}
                          </ToggleBtn>
                        ))}
                      </div>
                    )}
                  />
                </Field>
                <Field
                  label="Which best describes your decision-making authority?"
                  error={errors.decision_authority?.message}
                >
                  <Controller
                    name="decision_authority"
                    control={control}
                    render={({ field }) => (
                      <div className="grid sm:grid-cols-2 gap-2">
                        {[
                          "I influence decisions",
                          "I lead a team",
                          "I manage budgets",
                          "I make executive decisions",
                        ].map((v) => (
                          <ToggleBtn
                            key={v}
                            selected={field.value === v}
                            onClick={() => field.onChange(v)}
                          >
                            {v}
                          </ToggleBtn>
                        ))}
                      </div>
                    )}
                  />
                </Field>
              </div>
            )}

            {/* ── Step 5 ── */}
            {step === 5 && (
              <div className="space-y-6">
                <StepHeading
                  step={5}
                  title="Commitment & Declaration"
                  sub="Almost done — final confirmation."
                />
                <Field
                  label="Willing to participate in networking sessions?"
                  error={errors.willing_to_network?.message}
                >
                  <Controller
                    name="willing_to_network"
                    control={control}
                    render={({ field }) => (
                      <div className="flex gap-3">
                        {["Yes", "No"].map((v) => (
                          <ToggleBtn
                            key={v}
                            selected={field.value === v}
                            onClick={() => field.onChange(v)}
                          >
                            {v}
                          </ToggleBtn>
                        ))}
                      </div>
                    )}
                  />
                </Field>
                <Field
                  label="How did you hear about Convergence?"
                  error={errors.heard_from?.message}
                >
                  <Controller
                    name="heard_from"
                    control={control}
                    render={({ field }) => (
                      <div className="grid sm:grid-cols-2 gap-2">
                        {[
                          "LinkedIn",
                          "Instagram",
                          "Church / Faith community",
                          "Friend or colleague",
                          "Email invitation",
                          "Corporate referral",
                        ].map((v) => (
                          <ToggleBtn
                            key={v}
                            selected={field.value === v}
                            onClick={() => field.onChange(v)}
                          >
                            {v}
                          </ToggleBtn>
                        ))}
                      </div>
                    )}
                  />
                </Field>

                {/* Declaration */}
                <div className="bg-gray-950 rounded-2xl p-6">
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">
                    I confirm that the information provided is accurate and that
                    I understand this event is curated for mid-level
                    professionals and scaling business leaders.
                  </p>
                  <div className="flex items-start gap-3">
                    <Controller
                      name="declaration"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="declaration"
                          checked={field.value === true}
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                          className="mt-0.5 border-gray-600 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                        />
                      )}
                    />
                    <label
                      htmlFor="declaration"
                      className="text-sm text-white font-medium cursor-pointer leading-relaxed"
                    >
                      I confirm the above statement
                    </label>
                  </div>
                  {errors.declaration && (
                    <p className="text-red-400 text-xs mt-3">
                      ⚠ {errors.declaration.message}
                    </p>
                  )}
                </div>

                {serverError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm flex items-start gap-2">
                    <span className="shrink-0 mt-0.5">⚠</span>
                    {serverError}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation footer */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 sm:px-8 lg:px-12 py-4 sm:py-5">
            <div className="max-w-2xl mx-auto flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={back}
                  className="text-sm font-semibold text-gray-400 hover:text-gray-600 flex items-center gap-2 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>
              ) : (
                <Link
                  href="/"
                  className="text-sm font-semibold text-gray-400 hover:text-gray-600 flex items-center gap-2 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to site
                </Link>
              )}

              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-300 hidden sm:block">
                  {step} / {STEPS.length}
                </span>
                {step < 5 ? (
                  <Button
                    type="button"
                    onClick={next}
                    className="bg-teal-600 hover:bg-teal-500 text-white px-8 h-11 font-bold rounded-xl"
                  >
                    Continue
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-teal-600 hover:bg-teal-500 text-white px-8 h-11 font-bold rounded-xl"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
