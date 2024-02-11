import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const MAX_QUANTITY_PRODUCTS = 100;

function getPhotoLink(number: number): string {
  return `img/content/catalog-product-${number}.png`;
}

function getType(number: number): string {
  const guitarTypes = ['электро', 'акустика', 'укулеле'];
  return guitarTypes[number];
}

function getStrings(number: number): number {
  const strings = [4, 6, 7, 12];
  return strings[number];
}

function getProduct() {
  return {
    id: faker.string.uuid(),
    name: faker.lorem.word({ length: { min: 6, max: 12 } }),
    description: faker.lorem.text(),
    photo: getPhotoLink(faker.number.int({ min: 0, max: 8 })),
    type: getType(faker.number.int({ min: 0, max: 2 })),
    article: faker.string.alphanumeric({ length: { min: 5, max: 40 } }),
    strings: getStrings(faker.number.int({ min: 0, max: 3 })),
    price: faker.number.int({ min: 100, max: 1000000 }),
  };
}

async function seedDb(prismaClient: PrismaClient) {
  for (let i = 0; i < MAX_QUANTITY_PRODUCTS; i++) {
    const product = getProduct();
    await prismaClient.products.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        photo: product.photo,
        type: product.type,
        article: product.article,
        strings: product.strings,
        price: product.price,
      },
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
