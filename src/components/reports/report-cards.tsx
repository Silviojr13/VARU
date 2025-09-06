import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar } from "lucide-react"

const reportTypes = [
  {
    id: "inventory",
    title: "Relatório de Estoque",
    description: "Posição atual do estoque, produtos em baixa e movimentações",
    category: "Estoque",
    lastGenerated: "2024-01-15",
    frequency: "Diário",
    status: "available",
  },
  {
    id: "financial",
    title: "Relatório Financeiro",
    description: "Movimentação financeira, custos e valores de estoque",
    category: "Financeiro",
    lastGenerated: "2024-01-14",
    frequency: "Semanal",
    status: "available",
  },
  {
    id: "suppliers",
    title: "Relatório de Fornecedores",
    description: "Performance, compras e avaliação de fornecedores",
    category: "Fornecedores",
    lastGenerated: "2024-01-10",
    frequency: "Mensal",
    status: "available",
  },
  {
    id: "clients",
    title: "Relatório de Clientes",
    description: "Análise de vendas, comportamento e performance de clientes",
    category: "Clientes",
    lastGenerated: "2024-01-12",
    frequency: "Semanal",
    status: "available",
  },
  {
    id: "movements",
    title: "Relatório de Movimentações",
    description: "Histórico completo de entradas e saídas de produtos",
    category: "Movimentações",
    lastGenerated: "2024-01-15",
    frequency: "Diário",
    status: "generating",
  },
  {
    id: "abc-analysis",
    title: "Análise ABC",
    description: "Classificação de produtos por importância e valor",
    category: "Análise",
    lastGenerated: "2024-01-08",
    frequency: "Mensal",
    status: "available",
  },
]

export function ReportCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reportTypes.map((report) => (
        <Card key={report.id} className="relative">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-primary" />
                <Badge variant="outline">{report.category}</Badge>
              </div>
              <Badge variant={report.status === "available" ? "default" : "secondary"}>
                {report.status === "available" ? "Disponível" : "Gerando..."}
              </Badge>
            </div>
            <CardTitle className="text-lg">{report.title}</CardTitle>
            <CardDescription>{report.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Última geração:</span>
                <span>{report.lastGenerated}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Frequência:</span>
                <span>{report.frequency}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 gap-2">
                  <Calendar size={14} />
                  Gerar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 bg-transparent"
                  disabled={report.status !== "available"}
                >
                  <Download size={14} />
                  Baixar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
