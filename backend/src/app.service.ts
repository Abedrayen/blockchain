import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getAllCompanyTypes() {
    const companyTypes = await this.prisma.company_type.findMany();
    return { company_types: companyTypes };
  }
}
