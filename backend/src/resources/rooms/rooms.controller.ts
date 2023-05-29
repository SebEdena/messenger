import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateMessageDto, CreateRoomDto, UpdateRoomDto } from 'common/dtos';
import { Message, Room, User } from 'common/entities';
import { ConnectedUser } from 'src/auth/decorators/connected-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConnectedUserInterceptor } from '../../auth/interceptors/connected-user.interceptor';
import { GetMessage } from '../messages/decorators/get-message.decorator';
import { MessagesService } from '../messages/messages.service';
import { GetRoom } from './decorators/get-room.decorator';
import { GetRoomInterceptor } from './interceptors/get-room.interceptor';
import { RoomsService } from './rooms.service';

@ApiTags('rooms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ConnectedUserInterceptor)
@Controller('rooms')
export class RoomsController {
  private defaultPagination: number;

  constructor(
    private readonly config: ConfigService,
    private readonly roomsService: RoomsService,
    private readonly messageService: MessagesService
  ) {
    this.defaultPagination = config.get<number>('app.defaultPagination');
  }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto, @ConnectedUser() user: User) {
    return this.roomsService.createRoom(createRoomDto, user);
  }

  @Get()
  findAll(@ConnectedUser() user: User) {
    return this.roomsService.fetchRooms(user, {});
  }

  @Get(':roomId')
  @UseInterceptors(GetRoomInterceptor)
  @ApiParam({ name: 'roomId', format: 'uuid', type: 'string' })
  findOne(@Param('roomId', ParseUUIDPipe) roomId: string, @GetRoom() room: Room) {
    return room;
  }

  @Patch(':roomId')
  @UseInterceptors(GetRoomInterceptor)
  @ApiParam({ name: 'roomId', format: 'uuid', type: 'string' })
  update(
    @Param('roomId', ParseUUIDPipe) roomId: string,
    @Body() updateRoomDto: UpdateRoomDto,
    @GetRoom() room: Room
  ) {
    return this.roomsService.update(room, updateRoomDto);
  }

  @Delete(':roomId')
  @UseInterceptors(GetRoomInterceptor)
  @ApiParam({ name: 'roomId', format: 'uuid', type: 'string' })
  remove(@Param('roomId', ParseUUIDPipe) roomId: string, @GetRoom() room: Room) {
    return this.roomsService.delete(room.id);
  }

  @Get(':roomId/messages')
  @UseInterceptors(GetRoomInterceptor)
  @ApiParam({ name: 'roomId', format: 'uuid', type: 'string' })
  getRoomMessages(
    @Param('roomId', ParseUUIDPipe) roomId: string,
    @Query('skip') skip = 0,
    @Query('take') take = this.defaultPagination,
    @GetRoom() room: Room
  ) {
    return this.messageService.find({
      filter: { room: { id: room.id } },
      sort: { createdAt: 'DESC' },
      skip,
      take,
    });
  }

  @Post(':roomId/messages')
  @UseInterceptors(GetRoomInterceptor)
  @ApiParam({ name: 'roomId', format: 'uuid', type: 'string' })
  writeMessage(
    @Param('roomId', ParseUUIDPipe) roomId: string,
    @Body() message: CreateMessageDto,
    @GetRoom() room: Room,
    @ConnectedUser() user: User
  ) {
    return this.messageService.create({
      ...message,
      author: user,
      room: room,
    });
  }

  @Patch(':roomId/messages/:messageId')
  @UseInterceptors(GetRoomInterceptor)
  @ApiParam({ name: 'roomId', format: 'uuid', type: 'string' })
  @ApiParam({ name: 'messageId', format: 'uuid', type: 'string' })
  updateMessage(
    @Param('roomId', ParseUUIDPipe) roomId: string,
    @Body() messageUpdate: UpdateRoomDto,
    @GetMessage() message: Message
  ) {
    return this.messageService.update(message, messageUpdate);
  }

  @Delete(':roomId/messages/:messageId')
  @UseInterceptors(GetRoomInterceptor)
  @ApiParam({ name: 'roomId', format: 'uuid', type: 'string' })
  @ApiParam({ name: 'messageId', format: 'uuid', type: 'string' })
  deleteMessage(@Param('roomId', ParseUUIDPipe) roomId: string, @GetMessage() message: Message) {
    return this.messageService.delete(message.id);
  }
}
