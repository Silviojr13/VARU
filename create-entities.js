const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createEntities() {
  try {
    // Create a default category
    const category = await prisma.category.create({
      data: {
        name: 'Default Category'
      }
    });
    console.log('Category created:', category);

    // Create a default unit
    const unit = await prisma.unit.create({
      data: {
        code: 'UN',
        description: 'Unidade'
      }
    });
    console.log('Unit created:', unit);

    // Create a default warehouse
    const warehouse = await prisma.warehouse.create({
      data: {
        code: 'WH001',
        name: 'Default Warehouse'
      }
    });
    console.log('Warehouse created:', warehouse);

    // Create a default movement type
    const movementType = await prisma.movementType.create({
      data: {
        code: 'DEFAULT',
        name: 'Default Movement',
        direction: 1
      }
    });
    console.log('MovementType created:', movementType);

    // Create a default product
    const product = await prisma.product.create({
      data: {
        sku: 'DEFAULT001',
        name: 'Default Product',
        categoryId: category.id,
        unitId: unit.id,
        minStock: 0,
        active: 1
      }
    });
    console.log('Product created:', product);
  } catch (error) {
    console.error('Error creating entities:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createEntities();