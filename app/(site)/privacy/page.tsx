import { baseMetadata } from "@/lib/seo";

export const metadata = baseMetadata({ title: "Privacy Policy", description: "Ventron Mechanical Systems Ltd privacy policy.", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <section className="bg-white"><div className="mx-auto max-w-3xl px-4 md:px-6 py-14 prose-eng">
      <h1 className="font-condensed text-4xl font-semibold uppercase text-navy-900">Privacy Policy</h1>
      <p>Ventron Mechanical Systems Ltd collects enquiry, quote and application data solely to respond to requests and deliver services. We do not sell personal data. Files you share (drawings, BOQs, CVs) are stored securely with access limited to authorised staff.</p>
      <h2>Data we collect</h2>
      <ul><li>Contact and company details from forms</li><li>Project descriptions and attachments</li><li>Job application materials</li></ul>
      <h2>Your rights</h2>
      <p>Request access, correction or deletion of your data at info@ventronltd.com.</p>
    </div></section>
  );
}
