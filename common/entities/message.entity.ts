import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { AuditEntity, Room, User } from './index';

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
