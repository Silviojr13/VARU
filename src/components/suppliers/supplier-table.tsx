"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, Plus, Edit, Trash2, MoreHorizontal, Truck, Phone, Mail } from "lucide-react"

// Mock data for suppliers
const suppliers = [
  {
    id: "1",
    code: "FORN001",
    name: "Dell Inc.",
    cnpj: "12.345.678/0001-90",
    contact: "João Vendas",
    phone: "(11) 99999-9999",
    email: "vendas@dell.com",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    category: "Tecnologia",
    status: "active",
    productsCount: 15,
    lastPurchase: "2024-01-15",
    totalPurchases: 250000.0,
    rating: 4.8,
  },
  {
    id: "2",
    code: "FORN002",
    name: "Logitech Brasil",
    cnpj: "98.765.432/0001-10",
    contact: "Maria Silva",
    phone: "(11) 88888-8888",
    email: "comercial@logitech.com.br",
    address: "Rua das Flores, 500 - Rio de Janeiro, RJ",
    category: "Periféricos",
    status: "active",
    productsCount: 8,
    lastPurchase: "2024-01-10",
    totalPurchases: 85000.0,
    rating: 4.5,
  },
  {
    id: "3",
    code: "FORN003",
    name: "Papel & Cia Ltda",
    cnpj: "11.222.333/0001-44",
    contact: "Pedro Santos",
    phone: "(11) 77777-7777",
    email: "vendas@papelecia.com.br",
    address: "Rua do Comércio, 200 - Belo Horizonte, MG",
    category: "Escritório",
    status: "inactive",
    productsCount: 25,
    lastPurchase: "2023-12-20",
    totalPurchases: 45000.0,
    rating: 4.2,
  },
]

export function SupplierTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.cnpj.includes(searchTerm)
    const matchesStatus = selectedStatus === "all" || supplier.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const statuses = ["all", "active", "inactive"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Fornecedores</CardTitle>
        <CardDescription>Gerencie todos os fornecedores cadastrados</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Buscar por nome, código ou CNPJ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter size={16} />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {statuses.map((status) => (
                <DropdownMenuItem key={status} onClick={() => setSelectedStatus(status)}>
                  {status === "all" ? "Todos os status" : status === "active" ? "Ativo" : "Inativo"}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="gap-2">
            <Plus size={16} />
            Novo Fornecedor
          </Button>
        </div>

        {/* Suppliers Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Produtos</TableHead>
                <TableHead>Última Compra</TableHead>
                <TableHead>Total Compras</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-mono">{supplier.code}</TableCell>
                  <TableCell>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <Truck size={16} className="text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">{supplier.name}</div>
                        <div className="text-sm text-muted-foreground">{supplier.cnpj}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={12} className="text-muted-foreground" />
                        {supplier.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={12} className="text-muted-foreground" />
                        {supplier.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{supplier.category}</Badge>
                  </TableCell>
                  <TableCell className="text-center">{supplier.productsCount}</TableCell>
                  <TableCell>{supplier.lastPurchase}</TableCell>
                  <TableCell className="font-medium">R$ {supplier.totalPurchases.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={supplier.status === "active" ? "default" : "secondary"}>
                      {supplier.status === "active" ? "Ativo" : "Inativo"}
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
                        <DropdownMenuItem className="gap-2">
                          <Edit size={14} />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>Ver Produtos</DropdownMenuItem>
                        <DropdownMenuItem>Histórico de Compras</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Trash2 size={14} />
                          Desativar
                        </DropdownMenuItem>
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
