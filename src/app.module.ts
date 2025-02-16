import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [UsersModule, CarsModule],
  providers: [PrismaService],
})
export class AppModule {}
