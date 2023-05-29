import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'common/entities/user.entity';
import { BcryptService } from 'src/resources/users/services/bcrypt/bcrypt.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [BcryptService, UsersService],
  controllers: [UsersController],
  exports: [TypeOrmModule, BcryptService, UsersService],
})
export class UsersModule {}
