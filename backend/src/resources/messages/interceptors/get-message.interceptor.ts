import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IdToValueInterceptor } from 'src/_shared/id-to-value.interceptor';
import { Message } from '../entities/message.entity';
import { MessagesService } from '../messages.service';

@Injectable()
export class GetRoomInterceptor extends IdToValueInterceptor<Message> {
  key = 'messageId';

  constructor(
    protected config: ConfigService,
    protected messages: MessagesService,
  ) {
    super(config, messages);
  }

  protected getId(request: any): string {
    return request.params.messageId;
  }

  protected setValue(request: any, entity: Message): void {
    request.message = entity;
  }

  protected hasRights(userId: string, entity: Message): boolean {
    return entity.author.email === userId;
  }
}
