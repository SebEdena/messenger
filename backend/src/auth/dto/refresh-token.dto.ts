import { PickType } from '@nestjs/swagger';
import { RefreshToken } from '../entities/refresh-token.entity';

export class RefreshTokenDto extends PickType(RefreshToken, ['refreshToken']) {}
