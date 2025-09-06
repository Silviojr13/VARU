"use client"

import { Search, Bell, Settings, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-card border-b border-border">
      {/* Company Selector */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <span>Empresa 01</span>
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Empresa 01</DropdownMenuItem>
            <DropdownMenuItem>Empresa 02</DropdownMenuItem>
            <DropdownMenuItem>Empresa 03</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input placeholder="Pesquisar..." className="pl-10 bg-input border-border" />
        </div>
      </div>

      {/* User Controls */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings size={20} />
        </Button>
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center ml-2">
          <span className="text-primary-foreground text-sm font-medium">A</span>
        </div>
      </div>
    </header>
  )
}
