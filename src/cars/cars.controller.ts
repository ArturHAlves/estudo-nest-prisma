import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-store.dto';
import { UpdateCarDto } from './dto/update-store.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post(':userId')
  create(@Param('userId') userId: string, @Body() createCarDto: CreateCarDto) {
    return this.carsService.create(Number(userId), createCarDto);
  }

  @Patch('parking-status')
  updateParkingStatus(@Body() body: { estacionado: boolean }) {
    console.log('TESTE')
    return this.carsService.updateParkingStatus(body.estacionado);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(Number(id), updateCarDto);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(Number(id));
  }
}
