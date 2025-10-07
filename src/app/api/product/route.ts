import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";

export async function GET() {
  try {
    const clients = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        category: { select: { name: true } },
        sku: true,
        unit: { select: { code: true } },
        minStock: true,
        active: true,
      }
    });
    
    return NextResponse.json(clients);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao buscar clientes" }, 
      { status: 500 }
    );
  }
} 