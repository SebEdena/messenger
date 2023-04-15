import { OmitType } from '@nestjs/swagger';
import { Room } from '../entities/room.entity';

export class CreateRoomDto extends OmitType(Room, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
