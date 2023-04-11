import { IsUUID } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class AbstractEntity {
  @IsUUID(4)
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
