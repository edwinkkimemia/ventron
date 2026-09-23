import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";
import { baseMetadata } from "@/lib/seo";
import JobApplyForm from "./apply-form";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return baseMetadata({ title: "Role", description: "Ventron job listing.", path: `/careers/${params.slug}` });
}

export default async function JobDetail({ params }: { params: { slug: string } }) {
  let job: any = null;
  try { job = await prisma.job.findUnique({ where: { slug: params.slug } }); } catch {}
  if (!job) notFound();
  return (
    <>
      <section className="bg-navy-950"><div className="mx-auto max-w-4xl px-4 md:px-6 py-12">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers" }, { label: job.title }]} />
        <h1 className="font-condensed mt-4 text-3xl md:text-4xl font-semibold uppercase text-white">{job.title}</h1>
        <p className="text-steel-300 text-sm mt-2">{job.location} • {job.department} • {job.employmentType}</p>
      </div></section>
      <section className="bg-white"><div className="mx-auto max-w-4xl px-4 md:px-6 py-12 grid gap-8">
        <div className="prose-eng"><h2>Description</h2><p className="whitespace-pre-line">{job.description}</p><h2>Requirements</h2><p className="whitespace-pre-line">{job.requirements}</p></div>
        <div className="border border-steel-200 p-6"><h2 className="font-condensed uppercase font-semibold text-navy-900">Apply for this role</h2><JobApplyForm jobId={job.id} /></div>
      </div></section>
      <CTASection />
    </>
  );
}
