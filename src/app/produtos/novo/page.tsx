import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ProductForm } from "@/components/products/product-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NovoProdutoPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="/produtos">
                  <ArrowLeft size={16} />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Novo Produto</h1>
                <p className="text-muted-foreground">Cadastre um novo produto no sistema</p>
              </div>
            </div>

            <ProductForm />
          </div>
        </main>
      </div>
    </div>
  )
}
