import { MerchantList } from "@/components/merchant-list"
import { PageHeader } from "@/components/page-header"

export default function MerchantsPage() {
  return (
    <div className="container max-w-md mx-auto px-4 pb-20">
      <PageHeader title="Merchants" buttonText="Add Merchant" buttonHref="/dashboard/merchants/new" />
      <MerchantList />
    </div>
  )
}

