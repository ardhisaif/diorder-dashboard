import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getRecentMenus, getRecentMerchants } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

export async function RecentItems() {
  const recentMerchants = await getRecentMerchants(3)
  const recentMenus = await getRecentMenus(3)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Recent Merchants
            <Link href="/dashboard/merchants" className="text-sm text-orange-500">
              View all
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMerchants.map((merchant) => (
              <Link
                key={merchant.id}
                href={`/dashboard/merchants/${merchant.id}`}
                className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-md"
              >
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={merchant.logo.startsWith("http") ? merchant.logo : "/placeholder.svg?height=40&width=40"}
                    alt={merchant.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{merchant.name}</p>
                  <p className="text-xs text-gray-500">{merchant.address.substring(0, 25)}...</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Recent Menus
            <Link href="/dashboard/menus" className="text-sm text-orange-500">
              View all
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMenus.map((menu) => (
              <Link
                key={menu.id}
                href={`/dashboard/menus/${menu.id}`}
                className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-md"
              >
                <div className="relative h-10 w-10 rounded-md overflow-hidden">
                  <Image
                    src={menu.image.startsWith("http") ? menu.image : "/placeholder.svg?height=40&width=40"}
                    alt={menu.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{menu.name}</p>
                  <p className="text-xs text-gray-500">{menu.category}</p>
                </div>
                <div className="text-orange-500 font-medium">Rp {menu.price.toLocaleString()}</div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

