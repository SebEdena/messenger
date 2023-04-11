import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { User } from '../users/entities/user.entity';
import { CrudService } from 'src/_shared/crud.service';

@Injectable()
export class RoomsService extends CrudService<Room> {
  constructor(
    @InjectRepository(Room)
    protected repository: Repository<Room>,
  ) {
    super(repository);
  }

  createRoom(data: Partial<Room>, user: User): Promise<Room> {
    if (!data.users) {
      data.users = [];
    }
    if (!data.users.find((u) => u.id === user.id)) {
      data.users.push(user);
    }
    if (!data.name) {
      data.name = data.users
        .map((u) => u.username)
        .reduce((curr, acc) => [...curr, acc], [])
        .join(' / ');
    }
    return this.create(data);
  }
}
