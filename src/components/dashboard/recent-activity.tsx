import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Package, Truck } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "entrada",
    description: "Entrada de 50 unidades - Produto ABC123",
    time: "2 horas atrás",
    user: "João Silva",
    icon: ArrowUpRight,
  },
  {
    id: 2,
    type: "saida",
    description: "Saída de 25 unidades - Produto XYZ789",
    time: "4 horas atrás",
    user: "Maria Santos",
    icon: ArrowDownRight,
  },
  {
    id: 3,
    type: "produto",
    description: "Novo produto cadastrado - DEF456",
    time: "6 horas atrás",
    user: "Pedro Costa",
    icon: Package,
  },
  {
    id: 4,
    type: "fornecedor",
    description: "Fornecedor ABC Ltda atualizado",
    time: "1 dia atrás",
    user: "Ana Lima",
    icon: Truck,
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
        <CardDescription>Últimas movimentações no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    <Badge variant="outline" className="text-xs">
                      {activity.user}
                    </Badge>
                  </div>
                </div>
                <Badge
                  variant={
                    activity.type === "entrada" ? "default" : activity.type === "saida" ? "secondary" : "outline"
                  }
                  className="text-xs"
                >
                  {activity.type}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
