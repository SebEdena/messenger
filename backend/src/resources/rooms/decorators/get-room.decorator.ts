import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Room } from '../entities/room.entity';

export const GetRoom = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.room as Room;
  },
);
