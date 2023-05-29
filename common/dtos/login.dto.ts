import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../entities/index';

export class LoginDto extends PickType(User, ['email']) {
  @ApiProperty()
  password: string;
}
