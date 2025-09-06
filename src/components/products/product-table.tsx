"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, Plus, Edit, Trash2, MoreHorizontal, Package, AlertTriangle } from "lucide-react"

// Mock data for products
const products = [
  {
    id: "1",
    code: "ABC123",
    name: "Notebook Dell Inspiron",
    category: "Eletrônicos",
    supplier: "Dell Inc.",
    currentStock: 15,
    minStock: 5,
    maxStock: 50,
    unitPrice: 2500.0,
    location: "A1-B2",
    expirationDate: null,
    status: "active",
  },
  {
    id: "2",
    code: "XYZ789",
    name: "Mouse Logitech MX",
    category: "Periféricos",
    supplier: "Logitech",
    currentStock: 3,
    minStock: 10,
    maxStock: 100,
    unitPrice: 150.0,
    location: "B2-C1",
    expirationDate: null,
    status: "low_stock",
  },
  {
    id: "3",
    code: "DEF456",
    name: "Papel A4 Sulfite",
    category: "Escritório",
    supplier: "Papel & Cia",
    currentStock: 25,
    minStock: 20,
    maxStock: 200,
    unitPrice: 12.5,
    location: "C1-D3",
    expirationDate: "2025-12-31",
    status: "active",
  },
]

export function ProductTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Produtos</CardTitle>
        <CardDescription>Gerencie todos os produtos do seu estoque</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Buscar por nome ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter size={16} />
                Categoria
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((category) => (
                <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                  {category === "all" ? "Todas as categorias" : category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="gap-2">
            <Plus size={16} />
            Novo Produto
          </Button>
        </div>

        {/* Products Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Preço Unit.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono">{product.code}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package size={16} className="text-muted-foreground" />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{product.currentStock}</span>
                      {product.currentStock <= product.minStock && (
                        <AlertTriangle size={14} className="text-yellow-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{product.location}</TableCell>
                  <TableCell>R$ {product.unitPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={product.status === "active" ? "default" : "destructive"}>
                      {product.status === "active" ? "Ativo" : "Baixo Estoque"}
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
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Trash2 size={14} />
                          Excluir
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
