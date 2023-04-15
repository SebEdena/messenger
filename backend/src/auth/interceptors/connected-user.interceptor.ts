import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/resources/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConnectedUserInterceptor implements NestInterceptor {
  constructor(
    private config: ConfigService,
    @InjectRepository(User)
    protected users: Repository<User>,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    let email = '';
    if (this.config.get<boolean>('auth.local')) {
      email = this.config.get('auth.localAccount');
    } else {
      email = request.user.uid;
    }

    try {
      const user = await this.users.findOne({
        where: { email },
        relations: { rooms: true },
      });
      request.currentUser = user;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return next.handle();
  }
}
