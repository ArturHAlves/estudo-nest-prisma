import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Car } from '@prisma/client';
import { CreateUserDto } from './dto/create-store.dto';
import { UpdateUserDto } from './dto/update-store.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  findAll(): Promise<(User & { cars: Car[] })[]> {
    return this.prisma.user.findMany({
      include: {
        cars: true,
      }
    })
  }

  findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id }, include: { cars: true } });
  }

  create(CreateUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: { ...CreateUserDto } });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: { ...updateUserDto } });
  }

  delete(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
