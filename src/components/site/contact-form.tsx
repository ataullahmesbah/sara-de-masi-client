"use client";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { sendMessage } from "@/actions/contact";
import { subjectOptions, type ContactState } from "@/lib/validation/contact";
import { cn } from "@/lib/utils";
import { useFormSubmit } from "@/lib/utils/use-form-submit";

const initial: ContactState = { status: "idle" };

function Field({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ defaultService = "", defaultMessage = "" }: { defaultService?: string; defaultMessage?: string }) {
  const [state, action, pending] = useActionState(sendMessage, initial);
  const [startedAt, setStartedAt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit = useFormSubmit(action);

  useEffect(() => setStartedAt(Date.now()), []);
  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  const err = (k: keyof NonNullable<ContactState["errors"]>) => state.errors?.[k];
  const a11y = (k: keyof NonNullable<ContactState["errors"]>, id: string) => ({
    "aria-invalid": Boolean(err(k)) || undefined,
    "aria-describedby": err(k) ? `${id}-error` : undefined,
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} className="relative grid gap-5 sm:grid-cols-2" noValidate>
      <input type="hidden" name="started_at" value={startedAt} />
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field id="c-name" label="Your name" error={err("name")}>
        <input id="c-name" name="name" className="field" placeholder="Name" autoComplete="name" required {...a11y("name", "c-name")} />
      </Field>
      <Field id="c-email" label="Email" error={err("email")}>
        <input id="c-email" name="email" type="email" className="field" placeholder="Email" autoComplete="email" required {...a11y("email", "c-email")} />
      </Field>
      <Field id="c-aff" label="Affiliation (optional)" error={err("affiliation")}>
        <input id="c-aff" name="affiliation" className="field" placeholder="Affiliation / organisation (optional)" autoComplete="organization" {...a11y("affiliation", "c-aff")} />
      </Field>
      <Field id="c-service" label="Subject" error={err("service")}>
        <select id="c-service" name="service" className="field" defaultValue={subjectOptions.includes(defaultService as never) ? defaultService : ""}>
          <option value="">Subject</option>
          {subjectOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </Field>
      <Field id="c-message" label="Your message" error={err("message")} className="sm:col-span-2">
        <textarea id="c-message" name="message" rows={6} className="field resize-y" placeholder="Message" required defaultValue={defaultMessage} {...a11y("message", "c-message")} />
      </Field>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-[15px]">
          <input type="checkbox" name="consent" className="mt-1.5 h-4 w-4 accent-[var(--accent)]" required aria-invalid={Boolean(err("consent")) || undefined} />
          <span>
            I agree that my details are used to reply to this message, as described in the{" "}
            <Link href="/privacy" className="link-u text-heading">privacy notice</Link>.
          </span>
        </label>
        {err("consent") && <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">{err("consent")}</p>}
      </div>

      <div className="sm:col-span-2">
        {state.message && (
          <p
            role="status"
            className={cn(
              "mb-5 flex items-start gap-2 px-4 py-3 text-sm",
              state.status === "success" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-red-500/10 text-red-600 dark:text-red-400"
            )}
          >
            {state.status === "success" ? <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> : <AlertCircle size={18} className="mt-0.5 shrink-0" />}
            {state.message}
          </p>
        )}
        <button type="submit" disabled={pending} className="btn btn-solid disabled:cursor-wait disabled:opacity-70">
          {pending ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Send message <Send size={17} aria-hidden />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
