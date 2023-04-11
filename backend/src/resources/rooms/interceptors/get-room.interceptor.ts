import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { RoomsService } from '../rooms.service';
import { isUUID } from 'class-validator';

@Injectable()
export class GetRoomInterceptor implements NestInterceptor {
  constructor(private rooms: RoomsService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    if (request.params.id) {
      if (!isUUID(request.params.id, 4)) {
        throw new UnprocessableEntityException('id is not an UUID');
      }
      const room = await this.rooms.findOneById(request.params.id);
      if (room) {
        request.room = room;
        return next.handle();
      }
    }

    throw new NotFoundException();
  }
}
