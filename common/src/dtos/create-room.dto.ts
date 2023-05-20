import { OmitType } from '@nestjs/swagger';
import { Room } from 'common/src/entities/room.entity';

export class CreateRoomDto extends OmitType(Room, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
