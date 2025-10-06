"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", entradas: 186, saidas: 80 },
  { month: "Fev", entradas: 305, saidas: 200 },
  { month: "Mar", entradas: 237, saidas: 120 },
  { month: "Abr", entradas: 273, saidas: 190 },
  { month: "Mai", entradas: 209, saidas: 130 },
  { month: "Jun", entradas: 214, saidas: 140 },
]

const chartConfig = {
  entradas: {
    label: "Entradas",
    color: "hsl(var(--chart-1))",
  },
  saidas: {
    label: "Saídas",
    color: "hsl(var(--chart-2))",
  },
}

export function InventoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Movimentação de Estoque</CardTitle>
        <CardDescription>Entradas e saídas dos últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="entradas"
                type="monotone"
                fill="var(--color-chart-1)"
                fillOpacity={0.4}
                stroke="var(--color-chart-1)"
                stackId="a"
              />
              <Area
                dataKey="saidas"
                type="monotone"
                fill="var(--color-chart-2)"
                fillOpacity={0.4}
                stroke="var(--color-chart-2)"
                stackId="a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
