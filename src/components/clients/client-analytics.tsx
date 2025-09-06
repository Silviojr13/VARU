"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, ShoppingCart, DollarSign, Calendar } from "lucide-react"

const topClients = [
  {
    id: "1",
    name: "Empresa ABC Ltda",
    category: "Premium",
    totalOrders: 45,
    totalValue: 85000,
    lastOrder: "2024-01-15",
    frequency: 95,
    status: "excellent",
  },
  {
    id: "2",
    name: "Tech Solutions Ltda",
    category: "Regular",
    totalOrders: 28,
    totalValue: 45000,
    lastOrder: "2024-01-10",
    frequency: 78,
    status: "good",
  },
  {
    id: "3",
    name: "Maria Santos",
    category: "Regular",
    totalOrders: 15,
    totalValue: 15000,
    lastOrder: "2024-01-08",
    frequency: 65,
    status: "average",
  },
]

export function ClientAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Clientes</CardTitle>
        <CardDescription>Performance e comportamento dos principais clientes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topClients.map((client) => (
            <div key={client.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{client.name}</h3>
                  <Badge variant={client.category === "Premium" ? "default" : "outline"} className="mt-1">
                    {client.category}
                  </Badge>
                </div>
                <Badge
                  variant={
                    client.status === "excellent" ? "default" : client.status === "good" ? "secondary" : "outline"
                  }
                >
                  {client.status === "excellent" ? "Excelente" : client.status === "good" ? "Bom" : "Regular"}
                </Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShoppingCart size={14} />
                    Total de Pedidos
                  </div>
                  <div className="text-lg font-semibold">{client.totalOrders}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign size={14} />
                    Valor Total
                  </div>
                  <div className="text-lg font-semibold">R$ {client.totalValue.toLocaleString()}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    Último Pedido
                  </div>
                  <div className="text-lg font-semibold">{client.lastOrder}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star size={14} />
                    Frequência
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold">{client.frequency}%</div>
                    <Progress value={client.frequency} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
