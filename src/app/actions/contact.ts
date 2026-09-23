"use server";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const CONTACT_TO = "crismiquelg@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Rellenad nombre, email y mensaje." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Ese email no parece válido." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY no está configurada: no se pudo enviar el mensaje de contacto.",
    );
    return {
      status: "error",
      message:
        "No hemos podido enviar el mensaje ahora mismo. Escríbenos directamente a crismiquelg@gmail.com.",
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Weddite <onboarding@resend.dev>",
        to: [CONTACT_TO],
        reply_to: email,
        subject: `Nuevo mensaje de contacto de ${name}`,
        text: `${message}\n\n—\n${name} <${email}>`,
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text());
      return {
        status: "error",
        message: "No hemos podido enviar el mensaje ahora mismo. Inténtalo de nuevo en un momento.",
      };
    }
  } catch (err) {
    console.error("Contact form send failed:", err);
    return {
      status: "error",
      message: "No hemos podido enviar el mensaje ahora mismo. Inténtalo de nuevo en un momento.",
    };
  }

  return { status: "success", message: "¡Gracias! Os responderemos en cuanto podamos." };
}
