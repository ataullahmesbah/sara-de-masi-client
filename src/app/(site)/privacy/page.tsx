import type { Metadata } from "next";
import { PageHead } from "@/components/site/page-head";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = { title: "Privacy", description: "How this website handles personal data.", alternates: { canonical: "/privacy" } };

export default async function PrivacyPage() {
  const s = await getSettings();
  return (
    <div className="page">
      <PageHead chip="Legal" title="Privacy" />
      <div className="max-w-[760px] space-y-5">
        <p>This website presents the academic work of {s.website_name} and collects as little personal data as possible.</p>
        <h2 className="block-title !mt-10">Contact form</h2>
        <p>
          If you send a message, the name, email address, optional affiliation, subject and message you type are stored so that a reply is possible. They are used only to answer your message and are not shared or used for marketing. To have a message deleted, write to{" "}
          <a className="font-bold text-heading underline" href={`mailto:${s.contact_email}`}>{s.contact_email}</a>.
        </p>
        <h2 className="block-title !mt-10">Cookies</h2>
        <p>There are no advertising or tracking cookies and no analytics. Your browser stores one small preference: your choice of light or dark appearance.</p>
        <h2 className="block-title !mt-10">Your rights</h2>
        <p>Under the GDPR you may ask for access to, correction of, or deletion of your data, and you may complain to the Italian data protection authority (Garante per la protezione dei dati personali).</p>
      </div>
    </div>
  );
}
