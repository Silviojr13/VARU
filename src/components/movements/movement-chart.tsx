"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import React from "react"

// Dados do gráfico
const data = [
  { day: "Seg", entradas: 12, saidas: 8 },
  { day: "Ter", entradas: 15, saidas: 12 },
  { day: "Qua", entradas: 8, saidas: 15 },
  { day: "Qui", entradas: 18, saidas: 10 },
  { day: "Sex", entradas: 22, saidas: 18 },
  { day: "Sáb", entradas: 5, saidas: 3 },
  { day: "Dom", entradas: 2, saidas: 1 },
]

// Configuração de cores e labels
const chartConfig = {
  entradas: { label: "Entradas", color: "#10b981" },
  saidas: { label: "Saídas", color: "#ef4444" },
}

// Tipagem correta do payload recebido pelo Tooltip
interface CustomTooltipPayload {
  color: string
  dataKey: string
  value: number
}

// Tooltip customizado
const CustomTooltip: React.FC<{
  active?: boolean
  payload?: CustomTooltipPayload[]
  label?: string
}> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.dataKey === "entradas" ? "Entradas" : "Saídas"}: ${entry.value}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Componente do gráfico
export function MovementChart() {
  console.log("[v0] MovementChart rendering with config:", chartConfig)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Movimentações da Semana</CardTitle>
        <CardDescription>Entradas e saídas por dia da semana</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="entradas" fill={chartConfig.entradas.color} radius={[4, 4, 0, 0]} />
            <Bar dataKey="saidas" fill={chartConfig.saidas.color} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
