"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Filter, Plus, Edit, Trash2, ArrowUpRight, ArrowDownRight, MoreHorizontal, Calendar } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { MovementForm } from "./movement-form"

interface Movement {
  id: number
  productId: number
  warehouseId: number
  typeId: number
  clientId?: string
  supplierId?: number
  quantity: number
  unitCost?: number
  docRef?: string
  nfeId?: number
  occurredAt: string
  createdBy?: string
  notes?: string
  createdAt: string
  product: {
    name: string
    sku: string
  }
  warehouse: {
    name: string
    code: string
  }
  type: {
    name: string
    code: string
    direction: number
  }
  client?: {
    name: string
  }
  supplier?: {
    name: string
  }
  user?: {
    name: string
  }
}

export function MovementTable() {
  const [movements, setMovements] = useState<Movement[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [movementToDelete, setMovementToDelete] = useState<Movement | null>(null)

  useEffect(() => {
    loadMovements()
  }, [])

  const loadMovements = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/movements')
      const data = await response.json()
      
      // Check if the response is an error
      if (!response.ok || data.error) {
        console.error('Error loading movements:', data.error || 'Unknown error')
        setMovements([]) // Set to empty array to prevent filter errors
        return
      }
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setMovements(data)
      } else {
        console.error('Unexpected data format:', data)
        setMovements([])
      }
    } catch (error) {
      console.error('Error loading movements:', error)
      setMovements([]) // Set to empty array to prevent filter errors
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setSelectedMovement(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (movement: Movement) => {
    setSelectedMovement(movement)
    setIsDialogOpen(true)
  }

  const handleDelete = (movement: Movement) => {
    setMovementToDelete(movement)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!movementToDelete) return
    
    try {
      const response = await fetch(`/api/movements?id=${movementToDelete.id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        loadMovements()
        setIsDeleteDialogOpen(false)
        setMovementToDelete(null)
      } else {
        console.error('Failed to delete movement')
      }
    } catch (error) {
      console.error('Error deleting movement:', error)
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      if (selectedMovement) {
        // Update existing movement
        const response = await fetch('/api/movements', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...data, id: selectedMovement.id }),
        })
        
        if (response.ok) {
          loadMovements()
          setIsDialogOpen(false)
        }
      } else {
        // Create new movement
        const response = await fetch('/api/movements', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        
        if (response.ok) {
          loadMovements()
          setIsDialogOpen(false)
        }
      }
    } catch (error) {
      console.error('Error saving movement:', error)
    }
  }

  const filteredMovements = Array.isArray(movements) ? movements.filter((movement) => {
    const matchesSearch =
      movement.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (movement.docRef && movement.docRef.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === "all" || movement.type.code.toLowerCase() === selectedType.toLowerCase()
    return matchesSearch && matchesType
  }) : []

  const types = ["all", "COMPRA", "VENDA", "TRANSF", "AJUSTE"]

  return (
    <>
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
                    {type === "all" ? "Todos os tipos" : type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="gap-2" onClick={handleCreate}>
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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : filteredMovements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center">
                      Nenhuma movimentação encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMovements.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {movement.type.direction === 1 ? (
                            <ArrowUpRight size={16} className="text-green-600" />
                          ) : movement.type.direction === -1 ? (
                            <ArrowDownRight size={16} className="text-red-600" />
                          ) : null}
                          <Badge variant={movement.type.direction === 1 ? "default" : movement.type.direction === -1 ? "secondary" : "outline"}>
                            {movement.type.name}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-muted-foreground" />
                          {format(new Date(movement.occurredAt), "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{movement.product.name}</div>
                          <div className="text-sm text-muted-foreground font-mono">{movement.product.sku}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{movement.quantity}</TableCell>
                      <TableCell>{movement.unitCost ? `R$ ${movement.unitCost.toFixed(2)}` : "-"}</TableCell>
                      <TableCell className="font-medium">
                        {movement.unitCost ? `R$ ${(movement.quantity * movement.unitCost).toFixed(2)}` : "-"}
                      </TableCell>
                      <TableCell>{movement.user?.name || "-"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {movement.docRef || "-"}
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
                            <DropdownMenuItem className="gap-2" onClick={() => handleEdit(movement)}>
                              <Edit size={14} />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDelete(movement)}>
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

      {/* Movement Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedMovement ? "Editar Movimentação" : "Nova Movimentação"}</DialogTitle>
          </DialogHeader>
          <MovementForm 
            movement={selectedMovement} 
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
            <p>Tem certeza que deseja excluir esta movimentação?</p>
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
