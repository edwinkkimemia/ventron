import { PageHeader, BtnLink } from "@/components/admin/ui";
import JobForm from "@/components/admin/JobForm";

export default function NewJob() {
  return (
    <div className="space-y-6">
      <PageHeader title="New role" sub="Define the opening, then publish it" action={<BtnLink href="/admin/jobs">← Back to list</BtnLink>} />
      <JobForm />
    </div>
  );
}
