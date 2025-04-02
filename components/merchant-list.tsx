import { Card, CardContent } from "@/components/ui/card"
import { getMerchants } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"

export async function MerchantList() {
  const merchants = await getMerchants()

  return (
    <div className="space-y-4">
      {merchants.map((merchant) => (
        <Link key={merchant.id} href={`/dashboard/merchants/${merchant.id}`}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative h-16 w-16 rounded-md overflow-hidden">
                  <Image
                    src={merchant.logo.startsWith("http") ? merchant.logo : "/placeholder.svg?height=64&width=64"}
                    alt={merchant.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{merchant.name}</h3>
                  <p className="text-sm text-gray-500">{merchant.address}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>
                      {merchant.openingHours.open} - {merchant.openingHours.close}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

