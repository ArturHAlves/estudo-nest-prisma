import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateCarDto {
  @IsString()
  model: string;

  @IsBoolean()
  estacionado: boolean;

  @IsNumber()
  userId: number
}
