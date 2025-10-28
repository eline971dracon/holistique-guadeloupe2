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
  questionnaireData?: string;
  type: "contact" | "journey" | "questionnaire";
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
    const { name, email, phone, discipline, message, journeyDetails, questionnaireData, type } = body;

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
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
    } else if (type === "questionnaire") {
      emailSubject = "Nouveau questionnaire massage";
      emailBody = `
Nouveau questionnaire massage reçu:

Nom: ${name}
Email: ${email}
Téléphone: ${phone || "Non spécifié"}

${questionnaireData || ""}
      `;
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Terra Nova <contact@holistique-guadeloupe.com>",
        to: ["contact@holistique-guadeloupe.com"],
        bcc: ["terranova.gwada@gmail.com"],
        subject: emailSubject,
        text: emailBody,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Resend error:", errorText);
      throw new Error(`Resend API error: ${resendResponse.status}`);
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