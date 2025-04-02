"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"

export function MenuList() {
  const [menus, setMenus] = useState([])
  const [merchants, setMerchants] = useState([])
  const [merchantFilter, setMerchantFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const menusRes = await fetch("/api/menus")
      const merchantsRes = await fetch("/api/merchants")

      const menusData = await menusRes.json()
      const merchantsData = await merchantsRes.json()

      setMenus(menusData)
      setMerchants(merchantsData)
      setLoading(false)
    }

    fetchData()
  }, [])

  const filteredMenus =
    merchantFilter === "all" ? menus : menus.filter((menu) => menu.merchant_id === Number.parseInt(merchantFilter))

  if (loading) {
    return <div className="text-center py-4">Loading...</div>
  }

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <Select value={merchantFilter} onValueChange={setMerchantFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by merchant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Merchants</SelectItem>
            {merchants.map((merchant) => (
              <SelectItem key={merchant.id} value={merchant.id.toString()}>
                {merchant.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredMenus.map((menu) => {
        const merchant = merchants.find((m) => m.id === menu.merchant_id)

        return (
          <Link key={menu.id} href={`/dashboard/menus/${menu.id}`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden">
                    <Image
                      src={menu.image.startsWith("http") ? menu.image : "/placeholder.svg?height=64&width=64"}
                      alt={menu.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{menu.name}</h3>
                    <p className="text-sm text-gray-500">{merchant?.name || "Unknown Merchant"}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                        {menu.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-orange-500 font-medium">Rp {menu.price.toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

