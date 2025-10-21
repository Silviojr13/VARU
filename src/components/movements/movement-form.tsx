"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface MovementFormProps {
  movement?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

interface Product {
  id: number
  name: string
  sku: string
}

interface Warehouse {
  id: number
  name: string
  code: string
}

interface MovementType {
  id: number
  name: string
  code: string
  direction: number
}

interface Client {
  id: string
  name: string
}

interface Supplier {
  id: number
  name: string
}

export function MovementForm({ movement, onSubmit, onCancel }: MovementFormProps) {
  const [formData, setFormData] = useState({
    id: movement?.id || "",
    productId: movement?.productId || "",
    warehouseId: movement?.warehouseId || "",
    typeId: movement?.typeId || "",
    clientId: movement?.clientId || "",
    supplierId: movement?.supplierId || "",
    quantity: movement?.quantity || "",
    unitCost: movement?.unitCost || "",
    docRef: movement?.docRef || "",
    nfeId: movement?.nfeId || "",
    occurredAt: movement?.occurredAt || new Date().toISOString().split('T')[0],
    notes: movement?.notes || "",
  })

  const [products, setProducts] = useState<Product[]>([])
  const [warehouses, setWarehouses] = useState<Warehouse[]>([])
  const [movementTypes, setMovementTypes] = useState<MovementType[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  useEffect(() => {
    // In a real application, these would be fetched from the API
    // For now, we'll use mock data
    setProducts([
      { id: 1, name: "Notebook Dell Inspiron", sku: "NOTE001" },
      { id: 2, name: "Mouse Logitech MX", sku: "MOUS001" },
      { id: 3, name: "Papel A4 Sulfite", sku: "PAPE001" },
    ])
    
    setWarehouses([
      { id: 1, name: "Depósito Central", code: "DEP001" },
      { id: 2, name: "Loja Matriz", code: "LOJ001" },
    ])
    
    setMovementTypes([
      { id: 1, name: "Entrada por Compra", code: "COMPRA", direction: 1 },
      { id: 2, name: "Saída por Venda", code: "VENDA", direction: -1 },
      { id: 3, name: "Transferência", code: "TRANSF", direction: 0 },
      { id: 4, name: "Ajuste de Estoque", code: "AJUSTE", direction: 0 },
    ])
    
    setClients([
      { id: "1", name: "Cliente A" },
      { id: "2", name: "Cliente B" },
    ])
    
    setSuppliers([
      { id: 1, name: "Fornecedor A" },
      { id: 2, name: "Fornecedor B" },
    ])
  }, [])

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      quantity: parseFloat(formData.quantity as string),
      unitCost: parseFloat(formData.unitCost as string),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{movement ? "Editar Movimentação" : "Nova Movimentação"}</CardTitle>
        <CardDescription>Registre uma nova movimentação de estoque</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Básico</TabsTrigger>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="typeId">Tipo de Movimentação *</Label>
                  <Select 
                    value={formData.typeId.toString()} 
                    onValueChange={(value) => handleChange("typeId", parseInt(value))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {movementTypes.map((type: any) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.direction === 1 ? (
                            <span className="flex items-center gap-2">
                              <ArrowUpRight size={16} className="text-green-600" />
                              {type.name}
                            </span>
                          ) : type.direction === -1 ? (
                            <span className="flex items-center gap-2">
                              <ArrowDownRight size={16} className="text-red-600" />
                              {type.name}
                            </span>
                          ) : (
                            <span>{type.name}</span>
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="occurredAt">Data *</Label>
                  <Input 
                    id="occurredAt" 
                    type="date" 
                    value={formData.occurredAt} 
                    onChange={(e) => handleChange("occurredAt", e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productId">Produto *</Label>
                <Select 
                  value={formData.productId.toString()} 
                  onValueChange={(value) => handleChange("productId", parseInt(value))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product: any) => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name} ({product.sku})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="warehouseId">Depósito *</Label>
                  <Select 
                    value={formData.warehouseId.toString()} 
                    onValueChange={(value) => handleChange("warehouseId", parseInt(value))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um depósito" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((warehouse: any) => (
                        <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                          {warehouse.name} ({warehouse.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantidade *</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    value={formData.quantity} 
                    onChange={(e) => handleChange("quantity", e.target.value)} 
                    placeholder="0" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="unitCost">Custo Unitário (R$)</Label>
                <Input 
                  id="unitCost" 
                  type="number" 
                  step="0.01"
                  value={formData.unitCost} 
                  onChange={(e) => handleChange("unitCost", e.target.value)} 
                  placeholder="0.00" 
                />
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="clientId">Cliente</Label>
                  <Select 
                    value={formData.clientId} 
                    onValueChange={(value) => handleChange("clientId", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client: any) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="supplierId">Fornecedor</Label>
                  <Select 
                    value={formData.supplierId.toString()} 
                    onValueChange={(value) => handleChange("supplierId", parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um fornecedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier: any) => (
                        <SelectItem key={supplier.id} value={supplier.id.toString()}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="docRef">Documento Referência</Label>
                <Input 
                  id="docRef" 
                  value={formData.docRef} 
                  onChange={(e) => handleChange("docRef", e.target.value)} 
                  placeholder="Ex: NF-001234" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea 
                  id="notes" 
                  value={formData.notes} 
                  onChange={(e) => handleChange("notes", e.target.value)} 
                  placeholder="Observações adicionais sobre a movimentação..." 
                />
              </div>
            </TabsContent>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit">
                {movement ? "Atualizar Movimentação" : "Registrar Movimentação"}
              </Button>
            </div>
          </Tabs>
        </form>
      </CardContent>
    </Card>
  )
}