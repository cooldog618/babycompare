import { PrismaClient, ProductSource } from '@prisma/client';
import { DEMO_PRODUCTS, getCategoryPath } from './demo-products';

const prisma = new PrismaClient();

async function main() {
  for (const item of DEMO_PRODUCTS) {
    await prisma.product.upsert({
      where: {
        source_externalId: {
          source: ProductSource.DEMO,
          externalId: item.externalId
        }
      },
      create: {
        source: ProductSource.DEMO,
        externalId: item.externalId,
        title: item.title,
        brand: item.brand,
        maker: item.maker,
        category1: item.category1,
        category2: item.category2,
        category3: item.category3,
        category4: item.category4,
        categoryPath: getCategoryPath(item),
        price: item.price,
        imageUrl: item.imageUrl,
        productUrl: item.productUrl,
        seller: item.seller,
        rating: item.rating,
        reviewCount: item.reviewCount,
        description: item.description,
        isVisible: true
      },
      update: {
        title: item.title,
        brand: item.brand,
        maker: item.maker,
        category1: item.category1,
        category2: item.category2,
        category3: item.category3,
        category4: item.category4,
        categoryPath: getCategoryPath(item),
        price: item.price,
        imageUrl: item.imageUrl,
        productUrl: item.productUrl,
        seller: item.seller,
        rating: item.rating,
        reviewCount: item.reviewCount,
        description: item.description,
        isVisible: true,
        lastSyncedAt: new Date()
      }
    });
  }

  console.log(`Seeded ${DEMO_PRODUCTS.length} demo products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
