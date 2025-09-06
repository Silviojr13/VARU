"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, Clock, Package, DollarSign } from "lucide-react"

const topSuppliers = [
  {
    id: "1",
    name: "Dell Inc.",
    category: "Tecnologia",
    rating: 4.9,
    onTimeDelivery: 98,
    totalOrders: 45,
    totalValue: 250000,
    status: "excellent",
  },
  {
    id: "2",
    name: "Logitech Brasil",
    category: "Periféricos",
    rating: 4.5,
    onTimeDelivery: 92,
    totalOrders: 28,
    totalValue: 85000,
    status: "good",
  },
  {
    id: "3",
    name: "Papel & Cia Ltda",
    category: "Escritório",
    rating: 4.2,
    onTimeDelivery: 85,
    totalOrders: 67,
    totalValue: 45000,
    status: "average",
  },
]

export function SupplierPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance dos Fornecedores</CardTitle>
        <CardDescription>Avaliação e desempenho dos principais fornecedores</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topSuppliers.map((supplier) => (
            <div key={supplier.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{supplier.name}</h3>
                  <Badge variant="outline" className="mt-1">
                    {supplier.category}
                  </Badge>
                </div>
                <Badge
                  variant={
                    supplier.status === "excellent" ? "default" : supplier.status === "good" ? "secondary" : "outline"
                  }
                >
                  {supplier.status === "excellent" ? "Excelente" : supplier.status === "good" ? "Bom" : "Regular"}
                </Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star size={14} />
                    Avaliação
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-semibold">{supplier.rating}</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < Math.floor(supplier.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={14} />
                    Entrega no Prazo
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold">{supplier.onTimeDelivery}%</div>
                    <Progress value={supplier.onTimeDelivery} className="h-2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package size={14} />
                    Total de Pedidos
                  </div>
                  <div className="text-lg font-semibold">{supplier.totalOrders}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign size={14} />
                    Valor Total
                  </div>
                  <div className="text-lg font-semibold">R$ {supplier.totalValue.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
