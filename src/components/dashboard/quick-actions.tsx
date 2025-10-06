import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Upload, Download, FileText } from "lucide-react"

const actions = [
  {
    title: "Novo Produto",
    description: "Cadastrar produto no estoque",
    icon: Plus,
    href: "/produtos/novo",
  },
  {
    title: "Importar Dados",
    description: "Importar via CSV/Excel",
    icon: Upload,
    href: "/importar",
  },
  {
    title: "Exportar Relatório",
    description: "Gerar relatório completo",
    icon: Download,
    href: "/relatorios/exportar",
  },
  {
    title: "Nova Movimentação",
    description: "Registrar entrada/saída",
    icon: FileText,
    href: "/movimentacoes/nova",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
        <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.title}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
                asChild
              >
                <a href={action.href}>
                  <div className="flex items-center gap-2 w-full">
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{action.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">{action.description}</p>
                </a>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
