import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isUUID } from 'class-validator';
import { AbstractEntity } from 'common/src/entities/abstract';
import { FindOptionsRelations } from 'typeorm';
import { CrudService } from './crud.service';

export abstract class IdToValueInterceptor<Entity extends AbstractEntity>
  implements NestInterceptor
{
  constructor(
    protected config: ConfigService,
    protected service: CrudService<Entity>,
  ) {}

  protected getUserId(request: any) {
    if (this.config.get<boolean>('auth.local')) {
      return this.config.get('auth.localAccount');
    } else {
      return request.user.uid;
    }
  }

  protected abstract key: string;
  protected relations: FindOptionsRelations<Entity> = {};
  protected abstract getId(request: any): string | undefined;
  protected abstract setValue(request: any, entity: Entity): void;
  protected abstract hasRights(userId: string, entity: Entity): boolean;

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const entityId = this.getId(request);

    if (entityId) {
      if (!isUUID(entityId, 4)) {
        throw new UnprocessableEntityException(`${this.key} is not an UUID`);
      }
      const entity = await this.service.findOneById(entityId, this.relations);
      const userId = this.getUserId(request);
      if (!entity) {
        throw new NotFoundException();
      } else if (!userId) {
        throw new UnauthorizedException();
      } else if (!this.hasRights(userId, entity)) {
        throw new UnauthorizedException(`User ${userId} has no access`);
      } else {
        this.setValue(request, entity);
        return next.handle();
      }
    }

    throw new NotFoundException();
  }
}
