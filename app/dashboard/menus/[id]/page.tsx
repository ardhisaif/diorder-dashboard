import { MenuForm } from "@/components/menu-form"
import { PageHeader } from "@/components/page-header"
import { getMenuById } from "@/lib/data"

export default async function EditMenuPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new"
  const menu = isNew ? null : await getMenuById(Number.parseInt(params.id))

  return (
    <div className="container max-w-md mx-auto px-4 pb-20">
      <PageHeader title={isNew ? "Add Menu" : "Edit Menu"} backHref="/dashboard/menus" />
      <MenuForm menu={menu} />
    </div>
  )
}

