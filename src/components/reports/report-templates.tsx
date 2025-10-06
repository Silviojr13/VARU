import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Star, Clock } from "lucide-react"

const templates = [
  {
    id: "1",
    name: "Estoque Completo",
    description: "Relatório completo com todos os produtos, quantidades e valores",
    category: "Estoque",
    popularity: 95,
    estimatedTime: "30s",
    isFavorite: true,
  },
  {
    id: "2",
    name: "Produtos em Baixa",
    description: "Lista de produtos abaixo do estoque mínimo",
    category: "Estoque",
    popularity: 88,
    estimatedTime: "15s",
    isFavorite: false,
  },
  {
    id: "3",
    name: "Movimentação Financeira",
    description: "Análise financeira das movimentações de estoque",
    category: "Financeiro",
    popularity: 76,
    estimatedTime: "45s",
    isFavorite: true,
  },
  {
    id: "4",
    name: "Top 10 Clientes",
    description: "Ranking dos 10 melhores clientes por volume de compras",
    category: "Clientes",
    popularity: 82,
    estimatedTime: "20s",
    isFavorite: false,
  },
  {
    id: "5",
    name: "Performance Fornecedores",
    description: "Avaliação de performance e pontualidade dos fornecedores",
    category: "Fornecedores",
    popularity: 71,
    estimatedTime: "35s",
    isFavorite: false,
  },
  {
    id: "6",
    name: "Análise ABC Produtos",
    description: "Classificação ABC dos produtos por importância e valor",
    category: "Análise",
    popularity: 65,
    estimatedTime: "60s",
    isFavorite: true,
  },
]

export function ReportTemplates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Templates de Relatórios</CardTitle>
        <CardDescription>Modelos pré-configurados para geração rápida</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div key={template.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-primary" />
                  <Badge variant="outline">{template.category}</Badge>
                </div>
                {template.isFavorite && <Star size={16} className="text-yellow-500 fill-yellow-500" />}
              </div>

              <div>
                <h3 className="font-semibold text-foreground">{template.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  {template.estimatedTime}
                </div>
                <div>{template.popularity}% popularidade</div>
              </div>

              <Button size="sm" className="w-full">
                Usar Template
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
