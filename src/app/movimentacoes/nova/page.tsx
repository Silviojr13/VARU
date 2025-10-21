import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MovementForm } from "@/components/movements/movement-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NovaMovimentacaoPage() {
  const handleSubmit = (data: any) => {
    console.log('Submit movement:', data)
    // In a real app, you would send this data to your API
  }

  const handleCancel = () => {
    console.log('Cancel movement creation')
    // In a real app, you would redirect back to the movements list
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="/movimentacoes">
                  <ArrowLeft size={16} />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Nova Movimentação</h1>
                <p className="text-muted-foreground">Registre uma nova movimentação de estoque</p>
              </div>
            </div>

            <MovementForm onSubmit={handleSubmit} onCancel={handleCancel} />
          </div>
        </main>
      </div>
    </div>
  )
}