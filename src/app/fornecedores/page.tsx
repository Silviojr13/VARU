import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { SupplierStats } from "@/components/suppliers/supplier-stats"
import { SupplierTable } from "@/components/suppliers/supplier-table"
import { SupplierPerformance } from "@/components/suppliers/supplier-performance"

export default function FornecedoresPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Fornecedores</h1>
              <p className="text-muted-foreground">Gerencie todos os fornecedores e suas informações</p>
            </div>

            {/* Supplier Statistics */}
            <SupplierStats />

            {/* Supplier Performance */}
            <SupplierPerformance />

            {/* Supplier Table */}
            <SupplierTable />
          </div>
        </main>
      </div>
    </div>
  )
}
