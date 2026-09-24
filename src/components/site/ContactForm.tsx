"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContactMessage, type ContactFormState } from "@/app/actions/contact";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";

const initialState: ContactFormState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { locale } = useSiteLocale();
  const dict = getSiteDict(locale).contact;

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-10 space-y-5">
      <input type="hidden" name="locale" value={locale} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-xs uppercase tracking-[0.2em] text-ink-soft">
            {dict.name}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
            placeholder={dict.namePlaceholder}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-xs uppercase tracking-[0.2em] text-ink-soft">
            {dict.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
            placeholder={dict.emailPlaceholder}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="text-xs uppercase tracking-[0.2em] text-ink-soft">
          {dict.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          className="mt-2 w-full resize-none rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
          placeholder={dict.messagePlaceholder}
        />
      </div>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? dict.submitting : dict.submit}
        </button>
        {state.status === "success" && (
          <p className="text-sm text-sage" role="status">
            {state.message}
          </p>
        )}
        {state.status === "error" && (
          <p className="text-sm text-clay" role="alert">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
