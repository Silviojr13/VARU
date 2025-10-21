import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";

async function ensureInventoryMovementColumnsExist() {
  try {
    // Try to add all missing columns if they don't exist
    const columnsToAdd = [
      'client_id TEXT',
      'supplier_id INTEGER',
      'notes TEXT',
      'updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP'
    ];
    
    for (const column of columnsToAdd) {
      try {
        await prisma.$executeRawUnsafe(`ALTER TABLE "InventoryMovement" ADD COLUMN ${column}`);
        console.log(`Column ${column} added successfully`);
      } catch (error) {
        // Column might already exist, which is fine
        console.log(`Column ${column} already exists or error occurred:`, error);
      }
    }
  } catch (error) {
    console.error("Error ensuring inventory movement columns exist:", error);
  }
}

export async function GET() {
  try {
    // Ensure all required columns exist
    await ensureInventoryMovementColumnsExist();
    
    const movements = await prisma.inventoryMovement.findMany({
      select: {
        id: true,
        productId: true,
        warehouseId: true,
        typeId: true,
        clientId: true,
        supplierId: true,
        quantity: true,
        unitCost: true,
        docRef: true,
        nfeId: true,
        occurredAt: true,
        createdBy: true,
        notes: true,
        createdAt: true,
        product: {
          select: {
            name: true,
            sku: true,
          }
        },
        warehouse: {
          select: {
            name: true,
            code: true,
          }
        },
        type: {
          select: {
            name: true,
            code: true,
            direction: true,
          }
        },
        client: {
          select: {
            name: true,
          }
        },
        supplier: {
          select: {
            name: true,
          }
        },
        user: {
          select: {
            name: true,
          }
        },
      },
      orderBy: {
        occurredAt: 'desc',
      }
    });
    
    return NextResponse.json(movements);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao buscar movimentações" }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Get the current user ID (in a real app, this would come from auth)
    const userId = "user-id"; // Placeholder
    
    // Helper function to safely parse integers
    const safeParseInt = (value: any): number | null => {
      if (value === null || value === undefined || value === "" || isNaN(parseInt(value))) {
        return null;
      }
      return parseInt(value);
    };
    
    // Helper function to safely parse floats
    const safeParseFloat = (value: any): number | null => {
      if (value === null || value === undefined || value === "" || isNaN(parseFloat(value))) {
        return null;
      }
      return parseFloat(value);
    };
    
    // Prepare the data object with required fields
    const data: any = {
      quantity: safeParseFloat(body.quantity) || 0,
      occurredAt: body.occurredAt ? new Date(body.occurredAt) : new Date(),
      createdBy: userId,
    };
    
    // Add required fields with default values if not provided
    data.productId = safeParseInt(body.productId) || 1;
    data.warehouseId = safeParseInt(body.warehouseId) || 1;
    data.typeId = safeParseInt(body.typeId) || 1;
    
    // Add optional fields if they exist
    const supplierId = safeParseInt(body.supplierId);
    if (supplierId !== null) {
      data.supplierId = supplierId;
    }
    
    const nfeId = safeParseInt(body.nfeId);
    if (nfeId !== null) {
      data.nfeId = nfeId;
    }
    
    if (body.clientId) {
      data.clientId = body.clientId;
    }
    
    if (body.unitCost !== undefined && body.unitCost !== null && body.unitCost !== "") {
      data.unitCost = safeParseFloat(body.unitCost);
    }
    
    if (body.docRef) {
      data.docRef = body.docRef;
    }
    
    if (body.notes) {
      data.notes = body.notes;
    }
    
    // Try to create the movement with the provided data
    const movement = await prisma.inventoryMovement.create({
      data
    });
    
    return NextResponse.json(movement);
  } catch (err: any) {
    console.error(err);
    
    // Check if it's a foreign key constraint error
    if (err.message && err.message.includes('FOREIGN KEY constraint failed')) {
      return NextResponse.json(
        { 
          error: "Erro ao criar movimentação", 
          details: "Não foi possível criar a movimentação devido a restrições de chave estrangeira. Certifique-se de que os IDs de produto, armazém e tipo de movimentação existem no sistema."
        }, 
        { status: 400 }
      );
    }
    
    // Return more detailed error information
    return NextResponse.json(
      { error: "Erro ao criar movimentação", details: err.message }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Helper function to safely parse integers
    const safeParseInt = (value: any): number | null => {
      if (value === null || value === undefined || value === "" || isNaN(parseInt(value))) {
        return null;
      }
      return parseInt(value);
    };
    
    // Helper function to safely parse floats
    const safeParseFloat = (value: any): number | null => {
      if (value === null || value === undefined || value === "" || isNaN(parseFloat(value))) {
        return null;
      }
      return parseFloat(value);
    };
    
    const movement = await prisma.inventoryMovement.update({
      where: { id: safeParseInt(body.id) || 0 },
      data: {
        productId: safeParseInt(body.productId) || 0,
        warehouseId: safeParseInt(body.warehouseId) || 0,
        typeId: safeParseInt(body.typeId) || 0,
        clientId: body.clientId || null,
        supplierId: safeParseInt(body.supplierId),
        quantity: safeParseFloat(body.quantity) || 0,
        unitCost: safeParseFloat(body.unitCost),
        docRef: body.docRef,
        nfeId: safeParseInt(body.nfeId),
        occurredAt: new Date(body.occurredAt),
        notes: body.notes,
      }
    });
    
    return NextResponse.json(movement);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao atualizar movimentação" }, 
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
        { error: "ID da movimentação é obrigatório" }, 
        { status: 400 }
      );
    }
    
    await prisma.inventoryMovement.delete({
      where: { id: parseInt(id) }
    });
    
    return NextResponse.json({ message: "Movimentação excluída com sucesso" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao excluir movimentação" }, 
      { status: 500 }
    );
  }
}