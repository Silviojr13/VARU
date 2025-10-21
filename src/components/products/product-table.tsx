"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, Plus, Edit, Trash2, MoreHorizontal, Package, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ProductForm } from "./product-form"
import { toast } from "sonner"

type Product = {
  id: number
  sku: string
  name: string
  description?: string
  brand?: string
  categoryId?: number
  category?: { id: number; name: string }
  unitId?: number
  unit?: { id: number; code: string }
  minStock: number
  currentStock?: number
  location?: string
  costPrice?: number
  salePrice?: number
  profitMargin?: number
  ncm?: string
  gtin?: string
  active: number
  createdAt?: Date
}

export function ProductTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/product")
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Erro ao carregar produtos:", error)
      toast.error("Erro ao carregar produtos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category?.name).filter(Boolean)))]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category?.name === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsDialogOpen(true)
  }

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return

    try {
      const response = await fetch(`/api/product?id=${productToDelete.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao excluir produto")
      }

      toast.success("Produto excluído com sucesso")
      // Reload products from API to ensure consistency
      await loadProducts()
    } catch (error) {
      console.error("Erro ao excluir produto:", error)
      toast.error(error instanceof Error ? error.message : "Erro ao excluir produto")
    } finally {
      setIsDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  const handleAddNew = () => {
    setEditingProduct(null)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingProduct(null)
  }

  const handleSaveProduct = () => {
    handleCloseDialog()
    // Reload products after save
    loadProducts()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Produtos</CardTitle>
        <CardDescription>Gerencie todos os produtos do seu estoque</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Buscar por nome ou SKU..."
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
                <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category ?? "")}>
                  {category === "all" ? "Todas as categorias" : category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="gap-2" onClick={handleAddNew}>
            <Plus size={16} />
            Adicionar produto
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Marca/Fabricante</TableHead>
                <TableHead>Quantidade em estoque</TableHead>
                <TableHead>Preço de venda</TableHead>
                <TableHead>Margem de lucro (%)</TableHead>
                <TableHead className="w-[50px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7}>Carregando...</TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>Nenhum produto encontrado.</TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package size={16} className="text-muted-foreground" />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category?.name || "-"}</Badge>
                    </TableCell>
                    <TableCell>{product.brand || "-"}</TableCell>
                    <TableCell>{product.currentStock || 0}</TableCell>
                    <TableCell>
                      {product.salePrice ? new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.salePrice) : "-"}
                    </TableCell>
                    <TableCell>{product.profitMargin ? `${product.profitMargin}%` : "-"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2" onClick={() => handleEdit(product)}>
                            <Edit size={14} />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDeleteClick(product)}>
                            <Trash2 size={14} />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Editar Produto" : "Adicionar Novo Produto"}</DialogTitle>
              <DialogDescription>
                {editingProduct ? "Edite as informações do produto" : "Preencha as informações do novo produto"}
              </DialogDescription>
            </DialogHeader>
            <ProductForm 
              product={editingProduct || undefined}
              onClose={handleCloseDialog}
              onSave={handleSaveProduct}
            />
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                {productToDelete && (
                  <>
                    Tem certeza que deseja excluir o produto <strong>"{productToDelete.name}"</strong>? 
                    Esta ação não pode ser desfeita.
                  </>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}