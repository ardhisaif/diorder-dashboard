import { MerchantForm } from "@/components/merchant-form"
import { PageHeader } from "@/components/page-header"
import { getMerchantById } from "@/lib/data"

export default async function EditMerchantPage({ params }: { params: { id: string } }) {
  const merchant = await getMerchantById(Number.parseInt(params.id))

  return (
    <div className="container max-w-md mx-auto px-4 pb-20">
      <PageHeader title="Edit Merchant" backHref={`/dashboard/merchants/${params.id}`} />
      <MerchantForm merchant={merchant} returnUrl={`/dashboard/merchants/${params.id}`} />
    </div>
  )
}
