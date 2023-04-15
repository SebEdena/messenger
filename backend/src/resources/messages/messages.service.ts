import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/_shared/crud.service';
import { DeepPartial, Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService extends CrudService<Message> {
  constructor(
    @InjectRepository(Message)
    protected repository: Repository<Message>,
  ) {
    super(repository);
  }

  async create(entity: DeepPartial<Message>): Promise<Message> {
    if (!entity.room) {
      throw new Error('No room for this message');
    }
    if (!entity.author) {
      throw new Error('No author for this message');
    }
    const timestamp = new Date();
    entity.createdAt = timestamp;
    entity.updatedAt = timestamp;
    entity.room.updatedAt = timestamp;
    const createdEntity = await super.create(entity);
    delete createdEntity.room.users;
    delete createdEntity.author.rooms;
    return createdEntity;
  }
}
