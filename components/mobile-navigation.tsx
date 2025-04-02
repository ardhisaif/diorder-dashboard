"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Store, Menu } from "lucide-react"

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white">
      <div className="container max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center p-2 ${
              pathname === "/dashboard" ? "text-orange-500" : "text-gray-500"
            }`}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link
            href="/dashboard/merchants"
            className={`flex flex-col items-center p-2 ${
              pathname.includes("/merchants") ? "text-orange-500" : "text-gray-500"
            }`}
          >
            <Store className="h-6 w-6" />
            <span className="text-xs mt-1">Merchants</span>
          </Link>
          <Link
            href="/dashboard/menus"
            className={`flex flex-col items-center p-2 ${
              pathname.includes("/menus") ? "text-orange-500" : "text-gray-500"
            }`}
          >
            <Menu className="h-6 w-6" />
            <span className="text-xs mt-1">Menus</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

