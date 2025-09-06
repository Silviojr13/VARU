import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Eye, FileText } from "lucide-react"

const recentReports = [
  {
    id: "1",
    name: "Relatório de Estoque - Janeiro 2024",
    type: "Estoque",
    generatedAt: "2024-01-15 14:30",
    generatedBy: "João Silva",
    format: "PDF",
    size: "2.3 MB",
    status: "completed",
  },
  {
    id: "2",
    name: "Análise Financeira - Semana 2",
    type: "Financeiro",
    generatedAt: "2024-01-14 09:15",
    generatedBy: "Maria Santos",
    format: "Excel",
    size: "1.8 MB",
    status: "completed",
  },
  {
    id: "3",
    name: "Performance de Fornecedores - Dezembro",
    type: "Fornecedores",
    generatedAt: "2024-01-10 16:45",
    generatedBy: "Pedro Costa",
    format: "PDF",
    size: "3.1 MB",
    status: "completed",
  },
  {
    id: "4",
    name: "Movimentações - Últimos 7 dias",
    type: "Movimentações",
    generatedAt: "2024-01-15 11:20",
    generatedBy: "Ana Lima",
    format: "CSV",
    size: "856 KB",
    status: "generating",
  },
]

export function RecentReports() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatórios Recentes</CardTitle>
        <CardDescription>Últimos relatórios gerados no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Relatório</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Gerado em</TableHead>
                <TableHead>Por</TableHead>
                <TableHead>Formato</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-muted-foreground" />
                      <div>
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-muted-foreground">{report.size}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.type}</Badge>
                  </TableCell>
                  <TableCell>{report.generatedAt}</TableCell>
                  <TableCell>{report.generatedBy}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{report.format}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                      {report.status === "completed" ? "Concluído" : "Gerando..."}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" disabled={report.status !== "completed"}>
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="ghost" disabled={report.status !== "completed"}>
                        <Download size={14} />
                      </Button>
                    </div>
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
