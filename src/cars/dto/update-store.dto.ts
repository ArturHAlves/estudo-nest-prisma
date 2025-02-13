import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-store.dto';

export class UpdateCarDto extends OmitType(PartialType(CreateCarDto), ['model',]) {
  estacionado: boolean;
}
