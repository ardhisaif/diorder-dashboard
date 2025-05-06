import { MerchantForm } from "@/components/merchant-form";
import { PageHeader } from "@/components/page-header";

export default function NewMerchantPage() {
  return (
    <div className="container max-w-md mx-auto px-4 pb-20">
      <PageHeader title="Add Merchant" backHref="/dashboard/merchants" />
      <MerchantForm merchant={null} returnUrl="/dashboard/merchants" />
    </div>
  );
}
