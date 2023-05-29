import { OmitType } from '@nestjs/swagger';
import { Message } from '../entities';

export class CreateMessageDto extends OmitType(Message, [
  'id',
  'createdAt',
  'updatedAt',
  'author',
  'room',
]) {}
