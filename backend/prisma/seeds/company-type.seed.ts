export const InitCompanyTypes = async (prismaClient: any) => {
  await prismaClient.company_type.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, typeName: 'Microenterprise: 1 to 9 employees' },
  });
  await prismaClient.company_type.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, typeName: 'Small business: 10 to 49 employees' },
  });
  await prismaClient.company_type.upsert({
    where: { id: 3 },
    update: {},
    create: { id: 3, typeName: 'Medium-sized company 50 to 249 employees' },
  });
  await prismaClient.company_type.upsert({
    where: { id: 4 },
    update: {},
    create: { id: 4, typeName: 'Large company:250 or more employees' },
  });
};
