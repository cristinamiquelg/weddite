"use server";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const CONTACT_TO = "crismiquelg@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const messages = {
  es: {
    missing: "Rellenad nombre, email y mensaje.",
    invalidEmail: "Ese email no parece válido.",
    notConfigured:
      "No hemos podido enviar el mensaje ahora mismo. Escríbenos directamente a crismiquelg@gmail.com.",
    sendFailed: "No hemos podido enviar el mensaje ahora mismo. Inténtalo de nuevo en un momento.",
    success: "¡Gracias! Os responderemos en cuanto podamos.",
    subject: (name: string) => `Nuevo mensaje de contacto de ${name}`,
  },
  en: {
    missing: "Please fill in name, email and message.",
    invalidEmail: "That email doesn't look valid.",
    notConfigured:
      "We couldn't send the message right now. Write to us directly at crismiquelg@gmail.com.",
    sendFailed: "We couldn't send the message right now. Please try again in a moment.",
    success: "Thanks! We'll get back to you as soon as we can.",
    subject: (name: string) => `New contact message from ${name}`,
  },
} as const;

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const localeInput = String(formData.get("locale") ?? "es");
  const t = localeInput === "en" ? messages.en : messages.es;

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: t.missing };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: t.invalidEmail };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY no está configurada: no se pudo enviar el mensaje de contacto.",
    );
    return { status: "error", message: t.notConfigured };
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
        subject: t.subject(name),
        text: `${message}\n\n—\n${name} <${email}>`,
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text());
      return { status: "error", message: t.sendFailed };
    }
  } catch (err) {
    console.error("Contact form send failed:", err);
    return { status: "error", message: t.sendFailed };
  }

  return { status: "success", message: t.success };
}
