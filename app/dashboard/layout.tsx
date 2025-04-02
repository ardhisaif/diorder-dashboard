import type React from "react"
import { MobileNavigation } from "@/components/mobile-navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex-1">{children}</div>
      <MobileNavigation />
    </div>
  )
}

