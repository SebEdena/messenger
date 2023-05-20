import { AbstractEntity } from 'common/src/entities/abstract.entity';
import { User } from 'common/src/entities/user.entity';
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
