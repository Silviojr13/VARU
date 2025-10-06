"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, FileText, Download } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function ReportGenerator() {
  const [reportType, setReportType] = useState("")
  const [exportFormat, setExportFormat] = useState("pdf")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const reportTypes = [
    { value: "inventory", label: "Relatório de Estoque" },
    { value: "financial", label: "Relatório Financeiro" },
    { value: "suppliers", label: "Relatório de Fornecedores" },
    { value: "clients", label: "Relatório de Clientes" },
    { value: "movements", label: "Relatório de Movimentações" },
    { value: "abc-analysis", label: "Análise ABC" },
  ]

  const filterOptions = [
    { id: "low-stock", label: "Produtos em baixo estoque" },
    { id: "expired", label: "Produtos vencidos" },
    { id: "high-value", label: "Produtos de alto valor" },
    { id: "top-suppliers", label: "Principais fornecedores" },
    { id: "top-clients", label: "Principais clientes" },
    { id: "recent-movements", label: "Movimentações recentes" },
  ]

  const handleFilterChange = (filterId: string, checked: boolean) => {
    if (checked) {
      setSelectedFilters([...selectedFilters, filterId])
    } else {
      setSelectedFilters(selectedFilters.filter((id) => id !== filterId))
    }
  }

  const generateReportData = () => {
    const baseData = {
      reportType,
      startDate: startDate ? format(startDate, "dd/MM/yyyy") : "N/A",
      endDate: endDate ? format(endDate, "dd/MM/yyyy") : "N/A",
      generatedAt: format(new Date(), "dd/MM/yyyy HH:mm"),
      filters: selectedFilters,
    }

    switch (reportType) {
      case "inventory":
        return {
          ...baseData,
          title: "Relatório de Estoque",
          data: [
            {
              codigo: "P001",
              produto: "Notebook Dell",
              categoria: "Eletrônicos",
              estoque: 15,
              minimo: 5,
              valor: "R$ 2.500,00",
            },
            {
              codigo: "P002",
              produto: "Mouse Logitech",
              categoria: "Periféricos",
              estoque: 3,
              minimo: 10,
              valor: "R$ 89,90",
            },
            {
              codigo: "P003",
              produto: "Teclado Mecânico",
              categoria: "Periféricos",
              estoque: 8,
              minimo: 5,
              valor: "R$ 299,00",
            },
            {
              codigo: "P004",
              produto: 'Monitor 24"',
              categoria: "Eletrônicos",
              estoque: 12,
              minimo: 3,
              valor: "R$ 899,00",
            },
          ],
        }
      case "financial":
        return {
          ...baseData,
          title: "Relatório Financeiro",
          data: [
            {
              data: "01/12/2024",
              tipo: "Entrada",
              valor: "R$ 15.000,00",
              documento: "NF-001",
              fornecedor: "Tech Solutions",
            },
            { data: "02/12/2024", tipo: "Saída", valor: "R$ 3.500,00", documento: "VD-001", cliente: "Empresa ABC" },
            {
              data: "03/12/2024",
              tipo: "Entrada",
              valor: "R$ 8.900,00",
              documento: "NF-002",
              fornecedor: "Digital Store",
            },
          ],
        }
      case "movements":
        return {
          ...baseData,
          title: "Relatório de Movimentações",
          data: [
            {
              data: "01/12/2024",
              produto: "Notebook Dell",
              tipo: "Entrada",
              quantidade: 10,
              responsavel: "João Silva",
            },
            {
              data: "02/12/2024",
              produto: "Mouse Logitech",
              tipo: "Saída",
              quantidade: 5,
              responsavel: "Maria Santos",
            },
            {
              data: "03/12/2024",
              produto: "Teclado Mecânico",
              tipo: "Entrada",
              quantidade: 15,
              responsavel: "Pedro Costa",
            },
          ],
        }
      default:
        return {
          ...baseData,
          title: "Relatório Personalizado",
          data: [],
        }
    }
  }

  // Defina tipos específicos para os dados do relatório
  type InventoryData = {
    codigo: string
    produto: string
    categoria: string
    estoque: number
    minimo: number
    valor: string
  }

  type FinancialData = {
    data: string
    tipo: string
    valor: string
    documento: string
    fornecedor?: string
    cliente?: string
  }

  type MovementsData = {
    data: string
    produto: string
    tipo: string
    quantidade: number
    responsavel: string
  }

  type ReportData = {
    title: string
    data: InventoryData[] | FinancialData[] | MovementsData[] | Record<string, unknown>[]
    [key: string]: unknown
  }

  const exportToCSV = (data: ReportData) => {
    if (!data.data || data.data.length === 0) return

    const headers = Object.keys(data.data[0]).join(",")
    const rows = data.data.map((row) => Object.values(row).join(",")).join("\n")
    const csvContent = `${headers}\n${rows}`

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${data.title.replace(/\s+/g, "_")}_${format(new Date(), "ddMMyyyy")}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToExcel = (data: ReportData) => {
    if (!data.data || data.data.length === 0) return

    const headers = Object.keys(data.data[0]).join("\t")
    const rows = data.data.map((row) => Object.values(row).join("\t")).join("\n")
    const excelContent = `${headers}\n${rows}`

    const blob = new Blob([excelContent], { type: "application/vnd.ms-excel" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${data.title.replace(/\s+/g, "_")}_${format(new Date(), "ddMMyyyy")}.xlsx`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToPDF = (data: ReportData) => {
    const pdfContent = `
      ${data.title}
      Gerado em: ${data.generatedAt}
      Período: ${data.startDate} até ${data.endDate}
      
      ${data.data
        .map(
          (item, index) =>
            `${index + 1}. ${Object.entries(item)
              .map(([key, value]) => `${key}: ${value}`)
              .join(" | ")}`,
        )
        .join("\n")}
    `

    const blob = new Blob([pdfContent], { type: "application/pdf" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${data.title.replace(/\s+/g, "_")}_${format(new Date(), "ddMMyyyy")}.pdf`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleGenerateReport = async () => {
    setIsGenerating(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const reportData = generateReportData()

      console.log("[v0] Relatório gerado:", reportData)
      alert(`Relatório "${reportData.title}" gerado com sucesso!`)
    } catch (error) {
      console.error("[v0] Erro ao gerar relatório:", error)
      alert("Erro ao gerar relatório. Tente novamente.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadReport = () => {
    const reportData = generateReportData()

    switch (exportFormat) {
      case "csv":
        exportToCSV(reportData)
        break
      case "excel":
        exportToExcel(reportData)
        break
      case "pdf":
        exportToPDF(reportData)
        break
      default:
        exportToPDF(reportData)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerador de Relatórios Personalizado</CardTitle>
        <CardDescription>Configure e gere relatórios customizados</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="report-type">Tipo de Relatório</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de relatório" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="format">Formato de Exportação</Label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Data Inicial</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP", { locale: ptBR }) : "Selecionar data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>Data Final</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP", { locale: ptBR }) : "Selecionar data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Filtros Adicionais</Label>
          <div className="grid gap-3 md:grid-cols-2">
            {filterOptions.map((filter) => (
              <div key={filter.id} className="flex items-center space-x-2">
                <Checkbox
                  id={filter.id}
                  checked={selectedFilters.includes(filter.id)}
                  onCheckedChange={(checked) => handleFilterChange(filter.id, checked as boolean)}
                />
                <Label htmlFor={filter.id} className="text-sm font-normal">
                  {filter.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button className="flex-1 gap-2" disabled={!reportType || isGenerating} onClick={handleGenerateReport}>
            <FileText size={16} />
            {isGenerating ? "Gerando..." : "Gerar Relatório"}
          </Button>
          <Button
            variant="outline"
            className="gap-2 bg-transparent"
            disabled={!reportType}
            onClick={handleDownloadReport}
          >
            <Download size={16} />
            Baixar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
