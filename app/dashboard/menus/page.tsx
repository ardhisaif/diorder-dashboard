import { MenuList } from "@/components/menu-list"
import { PageHeader } from "@/components/page-header"

export default function MenusPage() {
  return (
    <div className="container max-w-md mx-auto px-4 pb-20">
      <PageHeader title="Menus" buttonText="Add Menu" buttonHref="/dashboard/menus/new" />
      <MenuList />
    </div>
  )
}

