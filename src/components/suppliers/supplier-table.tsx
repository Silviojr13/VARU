"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Filter, Plus, Edit, Trash2, MoreHorizontal, Truck, Phone, Mail } from "lucide-react"
import { SupplierForm } from "./supplier-form"

interface Supplier {
  id: number
  name: string
  cnpj?: string
  contactName?: string
  email?: string
  phone?: string
  mobile?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  isActive: number
  createdAt: string
}

export function SupplierTable() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(null)

  useEffect(() => {
    loadSuppliers()
  }, [])

  const loadSuppliers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/suppliers')
      const data = await response.json()
      
      // Check if the response is an error
      if (!response.ok || data.error) {
        console.error('Error loading suppliers:', data.error || 'Unknown error')
        setSuppliers([]) // Set to empty array to prevent filter errors
        return
      }
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setSuppliers(data)
      } else {
        console.error('Unexpected data format:', data)
        setSuppliers([])
      }
    } catch (error) {
      console.error('Error loading suppliers:', error)
      setSuppliers([]) // Set to empty array to prevent filter errors
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setSelectedSupplier(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setIsDialogOpen(true)
  }

  const handleDelete = (supplier: Supplier) => {
    setSupplierToDelete(supplier)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!supplierToDelete) return
    
    try {
      const response = await fetch(`/api/suppliers?id=${supplierToDelete.id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        loadSuppliers()
        setIsDeleteDialogOpen(false)
        setSupplierToDelete(null)
      } else {
        console.error('Failed to delete supplier')
      }
    } catch (error) {
      console.error('Error deleting supplier:', error)
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      if (selectedSupplier) {
        // Update existing supplier
        const response = await fetch('/api/suppliers', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...data, id: selectedSupplier.id }),
        })
        
        if (response.ok) {
          loadSuppliers()
          setIsDialogOpen(false)
        }
      } else {
        // Create new supplier
        const response = await fetch('/api/suppliers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        
        if (response.ok) {
          loadSuppliers()
          setIsDialogOpen(false)
        }
      }
    } catch (error) {
      console.error('Error saving supplier:', error)
    }
  }

  const filteredSuppliers = Array.isArray(suppliers) ? suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (supplier.cnpj && supplier.cnpj.includes(searchTerm))
    const matchesStatus = selectedStatus === "all" || supplier.isActive === (selectedStatus === "active" ? 1 : 0)
    return matchesSearch && matchesStatus
  }) : []

  const statuses = ["all", "active", "inactive"]

  return (
    <>
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
                placeholder="Buscar por nome ou CNPJ..."
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
            <Button className="gap-2" onClick={handleCreate}>
              <Plus size={16} />
              Novo Fornecedor
            </Button>
          </div>

          {/* Suppliers Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : filteredSuppliers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Nenhum fornecedor encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <Truck size={16} className="text-muted-foreground" />
                          </div>
                          <div>
                            <div className="font-medium">{supplier.name}</div>
                            <div className="text-sm text-muted-foreground">{supplier.cnpj || "-"}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {supplier.contactName && (
                            <div className="text-sm">{supplier.contactName}</div>
                          )}
                          {supplier.email && (
                            <div className="flex items-center gap-2 text-sm">
                              <Mail size={12} className="text-muted-foreground" />
                              {supplier.email}
                            </div>
                          )}
                          {(supplier.phone || supplier.mobile) && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone size={12} className="text-muted-foreground" />
                              {supplier.phone || supplier.mobile}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={supplier.isActive ? "default" : "secondary"}>
                          {supplier.isActive ? "Ativo" : "Inativo"}
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
                            <DropdownMenuItem className="gap-2" onClick={() => handleEdit(supplier)}>
                              <Edit size={14} />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDelete(supplier)}>
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
        </CardContent>
      </Card>

      {/* Supplier Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedSupplier ? "Editar Fornecedor" : "Novo Fornecedor"}</DialogTitle>
          </DialogHeader>
          <SupplierForm 
            supplier={selectedSupplier} 
            onSubmit={handleSubmit} 
            onCancel={() => setIsDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Tem certeza que deseja excluir o fornecedor <strong>{supplierToDelete?.name}</strong>?</p>
            <p className="text-sm text-muted-foreground mt-2">Esta ação não pode ser desfeita.</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}