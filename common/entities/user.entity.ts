import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString, MaxLength } from 'class-validator';
import { Column, Entity, ManyToMany, Relation } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Room } from './room.entity';

@Entity()
export class User extends AbstractEntity {
  @IsEmail()
  @MaxLength(100)
  @Column({ length: 100, unique: true })
  email: string;

  @IsString()
  @MaxLength(50)
  @Column({ length: 50 })
  username: string;

  @ApiHideProperty()
  @Column()
  @Exclude()
  password: string;

  @ManyToMany(() => Room, (room) => room.users)
  rooms: Relation<Room[]>;
}
