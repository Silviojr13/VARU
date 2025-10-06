import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ReportStats } from "@/components/reports/report-stats"
import { ReportCards } from "@/components/reports/report-cards"
import { ReportGenerator } from "@/components/reports/report-generator"
import { RecentReports } from "@/components/reports/recent-reports"
import { ReportTemplates } from "@/components/reports/report-templates"

export default function RelatoriosPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
              <p className="text-muted-foreground">Gere e gerencie relatórios do sistema de estoque</p>
            </div>

            {/* Report Statistics */}
            <ReportStats />

            {/* Report Generator */}
            <ReportGenerator />

            {/* Report Cards */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Relatórios Disponíveis</h2>
              <ReportCards />
            </div>

            {/* Report Templates */}
            <ReportTemplates />

            {/* Recent Reports */}
            <RecentReports />
          </div>
        </main>
      </div>
    </div>
  )
}
