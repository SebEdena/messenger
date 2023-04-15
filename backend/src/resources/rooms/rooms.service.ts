import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService, FindManyOptions } from 'src/_shared/crud.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Message } from '../messages/entities/message.entity';
import { User } from '../users/entities/user.entity';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService extends CrudService<Room> {
  private defaultPagination: number;

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Room)
    protected repository: Repository<Room>,
    @InjectRepository(Message)
    protected repositoryMessage: Repository<Message>,
  ) {
    super(repository);
    this.defaultPagination = config.get<number>('app.defaultPagination');
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

  async fetchRooms(
    user: User,
    { filter, skip, take }: Partial<FindManyOptions<Room>>,
  ): Promise<Room[]> {
    const rooms = await this.repository
      .createQueryBuilder('room')
      .innerJoinAndSelect('room.users', 'users')
      .where(
        'room.id IN (SELECT ru.id from room_user ru where ru.userId = :userId)',
        { userId: user.id },
      )
      .where(filter ?? {})
      .orderBy('room.updatedAt', 'DESC')
      .skip(skip)
      .take(take)
      .getMany();

    const roomMap = new Map<string, Room>(rooms.map((r) => [r.id, r]));

    const query = this.repositoryMessage
      .createQueryBuilder()
      .subQuery()
      .from((qb: SelectQueryBuilder<Message>) => {
        return qb
          .from(Message, 'm')
          .select('m.*')
          .addSelect(
            'row_number() over (partition by m.roomId order by m.createdAt desc)',
            'rank',
          )
          .innerJoinAndSelect('m.author', 'author')
          .where('m.roomId IN (:...rooms)', {
            rooms: Array.from(roomMap.keys()),
          });
      }, 'message')
      .where('"rank" <= :page', { page: this.defaultPagination })
      .orderBy('message."createdAt"', 'DESC');

    const data = await query.getRawMany();
    for (const row of data) {
      const room = roomMap.get(row.roomId);
      if (room) {
        if (!room.messages) {
          room.messages = [];
        }
        const message = new Message();
        message.id = row.id;
        message.content = row.content;
        message.createdAt = row.createdAt;
        message.updatedAt = row.updatedAt;
        message.author = new User();
        message.author.id = row.author_id;
        message.author.email = row.author_email;
        message.author.username = row.author_username;

        room.messages.push(message);
      }
    }

    return Array.from(roomMap.values());
  }
}
