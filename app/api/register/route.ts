import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { registrationSchema } from "@/lib/validations";

function supabaseErrorMessage(error: { code?: string; message?: string }): string {
  // Unique constraint — duplicate email
  if (error.code === "23505") {
    return "An application with this email address already exists. If you believe this is a mistake, please contact us.";
  }
  // Not null violation — required column missing
  if (error.code === "23502") {
    return "A required field is missing. Please go back and make sure all required fields are filled in.";
  }
  // Check constraint violation — invalid enum value
  if (error.code === "23514") {
    return "One of your answers contains an invalid value. Please review your form and try again.";
  }
  // Row-level security
  if (error.code === "42501") {
    return "Submission was blocked by a security policy. Please contact support.";
  }
  // Generic fallback — include the raw message to help debugging
  return `Submission failed: ${error.message ?? "Unknown error"}. Please try again or contact support.`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstField = Object.keys(fieldErrors)[0];
      const firstMessage = firstField
        ? fieldErrors[firstField as keyof typeof fieldErrors]?.[0]
        : undefined;

      return NextResponse.json(
        {
          error: firstMessage
            ? `Validation error on "${firstField}": ${firstMessage}`
            : "Some fields are invalid. Please review your form and try again.",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check for duplicate email
    const { data: existing } = await supabaseAdmin
      .from("registrations")
      .select("id")
      .eq("email", data.email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "An application with this email address already exists. If you believe this is a mistake, please contact us." },
        { status: 409 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { declaration: _declaration, ...insertData } = data;

    const { error } = await supabaseAdmin.from("registrations").insert({
      ...insertData,
      status: "pending",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: supabaseErrorMessage(error) },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Register API error:", err);
    return NextResponse.json(
      { error: "A network or server error occurred. Please check your connection and try again." },
      { status: 500 }
    );
  }
}
