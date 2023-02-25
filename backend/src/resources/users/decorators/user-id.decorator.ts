import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    if (process.env.LOCAL === 'true') {
      return process.env.LOCAL_ACCOUNT;
    } else {
      const request = ctx.switchToHttp().getRequest();
      return request.user['sub'] as string;
    }
  },
);
