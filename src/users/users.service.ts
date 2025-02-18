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

  async create(CreateUserDto: CreateUserDto) {
    const dados = await this.prisma.user.create({ data: { ...CreateUserDto } });

    return {
      dados,
      mensagem: 'Tudo certo! Registro criado com sucesso!'
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const dados = await this.prisma.user.update({ where: { id }, data: { ...updateUserDto } });

    return {
      dados,
      mensagem: "Tudo certo! Registro alterado com sucesso!"
    }

  }

  async delete(id: number) {
    await this.prisma.user.delete({ where: { id } });
    return { message: 'Registro removido com sucesso' }
  }
}
