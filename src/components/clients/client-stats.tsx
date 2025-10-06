import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, DollarSign, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total de Clientes",
    value: "156",
    change: "+8 este mês",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Clientes Ativos",
    value: "142",
    change: "91% do total",
    icon: UserCheck,
    color: "text-green-600",
  },
  {
    title: "Vendas do Mês",
    value: "R$ 520K",
    change: "+22% vs mês anterior",
    icon: DollarSign,
    color: "text-purple-600",
  },
  {
    title: "Ticket Médio",
    value: "R$ 3.2K",
    change: "+5% este mês",
    icon: TrendingUp,
    color: "text-yellow-600",
  },
]

export function ClientStats() {
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
