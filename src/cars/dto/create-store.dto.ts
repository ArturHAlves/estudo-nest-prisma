import { IsString, IsBoolean } from 'class-validator';

export class CreateCarDto {
  @IsString()
  model: string;

  @IsBoolean()
  estacionado: boolean;
}
