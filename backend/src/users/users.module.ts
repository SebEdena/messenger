import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService } from 'src/_shared/services/bcrypt/bcrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [BcryptService, UsersService],
  controllers: [UsersController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
