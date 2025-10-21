import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";

async function ensureClientTableExists() {
  try {
    // Try to create the Client table if it doesn't exist
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Client" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "cpf_cnpj" TEXT,
        "email" TEXT,
        "phone" TEXT,
        "mobile" TEXT,
        "address" TEXT,
        "city" TEXT,
        "state" TEXT,
        "zip_code" TEXT,
        "is_active" INTEGER NOT NULL DEFAULT 1,
        "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" DATETIME NOT NULL
      )
    `);
    
    // Create indexes if they don't exist
    try {
      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "Client_cpf_cnpj_key" ON "Client"("cpf_cnpj")
      `);
    } catch (error) {
      console.log("Index Client_cpf_cnpj_key already exists or error occurred:", error);
    }
    
    try {
      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "Client_email_key" ON "Client"("email")
      `);
    } catch (error) {
      console.log("Index Client_email_key already exists or error occurred:", error);
    }
    
    console.log("Client table ensured to exist");
  } catch (error) {
    console.error("Error ensuring Client table exists:", error);
  }
}

export async function GET() {
  try {
    // Ensure the Client table exists
    await ensureClientTableExists();
    
    const clients = await prisma.client.findMany({
      select: {
        id: true,
        name: true,
        cpfCnpj: true,
        email: true,
        phone: true,
        mobile: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        isActive: true,
        createdAt: true,
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const client = await prisma.client.create({
      data: {
        id: body.id,
        name: body.name,
        cpfCnpj: body.cpfCnpj,
        email: body.email,
        phone: body.phone,
        mobile: body.mobile,
        address: body.address,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        isActive: body.isActive ?? 1,
      }
    });
    
    return NextResponse.json(client);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao criar cliente" }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    const client = await prisma.client.update({
      where: { id: body.id },
      data: {
        name: body.name,
        cpfCnpj: body.cpfCnpj,
        email: body.email,
        phone: body.phone,
        mobile: body.mobile,
        address: body.address,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        isActive: body.isActive,
      }
    });
    
    return NextResponse.json(client);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao atualizar cliente" }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "ID do cliente é obrigatório" }, 
        { status: 400 }
      );
    }
    
    await prisma.client.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: "Cliente excluído com sucesso" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao excluir cliente" }, 
      { status: 500 }
    );
  }
}