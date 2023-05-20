import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService } from 'src/resources/users/services/bcrypt/bcrypt.service';
import { User } from '../../../../common/src/entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [BcryptService, UsersService],
  controllers: [UsersController],
  exports: [TypeOrmModule, BcryptService, UsersService],
})
export class UsersModule {}
