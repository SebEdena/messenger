import { Column, Entity, JoinTable, ManyToMany, OneToMany, Relation } from 'typeorm';
import { AuditEntity } from './abstract.entity';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity()
export class Room extends AuditEntity {
  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.rooms)
  @JoinTable({ name: 'room_user' })
  users: Relation<User[]>;

  @OneToMany(() => Message, (message) => message.room)
  messages: Relation<Message[]>;
}
