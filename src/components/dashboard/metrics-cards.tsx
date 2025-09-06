import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react"

const metrics = [
  {
    title: "Total de Produtos",
    value: "1,247",
    change: "+12%",
    changeType: "positive" as const,
    icon: Package,
  },
  {
    title: "Produtos em Baixo Estoque",
    value: "23",
    change: "+5",
    changeType: "negative" as const,
    icon: AlertTriangle,
  },
  {
    title: "Entradas do Mês",
    value: "342",
    change: "+18%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Saídas do Mês",
    value: "289",
    change: "-8%",
    changeType: "positive" as const,
    icon: TrendingDown,
  },
]

export function MetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                {metric.change} em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
