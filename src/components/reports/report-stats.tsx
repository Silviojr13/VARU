import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, TrendingUp, Clock, Download } from "lucide-react"

const stats = [
  {
    title: "Relatórios Gerados",
    value: "248",
    change: "+12 este mês",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Mais Solicitado",
    value: "Estoque",
    change: "45% dos relatórios",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Tempo Médio",
    value: "2.3s",
    change: "Geração de relatórios",
    icon: Clock,
    color: "text-purple-600",
  },
  {
    title: "Downloads",
    value: "1.2K",
    change: "Total de downloads",
    icon: Download,
    color: "text-yellow-600",
  },
]

export function ReportStats() {
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
