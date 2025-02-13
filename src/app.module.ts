import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { CarsModule } from './cars/cars.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [UsersModule, CarsModule, StoreModule],
  providers: [PrismaService],
})
export class AppModule {}
