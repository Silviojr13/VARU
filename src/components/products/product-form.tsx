"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

// Define the Product type
type Product = {
  id?: number
  sku?: string
  name?: string
  description?: string
  brand?: string
  categoryId?: number
  category?: { id: number; name: string }
  unitId?: number
  unit?: { id: number; code: string }
  minStock?: number
  currentStock?: number
  location?: string
  costPrice?: number
  salePrice?: number
  profitMargin?: number
  ncm?: string
  gtin?: string
  active?: number
  createdAt?: Date
}

// Define the Category type
type Category = {
  id: number
  name: string
}

export function ProductForm({ 
  product, 
  onClose,
  onSave
}: { 
  product?: Product | null;
  onClose?: () => void;
  onSave?: () => void;
}) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [formData, setFormData] = useState({
    name: product?.name || "",
    categoryId: product?.categoryId?.toString() || product?.category?.id?.toString() || "",
    sku: product?.sku || "",
    description: product?.description || "",
    brand: product?.brand || "",
    gtin: product?.gtin || "",
    minStock: product?.minStock?.toString() || "",
    location: product?.location || "",
    costPrice: product?.costPrice?.toString() || "",
    salePrice: product?.salePrice?.toString() || "",
    profitMargin: product?.profitMargin?.toString() || "",
    unitId: product?.unitId?.toString() || product?.unit?.id?.toString() || "1", // Default to first unit
    initialStock: product?.currentStock?.toString() || "",
  })

  // Fetch categories when component mounts
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories")
        const data = await response.json()
        setCategories(data)
        
        // If no category is selected and there are categories, select the first one
        if (!formData.categoryId && data.length > 0) {
          setFormData(prev => ({
            ...prev,
            categoryId: data[0].id.toString()
          }))
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error)
        toast.error("Erro ao carregar categorias")
      } finally {
        setLoadingCategories(false)
      }
    }
    
    fetchCategories()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name) {
      toast.error("Nome do produto é obrigatório")
      return
    }
    
    if (!formData.categoryId) {
      toast.error("Categoria é obrigatória")
      return
    }
    
    if (!formData.initialStock) {
      toast.error("Quantidade inicial do estoque é obrigatória")
      return
    }
    
    if (!formData.minStock) {
      toast.error("Estoque mínimo é obrigatório")
      return
    }
    
    if (!formData.location) {
      toast.error("Localização é obrigatória")
      return
    }
    
    if (!formData.costPrice) {
      toast.error("Preço de custo é obrigatório")
      return
    }
    
    if (!formData.salePrice) {
      toast.error("Preço de venda é obrigatório")
      return
    }
    
    try {
      const productData = {
        id: product?.id,
        name: formData.name,
        sku: formData.sku || undefined, // Let backend generate if not provided
        description: formData.description || undefined,
        brand: formData.brand || undefined,
        categoryId: formData.categoryId,
        unitId: formData.unitId,
        minStock: parseFloat(formData.minStock),
        initialStock: parseFloat(formData.initialStock),
        location: formData.location,
        costPrice: parseFloat(formData.costPrice),
        salePrice: parseFloat(formData.salePrice),
        profitMargin: formData.profitMargin ? parseFloat(formData.profitMargin) : undefined,
        ncm: undefined, // Not implemented in form yet
        gtin: formData.gtin || undefined,
      }
      
      const method = product?.id ? "PUT" : "POST"
      const url = "/api/product"
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao salvar produto")
      }
      
      toast.success(product?.id ? "Produto atualizado com sucesso" : "Produto criado com sucesso")
      
      if (onSave) onSave()
    } catch (error) {
      console.error("Erro ao salvar produto:", error)
      toast.error(error instanceof Error ? error.message : "Erro ao salvar produto")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* Informações básicas Section */}
        <div className="space-y-4">
          <div className="border-b pb-2">
            <h3 className="text-lg font-medium">Informações básicas</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Nome do produto *</Label>
            <Input 
              id="name" 
              placeholder="Ex: Notebook Dell Inspiron 15" 
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="categoryId">Categoria *</Label>
              <Select 
                value={formData.categoryId} 
                onValueChange={(value) => handleSelectChange(value, "categoryId")}
                disabled={loadingCategories}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingCategories ? "Carregando..." : "Selecione uma categoria"} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">Código interno (SKU)</Label>
              <Input 
                id="sku" 
                placeholder="Ex: ABC123" 
                value={formData.sku}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição detalhada</Label>
            <Textarea 
              id="description" 
              placeholder="Descrição detalhada do produto..." 
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="brand">Marca/Fabricante *</Label>
              <Input 
                id="brand" 
                placeholder="Ex: Dell" 
                value={formData.brand}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gtin">Código de barras (EAN/UPC)</Label>
              <Input 
                id="gtin" 
                placeholder="Ex: 7891234567890" 
                value={formData.gtin}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Controle de estoque Section */}
        <div className="space-y-4">
          <div className="border-b pb-2">
            <h3 className="text-lg font-medium">Controle de estoque</h3>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="initialStock">Quantidade inicial do estoque *</Label>
              <Input 
                id="initialStock" 
                type="number" 
                placeholder="0" 
                value={formData.initialStock}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minStock">Estoque mínimo *</Label>
              <Input 
                id="minStock" 
                type="number" 
                placeholder="0" 
                value={formData.minStock}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Localização *</Label>
              <Input 
                id="location" 
                placeholder="Ex: A1-B2" 
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Financeiro Section */}
        <div className="space-y-4">
          <div className="border-b pb-2">
            <h3 className="text-lg font-medium">Financeiro</h3>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="costPrice">Preço de custo *</Label>
              <Input 
                id="costPrice" 
                type="number" 
                step="0.01" 
                placeholder="0.00" 
                value={formData.costPrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salePrice">Preço de venda *</Label>
              <Input 
                id="salePrice" 
                type="number" 
                step="0.01" 
                placeholder="0.00" 
                value={formData.salePrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profitMargin">Margem de lucro (%)</Label>
              <Input 
                id="profitMargin" 
                type="number" 
                step="0.01" 
                placeholder="0.00" 
                value={formData.profitMargin}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {product ? "Atualizar Produto" : "Adicionar Produto"}
          </Button>
        </div>
      </div>
    </form>
  )
}