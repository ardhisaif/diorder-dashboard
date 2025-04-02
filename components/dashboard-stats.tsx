import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, Menu } from "lucide-react"
import { getMerchants, getMenus } from "@/lib/data"

export async function DashboardStats() {
  const merchants = await getMerchants()
  const menus = await getMenus()

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Store className="h-4 w-4 mr-2 text-orange-500" />
            Merchants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{merchants.length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Menu className="h-4 w-4 mr-2 text-orange-500" />
            Menus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{menus.length}</p>
        </CardContent>
      </Card>
    </div>
  )
}

