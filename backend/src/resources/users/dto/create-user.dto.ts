import { OmitType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends OmitType(User, ['id', 'password', 'rooms']) {
  @IsString()
  password: string;
}
