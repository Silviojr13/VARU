"use client"

import { useState } from "react"
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
import { CalendarIcon, Scan } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function ProductForm() {
  const [expirationDate, setExpirationDate] = useState<Date>()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastro de Produto</CardTitle>
        <CardDescription>Preencha as informações do produto</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Básico</TabsTrigger>
            <TabsTrigger value="stock">Estoque</TabsTrigger>
            <TabsTrigger value="pricing">Preços</TabsTrigger>
            <TabsTrigger value="additional">Adicional</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="code">Código do Produto</Label>
                <div className="flex gap-2">
                  <Input id="code" placeholder="Ex: ABC123" />
                  <Button variant="outline" size="icon">
                    <Scan size={16} />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="barcode">Código de Barras</Label>
                <Input id="barcode" placeholder="Ex: 7891234567890" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input id="name" placeholder="Ex: Notebook Dell Inspiron 15" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" placeholder="Descrição detalhada do produto..." />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Eletrônicos</SelectItem>
                    <SelectItem value="peripherals">Periféricos</SelectItem>
                    <SelectItem value="office">Escritório</SelectItem>
                    <SelectItem value="furniture">Móveis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Fornecedor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dell">Dell Inc.</SelectItem>
                    <SelectItem value="logitech">Logitech</SelectItem>
                    <SelectItem value="papel-cia">Papel & Cia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stock" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="current-stock">Estoque Atual</Label>
                <Input id="current-stock" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-stock">Estoque Mínimo</Label>
                <Input id="min-stock" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-stock">Estoque Máximo</Label>
                <Input id="max-stock" type="number" placeholder="0" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Localização</Label>
                <Input id="location" placeholder="Ex: A1-B2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unidade de Medida</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="un">Unidade</SelectItem>
                    <SelectItem value="kg">Quilograma</SelectItem>
                    <SelectItem value="l">Litro</SelectItem>
                    <SelectItem value="m">Metro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Data de Validade</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expirationDate ? format(expirationDate, "PPP", { locale: ptBR }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={expirationDate} onSelect={setExpirationDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cost-price">Preço de Custo</Label>
                <Input id="cost-price" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sale-price">Preço de Venda</Label>
                <Input id="sale-price" type="number" step="0.01" placeholder="0.00" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="margin">Margem de Lucro (%)</Label>
                <Input id="margin" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax">Imposto (%)</Label>
                <Input id="tax" type="number" step="0.01" placeholder="0.00" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="additional" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="batch">Lote</Label>
              <Input id="batch" placeholder="Ex: LOTE001" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serial">Número de Série</Label>
              <Input id="serial" placeholder="Ex: SN123456789" />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="secondary">Eletrônico</Badge>
                <Badge variant="secondary">Importado</Badge>
                <Badge variant="secondary">Garantia</Badge>
              </div>
              <Input placeholder="Adicionar tag..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea id="notes" placeholder="Observações adicionais sobre o produto..." />
            </div>
          </TabsContent>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline">Cancelar</Button>
            <Button>Salvar Produto</Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
