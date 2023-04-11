import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { isUUID } from 'class-validator';

@Injectable()
export class GetUserInterceptor implements NestInterceptor {
  constructor(private users: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    if (request.params.id) {
      if (!isUUID(request.params.id, 4)) {
        throw new UnprocessableEntityException('id is not an UUID');
      }
      const user = await this.users.findOneById(request.params.id);
      if (user) {
        request.user = user;
        return next.handle();
      }
    }

    throw new NotFoundException();
  }
}
