import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from 'common/src/entities/user.entity';

export class LoginDto extends PickType(User, ['email']) {
  @ApiProperty()
  password: string;
}
