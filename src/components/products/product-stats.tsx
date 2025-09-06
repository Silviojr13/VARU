import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle, TrendingUp, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total de Produtos",
    value: "1,247",
    change: "+12 novos",
    icon: Package,
    color: "text-blue-600",
  },
  {
    title: "Baixo Estoque",
    value: "23",
    change: "Requer atenção",
    icon: AlertTriangle,
    color: "text-yellow-600",
  },
  {
    title: "Valor Total",
    value: "R$ 2.4M",
    change: "+8.2% este mês",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Mais Vendido",
    value: "Mouse MX",
    change: "150 unidades",
    icon: TrendingUp,
    color: "text-purple-600",
  },
]

export function ProductStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
