import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCarDto } from './dto/create-store.dto';
import { UpdateCarDto } from './dto/update-store.dto';

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) { }

  async create(createCarDto: CreateCarDto) {
    const dados = await this.prisma.car.create({
      data: {
        ...createCarDto,
      },
    });

    return {
      dados,
      mensagem: "Tudo certo! Registro criado com sucesso!"
    }
  }

  async update(id: number, { estacionado }: UpdateCarDto) {
    const dados = await this.prisma.car.update({ where: { id }, data: { estacionado } });

    return {
      dados,
      mensagem: "Tudo certo! Registro alterado com sucesso!"
    }
  }

  findAll() {
    return this.prisma.car.findMany();
  }

  async findOne(id: number) {
    const car = await this.prisma.car.findUnique({ where: { id } });

    if (!car) {
      throw new NotFoundException('Carro não encontrado');
    }

    return car;
  }

  async remove(id: number) {
    await this.prisma.car.delete({ where: { id } });
    return { message: 'Registro removido com sucesso' }
  }

  async updateParkingStatus(estacionado: boolean) {
    await this.prisma.car.updateMany({ data: { estacionado } });
    return { message: "Tudo certo! Registro alterado com sucesso!" }
  }
}
