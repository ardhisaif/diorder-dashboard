import { MerchantForm } from "@/components/merchant-form"
import { PageHeader } from "@/components/page-header"
import { getMerchantById } from "@/lib/data"

export default async function EditMerchantPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new"
  const merchant = isNew ? null : await getMerchantById(Number.parseInt(params.id))

  return (
    <div className="container max-w-md mx-auto px-4 pb-20">
      <PageHeader title={isNew ? "Add Merchant" : "Edit Merchant"} backHref="/dashboard/merchants" />
      <MerchantForm merchant={merchant} />
    </div>
  )
}

