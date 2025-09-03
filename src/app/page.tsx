"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  Settings,
  ChevronDown,
  Home,
  Package,
  ArrowLeftRight,
  Users,
  Truck,
  ClipboardList,
  RefreshCcw,
  Search,
} from "lucide-react";

/**
 * Drop this file as src/app/page.tsx or components/AppShell.tsx
 * Requires: tailwind, shadcn/ui, lucide-react. See chat for setup steps.
 */

const nav = [
  { label: "Dashboard", href: "/", icon: Home },
  { label: "Produtos", href: "/produtos", icon: Package },
  { label: "Movimentações", href: "/movimentacoes", icon: ArrowLeftRight },
  { label: "Fornecedores", href: "/fornecedores", icon: Truck },
  { label: "Clientes", href: "/clientes", icon: Users },
  { label: "Relatórios", href: "/relatorios", icon: ClipboardList },
];

export default function AppShell() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid grid-cols-[220px_1fr] grid-rows-[64px_1fr] min-h-screen">
        {/* Sidebar */}
        <aside className="row-span-2 bg-slate-800 text-slate-100 dark:bg-slate-900">
          <div className="h-16 px-4 flex items-center gap-3 border-b border-slate-700/60">
            <div className="h-9 w-9 rounded-full bg-white/90 grid place-items-center font-bold text-slate-800 shadow-sm select-none">
              LOG
            </div>
            <div className="flex-1">
              <div className="text-sm leading-tight">Empresa 01</div>
              <button className="inline-flex items-center text-xs text-slate-300 hover:text-white transition">
                selecionar <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-64px)]">
            <nav className="p-3 space-y-1">
              {nav.map((item) => (
                <NavItem key={item.href} href={item.href} icon={item.icon}>
                  {item.label}
                </NavItem>
              ))}
            </nav>
          </ScrollArea>
        </aside>

        {/* Topbar */}
        <header className="h-16 bg-slate-200/70 dark:bg-slate-200/60 flex items-center gap-3 px-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <RefreshCcw className="h-5 w-5" />
            <span className="sr-only">Atualizar</span>
          </Button>
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Pesquisar . . ." className="pl-9 bg-white" />
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-full"><Bell className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full"><Settings className="h-5 w-5" /></Button>
            <Separator orientation="vertical" className="mx-2 h-6" />
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://avatars.githubusercontent.com/u/1?v=4" alt="Usuário" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="text-muted-foreground">Seu conteúdo vai aqui…</div>
        </main>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname?.startsWith(href));
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
        active
          ? "bg-slate-700/70 text-white"
          : "text-slate-300 hover:text-white hover:bg-slate-700/50"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="truncate">{children}</span>
    </Link>
  );
}
