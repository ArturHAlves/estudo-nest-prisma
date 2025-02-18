import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCarDto } from './dto/create-store.dto';
import { UpdateCarDto } from './dto/update-store.dto';

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, createCarDto: CreateCarDto) {
    return this.prisma.car.create({
      data: {
        ...createCarDto,    
        userId: userId,
      },
    });
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return this.prisma.car.update({ where: { id }, data: { estacionado: updateCarDto.estacionado } });
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
    return this.prisma.car.updateMany({
      data: { estacionado },
    });
  }
}
