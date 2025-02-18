import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Car } from '@prisma/client';
import { CreateUserDto } from './dto/create-store.dto';
import { UpdateUserDto } from './dto/update-store.dto';
import { ResponseFormat } from 'src/common/types/response-format-type';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<ResponseFormat<(User & { cars: Car[] })[]>> {
    const dados = await this.prisma.user.findMany({
      include: {
        cars: true,
      }
    })

    return {
      dados,
      mensagem: "Psiuu! Acabamos de retornar os registros para você! ;)"
    }

  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id }, include: { cars: true } });

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado`);
    }

    return user;
  }

  async create(CreateUserDto: CreateUserDto): Promise<ResponseFormat<User>> {
    const dados = await this.prisma.user.create({ data: { ...CreateUserDto } });

    return {
      dados,
      mensagem: 'Tudo certo! Registro criado com sucesso!'
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<ResponseFormat<User>> {
    const dados = await this.prisma.user.update({ where: { id }, data: { ...updateUserDto } });

    return {
      dados,
      mensagem: "Tudo certo! Registro alterado com sucesso!"
    }

  }

  async delete(id: number): Promise<ResponseFormat<boolean>> {
    await this.prisma.user.delete({ where: { id } });
    return {
      dados: true,
      mensagem: "Tudo certo! Registro removido com sucesso!"
    }
  }
}
