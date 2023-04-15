import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Message } from '../entities/message.entity';

export const GetMessage = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.message as Message;
  },
);
