"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function ClientForm() {
  const [isActive, setIsActive] = useState(true)
  const [clientType, setClientType] = useState("fisica")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastro de Cliente</CardTitle>
        <CardDescription>Preencha as informações do cliente</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
            <TabsTrigger value="address">Endereço</TabsTrigger>
            <TabsTrigger value="commercial">Comercial</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-3">
              <Label>Tipo de Cliente</Label>
              <RadioGroup value={clientType} onValueChange={setClientType} className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fisica" id="fisica" />
                  <Label htmlFor="fisica">Pessoa Física</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="juridica" id="juridica" />
                  <Label htmlFor="juridica">Pessoa Jurídica</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="code">Código do Cliente</Label>
                <Input id="code" placeholder="Ex: CLI001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="document">{clientType === "fisica" ? "CPF" : "CNPJ"}</Label>
                <Input id="document" placeholder={clientType === "fisica" ? "000.000.000-00" : "00.000.000/0000-00"} />
              </div>
            </div>

            {clientType === "fisica" ? (
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" placeholder="Ex: Maria Silva Santos" />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="company-name">Razão Social</Label>
                  <Input id="company-name" placeholder="Ex: Empresa ABC Ltda" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trade-name">Nome Fantasia</Label>
                  <Input id="trade-name" placeholder="Ex: ABC Comércio" />
                </div>
              </>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="bronze">Bronze</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {clientType === "juridica" && (
                <div className="space-y-2">
                  <Label htmlFor="ie">Inscrição Estadual</Label>
                  <Input id="ie" placeholder="000.000.000.000" />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
              <Label htmlFor="active">Cliente ativo</Label>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            {clientType === "juridica" && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Nome do Contato</Label>
                  <Input id="contact-name" placeholder="Ex: João Silva" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-role">Cargo</Label>
                  <Input id="contact-role" placeholder="Ex: Gerente de Compras" />
                </div>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone Principal</Label>
                <Input id="phone" placeholder="(11) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone-alt">Telefone Alternativo</Label>
                <Input id="phone-alt" placeholder="(11) 88888-8888" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail Principal</Label>
                <Input id="email" type="email" placeholder="cliente@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-alt">E-mail Alternativo</Label>
                <Input id="email-alt" type="email" placeholder="contato@empresa.com" />
              </div>
            </div>

            {clientType === "juridica" && (
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" placeholder="https://www.empresa.com" />
              </div>
            )}
          </TabsContent>

          <TabsContent value="address" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" placeholder="00000-000" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="street">Logradouro</Label>
                <Input id="street" placeholder="Rua, Avenida, etc." />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="number">Número</Label>
                <Input id="number" placeholder="123" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input id="complement" placeholder="Apto, Sala, etc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input id="neighborhood" placeholder="Centro" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" placeholder="São Paulo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SP">SP</SelectItem>
                    <SelectItem value="RJ">RJ</SelectItem>
                    <SelectItem value="MG">MG</SelectItem>
                    <SelectItem value="RS">RS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="commercial" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="credit-limit">Limite de Crédito (R$)</Label>
                <Input id="credit-limit" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-terms">Condições de Pagamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione as condições" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vista">À Vista</SelectItem>
                    <SelectItem value="30dd">30 dias</SelectItem>
                    <SelectItem value="60dd">60 dias</SelectItem>
                    <SelectItem value="30-60dd">30/60 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="discount">Desconto Padrão (%)</Label>
                <Input id="discount" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sales-rep">Representante de Vendas</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um representante" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joao">João Silva</SelectItem>
                    <SelectItem value="maria">Maria Santos</SelectItem>
                    <SelectItem value="pedro">Pedro Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observations">Observações</Label>
              <Textarea id="observations" placeholder="Observações sobre o cliente..." />
            </div>
          </TabsContent>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline">Cancelar</Button>
            <Button>Salvar Cliente</Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
