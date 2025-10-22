import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        sku: true,
        description: true,
        brand: true,
        categoryId: true,
        unitId: true,
        minStock: true,
        currentStock: true,
        location: true,
        costPrice: true,
        salePrice: true,
        profitMargin: true,
        ncm: true,
        gtin: true,
        active: true,
        createdAt: true,
        category: { select: { id: true, name: true } },
        unit: { select: { id: true, code: true } },
      }
    });
    
    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Extract fields from the request body
    const {
      name,
      sku,
      description,
      brand,
      categoryId,
      unitId,
      minStock,
      initialStock,
      location,
      costPrice,
      salePrice,
      profitMargin,
      ncm,
      gtin,
    } = body;
    
    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: "Nome do produto é obrigatório" }, 
        { status: 400 }
      );
    }
    
    if (!categoryId) {
      return NextResponse.json(
        { error: "Categoria é obrigatória" }, 
        { status: 400 }
      );
    }
    
    if (initialStock === undefined || initialStock === null || initialStock === "") {
      return NextResponse.json(
        { error: "Quantidade inicial do estoque é obrigatória" }, 
        { status: 400 }
      );
    }
    
    if (minStock === undefined || minStock === null || minStock === "") {
      return NextResponse.json(
        { error: "Estoque mínimo é obrigatório" }, 
        { status: 400 }
      );
    }
    
    if (!location) {
      return NextResponse.json(
        { error: "Localização é obrigatória" }, 
        { status: 400 }
      );
    }
    
    if (costPrice === undefined || costPrice === null || costPrice === "") {
      return NextResponse.json(
        { error: "Preço de custo é obrigatório" }, 
        { status: 400 }
      );
    }
    
    if (salePrice === undefined || salePrice === null || salePrice === "") {
      return NextResponse.json(
        { error: "Preço de venda é obrigatório" }, 
        { status: 400 }
      );
    }
    
    // Check if SKU already exists (if provided)
    if (sku) {
      const existingProduct = await prisma.product.findUnique({
        where: { sku }
      });
      
      if (existingProduct) {
        return NextResponse.json(
          { error: "Já existe um produto com este SKU" }, 
          { status: 400 }
        );
      }
    }
    
    // Generate SKU if not provided
    const productSku = sku || `SKU${Date.now()}`;
    
    // Create the product
    const product = await prisma.product.create({
      data: {
        name,
        sku: productSku,
        description: description || null,
        brand: brand || null,
        categoryId: parseInt(categoryId),
        unitId: parseInt(unitId) || 1, // Default to first unit if not provided
        minStock: parseFloat(minStock),
        currentStock: parseFloat(initialStock),
        location: location || null,
        costPrice: parseFloat(costPrice),
        salePrice: parseFloat(salePrice),
        profitMargin: profitMargin ? parseFloat(profitMargin) : null,
        ncm: ncm || null,
        gtin: gtin || null,
        active: 1, // Default to active
      }
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao criar produto" }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: "ID do produto é obrigatório" }, 
        { status: 400 }
      );
    }
    
    // Validate required fields for update
    if (updateData.name === "") {
      return NextResponse.json(
        { error: "Nome do produto é obrigatório" }, 
        { status: 400 }
      );
    }
    
    if (updateData.categoryId === "") {
      return NextResponse.json(
        { error: "Categoria é obrigatória" }, 
        { status: 400 }
      );
    }
    
    if (updateData.initialStock === "" || updateData.initialStock === undefined) {
      return NextResponse.json(
        { error: "Quantidade inicial do estoque é obrigatória" }, 
        { status: 400 }
      );
    }
    
    if (updateData.minStock === "" || updateData.minStock === undefined) {
      return NextResponse.json(
        { error: "Estoque mínimo é obrigatório" }, 
        { status: 400 }
      );
    }
    
    if (updateData.location === "") {
      return NextResponse.json(
        { error: "Localização é obrigatória" }, 
        { status: 400 }
      );
    }
    
    if (updateData.costPrice === "" || updateData.costPrice === undefined) {
      return NextResponse.json(
        { error: "Preço de custo é obrigatório" }, 
        { status: 400 }
      );
    }
    
    if (updateData.salePrice === "" || updateData.salePrice === undefined) {
      return NextResponse.json(
        { error: "Preço de venda é obrigatório" }, 
        { status: 400 }
      );
    }
    
    // Convert string values to appropriate types
    if (updateData.categoryId) {
      updateData.categoryId = parseInt(updateData.categoryId);
    }
    if (updateData.unitId) {
      updateData.unitId = parseInt(updateData.unitId);
    }
    if (updateData.minStock !== undefined) {
      updateData.minStock = parseFloat(updateData.minStock);
    }
    if (updateData.initialStock !== undefined) {
      updateData.currentStock = parseFloat(updateData.initialStock);
      delete updateData.initialStock; // Remove initialStock as we're using currentStock in the database
    }
    if (updateData.costPrice !== undefined) {
      updateData.costPrice = parseFloat(updateData.costPrice);
    }
    if (updateData.salePrice !== undefined) {
      updateData.salePrice = parseFloat(updateData.salePrice);
    }
    if (updateData.profitMargin !== undefined) {
      updateData.profitMargin = updateData.profitMargin ? parseFloat(updateData.profitMargin) : null;
    }
    
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: updateData
    });
    
    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao atualizar produto" }, 
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
        { error: "ID do produto é obrigatório" }, 
        { status: 400 }
      );
    }
    
    await prisma.product.delete({
      where: { id: parseInt(id) }
    });
    
    return NextResponse.json({ message: "Produto excluído com sucesso" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao excluir produto" }, 
      { status: 500 }
    );
  }
}