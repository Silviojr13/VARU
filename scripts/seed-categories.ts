import prisma from "../src/lib/prisma";

async function main() {
  console.log("Seeding categories...");
  
  const categories = [
    { name: "Eletrônicos" },
    { name: "Periféricos" },
    { name: "Escritório" },
    { name: "Móveis" },
    { name: "Limpeza" },
    { name: "Alimentação" },
    { name: "Vestuário" },
    { name: "Brinquedos" },
  ];

  for (const category of categories) {
    const existingCategory = await prisma.category.findUnique({
      where: { name: category.name },
    });

    if (!existingCategory) {
      await prisma.category.create({
        data: category,
      });
      console.log(`Created category: ${category.name}`);
    } else {
      console.log(`Category already exists: ${category.name}`);
    }
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });