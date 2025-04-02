import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentItems } from "@/components/recent-items"

export default function Dashboard() {
  return (
    <div className="container max-w-md mx-auto px-4 pb-20">
      <DashboardHeader />
      <DashboardStats />
      <RecentItems />
    </div>
  )
}

