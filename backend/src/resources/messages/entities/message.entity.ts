import { AuditEntity } from 'src/_shared/abstract.entity';
import { Room } from 'src/resources/rooms/entities/room.entity';
import { User } from 'src/resources/users/entities/user.entity';
import { Column, Entity, ManyToOne, Relation } from 'typeorm';

@Entity()
export class Message extends AuditEntity {
  @Column({ default: '' })
  content: string;

  @ManyToOne(() => User)
  author: Relation<User>;

  @ManyToOne(() => Room, (room) => room.messages, {
    cascade: true,
  })
  room: Relation<Room>;
}
