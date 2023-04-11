import { AbstractEntity } from 'src/_shared/abstract.entity';
import { User } from '../../resources/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

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
