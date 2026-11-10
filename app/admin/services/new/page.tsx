import { PageHeader, BtnLink } from "@/components/admin/ui";
import ServiceForm from "@/components/admin/ServiceForm";

export default function NewService() {
  return (
    <div className="space-y-6">
      <PageHeader title="New service" sub="Add a service line with full detail content" action={<BtnLink href="/admin/services">← Back to list</BtnLink>} />
      <ServiceForm />
    </div>
  );
}
