import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'common/entities';
import { AuthModule } from 'src/auth/auth.module';
import { MessagesModule } from '../messages/messages.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), AuthModule, MessagesModule],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [TypeOrmModule],
})
export class RoomsModule {}
