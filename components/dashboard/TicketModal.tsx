"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

type TicketData = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  organization: string;
  ticket_type: string | null;
  registration_type: string;
};

const TICKET_LABELS: Record<string, { label: string; color: string }> = {
  access:    { label: "Access",    color: "bg-gray-100 text-gray-700 border-gray-300" },
  executive: { label: "Executive", color: "bg-blue-50 text-blue-700 border-blue-300" },
  premier:   { label: "Premier",   color: "bg-purple-50 text-purple-700 border-purple-300" },
};

export default function TicketModal({ registrant }: { registrant: TicketData }) {
  const [open, setOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Short ID shown on the ticket (last 8 chars of UUID)
  const shortId = registrant.id.replace(/-/g, "").slice(-8).toUpperCase();

  const ticketStyle = TICKET_LABELS[registrant.ticket_type ?? ""] ?? {
    label: registrant.ticket_type ?? "Unknown",
    color: "bg-gray-100 text-gray-700 border-gray-300",
  };

  // The QR encodes a compact JSON payload scanned at entry
  const qrPayload = JSON.stringify({
    id:     shortId,
    name:   registrant.full_name,
    email:  registrant.email,
    phone:  registrant.phone,
    org:    registrant.organization,
    ticket: registrant.ticket_type,
    type:   registrant.registration_type,
  });

  const handlePrint = () => {
    if (!printRef.current) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Ticket — ${registrant.full_name}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: system-ui, sans-serif; background: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
          </style>
        </head>
        <body>${printRef.current.innerHTML}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 300);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 h-9 px-4 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
        Generate Ticket
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900">Event Ticket</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 h-8 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Ticket body */}
            <div className="p-6">
              <div ref={printRef}>
                <div style={{
                  fontFamily: "system-ui, sans-serif",
                  border: "2px solid #e5e7eb",
                  borderRadius: "16px",
                  overflow: "hidden",
                  maxWidth: "380px",
                  margin: "0 auto",
                }}>
                  {/* Ticket header band */}
                  <div style={{ background: "#0f172a", padding: "20px 24px" }}>
                    <p style={{ color: "#94a3b8", fontSize: "10px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>
                      The Convergence 2026
                    </p>
                    <p style={{ color: "#ffffff", fontSize: "18px", fontWeight: "900", margin: 0 }}>
                      {registrant.full_name}
                    </p>
                    <p style={{ color: "#64748b", fontSize: "12px", marginTop: "4px" }}>
                      {registrant.organization}
                    </p>
                  </div>

                  {/* Dashed separator */}
                  <div style={{ borderTop: "2px dashed #e5e7eb", margin: 0 }} />

                  {/* QR + info */}
                  <div style={{ padding: "20px 24px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0 }}>
                      <QRCodeSVG
                        value={qrPayload}
                        size={120}
                        level="H"
                        style={{ display: "block" }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ marginBottom: "12px" }}>
                        <p style={{ color: "#9ca3af", fontSize: "9px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2px" }}>ID Number</p>
                        <p style={{ color: "#111827", fontSize: "16px", fontWeight: "900", fontVariantNumeric: "tabular-nums", letterSpacing: "0.08em" }}>
                          {shortId}
                        </p>
                      </div>
                      <div style={{ marginBottom: "12px" }}>
                        <p style={{ color: "#9ca3af", fontSize: "9px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2px" }}>Ticket Tier</p>
                        <p style={{ color: "#111827", fontSize: "13px", fontWeight: "700" }}>
                          {ticketStyle.label}
                        </p>
                      </div>
                      <div style={{ marginBottom: "12px" }}>
                        <p style={{ color: "#9ca3af", fontSize: "9px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2px" }}>Date</p>
                        <p style={{ color: "#111827", fontSize: "12px", fontWeight: "600" }}>
                          Saturday, 18th April 2026
                        </p>
                      </div>
                      <div>
                        <p style={{ color: "#9ca3af", fontSize: "9px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2px" }}>Venue</p>
                        <p style={{ color: "#111827", fontSize: "12px", fontWeight: "600" }}>
                          Heritage House, Port Harcourt
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer band */}
                  <div style={{ background: "#f9fafb", borderTop: "1px solid #f3f4f6", padding: "10px 24px" }}>
                    <p style={{ color: "#9ca3af", fontSize: "10px", textAlign: "center" }}>
                      Faith · Business · Leadership · convergencephc.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
