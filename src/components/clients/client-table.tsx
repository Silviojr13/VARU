"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, Plus, Edit, Trash2, MoreHorizontal, User, Phone, Mail } from "lucide-react"

// Mock data for clients
const clients = [
  {
    id: "1",
    code: "CLI001",
    name: "Empresa ABC Ltda",
    type: "juridica",
    document: "12.345.678/0001-90",
    contact: "Carlos Silva",
    phone: "(11) 99999-9999",
    email: "carlos@empresaabc.com",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    status: "active",
    lastPurchase: "2024-01-15",
    totalPurchases: 85000.0,
    ordersCount: 12,
    creditLimit: 100000.0,
    category: "Premium",
  },
  {
    id: "2",
    code: "CLI002",
    name: "Maria Santos",
    type: "fisica",
    document: "123.456.789-00",
    contact: "Maria Santos",
    phone: "(11) 88888-8888",
    email: "maria.santos@email.com",
    address: "Rua das Flores, 500 - Rio de Janeiro, RJ",
    status: "active",
    lastPurchase: "2024-01-10",
    totalPurchases: 15000.0,
    ordersCount: 8,
    creditLimit: 20000.0,
    category: "Regular",
  },
  {
    id: "3",
    code: "CLI003",
    name: "Tech Solutions Ltda",
    type: "juridica",
    document: "98.765.432/0001-10",
    contact: "Pedro Costa",
    phone: "(11) 77777-7777",
    email: "contato@techsolutions.com",
    address: "Rua do Comércio, 200 - Belo Horizonte, MG",
    status: "inactive",
    lastPurchase: "2023-12-20",
    totalPurchases: 45000.0,
    ordersCount: 15,
    creditLimit: 50000.0,
    category: "Regular",
  },
    {
    id: "4",
    code: "CLI004",
    name: "Tech Solutions Ltda",
    type: "juridica",
    document: "98.765.432/0001-10",
    contact: "Pedro Costa",
    phone: "(11) 77777-7777",
    email: "contato@techsolutions.com",
    address: "Rua do Comércio, 200 - Belo Horizonte, MG",
    status: "inactive",
    lastPurchase: "2023-12-20",
    totalPurchases: 45000.0,
    ordersCount: 15,
    creditLimit: 50000.0,
    category: "Regular",
  },
]

export function ClientTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.document.includes(searchTerm)
    const matchesType = selectedType === "all" || client.type === selectedType
    return matchesSearch && matchesType
  })

  const types = ["all", "fisica", "juridica"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Clientes</CardTitle>
        <CardDescription>Gerencie todos os clientes cadastrados</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Buscar por nome, código ou documento..."
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
                  {type === "all" ? "Todos os tipos" : type === "fisica" ? "Pessoa Física" : "Pessoa Jurídica"}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="gap-2">
            <Plus size={16} />
            Novo Cliente
          </Button>
        </div>

        {/* Clients Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Pedidos</TableHead>
                <TableHead>Última Compra</TableHead>
                <TableHead>Total Compras</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-mono">{client.code}</TableCell>
                  <TableCell>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <User size={16} className="text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {client.type === "fisica" ? "CPF" : "CNPJ"}: {client.document}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={12} className="text-muted-foreground" />
                        {client.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={12} className="text-muted-foreground" />
                        {client.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={client.category === "Premium" ? "default" : "outline"}>{client.category}</Badge>
                  </TableCell>
                  <TableCell className="text-center">{client.ordersCount}</TableCell>
                  <TableCell>{client.lastPurchase}</TableCell>
                  <TableCell className="font-medium">R$ {client.totalPurchases.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={client.status === "active" ? "default" : "secondary"}>
                      {client.status === "active" ? "Ativo" : "Inativo"}
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
                        <DropdownMenuItem>Ver Pedidos</DropdownMenuItem>
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
