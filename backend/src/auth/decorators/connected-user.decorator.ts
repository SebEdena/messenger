import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'common/entities/user.entity';

export const ConnectedUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.currentUser as User;
});
