import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Users, DollarSign, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total de Fornecedores",
    value: "48",
    change: "+3 este mês",
    icon: Truck,
    color: "text-blue-600",
  },
  {
    title: "Fornecedores Ativos",
    value: "42",
    change: "87.5% do total",
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Compras do Mês",
    value: "R$ 380K",
    change: "+15% vs mês anterior",
    icon: DollarSign,
    color: "text-purple-600",
  },
  {
    title: "Melhor Avaliação",
    value: "4.9/5",
    change: "Dell Inc.",
    icon: TrendingUp,
    color: "text-yellow-600",
  },
]

export function SupplierStats() {
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
