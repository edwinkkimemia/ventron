import { PageHeader, BtnLink } from "@/components/admin/ui";
import IndustryForm from "@/components/admin/IndustryForm";

export default function NewIndustry() {
  return (
    <div className="space-y-6">
      <PageHeader title="New industry" sub="Describe challenges, systems and capabilities" action={<BtnLink href="/admin/industries">← Back to list</BtnLink>} />
      <IndustryForm />
    </div>
  );
}
