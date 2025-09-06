import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ClientStats } from "@/components/clients/client-stats"
import { ClientTable } from "@/components/clients/client-table"
import { ClientAnalytics } from "@/components/clients/client-analytics"

export default function ClientesPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
              <p className="text-muted-foreground">Gerencie todos os clientes e suas informações</p>
            </div>

            {/* Client Statistics */}
            <ClientStats />

            {/* Client Analytics */}
            <ClientAnalytics />

            {/* Client Table */}
            <ClientTable />
          </div>
        </main>
      </div>
    </div>
  )
}
