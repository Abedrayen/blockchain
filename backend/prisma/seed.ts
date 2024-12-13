import { PrismaClient } from '@prisma/client';
import { InitUserRoles } from './seeds/user-role.seed';
import { InitCompanyTypes } from './seeds/company-type.seed';
import { InitArticles } from './seeds/articles.seed';
import { InitOrderStatuses } from './seeds/order-statuses.seed';
import { InitCarTypes } from './seeds/car-types.seed';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create one dummy article
  await InitArticles(prisma);
  // INIT ROLES
  await InitUserRoles(prisma);
  // INIT ROLES
  await InitCompanyTypes(prisma);
  // INIT order statuses
  await InitOrderStatuses(prisma);
  // INIT car types
  await InitCarTypes(prisma);
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
