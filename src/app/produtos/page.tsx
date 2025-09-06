import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ProductStats } from "@/components/products/product-stats"
import { ProductTable } from "@/components/products/product-table"

export default function ProdutosPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
              <p className="text-muted-foreground">Gerencie todos os produtos do seu estoque</p>
            </div>

            {/* Product Statistics */}
            <ProductStats />

            {/* Product Table */}
            <ProductTable />
          </div>
        </main>
      </div>
    </div>
  )
}
