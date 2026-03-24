import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Resend } from "resend";
import QRCode from "qrcode";

const TICKET_LABELS: Record<string, string> = {
  access:    "Access",
  executive: "Executive",
  premier:   "Premier",
};

const TICKET_PRICES: Record<string, string> = {
  access:    "₦100,000",
  executive: "₦300,000",
  premier:   "₦500,000",
};

export async function POST(req: NextRequest) {
  // Auth guard — only logged-in admins
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { registrantId } = await req.json();
  if (!registrantId) {
    return NextResponse.json({ error: "Missing registrantId" }, { status: 400 });
  }

  // Fetch registrant data
  const { data, error } = await supabaseAdmin
    .from("registrations")
    .select("id, full_name, email, phone, organization, ticket_type, registration_type")
    .eq("id", registrantId)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "Registrant not found" }, { status: 404 });
  }

  const shortId = data.id.replace(/-/g, "").slice(-8).toUpperCase();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://theconvergencephc.com";
  const qrPayload = `${siteUrl}/ticket/${data.id}`;

  // Generate QR code as a base64 PNG data URL
  const qrDataUrl = await QRCode.toDataURL(qrPayload, {
    width: 300,
    margin: 2,
    errorCorrectionLevel: "H",
    color: { dark: "#0f172a", light: "#ffffff" },
  });

  // Strip the data:image/png;base64, prefix to get raw base64
  const qrBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, "");

  const ticketLabel = TICKET_LABELS[data.ticket_type ?? ""] ?? data.ticket_type ?? "—";
  const ticketPrice = TICKET_PRICES[data.ticket_type ?? ""] ?? "";

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Header band -->
        <tr>
          <td style="background:#0f172a;border-radius:16px 16px 0 0;padding:28px 32px;">
            <p style="margin:0 0 4px;color:#94a3b8;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">
              The Convergence 2026
            </p>
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:900;">
              Your Event Ticket
            </h1>
          </td>
        </tr>

        <!-- Dashed divider -->
        <tr>
          <td style="background:#ffffff;padding:0 32px;">
            <div style="border-top:2px dashed #e5e7eb;"></div>
          </td>
        </tr>

        <!-- QR + details -->
        <tr>
          <td style="background:#ffffff;padding:28px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <!-- QR code -->
                <td width="150" valign="top" style="padding-right:24px;">
                  <img src="cid:qrcode" alt="Your QR Code" width="150" height="150"
                    style="display:block;border-radius:8px;border:1px solid #e5e7eb;" />
                </td>
                <!-- Info -->
                <td valign="top">
                  <p style="margin:0 0 4px;color:#9ca3af;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Registrant</p>
                  <p style="margin:0 0 16px;color:#111827;font-size:16px;font-weight:900;">${data.full_name}</p>

                  <p style="margin:0 0 4px;color:#9ca3af;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Organisation</p>
                  <p style="margin:0 0 16px;color:#374151;font-size:13px;font-weight:600;">${data.organization}</p>

                  <p style="margin:0 0 4px;color:#9ca3af;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">ID Number</p>
                  <p style="margin:0 0 16px;color:#111827;font-size:18px;font-weight:900;letter-spacing:0.08em;font-variant-numeric:tabular-nums;">${shortId}</p>

                  <p style="margin:0 0 4px;color:#9ca3af;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Ticket Tier</p>
                  <p style="margin:0 0 4px;color:#111827;font-size:14px;font-weight:700;">${ticketLabel}${ticketPrice ? ` — ${ticketPrice}` : ""}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Event details band -->
        <tr>
          <td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:16px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0 0 2px;color:#9ca3af;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Date</p>
                  <p style="margin:0;color:#374151;font-size:13px;font-weight:600;">Saturday, 18th April 2026</p>
                </td>
                <td>
                  <p style="margin:0 0 2px;color:#9ca3af;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Venue</p>
                  <p style="margin:0;color:#374151;font-size:13px;font-weight:600;">Heritage House, Port Harcourt</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Instructions -->
        <tr>
          <td style="background:#ffffff;padding:24px 32px;border-top:1px solid #f3f4f6;">
            <p style="margin:0 0 8px;color:#374151;font-size:13px;line-height:1.6;">
              Please present this QR code or your <strong>ID Number (${shortId})</strong> at the venue entrance for check-in.
              Kindly save this email for easy access on the day of the event.
            </p>
            <p style="margin:0;color:#6b7280;font-size:12px;">
              Questions? Contact us at
              <a href="mailto:Info@theconvergencephc.com" style="color:#0d9488;text-decoration:none;">Info@theconvergencephc.com</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0f172a;border-radius:0 0 16px 16px;padding:16px 32px;text-align:center;">
            <p style="margin:0;color:#475569;font-size:11px;">
              Faith · Business · Leadership &nbsp;|&nbsp; The Convergence 2026
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error: sendError } = await resend.emails.send({
    from:    "The Convergence <Info@theconvergencephc.com>",
    to:      data.email,
    subject: `Your Ticket — The Convergence 2026 (ID: ${shortId})`,
    html:    emailHtml,
    attachments: [
      {
        filename:    "ticket-qr.png",
        content:     qrBase64,
        contentType: "image/png",
        content_id:  "qrcode",
      },
    ],
  });

  if (sendError) {
    console.error("Resend error:", sendError);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
