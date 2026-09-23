import { baseMetadata } from "@/lib/seo";

export const metadata = baseMetadata({ title: "Terms", description: "Ventron Mechanical Systems Ltd website terms.", path: "/terms" });

export default function TermsPage() {
  return (
    <section className="bg-white"><div className="mx-auto max-w-3xl px-4 md:px-6 py-14 prose-eng">
      <h1 className="font-condensed text-4xl font-semibold uppercase text-navy-900">Terms of Use</h1>
      <p>Content on this site describes general engineering capabilities and representative project scopes with confidential clients. Project-specific advice requires a formal scope, site data and agreement.</p>
      <h2>Enquiries</h2><p>Quote responses are based on information you provide and are subject to verification, site conditions and final design.</p>
    </div></section>
  );
}
