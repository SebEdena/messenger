import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IdToValueInterceptor } from 'src/_shared/id-to-value.interceptor';
import { FindOptionsRelations } from 'typeorm';
import { Room } from '../../../../../common/src/entities/room.entity';
import { RoomsService } from '../rooms.service';

@Injectable()
export class GetRoomInterceptor extends IdToValueInterceptor<Room> {
  key = 'roomId';
  override relations: FindOptionsRelations<Room> = {
    users: true,
  };

  constructor(protected config: ConfigService, protected rooms: RoomsService) {
    super(config, rooms);
  }

  protected getId(request: any): string {
    return request.params.roomId;
  }

  protected setValue(request: any, entity: Room): void {
    request.room = entity;
  }

  protected hasRights(userId: string, entity: Room): boolean {
    return entity.users.some((u) => u.email === userId);
  }
}
