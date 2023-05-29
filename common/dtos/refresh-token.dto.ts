import { PickType } from '@nestjs/swagger';
import { RefreshToken } from '../entities';

export class RefreshTokenDto extends PickType(RefreshToken, ['refreshToken']) {}
