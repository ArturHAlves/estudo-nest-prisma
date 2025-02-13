import { IsBoolean } from 'class-validator';

export class UpdateParkingCarDto {
  @IsBoolean()
  estacionado: boolean;
}
