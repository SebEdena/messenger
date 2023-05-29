import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'common/entities/user.entity';
import { IdToValueInterceptor } from 'src/_shared/id-to-value.interceptor';
import { UsersService } from '../users.service';

@Injectable()
export class GetUserInterceptor extends IdToValueInterceptor<User> {
  key = 'userId';

  constructor(protected config: ConfigService, protected users: UsersService) {
    super(config, users);
  }

  protected getId(request: any): string {
    return request.params.userId;
  }

  protected setValue(request: any, entity: User): void {
    request.user = entity;
  }

  protected hasRights(userId: string, entity: User): boolean {
    return entity.email === userId;
  }
}
