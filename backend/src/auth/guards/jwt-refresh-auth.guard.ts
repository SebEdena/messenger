import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {
  constructor(private config: ConfigService) {
    super();
  }

  canActivate(executionContext: ExecutionContext) {
    if (this.config.get<boolean>('auth.local')) {
      return true;
    } else {
      return super.canActivate(executionContext);
    }
  }
}
