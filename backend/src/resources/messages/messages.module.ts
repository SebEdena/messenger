import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'common/entities/message.entity';
import { MessagesService } from './messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessagesService],
  exports: [TypeOrmModule, MessagesService],
})
export class MessagesModule {}
