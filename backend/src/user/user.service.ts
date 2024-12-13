import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDTO } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: UserDTO) {
    // check user existance
    const exist = await this.prisma.user.findUnique({
      where: { email: createUserDto?.email },
    });
    if (exist) {
      throw new NotFoundException('User already registered !');
    }

    let userData = plainToClass(UserDTO, createUserDto);
    // hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData = {
      ...userData,
      password: hashedPassword,
    };
    // create user
    const createdUser = await this.prisma.user.create({
      data: {
        ...userData,
        disponibility: userData?.disponibility
          ? {
              create: userData?.disponibility,
            }
          : undefined,
      } as any,
      include: {
        disponibility: true,
      },
    });
    delete createdUser?.password;
    return createdUser;
  }

  async findAll(): Promise<any> {
    const users = await this.prisma.user.findMany();
    const data = await users?.map((user: any)=> delete user?.password)
    return data;
  }

  async findOne(id: number): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User Not Found !');
    }
    delete user?.password;
    return user;
  }

  async updateUser(id: number, userDto: UserDTO): Promise<any> {
    if (userDto?.password) {
      const hashedPassword = await bcrypt.hash(userDto?.password, 10);
      userDto = {
        ...userDto,
        password: hashedPassword,
      };
    } else {
      delete userDto.password;
    }
    const data = await this.prisma.user.update({
      where: { id },
      data: {
        ...userDto,
        disponibility: userDto?.disponibility
          ? {
              update: userDto?.disponibility,
            }
          : undefined,
      } as any,
      include: {
        disponibility: true,
      },
    });
    delete data?.password;
    return data;
  }

  async removeUser(id: number): Promise<any> {
    const user: any = await this.findOne(id);
    if (!user) throw new HttpException('User not found !', 400);
    const deletedUser = await this.prisma.user.delete({ where: { id } });
    delete deletedUser?.password;
    return deletedUser;
  }
}
