import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { IsString, MaxLength } from 'class-validator';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(100)
  @Column({ length: 100, unique: true })
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @Column({ length: 50 })
  username: string;

  @ApiProperty()
  @Column()
  @Exclude()
  password: string;
}
