import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/_shared/services/crud.service';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService extends CrudService<Room> {
  constructor(
    @InjectRepository(Room)
    protected repository: Repository<Room>,
  ) {
    super(repository);
  }
}
