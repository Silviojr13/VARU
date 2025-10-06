import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MovementStats } from "@/components/movements/movement-stats"
import { MovementTable } from "@/components/movements/movement-table"
import { MovementChart } from "@/components/movements/movement-chart"

export default function MovimentacoesPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Movimentações</h1>
              <p className="text-muted-foreground">Controle todas as entradas e saídas de produtos</p>
            </div>

            {/* Movement Statistics */}
            <MovementStats />

            {/* Movement Chart */}
            <MovementChart />

            {/* Movement Table */}
            <MovementTable />
          </div>
        </main>
      </div>
    </div>
  )
}
