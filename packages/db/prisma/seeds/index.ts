import { PrismaClient } from '@prisma/client';
import { fakerCZ as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
	await prisma.user.deleteMany();
};

// eslint-disable-next-line no-console
main().catch(console.error);
