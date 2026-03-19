import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { registrationSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check for duplicate email
    const { data: existing } = await supabaseAdmin
      .from("registrations")
      .select("id")
      .eq("email", data.email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "An application with this email address already exists." },
        { status: 409 }
      );
    }

    const { error } = await supabaseAdmin.from("registrations").insert({
      ...data,
      declaration: undefined, // don't store the checkbox value
      status: "pending",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to submit application. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Register API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
