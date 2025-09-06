import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MetricsCards } from "@/components/dashboard/metrics-cards"
import { InventoryChart } from "@/components/dashboard/inventory-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { LowStockAlerts } from "@/components/dashboard/low-stock-alerts"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function HomePage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Visão geral do seu sistema de estoque</p>
            </div>

            {/* Metrics Cards */}
            <MetricsCards />

            {/* Charts and Activity */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <InventoryChart />
              </div>
            </div>

            {/* Recent Activity and Alerts */}
            <div className="grid gap-6 md:grid-cols-2">
              <RecentActivity />
              <LowStockAlerts />
            </div>

            {/* Quick Actions */}
            <QuickActions />
          </div>
        </main>
      </div>
    </div>
  )
}
