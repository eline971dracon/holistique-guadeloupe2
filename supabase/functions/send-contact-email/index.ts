import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailRequest {
  name: string;
  email: string;
  phone?: string;
  discipline?: string;
  message?: string;
  journeyDetails?: string;
  type: "contact" | "journey";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const body: EmailRequest = await req.json();
    const { name, email, phone, discipline, message, journeyDetails, type } = body;

    const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
    
    if (!SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY is not configured");
    }

    let emailSubject = "";
    let emailBody = "";

    if (type === "contact") {
      emailSubject = "Nouvelle demande de clé Terra Nova";
      emailBody = `
Nouvelle demande reçue:

Nom: ${name}
Email: ${email}
Discipline/Pratique: ${discipline || "Non spécifié"}
Message: ${message || "Aucun message"}
      `;
    } else if (type === "journey") {
      emailSubject = "Nouvelle demande de Voyage Intérieur";
      emailBody = `
Nouvelle demande de voyage intérieur:

Nom: ${name}
Email: ${email}
Téléphone: ${phone || "Non spécifié"}
Message: ${message || "Aucun message"}

${journeyDetails || ""}
      `;
    }

    const sendGridResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "terranova.gwada@gmail.com" }],
            subject: emailSubject,
          },
        ],
        from: { email: "noreply@terranova.com", name: "Terra Nova" },
        content: [
          {
            type: "text/plain",
            value: emailBody,
          },
        ],
      }),
    });

    if (!sendGridResponse.ok) {
      const errorText = await sendGridResponse.text();
      console.error("SendGrid error:", errorText);
      throw new Error(`SendGrid API error: ${sendGridResponse.status}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Email envoyé avec succès" }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
