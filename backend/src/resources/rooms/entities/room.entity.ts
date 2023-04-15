import { AuditEntity } from 'src/_shared/abstract.entity';
import { Message } from 'src/resources/messages/entities/message.entity';
import { User } from 'src/resources/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  Relation,
} from 'typeorm';

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
