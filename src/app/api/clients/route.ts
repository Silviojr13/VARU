import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";

export async function GET() {
  try {
    const clients = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
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