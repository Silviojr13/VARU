import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";

async function ensureSupplierColumnsExist() {
  try {
    // Try to add all missing columns if they don't exist
    const columnsToAdd = [
      'mobile TEXT',
      'address TEXT',
      'city TEXT',
      'state TEXT',
      'zip_code TEXT',
      'is_active INTEGER NOT NULL DEFAULT 1',
      'updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP'
    ];
    
    for (const column of columnsToAdd) {
      try {
        await prisma.$executeRawUnsafe(`ALTER TABLE "Supplier" ADD COLUMN ${column}`);
        console.log(`Column ${column} added successfully`);
      } catch (error) {
        // Column might already exist, which is fine
        console.log(`Column ${column} already exists or error occurred:`, error);
      }
    }
  } catch (error) {
    console.error("Error ensuring supplier columns exist:", error);
  }
}

export async function GET() {
  try {
    // Ensure all required columns exist
    await ensureSupplierColumnsExist();
    
    const suppliers = await prisma.supplier.findMany({
      select: {
        id: true,
        name: true,
        cnpj: true,
        contactName: true,
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
    
    return NextResponse.json(suppliers);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao buscar fornecedores" }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const supplier = await prisma.supplier.create({
      data: {
        name: body.name,
        cnpj: body.cnpj,
        contactName: body.contactName,
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
    
    return NextResponse.json(supplier);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao criar fornecedor" }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    const supplier = await prisma.supplier.update({
      where: { id: body.id },
      data: {
        name: body.name,
        cnpj: body.cnpj,
        contactName: body.contactName,
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
    
    return NextResponse.json(supplier);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao atualizar fornecedor" }, 
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
        { error: "ID do fornecedor é obrigatório" }, 
        { status: 400 }
      );
    }
    
    await prisma.supplier.delete({
      where: { id: parseInt(id) }
    });
    
    return NextResponse.json({ message: "Fornecedor excluído com sucesso" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao excluir fornecedor" }, 
      { status: 500 }
    );
  }
}