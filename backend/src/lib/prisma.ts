import { PrismaClient } from '@prisma/client';

// Cria uma única instância do Prisma pra toda a aplicação
const prisma = new PrismaClient();

export default prisma;