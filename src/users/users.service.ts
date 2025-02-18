import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-store.dto';
import { UpdateUserDto } from './dto/update-store.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        cars: true,
      }
    })
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id }, include: { cars: true } });

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado`);
    }

    return user;
  }

  create(CreateUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: CreateUserDto });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
