"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, Plus, ArrowUpRight, ArrowDownRight, MoreHorizontal, Calendar } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Mock data for movements
const movements = [
  {
    id: "1",
    type: "entrada",
    productCode: "ABC123",
    productName: "Notebook Dell Inspiron",
    quantity: 50,
    unitPrice: 2400.0,
    totalValue: 120000.0,
    date: new Date("2024-01-15"),
    responsible: "João Silva",
    supplier: "Dell Inc.",
    batch: "LOTE001",
    reason: "Compra",
    document: "NF-001234",
  },
  {
    id: "2",
    type: "saida",
    productCode: "XYZ789",
    productName: "Mouse Logitech MX",
    quantity: 25,
    unitPrice: 150.0,
    totalValue: 3750.0,
    date: new Date("2024-01-14"),
    responsible: "Maria Santos",
    supplier: null,
    batch: "LOTE002",
    reason: "Venda",
    document: "PV-005678",
  },
  {
    id: "3",
    type: "entrada",
    productCode: "DEF456",
    productName: "Papel A4 Sulfite",
    quantity: 100,
    unitPrice: 12.0,
    totalValue: 1200.0,
    date: new Date("2024-01-13"),
    responsible: "Pedro Costa",
    supplier: "Papel & Cia",
    batch: "LOTE003",
    reason: "Reposição",
    document: "NF-001235",
  },
  {
    id: "4",
    type: "saida",
    productCode: "ABC123",
    productName: "Notebook Dell Inspiron",
    quantity: 5,
    unitPrice: 2500.0,
    totalValue: 12500.0,
    date: new Date("2024-01-12"),
    responsible: "Ana Lima",
    supplier: null,
    batch: "LOTE001",
    reason: "Devolução",
    document: "DEV-001",
  },
]

export function MovementTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const filteredMovements = movements.filter((movement) => {
    const matchesSearch =
      movement.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.document.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || movement.type === selectedType
    return matchesSearch && matchesType
  })

  const types = ["all", "entrada", "saida"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Movimentações</CardTitle>
        <CardDescription>Todas as entradas e saídas de produtos</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Buscar por produto, código ou documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter size={16} />
                Tipo
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {types.map((type) => (
                <DropdownMenuItem key={type} onClick={() => setSelectedType(type)}>
                  {type === "all" ? "Todos os tipos" : type === "entrada" ? "Entradas" : "Saídas"}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="gap-2">
            <Plus size={16} />
            Nova Movimentação
          </Button>
        </div>

        {/* Movements Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Valor Unit.</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {movement.type === "entrada" ? (
                        <ArrowUpRight size={16} className="text-green-600" />
                      ) : (
                        <ArrowDownRight size={16} className="text-red-600" />
                      )}
                      <Badge variant={movement.type === "entrada" ? "default" : "secondary"}>
                        {movement.type === "entrada" ? "Entrada" : "Saída"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-muted-foreground" />
                      {format(movement.date, "dd/MM/yyyy", { locale: ptBR })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{movement.productName}</div>
                      <div className="text-sm text-muted-foreground font-mono">{movement.productCode}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{movement.quantity}</TableCell>
                  <TableCell>R$ {movement.unitPrice.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">R$ {movement.totalValue.toFixed(2)}</TableCell>
                  <TableCell>{movement.responsible}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {movement.document}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Imprimir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
