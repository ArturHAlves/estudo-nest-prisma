
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCarDto } from './dto/create-store.dto';
import { UpdateCarDto } from './dto/update-store.dto';
@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) { }

  create(createCarDto: CreateCarDto) {
    return this.prisma.car.create({ data: { ...createCarDto } });
  }

  update(id: number, { estacionado }: UpdateCarDto) {
    return this.prisma.car.update({ where: { id }, data: { estacionado } });
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

  remove(id: number) {
    return this.prisma.car.delete({ where: { id } });
  }

  updateParkingStatus(estacionado: boolean) {
    return this.prisma.car.updateMany({ data: { estacionado } });
  }
}
