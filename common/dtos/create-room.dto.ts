import { OmitType } from '@nestjs/swagger';
import { Room } from '../entities';

export class CreateRoomDto extends OmitType(Room, ['id', 'createdAt', 'updatedAt']) {}
