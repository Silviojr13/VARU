import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Package } from "lucide-react"

const lowStockItems = [
  {
    id: 1,
    name: "Produto ABC123",
    currentStock: 5,
    minStock: 20,
    category: "Eletrônicos",
    supplier: "Fornecedor A",
  },
  {
    id: 2,
    name: "Produto XYZ789",
    currentStock: 2,
    minStock: 15,
    category: "Informática",
    supplier: "Fornecedor B",
  },
  {
    id: 3,
    name: "Produto DEF456",
    currentStock: 8,
    minStock: 25,
    category: "Escritório",
    supplier: "Fornecedor C",
  },
]

export function LowStockAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          Alertas de Baixo Estoque
        </CardTitle>
        <CardDescription>Produtos que precisam de reposição</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                  <Package className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Estoque: {item.currentStock} / Mínimo: {item.minStock}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{item.category}</Badge>
                <Button size="sm" variant="outline">
                  Repor
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
