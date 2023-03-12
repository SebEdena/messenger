import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users.service';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(private config: ConfigService, private users: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    let email = '';
    if (this.config.get<boolean>('auth.local')) {
      email = this.config.get('auth.localAccount');
    } else {
      email = request.user.uid;
    }

    try {
      const user = await this.users.findOne({ email });
      request.currentUser = user;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return next.handle();
  }
}
