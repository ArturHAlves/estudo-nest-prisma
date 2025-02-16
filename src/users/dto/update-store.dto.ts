import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-store.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  


}
