import { AbstractEntity } from 'src/_shared/abstract.entity';
import { User } from 'src/resources/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Room extends AbstractEntity {
  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.rooms, { eager: true })
  @JoinTable({ name: 'room_user' })
  users: User[];
}
