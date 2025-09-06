import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Entradas do Mês",
    value: "342",
    change: "+18% vs mês anterior",
    icon: ArrowUpRight,
    color: "text-green-600",
  },
  {
    title: "Saídas do Mês",
    value: "289",
    change: "-8% vs mês anterior",
    icon: ArrowDownRight,
    color: "text-red-600",
  },
  {
    title: "Valor Movimentado",
    value: "R$ 1.2M",
    change: "+12% este mês",
    icon: DollarSign,
    color: "text-blue-600",
  },
  {
    title: "Saldo Líquido",
    value: "+53",
    change: "Produtos em estoque",
    icon: TrendingUp,
    color: "text-purple-600",
  },
]

export function MovementStats() {
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
