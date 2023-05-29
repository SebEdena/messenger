import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity, User } from './index';

@Entity()
export class RefreshToken extends AbstractEntity {
  @Column('uuid', { unique: true })
  userId: string;

  @Column()
  refreshToken: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
