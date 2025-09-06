"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function MovementForm() {
  const [movementDate, setMovementDate] = useState<Date>(new Date())
  const [movementType, setMovementType] = useState<string>("")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Movimentação</CardTitle>
        <CardDescription>Registre uma entrada ou saída de produtos</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
            <TabsTrigger value="additional">Adicional</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="movement-type">Tipo de Movimentação</Label>
                <Select value={movementType} onValueChange={setMovementType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrada">Entrada</SelectItem>
                    <SelectItem value="saida">Saída</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Data da Movimentação</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {movementDate ? format(movementDate, "PPP", { locale: ptBR }) : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={movementDate} onSelect={setMovementDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product">Produto</Label>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abc123">ABC123 - Notebook Dell Inspiron</SelectItem>
                    <SelectItem value="xyz789">XYZ789 - Mouse Logitech MX</SelectItem>
                    <SelectItem value="def456">DEF456 - Papel A4 Sulfite</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Search size={16} />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantidade</Label>
                <Input id="quantity" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit-price">Preço Unitário</Label>
                <Input id="unit-price" type="number" step="0.01" placeholder="0.00" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Motivo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o motivo" />
                </SelectTrigger>
                <SelectContent>
                  {movementType === "entrada" ? (
                    <>
                      <SelectItem value="compra">Compra</SelectItem>
                      <SelectItem value="devolucao">Devolução de Cliente</SelectItem>
                      <SelectItem value="ajuste">Ajuste de Estoque</SelectItem>
                      <SelectItem value="transferencia">Transferência</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="venda">Venda</SelectItem>
                      <SelectItem value="devolucao">Devolução para Fornecedor</SelectItem>
                      <SelectItem value="perda">Perda/Avaria</SelectItem>
                      <SelectItem value="transferencia">Transferência</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            {movementType === "entrada" && (
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
            )}
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="total-value">Valor Total</Label>
                <Input id="total-value" type="number" step="0.01" placeholder="0.00" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Desconto (%)</Label>
                <Input id="discount" type="number" step="0.01" placeholder="0.00" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tax">Imposto (%)</Label>
                <Input id="tax" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="final-value">Valor Final</Label>
                <Input id="final-value" type="number" step="0.01" placeholder="0.00" readOnly />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-method">Forma de Pagamento</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma de pagamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dinheiro">Dinheiro</SelectItem>
                  <SelectItem value="cartao">Cartão</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="boleto">Boleto</SelectItem>
                  <SelectItem value="prazo">A Prazo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="additional" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="document">Número do Documento</Label>
                <Input id="document" placeholder="Ex: NF-001234" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batch">Lote</Label>
                <Input id="batch" placeholder="Ex: LOTE001" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Localização</Label>
                <Input id="location" placeholder="Ex: A1-B2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsible">Responsável</Label>
                <Input id="responsible" placeholder="Nome do responsável" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observations">Observações</Label>
              <Textarea id="observations" placeholder="Observações sobre a movimentação..." />
            </div>
          </TabsContent>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline">Cancelar</Button>
            <Button>Registrar Movimentação</Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
